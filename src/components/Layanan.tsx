import {
  PaintRoller,
  SquaresFour,
  Wall,
  Ruler,
  Hammer,
  Check,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { services } from "../data/site";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const ICONS: Icon[] = [PaintRoller, SquaresFour, Wall, Ruler, Hammer];

/*
  Bento 5 sel di grid 6 kolom: 4+2 / 3+3 / 6.
  Gapless: hairline 1px muncul dari background grid, bukan border per sel.
  Sel 0 sampai 3 punya foto, sel 4 teks saja dan satu-satunya sel signal.
*/
const SPANS = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-6",
];

export default function Layanan() {
  return (
    <section id="layanan" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHead
          index="01 / Layanan"
          title="Lima lini pekerjaan yang dikerjakan tim kami sendiri."
        />

        <div className="mt-14 grid grid-cols-1 gap-px bg-line md:grid-cols-6">
          {services.map((service, i) => {
            const Icon = ICONS[i];
            const isSignal = i === 4;
            const tone = isSignal ? "text-paper" : "text-ink";
            const bodyTone = isSignal ? "text-paper" : "text-ink-2";
            const lineTone = isSignal ? "border-paper/40" : "border-line";

            return (
              <Reveal
                key={service.title}
                delay={(i % 2) * 0.06}
                className={`h-full ${SPANS[i]}`}
              >
                <article
                  className={`group flex h-full flex-col ${isSignal ? "bg-signal" : "bg-paper"}`}
                >
                  {service.image && (
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        width={900}
                        height={700}
                        loading="lazy"
                        className="photo-tone absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 group-hover:photo-tone-hover"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        weight="light"
                        className={`shrink-0 ${isSignal ? "text-paper" : "text-signal"}`}
                        aria-hidden="true"
                      />
                      <h3
                        className={`text-lg font-semibold tracking-tight ${tone}`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <p
                      className={`mt-4 max-w-[40ch] leading-relaxed ${bodyTone}`}
                    >
                      {service.body}
                    </p>

                    <ul
                      className={`mt-auto space-y-2 border-t pt-6 ${lineTone}`}
                    >
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-center gap-2 text-sm ${tone}`}
                        >
                          <Check
                            size={14}
                            weight="bold"
                            className="shrink-0"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
