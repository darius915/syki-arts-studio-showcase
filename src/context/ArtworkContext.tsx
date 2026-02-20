import React, { createContext, useContext, useState, useEffect } from "react";

export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  medium: string;
  year: string;
  imageUrl: string;
  featured: boolean;
  available: boolean;
  price?: string;
}

interface ArtworkContextType {
  artworks: Artwork[];
  addArtwork: (artwork: Omit<Artwork, "id">) => void;
  updateArtwork: (id: string, artwork: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
}

const ArtworkContext = createContext<ArtworkContextType | null>(null);

import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const DEFAULT_ARTWORKS: Artwork[] = [
  {
    id: "1",
    title: "Terracotta Dreams",
    description: "A flowing exploration of warm earthy tones, capturing the essence of sun-baked landscapes and the quiet poetry of desert winds.",
    category: "Abstract",
    medium: "Watercolor on paper",
    year: "2024",
    imageUrl: artwork1,
    featured: true,
    available: true,
    price: "₦45,000",
  },
  {
    id: "2",
    title: "Collision & Gold",
    description: "Bold gestural marks meet gold leaf — a conversation between chaos and order, raw emotion poured into every stroke.",
    category: "Abstract",
    medium: "Acrylic & Gold Leaf on Canvas",
    year: "2024",
    imageUrl: artwork2,
    featured: true,
    available: false,
    price: "₦80,000",
  },
  {
    id: "3",
    title: "Whisper of Spring",
    description: "A delicate botanical study in ink and watercolor, honoring the gentle persistence of new growth.",
    category: "Botanical",
    medium: "Ink & Watercolor",
    year: "2023",
    imageUrl: artwork3,
    featured: true,
    available: true,
    price: "₦35,000",
  },
  {
    id: "4",
    title: "Deep Divide",
    description: "A dramatic interplay of electric blue and terracotta — the tension of opposites finding unexpected harmony.",
    category: "Abstract",
    medium: "Oil on Canvas",
    year: "2023",
    imageUrl: artwork4,
    featured: false,
    available: true,
    price: "₦95,000",
  },
];

export const ArtworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const stored = localStorage.getItem("syki-artworks");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULT_ARTWORKS;
      }
    }
    return DEFAULT_ARTWORKS;
  });

  useEffect(() => {
    localStorage.setItem("syki-artworks", JSON.stringify(artworks));
  }, [artworks]);

  const addArtwork = (artwork: Omit<Artwork, "id">) => {
    const newArtwork: Artwork = { ...artwork, id: Date.now().toString() };
    setArtworks((prev) => [newArtwork, ...prev]);
  };

  const updateArtwork = (id: string, updates: Partial<Artwork>) => {
    setArtworks((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const deleteArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <ArtworkContext.Provider value={{ artworks, addArtwork, updateArtwork, deleteArtwork }}>
      {children}
    </ArtworkContext.Provider>
  );
};

export const useArtworks = () => {
  const ctx = useContext(ArtworkContext);
  if (!ctx) throw new Error("useArtworks must be used inside ArtworkProvider");
  return ctx;
};
