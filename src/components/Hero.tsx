import { cta } from "../data/site";
import { imgSrc, imgSrcSet } from "../data/img";

const HERO_IMAGE = "/img/img1";

export default function Hero() {
  return (
    <section
      id="atas"
      className="relative isolate bg-ink"
      aria-labelledby="hero-title"
    >
      <img
        src={imgSrc(HERO_IMAGE, 1600)}
        srcSet={imgSrcSet(HERO_IMAGE)}
        sizes="100vw"
        alt="Rumah kolonial dua lantai dengan garasi, pagar, dan carport di Jakarta."
        width={1600}
        height={1200}
        decoding="async"
        className="photo-tone absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="wrap relative flex min-h-[calc(100dvh-4.5rem)] items-end py-8 sm:min-h-[calc(100dvh-6.75rem)] sm:py-12">
        <div className="w-full max-w-[40rem] border-t-2 border-accent bg-ink p-6 text-paper sm:p-10">
          <h1 id="hero-title">Pengerjaan finishing tanpa rework.</h1>
          <p className="lead mt-5 text-paper-2">
            Pengecatan, lantai keramik, plafon gypsum, dan kusen aluminium untuk
            dwelling dan kantor di Jabodetabek; harga sesuai RAB, ada garansi
            hasil.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={cta.primaryHref} className="btn btn-inverse">
              {cta.primary}
            </a>
            <a href={cta.secondaryHref} className="link text-paper hover:text-paper-2">
              {cta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
