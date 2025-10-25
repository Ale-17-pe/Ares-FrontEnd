// App.jsx - CORREGIDO
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage.jsx";
import RegistroPage from "./pages/RegistroPage.jsx";
import UbicacionPage from "./pages/UbicacionPage.jsx";
import EjerciciosPage from "./pages/EjerciciosPage.jsx";
import PlanesPage from "./pages/PlanesPage.jsx";
import NosotrosPage from "./pages/NosotrosPage.jsx";
import ComentariosSection from './pages/ComentariosSection.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import AdminPlanesPage from './pages/AdminPlanesPage';
import AdminClientesPage from './pages/AdminClientesPage';
import AdminSuscripcionesPage from './pages/AdminSuscripcionesPage';
import AdminClasesPage from './pages/AdminClasesPage';
import ClasesPage from './pages/ClasesPage';
import MisReservasPage from './pages/MisReservasPage';
import AdminAsistenciasPage from './pages/AdminAsistenciasPage';
import AdminPagosPage from './pages/AdminPagosPage';
import MisAsistenciasPage from './pages/MisAsistenciasPage';
import MisPagosPage from './pages/MisPagosPage';
import CalificacionesPage from './pages/CalificacionesPage';
import MisMembresiasPage from "./pages/MisMembresiasPage.jsx";
import AdminUsuariosPage from "./pages/AdminUsuariosPage.jsx";
import AdminEditarUsuario from './pages/AdminEditarUsuario.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas/normales */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegistroPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ubicacion" element={<UbicacionPage />} />
          <Route path="planes" element={<PlanesPage />} />
          <Route path="ejercicios" element={<EjerciciosPage />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="comentarios" element={<ComentariosSection />} />

          <Route path="membresias" element={<MisMembresiasPage />} />
          <Route path="clases" element={<ClasesPage />} />
          <Route path="reservas" element={<MisReservasPage />} />
          <Route path="asistencias" element={<MisAsistenciasPage />} />
          <Route path="pagos" element={<MisPagosPage />} />
          <Route path="calificaciones" element={<CalificacionesPage />} />
        </Route>

        {/* ✅ CORREGIDO: Rutas admin con paths relativos */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<AdminRoute />}>
            <Route index element={<AdminPage />} />  {/* ✅ index en lugar de path */}
            <Route path="planes" element={<AdminPlanesPage />} />  {/* ✅ path relativo */}
            <Route path="clientes" element={<AdminClientesPage />} />
            <Route path="suscripciones" element={<AdminSuscripcionesPage />} />
            <Route path="clases" element={<AdminClasesPage />} />
            <Route path="asistencias" element={<AdminAsistenciasPage />} />
            <Route path="pagos" element={<AdminPagosPage />} />
            <Route path="usuarios" element={<AdminUsuariosPage />} />
            <Route path="usuarios/editar/:id" element={<AdminEditarUsuario />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

// ✅ Asegúrate de que esta línea esté al final del archivo
export default App;