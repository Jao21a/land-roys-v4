import React, { useEffect, useState } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Box,
  TrendingUp,
  ArrowRight,
  Bike,
  Wrench,
  MessageSquare
} from "lucide-react";
import { getDashboardStats } from "../../../services/Dashboard.service";
import Loader from "../../../components/common/Loader";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <Loader />;

  const cards = [
    {
      title: "Motos en Inventario",
      value: stats?.motosTotal || 0,
      subtext: `${stats?.motosDisponibles || 0} Disponibles`,
      icon: <Bike size={24} />,
      color: "bg-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Repuestos",
      value: stats?.repuestosTotal || 0,
      subtext: "Total piezas",
      icon: <Wrench size={24} />,
      color: "bg-purple-500",
      bg: "bg-purple-50"
    },
    {
      title: "Solicitudes Pendientes",
      value: stats?.leadsPendientes || 0,
      subtext: "Clientes por contactar",
      icon: <MessageSquare size={24} />,
      color: "bg-yellow-500",
      bg: "bg-yellow-50"
    },
    {
      title: "Clientes Totales",
      value: stats?.clientesTotal || 0,
      subtext: "Registrados",
      icon: <Users size={24} />,
      color: "bg-green-500",
      bg: "bg-green-50"
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800">Dashboard</h1>
        <p className="text-gray-500">Bienvenido al panel de administración de Land Roys</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-black text-slate-800 mb-1">{card.value}</h3>
              <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                <TrendingUp size={12} className="text-green-500" />
                {card.subtext}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${card.bg} ${card.color.replace('bg-', 'text-')}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Actividad Reciente (Solicitudes)</h3>
            <button className="text-yellow-500 text-sm font-bold hover:underline">Ver todo</button>
          </div>
          <div className="space-y-4">
            {stats?.recentLeads.length > 0 ? stats.recentLeads.map((lead) => (
              <div key={lead.id_solicitud} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
                    {lead.nombres[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{lead.nombres}</p>
                    <p className="text-xs text-gray-500">Interesado en {lead.tipo_interes}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400">
                  {new Date(lead.fecha_solicitud).toLocaleDateString()}
                </span>
              </div>
            )) : (
              <p className="text-gray-400 text-center py-4">No hay actividad reciente.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-gray-50 hover:bg-yellow-50 rounded-xl flex items-center justify-between group transition-colors">
              <span className="font-bold text-gray-600 group-hover:text-yellow-600">Nueva Moto</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-yellow-500" />
            </button>
            <button className="w-full p-4 bg-gray-50 hover:bg-yellow-50 rounded-xl flex items-center justify-between group transition-colors">
              <span className="font-bold text-gray-600 group-hover:text-yellow-600">Nueva Promoción</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-yellow-500" />
            </button>
            <button className="w-full p-4 bg-gray-50 hover:bg-yellow-50 rounded-xl flex items-center justify-between group transition-colors">
              <span className="font-bold text-gray-600 group-hover:text-yellow-600">Programar Evento</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-yellow-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;