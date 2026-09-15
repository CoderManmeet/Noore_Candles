'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Product, ProductDetailBlock } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductInfo({ product }: { product: Product }) {
  const blocks: ProductDetailBlock[] = [
    ...product.details,
    { label: 'Dimensions', body: product.dimensions },
    { label: 'Burn Time', body: product.burnTime },
  ]

  return (
    <div className="px-5 py-14 md:px-8">
      <span className="label text-clay">{product.descriptor}</span>
      <h1 className="mt-3 font-serif text-[clamp(3rem,16vw,7rem)] leading-[0.85] tracking-tight text-warm">
        {product.name}
      </h1>
      <p className="mt-6 max-w-md font-serif text-xl leading-snug text-stone">
        {product.description}
      </p>

      <div className="mt-12 border-t border-white/10">
        {blocks.map((b) => (
          <Accordion key={b.label} block={b} />
        ))}
      </div>
    </div>
  )
}

function Accordion({ block }: { block: ProductDetailBlock }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-serif text-lg text-warm">{block.label}</span>
        <Plus
          className={cn('h-4 w-4 text-clay transition-transform duration-300', open && 'rotate-45')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-8 text-sm leading-relaxed text-stone">{block.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
