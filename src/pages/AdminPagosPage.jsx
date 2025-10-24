import React, { useState, useEffect } from 'react';
import { listarPagos, crearPago } from '../services/pagoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCreditCard,
    faSearch,
    faFilter,
    faCheckCircle,
    faClock,
    faTimesCircle,
    faMoneyBillWave,
    faSync,
    faEye,
    faDownload
} from '@fortawesome/free-solid-svg-icons';
import './css/AdminPagosPage.css';

function AdminPagosPage() {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');

    const cargarPagos = async () => {
        try {
            setLoading(true);
            // En una implementación real, necesitarías un endpoint para listar todos los pagos
            const data = await listarPagos();
            setPagos(data);
        } catch (error) {
            console.error("Error al cargar pagos:", error);
            // Datos de ejemplo para desarrollo
            setPagos([
                {
                    id: 1,
                    usuarioNombre: 'Juan Pérez',
                    monto: 149.90,
                    metodoPago: 'Tarjeta Visa',
                    estado: 'COMPLETADO',
                    fechaTransaccion: '2024-01-15 10:30:00',
                    descripcion: 'Membresía Premium Mensual'
                },
                {
                    id: 2,
                    usuarioNombre: 'María García',
                    monto: 299.90,
                    metodoPago: 'PayPal',
                    estado: 'PENDIENTE',
                    fechaTransaccion: '2024-01-15 14:20:00',
                    descripcion: 'Membresía VIP Trimestral'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPagos();
    }, []);

    const pagosFiltrados = pagos.filter(pago => {
        const coincideBusqueda = pago.usuarioNombre?.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEstado = filtroEstado === 'todos' || pago.estado === filtroEstado;
        return coincideBusqueda && coincideEstado;
    });

    const getEstadoIcono = (estado) => {
        switch (estado) {
            case 'COMPLETADO': return faCheckCircle;
            case 'PENDIENTE': return faClock;
            case 'RECHAZADO': return faTimesCircle;
            default: return faClock;
        }
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'COMPLETADO': return '#28a745';
            case 'PENDIENTE': return '#ffc107';
            case 'RECHAZADO': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const calcularIngresosTotales = () => {
        return pagos
            .filter(pago => pago.estado === 'COMPLETADO')
            .reduce((total, pago) => total + pago.monto, 0);
    };

    if (loading) {
        return (
            <div className="admin-pagos-loading">
                <div className="loading-spinner"></div>
                <p>Cargando pagos...</p>
            </div>
        );
    }

    return (
        <div className="admin-pagos-page">
            {/* Hero Section */}
            <section className="hero-pagos">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>GESTIÓN DE PAGOS</h1>
                        <p>Administración y seguimiento de transacciones</p>
                    </div>
                </div>
            </section>

            {/* Estadísticas */}
            <section className="stats-pagos">
                <div className="stats-container">
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCreditCard} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{pagos.length}</h3>
                            <p>Total Transacciones</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{pagos.filter(p => p.estado === 'COMPLETADO').length}</h3>
                            <p>Pagos Completados</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="stat-icon" />
                        <div className="stat-content">
                            <h3>${calcularIngresosTotales().toFixed(2)}</h3>
                            <p>Ingresos Totales</p>
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
                            placeholder="Buscar por usuario..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="herramientas-derecha">
                        <div className="filtro-buttons">
                            {['todos', 'COMPLETADO', 'PENDIENTE', 'RECHAZADO'].map(estado => (
                                <button
                                    key={estado}
                                    className={`filtro-btn ${filtroEstado === estado ? 'active' : ''}`}
                                    onClick={() => setFiltroEstado(estado)}
                                >
                                    <FontAwesomeIcon icon={faFilter} />
                                    {estado.charAt(0).toUpperCase() + estado.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="acciones-buttons">
                            <button className="btn-recargar" onClick={cargarPagos}>
                                <FontAwesomeIcon icon={faSync} />
                                Actualizar
                            </button>
                            <button className="btn-exportar">
                                <FontAwesomeIcon icon={faDownload} />
                                Exportar
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabla de Pagos */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>HISTORIAL DE PAGOS</h2>
                    <div className="title-line"></div>
                    <p>Registro completo de todas las transacciones</p>
                </div>

                <div className="tabla-container">
                    {pagosFiltrados.length > 0 ? (
                        <div className="tabla-responsive">
                            <table className="tabla-pagos">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Descripción</th>
                                        <th>Monto</th>
                                        <th>Método de Pago</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagosFiltrados.map(pago => (
                                        <tr key={pago.id} className="fila-pago">
                                            <td className="celda-usuario">
                                                <div className="usuario-info">
                                                    <div className="usuario-nombre">
                                                        {pago.usuarioNombre}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="celda-descripcion">
                                                {pago.descripcion}
                                            </td>
                                            <td className="celda-monto">
                                                <div className="monto-container">
                                                    <FontAwesomeIcon icon={faMoneyBillWave} />
                                                    ${pago.monto.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="celda-metodo">
                                                <span className="badge-metodo">
                                                    {pago.metodoPago}
                                                </span>
                                            </td>
                                            <td className="celda-estado">
                                                <span
                                                    className="badge-estado"
                                                    style={{ backgroundColor: getEstadoColor(pago.estado) }}
                                                >
                                                    <FontAwesomeIcon icon={getEstadoIcono(pago.estado)} />
                                                    {pago.estado}
                                                </span>
                                            </td>
                                            <td className="celda-fecha">
                                                {new Date(pago.fechaTransaccion).toLocaleDateString()}
                                            </td>
                                            <td className="celda-acciones">
                                                <button className="btn-accion btn-detalles">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-resultados">
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                            <h3>No se encontraron pagos</h3>
                            <p>No hay transacciones que coincidan con los filtros seleccionados</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminPagosPage;