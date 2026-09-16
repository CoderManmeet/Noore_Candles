'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function ObjectSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const waxY = useTransform(scrollYProgress, [0, 1], ['12%', '-18%'])
  const wickY = useTransform(scrollYProgress, [0, 1], ['20%', '-30%'])
  const textureY = useTransform(scrollYProgress, [0, 1], ['-6%', '10%'])
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section
      ref={ref}
      id="object"
      className="relative z-10 mt-0 min-h-[190vh] w-full overflow-hidden bg-ink px-5 pt-[8vh] pb-[24vh] md:mt-0 md:px-8 md:py-[24vh]"
      aria-label="The Object"
    >
      {/* Architectural headline */}
      <motion.h2
        style={{ y: headlineY }}
        className="relative z-20 max-w-[6ch] font-serif text-warm leading-[0.82] tracking-[-0.055em] text-[clamp(4.25rem,23vw,15rem)] md:max-w-none md:tracking-tight"
      >
        <span className="block">Not</span>
        <span className="block pl-[8vw]">Just</span>
        <span className="block">
          A <span className="italic text-clay">Candle.</span>
        </span>
      </motion.h2>

      {/* Overlapping editorial imagery at differing speeds */}
      <motion.figure
        style={{ y: textureY }}
        className="pointer-events-none absolute right-[6vw] top-[2vh] z-10 w-[42vw] max-w-[300px] overflow-hidden rounded-sm md:right-[10vw] md:top-[6vh] md:w-[46vw] md:max-w-[340px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/editorial/texture.png" alt="Macro detail of handmade candle wax texture" className="h-full w-full object-cover" />
      </motion.figure>

      <motion.figure
        style={{ y: wickY }}
        className="pointer-events-none absolute left-[4vw] top-[36vh] z-30 w-[50vw] max-w-[330px] overflow-hidden rounded-sm shadow-2xl md:top-[52vh] md:w-[52vw] md:max-w-[380px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/editorial/wick.png" alt="Close-up of an unlit cotton wick emerging from ivory wax" className="h-full w-full object-cover" />
      </motion.figure>

      <motion.figure
        style={{ y: waxY }}
        className="pointer-events-none absolute right-[8vw] bottom-[14vh] z-20 w-[42vw] max-w-[300px] overflow-hidden rounded-sm"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/editorial/wax.png" alt="Raw block of natural vegetable candle wax" className="h-full w-full object-cover" />
      </motion.figure>

      <div className="absolute inset-x-5 bottom-[10vh] z-30 md:inset-x-8">
        <p className="max-w-md font-serif text-2xl leading-snug text-stone md:text-3xl">
          An object designed to change a room{' '}
          <span className="text-clay">before it is ever lit.</span>
        </p>
      </div>

      <span className="absolute left-5 top-[4vh] z-30 hidden label text-clay/60 sm:block md:left-8 md:top-[10vh]">02 — The Object</span>
    </section>
  )
}
