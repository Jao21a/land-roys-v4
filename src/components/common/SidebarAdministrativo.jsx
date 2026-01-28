import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Box,
    CircleDollarSign,
    Users,
    BarChart3,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Images,
    Wrench,
    Tag,
    Calendar,
    Settings as SettingsIcon,
} from "lucide-react";

const SidebarAdministrativo = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            icon: <LayoutDashboard size={22} />,
            label: "Dashboard",
            path: "/admin/dashboard",
        },
        {
            icon: <Images size={22} />,
            label: "Carrusel Gestión",
            path: "/admin/slider_gestion",
        },
        {
            icon: <Box size={22} />,
            label: "Inventario (Motos)",
            path: "/admin/inventario",
        },
        {
            icon: <Wrench size={22} />,
            label: "Repuestos",
            path: "/admin/repuestos",
        },
        {
            icon: <Tag size={22} />,
            label: "Promociones",
            path: "/admin/promociones",
        },
        {
            icon: <Calendar size={22} />,
            label: "Eventos",
            path: "/admin/eventos",
        },
        {
            icon: <SettingsIcon size={22} />,
            label: "Configuración",
            path: "/admin/configuracion",
        },
        {
            icon: <CircleDollarSign size={22} />,
            label: "Ventas",
            path: "/admin/ventas",
        },
        {
            icon: <Users size={22} />,
            label: "Clientes",
            path: "/admin/clientes",
        },
        {
            icon: <BarChart3 size={22} />,
            label: "Reportes",
            path: "/admin/reportes",
        },
    ];

    return (
        <aside
            className={`relative bg-[#121212] text-gray-400 transition-all duration-300 flex flex-col p-4
      ${isCollapsed ? "w-24" : "w-64"}`}
        >
            {/* Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 bg-yellow-400 text-black rounded-full p-1 border-4 border-[#121212] z-50"
            >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Menú */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center gap-4 p-3 rounded-xl transition-all relative group
              ${isActive
                                ? "bg-white/10 text-white font-medium"
                                : "hover:bg-white/5 hover:text-gray-200"
                            }
              ${isCollapsed ? "justify-center" : ""}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-6 bg-yellow-400 rounded-r-full" />
                                )}

                                <span className={isActive ? "text-yellow-400" : ""}>
                                    {item.icon}
                                </span>

                                {!isCollapsed && (
                                    <span className="text-sm tracking-wide">{item.label}</span>
                                )}

                                {isCollapsed && (
                                    <div className="absolute left-full ml-6 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                                        {item.label}
                                    </div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Ayuda */}
            <div className="mt-auto pt-6 border-t border-white/5">
                <NavLink
                    to="/admin/ayuda"
                    className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all
          ${isCollapsed ? "justify-center" : ""}`}
                >
                    <HelpCircle size={22} />
                    {!isCollapsed && <span className="text-sm">Centro de Ayuda</span>}
                </NavLink>
            </div>
        </aside>
    );
};

export default SidebarAdministrativo;
