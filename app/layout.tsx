import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Archivo } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CartProvider } from '@/components/cart-provider'
import { CartDrawer } from '@/components/cart-drawer'
import { SiteNav } from '@/components/site-nav'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FORM / FIRE — Objects Made to Be Lit',
  description:
    'FORM / FIRE creates sculptural, handmade candle objects. Small batch, slow process, no two pieces exactly alike. An object designed to change a room before it is ever lit.',
  generator: 'v0.app',
  openGraph: {
    title: 'FORM / FIRE — Objects Made to Be Lit',
    description:
      'Sculptural, handmade candle objects. A digital gallery of collectible design pieces made to be lit.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <CartProvider>
            <SiteNav />
            {children}
            <CartDrawer />
          </CartProvider>
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
