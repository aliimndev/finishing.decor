import { useState } from "react";
import type { FormEvent } from "react";
import { company, cta, services } from "../data/site";
import SectionHead from "./SectionHead";

export default function Kontak() {
  const [status, setStatus] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "");
    const text = [
      `Halo ${company.name}, saya ${field("nama")}.`,
      `No HP: ${field("hp")}`,
      `Lokasi proyek: ${field("lokasi")}`,
      `Jenis pekerjaan: ${field("jenis")}`,
      field("pesan") ? `Catatan: ${field("pesan")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Tidak ada server di belakang form ini: offer-nya dikirim sebagai chat
    // WhatsApp. Karena window.open dengan noopener selalu mengembalikan null,
    // pop-up terblokir tidak bisa dideteksi dari sini, jadi satu pesan
    // menutup kedua kemungkinan sekaligus.
    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setStatus(
      `Jendela WhatsApp terbuka, tekan kirim di sana. Kalau tidak terbuka, hubungi ${company.phone}.`,
    );
  }

  return (
    <section id="kontak" className="section border-t border-rule">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <SectionHead
            title="Kirim brief, kami balas dengan perkiraan biaya."
            body="Isi form di samping atau hubungi langsung. Balasan pertama biasanya keluar di hari kerja yang sama."
          />

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="field-label">Telepon</dt>
              <dd className="mt-1">
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="link text-ink"
                >
                  {company.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="field-label">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${company.email}`} className="link text-ink">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="field-label">Kantor</dt>
              <dd className="mt-1 text-ink">{company.address}</dd>
              <dd className="mt-1 text-sm text-ink-2">
                Area layanan: {company.areas.join(", ")}
              </dd>
            </div>
            <div>
              <dt className="field-label">Jam kerja</dt>
              <dd className="mt-1 text-ink">
                Senin sampai Sabtu, 08.00 sampai 17.00 WIB
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-ink pt-6 lg:col-span-7 lg:col-start-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="nama" className="field-label">
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
                className="field peer mt-1"
              />
              <p
                id="nama-help"
                className="field-help mt-1 hidden text-error peer-user-invalid:block"
              >
                Nama wajib diisi.
              </p>
            </div>

            <div>
              <label htmlFor="hp" className="field-label">
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
                className="field mt-1"
              />
              <p id="hp-help" className="field-help mt-1">
                Dipakai untuk membalas permintaan ini.
              </p>
            </div>

            <div>
              <label htmlFor="lokasi" className="field-label">
                Lokasi proyek
              </label>
              <input
                id="lokasi"
                name="lokasi"
                type="text"
                required
                placeholder="Contoh: Apartemen, Jakarta Selatan"
                className="field mt-1"
              />
            </div>

            <div>
              <label htmlFor="jenis" className="field-label">
                Jenis pekerjaan
              </label>
              <select
                id="jenis"
                name="jenis"
                required
                defaultValue=""
                className="field mt-1 select-empty"
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
              <label htmlFor="pesan" className="field-label">
                Catatan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={4}
                placeholder="Luas area, kondisi dinding sekarang, target waktu pengerjaan."
                aria-describedby="pesan-help"
                className="field mt-1 resize-y"
              />
              <p id="pesan-help" className="field-help mt-1">
                Opsional. Semakin detail, semakin akurat perkiraan biaya kami.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn">
              {cta.primary}
            </button>
            <p className="text-sm text-ink-2">
              Tanpa biaya survei di area Jabodetabek.
            </p>
          </div>

          <p
            role="status"
            aria-live="polite"
            className="mt-4 min-h-5 text-sm text-ink-2"
          >
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
