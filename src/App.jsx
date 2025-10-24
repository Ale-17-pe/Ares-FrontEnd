// App.jsx
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
import AdminPage from './pages/AdminPage';
import AdminPlanesPage from './pages/AdminPlanesPage';
import AdminClientesPage from './pages/AdminClientesPage';
import AdminSuscripcionesPage from './pages/AdminSuscripcionesPage'
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

          <Route path="/membresias" element={<MisMembresiasPage />} />
          <Route path="/clases" element={<ClasesPage />} />
          <Route path="/reservas" element={<MisReservasPage />} />
          <Route path="/asistencias" element={<MisAsistenciasPage />} />
          <Route path="/pagos" element={<MisPagosPage />} />
          <Route path="/calificaciones" element={<CalificacionesPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/planes" element={<AdminPlanesPage />} />
            <Route path="/admin/clientes" element={<AdminClientesPage />} />
            <Route path="/admin/suscripciones" element={<AdminSuscripcionesPage />} />
            <Route path="/admin/clases" element={<AdminClasesPage />} />
            <Route path="/admin/asistencias" element={<AdminAsistenciasPage />} />
            <Route path="/admin/pagos" element={<AdminPagosPage />} />
            <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
            <Route path="/admin/usuarios/editar/:id" element={<AdminEditarUsuario />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;