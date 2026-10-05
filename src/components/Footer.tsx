import { company, nav, cta } from "../data/site";
import { imgSrc, imgSrcSet } from "../data/img";

export default function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <img
              src={imgSrc(company.logo, 900)}
              srcSet={imgSrcSet(company.logo)}
              sizes="200px"
              alt={company.logoText}
              width={267}
              height={67}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              {company.address}
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ink-2 transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
            <a
              href={company.phoneHref}
              className="text-sm text-ink-2 transition-colors duration-300 hover:text-ink"
            >
              {company.phone}
            </a>
            <a
              href={cta.primaryHref}
              className="bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-2 active:scale-[0.98]"
            >
              {cta.primary}
            </a>
          </div>
        </div>

        <p className="mt-16 select-none text-balance text-[clamp(2.4rem,12.5vw,10rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-ink">
          {company.name}
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-3">Berdiri sejak {company.founded}</p>
          <p className="text-xs text-ink-3">
            Copyright {new Date().getFullYear()} {company.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
