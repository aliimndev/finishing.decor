import { company, nav, cta } from "../data/site";
import { imgSrc, imgSrcSet } from "../data/img";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap section-s">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <img
              src={imgSrc(company.logo, 900)}
              srcSet={imgSrcSet(company.logo)}
              sizes="224px"
              alt={company.logoText}
              width={560}
              height={141}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-paper-2">
              {company.address}
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-sm text-paper-2 hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-2">
            <a
              href={company.phoneHref}
              className="flex min-h-11 items-center text-sm text-paper-2 hover:text-paper"
            >
              {company.phone}
            </a>
            <a
              href={cta.primaryHref}
              className="link text-paper hover:text-paper-2"
            >
              {cta.primary}
            </a>
          </div>
        </div>

        <p className="mt-16 select-none text-[clamp(3rem,12.5vw,10rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-paper">
          {company.name}
        </p>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 text-sm text-paper-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Berdiri sejak {company.founded}</p>
          <p>
            Copyright {new Date().getFullYear()} {company.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
