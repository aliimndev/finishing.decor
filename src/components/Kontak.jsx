import { useState } from "react";
import {
  WhatsappLogo,
  Envelope,
  MapPin,
  Clock,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { company, cta, services } from "../data/site";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const FIELD =
  "mt-2 w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-3 transition-colors duration-300 focus:border-signal focus:outline-none user-invalid:border-red-700";

const LABEL = "block text-sm font-medium text-ink-2";

export default function Kontak() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      `Halo ${company.name}, saya ${data.get("nama")}.`,
      `No HP: ${data.get("hp")}`,
      `Lokasi proyek: ${data.get("lokasi")}`,
      `Jenis pekerjaan: ${data.get("jenis")}`,
      data.get("pesan") ? `Catatan: ${data.get("pesan")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("Jendela WhatsApp terbuka. Lanjutkan percakapan di sana.");
  }

  return (
    <section
      id="kontak"
      className="border-t border-line bg-paper-2 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal from="left" className="lg:col-span-5">
            <SectionHead
              index="05 / Kontak"
              title="Kirim brief, kami balas dengan perkiraan biaya."
              body="Isi form di samping atau hubungi langsung. Balasan pertama biasanya keluar di hari kerja yang sama."
            />

            <ul className="mt-10 space-y-5">
              <li>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4"
                >
                  <WhatsappLogo
                    size={20}
                    weight="light"
                    className="shrink-0 text-signal"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-ink group-hover:text-ink-2">
                    {company.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="group flex items-center gap-4"
                >
                  <Envelope
                    size={20}
                    weight="light"
                    className="shrink-0 text-signal"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-ink group-hover:text-ink-2">
                    {company.email}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin
                  size={20}
                  weight="light"
                  className="mt-0.5 shrink-0 text-signal"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-ink">
                  {company.address}
                  <span className="mt-1 block text-ink-3">
                    Area layanan: {company.areas.join(", ")}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Clock
                  size={20}
                  weight="light"
                  className="mt-0.5 shrink-0 text-signal"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-ink">
                  Senin sampai Sabtu, 08.00 sampai 17.00 WIB
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal from="right" delay={0.08} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="border border-line bg-paper p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nama" className={LABEL}>
                    Nama
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Nama lengkap"
                    aria-describedby="nama-help"
                    className={`${FIELD} peer`}
                  />
                  <p
                    id="nama-help"
                    className="mt-2 hidden text-xs text-red-700 peer-user-invalid:block"
                  >
                    Nama wajib diisi.
                  </p>
                </div>

                <div>
                  <label htmlFor="hp" className={LABEL}>
                    Nomor WhatsApp
                  </label>
                  <input
                    id="hp"
                    name="hp"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    pattern="[0-9+\-\s]{9,20}"
                    placeholder="0812 9614 7894"
                    aria-describedby="hp-help"
                    className={FIELD}
                  />
                  <p id="hp-help" className="mt-2 text-xs text-ink-3">
                    Dipakai untuk membalas permintaan ini.
                  </p>
                </div>

                <div>
                  <label htmlFor="lokasi" className={LABEL}>
                    Lokasi proyek
                  </label>
                  <input
                    id="lokasi"
                    name="lokasi"
                    type="text"
                    required
                    placeholder="Contoh: Apartemen, Jakarta Selatan"
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="jenis" className={LABEL}>
                    Jenis pekerjaan
                  </label>
                  <select
                    id="jenis"
                    name="jenis"
                    required
                    defaultValue=""
                    className={FIELD}
                  >
                    <option value="" disabled>
                      Pilih salah satu
                    </option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="pesan" className={LABEL}>
                    Catatan
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows={4}
                    placeholder="Luas area, kondisi dinding sekarang, target waktu pengerjaan."
                    aria-describedby="pesan-help"
                    className={`${FIELD} resize-y`}
                  />
                  <p id="pesan-help" className="mt-2 text-xs text-ink-3">
                    Opsional. Semakin detail, semakin akurat perkiraan biaya
                    kami.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-2 active:scale-[0.98]"
                >
                  {cta.primary}
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <p className="text-xs text-ink-3">
                  Tanpa biaya survei di area Jabodetabek.
                </p>
              </div>

              <p
                role="status"
                aria-live="polite"
                className="mt-4 min-h-5 text-sm text-signal"
              >
                {status}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
