import { supabase } from "../api/Supabase.provider";

// GET ALL PROMOCIONES
export const getPromociones = async () => {
    const { data, error } = await supabase
        .from("promocion")
        .select("*")
        .order("fecha_inicio", { ascending: false });

    if (error) throw error;
    return data;
};

// GET PROMOCION BY ID
export const getPromocionById = async (id) => {
    const { data, error } = await supabase
        .from("promocion")
        .select("*")
        .eq("id_promocion", id)
        .single();

    if (error) throw error;
    return data;
};

// CREATE PROMOCION
export const createPromocion = async (promocionData) => {
    const { data, error } = await supabase
        .from("promocion")
        .insert([promocionData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// UPDATE PROMOCION
export const updatePromocion = async (id, promocionData) => {
    const { data, error } = await supabase
        .from("promocion")
        .update(promocionData)
        .eq("id_promocion", id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// DELETE PROMOCION
export const deletePromocion = async (id) => {
    const { error } = await supabase
        .from("promocion")
        .delete()
        .eq("id_promocion", id);

    if (error) throw error;
};
