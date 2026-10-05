/*
  Responsive webp generator. `node scripts/img.mjs`
  Sumber: public/img/*.{jpg,jpeg,png,webp} tanpa suffix lebar.
  Keluaran: <stem>-<width>.webp untuk 560/900/1600 sesuai lebar asli,
  plus src/data/img.json berisi daftar lebar per stem supaya <img> bisa
  menulis srcSet tanpa menebak file yang tidak ada.
  Butuh ImageMagick. File sumber dihapus setelah konversi; salinan asli
  ada di /tmp/opencode/img-originals selama sesi ini.
*/
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const DIR = "public/img";
const MANIFEST = "src/data/img.json";
const WIDTHS = [560, 900, 1600];
const Q = 76;

// Manifest digabung, bukan ditulis ulang: sumber yang sudah terkonversi
// tidak muncul lagi di direktori, jadi menimpanya akan menghapus entries-nya.
const manifest = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, "utf8"))
  : {};
let before = 0;
let after = 0;

for (const file of readdirSync(DIR).sort()) {
  // Lewati hasil generate sebelumnya.
  if (/-\d+\.webp$/.test(file)) continue;
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;

  const src = join(DIR, file);
  const stem = file.replace(/\.[^.]+$/, "");
  before += statSync(src).size;

  const w = Number(
    execFileSync("magick", ["identify", "-format", "%w", `${src}[0]`], {
      encoding: "utf8",
    }).trim(),
  );

  const sizes = [];
  for (const width of WIDTHS) {
    // Tanpa 900, kartu sel 660px di desktop hanya punya 560 dan browser
    // meregangkannya jadi pecah. Naik kelas sekali (720 -> 900) masih
    // jauh lebih baik daripada itu, jadi izinkan sampai 1.4x.
    if (width > w * 1.4) continue;
    execFileSync("magick", [
      `${src}[0]`,
      "-auto-orient",
      "-resize",
      `${width}x`,
      "-strip",
      // Tanpa ini ImageMagick menulis density 72 dan browser menghitung
      // ukuran intrinsik 25% lebih kecil, jadi srcSet milih varian kecil
      // dan gambarnyaPECAH di layar lebar.
      "-units",
      "PixelsPerInch",
      "-density",
      "96",
      "-quality",
      String(Q),
      "-define",
      "webp:method=6",
      join(DIR, `${stem}-${width}.webp`),
    ]);
    const size = statSync(join(DIR, `${stem}-${width}.webp`)).size;
    after += size;
    sizes.push(width);
    console.log(`${stem}-${width}.webp  ${Math.round(size / 1024)} KB`);
  }

  manifest[stem] = sizes;
  rmSync(src);
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `\n${Math.round(before / 1048576)} MB -> ${Math.round(after / 1048576)} MB`,
);