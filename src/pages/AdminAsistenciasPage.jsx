import React, { useState, useEffect } from 'react';
import { listarAsistencias, registrarAsistencia } from '../services/asistenciaService';
import { listarUsuarios } from '../services/usuarioService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCheck,
    faHistory,
    faSearch,
    faCalendarAlt,
    faClock,
    faCheckCircle,
    faTimesCircle,
    faQrcode,
    faPlus,
    faFilter,
    faSync
} from '@fortawesome/free-solid-svg-icons';
import './css/AdminAsistenciasPage.css';

function AdminAsistenciasPage() {
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todas');
    const [idUsuarioRegistro, setIdUsuarioRegistro] = useState('');

    const cargarAsistencias = async () => {
        try {
            setLoading(true);
            // En una implementación real, necesitarías un endpoint para listar todas las asistencias
            const data = await listarTodasAsistencias();
            setAsistencias(data);
        } catch (error) {
            console.error("Error al cargar asistencias:", error);
            // Datos de ejemplo para desarrollo
            setAsistencias([
                {
                    id: 1,
                    usuarioNombre: 'Juan Pérez',
                    fecha: '2024-01-15',
                    horaEntrada: '08:30',
                    estado: 'ACTIVA',
                    claseNombre: 'Yoga Matutino'
                },
                {
                    id: 2,
                    usuarioNombre: 'María García',
                    fecha: '2024-01-15',
                    horaEntrada: '18:15',
                    estado: 'ACTIVA',
                    claseNombre: 'CrossFit'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarAsistencias();
    }, []);

    const handleRegistrarAsistencia = async () => {
        if (!idUsuarioRegistro) {
            alert('Por favor ingresa un ID de usuario');
            return;
        }

        try {
            await registrarAsistencia(parseInt(idUsuarioRegistro));
            alert('Asistencia registrada exitosamente');
            setIdUsuarioRegistro('');
            cargarAsistencias();
        } catch (error) {
            console.error("Error al registrar asistencia:", error);
            alert('Error al registrar asistencia');
        }
    };

    const asistenciasFiltradas = asistencias.filter(asistencia => {
        const coincideBusqueda = asistencia.usuarioNombre?.toLowerCase().includes(busqueda.toLowerCase());
        const coincideFecha = !filtroFecha || asistencia.fecha === filtroFecha;
        const coincideEstado = filtroEstado === 'todas' || asistencia.estado === filtroEstado;
        return coincideBusqueda && coincideFecha && coincideEstado;
    });

    if (loading) {
        return (
            <div className="admin-asistencias-loading">
                <div className="loading-spinner"></div>
                <p>Cargando asistencias...</p>
            </div>
        );
    }

    return (
        <div className="admin-asistencias-page">
            {/* Hero Section */}
            <section className="hero-asistencias">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>GESTIÓN DE ASISTENCIAS</h1>
                        <p>Control y registro de asistencia de clientes</p>
                    </div>
                </div>
            </section>

            {/* Estadísticas */}
            <section className="stats-asistencias">
                <div className="stats-container">
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faUserCheck} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{asistencias.length}</h3>
                            <p>Total Asistencias</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{asistencias.filter(a => a.estado === 'ACTIVA').length}</h3>
                            <p>Asistencias Activas</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faClock} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{new Set(asistencias.map(a => a.fecha)).size}</h3>
                            <p>Días Registrados</p>
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
                            placeholder="Buscar por nombre de usuario..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="herramientas-derecha">
                        <div className="filtro-buttons">
                            <button
                                className={`filtro-btn ${filtroEstado === 'todas' ? 'active' : ''}`}
                                onClick={() => setFiltroEstado('todas')}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                                Todas
                            </button>
                            <button
                                className={`filtro-btn ${filtroEstado === 'ACTIVA' ? 'active' : ''}`}
                                onClick={() => setFiltroEstado('ACTIVA')}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} />
                                Activas
                            </button>
                        </div>

                        <div className="acciones-buttons">
                            <button className="btn-recargar" onClick={cargarAsistencias}>
                                <FontAwesomeIcon icon={faSync} />
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Registro Rápido */}
                <div className="registro-rapido">
                    <h3>Registro Rápido de Asistencia</h3>
                    <div className="registro-form">
                        <input
                            type="number"
                            placeholder="ID del Usuario"
                            value={idUsuarioRegistro}
                            onChange={(e) => setIdUsuarioRegistro(e.target.value)}
                        />
                        <button className="btn-nuevo" onClick={handleRegistrarAsistencia}>
                            <FontAwesomeIcon icon={faPlus} />
                            Registrar Asistencia
                        </button>
                    </div>
                </div>
            </section>

            {/* Tabla de Asistencias */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>HISTORIAL DE ASISTENCIAS</h2>
                    <div className="title-line"></div>
                    <p>Registro completo de todas las asistencias</p>
                </div>

                <div className="tabla-container">
                    {asistenciasFiltradas.length > 0 ? (
                        <div className="tabla-responsive">
                            <table className="tabla-asistencias">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Fecha</th>
                                        <th>Hora de Entrada</th>
                                        <th>Clase</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {asistenciasFiltradas.map(asistencia => (
                                        <tr key={asistencia.id} className="fila-asistencia">
                                            <td className="celda-usuario">
                                                <div className="usuario-info">
                                                    <div className="usuario-nombre">
                                                        {asistencia.usuarioNombre}
                                                    </div>
                                                    <div className="usuario-id">
                                                        ID: {asistencia.usuarioId}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="celda-fecha">
                                                <div className="fecha-container">
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                    {asistencia.fecha}
                                                </div>
                                            </td>
                                            <td className="celda-hora">
                                                <div className="hora-container">
                                                    <FontAwesomeIcon icon={faClock} />
                                                    {asistencia.horaEntrada}
                                                </div>
                                            </td>
                                            <td className="celda-clase">
                                                {asistencia.claseNombre || 'Sin clase'}
                                            </td>
                                            <td className="celda-estado">
                                                <span
                                                    className="badge-estado"
                                                    style={{ 
                                                        backgroundColor: asistencia.estado === 'ACTIVA' ? '#28a745' : '#dc3545'
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={asistencia.estado === 'ACTIVA' ? faCheckCircle : faTimesCircle} />
                                                    {asistencia.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-resultados">
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                            <h3>No se encontraron asistencias</h3>
                            <p>No hay registros que coincidan con los filtros seleccionados</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminAsistenciasPage;