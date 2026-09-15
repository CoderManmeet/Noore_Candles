'use client'

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'

type ScrollTarget = string | number | HTMLElement

const LenisContext = createContext<{ scrollTo: (t: ScrollTarget) => void }>({
  scrollTo: () => {},
})

export function useSmoothScroll() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.1,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    let frame = 0
    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (target: ScrollTarget) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.4 })
      return
    }
    // Reduced-motion / no-lenis fallback
    if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    } else if (typeof target === 'number') {
      window.scrollTo(0, target)
    } else {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
  }

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>
}
