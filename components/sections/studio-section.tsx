'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function StudioSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const a = useTransform(scrollYProgress, [0, 1], ['14%', '-14%'])
  const b = useTransform(scrollYProgress, [0, 1], ['-10%', '16%'])
  const c = useTransform(scrollYProgress, [0, 1], ['8%', '-10%'])

  return (
    <section
      ref={ref}
      id="studio"
      className="relative min-h-[160vh] w-full overflow-hidden bg-ink px-5 py-[20vh] md:px-8"
      aria-label="The Studio"
    >
      <span className="label text-clay/60">07 — The Studio</span>

      <h2 className="mt-4 font-serif text-[clamp(2.5rem,13vw,8rem)] leading-[0.9] tracking-tight text-warm">
        <span className="block">Small Batch.</span>
        <span className="block pl-[6vw] text-clay">Slow Process.</span>
        <span className="block">No Two Pieces</span>
        <span className="block pl-[10vw] italic">Exactly Alike.</span>
      </h2>

      <motion.figure
        style={{ y: a }}
        className="absolute right-[6vw] top-[8vh] w-[40vw] max-w-[260px] overflow-hidden rounded-sm"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/editorial/studio-hands.png" alt="A maker's hands finishing a candle in the studio" className="h-full w-full object-cover" />
      </motion.figure>

      <div className="relative mt-[14vh] grid grid-cols-12 gap-4">
        <motion.figure
          style={{ y: b }}
          className="col-span-8 overflow-hidden rounded-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/editorial/studio-molds.png" alt="Hand-built molds arranged on a studio workbench" className="h-full w-full object-cover" />
        </motion.figure>
        <motion.figure
          style={{ y: c }}
          className="col-span-4 mt-[18vh] overflow-hidden rounded-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/editorial/texture.png" alt="Imperfect edge and surface texture of a finished piece" className="h-full w-full object-cover" />
        </motion.figure>
      </div>

      <p className="mt-[12vh] max-w-lg font-serif text-2xl leading-snug text-stone md:text-3xl">
        Made in small runs, by hand, in a single studio. What leaves the table is
        shaped as much by the wax as by us — <span className="text-clay">an object, not a product.</span>
      </p>
    </section>
  )
}
