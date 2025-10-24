import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUser,
  faDumbbell,
  faCalendarAlt,
  faChartLine,
  faCrown,
  faHistory,
  faCreditCard,
  faUserCheck,
  faStar,
  faClock,
  faCheckCircle,
  faExclamationTriangle,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import './css/DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [membresia, setMembresia] = useState(null);
  const [estadisticas, setEstadisticas] = useState({
    entrenamientosMes: 0,
    asistencia: 0,
    clasesReservadas: 0,
    diasRestantes: 0,
    pagosPendientes: 0,
    asistenciasRecientes: 0
  });
  const [loading, setLoading] = useState(true);
  const [ultimaAsistencia, setUltimaAsistencia] = useState(null);
  const [proximoPago, setProximoPago] = useState(null);
  const [error, setError] = useState(null);

  // Verificar autenticación al montar el componente
  useEffect(() => {
    const verificarAutenticacion = () => {
      try {
        const usuarioStorage = localStorage.getItem('usuario');
        if (usuarioStorage) {
          const usuarioParsed = JSON.parse(usuarioStorage);
          setUsuario(usuarioParsed);
          cargarDatosDashboard(usuarioParsed.id);
        } else {
          setLoading(false);
          setError('Usuario no autenticado');
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setLoading(false);
        setError('Error al cargar los datos del usuario');
      }
    };

    verificarAutenticacion();
  }, []);

  const cargarDatosDashboard = async (usuarioId) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular carga de datos (reemplaza con tus servicios reales)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cargar membresía simulada
      const dataMembresia = await obtenerMembresiaUsuario(usuarioId);
      setMembresia(dataMembresia);

      // Cargar asistencias simuladas
      const asistencias = await obtenerHistorialPorUsuario(usuarioId);
      setUltimaAsistencia(asistencias[0] || null);

      // Cargar próximo pago simulado
      const pagoProximo = dataMembresia ? {
        fecha: '2024-02-01',
        monto: dataMembresia.plan?.precio || 0,
        estado: 'PENDIENTE'
      } : null;
      setProximoPago(pagoProximo);

      // Calcular estadísticas simuladas
      const nuevasEstadisticas = {
        entrenamientosMes: asistencias.filter(a => 
          new Date(a.fecha).getMonth() === new Date().getMonth()
        ).length,
        asistencia: calcularPorcentajeAsistencia(asistencias),
        clasesReservadas: 5,
        diasRestantes: dataMembresia ? calcularDiasRestantes(dataMembresia.fechaFin) : 0,
        pagosPendientes: pagoProximo ? 1 : 0,
        asistenciasRecientes: asistencias.length
      };
      setEstadisticas(nuevasEstadisticas);

    } catch (error) {
      console.error("Error cargando datos del dashboard:", error);
      setError('Error al cargar los datos del dashboard');
      // Datos de ejemplo para desarrollo
      setEstadisticas({
        entrenamientosMes: 12,
        asistencia: 85,
        clasesReservadas: 5,
        diasRestantes: 15,
        pagosPendientes: 1,
        asistenciasRecientes: 8
      });
    } finally {
      setLoading(false);
    }
  };

  const calcularDiasRestantes = (fechaFin) => {
    if (!fechaFin) return 0;
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const diffTiempo = fin.getTime() - hoy.getTime();
    const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDias);
  };

  const calcularPorcentajeAsistencia = (asistencias) => {
    if (!asistencias || asistencias.length === 0) return 0;
    return Math.min(100, (asistencias.length / 30) * 100);
  };

  const getEstadoMembresiaColor = (estado) => {
    switch (estado) {
      case 'ACTIVA': return '#28a745';
      case 'PENDIENTE': return '#ffc107';
      case 'VENCIDA': return '#dc3545';
      case 'SUSPENDIDA': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getEstadoMembresiaIcono = (estado) => {
    switch (estado) {
      case 'ACTIVA': return faCheckCircle;
      case 'PENDIENTE': return faClock;
      case 'VENCIDA': return faExclamationTriangle;
      case 'SUSPENDIDA': return faExclamationTriangle;
      default: return faClock;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token'); // Si usas tokens
    navigate('/login');
  };

  const handleRetry = () => {
    if (usuario) {
      cargarDatosDashboard(usuario.id);
    } else {
      navigate('/login');
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div className="dashboard-header-container">
            <div className="dashboard-logo">
              <h1>AresFitness</h1>
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          <div className="dashboard-container">
            <div className="dashboard-loading">
              <FontAwesomeIcon icon={faSync} spin size="3x" color="#ffd500" />
              <p style={{ marginTop: '20px', color: '#ffd500' }}>Cargando dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Usuario no autenticado
  if (!usuario || error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-unauthorized">
          <h2 className="unauthorized-title">
            {error ? 'Error de Carga' : 'Acceso no autorizado'}
          </h2>
          <p>
            {error || 'Debes iniciar sesión para acceder al dashboard.'}
          </p>
          <button
            onClick={error ? handleRetry : () => navigate('/login')}
            className="btn-login-redirect"
          >
            {error ? 'Reintentar' : 'Ir al Login'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-container">
          <div className="dashboard-logo">
            <h1>AresFitness</h1>
          </div>
          
          <div className="dashboard-user-info">
            <div className="dashboard-welcome">
              <h2>Bienvenido, {usuario.nombre || 'Usuario'}</h2>
              <p>{usuario.email || ''}</p>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          <h1 className="dashboard-title">MI DASHBOARD</h1>

          {/* Información Rápida */}
          <div className="info-rapida">
            <div className="info-card membresia-info">
              <div className="info-header">
                <FontAwesomeIcon icon={faCrown} />
                <h3>Mi Membresía</h3>
              </div>
              {membresia ? (
                <div className="membresia-detalles">
                  <div className="membresia-estado">
                    <FontAwesomeIcon 
                      icon={getEstadoMembresiaIcono(membresia.estado)} 
                      style={{ color: getEstadoMembresiaColor(membresia.estado) }}
                    />
                    <span style={{ color: getEstadoMembresiaColor(membresia.estado) }}>
                      {membresia.estado}
                    </span>
                  </div>
                  <div className="membresia-plan">{membresia.plan?.nombrePlan || 'Sin plan'}</div>
                  <div className="membresia-dias">
                    {estadisticas.diasRestantes} días restantes
                  </div>
                </div>
              ) : (
                <div className="sin-membresia">
                  <p>No tienes una membresía activa</p>
                  <Link to="/membresias">
                    <button className="btn-primario">Adquirir Membresía</button>
                  </Link>
                </div>
              )}
            </div>

            <div className="info-card proxima-actividad">
              <div className="info-header">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <h3>Próxima Actividad</h3>
              </div>
              {ultimaAsistencia ? (
                <div className="actividad-info">
                  <div className="actividad-tipo">Última asistencia</div>
                  <div className="actividad-fecha">{ultimaAsistencia.fecha}</div>
                  <div className="actividad-hora">{ultimaAsistencia.horaEntrada}</div>
                </div>
              ) : (
                <div className="sin-actividad">
                  <p>No hay actividades recientes</p>
                  <Link to="/clases">
                    <button className="btn-secundario">Reservar Clase</button>
                  </Link>
                </div>
              )}
            </div>

            <div className="info-card proximo-pago">
              <div className="info-header">
                <FontAwesomeIcon icon={faCreditCard} />
                <h3>Próximo Pago</h3>
              </div>
              {proximoPago ? (
                <div className="pago-info">
                  <div className="pago-monto">${proximoPago.monto}</div>
                  <div className="pago-fecha">{proximoPago.fecha}</div>
                  <div className="pago-estado">{proximoPago.estado}</div>
                </div>
              ) : (
                <div className="sin-pago">
                  <p>No hay pagos pendientes</p>
                </div>
              )}
            </div>
          </div>

          {/* Grid de Acciones */}
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
              <p>Gestiona tu plan y estado de membresía</p>
              <Link to="/membresias">
                <button className="btn-card">Ver Membresía</button>
              </Link>
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
              <Link to="/reservas">
                <button className="btn-card">Ver Reservas</button>
              </Link>
            </div>

            {/* Asistencias */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faUserCheck} />
              </div>
              <h3>Mis Asistencias</h3>
              <p>Consulta tu historial de asistencia al gimnasio</p>
              <Link to="/asistencias">
                <button className="btn-card">Ver Asistencias</button>
              </Link>
            </div>

            {/* Pagos */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              <h3>Mis Pagos</h3>
              <p>Revisa tu historial de transacciones y pagos</p>
              <Link to="/pagos">
                <button className="btn-card">Ver Pagos</button>
              </Link>
            </div>

            {/* Calificaciones */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <h3>Calificaciones</h3>
              <p>Comparte tu experiencia y lee opiniones</p>
              <Link to="/calificaciones">
                <button className="btn-card">Ver Calificaciones</button>
              </Link>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-number">{estadisticas.entrenamientosMes}</div>
              <div className="stat-label">Entrenamientos este mes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{estadisticas.asistencia}%</div>
              <div className="stat-label">Asistencia</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{estadisticas.diasRestantes}</div>
              <div className="stat-label">Días restantes membresía</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{estadisticas.clasesReservadas}</div>
              <div className="stat-label">Clases reservadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{estadisticas.asistenciasRecientes}</div>
              <div className="stat-label">Asistencias totales</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{estadisticas.pagosPendientes}</div>
              <div className="stat-label">Pagos pendientes</div>
            </div>
          </div>

          {/* Sección de Actividad Reciente */}
          <div className="actividad-reciente">
            <h2>Actividad Reciente</h2>
            <div className="actividad-list">
              {ultimaAsistencia ? (
                <div className="actividad-item">
                  <FontAwesomeIcon icon={faUserCheck} className="actividad-icon" />
                  <div className="actividad-content">
                    <h4>Asistencia registrada</h4>
                    <p>{ultimaAsistencia.fecha} a las {ultimaAsistencia.horaEntrada}</p>
                  </div>
                </div>
              ) : (
                <div className="actividad-item">
                  <FontAwesomeIcon icon={faClock} className="actividad-icon" />
                  <div className="actividad-content">
                    <h4>Sin actividad reciente</h4>
                    <p>Visita el gimnasio para registrar tu primera asistencia</p>
                  </div>
                </div>
              )}
              
              <div className="actividad-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="actividad-icon" />
                <div className="actividad-content">
                  <h4>Clase reservada</h4>
                  <p>Yoga Matutino - Mañana 07:00</p>
                </div>
              </div>
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

// Funciones de servicio simuladas (reemplaza con tus servicios reales)
const obtenerMembresiaUsuario = async (usuarioId) => {
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Datos de ejemplo - reemplaza con tu lógica real
    return {
      id: 1,
      estado: 'ACTIVA',
      fechaFin: '2024-02-15',
      plan: {
        nombrePlan: 'PREMIUM',
        precio: 149.90
      }
    };
  } catch (error) {
    console.error('Error obteniendo membresía:', error);
    return null;
  }
};

const obtenerHistorialPorUsuario = async (usuarioId) => {
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Datos de ejemplo - reemplaza con tu lógica real
    return [
      {
        id: 1,
        fecha: '2024-01-15',
        horaEntrada: '08:30',
        claseNombre: 'Yoga Matutino'
      },
      {
        id: 2,
        fecha: '2024-01-14',
        horaEntrada: '18:15',
        claseNombre: 'CrossFit'
      }
    ];
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    return [];
  }
};

export default DashboardPage;