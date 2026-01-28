import { supabase } from "../api/Supabase.provider";

export const getDashboardStats = async () => {
    try {
        // Count Motos (Total)
        const { count: motosTotal, error: errMotos } = await supabase
            .from("moto")
            .select("*", { count: "exact", head: true });
        if (errMotos) throw errMotos;

        // Count Motos (Disponibles)
        const { count: motosDisponibles } = await supabase
            .from("moto")
            .select("*", { count: "exact", head: true })
            .eq("estado", "disponible");

        // Count Repuestos
        const { count: repuestosTotal, error: errRep } = await supabase
            .from("repuesto_pieza")
            .select("*", { count: "exact", head: true });
        if (errRep) throw errRep;

        // Count Clientes (Usuarios)
        const { count: clientesTotal, error: errCli } = await supabase
            .from("usuario")
            .select("*", { count: "exact", head: true });
        if (errCli) throw errCli;

        // Count Solicitudes Pendientes (Leads)
        const { count: leadsPendientes, error: errLeads } = await supabase
            .from("solicitud_compra")
            .select("*", { count: "exact", head: true })
            .eq("estado", "pendiente");

        // Recent Activity (Mezcla de creacion de motos y solicitudes recientes)
        // Por simplicidad, traemos las últimas 5 solicitudes
        const { data: recentLeads } = await supabase
            .from("solicitud_compra")
            .select("id_solicitud, nombres, tipo_interes, fecha_solicitud")
            .order("fecha_solicitud", { ascending: false })
            .limit(5);

        return {
            motosTotal,
            motosDisponibles,
            repuestosTotal,
            clientesTotal,
            leadsPendientes,
            recentLeads: recentLeads || []
        };

    } catch (error) {
        console.error("Dashboard Service Error:", error);
        throw error;
    }
};
