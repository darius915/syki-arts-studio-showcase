import { useState } from "react";
import ArtworkCard from "@/components/ArtworkCard";
import { useArtworks } from "@/context/ArtworkContext";

const CATEGORIES = ["All", "Abstract", "Botanical", "Portrait", "Mixed Media", "Other"];

const Gallery = () => {
  const { artworks } = useArtworks();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = artworks.filter((a) => {
    if (activeCategory !== "All" && a.category !== activeCategory) return false;
    if (showAvailableOnly && !a.available) return false;
    return true;
  });

  return (
    <div className="page-enter min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-12 lg:pt-36 lg:pb-16 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-3">
            Syki-Arts Studio
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-medium text-foreground leading-tight mb-4">
            The <em>Gallery</em>
          </h1>
          <p className="font-body text-sm text-muted-foreground max-w-lg leading-relaxed">
            A curated collection of original works — each piece a chapter, each brushstroke a word in an ongoing story.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 font-body text-xs tracking-wide rounded-full border transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  showAvailableOnly ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    showAvailableOnly ? "translate-x-5" : ""
                  }`}
                />
              </div>
              <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
                Available only
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-muted-foreground">No artworks found.</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {filtered.map((artwork, i) => (
              <div
                key={artwork.id}
                className="masonry-item animate-fade-up"
                style={{ animationDelay: `${(i % 6) * 0.1}s`, opacity: 0 }}
              >
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
        )}

        <p className="font-body text-xs text-muted-foreground text-center mt-12">
          {filtered.length} work{filtered.length !== 1 ? "s" : ""} shown
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Syki-Arts Studio · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
