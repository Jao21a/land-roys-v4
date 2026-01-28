import { supabase } from "../api/Supabase.provider";

// GET ALL CLIENTS (Usuarios con rol 'client')
export const getClients = async () => {
    // Obtenemos todos los usuarios y sus roles
    // Filtramos en el cliente (frontend) o usamos !inner si la estructura lo permite facil
    const { data, error } = await supabase
        .from("usuario")
        .select(`
            *,
            usuario_rol (
                rol (
                    nombre_rol
                )
            )
        `)
        .order("fecha_creacion", { ascending: false });

    if (error) throw error;

    // Filtrar solo los que tienen rol 'client'
    // Asumimos que un usuario tiene 1 rol principal por ahora, o verificamos si alguno es client
    const clients = data.filter(user =>
        user.usuario_rol.some(ur => ur.rol.nombre_rol === 'client')
    );

    return clients;
};
