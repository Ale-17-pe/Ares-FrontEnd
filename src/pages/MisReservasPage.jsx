import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerReservasUsuario } from '../services/reservaService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faSearch,
    faCalendarAlt,
    faClock,
    faUserCircle,
    faDumbbell,
    faMusic,
    faHeart,
    faBicycle,
    faStopwatch,
    faTrash,
    faExclamationTriangle,
    faCheckCircle,
    faTimesCircle,
    faInfoCircle,
    faChartLine,
    faIdCard, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './MisReservasPage.css';

function MisReservasPage() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cancelando, setCancelando] = useState(null);
    const navigate = useNavigate();

    const reservasEjemplo = [
        {
            id: 1,
            fechaHoraReserva: '2024-11-15T10:00:00',
            estado: 'CONFIRMADA',
            clase: {
                id: 101,
                nombreClase: 'Yoga Matutino',
                instructorId: 201,
                instructor: 'Ana García',
                capacidadMaxima: 20,
                duracion: 60,
                nivel: 'Principiante',
                tipo: 'Yoga',
                horario: 'Lunes 07:00 - 08:00',
                ubicacion: 'Sala de Yoga A'
            }
        },
        {
            id: 2,
            fechaHoraReserva: '2024-11-16T18:00:00',
            estado: 'CONFIRMADA',
            clase: {
                id: 102,
                nombreClase: 'CrossFit Avanzado',
                instructorId: 202,
                instructor: 'Carlos López',
                capacidadMaxima: 15,
                duracion: 45,
                nivel: 'Avanzado',
                tipo: 'CrossFit',
                horario: 'Martes 18:00 - 18:45',
                ubicacion: 'Zona CrossFit'
            }
        },
        {
            id: 3,
            fechaHoraReserva: '2024-11-14T17:00:00',
            estado: 'COMPLETADA',
            clase: {
                id: 103,
                nombreClase: 'Pilates Intermedio',
                instructorId: 203,
                instructor: 'María Rodríguez',
                capacidadMaxima: 12,
                duracion: 50,
                nivel: 'Intermedio',
                tipo: 'Pilates',
                horario: 'Miércoles 17:00 - 17:50',
                ubicacion: 'Sala de Pilates'
            }
        },
        {
            id: 4,
            fechaHoraReserva: '2024-11-20T19:00:00',
            estado: 'PENDIENTE',
            clase: {
                id: 104,
                nombreClase: 'Spinning Intenso',
                instructorId: 204,
                instructor: 'Pedro Martínez',
                capacidadMaxima: 25,
                duracion: 45,
                nivel: 'Todos los niveles',
                tipo: 'Spinning',
                horario: 'Jueves 19:00 - 19:45',
                ubicacion: 'Sala de Spinning'
            }
        }
    ];

    useEffect(() => {
        const cargarReservas = async () => {
            const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

            if (!usuarioLogueado) {
                setError("Debes iniciar sesión para ver tus reservas.");
                setLoading(false);
                setTimeout(() => navigate('/login'), 3000);
                return;
            }

            try {
                setLoading(true);
                const data = await obtenerReservasUsuario(usuarioLogueado.id);
                if (data && data.length > 0) {
                    // Formatear los datos de la API
                    const reservasFormateadas = data.map(reserva => ({
                        id: reserva.id,
                        fechaHoraReserva: reserva.fechaHoraReserva,
                        estado: reserva.estado || 'CONFIRMADA',
                        clase: reserva.clase || {
                            id: reserva.claseId,
                            nombreClase: 'Clase General',
                            instructorId: 1,
                            instructor: 'Instructor',
                            capacidadMaxima: 20,
                            duracion: 60,
                            nivel: 'Principiante',
                            tipo: 'General',
                            horario: 'Por definir',
                            ubicacion: 'Sala Principal'
                        }
                    }));
                    setReservas(reservasFormateadas);
                } else {
                    setReservas(reservasEjemplo);
                }
            } catch (err) {
                console.error("Error al cargar las reservas:", err);
                setError("No se pudieron cargar tus reservas. Mostrando datos de ejemplo.");
                setReservas(reservasEjemplo);
            } finally {
                setLoading(false);
            }
        };

        cargarReservas();
    }, [navigate]);

    const handleCancelarReserva = async (reservaId) => {
        if (!window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
            return;
        }

        try {
            setCancelando(reservaId);
            await cancelarReserva(reservaId);
            // Actualizar la lista de reservas
            setReservas(reservas.filter(reserva => reserva.id !== reservaId));
        } catch (err) {
            console.error("Error al cancelar la reserva:", err);
            setError("No se pudo cancelar la reserva. Inténtalo de nuevo.");
        } finally {
            setCancelando(null);
        }
    };

    const formatearFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatearHora = (fechaString) => {
        const fecha = new Date(fechaString);
        return fecha.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEstadoColor = (estado) => {
        const colores = {
            'CONFIRMADA': '#28a745',
            'PENDIENTE': '#ffc107',
            'COMPLETADA': '#17a2b8',
            'CANCELADA': '#dc3545'
        };
        return colores[estado] || '#6c757d';
    };

    const getEstadoIcono = (estado) => {
        const iconos = {
            'CONFIRMADA': faCheckCircle,
            'PENDIENTE': faClock,
            'COMPLETADA': faCheckCircle,
            'CANCELADA': faTimesCircle
        };
        return iconos[estado] || faInfoCircle;
    };

    const getTipoIcono = (tipo) => {
        const iconos = {
            'Yoga': faHeart,
            'CrossFit': faDumbbell,
            'Pilates': faRunning,
            'Spinning': faBicycle,
            'Baile': faMusic,
            'Boxeo': faStopwatch,
            'General': faRunning
        };
        return iconos[tipo] || faRunning;
    };

    const getNivelColor = (nivel) => {
        const colores = {
            'Principiante': '#28a745',
            'Intermedio': '#ffc107',
            'Avanzado': '#dc3545',
            'Todos los niveles': '#17a2b8'
        };
        return colores[nivel] || '#6c757d';
    };

    const reservasFuturas = reservas.filter(reserva =>
        new Date(reserva.fechaHoraReserva) > new Date() &&
        reserva.estado !== 'COMPLETADA' &&
        reserva.estado !== 'CANCELADA'
    );

    const reservasPasadas = reservas.filter(reserva =>
        new Date(reserva.fechaHoraReserva) <= new Date() ||
        reserva.estado === 'COMPLETADA'
    );

    if (loading) {
        return (
            <div className="mis-reservas-loading">
                <div className="loading-spinner"></div>
                <p>Cargando tus reservas...</p>
            </div>
        );
    }

    return (
        <div className="mis-reservas-page">
            {/* Hero Section */}
            <section className="hero-reservas">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>MIS RESERVAS</h1>
                        <p>Gestiona y revisa todas tus clases reservadas en AresFitness</p>
                    </div>
                </div>
            </section>

            {/* Estadísticas Rápidas */}
            <section className="stats-reservas">
                <div className="stats-container">
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCalendarAlt} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{reservasFuturas.length}</h3>
                            <p>Próximas Clases</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{reservasPasadas.length}</h3>
                            <p>Clases Completadas</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faRunning} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{new Set(reservas.map(r => r.clase.tipo)).size}</h3>
                            <p>Tipos de Clase</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faClock} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{reservas.reduce((total, r) => total + r.clase.duracion, 0)}</h3>
                            <p>Minutos Entrenados</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenido Principal */}
            <section className="reservas-content">
                <div className="container">
                    {error && (
                        <div className="error-message">
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            {error}
                        </div>
                    )}

                    {/* Reservas Futuras */}
                    {reservasFuturas.length > 0 && (
                        <div className="reservas-section">
                            <div className="section-header">
                                <h2>Próximas Reservas</h2>
                                <div className="section-badge">{reservasFuturas.length}</div>
                            </div>
                            <div className="reservas-grid">
                                {reservasFuturas.map(reserva => (
                                    <div key={reserva.id} className="reserva-card">
                                        <div className="reserva-header">
                                            <div className="clase-icon">
                                                <FontAwesomeIcon icon={getTipoIcono(reserva.clase.tipo)} />
                                            </div>
                                            <div className="clase-info">
                                                <h3>{reserva.clase.nombreClase}</h3>
                                                <div className="clase-meta">
                                                    <span className="clase-instructor">
                                                        <FontAwesomeIcon icon={faUser} />
                                                        {reserva.clase.instructor}
                                                    </span>
                                                    <span
                                                        className="clase-nivel"
                                                        style={{ color: getNivelColor(reserva.clase.nivel) }}
                                                    >
                                                        {reserva.clase.nivel}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="reserva-estado"
                                                style={{ backgroundColor: getEstadoColor(reserva.estado) }}
                                            >
                                                <FontAwesomeIcon icon={getEstadoIcono(reserva.estado)} />
                                                {reserva.estado}
                                            </div>
                                        </div>

                                        <div className="reserva-body">
                                            <div className="reserva-details">
                                                <div className="detail-item">
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                    <div>
                                                        <strong>Fecha:</strong>
                                                        <span>{formatearFecha(reserva.fechaHoraReserva)}</span>
                                                    </div>
                                                </div>
                                                <div className="detail-item">
                                                    <FontAwesomeIcon icon={faClock} />
                                                    <div>
                                                        <strong>Horario:</strong>
                                                        <span>{reserva.clase.horario}</span>
                                                    </div>
                                                </div>
                                                <div className="detail-item">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                    <div>
                                                        <strong>Ubicación:</strong>
                                                        <span>{reserva.clase.ubicacion}</span>
                                                    </div>
                                                </div>
                                                <div className="detail-item">
                                                    <FontAwesomeIcon icon={faStopwatch} />
                                                    <div>
                                                        <strong>Duración:</strong>
                                                        <span>{reserva.clase.duracion} minutos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="reserva-footer">
                                            <div className="reserva-actions">
                                                <button
                                                    className="btn-cancelar"
                                                    onClick={() => handleCancelarReserva(reserva.id)}
                                                    disabled={cancelando === reserva.id}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    {cancelando === reserva.id ? 'Cancelando...' : 'Cancelar Reserva'}
                                                </button>
                                                <button className="btn-detalles">
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    Ver Detalles
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reservas Pasadas */}
                    {reservasPasadas.length > 0 && (
                        <div className="reservas-section">
                            <div className="section-header">
                                <h2>Historial de Reservas</h2>
                                <div className="section-badge">{reservasPasadas.length}</div>
                            </div>
                            <div className="reservas-grid historial">
                                {reservasPasadas.map(reserva => (
                                    <div key={reserva.id} className="reserva-card historial">
                                        <div className="reserva-header">
                                            <div className="clase-icon">
                                                <FontAwesomeIcon icon={getTipoIcono(reserva.clase.tipo)} />
                                            </div>
                                            <div className="clase-info">
                                                <h3>{reserva.clase.nombreClase}</h3>
                                                <div className="clase-meta">
                                                    <span className="clase-instructor">
                                                        <FontAwesomeIcon icon={faUser} />
                                                        {reserva.clase.instructor}
                                                    </span>
                                                    <span className="fecha-pasada">
                                                        {formatearFecha(reserva.fechaHoraReserva)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="reserva-estado"
                                                style={{ backgroundColor: getEstadoColor(reserva.estado) }}
                                            >
                                                <FontAwesomeIcon icon={getEstadoIcono(reserva.estado)} />
                                                {reserva.estado}
                                            </div>
                                        </div>

                                        <div className="reserva-body">
                                            <div className="reserva-stats">
                                                <div className="stat-item">
                                                    <span className="stat-value">{reserva.clase.duracion}</span>
                                                    <span className="stat-label">minutos</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="stat-value">{reserva.clase.nivel}</span>
                                                    <span className="stat-label">nivel</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="stat-value">{reserva.clase.capacidadMaxima}</span>
                                                    <span className="stat-label">capacidad</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="reserva-footer">
                                            <button className="btn-reservar-otra">
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                                Reservar Otra Vez
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sin Reservas */}
                    {!error && reservas.length === 0 && (
                        <div className="no-reservas">
                            <div className="no-reservas-icon">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                            <h2>Aún no tienes reservas</h2>
                            <p>¡Descubre nuestras increíbles clases y comienza tu journey fitness!</p>
                            <div className="no-reservas-actions">
                                <Link to="/clases" className="btn-primary">
                                    <FontAwesomeIcon icon={faRunning} />
                                    Explorar Clases
                                </Link>
                                <Link to="/membresias" className="btn-secondary">
                                    <FontAwesomeIcon icon={faCrown} />
                                    Ver Membresías
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="main-footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <div className="logo-footer">
                            <Link to="/">
                                <img src="/assets/Imagenes/logo.png" alt="Logo AresFitness" />
                            </Link>
                        </div>
                        <p>Transformando vidas a través del fitness desde 2020</p>
                        <div className="footer-social">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://www.instagram.com/aresfitness.peru/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Enlaces rápidos</h3>
                        <ul>
                            <li><Link to="/clases">Clases</Link></li>
                            <li><Link to="/membresias">Membresías</Link></li>
                            <li><Link to="/ubicacion">Ubicación</Link></li>
                            <li><Link to="/ejercicios">Ejercicios</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Mi Cuenta</h3>
                        <ul>
                            <li><Link to="/mis-reservas">Mis Reservas</Link></li>
                            <li><Link to="/perfil">Mi Perfil</Link></li>
                            <li><Link to="/historial">Historial</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contáctanos</h3>
                        <div className="contact-info">
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Av. Principal 123, Lima, Perú</p>
                            <p><FontAwesomeIcon icon={faWhatsapp} /> +51 987 654 321</p>
                            <p><FontAwesomeIcon icon={faEnvelope} /> info@aresfitness.com</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 AresFitness. Tu journey fitness comienza aquí.</p>
                </div>
            </footer>
        </div>
    );
}

export default MisReservasPage;