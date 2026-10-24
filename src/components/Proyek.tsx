import { useRef, useState } from "react";
import { motion } from "motion/react";
import { projects } from "../data/site";
import { imgSrc, imgSrcSet } from "../data/img";
import SectionHead from "./SectionHead";

export default function Proyek() {
  const [lead, ...rest] = projects;
  const [active, setActive] = useState(0);
  const keyboard = useRef(false);
  const current = rest[active];

  return (
    <section id="proyek" className="section">
      <div className="wrap">
        <SectionHead title="Contoh pekerjaan yang sudah selesai." />

        <article className="mt-12">
          <figure className="relative overflow-hidden">
            <img
              src={imgSrc(lead.image, 1600)}
              srcSet={imgSrcSet(lead.image)}
              sizes="(min-width: 1440px) 1312px, calc(100vw - 48px)"
              alt={`${lead.title}, ${lead.scope}`}
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              className="photo-tone aspect-[16/9] w-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 bg-ink p-5 text-paper sm:p-6">
              <div className="flex items-baseline gap-4">
                <h3>{lead.title}</h3>
                <span className="figure text-paper-2">{lead.meta}</span>
              </div>
              <p className="mt-1 text-sm text-paper-2">{lead.scope}</p>
            </figcaption>
          </figure>
        </article>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="sticky top-0 z-10 -mx-4 border-b border-rule bg-paper px-4 pb-3 sm:-mx-6 sm:px-6 lg:sticky lg:top-8 lg:z-0 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mx-0 lg:border-0 lg:p-0">
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[4/3]">
              {rest.map((project, i) => (
                <img
                  key={project.title}
                  src={imgSrc(project.image, 1600)}
                  srcSet={imgSrcSet(project.image)}
                  sizes="(min-width: 1024px) 47vw, 92vw"
                  alt={`Proyek ${project.title} oleh PT Finishing Decor Jaya - ${project.scope}`}
                  width={1600}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  aria-hidden={false}
                  className={`photo-tone absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--dur-long)] ease-out motion-reduce:transition-none ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            <div className="mt-4 flex items-start justify-between gap-6">
              <div>
                <h3>{current.title}</h3>
                <p className="mt-1 text-sm text-ink-2">{current.scope}</p>
              </div>
              <span className="figure shrink-0 text-ink-2">
                {String(active + 2).padStart(2, "0")} / {rest.length + 1}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <p className="mb-3 text-sm text-muted">
              Gulir atau pilih nama proyek.
            </p>
            <ol className="border-t border-rule">
              {rest.map((project, i) => (
                <motion.li
                  key={project.title}
                  onViewportEnter={() => {
                    if (!keyboard.current) setActive(i);
                  }}
                  viewport={{ margin: "-60% 0px -32% 0px" }}
                  className="border-b border-rule py-1.5"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => {
                      keyboard.current = false;
                      setActive(i);
                    }}
                    onFocus={(e) => {
                      keyboard.current = e.currentTarget.matches(":focus-visible");
                      setActive(i);
                    }}
                    onBlur={() => {
                      keyboard.current = false;
                    }}
                    aria-label={`${String(i + 2).padStart(2, "0")} ${project.title}, ${project.scope}, ${project.meta}`}
                    aria-pressed={i === active}
                    className="flex w-full items-baseline gap-4 py-3 text-left"
                  >
                    <span
                      className={`figure shrink-0 transition-colors duration-[var(--dur-short)] ${
                        i === active ? "text-accent" : "text-muted"
                      }`}
                    >
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-base font-semibold transition-colors duration-[var(--dur-short)] ${
                        i === active ? "text-ink" : "text-ink-2"
                      }`}
                    >
                      {project.title}
                    </span>
                    <span className="figure shrink-0 text-muted">
                      {project.meta}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
