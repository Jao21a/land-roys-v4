import React, { useState, useEffect } from "react";
import { X, Upload, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../../../api/Supabase.provider";
import { createRepuesto, updateRepuesto } from "../../../services/Repuesto.service";

const SpareForm = ({ onClose, onSave, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        categoria: "",
        precio: "",
        descripcion: "",
        estado: "disponible",
        imagen_url: null,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                imagen_url: initialData.imagen_repuesto?.[0]?.imagen?.url_imagen || null
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

            // Usamos el mismo bucket 'motos' o podríamos crear 'repuestos', 
            // pero para simplificar 'motos' sirve si las policies lo permiten (Storage es global al bucket)
            // Según tu script SQL anterior, el bucket 'motos' está configurado. 
            // Podemos usar una carpeta virtual dentro: repuestos/

            const fileExt = file.name.split(".").pop();
            const fileName = `repuestos/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("motos")
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("motos").getPublicUrl(fileName);

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
            // 1. Guardar Repuesto
            const repuestoData = {
                nombre: formData.nombre,
                categoria: formData.categoria,
                precio: parseFloat(formData.precio),
                descripcion: formData.descripcion,
                estado: formData.estado,
            };

            let repuestoId;

            if (initialData) {
                const updated = await updateRepuesto(initialData.id_repuesto, repuestoData);
                repuestoId = updated.id_repuesto;
            } else {
                const created = await createRepuesto(repuestoData);
                repuestoId = created.id_repuesto;
            }

            // 2. Guardar Imagen
            if (formData.imagen_url && (!initialData || initialData.imagen_repuesto?.[0]?.imagen?.url_imagen !== formData.imagen_url)) {

                const { data: imgData, error: imgError } = await supabase
                    .from("imagen")
                    .insert([{ url_imagen: formData.imagen_url, estado: 'activo' }])
                    .select()
                    .single();

                if (imgError) throw imgError;

                await supabase
                    .from("imagen_repuesto")
                    .insert([{ id_repuesto: repuestoId, id_imagen: imgData.id_imagen }]);
            }

            Swal.fire({
                icon: "success",
                title: initialData ? "Repuesto actualizado" : "Repuesto creado",
                showConfirmButton: false,
                timer: 1500
            });

            onSave();
            onClose();

        } catch (error) {
            console.error("Error guardando repuesto:", error);
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
                        {initialData ? "Editar Repuesto" : "Nuevo Repuesto"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Imagen Upload */}
                    <div className="flex justify-center">
                        <div className="relative group w-48 h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden hover:border-yellow-400 transition-colors cursor-pointer">
                            {formData.imagen_url ? (
                                <img src={formData.imagen_url} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload size={32} className="mb-2" />
                                    <span className="text-xs font-medium text-center px-2">Click para subir imagen</span>
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
                            <label className="text-sm font-bold text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                required
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ej. Filtro de Aceite"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Categoría</label>
                            <input
                                type="text"
                                name="categoria"
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.categoria}
                                onChange={handleChange}
                                placeholder="Ej. Motor"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Estado</label>
                            <select
                                name="estado"
                                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-yellow-400 outline-none"
                                value={formData.estado}
                                onChange={handleChange}
                            >
                                <option value="disponible">Disponible</option>
                                <option value="agotado">Agotado</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
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
                            placeholder="Detalles del repuesto..."
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
                            disabled={loading || uploading}
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

export default SpareForm;
