'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { formatPrice, type Product } from '@/lib/products'

export function AddBar({ product }: { product: Product }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink-soft/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 md:px-8">
        <div className="hidden flex-col md:flex">
          <span className="font-serif text-xl text-warm">{product.name}</span>
          <span className="text-sm tabular-nums text-clay">{formatPrice(product.price)}</span>
        </div>

        <div className="flex items-center gap-4 rounded-full border border-white/15 px-4 py-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="text-clay transition-colors hover:text-warm"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-5 text-center text-sm tabular-nums text-warm">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(8, q + 1))}
            aria-label="Increase quantity"
            className="text-clay transition-colors hover:text-warm"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => add(product, qty)}
          className="group relative flex-1 overflow-hidden rounded-full bg-warm py-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-ink transition-transform active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Add to Bag
            <span className="tabular-nums opacity-70 md:hidden">{formatPrice(product.price * qty)}</span>
          </span>
          <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 group-hover:scale-x-100" />
        </button>
      </div>
    </div>
  )
}
