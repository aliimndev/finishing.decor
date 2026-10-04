import { useRef } from "react";
import type { MotionProps } from "motion/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { cta, company } from "../data/site";

const EASE = [0.16, 1, 0.3, 1];
const HERO_IMAGE = "/img/hero.webp";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Satu momen parallax per halaman: teks turun lebih cepat dari foto, jadi
  // Satu momen parallax per halaman: teks turun lebih cepat dari foto, jadi
  // kedua kolom terbaca punya kedalaman tanpa mengubah layout.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const enter = (delay: number): MotionProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section id="atas" ref={ref} className="relative min-h-[100dvh] pt-24">
      <div className="mx-auto grid max-w-[1400px] items-end gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <motion.div
          style={reduce ? undefined : { y: textY, opacity: fade }}
          className="lg:col-span-7 lg:pb-16 lg:pr-10"
        >
          <motion.p
            {...enter(0)}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal"
          >
            {company.tagline}
          </motion.p>

          <motion.h1
            {...enter(0.08)}
            className="mt-7 max-w-[13ch] text-balance text-[clamp(2.9rem,7.4vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink"
          >
            Pengerjaan finishing tanpa rework.
          </motion.h1>

          <motion.p
            {...enter(0.16)}
            className="mt-8 max-w-[46ch] text-base leading-relaxed text-ink-2 md:text-lg"
          >
            Pengecatan, lantai keramik, plafon gypsum, dan kusen aluminium untuk
            dwelling dan kantor di Jabodetabek. Harga sesuai RAB, ada garansi
            hasil.
          </motion.p>

          <motion.div
            {...enter(0.24)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href={cta.primaryHref}
              className="bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-2 active:scale-[0.98]"
            >
              {cta.primary}
            </a>
            <a
              href={cta.secondaryHref}
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink"
            >
              {cta.secondary}
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: plateY }}
          initial={reduce ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Rumah tinggal dua lantai dengan atap pelana, pagar besi, dan kolam"
              width={1200}
              height={1200}
              className="photo-tone absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
