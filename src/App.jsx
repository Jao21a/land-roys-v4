import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./util/ProtectedRoute";

/* Layouts */
import Layout from "./layout/Layout";
import AdminLayout from "./layout/AdminLayout";

/* Páginas cliente */
import Home from "./pages/client/home/Home";
import Models from "./pages/client/models/Models";
import Spares from "./pages/client/spares/Spares";
import About from "./pages/client/about/About";

/* Páginas admin */
import Login from "./pages/admin/auth/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Slider from "./pages/admin/slider/Slider";
import Inventory from "./pages/admin/inventory/Inventory";
import InventorySpares from "./pages/admin/spares/InventorySpares";
import Promotions from "./pages/admin/promotions/Promotions";
import Events from "./pages/admin/events/Events";
import Settings from "./pages/admin/settings/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas cliente */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/modelos" element={<Models />} />
            <Route path="/repuestos" element={<Spares />} />
            <Route path="/nosotros" element={<About />} />
          </Route>

          {/* Login admin */}
          <Route path="/login/admin" element={<Login />} />

          {/* Rutas admin protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventario" element={<Inventory />} />
            <Route path="repuestos" element={<InventorySpares />} />
            <Route path="promociones" element={<Promotions />} />
            <Route path="eventos" element={<Events />} />
            <Route path="configuracion" element={<Settings />} />
            <Route path="slider_gestion" element={<Slider />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
