'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { CandleViewer } from '@/components/3d/candle-viewer'

export function HeroScene() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const candleY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%'])
  const candleScale = useTransform(scrollYProgress, [0, 1], [1, 1.28])
  const candleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
  const uiOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-ink grain"
      aria-label="Intro"
    >
      {/* Warm floor pool */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 120%, rgba(224,149,106,0.14), transparent 60%)',
        }}
      />

      <motion.p
        style={{ opacity: uiOpacity }}
        className="absolute inset-x-0 top-[15vh] z-10 text-center label text-clay"
      >
        Handmade Candle Objects
      </motion.p>

      <motion.div
        style={{ y: candleY, scale: candleScale, opacity: candleOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <CandleViewer
          image="/candles/sol-hero.png"
          alt="SOL — a tall sculptural candle resembling a distorted sun, in warm ivory wax"
          priority
          sizeClassName="w-[80vw] max-w-[420px]"
        />
      </motion.div>

      {/* Swipe to enter */}
      <motion.div
        style={{ opacity: uiOpacity }}
        className="absolute inset-x-0 bottom-[7vh] z-10 flex flex-col items-center gap-3"
      >
        <span className="label text-stone">Swipe to Enter</span>
        <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute left-0 top-0 h-4 w-px bg-warm [animation:swipe-hint_2.2s_ease-in-out_infinite]" />
        </span>
      </motion.div>

      <span className="absolute left-5 bottom-[7vh] z-10 label text-clay/60 md:left-8">01 — Intro</span>
    </section>
  )
}
