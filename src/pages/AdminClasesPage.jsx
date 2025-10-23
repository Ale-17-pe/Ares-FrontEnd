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
    faStopwatch, 
    faPhone,
    faTimes // Agregar este icono que falta
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './AdminClasesPage.css';
import logo from '../assets/Imagenes/logo.png'; // Agregar import del logo

function AdminClasesPage() {
    const [clases, setClases] = useState([]);
    const [claseActual, setClaseActual] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todas');
    const [orden, setOrden] = useState({ campo: 'nombreClase', direccion: 'asc' });
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [claseSeleccionada, setClaseSeleccionada] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(8);
    const [estadisticas, setEstadisticas] = useState({
        totalClases: 0,
        clasesActivas: 0,
        totalInscritos: 0,
        ocupacionPromedio: 0,
        tiposClase: 0
    });

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
        },
        {
            id: 7,
            nombreClase: 'Functional Training',
            instructorId: 107,
            instructor: 'Miguel Ángel',
            capacidadMaxima: 16,
            duracion: 50,
            nivel: 'Intermedio',
            tipo: 'CrossFit',
            horarios: ['Lunes 08:00', 'Miércoles 08:00', 'Viernes 08:00'],
            inscritosActuales: 12,
            estado: 'ACTIVA'
        },
        {
            id: 8,
            nombreClase: 'Yoga Avanzado',
            instructorId: 108,
            instructor: 'Carmen Ruiz',
            capacidadMaxima: 18,
            duracion: 75,
            nivel: 'Avanzado',
            tipo: 'Yoga',
            horarios: ['Martes 19:00', 'Jueves 19:00'],
            inscritosActuales: 14,
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

    // Calcular estadísticas en tiempo real
    useEffect(() => {
        const nuevasEstadisticas = {
            totalClases: clases.length,
            clasesActivas: clases.filter(c => c.estado === 'ACTIVA').length,
            totalInscritos: clases.reduce((total, clase) => total + clase.inscritosActuales, 0),
            ocupacionPromedio: clases.length > 0 ?
                clases.reduce((total, clase) => total + calcularOcupacion(clase.inscritosActuales, clase.capacidadMaxima), 0) / clases.length : 0,
            tiposClase: new Set(clases.map(c => c.tipo)).size
        };
        setEstadisticas(nuevasEstadisticas);
    }, [clases]);

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
        setError('');
    };

    const handleEditarClick = (clase) => {
        setClaseActual({ ...clase });
        setFormVisible(true);
        setError('');
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

    const suspenderClase = async (id) => {
        try {
            const clase = clases.find(c => c.id === id);
            await actualizarClase(id, { ...clase, estado: 'SUSPENDIDA' });
            cargarClases();
        } catch (err) {
            setError('Error al suspender la clase');
        }
    };

    const activarClase = async (id) => {
        try {
            const clase = clases.find(c => c.id === id);
            await actualizarClase(id, { ...clase, estado: 'ACTIVA' });
            cargarClases();
        } catch (err) {
            setError('Error al activar la clase');
        }
    };

    const abrirDetalles = (clase) => {
        setClaseSeleccionada(clase);
        setMostrarDetalles(true);
    };

    const cerrarDetalles = () => {
        setMostrarDetalles(false);
        setClaseSeleccionada(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setClaseActual({ ...claseActual, [name]: value });
    };

    // Función para manejar horarios
    const handleHorariosChange = (e) => {
        const horarios = e.target.value.split(',').map(h => h.trim()).filter(h => h);
        setClaseActual({ ...claseActual, horarios });
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

    // Función para exportar datos
    const exportarClases = () => {
        const fecha = new Date().toISOString().split('T')[0];
        const nombreArchivo = `clases-aresfitness-${fecha}.csv`;

        const headers = ['Nombre', 'Instructor', 'Tipo', 'Nivel', 'Capacidad', 'Inscritos', 'Estado', 'Horarios'];
        const filas = clasesFiltradas.map(clase => [
            clase.nombreClase,
            clase.instructor,
            clase.tipo,
            clase.nivel,
            clase.capacidadMaxima,
            clase.inscritosActuales,
            clase.estado,
            clase.horarios.join('; ')
        ]);

        const contenidoCSV = [headers, ...filas]
            .map(fila => fila.map(campo => `"${campo}"`).join(','))
            .join('\n');

        const blob = new Blob([contenidoCSV], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo;
        link.click();
        window.URL.revokeObjectURL(url);
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

    // Paginación
    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const clasesPaginadas = clasesFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(clasesFiltradas.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
        // Scroll to top cuando cambia de página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

    // Generar array de páginas para la paginación
    const generarNumerosPagina = () => {
        const paginas = [];
        const paginasAMostrar = 5;
        let inicio = Math.max(1, paginaActual - Math.floor(paginasAMostrar / 2));
        let fin = Math.min(totalPaginas, inicio + paginasAMostrar - 1);
        
        if (fin - inicio + 1 < paginasAMostrar) {
            inicio = Math.max(1, fin - paginasAMostrar + 1);
        }
        
        for (let i = inicio; i <= fin; i++) {
            paginas.push(i);
        }
        return paginas;
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
                        <div className="stat-icon-container">
                            <FontAwesomeIcon icon={faChalkboardTeacher} className="stat-icon" />
                        </div>
                        <div className="stat-content">
                            <h3>{estadisticas.totalClases}</h3>
                            <p>Total de Clases</p>
                            <span className="stat-trend">
                                {clases.length > 0 ? '+5%' : '0%'} este mes
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-container">
                            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        </div>
                        <div className="stat-content">
                            <h3>{estadisticas.totalInscritos}</h3>
                            <p>Total Inscritos</p>
                            <span className="stat-trend positivo">
                                +{Math.round(estadisticas.totalInscritos / Math.max(estadisticas.totalClases, 1))} por clase
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-container">
                            <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
                        </div>
                        <div className="stat-content">
                            <h3>{estadisticas.clasesActivas}</h3>
                            <p>Clases Activas</p>
                            <span className="stat-trend positivo">
                                {estadisticas.totalClases > 0 ?
                                    Math.round((estadisticas.clasesActivas / estadisticas.totalClases) * 100) + '%' : '0%'
                                }
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-container">
                            <FontAwesomeIcon icon={faChartLine} className="stat-icon" />
                        </div>
                        <div className="stat-content">
                            <h3>{Math.round(estadisticas.ocupacionPromedio)}%</h3>
                            <p>Ocupación Promedio</p>
                            <span className="stat-trend">
                                {estadisticas.ocupacionPromedio > 80 ? 'Alta' :
                                    estadisticas.ocupacionPromedio > 60 ? 'Media' : 'Baja'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Barra de Herramientas */}
            <section className="herramientas-section">
                <div className="herramientas-container">
                    <div className="search-container">
                        <div className="search-bar">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, instructor o tipo..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="search-input"
                            />
                            {busqueda && (
                                <button
                                    className="clear-search"
                                    onClick={() => setBusqueda('')}
                                    title="Limpiar búsqueda"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="search-results">
                            {busqueda && (
                                <span>{clasesFiltradas.length} clases encontradas</span>
                            )}
                        </div>
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
                            <button className="btn-exportar" onClick={exportarClases}>
                                <FontAwesomeIcon icon={faFileExport} />
                                Exportar
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
                <div className="section-header">
                    <div className="section-title">
                        <h2>LISTA DE CLASES</h2>
                        <div className="title-line"></div>
                        <p>Gestiona todas las clases y su disponibilidad</p>
                    </div>
                    <div className="table-controls">
                        <span className="table-info">
                            Mostrando {clasesPaginadas.length} de {clasesFiltradas.length} clases
                        </span>
                        {orden.campo && (
                            <span className="sort-info">
                                Ordenado por {orden.campo} ({orden.direccion})
                            </span>
                        )}
                    </div>
                </div>

                <div className="tabla-container">
                    {clasesFiltradas.length > 0 ? (
                        <>
                            <div className="tabla-responsive">
                                <table className="tabla-clases">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleOrdenar('nombreClase')}>
                                                <span>
                                                    Clase
                                                    <FontAwesomeIcon icon={getIconoOrden('nombreClase')} />
                                                </span>
                                            </th>
                                            <th onClick={() => handleOrdenar('instructor')}>
                                                <span>
                                                    Instructor
                                                    <FontAwesomeIcon icon={getIconoOrden('instructor')} />
                                                </span>
                                            </th>
                                            <th onClick={() => handleOrdenar('tipo')}>
                                                <span>
                                                    Tipo
                                                    <FontAwesomeIcon icon={getIconoOrden('tipo')} />
                                                </span>
                                            </th>
                                            <th onClick={() => handleOrdenar('nivel')}>
                                                <span>
                                                    Nivel
                                                    <FontAwesomeIcon icon={getIconoOrden('nivel')} />
                                                </span>
                                            </th>
                                            <th>Capacidad</th>
                                            <th>Horarios</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clasesPaginadas.map(clase => {
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
                                                                className="btn-accion btn-detalles"
                                                                onClick={() => abrirDetalles(clase)}
                                                                title="Ver detalles"
                                                            >
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </button>
                                                            <button
                                                                className="btn-accion btn-editar"
                                                                onClick={() => handleEditarClick(clase)}
                                                                title="Editar clase"
                                                            >
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </button>
                                                            {clase.estado === 'ACTIVA' ? (
                                                                <button
                                                                    className="btn-accion btn-suspender"
                                                                    onClick={() => suspenderClase(clase.id)}
                                                                    title="Suspender clase"
                                                                >
                                                                    <FontAwesomeIcon icon={faPauseCircle} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="btn-accion btn-activar"
                                                                    onClick={() => activarClase(clase.id)}
                                                                    title="Activar clase"
                                                                >
                                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                                </button>
                                                            )}
                                                            <button
                                                                className="btn-accion btn-eliminar"
                                                                onClick={() => handleEliminarClick(clase.id)}
                                                                title="Eliminar clase"
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación */}
                            {totalPaginas > 1 && (
                                <div className="paginacion">
                                    <div className="paginacion-info">
                                        Página {paginaActual} de {totalPaginas} - {clasesFiltradas.length} clases
                                    </div>
                                    <div className="paginacion-controles">
                                        <button
                                            onClick={() => cambiarPagina(1)}
                                            disabled={paginaActual === 1}
                                            className="btn-paginacion"
                                            title="Primera página"
                                        >
                                            «
                                        </button>
                                        <button
                                            onClick={() => cambiarPagina(paginaActual - 1)}
                                            disabled={paginaActual === 1}
                                            className="btn-paginacion"
                                            title="Página anterior"
                                        >
                                            ‹
                                        </button>
                                        
                                        {generarNumerosPagina().map(numero => (
                                            <button
                                                key={numero}
                                                onClick={() => cambiarPagina(numero)}
                                                className={`btn-paginacion ${paginaActual === numero ? 'active' : ''}`}
                                            >
                                                {numero}
                                            </button>
                                        ))}
                                        
                                        <button
                                            onClick={() => cambiarPagina(paginaActual + 1)}
                                            disabled={paginaActual === totalPaginas}
                                            className="btn-paginacion"
                                            title="Página siguiente"
                                        >
                                            ›
                                        </button>
                                        <button
                                            onClick={() => cambiarPagina(totalPaginas)}
                                            disabled={paginaActual === totalPaginas}
                                            className="btn-paginacion"
                                            title="Última página"
                                        >
                                            »
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-resultados">
                            <div className="no-result-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <h3>No se encontraron clases</h3>
                            <p>
                                {busqueda ?
                                    `No hay clases que coincidan con "${busqueda}"` :
                                    'No hay clases que coincidan con los filtros seleccionados'
                                }
                            </p>
                            {(busqueda || filtroActivo !== 'todas') && (
                                <button
                                    className="btn-limpiar-filtros"
                                    onClick={() => {
                                        setBusqueda('');
                                        setFiltroActivo('todas');
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFilter} />
                                    Limpiar filtros
                                </button>
                            )}
                            <button className="btn-nuevo" onClick={handleCrearClick}>
                                <FontAwesomeIcon icon={faPlus} />
                                Crear Primera Clase
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal de Formulario */}
            {isFormVisible && (
                <div className="modal-overlay" onClick={() => setFormVisible(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{claseActual.id ? 'Editar Clase' : 'Crear Nueva Clase'}</h2>
                            <button className="btn-cerrar-modal" onClick={() => setFormVisible(false)}>
                                ✕
                            </button>
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

                                    <div className="form-group full-width">
                                        <label>Horarios (separados por coma)</label>
                                        <input
                                            name="horarios"
                                            value={claseActual.horarios.join(', ')}
                                            onChange={handleHorariosChange}
                                            placeholder="Ej: Lunes 07:00, Miércoles 07:00, Viernes 07:00"
                                        />
                                        <small>Separa cada horario con una coma</small>
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

            {/* Modal de Detalles */}
            {mostrarDetalles && claseSeleccionada && (
                <div className="modal-overlay" onClick={cerrarDetalles}>
                    <div className="modal-content modal-detalles" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">
                                <FontAwesomeIcon 
                                    icon={getTipoIcono(claseSeleccionada.tipo)} 
                                    className="modal-icon" 
                                />
                                <div>
                                    <h2>{claseSeleccionada.nombreClase}</h2>
                                    <p>Detalles completos de la clase</p>
                                </div>
                            </div>
                            <div className="modal-header-actions">
                                <span 
                                    className="badge-estado"
                                    style={{ backgroundColor: getEstadoColor(claseSeleccionada.estado) }}
                                >
                                    {claseSeleccionada.estado}
                                </span>
                                <button className="btn-cerrar-modal" onClick={cerrarDetalles}>
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="detalles-grid">
                                <div className="detalle-seccion">
                                    <h3>Información General</h3>
                                    <div className="detalle-item">
                                        <label>Instructor:</label>
                                        <span>{claseSeleccionada.instructor} (ID: {claseSeleccionada.instructorId})</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Tipo:</label>
                                        <span className="badge-tipo">{claseSeleccionada.tipo}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Nivel:</label>
                                        <span 
                                            className="badge-nivel"
                                            style={{ backgroundColor: getNivelColor(claseSeleccionada.nivel) }}
                                        >
                                            {claseSeleccionada.nivel}
                                        </span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Duración:</label>
                                        <span>{claseSeleccionada.duracion} minutos</span>
                                    </div>
                                </div>

                                <div className="detalle-seccion">
                                    <h3>Capacidad e Inscripciones</h3>
                                    <div className="detalle-item">
                                        <label>Capacidad Máxima:</label>
                                        <span>{claseSeleccionada.capacidadMaxima} personas</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Inscritos Actuales:</label>
                                        <span>{claseSeleccionada.inscritosActuales} personas</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Disponibilidad:</label>
                                        <span>{claseSeleccionada.capacidadMaxima - claseSeleccionada.inscritosActuales} cupos libres</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Ocupación:</label>
                                        <span>{calcularOcupacion(claseSeleccionada.inscritosActuales, claseSeleccionada.capacidadMaxima).toFixed(1)}%</span>
                                    </div>
                                </div>

                                <div className="detalle-seccion full-width">
                                    <h3>Horarios</h3>
                                    <div className="horarios-detalle">
                                        {claseSeleccionada.horarios.map((horario, index) => (
                                            <div key={index} className="horario-detalle-item">
                                                <FontAwesomeIcon icon={faClock} />
                                                <span>{horario}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button 
                                    className="btn-primary"
                                    onClick={() => {
                                        cerrarDetalles();
                                        handleEditarClick(claseSeleccionada);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                    Editar Clase
                                </button>
                                <button 
                                    className="btn-secondary"
                                    onClick={cerrarDetalles}
                                >
                                    Cerrar
                                </button>
                            </div>
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
                                <img src={logo} alt="Logo AresFitness" />
                            </Link>
                        </div>
                        <p>Transformando vidas a través del fitness desde 2020</p>
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