import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-artwork.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Syki-Arts Studio hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <p
            className="font-body text-xs tracking-[0.3em] uppercase text-cream-100/70 mb-4 animate-fade-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            Original Art · Commissions · Studio
          </p>
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-cream-100 leading-[0.95] mb-6 animate-fade-up"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            Syki-Arts
            <br />
            <em className="text-terracotta-300">Studio</em>
          </h1>
          <p
            className="font-body text-base lg:text-lg text-cream-100/80 leading-relaxed max-w-md mb-10 animate-fade-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            Art that speaks before words can. Handcrafted pieces rooted in
            emotion, texture, and the beauty of imperfection.
          </p>
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.55s", opacity: 0 }}
          >
            <Link
              to="/gallery"
              className="px-7 py-3.5 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded transition-all hover:bg-terracotta-600 hover:shadow-lg hover:-translate-y-0.5"
            >
              View Gallery
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 border border-cream-100/50 text-cream-100 font-body text-sm tracking-wide rounded transition-all hover:bg-cream-100/10 hover:border-cream-100"
            >
              Commission a Piece
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s", opacity: 0 }}>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-cream-100/50">Scroll</span>
        <div className="w-px h-12 bg-cream-100/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-cream-100/70 animate-[slideDown_1.5s_ease_infinite]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
