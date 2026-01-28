import { supabase } from "../api/Supabase.provider";

// GET ALL REPUESTOS
export const getRepuestos = async () => {
    const { data, error } = await supabase
        .from("repuesto_pieza")
        .select(`
      *,
      imagen_repuesto (
        imagen (
          url_imagen
        )
      )
    `)
        .order("fecha_publicacion", { ascending: false });

    if (error) throw error;
    return data;
};

// GET REPUESTO BY ID
export const getRepuestoById = async (id) => {
    const { data, error } = await supabase
        .from("repuesto_pieza")
        .select(`
      *,
      imagen_repuesto (
        imagen (
          url_imagen
        )
      )
    `)
        .eq("id_repuesto", id)
        .single();

    if (error) throw error;
    return data;
};

// CREATE REPUESTO
export const createRepuesto = async (repuestoData) => {
    const { data, error } = await supabase
        .from("repuesto_pieza")
        .insert([repuestoData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// UPDATE REPUESTO
export const updateRepuesto = async (id, repuestoData) => {
    const { data, error } = await supabase
        .from("repuesto_pieza")
        .update(repuestoData)
        .eq("id_repuesto", id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// DELETE REPUESTO
export const deleteRepuesto = async (id) => {
    const { error } = await supabase
        .from("repuesto_pieza")
        .delete()
        .eq("id_repuesto", id);

    if (error) throw error;
};
