import { supabase } from "@/lib/supabase";

export const fetchArtworks = async () => {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data || []).map((item) => ({
    ...item,
    imageUrl: item.image_url ?? item.imageUrl ?? "",
  }));
};
