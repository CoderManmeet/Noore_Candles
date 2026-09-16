import { HeroScene } from '@/components/sections/hero-scene'
import { ObjectSection } from '@/components/sections/object-section'
import { MakingSection } from '@/components/sections/making-section'
import { CollectionSection } from '@/components/sections/collection-section'
import { ExplorerSection } from '@/components/sections/explorer-section'
import { LightSection } from '@/components/sections/light-section'
import { StudioSection } from '@/components/sections/studio-section'
import { ShopSection } from '@/components/sections/shop-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative w-full bg-ink">
      <HeroScene />
      <ObjectSection />
      <MakingSection />
      <CollectionSection />
      <ExplorerSection />
      <LightSection />
      <StudioSection />
      <ShopSection />
      <SiteFooter />
    </main>
  )
}
