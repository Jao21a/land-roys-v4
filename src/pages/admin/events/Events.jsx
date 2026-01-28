import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Calendar, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import { getEventos, deleteEvento } from "../../../services/Evento.service";
import Loader from "../../../components/common/Loader";
import EventForm from "./EventForm";

const Events = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchEventos = async () => {
        setLoading(true);
        try {
            const data = await getEventos();
            setEventos(data);
        } catch (error) {
            console.error("Error fetching eventos:", error);
            Swal.fire("Error", "No se pudieron cargar los eventos", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fbbf24",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                await deleteEvento(id);
                setEventos(eventos.filter((e) => e.id_evento !== id));
                Swal.fire("Eliminado", "El evento ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error deleting evento:", error);
                Swal.fire("Error", "No se pudo eliminar el evento", "error");
            }
        }
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const handleNew = () => {
        setSelectedEvent(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };

    const handleSave = () => {
        fetchEventos();
    };

    const filteredEventos = eventos.filter(
        (e) =>
            e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.tipo_evento?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) return <Loader />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <Calendar className="text-yellow-400" size={32} />
                        Gestión de Eventos
                    </h1>
                    <p className="text-gray-500">Programa rutas, encuentros y actividades</p>
                </div>
                <button
                    onClick={handleNew}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <Plus size={20} />
                    Nuevo Evento
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título o tipo..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredEventos.map((item) => (
                    <div key={item.id_evento} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-all group">

                        {/* Fecha Badge */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4 min-w-[80px]">
                            <span className="text-xs font-bold text-gray-500 uppercase">{new Date(item.fecha_evento).toLocaleString('es-ES', { month: 'short' })}</span>
                            <span className="text-2xl font-black text-slate-800">{new Date(item.fecha_evento).getDate()}</span>
                            <span className="text-[10px] text-gray-400">{new Date(item.fecha_evento).getFullYear()}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">{item.tipo_evento || 'Evento'}</span>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.estado === 'activo' ? 'bg-green-100 text-green-700' :
                                        item.estado === 'finalizado' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {item.estado}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.titulo}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                                {item.ubicacion && (
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} className="text-gray-400" />
                                        {item.ubicacion}
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-gray-400" />
                                    {new Date(item.fecha_evento).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2">{item.descripcion}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                            <button
                                onClick={() => handleEdit(item)}
                                className="flex-1 p-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-blue-600 transition-colors flex items-center justify-center"
                                title="Editar"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id_evento)}
                                className="flex-1 p-2 rounded-lg bg-gray-50 hover:bg-red-50 text-red-600 transition-colors flex items-center justify-center"
                                title="Eliminar"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredEventos.length === 0 && !loading && (
                <div className="text-center py-20 text-gray-400">
                    <Calendar className="mx-auto mb-4 opacity-20" size={64} />
                    <p>No se encontraron eventos programados.</p>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <EventForm
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    initialData={selectedEvent}
                />
            )}
        </div>
    );
};

export default Events;
