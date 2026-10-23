import { process } from "../data/site";
import SectionHead from "./SectionHead";

export default function Proses() {
  return (
    <section id="proses" className="section border-y border-rule bg-paper-2">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <SectionHead
          className="lg:col-span-5"
          title="Empat langkah, dari survei sampai serah terima."
          body="Tidak ada tahap yang dilewati. Tiap tahap selesai, kami kirim foto dan perkiraan waktu berikutnya."
        />

        <ol className="border-t border-rule lg:col-span-7 lg:col-start-6">
          {process.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-rule py-6"
            >
              <span className="figure col-span-2 pt-1 text-accent lg:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-10 lg:col-span-3">{step.title}</h3>
              <p className="col-span-12 text-ink-2 lg:col-span-8 lg:col-start-5">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
