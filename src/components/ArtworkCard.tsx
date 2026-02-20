import { Link } from "react-router-dom";
import { Artwork } from "@/context/ArtworkContext";

interface ArtworkCardProps {
  artwork: Artwork;
  size?: "default" | "large";
}

const ArtworkCard = ({ artwork, size = "default" }: ArtworkCardProps) => {
  return (
    <div className={`artwork-card group relative overflow-hidden bg-card cursor-pointer ${size === "large" ? "rounded" : "rounded"}`}>
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            size === "large" ? "h-80 lg:h-[520px]" : "h-56 lg:h-72"
          }`}
        />
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
        <div className="text-primary-foreground translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
          <p className="font-body text-xs uppercase tracking-widest text-primary-foreground/70 mb-1">
            {artwork.medium}
          </p>
          <p className="font-body text-sm leading-relaxed line-clamp-2 text-primary-foreground/90">
            {artwork.description}
          </p>
          {artwork.price && (
            <p className="font-display text-lg font-medium mt-2 text-primary-foreground">
              {artwork.available ? artwork.price : "Sold"}
            </p>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-3 right-3 flex gap-2">
        {artwork.featured && (
          <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-body rounded">
            Featured
          </span>
        )}
        {!artwork.available && (
          <span className="px-2 py-0.5 bg-charcoal text-cream-100 text-[10px] uppercase tracking-widest font-body rounded">
            Sold
          </span>
        )}
      </div>

      {/* Info below */}
      <div className="p-4 border-t border-border">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-medium text-foreground leading-tight">
              {artwork.title}
            </h3>
            <p className="font-body text-xs text-muted-foreground mt-0.5 tracking-wide">
              {artwork.category} · {artwork.year}
            </p>
          </div>
          {artwork.available && artwork.price && (
            <span className="font-body text-sm font-medium text-primary whitespace-nowrap">
              {artwork.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
