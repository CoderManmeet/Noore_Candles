'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProductViewer } from '@/components/product/product-viewer'
import { ProductInfo } from '@/components/product/product-info'
import { AddBar } from '@/components/product/add-bar'
import { formatPrice, type Product } from '@/lib/products'

export function ProductDetail({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  return (
    <main className="relative w-full bg-ink pb-28">
      <ProductViewer product={product} />

      <div className="px-5 pt-8 md:px-8">
        <Link
          href="/#collection"
          className="inline-flex items-center gap-2 label text-clay transition-colors hover:text-warm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Link>
      </div>

      <ProductInfo product={product} />

      {/* Related */}
      <section className="px-5 py-14 md:px-8" aria-label="More objects">
        <h2 className="font-serif text-3xl text-warm">More Objects</h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8">
          {related.map((p) => (
            <li key={p.slug}>
              <Link href={`/product/${p.slug}`} className="group block">
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-sm"
                  style={{ backgroundColor: p.theme.background }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || '/placeholder.svg'}
                    alt={`${p.name} — ${p.descriptor}`}
                    className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-warm">{p.name}</h3>
                    <p className="text-xs text-clay">{formatPrice(p.price)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-clay transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AddBar product={product} />
    </main>
  )
}
