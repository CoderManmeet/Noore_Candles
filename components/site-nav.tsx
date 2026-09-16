'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/components/cart-provider'
import { useSmoothScroll } from '@/components/smooth-scroll'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Collection', target: '#collection' },
  { label: 'Process', target: '#process' },
  { label: 'Studio', target: '#studio' },
  { label: 'Explore', target: '#explore' },
  { label: 'Shop', target: '#shop' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const { count, open: openCart } = useCart()
  const { scrollTo } = useSmoothScroll()
  const pathname = usePathname()
  const go = (target: string) => {
    setOpen(false)
    if (pathname === '/') {
      setTimeout(() => scrollTo(target), 60)
    } else {
      window.location.assign(`/${target}`)
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-5 md:px-8">
          <Link
            href="/"
            className="font-serif text-lg tracking-tight text-warm md:text-xl"
            aria-label="NOORE home"
          >
            NOORE
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="label text-warm transition-opacity hover:opacity-70"
              aria-label={`Open bag, ${count} items`}
            >
              Bag{count > 0 ? ` · ${count}` : ''}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="label text-warm transition-opacity hover:opacity-70"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink grain"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-5 md:px-8">
              <span className="font-serif text-lg tracking-tight text-warm md:text-xl">
                NOORE
              </span>
              <button
                onClick={() => setOpen(false)}
                className="label text-warm transition-opacity hover:opacity-70"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-5 md:px-8">
              <ul>
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => go(link.target)}
                      className="group block w-full py-1 text-left"
                    >
                      <span
                        className={cn(
                          'font-serif text-[clamp(2.75rem,13vw,7rem)] leading-[0.95] tracking-tight text-warm',
                          'transition-colors duration-300 group-hover:text-clay',
                        )}
                      >
                        {link.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-6 md:px-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="label text-clay transition-colors hover:text-warm"
              >
                Instagram ↗
              </a>
              <span className="label text-clay">Objects Made to Be Lit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
