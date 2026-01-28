import React, { useEffect, useState } from "react";
import { Settings as SettingsIcon, Save, Plus, Trash2, Edit } from "lucide-react";
import Swal from "sweetalert2";
import { getConfig, updateConfig, createConfig, deleteConfig } from "../../../services/Config.service";
import Loader from "../../../components/common/Loader";

const Settings = () => {
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [newMode, setNewMode] = useState(false);

    // States for editing/creating
    const [editForm, setEditForm] = useState({ valor: "" });
    const [newForm, setNewForm] = useState({ clave: "", valor: "", descripcion: "", estado: "activo" });

    const fetchConfig = async () => {
        setLoading(true);
        try {
            const data = await getConfig();
            setConfigs(data);
        } catch (error) {
            console.error("Error fetching config:", error);
            Swal.fire("Error", "No se pudo cargar la configuración", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    // UPDATE
    const handleEditClick = (item) => {
        setEditingId(item.id_config);
        setEditForm({ valor: item.valor });
    };

    const handleSaveEdit = async (id) => {
        try {
            await updateConfig(id, { valor: editForm.valor });
            await fetchConfig();
            setEditingId(null);
            Swal.fire("Guardado", "Valor actualizado", "success");
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar", "error");
        }
    };

    // CREATE
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createConfig(newForm);
            await fetchConfig();
            setNewMode(false);
            setNewForm({ clave: "", valor: "", descripcion: "", estado: "activo" });
            Swal.fire("Creado", "Nueva configuración añadida", "success");
        } catch (error) {
            Swal.fire("Error", "No se pudo crear (¿Clave duplicada?)", "error");
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Borrar configuración?",
            text: "Esto puede afectar el funcionamiento de la web",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar"
        });

        if (result.isConfirmed) {
            try {
                await deleteConfig(id);
                setConfigs(configs.filter(c => c.id_config !== id));
                Swal.fire("Borrado", "", "success");
            } catch (error) {
                Swal.fire("Error", "No se pudo borrar", "error");
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <SettingsIcon className="text-gray-600" size={32} />
                        Configuración Global
                    </h1>
                    <p className="text-gray-500">Variables y ajustes generales del sistema</p>
                </div>
                <button
                    onClick={() => setNewMode(!newMode)}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <Plus size={20} />
                    {newMode ? "Cancelar" : "Nueva Variable"}
                </button>
            </div>

            {/* Create Form */}
            {newMode && (
                <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-yellow-200">
                    <h3 className="font-bold text-lg mb-4">Nueva Variable de Configuración</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Clave (Única)</label>
                            <input
                                className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                                placeholder="EJ: CONTACTO_EMAIL"
                                value={newForm.clave}
                                onChange={e => setNewForm({ ...newForm, clave: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Valor</label>
                            <input
                                className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                                placeholder="valor..."
                                value={newForm.valor}
                                onChange={e => setNewForm({ ...newForm, valor: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Descripción</label>
                            <input
                                className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                                placeholder="Para qué sirve..."
                                value={newForm.descripcion}
                                onChange={e => setNewForm({ ...newForm, descripcion: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="bg-yellow-400 text-black font-bold p-2 rounded-lg hover:bg-yellow-500">
                            Guardar
                        </button>
                    </form>
                </div>
            )}

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-bold text-gray-500 text-sm">Clave</th>
                            <th className="p-4 font-bold text-gray-500 text-sm">Valor</th>
                            <th className="p-4 font-bold text-gray-500 text-sm">Descripción</th>
                            <th className="p-4 font-bold text-gray-500 text-sm text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {configs.map((item) => (
                            <tr key={item.id_config} className="hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm font-bold text-blue-600">
                                    {item.clave}
                                </td>
                                <td className="p-4">
                                    {editingId === item.id_config ? (
                                        <div className="flex gap-2">
                                            <input
                                                className="border rounded px-2 py-1 w-full"
                                                value={editForm.valor}
                                                onChange={(e) => setEditForm({ valor: e.target.value })}
                                            />
                                            <button onClick={() => handleSaveEdit(item.id_config)} className="text-green-600 hover:text-green-700">
                                                <Save size={18} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-800 break-all">{item.valor}</span>
                                    )}
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {item.descripcion}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id_config)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {configs.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-400">
                                    No hay configuraciones. Añade una nueva.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Settings;
