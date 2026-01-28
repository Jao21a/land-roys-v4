import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { createPromocion, updatePromocion } from "../../../services/Promocion.service";

const PromotionForm = ({ onClose, onSave, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        tipo: "descuento",
        fecha_inicio: "",
        fecha_fin: "",
        estado: "activo",
    });

    useEffect(() => {
        if (initialData) {
            // Formatear fechas para input datetime-local (cortar la Z y milisegundos si es necesario)
            const formatForInput = (dateStr) => {
                if (!dateStr) return "";
                return new Date(dateStr).toISOString().slice(0, 16);
            };

            setFormData({
                ...initialData,
                fecha_inicio: formatForInput(initialData.fecha_inicio),
                fecha_fin: formatForInput(initialData.fecha_fin),
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
            const promocionData = {
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                tipo: formData.tipo,
                fecha_inicio: new Date(formData.fecha_inicio).toISOString(),
                fecha_fin: new Date(formData.fecha_fin).toISOString(),
                estado: formData.estado,
            };

            if (initialData) {
                await updatePromocion(initialData.id_promocion, promocionData);
            } else {
                await createPromocion(promocionData);
            }

            Swal.fire({
                icon: "success",
                title: initialData ? "Promoción actualizada" : "Promoción creada",
                showConfirmButton: false,
                timer: 1500
            });

            onSave();
            onClose();

        } catch (error) {
            console.error("Error guardando promoción:", error);
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
                        {initialData ? "Editar Promoción" : "Nueva Promoción"}
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
                            placeholder="Ej. Descuento de Verano"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Tipo</label>
                            <select
                                name="tipo"
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.tipo}
                                onChange={handleChange}
                            >
                                <option value="descuento">Descuento</option>
                                <option value="oferta">Oferta</option>
                                <option value="liquidacion">Liquidación</option>
                            </select>
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
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Fecha Inicio</label>
                            <input
                                type="datetime-local"
                                name="fecha_inicio"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.fecha_inicio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Fecha Fin</label>
                            <input
                                type="datetime-local"
                                name="fecha_fin"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.fecha_fin}
                                onChange={handleChange}
                            />
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
                            placeholder="Detalles de la promoción..."
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

export default PromotionForm;
