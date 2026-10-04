import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { company, nav, cta } from "../data/site";

const EASE = [0.32, 0.72, 0, 1];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // changed hanya diemulasikan saat nilai melewati ambang, jadi nav tidak
  // re-render pada setiap event scroll.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper">
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 lg:px-10 ${scrolled ? "h-14 md:h-16" : "h-16 md:h-[72px]"}`}
      >
        <a
          href="#atas"
          className="flex shrink-0 items-center"
          aria-label={`${company.name}, ke atas`}
        >
          <img
            src={company.logo}
            alt={company.logoText}
            width={1067}
            height={269}
            className="h-8 w-auto sm:h-10"
          />
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigasi utama"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={cta.primaryHref}
            className="hidden bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-2 active:scale-[0.98] sm:inline-block"
          >
            {cta.primary}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid size-10 place-items-center border border-line text-ink transition-colors duration-300 hover:border-ink lg:hidden"
          >
            {open ? (
              <X size={20} weight="bold" />
            ) : (
              <List size={20} weight="bold" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navigasi seluler"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="border-t border-line bg-paper px-4 pb-8 pt-4 lg:hidden sm:px-6"
          >
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i, ease: EASE }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 text-lg text-ink"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={cta.primaryHref}
              onClick={() => setOpen(false)}
              className="mt-6 block bg-ink px-5 py-3 text-center text-sm font-semibold text-paper sm:hidden"
            >
              {cta.primary}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
