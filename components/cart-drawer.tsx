'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { formatPrice } from '@/lib/products'

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQty, count } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[440px] flex-col bg-ink-soft text-warm grain"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <h2 className="label text-stone">Your Bag {count > 0 && `(${count})`}</h2>
              <button
                onClick={close}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-warm transition-colors hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="font-serif text-2xl text-warm">Your bag is empty.</p>
                  <p className="text-sm text-clay">Every object is made to be lit.</p>
                </div>
              ) : (
                <ul className="divide-y divide-white/10">
                  {lines.map((line) => (
                    <li key={line.slug} className="flex gap-4 py-6">
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={line.image || '/placeholder.svg'}
                          alt={line.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-serif text-lg leading-none text-warm">{line.name}</p>
                          <p className="mt-1 text-xs text-clay">{line.descriptor}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-white/15 px-3 py-1.5">
                            <button
                              onClick={() => setQty(line.slug, line.quantity - 1)}
                              aria-label={`Decrease ${line.name} quantity`}
                              className="text-clay transition-colors hover:text-warm"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-4 text-center text-sm tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => setQty(line.slug, line.quantity + 1)}
                              aria-label={`Increase ${line.name} quantity`}
                              className="text-clay transition-colors hover:text-warm"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm tabular-nums text-stone">
                            {formatPrice(line.price * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-white/10 px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="label text-clay">Subtotal</span>
                  <span className="font-serif text-2xl tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <button className="group relative w-full overflow-hidden rounded-full bg-warm py-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-ink transition-transform active:scale-[0.98]">
                  <span className="relative z-10">Checkout</span>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-ember transition-transform duration-500 group-hover:scale-x-100" />
                </button>
                <p className="mt-3 text-center text-[11px] text-clay">
                  Taxes and shipping calculated at checkout.
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
