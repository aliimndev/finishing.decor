import { projects } from "../data/site";
import { imgSrc, imgSrcSet } from "../data/img";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/*
  Proyek pertama jadi satu plate full-bleed 16:9 supayagallery punya satu
  momen besar, sisanya masonry dua kolom yang saling bergantian menyimpan
  tinggi (4/5, 3/4, 4/3) supaya ritmenya tidak seragam.
*/
export default function Proyek() {
  const [lead, ...rest] = projects;

  return (
    <section id="proyek" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHead
          index="02 / Proyek"
          title="Contoh pekerjaan yang sudah selesai."
        />

        <Reveal from="scale">
          <article className="group mt-14">
            <div className="aspect-[16/9] overflow-hidden sm:-mx-6 lg:-mx-10">
              <img
                src={imgSrc(lead.image, 1600)}
                srcSet={imgSrcSet(lead.image)}
                sizes="(min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
                alt={`${lead.title}, ${lead.scope}`}
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="photo-tone h-full w-full object-cover transition-[filter] duration-500 group-hover:photo-tone-hover"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {lead.title}
              </h3>
              <span className="shrink-0 font-mono text-xs text-ink-3">
                {lead.meta}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-ink-2">{lead.scope}</p>
          </article>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-4 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {rest.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 2) * 0.08}
              className={i % 2 === 1 ? "md:mt-20" : ""}
            >
              <article className="group">
                <div className={`overflow-hidden ${project.aspect}`}>
                  <img
                    src={imgSrc(project.image, 900)}
                    srcSet={imgSrcSet(project.image)}
                    sizes="(min-width: 768px) 46vw, 92vw"
                    alt={`${project.title}, ${project.scope}`}
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="photo-tone h-full w-full object-cover transition-[filter] duration-500 group-hover:photo-tone-hover"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {project.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-ink-3">
                    {project.meta}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink-2">{project.scope}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
