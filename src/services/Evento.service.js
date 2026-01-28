import { supabase } from "../api/Supabase.provider";

// GET ALL EVENTOS
export const getEventos = async () => {
    const { data, error } = await supabase
        .from("evento")
        .select("*")
        .order("fecha_evento", { ascending: true }); // Orden descendente para ver próximos primero

    if (error) throw error;
    return data;
};

// GET EVENTO BY ID
export const getEventoById = async (id) => {
    const { data, error } = await supabase
        .from("evento")
        .select("*")
        .eq("id_evento", id)
        .single();

    if (error) throw error;
    return data;
};

// CREATE EVENTO
export const createEvento = async (eventoData) => {
    const { data, error } = await supabase
        .from("evento")
        .insert([eventoData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// UPDATE EVENTO
export const updateEvento = async (id, eventoData) => {
    const { data, error } = await supabase
        .from("evento")
        .update(eventoData)
        .eq("id_evento", id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// DELETE EVENTO
export const deleteEvento = async (id) => {
    const { error } = await supabase
        .from("evento")
        .delete()
        .eq("id_evento", id);

    if (error) throw error;
};
