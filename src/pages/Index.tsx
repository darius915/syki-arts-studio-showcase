import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import ArtworkCard from "@/components/ArtworkCard";
import { useArtworks } from "@/context/ArtworkContext";

const Index = () => {
  const { artworks } = useArtworks();
  const featured = artworks.filter((a) => a.featured).slice(0, 3);

  return (
    <div className="page-enter">
      <HeroSection />

      {/* Featured Works */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-3">
                Selected Works
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground leading-tight">
                Featured <em>Pieces</em>
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              View full gallery
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((artwork, i) => (
              <div
                key={artwork.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
              >
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-4">
                The Studio
              </p>
              <blockquote className="font-display text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight text-foreground mb-6">
                "Art is not what you see, but what you make others{" "}
                <em>see."</em>
              </blockquote>
              <p className="font-body text-sm lg:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                Syki-Arts Studio is a space where emotion becomes texture, and
                texture becomes story. Each piece is created with intention —
                a dialogue between the artist and the unseen.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-body text-sm text-primary hover:gap-3 transition-all group"
              >
                Meet the artist <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted rounded p-6 text-center">
                  <div className="font-display text-5xl font-medium text-primary mb-1">
                    {artworks.length}+
                  </div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Original Works
                  </p>
                </div>
                <div className="bg-primary/10 rounded p-6 text-center">
                  <div className="font-display text-5xl font-medium text-primary mb-1">3+</div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Years Creating
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-accent/10 rounded p-6 text-center">
                  <div className="font-display text-5xl font-medium text-accent mb-1">∞</div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Commissions
                  </p>
                </div>
                <div className="bg-muted rounded p-6 text-center">
                  <div className="font-display text-5xl font-medium text-foreground mb-1">❤</div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    Made with love
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-4">
            Let's Create Together
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
            Have a <em>vision?</em>
            <br />Let's bring it to life.
          </h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
            Commission a unique piece tailored to your space, your story, your feeling.
            Syki creates one-of-a-kind artworks for clients who want something truly personal.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wide rounded transition-all hover:bg-terracotta-600 hover:shadow-lg hover:-translate-y-0.5"
          >
            Start a Commission
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-display text-lg font-semibold text-foreground">Syki-Arts Studio</span>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              Original art. Created with love.
            </p>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Syki-Arts Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
