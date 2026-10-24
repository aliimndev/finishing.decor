import { services } from "../data/site";
import { imgSrc, imgSrcSet } from "../data/img";
import SectionHead from "./SectionHead";

export default function Layanan() {
  return (
    <section id="layanan" className="section">
      <div className="wrap">
        <SectionHead
          title="Layanan Jasa Finishing Rumah dan Interior"
          body="PT Finishing Decor Jaya siap melayani kebutuhan finishing rumah, interior, dan bangunan di seluruh Indonesia."
        />

        <ol className="mt-12 border-t border-rule">
          {services.map((service, i) => {
            const hasImage = Boolean(service.image);

            return (
              <li
                key={service.title}
                className="grid grid-cols-12 items-start gap-x-8 gap-y-4 border-b border-rule py-8"
              >
                <span className="figure col-span-2 pt-1 text-accent lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="col-span-10 lg:col-span-3">{service.title}</h3>

                <p
                  className={`col-span-12 text-ink-2 lg:col-span-3 ${
                    hasImage ? "" : "lg:col-span-5"
                  }`}
                >
                  {service.body}
                </p>

                <ul className="col-span-12 space-y-1 text-sm text-ink-2 lg:col-span-2">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {hasImage && service.image && (
                  <div className="col-span-12 lg:col-span-3">
                    <img
                      src={imgSrc(service.image, 900)}
                      srcSet={imgSrcSet(service.image)}
                      sizes="(min-width: 1024px) 24vw, 100vw"
                      alt={`Pekerjaan ${service.title.toLowerCase()} oleh PT Finishing Decor Jaya`}
                      width={900}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      className="photo-tone aspect-[16/9] w-full object-cover lg:aspect-[4/3]"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
