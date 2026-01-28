import React, { useEffect, useState } from "react";
import { CircleDollarSign, Search, Phone, Mail, MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react";
import Swal from "sweetalert2";
import { getSolicitudes, updateSolicitudStatus, deleteSolicitud } from "../../../services/Solicitud.service";
import Loader from "../../../components/common/Loader";

const Sales = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchSolicitudes = async () => {
        setLoading(true);
        try {
            const data = await getSolicitudes();
            setSolicitudes(data);
        } catch (error) {
            console.error("Error fetching solicitudes:", error);
            Swal.fire("Error", "No se pudieron cargar las solicitudes", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateSolicitudStatus(id, newStatus);
            setSolicitudes(solicitudes.map(s =>
                s.id_solicitud === id ? { ...s, estado: newStatus } : s
            ));
            const msg = newStatus === 'contactado' ? 'Marcado como Contactado' :
                newStatus === 'cerrado' ? '¡Venta Cerrada!' : 'Solicitud Cancelada';
            Swal.fire("Actualizado", msg, "success");
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el estado", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Borrar solicitud?",
            text: "Se perderá el historial de este cliente potencial",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar"
        });

        if (result.isConfirmed) {
            try {
                await deleteSolicitud(id);
                setSolicitudes(solicitudes.filter(s => s.id_solicitud !== id));
                Swal.fire("Eliminado", "", "success");
            } catch (error) {
                Swal.fire("Error", "No se pudo eliminar", "error");
            }
        }
    };

    const filtered = solicitudes.filter(
        (s) =>
            s.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.telefono.includes(searchTerm) ||
            s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <CircleDollarSign className="text-yellow-400" size={32} />
                        Gestión de Ventas (Interesados)
                    </h1>
                    <p className="text-gray-500">Solicitudes de clientes potenciales para asesoría</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, teléfono..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Kanban / List Grid */}
            <div className="grid grid-cols-1 gap-4">
                {filtered.map((item) => (
                    <div key={item.id_solicitud} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 transition-all hover:shadow-md ${item.estado === 'pendiente' ? 'border-yellow-400' :
                            item.estado === 'contactado' ? 'border-blue-400' :
                                item.estado === 'cerrado' ? 'border-green-400' : 'border-gray-300'
                        }`}>
                        <div className="flex flex-col md:flex-row justify-between gap-6">

                            {/* Cliente Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-slate-800">{item.nombres}</h3>
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                            item.estado === 'contactado' ? 'bg-blue-100 text-blue-800' :
                                                item.estado === 'cerrado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {item.estado}
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock size={12} /> {new Date(item.fecha_solicitud).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-gray-400" />
                                        <a href={`tel:${item.telefono}`} className="hover:text-yellow-500 font-medium">{item.telefono}</a>
                                    </div>
                                    {item.email && (
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="text-gray-400" />
                                            <a href={`mailto:${item.email}`} className="hover:text-yellow-500">{item.email}</a>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                                    <p className="text-sm font-bold text-gray-700 mb-1">
                                        Interés: <span className="text-yellow-600 uppercase">{item.tipo_interes}</span>
                                        {item.moto && ` - ${item.moto.marca} ${item.moto.modelo}`}
                                        {item.repuesto_pieza && ` - ${item.repuesto_pieza.nombre}`}
                                    </p>
                                    {item.mensaje && (
                                        <div className="flex gap-2 items-start mt-2">
                                            <MessageSquare size={16} className="text-gray-400 mt-1 shrink-0" />
                                            <p className="text-sm text-gray-500 italic">"{item.mensaje}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 justify-center min-w-[150px]">
                                {item.estado !== 'cerrado' && (
                                    <>
                                        {item.estado === 'pendiente' && (
                                            <button
                                                onClick={() => handleStatusChange(item.id_solicitud, 'contactado')}
                                                className="w-full py-2 px-4 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Phone size={16} /> Contactado
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleStatusChange(item.id_solicitud, 'cerrado')}
                                            className="w-full py-2 px-4 rounded-lg bg-green-50 text-green-600 font-bold text-sm hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle size={16} /> Cerrar Venta
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(item.id_solicitud, 'cancelado')}
                                            className="w-full py-2 px-4 rounded-lg bg-gray-50 text-gray-500 font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <XCircle size={16} /> Cancelar
                                        </button>
                                    </>
                                )}
                                {item.estado === 'cerrado' && (
                                    <div className="text-center p-2 text-green-600 font-bold border border-green-200 rounded-lg bg-green-50">
                                        Venta Completada
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && !loading && (
                    <div className="text-center py-20 text-gray-400">
                        <MessageSquare className="mx-auto mb-4 opacity-20" size={64} />
                        <p>No hay solicitudes de interés aún.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sales;
