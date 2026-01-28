import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Tag, Calendar } from "lucide-react";
import Swal from "sweetalert2";
import { getPromociones, deletePromocion } from "../../../services/Promocion.service";
import Loader from "../../../components/common/Loader";
import PromotionForm from "./PromotionForm";

const Promotions = () => {
    const [promociones, setPromociones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);

    const fetchPromociones = async () => {
        setLoading(true);
        try {
            const data = await getPromociones();
            setPromociones(data);
        } catch (error) {
            console.error("Error fetching promociones:", error);
            Swal.fire("Error", "No se pudieron cargar las promociones", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromociones();
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
                await deletePromocion(id);
                setPromociones(promociones.filter((p) => p.id_promocion !== id));
                Swal.fire("Eliminado", "La promoción ha sido eliminada.", "success");
            } catch (error) {
                console.error("Error deleting promocion:", error);
                Swal.fire("Error", "No se pudo eliminar la promoción", "error");
            }
        }
    };

    const handleEdit = (promo) => {
        setSelectedPromo(promo);
        setModalOpen(true);
    };

    const handleNew = () => {
        setSelectedPromo(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPromo(null);
    };

    const handleSave = () => {
        fetchPromociones();
    };

    const filteredPromociones = promociones.filter(
        (p) =>
            p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("es-ES", {
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
                        <Tag className="text-yellow-400" size={32} />
                        Gestión de Promociones
                    </h1>
                    <p className="text-gray-500">Configura ofertas y descuentos para la web</p>
                </div>
                <button
                    onClick={handleNew}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <Plus size={20} />
                    Nueva Promoción
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

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromociones.map((item) => (
                    <div key={item.id_promocion} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.tipo === 'descuento' ? 'bg-blue-100 text-blue-700' :
                                    item.tipo === 'liquidacion' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {item.tipo}
                            </span>
                            <span className={`w-3 h-3 rounded-full ${item.estado === 'activo' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-2">{item.titulo}</h3>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-3 min-h-[60px]">{item.descripcion || "Sin descripción"}</p>

                        <div className="space-y-2 mb-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="font-semibold">Inicio:</span> {formatDate(item.fecha_inicio)}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="font-semibold">Fin:</span> {formatDate(item.fecha_fin)}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-blue-600 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <Edit size={16} /> Editar
                            </button>
                            <button
                                onClick={() => handleDelete(item.id_promocion)}
                                className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-red-50 text-red-600 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <Trash2 size={16} /> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPromociones.length === 0 && !loading && (
                <div className="text-center py-20 text-gray-400">
                    <Tag className="mx-auto mb-4 opacity-20" size={64} />
                    <p>No se encontraron promociones activas.</p>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <PromotionForm
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    initialData={selectedPromo}
                />
            )}
        </div>
    );
};

export default Promotions;
