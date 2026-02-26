import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

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
  price?: number | null;
  created_at?: string;
}

interface DbArtwork {
  id: string;
  title: string;
  description: string;
  category: string;
  medium: string;
  year: string;
  image_url?: string;
  imageUrl?: string;
  featured: boolean;
  available: boolean;
  price?: number | null;
  created_at?: string;
}

type ArtworkInput = Omit<Artwork, "id"> & { price?: string | number | null };

interface ArtworkContextType {
  artworks: Artwork[];
  loading: boolean;
  error: string | null;
  addArtwork: (artwork: ArtworkInput) => Promise<void>;
  updateArtwork: (id: string, updates: Partial<ArtworkInput>) => Promise<void>;
  deleteArtwork: (id: string) => Promise<void>;
  refreshArtworks: () => Promise<void>;
}

const ArtworkContext = createContext<ArtworkContextType | undefined>(undefined);

export const ArtworkProvider = ({ children }: { children: ReactNode }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const base64ToBlob = async (base64: string): Promise<Blob> => {
    const res = await fetch(base64);
    return await res.blob();
  };

  const parsePrice = (
    rawPrice: string | number | null | undefined
  ): number | null => {
    if (rawPrice === null || rawPrice === undefined) return null;
    if (typeof rawPrice === "number") {
      return Number.isNaN(rawPrice) ? null : rawPrice;
    }

    const cleaned = rawPrice.trim().replace(/[^0-9.-]/g, "");
    if (!cleaned) return null;

    const parsed = Number(cleaned);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const uploadImage = async (base64: string) => {
    const blob = await base64ToBlob(base64);
    const fileName = `${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("artworks")
      .upload(fileName, blob);

    if (uploadError) {
      console.error("UPLOAD ERROR:", uploadError.message);
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("artworks").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const fetchArtworks = async () => {
    setLoading(true);

    const { data, error: fetchError } = await supabase
      .from("artworks")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("FETCH ERROR:", fetchError.message);
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    const transformed = ((data || []) as DbArtwork[]).map((item) => ({
      ...item,
      imageUrl: item.image_url ?? item.imageUrl ?? "",
      price: item.price ?? null,
    }));

    setArtworks(transformed);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const addArtwork = async (artwork: ArtworkInput) => {
    const imageUrl = await uploadImage(artwork.imageUrl);

    const { error: addError } = await supabase.from("artworks").insert([
      {
        title: artwork.title,
        description: artwork.description,
        category: artwork.category,
        medium: artwork.medium,
        year: artwork.year,
        featured: artwork.featured,
        available: artwork.available,
        price: parsePrice(artwork.price),
        image_url: imageUrl,
      },
    ]);

    if (addError) {
      console.error("ADD ERROR:", addError.message);
      throw new Error(addError.message);
    }

    await fetchArtworks();
  };

  const updateArtwork = async (id: string, updates: Partial<ArtworkInput>) => {
    const updateData: Record<string, unknown> = { ...updates };

    if ("price" in updates) {
      updateData.price = parsePrice(updates.price);
    }

    if ("imageUrl" in updates) {
      const imageUrl = updates.imageUrl;
      delete updateData.imageUrl;

      if (typeof imageUrl === "string" && imageUrl.startsWith("data:")) {
        updateData.image_url = await uploadImage(imageUrl);
      } else if (typeof imageUrl === "string") {
        updateData.image_url = imageUrl;
      }
    }

    const { error: updateError } = await supabase
      .from("artworks")
      .update(updateData)
      .eq("id", id);

    if (updateError) {
      console.error("UPDATE ERROR:", updateError.message);
      throw new Error(updateError.message);
    }

    await fetchArtworks();
  };

  const deleteArtwork = async (id: string) => {
    const { error: deleteError } = await supabase
      .from("artworks")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("DELETE ERROR:", deleteError.message);
      throw new Error(deleteError.message);
    }

    await fetchArtworks();
  };

  return (
    <ArtworkContext.Provider
      value={{
        artworks,
        loading,
        error,
        addArtwork,
        updateArtwork,
        deleteArtwork,
        refreshArtworks: fetchArtworks,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export const useArtworks = () => {
  const context = useContext(ArtworkContext);
  if (!context) {
    throw new Error("useArtworks must be used within ArtworkProvider");
  }
  return context;
};

