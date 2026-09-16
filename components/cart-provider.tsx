'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '@/lib/products'

export type CartLine = {
  slug: string
  name: string
  descriptor: string
  price: number
  image: string
  quantity: number
}

type CartState = { lines: CartLine[] }

type Action =
  | { type: 'add'; product: Product; quantity: number }
  | { type: 'setQty'; slug: string; quantity: number }
  | { type: 'remove'; slug: string }

const MAX_PER_ITEM = 8

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((l) => l.slug === action.product.slug)
      const qty = Math.max(1, Math.min(MAX_PER_ITEM, action.quantity))
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.slug === action.product.slug
              ? { ...l, quantity: Math.min(MAX_PER_ITEM, l.quantity + qty) }
              : l,
          ),
        }
      }
      return {
        lines: [
          ...state.lines,
          {
            slug: action.product.slug,
            name: action.product.name,
            descriptor: action.product.descriptor,
            price: action.product.price,
            image: action.product.image,
            quantity: qty,
          },
        ],
      }
    }
    case 'setQty': {
      const quantity = Math.max(0, Math.min(MAX_PER_ITEM, action.quantity))
      if (quantity === 0) return { lines: state.lines.filter((l) => l.slug !== action.slug) }
      return {
        lines: state.lines.map((l) => (l.slug === action.slug ? { ...l, quantity } : l)),
      }
    }
    case 'remove':
      return { lines: state.lines.filter((l) => l.slug !== action.slug) }
    default:
      return state
  }
}

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: Product, quantity?: number) => void
  setQty: (slug: string, quantity: number) => void
  remove: (slug: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] })
  const [isOpen, setOpen] = useState(false)

  const add = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'add', product, quantity })
    setOpen(true)
  }, [])
  const setQty = useCallback((slug: string, quantity: number) => {
    dispatch({ type: 'setQty', slug, quantity })
  }, [])
  const remove = useCallback((slug: string) => dispatch({ type: 'remove', slug }), [])

  const count = state.lines.reduce((n, l) => n + l.quantity, 0)
  const subtotal = state.lines.reduce((n, l) => n + l.quantity * l.price, 0)

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      count,
      subtotal,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQty,
      remove,
    }),
    [state.lines, count, subtotal, isOpen, add, setQty, remove],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
