import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

/*
  Arah datang dipilih per section supaya gerak mengikuti isi konten, bukan
  satu pola untuk semua elemen (RHYTHM 3). Semua property yang dianimasikan
  transform dan opacity saja.
*/
const FROM = {
  up: { opacity: 0, y: 26 },
  left: { opacity: 0, x: -30 },
  right: { opacity: 0, x: 30 },
  scale: { opacity: 0, scale: 1.04 },
};

/**
 * The only scroll-reveal primitive on the page. Every section composes this,
 * so the reduced-motion behavior is defined in exactly one place.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : FROM[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
