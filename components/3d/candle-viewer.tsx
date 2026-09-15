'use client'

/**
 * CandleViewer — the interactive "object" at the heart of FORM / FIRE.
 *
 * This is a layered-image scene deliberately architected as a drop-in surface:
 * swap the <img> layer for a React Three Fiber <Canvas> / GLB later and the
 * surrounding interaction (drag inertia, device tilt, dynamic lighting, glow,
 * contact shadow) stays identical.
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type CandleViewerProps = {
  image: string
  alt: string
  /** Warm glow intensity 0–1 (used by the "light it" interaction) */
  glow?: number
  /** Enable drag-to-inspect + device tilt */
  interactive?: boolean
  priority?: boolean
  className?: string
  sizeClassName?: string
}

const MAX_Y = 26 // horizontal drag → rotateY
const MAX_X = 14 // vertical drag → rotateX

export function CandleViewer({
  image,
  alt,
  glow = 0,
  interactive = true,
  priority = false,
  className,
  sizeClassName = 'w-[74vw] max-w-[440px]',
}: CandleViewerProps) {
  const reduce = useReducedMotion()
  const rotY = useMotionValue(0)
  const rotX = useMotionValue(0)

  const springConf = { stiffness: 90, damping: 18, mass: 0.9 }
  const sy = useSpring(rotY, springConf)
  const sx = useSpring(rotX, springConf)

  const dragging = useRef(false)
  const start = useRef({ x: 0, y: 0, ry: 0, rx: 0 })
  const [active, setActive] = useState(false)

  // Idle sway + graceful return from drag
  useEffect(() => {
    if (reduce) return
    let raf = 0
    let t = Math.random() * 100
    const loop = () => {
      if (!dragging.current) {
        t += 0.008
        const sway = Math.sin(t) * 3.2
        rotY.set(rotY.get() + (sway - rotY.get()) * 0.04)
        rotX.set(rotX.get() + (0 - rotX.get()) * 0.04)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce, rotX, rotY])

  // Device orientation tilt (subtle, gated to when not dragging)
  useEffect(() => {
    if (!interactive || reduce) return
    const onOrient = (e: DeviceOrientationEvent) => {
      if (dragging.current) return
      if (e.gamma == null || e.beta == null) return
      const gy = Math.max(-MAX_Y, Math.min(MAX_Y, e.gamma * 0.4))
      const gx = Math.max(-MAX_X, Math.min(MAX_X, (e.beta - 45) * 0.16))
      rotY.set(gy)
      rotX.set(-gx)
    }
    window.addEventListener('deviceorientation', onOrient)
    return () => window.removeEventListener('deviceorientation', onOrient)
  }, [interactive, reduce, rotX, rotY])

  const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v))

  const onDown = (e: React.PointerEvent) => {
    if (!interactive) return
    dragging.current = true
    setActive(true)
    start.current = { x: e.clientX, y: e.clientY, ry: rotY.get(), rx: rotX.get() }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    rotY.set(clamp(start.current.ry + dx * 0.35, MAX_Y))
    rotX.set(clamp(start.current.rx - dy * 0.25, MAX_X))
  }
  const onUp = () => {
    dragging.current = false
    setActive(false)
  }

  // Dynamic lighting driven by rotation
  const highlightX = useTransform(sy, [-MAX_Y, MAX_Y], ['72%', '28%'])
  const highlightY = useTransform(sx, [-MAX_X, MAX_X], ['32%', '68%'])
  const shadowScale = useTransform(sy, [-MAX_Y, 0, MAX_Y], [0.82, 1, 0.82])
  const shadowShift = useTransform(sy, [-MAX_Y, MAX_Y], ['22%', '-22%'])

  return (
    <div
      className={cn('relative flex items-center justify-center select-none', className)}
      style={{ perspective: 1200 }}
    >
      {/* Warm ambient glow (grows when lit) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: '90%',
          height: '90%',
          background:
            'radial-gradient(circle, rgba(224,149,106,0.9) 0%, rgba(224,149,106,0.35) 40%, transparent 70%)',
        }}
        animate={{ opacity: glow * 0.8, scale: 1 + glow * 0.4 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      <motion.div
        className={cn('relative', sizeClassName, interactive && 'cursor-grab active:cursor-grabbing')}
        style={{
          rotateX: sx,
          rotateY: sy,
          transformStyle: 'preserve-3d',
          touchAction: 'pan-y',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={reduce ? undefined : { duration: 7, ease: 'easeInOut', repeat: Infinity }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || '/placeholder.svg'}
          alt={alt}
          draggable={false}
          loading={priority ? 'eager' : 'lazy'}
          className="pointer-events-none w-full h-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
        />

        {/* Specular highlight that tracks the tilt */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            background: useTransform(
              [highlightX, highlightY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(255,240,220,0.55), transparent 55%)`,
            ),
          }}
        />
        {/* Warm rim light from the flame side, revealed when lit */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at 50% 18%, rgba(224,149,106,0.6), transparent 42%)',
          }}
          animate={{ opacity: glow }}
          transition={{ duration: 1.4 }}
        />
      </motion.div>

      {/* Contact shadow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] left-1/2 h-[5%] w-[60%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl"
        style={{ scaleX: shadowScale, x: shadowShift }}
      />

      {interactive && (
        <span
          className={cn(
            'pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 label text-clay transition-opacity duration-500',
            active ? 'opacity-0' : 'opacity-60',
          )}
        >
          Drag to inspect
        </span>
      )}
    </div>
  )
}
