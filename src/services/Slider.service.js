import { supabase } from "../api/Supabase.provider";

// Obtener slides ordenadas
export const getSlides = async () => {
  const { data, error } = await supabase
    .from("slider")
    .select("*")
    .order("orden", { ascending: true });

  if (error) throw error;
  return data;
};

// Actualizar slide individual
export const updateSlide = async (id, payload) => {
  const { error } = await supabase
    .from("slider")
    .update(payload, { returning: "representation" })
    .eq("id", id);

  if (error) throw error;
};

// Reordenar slides en batch (funciona con UUIDs)
export const reorderSlides = async (slides) => {
  if (!slides || slides.length === 0) return;

  if (slides.length > 5) slides = slides.slice(0, 5);

  // Asignar nuevo orden
  slides.forEach((s, index) => (s.orden = index));

  const { data, error } = await supabase
    .from("slider")
    .upsert(
      slides.map(s => ({ id: s.id, orden: s.orden })),
      { onConflict: ["id"], returning: "representation" }
    );

  if (error) throw error;
  return data;
};

// Agregar slide (máximo 5)
export const addSlide = async (slide) => {
  const { data: existingSlides, error: fetchError } = await supabase
    .from("slider")
    .select("id")
    .order("orden", { ascending: true });

  if (fetchError) throw fetchError;

  if (existingSlides.length >= 5) throw new Error("No se pueden agregar más de 5 slides");

  const { data, error } = await supabase
    .from("slider")
    .insert([slide])
    .select()
    .single();

  if (error) throw error;
  return data;
};
