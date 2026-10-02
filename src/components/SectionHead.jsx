import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

const EASE = [0.16, 1, 0.3, 1];

/* Dipakai semua section supaya skala dan ritme heading konsisten di satu tempat. */
export default function SectionHead({ index, title, body, className = "" }) {
  const reduce = useReducedMotion();

  return (
    <Reveal className={className}>
      <div className="flex items-baseline gap-4 border-t border-line pt-4">
        <motion.span
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal"
        >
          {index}
        </motion.span>

        {/* Motif identitas: hairline tergambar dari kiri saat section masuk. */}
        <motion.span
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          style={{ originX: 0 }}
          aria-hidden="true"
          className="h-px flex-1 bg-line"
        />
      </div>

      <h2 className="mt-7 max-w-[20ch] text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-ink md:text-4xl lg:text-[3.4rem]">
        {title}
      </h2>

      {body && (
        <p className="mt-6 max-w-[44ch] leading-relaxed text-ink-2">{body}</p>
      )}
    </Reveal>
  );
}
