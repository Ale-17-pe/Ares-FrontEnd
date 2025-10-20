import React, { useEffect, useState } from 'react';import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";
import {
  faSignOutAlt,
  faUser,
  faDumbbell,
  faCalendarAlt,
  faChartLine,
  faCrown,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const [membresia, setMembresia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuario) {
      const cargarDatosMembresia = async () => {
        try {
          // Usamos el ID del usuario guardado para buscar su membresía
          const data = await obtenerMembresiaUsuario(usuario.id);
          setMembresia(data);
        } catch (error) {
          // Si no hay membresía, el estado 'membresia' seguirá siendo null
        } finally {
          setLoading(false); 
        }
      };
      cargarDatosMembresia();
    }
  }, [usuario]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  if (!usuario) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-unauthorized">
          <h2 className="unauthorized-title">Acceso no autorizado</h2>
          <p>Debes iniciar sesión para acceder al dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className="btn-login-redirect"
          >
            Ir al Login
          </button>
        </div>
      </div>
    );
  }

  const calcularDiasRestantes = () => {
    if (!membresia) return 0;
    const hoy = new Date();
    const fechaFin = new Date(membresia.fechaFin);
    const diffTiempo = fechaFin.getTime() - hoy.getTime();
    const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDias); // Para no mostrar números negativos
  };

  return (
    <div className="dashboard-page">

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          <h1 className="dashboard-title">MI DASHBOARD</h1>

          <div className="dashboard-grid">
            {/* Perfil */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h3>Mi Perfil</h3>
              <p>Gestiona tu información personal y preferencias de cuenta</p>
              <button className="btn-card">Ver Perfil</button>
            </div>

            {/* Rutinas */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faDumbbell} />
              </div>
              <h3>Mis Rutinas</h3>
              <p>Accede a tus rutinas de entrenamiento personalizadas</p>
              <button className="btn-card">Ver Rutinas</button>
            </div>

            {/* Membresía */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faCrown} />
              </div>
              <h3>Mi Membresía</h3>
              {loading ? (
                <p>Cargando...</p>
              ) : membresia ? (
                <p>Plan <strong>{membresia.plan.nombrePlan}</strong> - Estado: <strong>{membresia.estado}</strong></p>
              ) : (
                <p>No tienes una membresía activa.</p>
              )}
              <button className="btn-card" >Ver Membresía</button>
            </div>

            {/* Progreso */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3>Mi Progreso</h3>
              <p>Revisa tus avances y métricas de entrenamiento</p>
              <button className="btn-card">Ver Progreso</button>
            </div>

            {/* Reservas */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <h3>Mis Reservas</h3>
              <p>Gestiona tus reservas de clases y entrenamientos</p>
                <Link to="/mis-reservas">
                    <button className="btn-card">Ver Reservas</button>
                </Link>
            </div>

            {/* Historial */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faHistory} />
              </div>
              <h3>Historial</h3>
              <p>Consulta tu historial de entrenamientos y pagos</p>
              <button className="btn-card">Ver Historial</button>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Entrenamientos este mes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Asistencia</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Días restantes</div>
              
            </div>
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Clases reservadas</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default DashboardPage;