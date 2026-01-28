import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import Swal from "sweetalert2";
import { getMotos, deleteMoto } from "../../../services/Moto.service";
import Loader from "../../../components/common/Loader";
import MotoForm from "./MotoForm";

const Inventory = () => {
    const [motos, setMotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMoto, setSelectedMoto] = useState(null);

    const fetchMotos = async () => {
        setLoading(true);
        try {
            const data = await getMotos();
            setMotos(data);
        } catch (error) {
            console.error("Error fetching motos:", error);
            Swal.fire("Error", "No se pudieron cargar las motos", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMotos();
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
                await deleteMoto(id);
                setMotos(motos.filter((moto) => moto.id_moto !== id));
                Swal.fire("Eliminado", "La moto ha sido eliminada.", "success");
            } catch (error) {
                console.error("Error deleting moto:", error);
                Swal.fire("Error", "No se pudo eliminar la moto", "error");
            }
        }
    };

    const handleEdit = (moto) => {
        setSelectedMoto(moto);
        setModalOpen(true);
    };

    const handleNew = () => {
        setSelectedMoto(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedMoto(null);
    };

    const handleSave = () => {
        fetchMotos(); // Recargar lista
    };

    const filteredMotos = motos.filter(
        (moto) =>
            moto.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            moto.marca.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Inventario de Motos</h1>
                    <p className="text-gray-500">Gestiona el catálogo de motocicletas</p>
                </div>
                <button
                    onClick={handleNew}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <Plus size={20} />
                    Nueva Moto
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por marca o modelo..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter size={20} />
                </button>
            </div>

            {/* Table / Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-bold text-gray-500 text-sm">Imagen</th>
                                <th className="p-4 font-bold text-gray-500 text-sm">Moto</th>
                                <th className="p-4 font-bold text-gray-500 text-sm">Año / CC</th>
                                <th className="p-4 font-bold text-gray-500 text-sm">Precio</th>
                                <th className="p-4 font-bold text-gray-500 text-sm">Estado</th>
                                <th className="p-4 font-bold text-gray-500 text-sm text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredMotos.map((moto) => (
                                <tr key={moto.id_moto} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                            {moto.imagen_moto?.[0]?.imagen?.url_imagen ? (
                                                <img
                                                    src={moto.imagen_moto[0].imagen.url_imagen}
                                                    alt={moto.modelo}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gray-400">Sin foto</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-slate-800">{moto.marca} {moto.modelo}</div>
                                        <div className="text-xs text-gray-400">ID: {moto.id_moto}</div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {moto.anio} - {moto.cilindrada}
                                    </td>
                                    <td className="p-4 font-bold text-green-600">
                                        ${moto.precio?.toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${moto.estado === "disponible"
                                                ? "bg-green-100 text-green-700"
                                                : moto.estado === "vendido"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {moto.estado}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(moto)}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(moto.id_moto)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredMotos.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-400">
                                        No se encontraron motos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {modalOpen && (
                <MotoForm
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    initialData={selectedMoto}
                />
            )}
        </div>
    );
};

export default Inventory;
