import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";

import {
    faCrown, faUser, faSignInAlt, faUserPlus, faDumbbell, faChartLine,
    faCog, faShieldAlt, faCalendarAlt, faMoneyBillWave, faChartBar,
    faCogs, faTachometerAlt, faIdCard, faReceipt, faUserCog,
    faClipboardList, faUsers, faMapMarkerAlt, faPhone, faEnvelope,
    faArrowRight, faBell,
    faUsersBetweenLines
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF, faInstagram, faTwitter, faTiktok, faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './css/AdminPage.css';

function AdminPage() {
    const [notificaciones, setNotificaciones] = useState(3);
    const [busquedaModulo, setBusquedaModulo] = useState('');
    const [loading, setLoading] = useState(true);

    // CORREGIDO: Variables con nombres correctos
    const [datosEnTiempoReal, setDatosEnTiempoReal] = useState({
        clientesActivos: 0,
        ingresosMensuales: 0,
        nuevosRegistros: 0, // CORREGIDO: Cambiar nuevisRegistros
        tasaRetencion: 0    // CORREGIDO: Cambiar tasaMensuales
    });

    useEffect(() => {
        const cargarDatos = async () => {
            setLoading(true);

            await new Promise(resolve => setTimeout(resolve, 1000));
            setDatosEnTiempoReal({
                clientesActivos: 1247,
                ingresosMensuales: 45820,
                nuevosRegistros: 324,
                tasaRetencion: 89
            });
            setLoading(false);
        };
        cargarDatos();
    }, []);

    const metricas = [
        {
            icono: faUsers,
            numero: loading ? '...' : datosEnTiempoReal.clientesActivos.toLocaleString(),
            titulo: 'Clientes Activos',
            cambio: '+12%',
            tendencia: 'positiva',
            color: '#ffd500'
        },
        {
            icono: faMoneyBillWave,
            numero: loading ? '...' : `S/ ${datosEnTiempoReal.ingresosMensuales.toLocaleString()}`,
            titulo: 'Ingresos Mensuales',
            cambio: '+8%',
            tendencia: 'positiva',
            color: '#28a745'
        },
        {
            icono: faDumbbell,
            numero: loading ? '...' : `${datosEnTiempoReal.tasaRetencion}%`,
            titulo: 'Tasa de Retención',
            cambio: '+3%',
            tendencia: 'positiva',
            color: '#17a2b8'
        },
        {
            icono: faChartLine,
            numero: loading ? '...' : datosEnTiempoReal.nuevosRegistros.toLocaleString(),
            titulo: 'Nuevos Registros',
            cambio: '+15%',
            tendencia: 'positiva',
            color: '#ff6b6b'
        }
    ];

    const modulosAdmin = [
        {
            icono: faUserPlus,
            titulo: 'Gestión de Usuarios',
            descripcion: 'Crea, edita y elimina usuarios del sistema',
            ruta: '/admin/usuarios',
            color: '#00ffc8ff',
            estadisticas: '1,247 clientes'
        },
         {
            icono: faUsers,
            titulo: 'Gestión de Clientes',
            descripcion: 'Administra toda la información de los clientes y sus membresías',
            ruta: '/admin/clientes',
            color: '#ffd500',
            estadisticas: '1,247 clientes'
        },
        {
            icono: faCrown,
            titulo: 'Planes de Membresía',
            descripcion: 'Crea y gestiona los diferentes planes de membresía disponibles',
            ruta: '/admin/planes',
            color: '#28a745',
            estadisticas: '3 planes activos'
        },
        {
            icono: faIdCard,
            titulo: 'Membresías Activas',
            descripcion: 'Controla el estado y renovación de todas las membresías',
            ruta: '/admin/suscripciones',
            color: '#17a2b8',
            estadisticas: '984 activas'
        },
        {
            icono: faChartBar,
            titulo: 'Reportes y Analytics',
            descripcion: 'Genera reportes detallados y análisis de rendimiento',
            ruta: '/admin/reportes',
            color: '#ff6b6b',
            estadisticas: '15 reportes'
        },
        {
            icono: faReceipt,
            titulo: 'Gestión de Pagos',
            descripcion: 'Administra pagos, facturación y estados de cuenta',
            ruta: '/admin/pagos',
            color: '#6f42c1',
            estadisticas: 'S/ 45,820 recaudado'
        },
        {
            icono: faCalendarAlt,
            titulo: 'Agenda y Reservas',
            descripcion: 'Gestiona horarios, clases y reservas de instalaciones',
            ruta: '/admin/clases',
            color: '#fd7e14',
            estadisticas: '56 reservas hoy'
        },
        {
            icono: faUserCog,
            titulo: 'Configuración',
            descripcion: 'Configura parámetros generales del sistema y permisos',
            ruta: '/admin/configuracion',
            color: '#20c997',
            estadisticas: '12 ajustes'
        },
        {
            icono: faClipboardList,
            titulo: 'Asistencias',
            descripcion: 'Control de asistencias de los clientes al gimnasio',
            ruta: '/admin/asistencias',
            color: '#e83e8c',
            estadisticas: '45 productos'
        }
    ];

    const modulosFiltrados = modulosAdmin.filter(modulo =>
        modulo.titulo.toLowerCase().includes(busquedaModulo.toLowerCase()) ||
        modulo.descripcion.toLowerCase().includes(busquedaModulo.toLowerCase())
    );

    const actividadesRecientes = [
        {
            usuario: 'María García',
            accion: 'Renovó membresía Premium',
            tiempo: 'Hace 5 min',
            tipo: 'membresia'
        },
        {
            usuario: 'Carlos López',
            accion: 'Se registró como nuevo cliente',
            tiempo: 'Hace 15 min',
            tipo: 'registro'
        },
        {
            usuario: 'Ana Rodríguez',
            accion: 'Compró suplementos deportivos',
            tiempo: 'Hace 25 min',
            tipo: 'venta'
        },
        {
            usuario: 'Sistema',
            accion: 'Backup automático completado',
            tiempo: 'Hace 1 hora',
            tipo: 'sistema'
        }
    ];

    const handleQuickAction = (accion) => {
        console.log(`Acción rápida: ${accion}`);
    };

    return (
        <div className="admin-page">

            <section className="hero-Admin-panel">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Panel de Administración</h1>
                        <p>Gestiona tu gimnasio de manera eficiente</p>
                        <div className="admin-breadcrumb">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            <span>Dashboard Principal</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Loading State */}
            {loading && (
                <div className="loading-Admin-dashboard">
                    <div className="loading-spinner"></div>
                    <p>Cargando datos del dashboard...</p>
                </div>
            )}

            {/* Métricas Rápidas */}
            <section className="metricas-section">
                <div className="metricas-container">
                    {metricas.map((metrica, index) => (
                        <div key={index} className="metrica-card">
                            <div className="metrica-icon" style={{ color: metrica.color }}>
                                <FontAwesomeIcon icon={metrica.icono} />
                            </div>
                            <div className="metrica-content">
                                <h3>{metrica.numero}</h3>
                                <p>{metrica.titulo}</p>
                                <span className={`cambio ${metrica.tendencia}`}>
                                    {metrica.cambio} este mes
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Módulos de Administración */}
            <section className="modulos-section">
                <div className="section-title">
                    <h2>MÓDULOS DE ADMINISTRACIÓN</h2>
                    <div className="title-line"></div>
                    <p>Accede a todas las herramientas de gestión de tu gimnasio</p>
                </div>

                {/* AGREGADO: Contenedor para buscador y notificaciones */}
                <div className="modulos-header">
                    <div className="search-modulos">
                        <input
                            type="text"
                            placeholder="Buscar módulo..."
                            value={busquedaModulo}
                            onChange={(e) => setBusquedaModulo(e.target.value)}
                            className="search-modulos-input"
                        />
                    </div>
                    <div className="admin-notifications">
                        <FontAwesomeIcon icon={faBell} />
                        {notificaciones > 0 && <span className="notification-badge">{notificaciones}</span>}
                    </div>
                </div>

                <div className="modulos-grid">
                    {modulosFiltrados.map((modulo, index) => (
                        <Link key={index} to={modulo.ruta} className="modulo-card">
                            <div className="modulo-header">
                                <div
                                    className="modulo-icon"
                                    style={{ backgroundColor: modulo.color }}
                                >
                                    <FontAwesomeIcon icon={modulo.icono} />
                                </div>
                                <div className="modulo-info">
                                    <h3>{modulo.titulo}</h3>
                                    <span className="modulo-stats">{modulo.estadisticas}</span>
                                </div>
                            </div>
                            <p className="modulo-descripcion">{modulo.descripcion}</p>
                            <div className="modulo-arrow">
                                <FontAwesomeIcon icon={faCogs} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Actividad Reciente y Estadísticas */}
            <section className="dashboard-content">
                <div className="dashboard-grid">
                    {/* Actividad Reciente */}
                    <div className="actividad-card">
                        <div className="card-header">
                            <h3>
                                <FontAwesomeIcon icon={faChartLine} />
                                Actividad Reciente
                            </h3>
                            <button className="btn-ver-todo">Ver Todo</button>
                        </div>
                        <div className="actividad-list">
                            {actividadesRecientes.map((actividad, index) => (
                                <div key={index} className="actividad-item">
                                    <div className={`actividad-icon ${actividad.tipo}`}>
                                        <FontAwesomeIcon icon={
                                            actividad.tipo === 'membresia' ? faCrown :
                                                actividad.tipo === 'registro' ? faUser :
                                                    actividad.tipo === 'venta' ? faMoneyBillWave : faCog
                                        } />
                                    </div>
                                    <div className="actividad-content">
                                        <div className="actividad-usuario">{actividad.usuario}</div>
                                        <div className="actividad-accion">{actividad.accion}</div>
                                    </div>
                                    <div className="actividad-tiempo">{actividad.tiempo}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Estadísticas Rápidas */}
                    <div className="estadisticas-card">
                        <div className="card-header">
                            <h3>
                                <FontAwesomeIcon icon={faChartBar} />
                                Resumen Mensual
                            </h3>
                        </div>
                        <div className="estadisticas-grid">
                            <div className="estadistica-item">
                                <div className="estadistica-valor">S/ 45,820</div>
                                <div className="estadistica-label">Ingresos Totales</div>
                                <div className="estadistica-tendencia positiva">+8%</div>
                            </div>
                            <div className="estadistica-item">
                                <div className="estadistica-valor">324</div>
                                <div className="estadistica-label">Nuevos Clientes</div>
                                <div className="estadistica-tendencia positiva">+15%</div>
                            </div>
                            <div className="estadistica-item">
                                <div className="estadistica-valor">89%</div>
                                <div className="estadistica-label">Retención</div>
                                <div className="estadistica-tendencia positiva">+3%</div>
                            </div>
                            <div className="estadistica-item">
                                <div className="estadistica-valor">56</div>
                                <div className="estadistica-label">Reservas Hoy</div>
                                <div className="estadistica-tendencia estable">0%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions-section">
                <div className="section-title">
                    <h2>ACCIONES RÁPIDAS</h2>
                    <div className="title-line"></div>
                </div>
                <div className="quick-actions-grid">
                    <button className="quick-action-btn"
                        onClick={() => handleQuickAction('nuevo-cliente')}>
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>Nuevo Cliente</span>
                        <FontAwesomeIcon icon={faArrowRight} className="action-arrow" />
                    </button>
                    <button className="quick-action-btn">
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                        <span>Registrar Pago</span>
                    </button>
                    <button className="quick-action-btn">
                        <FontAwesomeIcon icon={faCrown} />
                        <span>Crear Membresía</span>
                    </button>
                    <button className="quick-action-btn">
                        <FontAwesomeIcon icon={faChartBar} />
                        <span>Generar Reporte</span>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="main-footer-Admin">
                <div className="footer-container-Admin">
                    <div className="footer-section-Admin">
                        <div className="logo-footer-Admin">
                            <Link to="/">
                                <img src={logo} alt="Logo AresFitness" />
                            </Link>
                        </div>
                        <p>Transformando vidas a través del fitness desde 2020</p>
                    </div>
                </div>
                <div className="footer-bottom-Admin">
                    <p>&copy; 2025 AresFitness. Panel de Administración v2.0</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminPage;