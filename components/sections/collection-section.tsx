'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
    stops(center - span * 0.55, center - span * 0.2, center + span * 0.2, center + span * 0.55),
    [0, 1, 1, 0],
  )
  const scale = useTransform(progress, [center - span, center, center + span], [0.9, 1, 0.9])
  const imgY = useTransform(progress, [center - span, center + span], ['8%', '-8%'])

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <Link href={`/product/${product.slug}`} className="group block h-full w-full" aria-label={`View ${product.name}`}>
        <motion.div
          style={{ scale, y: imgY }}
          className="absolute left-1/2 top-[34%] w-[74vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image || '/placeholder.svg'}
            alt={`${product.name} — ${product.descriptor}`}
            className="h-auto w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        <div className="absolute inset-x-5 bottom-[10vh] md:inset-x-8">
          <span className="label" style={{ color: product.theme.muted }}>
            {`0${index + 1} / 0${N} · ${product.theme.atmosphere}`}
          </span>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <h3 className="font-serif text-[clamp(2.5rem,13vw,6rem)] leading-[0.9] tracking-tight text-warm">
                {product.name}
              </h3>
              <p className="mt-1 text-sm" style={{ color: product.theme.muted }}>
                {product.descriptor}
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="font-serif text-2xl text-warm tabular-nums">
              {formatPrice(product.price)}
            </span>
            <span className="flex items-center gap-2 label text-warm transition-transform duration-500 group-hover:translate-x-1">
              View Object
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function CollectionSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const bg = useTransform(
    scrollYProgress,
    products.map((_, i) => i / (N - 1)),
    products.map((p) => p.theme.background),
  )
  const activeIndex = useTransform(scrollYProgress, (v) => Math.round(v * (N - 1)))

  return (
    <section
      ref={ref}
      id="collection"
      className="relative w-full"
      style={{ height: `${N * 100}vh` }}
      aria-label="The Collection"
    >
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 h-screen w-full overflow-hidden grain">
        <div className="absolute left-5 top-[13vh] z-30 md:left-8">
          <span className="label text-warm/50">04 — The Collection</span>
          <h2 className="mt-3 font-serif text-3xl text-warm md:text-4xl">The Collection</h2>
        </div>

        {products.map((p, i) => (
          <Panel key={p.slug} index={i} progress={scrollYProgress} product={p} />
        ))}

        {/* Progress indicator */}
        <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-3 md:right-8">
          {products.map((p, i) => (
            <Indicator key={p.slug} i={i} active={activeIndex} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Indicator({ i, active }: { i: number; active: MotionValue<number> }) {
  const opacity = useTransform(active, (v) => (v === i ? 1 : 0.35))
  const width = useTransform(active, (v) => (v === i ? 28 : 12))
  return (
    <div className="flex items-center gap-2">
      <motion.span style={{ opacity }} className="label text-warm tabular-nums">
        {`0${i + 1}`}
      </motion.span>
      <motion.span style={{ width, opacity }} className="block h-px bg-warm" />
    </div>
  )
}
