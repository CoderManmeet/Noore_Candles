'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Phase = 'unlit' | 'lit'

/**
 * SOL's wick sits near the visual centre of the sun, not the top of the image
 * box. These coordinates anchor the flame + glow to that point. Swap the image
 * and WICK values together if a different candle (or a GLB/video) replaces it.
 */
const CANDLE = {
  image: '/candles/sol.png',
  alt: 'SOL — a sculptural sun candle, ready to be lit',
  wick: { x: 50, y: 48 }, // percentages of the square image box
}

export function LightSection() {
  const [phase, setPhase] = useState<Phase>('unlit')
  const reduce = useReducedMotion()
  const lit = phase === 'lit'

  return (
    <section
      id="light"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden py-[16vh] transition-colors duration-[1500ms]"
      style={{ backgroundColor: lit ? '#241812' : '#0a0a09' }}
      aria-label="Light the Object"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-[1600ms]"
        style={{
          opacity: lit ? 1 : 0,
          background:
            'radial-gradient(60% 45% at 50% 46%, rgba(224,149,106,0.30), transparent 72%)',
        }}
      />

      <div className="absolute left-5 top-[12vh] z-20 md:left-8">
        <span className="label text-clay/60">06 — Light It</span>
      </div>

      <h2 className="relative z-10 mb-4 font-serif text-[clamp(3rem,16vw,9rem)] leading-none tracking-tight text-warm">
        Light It.
      </h2>

      {/* Candle scene — flame + glow live inside the candle's own box */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          className="relative w-[62vw] max-w-[300px]"
          animate={
            reduce || !lit
              ? { scaleY: 1, y: 0 }
              : { scaleY: [1, 0.985, 0.97], y: [0, 4, 9] }
          }
          transition={{ duration: 14, ease: 'easeInOut' }}
          style={{ transformOrigin: 'bottom' }}
        >
          {/* Localised warm glow bloom, centred on the wick */}
          <div
            aria-hidden
            className="pointer-events-none absolute z-[1] h-[42%] w-[42%] rounded-full blur-2xl transition-opacity duration-[1400ms]"
            style={{
              left: `${CANDLE.wick.x}%`,
              top: `${CANDLE.wick.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: lit ? 1 : 0,
              background:
                'radial-gradient(circle, rgba(224,149,106,0.85), transparent 68%)',
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CANDLE.image}
            alt={CANDLE.alt}
            className={cn(
              'relative z-[2] h-auto w-full object-contain transition-[filter] duration-[1600ms]',
              lit ? 'brightness-[1.12]' : 'brightness-90',
            )}
            style={{
              filter: lit
                ? 'drop-shadow(0 0 46px rgba(224,149,106,0.5))'
                : undefined,
            }}
          />

          {/* Flame — base sits exactly on the wick, grows upward */}
          <div
            className="absolute z-[3]"
            style={{
              left: `${CANDLE.wick.x}%`,
              top: `${CANDLE.wick.y}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <Flame lit={lit} reduce={!!reduce} />
          </div>

          {/* Contact shadow that softens when lit */}
          <div
            aria-hidden
            className="absolute -bottom-4 left-1/2 z-0 h-4 w-[55%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl transition-all duration-[1500ms]"
            style={{ opacity: lit ? 0.4 : 0.7, width: lit ? '70%' : '55%' }}
          />
        </motion.div>
      </div>

      {/* Control + follow-up copy */}
      <div className="relative z-10 mt-10 flex min-h-[6rem] flex-col items-center">
        {!lit ? (
          <button
            onClick={() => setPhase('lit')}
            className="group relative overflow-hidden rounded-full border border-warm/30 px-10 py-4 label text-warm transition-transform active:scale-95"
          >
            <span className="relative z-10">Light</span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 group-hover:scale-y-100" />
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              key="after"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="font-serif text-2xl italic text-stone">Now watch it change.</p>
              <button
                onClick={() => setPhase('unlit')}
                className="label text-clay transition-colors hover:text-warm"
              >
                Reset
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}

function Flame({ lit, reduce }: { lit: boolean; reduce: boolean }) {
  return (
    <div
      className="relative transition-all duration-[1200ms] ease-out"
      style={{
        opacity: lit ? 1 : 0,
        transform: lit ? 'scaleY(1)' : 'scaleY(0.2)',
        transformOrigin: 'bottom',
      }}
    >
      {/* Glow halo directly behind the flame */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{ background: 'radial-gradient(circle,rgba(224,149,106,0.85),transparent 70%)' }}
      />
      {/* Flame body — centred by its wrapper; flicker only scales/rotates */}
      <span
        className={cn(
          'relative block h-8 w-4 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]',
          lit && !reduce && '[animation:flame-flicker_1.6s_ease-in-out_infinite]',
        )}
        style={{
          transformOrigin: 'bottom',
          background:
            'radial-gradient(ellipse at 50% 70%, #fff3d6 0%, #f6b871 40%, #e0956a 70%, #b45b34 100%)',
        }}
      />
    </div>
  )
}
