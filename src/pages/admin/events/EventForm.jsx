import React, { useState, useEffect } from "react";
import { X, Save, Loader2, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import { createEvento, updateEvento } from "../../../services/Evento.service";

const EventForm = ({ onClose, onSave, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titulo: "",
        tipo_evento: "ruta",
        fecha_evento: "",
        descripcion: "",
        ubicacion: "",
        estado: "activo",
    });

    useEffect(() => {
        if (initialData) {
            const formatForInput = (dateStr) => {
                if (!dateStr) return "";
                return new Date(dateStr).toISOString().slice(0, 16);
            };

            setFormData({
                ...initialData,
                fecha_evento: formatForInput(initialData.fecha_evento),
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const eventoData = {
                titulo: formData.titulo,
                tipo_evento: formData.tipo_evento,
                fecha_evento: new Date(formData.fecha_evento).toISOString(),
                descripcion: formData.descripcion,
                ubicacion: formData.ubicacion,
                estado: formData.estado,
            };

            if (initialData) {
                await updateEvento(initialData.id_evento, eventoData);
            } else {
                await createEvento(eventoData);
            }

            Swal.fire({
                icon: "success",
                title: initialData ? "Evento actualizado" : "Evento creado",
                showConfirmButton: false,
                timer: 1500
            });

            onSave();
            onClose();

        } catch (error) {
            console.error("Error guardando evento:", error);
            Swal.fire("Error", error.message || "Ocurrió un error al guardar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-black text-slate-800">
                        {initialData ? "Editar Evento" : "Nuevo Evento"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Título</label>
                        <input
                            type="text"
                            name="titulo"
                            required
                            className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                            value={formData.titulo}
                            onChange={handleChange}
                            placeholder="Ej. Ruta del Café"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Tipo de Evento</label>
                            <input
                                type="text"
                                name="tipo_evento"
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.tipo_evento}
                                onChange={handleChange}
                                placeholder="Ej. Ruta, Taller, Encuentro"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Estado</label>
                            <select
                                name="estado"
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.estado}
                                onChange={handleChange}
                            >
                                <option value="activo">Activo</option>
                                <option value="finalizado">Finalizado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Fecha y Hora</label>
                            <input
                                type="datetime-local"
                                name="fecha_evento"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.fecha_evento}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Ubicación</label>
                            <div className="relative">
                                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="ubicacion"
                                    className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                    value={formData.ubicacion}
                                    onChange={handleChange}
                                    placeholder="Ej. Plaza Principal"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Descripción</label>
                        <textarea
                            name="descripcion"
                            rows="4"
                            className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Detalles del evento..."
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
