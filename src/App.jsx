import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Layanan from "./components/Layanan";
import Proses from "./components/Proses";
import Proyek from "./components/Proyek";
import Faq from "./components/Faq";
import Kontak from "./components/Kontak";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Lewati ke konten utama
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Layanan />
        <Proyek />
        <Proses />
        <Faq />
        <Kontak />
      </main>
      <Footer />
    </div>
  );
}
