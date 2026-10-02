/* Pre-flight check: node scripts/check.mjs [url] */
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:5174/";
const failures = [];
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures.push(label);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

// Scroll the whole page once so every whileInView reveal has fired before
// the fullPage screenshot, otherwise sections capture at opacity 0.
// Loop until the scroll position stops moving: lazy images grow the
// document as we go, so a fixed height bound stops early.
const sweep = () =>
  page.evaluate(async () => {
    let last = -1;
    for (let pass = 0; pass < 40; pass++) {
      const step = window.innerHeight * 0.6;
      for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise((r) => setTimeout(r, 300));
      const now = Math.round(document.documentElement.scrollHeight);
      if (now === last) break;
      last = now;
    }
    window.scrollTo(0, 0);
  });

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await sweep();
await page.waitForTimeout(600);

const text = await page.locator("body").innerText();

check(
  errors.length === 0,
  `zero console errors${errors.length ? `: ${errors[0]}` : ""}`,
);
check(!/[—–]/.test(text), "no em-dash or en-dash in visible text");

const sections = await page.locator("main > section").count();
const eyebrows = await page.locator("main p.font-mono.uppercase").count();
check(
  eyebrows <= Math.ceil(sections / 3),
  `eyebrows ${eyebrows} <= ceil(${sections}/3)`,
);

const bare = await page.locator("img:not([width]):not([height])").count();
check(bare === 0, "every <img> has width and height");

const hscreen = await page.locator(".h-screen").count();
check(hscreen === 0, "no h-screen (uses min-h-[100dvh])");

const contrast = await page.evaluate(() => {
  // Tailwind v4 emits oklch(), which a regex parser reads as garbage.
  // Composite the real pixels on a canvas instead, bottom-most layer first.
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const layers = (el) => {
    const out = [];
    for (let n = el; n; n = n.parentElement) {
      const c = getComputedStyle(n).backgroundColor;
      if (c && !/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)|transparent/.test(c))
        out.push(c);
    }
    return out.reverse();
  };
  const paint = (stack) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1, 1);
    for (const c of stack) {
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
    }
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255];
  };
  const lum = ([r, g, b]) => 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

  return [
    ...document.querySelectorAll(
      "a, button, label, p, span, h1, h2, h3, dt, dd, li",
    ),
  ]
    .filter((el) => el.offsetParent !== null && el.textContent.trim())
    .map((el) => {
      const s = getComputedStyle(el);
      const base = layers(el);
      const bg = paint(base);
      const fg = paint([...base, s.color]);
      const l1 = lum(fg);
      const l2 = lum(bg);
      const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
      const size = parseFloat(s.fontSize);
      const large =
        size >= 24 || (size >= 18.66 && Number(s.fontWeight) >= 700);
      return {
        text: el.textContent.trim().slice(0, 40),
        ratio: (hi + 0.05) / (lo + 0.05),
        min: large ? 3 : 4.5,
      };
    })
    .filter((r) => r.ratio < r.min)
    .sort((a, b) => a.ratio - b.ratio);
});
check(
  contrast.length === 0,
  `all visible text passes WCAG AA${contrast.length ? `: ${contrast.length} fail, e.g. "${contrast[0].text}" ${contrast[0].ratio.toFixed(2)}:1` : ""}`,
);

const overflow = await page.evaluate(
  () =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth,
);
check(!overflow, "no horizontal overflow at 1440px");

await page.setViewportSize({ width: 1440, height: 900 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
// Viewport-sized shot first: fullPage renders position:fixed at the wrong
// offset, so the sticky nav is only trustworthy in this one.
await page.screenshot({ path: "screenshot-fold.png" });
await page.screenshot({ path: "screenshot-desktop.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await sweep();
await page.waitForTimeout(600);
const overflowMobile = await page.evaluate(
  () =>
    document.documentElement.scrollWidth >
    document.documentElement.clientWidth + 1,
);
check(!overflowMobile, "no horizontal overflow at 390px");
await page.screenshot({ path: "screenshot-mobile.png", fullPage: true });

await browser.close();
console.log(
  failures.length
    ? `\n${failures.length} check(s) failed`
    : "\nall checks passed",
);
process.exit(failures.length ? 1 : 0);
