// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";           
import AdminLayout from "./components/AdminLayout";  
import AdminRoute from "./components/AdminRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage.jsx";
import RegistroPage from "./pages/RegistroPage.jsx";
import UbicacionPage from "./pages/UbicacionPage.jsx";
import Membresias from "./pages/MembresiasPage.jsx"; 
import EjerciciosPage from "./pages/EjerciciosPage.jsx";
import PlanesPage from "./pages/PlanesPage.jsx"; 
import AdminPage from './pages/AdminPage';
import AdminPlanesPage from './pages/AdminPlanesPage'; 
import AdminClientesPage from './pages/AdminClientesPage';
import AdminSuscripcionesPage from './pages/AdminSuscripcionesPage'
import AdminClasesPage from './pages/AdminClasesPage';
import ClasesPage from './pages/ClasesPage';
import MisReservasPage from './pages/MisReservasPage';

function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} /> 
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegistroPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ubicacion" element={<UbicacionPage />} />
        <Route path="planes" element={<PlanesPage />} />
        <Route path="ejercicios" element={<EjerciciosPage />} />
        <Route path="membresias" element={<Membresias />} />
        <Route path="/clases" element={<ClasesPage />} />
        <Route path="/mis-reservas" element={<MisReservasPage />}/>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/planes" element={<AdminPlanesPage />} />
        <Route path="/admin/clientes" element={<AdminClientesPage />} />
        <Route path="/admin/suscripciones" element={<AdminSuscripcionesPage />} />
        <Route path="/admin/clases" element={<AdminClasesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;