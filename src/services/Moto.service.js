import { supabase } from "../api/Supabase.provider";

// GET ALL MOTOS
export const getMotos = async () => {
    const { data, error } = await supabase
        .from("moto")
        .select(`
      *,
      imagen_moto (
        imagen (
          url_imagen
        )
      )
    `)
        .order("fecha_publicacion", { ascending: false });

    if (error) throw error;
    return data;
};

// GET MOTO BY ID
export const getMotoById = async (id) => {
    const { data, error } = await supabase
        .from("moto")
        .select(`
      *,
      imagen_moto (
        imagen (
          url_imagen
        )
      )
    `)
        .eq("id_moto", id)
        .single();

    if (error) throw error;
    return data;
};

// CREATE MOTO
export const createMoto = async (motoData) => {
    const { data, error } = await supabase
        .from("moto")
        .insert([motoData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// UPDATE MOTO
export const updateMoto = async (id, motoData) => {
    const { data, error } = await supabase
        .from("moto")
        .update(motoData)
        .eq("id_moto", id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// DELETE MOTO
export const deleteMoto = async (id) => {
    const { error } = await supabase
        .from("moto")
        .delete()
        .eq("id_moto", id);

    if (error) throw error;
};
