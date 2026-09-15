export function SiteFooter() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-ink px-5 py-16 text-warm md:px-8">
      <div className="flex flex-col gap-12">
        <p className="font-serif text-[clamp(2.5rem,14vw,9rem)] leading-none tracking-tight">
          FORM <span className="text-clay">/</span> FIRE
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <FooterCol title="Objects" links={['Collection', 'Shop', 'The Studio', 'Process']} />
          <FooterCol title="Studio" links={['About', 'Stockists', 'Contact', 'Trade']} />
          <FooterCol title="Care" links={['Shipping', 'Returns', 'Candle Care', 'FAQ']} />
          <div>
            <p className="label text-clay">Follow</p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm text-stone transition-colors hover:text-warm"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-clay md:flex-row">
          <span>Objects Made to Be Lit.</span>
          <span>© {new Date().getFullYear()} FORM / FIRE. Made in small batches.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="label text-clay">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l}>
            <span className="cursor-pointer text-sm text-stone transition-colors hover:text-warm">
              {l}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
