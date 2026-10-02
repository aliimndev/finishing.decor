# DESIGN.md

Arah desain Finishing Decor. File ini adalah data arah, bukan instruksi.
Semua isi di bawah berasal dari percakapan dengan pemilik brand dan dari
keputusan yang sudah diambil, bukan tebakan. Yang belum diputuskan ditandai
`[BELUM DIPUTUSKAN]`.

## Identity

- Brand: Finishing Decor. Lockup "FINISHING DECOR" dengan subline
  "Finishing Interior Renovasi", monogram "D" abu-abu dan hitam.
  Sumber: `public/img/logo.png`, `public/img/logo-browser.svg`.
- Bidang: contractor finishing dan renovasi interior di Jakarta.
  Kantor di Kembangan, Jakarta Barat. Dilayani Jabodetabek.
- Pembeli: pemilik unit dan rumah, pemilik kantor, developer kecil yang
  butuh satu mitra pengerjaan, bukan tukang terpisah.
- Klaim yang boleh dipakai: tim internal (bukan subkontraktor), harga
  penawaran mengikat 30 hari, garansi 2 tahun, survei gratis di
  Jabodetabek. Sumber: copy yang sudah ada di `src/data/site.js`.
- Bahasa: Indonesia. Nada: lugas, teknis, tanpa jargonELS.

## Personality

- Berbunyi seperti studio, bukan startup. Tanpa badge, tanpa pill, tanpa
  angka yang dibuat-buat.
- Tenang dan jarang. Menyatakan fakta kerja, tidak menjual excess.
- Yang ditolak pemilik: baris angka generik, tabel spesifikasi yang
  berasa tidak relevan, template kartu yang berulang-ulang.

## Visual language

- Rujukan yang disepakati: Norm Architects, Kinfolk, Cereal, A24, MUJI.
  Yang diambil: hairline, tipografi besar, ruang kosong lebar, satu
  momen gambar besar, tanpa ornamen.
- Kertas, bukan layar gelap. Halaman putih hangat, satu blok warna
  jenuh sebagai satu-satunya aksen.

## Palette

Semua token ada di `src/index.css` blok `@theme`. Tidak ada warna lain
yang boleh masuk.

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--color-paper` | `#ffffff` | latar halaman, section terang |
| `--color-paper-2` | `#faf9f7` | latar section zebrak, isi sel bento |
| `--color-ink` | `#14140f` | teks utama, tombol aksi, wordmark |
| `--color-ink-2` | `#45453f` | teks paragraf |
| `--color-ink-3` | `#64645d` | teks kecil, caption, meta |
| `--color-line` | `#e4e2dc` | satu-satunya pemisah |
| `--color-signal` | `#b45309` | satu-satunya warna jenuh |

Aturan warna:

- `--color-signal` hanya untuk mark kecil: nomor section, ikon, nomor
  langkah, satu sel bento. Tidak pernah untuk teks panjang.
- Tombol aksi selalu `--color-ink`, tidak pernah signal.
- Tanpa warna tambahan. Tanpa gradien.

## Typography

- Display dan body: Archivo Variable. Judul pakai `tracking` negatif,
  `leading` rapat, dan `text-wrap: balance` untuk judul panjang.
- Label, nomor, caption, angka data: JetBrains Mono Variable, huruf
  kecil dengan `tracking` lebar. Ini suara tipografik yang berulang.
- Satu skala saja. Tidak ada gaya huruf yang hanya dipakai sekali.

## Locks

Keputusan yang tidak dibuka lagi tanpa alasan tertulis:

- Radius 0 di seluruh halaman, kecuali titik status.
- Tanpa shadow, tanpa gradien, tanpa glassmorphism.
- Pemisah hanya hairline 1px. Bukan border tebal, bukan gap besar.
- Bento gapless: sel berbagi tepi, jarak hanya 1px dari background.
- Satu blok signal per halaman, di section Layanan.
- Foto diberi grade yang sama (`photo-tone`) supaya konsisten.

## Composition

- Satu focal point per layar. Grid 12 kolom, container maksimum 1400px.
- Breaks yang sudah disepakati untuk ritme: satu plate full-bleed di
  Proyek, sel signal di Layanan, strip 4 langkah di Proses, wordmark
  raksasa di footer.
- Setiap section memakai pola kepala yang sama: nomor mono + hairline +
  judul besar (`src/components/SectionHead.jsx`). Yang divariasikan
  adalah isi section, bukan kepala section.
- Dilarang: semua section memakai layout internal yang sama (judul
  tengah + subtitle + grid kartu identik).

## Dials

```
ENERGY 2 / RHYTHM 3 / MOTION 2
```

Dasar: pemilik meminta "simple" dan menolak yang generic, jadi ENERGY
tidak naik ke 3 supaya tidak terbaca seperti agency portfolio. RHYTHM 3
karena pemilik juga menolak flow yang repetitif, jadi tiap section wajib
berbeda. MOTION 2 karena pemilik minta gerak saat scroll, dan semua
gerak dibatasi transform dan opacity saja: parallax satu kolom di hero,
hairline yang tergambar, reveal per arah sesuai isi section. Tidak ada
pin, tidak ada counter, tidak ada gerak di luar viewport.

## Yang belum diputuskan

- `[BELUM DIPUTUSKAN]` skala display maksimum di layar besar.
- `[BELUM DIPUTUSKAN]` apakah satu section lagi boleh full-bleed.
- `[BELUM DIPUTUSKAN]` tombol CTA utama memakai blok besar atau link teks.
