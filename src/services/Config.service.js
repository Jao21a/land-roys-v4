import { supabase } from "../api/Supabase.provider";

// GET ALL CONFIG
export const getConfig = async () => {
    const { data, error } = await supabase
        .from("configuracion")
        .select("*")
        .order("clave", { ascending: true });

    if (error) throw error;
    return data;
};

// UPDATE CONFIG
export const updateConfig = async (id, configData) => {
    // Solo permitimos editar el valor y estado, la clave suele ser fija
    const { data, error } = await supabase
        .from("configuracion")
        .update(configData)
        .eq("id_config", id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// CREATE CONFIG (Opcional, si queremos añadir claves nuevas dinámicamente)
export const createConfig = async (configData) => {
    const { data, error } = await supabase
        .from("configuracion")
        .insert([configData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// DELETE CONFIG
export const deleteConfig = async (id) => {
    const { error } = await supabase
        .from("configuracion")
        .delete()
        .eq("id_config", id);

    if (error) throw error;
};
