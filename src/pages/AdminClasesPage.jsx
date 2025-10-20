import React, { useState, useEffect } from 'react';
import { listarClases, crearClase, actualizarClase, eliminarClase } from '../services/reservaService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faSearch,
    faFilter,
    faEdit,
    faTrash,
    faEye,
    faEnvelope,
    faCalendarAlt,
    faClock,
    faSync,
    faPlus,
    faSort,
    faSortUp,
    faSortDown,
    faIdCard,
    faUsers,
    faChalkboardTeacher,
    faExclamationTriangle,
    faCheckCircle,
    faPauseCircle,
    faHistory,
    faChartLine,
    faFileExport,
    faDumbbell,
    faMusic,
    faHeart,
    faBicycle,
    faStopwatch, faPhone
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './AdminClasesPage.css';

function AdminClasesPage() {
    const [clases, setClases] = useState([]);
    const [claseActual, setClaseActual] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todas');
    const [orden, setOrden] = useState({ campo: 'nombreClase', direccion: 'asc' });

    // Datos de ejemplo como fallback
    const clasesEjemplo = [
        {
            id: 1,
            nombreClase: 'Yoga Matutino',
            instructorId: 101,
            instructor: 'Ana García',
            capacidadMaxima: 20,
            duracion: 60,
            nivel: 'Principiante',
            tipo: 'Yoga',
            horarios: ['Lunes 07:00', 'Miércoles 07:00', 'Viernes 07:00'],
            inscritosActuales: 15,
            estado: 'ACTIVA'
        },
        {
            id: 2,
            nombreClase: 'CrossFit Avanzado',
            instructorId: 102,
            instructor: 'Carlos López',
            capacidadMaxima: 15,
            duracion: 45,
            nivel: 'Avanzado',
            tipo: 'CrossFit',
            horarios: ['Martes 18:00', 'Jueves 18:00', 'Sábado 10:00'],
            inscritosActuales: 14,
            estado: 'ACTIVA'
        },
        {
            id: 3,
            nombreClase: 'Pilates Intermedio',
            instructorId: 103,
            instructor: 'María Rodríguez',
            capacidadMaxima: 12,
            duracion: 50,
            nivel: 'Intermedio',
            tipo: 'Pilates',
            horarios: ['Lunes 17:00', 'Miércoles 17:00'],
            inscritosActuales: 10,
            estado: 'ACTIVA'
        },
        {
            id: 4,
            nombreClase: 'Spinning Intenso',
            instructorId: 104,
            instructor: 'Pedro Martínez',
            capacidadMaxima: 25,
            duracion: 45,
            nivel: 'Todos los niveles',
            tipo: 'Spinning',
            horarios: ['Lunes 19:00', 'Martes 19:00', 'Jueves 19:00'],
            inscritosActuales: 22,
            estado: 'ACTIVA'
        },
        {
            id: 5,
            nombreClase: 'Zumba Fitness',
            instructorId: 105,
            instructor: 'Laura Hernández',
            capacidadMaxima: 30,
            duracion: 55,
            nivel: 'Principiante',
            tipo: 'Baile',
            horarios: ['Viernes 18:00', 'Sábado 11:00'],
            inscritosActuales: 25,
            estado: 'SUSPENDIDA'
        },
        {
            id: 6,
            nombreClase: 'Boxeo Training',
            instructorId: 106,
            instructor: 'Roberto Silva',
            capacidadMaxima: 18,
            duracion: 60,
            nivel: 'Intermedio',
            tipo: 'Boxeo',
            horarios: ['Martes 20:00', 'Jueves 20:00'],
            inscritosActuales: 16,
            estado: 'ACTIVA'
        }
    ];

    // Función para cargar todas las clases desde el backend
    const cargarClases = async () => {
        try {
            setLoading(true);
            const data = await listarClases();
            if (data && data.length > 0) {
                // Formatear los datos de la API
                const clasesFormateadas = data.map(clase => ({
                    id: clase.id,
                    nombreClase: clase.nombreClase,
                    instructorId: clase.instructorId,
                    instructor: clase.instructor || `Instructor ${clase.instructorId}`,
                    capacidadMaxima: clase.capacidadMaxima,
                    duracion: clase.duracion || 60,
                    nivel: clase.nivel || 'Principiante',
                    tipo: clase.tipo || 'General',
                    horarios: clase.horarios || ['Por definir'],
                    inscritosActuales: clase.inscritosActuales || 0,
                    estado: clase.estado || 'ACTIVA'
                }));
                setClases(clasesFormateadas);
            } else {
                setClases(clasesEjemplo);
            }
        } catch (error) {
            console.error("Error al cargar clases:", error);
            setClases(clasesEjemplo);
        } finally {
            setLoading(false);
        }
    };

    // Carga las clases cuando el componente se monta por primera vez
    useEffect(() => {
        cargarClases();
    }, []);

    const handleCrearClick = () => {
        setClaseActual({
            nombreClase: '',
            instructorId: '',
            instructor: '',
            capacidadMaxima: '',
            duracion: 60,
            nivel: 'Principiante',
            tipo: 'General',
            horarios: [],
            estado: 'ACTIVA'
        });
        setFormVisible(true);
    };

    const handleEditarClick = (clase) => {
        setClaseActual({ ...clase });
        setFormVisible(true);
    };

    const handleEliminarClick = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta clase? Se eliminarán también todas las reservas asociadas.')) {
            try {
                await eliminarClase(id);
                cargarClases();
            } catch (err) {
                setError('Error al eliminar la clase.');
                console.error(err);
            }
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setClaseActual({ ...claseActual, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (claseActual.id) {
                await actualizarClase(claseActual.id, claseActual);
            } else {
                await crearClase(claseActual);
            }
            setFormVisible(false);
            setClaseActual(null);
            cargarClases();
        } catch (err) {
            setError('Error al guardar la clase.');
            console.error(err);
        }
    };

    // Filtrar y ordenar clases
    const clasesFiltradas = clases
        .filter(clase => {
            const coincideBusqueda =
                clase.nombreClase.toLowerCase().includes(busqueda.toLowerCase()) ||
                clase.instructor.toLowerCase().includes(busqueda.toLowerCase()) ||
                clase.tipo.toLowerCase().includes(busqueda.toLowerCase());

            const coincideFiltro = filtroActivo === 'todas' ||
                (filtroActivo === 'activas' && clase.estado === 'ACTIVA') ||
                (filtroActivo === 'suspendidas' && clase.estado === 'SUSPENDIDA') ||
                (filtroActivo === 'llenas' && clase.inscritosActuales >= clase.capacidadMaxima) ||
                (filtroActivo === 'disponibles' && clase.inscritosActuales < clase.capacidadMaxima);

            return coincideBusqueda && coincideFiltro;
        })
        .sort((a, b) => {
            const campo = orden.campo;
            let valorA = a[campo];
            let valorB = b[campo];

            if (orden.direccion === 'asc') {
                return valorA.toString().localeCompare(valorB.toString());
            } else {
                return valorB.toString().localeCompare(valorA.toString());
            }
        });

    const handleOrdenar = (campo) => {
        setOrden(prev => ({
            campo,
            direccion: prev.campo === campo && prev.direccion === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getIconoOrden = (campo) => {
        if (orden.campo !== campo) return faSort;
        return orden.direccion === 'asc' ? faSortUp : faSortDown;
    };

    const getTipoIcono = (tipo) => {
        const iconos = {
            'Yoga': faHeart,
            'CrossFit': faDumbbell,
            'Pilates': faRunning,
            'Spinning': faBicycle,
            'Baile': faMusic,
            'Boxeo': faStopwatch,
            'General': faUsers
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

    const getEstadoColor = (estado) => {
        const colores = {
            'ACTIVA': '#28a745',
            'SUSPENDIDA': '#dc3545',
            'CANCELADA': '#6c757d'
        };
        return colores[estado] || '#6c757d';
    };

    const calcularOcupacion = (inscritos, capacidad) => {
        return (inscritos / capacidad) * 100;
    };

    const recargarClases = async () => {
        await cargarClases();
    };

    if (loading) {
        return (
            <div className="admin-clases-loading">
                <div className="loading-spinner"></div>
                <p>Cargando clases...</p>
            </div>
        );
    }

    return (
        <div className="admin-clases-page">

            {/* Hero Section */}
            <section className="hero-clases">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>GESTIÓN DE CLASES</h1>
                        <p>Administra y organiza todas las clases disponibles en AresFitness</p>
                    </div>
                </div>
            </section>

            {/* Estadísticas Rápidas */}
            <section className="stats-clases">
                <div className="stats-container">
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{clases.length}</h3>
                            <p>Total de Clases</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{clases.reduce((total, clase) => total + clase.inscritosActuales, 0)}</h3>
                            <p>Total Inscritos</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{clases.filter(c => c.estado === 'ACTIVA').length}</h3>
                            <p>Clases Activas</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faDumbbell} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{new Set(clases.map(c => c.tipo)).size}</h3>
                            <p>Tipos de Clase</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Barra de Herramientas */}
            <section className="herramientas-section">
                <div className="herramientas-container">
                    <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, instructor o tipo..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="herramientas-derecha">
                        <div className="filtro-buttons">
                            {[
                                { id: 'todas', label: 'Todas', icon: faFilter },
                                { id: 'activas', label: 'Activas', icon: faCheckCircle },
                                { id: 'suspendidas', label: 'Suspendidas', icon: faPauseCircle },
                                { id: 'llenas', label: 'Llenas', icon: faExclamationTriangle },
                                { id: 'disponibles', label: 'Disponibles', icon: faUsers }
                            ].map(filtro => (
                                <button
                                    key={filtro.id}
                                    className={`filtro-btn ${filtroActivo === filtro.id ? 'active' : ''}`}
                                    onClick={() => setFiltroActivo(filtro.id)}
                                >
                                    <FontAwesomeIcon icon={filtro.icon} />
                                    {filtro.label}
                                </button>
                            ))}
                        </div>

                        <div className="acciones-buttons">
                            <button className="btn-recargar" onClick={recargarClases}>
                                <FontAwesomeIcon icon={faSync} />
                                Actualizar
                            </button>
                            <button className="btn-nuevo" onClick={handleCrearClick}>
                                <FontAwesomeIcon icon={faPlus} />
                                Nueva Clase
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabla de Clases */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>LISTA DE CLASES</h2>
                    <div className="title-line"></div>
                    <p>Gestiona todas las clases y su disponibilidad</p>
                </div>

                <div className="tabla-container">
                    {clasesFiltradas.length > 0 ? (
                        <div className="tabla-responsive">
                            <table className="tabla-clases">
                                <thead>
                                <tr>
                                    <th onClick={() => handleOrdenar('nombreClase')}>
                                        <span>Clase</span>
                                        <FontAwesomeIcon icon={getIconoOrden('nombreClase')} />
                                    </th>
                                    <th onClick={() => handleOrdenar('instructor')}>
                                        <span>Instructor</span>
                                        <FontAwesomeIcon icon={getIconoOrden('instructor')} />
                                    </th>
                                    <th onClick={() => handleOrdenar('tipo')}>
                                        <span>Tipo</span>
                                        <FontAwesomeIcon icon={getIconoOrden('tipo')} />
                                    </th>
                                    <th onClick={() => handleOrdenar('nivel')}>
                                        <span>Nivel</span>
                                        <FontAwesomeIcon icon={getIconoOrden('nivel')} />
                                    </th>
                                    <th>Capacidad</th>
                                    <th>Horarios</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {clasesFiltradas.map(clase => {
                                    const porcentajeOcupacion = calcularOcupacion(clase.inscritosActuales, clase.capacidadMaxima);
                                    return (
                                        <tr key={clase.id} className="fila-clase">
                                            <td className="celda-clase">
                                                <div className="info-clase">
                                                    <FontAwesomeIcon
                                                        icon={getTipoIcono(clase.tipo)}
                                                        className="clase-icon"
                                                    />
                                                    <div>
                                                        <div className="nombre-clase">
                                                            {clase.nombreClase}
                                                        </div>
                                                        <div className="clase-duracion">
                                                            {clase.duracion} min
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="celda-instructor">
                                                <div className="info-instructor">
                                                    <div className="instructor-nombre">
                                                        {clase.instructor}
                                                    </div>
                                                    <div className="instructor-id">
                                                        ID: {clase.instructorId}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="celda-tipo">
                                                    <span className="badge-tipo">
                                                        {clase.tipo}
                                                    </span>
                                            </td>
                                            <td className="celda-nivel">
                                                    <span
                                                        className="badge-nivel"
                                                        style={{ backgroundColor: getNivelColor(clase.nivel) }}
                                                    >
                                                        {clase.nivel}
                                                    </span>
                                            </td>
                                            <td className="celda-capacidad">
                                                <div className="capacidad-info">
                                                    <div className="capacidad-texto">
                                                        {clase.inscritosActuales} / {clase.capacidadMaxima}
                                                    </div>
                                                    <div className="capacidad-bar">
                                                        <div
                                                            className="capacidad-fill"
                                                            style={{
                                                                width: `${porcentajeOcupacion}%`,
                                                                backgroundColor: porcentajeOcupacion >= 90 ? '#dc3545' :
                                                                    porcentajeOcupacion >= 70 ? '#ffc107' : '#28a745'
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="capacidad-porcentaje">
                                                        {porcentajeOcupacion.toFixed(0)}%
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="celda-horarios">
                                                <div className="horarios-list">
                                                    {clase.horarios.slice(0, 2).map((horario, index) => (
                                                        <div key={index} className="horario-item">
                                                            <FontAwesomeIcon icon={faClock} />
                                                            {horario}
                                                        </div>
                                                    ))}
                                                    {clase.horarios.length > 2 && (
                                                        <div className="mas-horarios">
                                                            +{clase.horarios.length - 2} más
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="celda-estado">
                                                    <span
                                                        className="badge-estado"
                                                        style={{ backgroundColor: getEstadoColor(clase.estado) }}
                                                    >
                                                        {clase.estado}
                                                    </span>
                                            </td>
                                            <td className="celda-acciones">
                                                <div className="acciones-grid">
                                                    <button
                                                        className="btn-accion btn-editar"
                                                        onClick={() => handleEditarClick(clase)}
                                                        title="Editar clase"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        className="btn-accion btn-eliminar"
                                                        onClick={() => handleEliminarClick(clase.id)}
                                                        title="Eliminar clase"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    <button
                                                        className="btn-accion btn-detalles"
                                                        title="Ver detalles"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-resultados">
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                            <h3>No se encontraron clases</h3>
                            <p>Intenta con otros términos de búsqueda o selecciona otro filtro</p>
                            <button className="btn-nuevo" onClick={handleCrearClick}>
                                <FontAwesomeIcon icon={faPlus} />
                                Crear Primera Clase
                            </button>
                        </div>
                    )}
                </div>

                {/* Resumen */}
                <div className="resumen-tabla">
                    <p>
                        Mostrando <strong>{clasesFiltradas.length}</strong> de <strong>{clases.length}</strong> clases
                        {filtroActivo !== 'todas' && ` (Filtro: ${filtroActivo})`}
                    </p>
                </div>
            </section>

            {/* Modal de Formulario */}
            {isFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setFormVisible(false)}>×</button>

                        <div className="modal-header">
                            <FontAwesomeIcon icon={faChalkboardTeacher} className="modal-icon" />
                            <div className="modal-title">
                                <h2>{claseActual.id ? 'Editar Clase' : 'Crear Nueva Clase'}</h2>
                                <p>{claseActual.id ? 'Modifica los detalles de la clase' : 'Completa la información para crear una nueva clase'}</p>
                            </div>
                        </div>

                        <div className="modal-body">
                            {error && <div className="error-message">{error}</div>}

                            <form onSubmit={handleFormSubmit} className="clase-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nombre de la Clase *</label>
                                        <input
                                            name="nombreClase"
                                            value={claseActual.nombreClase}
                                            onChange={handleFormChange}
                                            placeholder="Ej: Yoga Matutino"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>ID del Instructor *</label>
                                        <input
                                            name="instructorId"
                                            type="number"
                                            value={claseActual.instructorId}
                                            onChange={handleFormChange}
                                            placeholder="Ej: 101"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nombre del Instructor</label>
                                        <input
                                            name="instructor"
                                            value={claseActual.instructor}
                                            onChange={handleFormChange}
                                            placeholder="Ej: Ana García"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Capacidad Máxima *</label>
                                        <input
                                            name="capacidadMaxima"
                                            type="number"
                                            value={claseActual.capacidadMaxima}
                                            onChange={handleFormChange}
                                            placeholder="Ej: 20"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Duración (minutos)</label>
                                        <input
                                            name="duracion"
                                            type="number"
                                            value={claseActual.duracion}
                                            onChange={handleFormChange}
                                            placeholder="Ej: 60"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nivel</label>
                                        <select
                                            name="nivel"
                                            value={claseActual.nivel}
                                            onChange={handleFormChange}
                                        >
                                            <option value="Principiante">Principiante</option>
                                            <option value="Intermedio">Intermedio</option>
                                            <option value="Avanzado">Avanzado</option>
                                            <option value="Todos los niveles">Todos los niveles</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Tipo de Clase</label>
                                        <select
                                            name="tipo"
                                            value={claseActual.tipo}
                                            onChange={handleFormChange}
                                        >
                                            <option value="Yoga">Yoga</option>
                                            <option value="CrossFit">CrossFit</option>
                                            <option value="Pilates">Pilates</option>
                                            <option value="Spinning">Spinning</option>
                                            <option value="Baile">Baile</option>
                                            <option value="Boxeo">Boxeo</option>
                                            <option value="General">General</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Estado</label>
                                        <select
                                            name="estado"
                                            value={claseActual.estado}
                                            onChange={handleFormChange}
                                        >
                                            <option value="ACTIVA">Activa</option>
                                            <option value="SUSPENDIDA">Suspendida</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button type="submit" className="btn-primary">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        {claseActual.id ? 'Actualizar Clase' : 'Crear Clase'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setFormVisible(false)}
                                    >
                                        <FontAwesomeIcon icon={faTimes} /> Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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
                            <li><Link to="/admin">Dashboard</Link></li>
                            <li><Link to="/admin/usuarios">Clientes</Link></li>
                            <li><Link to="/admin/planes">Planes</Link></li>
                            <li><Link to="/admin/suscripciones">Suscripciones</Link></li>
                            <li><Link to="/admin/clases">Clases</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contáctanos</h3>
                        <div className="contact-info">
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Av. Principal 123, Lima, Perú</p>
                            <p><FontAwesomeIcon icon={faPhone} /> (01) 123-4567</p>
                            <p><FontAwesomeIcon icon={faEnvelope} /> info@aresfitness.com</p>
                            <p><FontAwesomeIcon icon={faWhatsapp} /> +51 987 654 321</p>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Horario de atención</h3>
                        <p>Lunes a Viernes: 5:00 am - 11:00 pm</p>
                        <p>Sábados: 6:00 am - 10:00 pm</p>
                        <p>Domingos: 7:00 am - 9:00 pm</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 AresFitness. Gestión de Clases v2.0</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminClasesPage;