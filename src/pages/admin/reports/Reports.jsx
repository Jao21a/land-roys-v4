import React, { useEffect, useState } from "react";
import { BarChart3, PieChart, TrendingUp, Download } from "lucide-react";
import Loader from "../../../components/common/Loader";
import { getDashboardStats } from "../../../services/Dashboard.service";

const Reports = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load report stats");
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) return <Loader />;

    // Cálculos simples (ya que no tenemos historial de ventas complejo aun)
    const ocupacionInventario = Math.round((stats.motosDisponibles / stats.motosTotal) * 100) || 0;
    const leadsRate = Math.round((stats.leadsPendientes / (stats.clientesTotal || 1)) * 100) || 0;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                        <BarChart3 className="text-yellow-400" size={32} />
                        Reportes y Métricas
                    </h1>
                    <p className="text-gray-500">Análisis del rendimiento del plataforma</p>
                </div>
                <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2">
                    <Download size={20} />
                    Exportar PDF
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Inventory Health */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                        <PieChart size={20} className="text-blue-500" />
                        Salud del Inventario
                    </h3>
                    <div className="flex items-center justify-center py-8">
                        <div className="relative w-48 h-48 rounded-full border-[16px] border-gray-100 flex items-center justify-center">
                            {/* Simulacion de grafico circular con borde de color usando style */}
                            <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 border-r-transparent border-b-transparent transform rotate-45" style={{ clipPath: `inset(0 0 0 0)` }}></div>
                            <div className="text-center">
                                <span className="text-4xl font-black text-slate-800">{ocupacionInventario}%</span>
                                <p className="text-xs text-gray-500 font-bold uppercase">Disponibilidad</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total Motos</p>
                            <p className="text-2xl font-black text-slate-800">{stats.motosTotal}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Disponibles</p>
                            <p className="text-2xl font-black text-blue-500">{stats.motosDisponibles}</p>
                        </div>
                    </div>
                </div>

                {/* Leads Analysis */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-green-500" />
                        Actividad de Clientes
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-600">Solicitudes Pendientes</span>
                                <span className="font-black text-yellow-600">{stats.leadsPendientes}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${Math.min(stats.leadsPendientes * 10, 100)}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-600">Total Usuarios Registrados</span>
                                <span className="font-black text-blue-600">{stats.clientesTotal}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div className="bg-blue-400 h-3 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl mt-4 border border-green-100">
                            <p className="text-sm text-green-800">
                                <strong>Tip:</strong> Tienes {stats.leadsPendientes} oportunidades de venta pendientes. ¡Contacta a estos usuarios hoy mismo!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
