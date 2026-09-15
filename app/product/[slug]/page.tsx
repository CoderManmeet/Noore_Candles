import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product/product-detail'
import { getProduct, products, relatedProducts, formatPrice } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Object Not Found — FORM / FIRE' }
  return {
    title: `${product.name} — ${product.descriptor} · FORM / FIRE`,
    description: `${product.description} ${formatPrice(product.price)}.`,
    openGraph: {
      title: `${product.name} — FORM / FIRE`,
      description: product.line,
      images: [{ url: product.image }],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return <ProductDetail product={product} related={relatedProducts(slug)} />
}
