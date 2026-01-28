import { supabase } from "../api/Supabase.provider";

// GET ALL SOLICITUDES
export const getSolicitudes = async () => {
    const { data, error } = await supabase
        .from("solicitud_compra")
        .select(`
            *,
            moto (
                marca,
                modelo
            ),
            repuesto_pieza (
                nombre
            )
        `)
        .order("fecha_solicitud", { ascending: false });

    if (error) throw error;
    return data;
};

// UPDATE SOLICITUD STATUS
export const updateSolicitudStatus = async (id, estado) => {
    const { data, error } = await supabase
        .from("solicitud_compra")
        .update({ estado })
        .eq("id_solicitud", id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// DELETE SOLICITUD
export const deleteSolicitud = async (id) => {
    const { error } = await supabase
        .from("solicitud_compra")
        .delete()
        .eq("id_solicitud", id);

    if (error) throw error;
};
