'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CandleViewer } from '@/components/3d/candle-viewer'
import { cn } from '@/lib/utils'

const HOTSPOTS = [
  {
    id: 'hand',
    title: 'Hand-Finished',
    body: 'Each surface is trimmed and sanded by hand, so no two objects share the same silhouette.',
    pos: 'top-[14%] left-[22%]',
  },
  {
    id: 'wick',
    title: 'Cotton Wick',
    body: 'A single lead-free cotton wick, set by hand and centred for a slow, even burn.',
    pos: 'top-[8%] left-[54%]',
  },
  {
    id: 'wax',
    title: 'Vegetable Wax',
    body: 'A natural vegetable-wax blend chosen for its matte finish and clean, unhurried flame.',
    pos: 'top-[58%] left-[16%]',
  },
  {
    id: 'form',
    title: 'Sculptural Form',
    body: 'The form is the point. It is made to be looked at as an object first, and lit second.',
    pos: 'top-[64%] left-[70%]',
  },
]

export function ExplorerSection() {
  const [active, setActive] = useState<string | null>(null)
  const current = HOTSPOTS.find((h) => h.id === active)

  return (
    <section
      id="explore"
      className="relative min-h-screen w-full overflow-hidden bg-ink-soft grain py-[16vh]"
      aria-label="Touch the Object"
    >
      <div className="px-5 md:px-8">
        <span className="label text-clay/60">05 — Explore</span>
        <h2 className="mt-3 max-w-xl font-serif text-[clamp(2.75rem,12vw,6rem)] leading-[0.9] tracking-tight text-warm">
          Touch the <span className="italic text-clay">Object.</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-8 flex max-w-3xl items-center justify-center">
        <div className="relative">
          <CandleViewer
            image="/candles/melt.png"
            alt="MELT — a drip sculpture candle, shown for close inspection"
            sizeClassName="w-[72vw] max-w-[360px]"
          />

          {/* Hotspots */}
          {HOTSPOTS.map((h) => (
            <button
              key={h.id}
              onClick={() => setActive((a) => (a === h.id ? null : h.id))}
              className={cn('absolute z-20 grid place-items-center', h.pos)}
              aria-label={h.title}
              aria-pressed={active === h.id}
            >
              <span className="relative grid h-5 w-5 place-items-center">
                <span
                  className={cn(
                    'absolute inline-flex h-full w-full rounded-full',
                    active === h.id ? 'bg-ember/40' : 'bg-warm/20',
                    active !== h.id && 'animate-ping',
                  )}
                />
                <span
                  className={cn(
                    'relative h-2.5 w-2.5 rounded-full ring-1 ring-warm/50 transition-colors',
                    active === h.id ? 'bg-ember' : 'bg-warm',
                  )}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Museum label */}
      <div className="px-5 md:px-8">
        <div className="mx-auto min-h-[7rem] max-w-md">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-l border-clay/40 pl-5"
              >
                <figcaption className="label text-clay">{current.title}</figcaption>
                <blockquote className="mt-2 font-serif text-xl leading-snug text-warm">
                  {current.body}
                </blockquote>
              </motion.figure>
            ) : (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pl-5 text-center label text-clay/70 md:text-left"
              >
                Tap a point to read its label
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
