import { process } from "../data/site";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/*
  Empat langkah jadi strip horizontal 4 kolom, dipisah hairline dari
  background grid. Lebih sederhana dari garis waktu vertikal dan tidak
  meninggalkan ruang kosong di kanan bawah.
*/
export default function Proses() {
  return (
    <section
      id="proses"
      className="border-y border-line bg-paper-2 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHead
          index="03 / Proses"
          title="Empat langkah, dari survei sampai serah terima."
          body="Tidak ada tahap yang dilewati. Setiap kali selesai satu tahap, kami kirim foto dan perkiraan waktu tahap berikutnya."
        />

        <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title} className="bg-paper">
              <Reveal
                from="left"
                delay={i * 0.08}
                className="flex h-full flex-col p-8 md:p-9"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34ch] leading-relaxed text-ink-2">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
