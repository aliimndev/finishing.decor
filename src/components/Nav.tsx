import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { company, nav, cta } from "../data/site";
import { imgSrc, imgSrcSet } from "../data/img";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-rule bg-paper">
      <div className="hidden border-b border-rule sm:block">
        <div className="wrap flex h-9 items-center justify-between text-sm text-ink-2">
          <a
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            className="whitespace-nowrap hover:text-ink"
          >
            {company.phone}
          </a>
          <p className="flex items-center gap-4">
            <span>Jakarta Barat</span>
            <span aria-hidden="true" className="h-3 w-px bg-rule" />
            <span>Senin sampai Sabtu, 08.00 sampai 17.00</span>
          </p>
        </div>
      </div>

      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <a href="#atas" aria-label={`${company.name}, ke atas`} className="shrink-0">
          <img
            src={imgSrc(company.logo, 560)}
            srcSet={imgSrcSet(company.logo)}
            sizes="280px"
            alt={company.name}
            width={280}
            height={70}
            className="h-10 w-auto"
          />
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 transition-colors duration-[var(--dur-short)] hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={cta.primaryHref} className="btn hidden sm:inline-flex">
            {cta.primary}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="btn-icon lg:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-rule bg-paper lg:hidden"
      >
        <div className="wrap py-6">
          <nav aria-label="Navigasi ponsel">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center border-b border-rule text-ink-2 last:border-b-0 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={cta.primaryHref}
            onClick={() => setOpen(false)}
            className="btn mt-6 w-full sm:hidden"
          >
            {cta.primary}
          </a>
          <a
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            className="mt-4 flex min-h-11 items-center text-sm text-ink-2 hover:text-ink"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
