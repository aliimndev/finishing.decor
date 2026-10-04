import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "@phosphor-icons/react";
import { faqs } from "../data/site";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const EASE = [0.16, 1, 0.3, 1];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="tanya-jawab" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHead
            className="lg:col-span-4"
            index="04 / Tanya Jawab"
            title="Pertanyaan yang sering masuk."
          />

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.q} delay={Math.min(i, 4) * 0.05}>
                  <div className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span className="text-base font-medium leading-snug text-ink md:text-lg">
                          {faq.q}
                        </span>
                        <span className="mt-0.5 grid size-7 shrink-0 place-items-center border border-line text-ink-2">
                          {isOpen ? (
                            <Minus size={13} weight="bold" aria-hidden="true" />
                          ) : (
                            <Plus size={13} weight="bold" aria-hidden="true" />
                          )}
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          key="panel"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pb-7 leading-relaxed text-ink-2">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
