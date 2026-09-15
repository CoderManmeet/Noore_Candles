'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { stops } from '@/lib/scroll'

const STAGES = [
  { word: 'Wax', image: '/editorial/wax.png', copy: 'Every piece begins as raw vegetable wax.' },
  { word: 'Form', image: '/editorial/studio-molds.png', copy: 'Poured and shaped by hand into molds.' },
  { word: 'Finish', image: '/editorial/studio-hands.png', copy: 'Trimmed, sanded and judged by eye.' },
  { word: 'Fire', image: '/candles/sol.png', copy: 'The final form is never entirely predictable.' },
]

function Stage({
  index,
  progress,
  word,
  image,
  copy,
  lit,
}: {
  index: number
  progress: MotionValue<number>
  word: string
  image: string
  copy: string
  lit?: boolean
}) {
  const n = STAGES.length
  const start = index / n
  const end = (index + 1) / n
  const mid = (start + end) / 2

  const opacity = useTransform(
    progress,
    stops(start - 0.06, mid - 0.04, mid + 0.04, end - 0.02),
    [0, 1, 1, 0],
  )
  const scale = useTransform(progress, [start, end], [1.12, 0.94])
  const y = useTransform(progress, [start, end], ['6%', '-6%'])

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center">
      <motion.div style={{ scale, y }} className="relative w-[70vw] max-w-[360px]">
        {lit && (
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle,rgba(224,149,106,0.5),transparent 65%)' }}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image || '/placeholder.svg'} alt={`${word} stage`} className="h-auto w-full object-contain" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-5 bottom-[16vh] md:inset-x-8">
        <span className="label text-clay">{`0${index + 1} / 04`}</span>
        <p className="mt-3 max-w-sm font-serif text-xl text-stone">{copy}</p>
      </div>
    </motion.div>
  )
}

export function MakingSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const wordIndex = useTransform(scrollYProgress, (v) =>
    Math.min(STAGES.length - 1, Math.floor(v * STAGES.length)),
  )

  return (
    <section
      ref={ref}
      id="process"
      className="relative h-[420vh] w-full bg-ink"
      aria-label="The Making"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden grain">
        <div className="absolute left-5 top-[14vh] z-30 md:left-8">
          <span className="label text-clay/60">03 — The Making</span>
          <h2 className="mt-4 font-serif text-[clamp(3rem,16vw,10rem)] leading-[0.85] tracking-tight text-warm">
            Made
            <br />
            <span className="pl-[10vw]">By Hand.</span>
          </h2>
        </div>

        {STAGES.map((s, i) => (
          <Stage
            key={s.word}
            index={i}
            progress={scrollYProgress}
            word={s.word}
            image={s.image}
            copy={s.copy}
            lit={i === STAGES.length - 1}
          />
        ))}

        {/* Stage ticker */}
        <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-4 md:right-8">
          {STAGES.map((s, i) => (
            <StageTick key={s.word} i={i} current={wordIndex} label={s.word} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StageTick({ i, current, label }: { i: number; current: MotionValue<number>; label: string }) {
  const opacity = useTransform(current, (v) => (Math.round(v) === i ? 1 : 0.3))
  return (
    <motion.span style={{ opacity }} className="label text-warm">
      {label}
    </motion.span>
  )
}
