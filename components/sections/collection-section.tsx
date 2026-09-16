'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { products, formatPrice } from '@/lib/products'
import { stops } from '@/lib/scroll'

const N = products.length

function Panel({
  index,
  progress,
  product,
}: {
  index: number
  progress: MotionValue<number>
  product: (typeof products)[number]
}) {
  const center = index / (N - 1)
  const span = 1 / (N - 1)
  const opacity = useTransform(
    progress,
    stops(center - span * 0.62, center - span * 0.24, center + span * 0.24, center + span * 0.62),
    [0, 1, 1, 0],
  )
  const imageScale = useTransform(progress, [center - span, center, center + span], [0.82, 1, 0.82])
  const imageY = useTransform(progress, [center - span, center, center + span], ['12%', '0%', '-12%'])
  const imageRotate = useTransform(progress, [center - span, center, center + span], [index % 2 ? -5 : 5, 0, index % 2 ? 5 : -5])
  const copyY = useTransform(progress, [center - span * 0.7, center, center + span * 0.7], ['28px', '0px', '-28px'])
  const composition = index % 3

  return (
    <motion.article style={{ opacity }} className="absolute inset-0" aria-roledescription="gallery slide" aria-label={`${index + 1} of ${N}: ${product.name}`}>
      <Link
        href={`/product/${product.slug}`}
        className={`group relative block h-full w-full overflow-hidden ${composition === 1 ? 'collection-room--offset' : composition === 2 ? 'collection-room--low' : ''}`}
        aria-label={`View ${product.name}, ${formatPrice(product.price)}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.055),transparent_48%)]" />
        <div className="absolute left-5 top-[25vh] z-10 max-w-[14rem] md:left-8 md:top-[24vh]">
          <span className="label text-warm/45">Room {String(index + 1).padStart(2, '0')}</span>
          <p className="mt-3 font-serif text-lg leading-tight text-warm/80 md:text-2xl">{product.line}</p>
        </div>

        <motion.div
          style={{ scale: imageScale, y: imageY, rotate: imageRotate }}
          className="candle-model absolute left-1/2 top-[47%] z-[2] w-[78vw] max-w-[390px] -translate-x-1/2 -translate-y-1/2 md:top-[48%] md:w-[34vw]"
        >
          <div className="candle-model__ground" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt="" className="candle-model__image h-auto w-full object-contain" />
          <span className="candle-model__wax" aria-hidden="true" />
          <span className="candle-model__highlight" aria-hidden="true" />
          <span className="candle-model__warmth" aria-hidden="true" />
        </motion.div>

        <motion.div style={{ y: copyY }} className="absolute inset-x-5 bottom-[7vh] z-10 md:inset-x-8 md:bottom-[8vh]">
          <div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4">
            <div>
              <span className="label" style={{ color: product.theme.muted }}>{product.atmosphere}</span>
              <h3 className="mt-2 font-serif text-[clamp(2.8rem,15vw,7rem)] leading-[0.82] tracking-tight text-warm">{product.name}</h3>
            </div>
            <span className="mb-1 flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.18em] text-warm/80 transition-transform duration-500 group-hover:translate-x-1">
              Enter room <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-warm/55">
            <span>{product.descriptor}</span>
            <span className="font-serif text-lg text-warm">{formatPrice(product.price)}</span>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}

export function CollectionSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bg = useTransform(scrollYProgress, products.map((_, i) => i / (N - 1)), products.map((p) => p.theme.background))
  const activeIndex = useTransform(scrollYProgress, (v) => Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))))

  return (
    <section ref={ref} id="collection" className="relative w-full" style={{ height: `${N * 100}vh` }} aria-label="The Collection digital gallery">
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 h-[100svh] w-full overflow-hidden grain">
        <div className="absolute left-5 top-[13vh] z-30 md:left-8">
          <span className="label text-warm/50">04 — The Collection</span>
          <h2 className="mt-3 font-serif text-3xl text-warm md:text-4xl">Walk the rooms</h2>
        </div>
        <div className="absolute right-5 top-[13vh] z-30 text-right md:right-8">
          <span className="label text-warm/40">Swipe / Scroll</span>
          <p className="mt-2 text-xs text-warm/45">One object at a time</p>
        </div>
        {products.map((p, i) => <Panel key={p.slug} index={i} progress={scrollYProgress} product={p} />)}
        <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-3 md:right-8" aria-label="Gallery progress">
          {products.map((p, i) => <Indicator key={p.slug} i={i} active={activeIndex} />)}
        </div>
      </motion.div>
    </section>
  )
}

function Indicator({ i, active }: { i: number; active: MotionValue<number> }) {
  const opacity = useTransform(active, (v) => (v === i ? 1 : 0.3))
  const width = useTransform(active, (v) => (v === i ? 28 : 10))
  return <div className="flex items-center gap-2"><motion.span style={{ opacity }} className="label text-warm tabular-nums">{String(i + 1).padStart(2, '0')}</motion.span><motion.span style={{ width, opacity }} className="block h-px bg-warm" /></div>
}
