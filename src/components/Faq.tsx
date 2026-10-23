import { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { faqs } from "../data/site";
import SectionHead from "./SectionHead";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="tanya-jawab" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <SectionHead
          className="lg:col-span-4"
          title="Pertanyaan yang sering masuk."
        />

        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((faq, i) => {
            const isOpen = open === i;

            return (
              <div key={faq.q} className="border-b border-rule first:border-t">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-3 text-left"
                  >
                    <span className="text-base font-medium leading-snug text-ink">
                      {faq.q}
                    </span>
                    <span className="mt-1 shrink-0 text-ink-2">
                      {isOpen ? (
                        <Minus size={16} aria-hidden="true" />
                      ) : (
                        <Plus size={16} aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={`faq-panel-${i}`}>
                    <p className="max-w-[62ch] pb-7 text-ink-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
