import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Filter, Wrench } from "lucide-react";
import Swal from "sweetalert2";
import { getRepuestos, deleteRepuesto } from "../../../services/Repuesto.service";
import Loader from "../../../components/common/Loader";
import SpareForm from "./SpareForm";

const InventorySpares = () => {
    const [repuestos, setRepuestos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSpare, setSelectedSpare] = useState(null);

    const fetchRepuestos = async () => {
        setLoading(true);
        try {
            const data = await getRepuestos();
            setRepuestos(data);
        } catch (error) {
            console.error("Error fetching repuestos:", error);
            Swal.fire("Error", "No se pudieron cargar los repuestos", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepuestos();
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
                await deleteRepuesto(id);
                setRepuestos(repuestos.filter((r) => r.id_repuesto !== id));
                Swal.fire("Eliminado", "El repuesto ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error deleting repuesto:", error);
                Swal.fire("Error", "No se pudo eliminar el repuesto", "error");
            }
        }
    };

    const handleEdit = (spare) => {
        setSelectedSpare(spare);
        setModalOpen(true);
    };

    const handleNew = () => {
        setSelectedSpare(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedSpare(null);
    };

    const handleSave = () => {
        fetchRepuestos();
    };

    const filteredRepuestos = repuestos.filter(
        (r) =>
            r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <Wrench className="text-yellow-400" size={32} />
                        Gestión de Repuestos
                    </h1>
                    <p className="text-gray-500">Administra el inventario de piezas y accesorios</p>
                </div>
                <button
                    onClick={handleNew}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <Plus size={20} />
                    Nuevo Repuesto
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o categoría..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRepuestos.map((item) => (
                    <div key={item.id_repuesto} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                            {item.imagen_repuesto?.[0]?.imagen?.url_imagen ? (
                                <img
                                    src={item.imagen_repuesto[0].imagen.url_imagen}
                                    alt={item.nombre}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 flex-col gap-2">
                                    <Wrench size={32} />
                                    <span className="text-xs">Sin imagen</span>
                                </div>
                            )}
                            <div className="absolute top-3 right-3">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${item.estado === "disponible" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}>
                                    {item.estado}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">{item.categoria || "General"}</span>
                                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{item.nombre}</h3>
                                </div>
                                <span className="font-black text-xl text-slate-800">${item.precio}</span>
                            </div>
                            <p className="text-gray-500 text-xs line-clamp-2 mb-4 h-8">{item.descripcion || "Sin descripción"}</p>

                            <div className="flex gap-2 pt-2 border-t border-gray-50">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-blue-600 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit size={14} /> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id_repuesto)}
                                    className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-red-50 text-red-600 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={14} /> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredRepuestos.length === 0 && !loading && (
                <div className="text-center py-20 text-gray-400">
                    <Wrench className="mx-auto mb-4 opacity-20" size={64} />
                    <p>No se encontraron repuestos.</p>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <SpareForm
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    initialData={selectedSpare}
                />
            )}
        </div>
    );
};

export default InventorySpares;
