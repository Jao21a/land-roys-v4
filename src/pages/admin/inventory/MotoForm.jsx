import React, { useState, useEffect } from "react";
import { X, Upload, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../api/Supabase.provider";
import { createMoto, updateMoto } from "../../../services/Moto.service";

const MotoForm = ({ onClose, onSave, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        marca: "",
        modelo: "",
        anio: new Date().getFullYear(),
        cilindrada: "",
        precio: "",
        descripcion: "",
        estado: "disponible",
        imagen_url: null, // Para visualización/subida
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                // Si ya tiene imagen, la mostramos (asumiendo que viene en el objeto inicial)
                imagen_url: initialData.imagen_moto?.[0]?.imagen?.url_imagen || null
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("motos")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("motos").getPublicUrl(filePath);

            setFormData((prev) => ({ ...prev, imagen_url: data.publicUrl }));

        } catch (error) {
            console.error("Error subiendo imagen:", error);
            Swal.fire("Error", "No se pudo subir la imagen", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Guardar la Moto
            const motoData = {
                marca: formData.marca,
                modelo: formData.modelo,
                anio: parseInt(formData.anio),
                cilindrada: formData.cilindrada,
                precio: parseFloat(formData.precio),
                descripcion: formData.descripcion,
                estado: formData.estado,
            };

            let motoId;

            if (initialData) {
                // Actualizar
                const updated = await updateMoto(initialData.id_moto, motoData);
                motoId = updated.id_moto;
            } else {
                // Crear
                const created = await createMoto(motoData);
                motoId = created.id_moto;
            }

            // 2. Guardar la Imagen (Si hay una nueva URL y no es edición sin cambios)
            // Nota: Para simplificar, en este MVP si subes foto, creamos una nueva entrada en imagen e imagen_moto
            // En un sistema real borraríamos las viejas o reutilizaríamos.
            if (formData.imagen_url && (!initialData || initialData.imagen_moto?.[0]?.imagen?.url_imagen !== formData.imagen_url)) {

                // Crear registro en tabla IMAGEN
                const { data: imgData, error: imgError } = await supabase
                    .from("imagen")
                    .insert([{ url_imagen: formData.imagen_url, estado: 'activo' }])
                    .select()
                    .single();

                if (imgError) throw imgError;

                // Crear relación en IMAGEN_MOTO
                await supabase
                    .from("imagen_moto")
                    .insert([{ id_moto: motoId, id_imagen: imgData.id_imagen }]);
            }

            Swal.fire({
                icon: "success",
                title: initialData ? "Moto actualizada" : "Moto creada",
                showConfirmButton: false,
                timer: 1500
            });

            onSave(); // Recargar lista
            onClose();

        } catch (error) {
            console.error("Error guardando moto:", error);
            Swal.fire("Error", error.message || "Ocurrió un error al guardar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-black text-slate-800">
                        {initialData ? "Editar Motocicleta" : "Nueva Motocicleta"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Imagen Upload */}
                    <div className="flex justify-center">
                        <div className="relative group w-full h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden hover:border-yellow-400 transition-colors cursor-pointer">
                            {formData.imagen_url ? (
                                <img src={formData.imagen_url} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload size={32} className="mb-2" />
                                    <span className="text-sm font-medium">Click para subir imagen</span>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                disabled={uploading}
                            />

                            {uploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-white" size={32} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Marca</label>
                            <input
                                type="text"
                                name="marca"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.marca}
                                onChange={handleChange}
                                placeholder="Ej. Yamaha"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Modelo</label>
                            <input
                                type="text"
                                name="modelo"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.modelo}
                                onChange={handleChange}
                                placeholder="Ej. MT-09"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Año</label>
                            <input
                                type="number"
                                name="anio"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.anio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Cilindrada</label>
                            <input
                                type="text"
                                name="cilindrada"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.cilindrada}
                                onChange={handleChange}
                                placeholder="Ej. 890cc"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Precio</label>
                            <input
                                type="number"
                                name="precio"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.precio}
                                onChange={handleChange}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Descripción</label>
                        <textarea
                            name="descripcion"
                            rows="3"
                            className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Detalles adicionales..."
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Estado</label>
                        <select
                            name="estado"
                            className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                            value={formData.estado}
                            onChange={handleChange}
                        >
                            <option value="disponible">Disponible</option>
                            <option value="reservado">Reservado</option>
                            <option value="vendido">Vendido</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
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
                            disabled={loading || uploading}
                            className="px-8 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Guardar Moto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MotoForm;
