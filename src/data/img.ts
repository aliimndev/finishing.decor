/*
  Resolusi gambar untuk layar kecil: <img> di komponen cukup menulis base
  path tanpa ekstensi, misalnya "/img/img7", lalu dua helper di sini
  menyusun src dan srcSet dari manifest hasil scripts/img.mjs.
  Widths: 560 (mobile) / 900 (tablet) / 1600 (desktop).
*/
import manifest from "./img.json";

export const WIDTHS: Record<string, number[]> = manifest;

export function imgSrc(base: string, width: number): string {
  const stem = base.replace(/^\/img\//, "");
  const sizes = WIDTHS[stem] ?? [560];
  const pick = sizes.filter((w) => w <= width).pop() ?? sizes[0];
  return `${base}-${pick}.webp`;
}

export function imgSrcSet(base: string): string {
  const stem = base.replace(/^\/img\//, "");
  return (WIDTHS[stem] ?? [560])
    .map((w) => `${base}-${w}.webp ${w}w`)
    .join(", ");
}