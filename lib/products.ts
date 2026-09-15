export type CandleTheme = {
  /** Background wash behind the object in the collection / detail views */
  background: string
  /** Foreground text tone that reads on the background */
  foreground: string
  /** Muted tone for secondary text */
  muted: string
  /** Short atmosphere descriptor shown as an environment label */
  atmosphere: string
}

export type ProductDetailBlock = {
  label: string
  body: string
}

export type Product = {
  id: string
  slug: string
  name: string
  descriptor: string
  /** One-line poetic line used in the collection scroller */
  line: string
  /** Longer editorial paragraph for the detail page */
  description: string
  price: number
  currency: string
  image: string
  /** Additional gallery angles (falls back to [image] when empty) */
  gallery: string[]
  theme: CandleTheme
  details: ProductDetailBlock[]
  dimensions: string
  burnTime: string
}

export const CURRENCY = '₹'

export function formatPrice(value: number) {
  return `${CURRENCY}${value.toLocaleString('en-IN')}`
}

const care: ProductDetailBlock = {
  label: 'Care',
  body: 'Trim the wick to 5mm before each lighting. Burn on a heat-safe surface, away from draft. As a sculptural object it is designed to reshape as it burns — this is intended.',
}

export const products: Product[] = [
  {
    id: '01',
    slug: 'sol',
    name: 'SOL',
    descriptor: 'Sculptural Candle',
    line: 'A distorted sun, caught mid-collapse.',
    description:
      'An intentionally imperfect sculptural form, hand-poured and finished individually. SOL takes the language of a sun and softens it until it feels found rather than made.',
    price: 1490,
    currency: CURRENCY,
    image: '/candles/sol.png',
    gallery: ['/candles/sol.png', '/candles/sol-hero.png', '/editorial/texture.png'],
    theme: {
      background: '#1c1712',
      foreground: '#f3efe7',
      muted: '#a98f78',
      atmosphere: 'Warm / Minimal',
    },
    details: [
      { label: 'The Form', body: 'A tall, radiant silhouette with soft distortions that catch light differently from every angle.' },
      { label: 'The Material', body: 'Natural vegetable wax in a warm ivory tone, left matte with visible pour marks.' },
      { label: 'The Process', body: 'Hand-poured in small batches and finished by hand. No two are identical.' },
      care,
    ],
    dimensions: '14 × 9 × 9 cm',
    burnTime: '≈ 32 hours',
  },
  {
    id: '02',
    slug: 'pebble',
    name: 'PEBBLE',
    descriptor: 'Organic Form Candle',
    line: 'A stone worn smooth by nothing at all.',
    description:
      'PEBBLE is quiet. A smooth organic mass in off-white and sand, it sits like something carried in from a shoreline and set down to be admired.',
    price: 1290,
    currency: CURRENCY,
    image: '/candles/pebble.png',
    gallery: ['/candles/pebble.png', '/editorial/texture.png'],
    theme: {
      background: '#2a2620',
      foreground: '#f3efe7',
      muted: '#d8d0c2',
      atmosphere: 'Stone / Still',
    },
    details: [
      { label: 'The Form', body: 'A rounded, palm-sized mass with no hard edges — deliberately anonymous.' },
      { label: 'The Material', body: 'Sand-toned vegetable wax with a soft, chalk-matte surface.' },
      { label: 'The Process', body: 'Shaped by hand and settled slowly so the surface stays uninterrupted.' },
      care,
    ],
    dimensions: '9 × 11 × 8 cm',
    burnTime: '≈ 26 hours',
  },
  {
    id: '03',
    slug: 'melt',
    name: 'MELT',
    descriptor: 'Drip Sculpture',
    line: 'Frozen in the act of becoming liquid.',
    description:
      'MELT is a contradiction held still — a candle designed to look mid-melt before it is ever lit. Wax appears to flow down its own body and stops.',
    price: 1690,
    currency: CURRENCY,
    image: '/candles/melt.png',
    gallery: ['/candles/melt.png', '/editorial/wick.png'],
    theme: {
      background: '#161310',
      foreground: '#f3efe7',
      muted: '#a98f78',
      atmosphere: 'Liquid / Wax',
    },
    details: [
      { label: 'The Form', body: 'A deformed column with glossy drips frozen against a matte body.' },
      { label: 'The Material', body: 'Cream and clay-toned wax layered to contrast gloss and matte.' },
      { label: 'The Process', body: 'Each drip is coaxed by hand while the wax is still warm, then set.' },
      care,
    ],
    dimensions: '16 × 8 × 8 cm',
    burnTime: '≈ 34 hours',
  },
  {
    id: '04',
    slug: 'arch',
    name: 'ARCH',
    descriptor: 'Architectural Candle',
    line: 'Brutalism, poured small.',
    description:
      'ARCH borrows from concrete and shadow. A geometric, architectural object of stacked forms and clean planes, muted to the colour of stone.',
    price: 1590,
    currency: CURRENCY,
    image: '/candles/arch.png',
    gallery: ['/candles/arch.png', '/editorial/studio-molds.png'],
    theme: {
      background: '#242019',
      foreground: '#f3efe7',
      muted: '#d8d0c2',
      atmosphere: 'Concrete / Edge',
    },
    details: [
      { label: 'The Form', body: 'Stacked arches and crisp planes that throw hard, deliberate shadows.' },
      { label: 'The Material', body: 'Muted clay-and-stone toned wax with a fine architectural matte.' },
      { label: 'The Process', body: 'Cast in hand-built molds, then finished so each facet stays sharp.' },
      care,
    ],
    dimensions: '15 × 10 × 10 cm',
    burnTime: '≈ 30 hours',
  },
  {
    id: '05',
    slug: 'bloom',
    name: 'BLOOM',
    descriptor: 'Floral Form Candle',
    line: 'A flower abstracted until only rhythm remains.',
    description:
      'BLOOM is soft geometry — layered organic petals folded into an abstract flower. It reads as botanical without ever naming a species.',
    price: 1390,
    currency: CURRENCY,
    image: '/candles/bloom.png',
    gallery: ['/candles/bloom.png', '/editorial/texture.png'],
    theme: {
      background: '#2c271f',
      foreground: '#f3efe7',
      muted: '#d8d0c2',
      atmosphere: 'Organic / Petal',
    },
    details: [
      { label: 'The Form', body: 'Layered petals that spiral around a soft, open centre.' },
      { label: 'The Material', body: 'Ivory and pale clay wax with a delicate, powdery matte.' },
      { label: 'The Process', body: 'Each petal is formed and set by hand, one layer at a time.' },
      care,
    ],
    dimensions: '12 × 12 × 12 cm',
    burnTime: '≈ 28 hours',
  },
  {
    id: '06',
    slug: 'totem',
    name: 'TOTEM',
    descriptor: 'Stacked Sculpture',
    line: 'Forms balanced like a held breath.',
    description:
      'TOTEM stacks organic masses into a single balancing act. Darkest of the collection, it is made to be lit low and watched.',
    price: 1890,
    currency: CURRENCY,
    image: '/candles/totem.png',
    gallery: ['/candles/totem.png', '/editorial/studio-hands.png'],
    theme: {
      background: '#12100d',
      foreground: '#f3efe7',
      muted: '#a98f78',
      atmosphere: 'Dark / Sculptural',
    },
    details: [
      { label: 'The Form', body: 'Multiple rounded forms balanced into a vertical totem.' },
      { label: 'The Material', body: 'Warm taupe and clay wax, low-key and matte.' },
      { label: 'The Process', body: 'Balanced and joined by hand — the stack is judged by eye.' },
      care,
    ],
    dimensions: '18 × 8 × 8 cm',
    burnTime: '≈ 38 hours',
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function relatedProducts(slug: string, count = 3) {
  return products.filter((p) => p.slug !== slug).slice(0, count)
}
