'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import { CandleViewer } from '@/components/3d/candle-viewer'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/products'

export function ProductViewer({ product }: { product: Product }) {
  const gallery = product.gallery.length ? product.gallery : [product.image]
  const [current, setCurrent] = useState(gallery[0])
  const [full, setFull] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ backgroundColor: product.theme.background }}
    >
      <div className="relative flex min-h-[68vh] w-full items-center justify-center pt-[14vh]">
        <CandleViewer
          key={current}
          image={current}
          alt={`${product.name} — ${product.descriptor}`}
          priority
          sizeClassName="w-[76vw] max-w-[400px]"
        />

        <button
          onClick={() => setFull(true)}
          aria-label="View fullscreen"
          className="absolute right-5 top-[16vh] z-20 grid h-10 w-10 place-items-center rounded-full border border-warm/20 text-warm transition-colors hover:bg-white/10 md:right-8"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex gap-3 pb-6">
          {gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(src)}
              aria-label={`View angle ${i + 1}`}
              className={cn(
                'h-16 w-14 overflow-hidden rounded-sm border transition-colors',
                current === src ? 'border-warm' : 'border-white/15 opacity-60',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src || '/placeholder.svg'} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {full && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFull(false)}
          >
            <button
              onClick={() => setFull(false)}
              aria-label="Close fullscreen"
              className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-warm/20 text-warm md:right-8 md:top-8"
            >
              <X className="h-5 w-5" />
            </button>
            <div onClick={(e) => e.stopPropagation()} className="w-full">
              <CandleViewer
                image={current}
                alt={`${product.name}, fullscreen`}
                sizeClassName="w-[88vw] max-w-[600px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
