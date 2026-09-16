'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { products, formatPrice, type Product } from '@/lib/products'
import { useCart } from '@/components/cart-provider'

export function ShopSection() {
  return (
    <section id="shop" className="relative w-full bg-warm px-5 py-[16vh] text-ink md:px-8" aria-label="Shop the Objects">
      <div className="flex items-end justify-between">
        <div>
          <span className="label text-clay">08 — Shop</span>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,10vw,5rem)] leading-[0.9] tracking-tight">
            Shop the Objects
          </h2>
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {products.map((p) => (
          <ShopCard key={p.slug} product={p} />
        ))}
      </ul>
    </section>
  )
}

function ShopCard({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <li>
      <motion.div whileTap={{ scale: 0.985 }} className="group">
        <Link href={`/product/${product.slug}`} className="block">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
            style={{ backgroundColor: product.theme.background }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image || '/placeholder.svg'}
              alt={`${product.name} — ${product.descriptor}`}
              className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>

        <div className="mt-4 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-serif text-xl leading-none">{product.name}</h3>
            </Link>
            <p className="mt-1 truncate text-xs text-clay">{product.descriptor}</p>
            <p className="mt-2 text-sm tabular-nums">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={() => add(product, 1)}
            aria-label={`Quick add ${product.name} to bag`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-warm active:scale-90"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </li>
  )
}
