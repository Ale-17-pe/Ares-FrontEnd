import React, { useState, useEffect } from 'react';
import { listarSuscripciones } from '../services/membresiaService';
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
    faReceipt,
    faExclamationTriangle,
    faCheckCircle,
    faPauseCircle,
    faHistory,
    faChartLine,
    faFileExport,
    faPhone,
    faCreditCard,
    faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './AdminSuscripcionesPage.css';

function AdminSuscripcionesPage() {
    const [suscripciones, setSuscripciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todas');
    const [orden, setOrden] = useState({ campo: 'fechaInicio', direccion: 'desc' });
    const [suscripcionSeleccionada, setSuscripcionSeleccionada] = useState(null);

    // Datos de ejemplo como fallback
    const suscripcionesEjemplo = [
        {
            id: 1,
            usuarioId: 101,
            usuario: {
                nombre: 'Juan Pérez',
                email: 'juan.perez@email.com',
                telefono: '+51 987 654 321'
            },
            plan: {
                nombrePlan: 'PREMIUM',
                precio: 149.90,
                duracion: '1 mes'
            },
            fechaInicio: '2024-11-01',
            fechaFin: '2024-12-01',
            estado: 'ACTIVA',
            proximoPago: '2024-12-01',
            metodoPago: 'Tarjeta Visa',
            ultimoPago: 149.90,
            historialPagos: [
                { fecha: '2024-11-01', monto: 149.90, estado: 'Completado' }
            ]
        },
        {
            id: 2,
            usuarioId: 102,
            usuario: {
                nombre: 'María García',
                email: 'maria.garcia@email.com',
                telefono: '+51 987 654 322'
            },
            plan: {
                nombrePlan: 'VIP',
                precio: 299.90,
                duracion: '1 mes'
            },
            fechaInicio: '2024-10-15',
            fechaFin: '2024-11-15',
            estado: 'VENCIDA',
            proximoPago: '2024-11-15',
            metodoPago: 'PayPal',
            ultimoPago: 299.90,
            historialPagos: [
                { fecha: '2024-10-15', monto: 299.90, estado: 'Completado' }
            ]
        },
        {
            id: 3,
            usuarioId: 103,
            usuario: {
                nombre: 'Carlos López',
                email: 'carlos.lopez@email.com',
                telefono: '+51 987 654 323'
            },
            plan: {
                nombrePlan: 'BÁSICA',
                precio: 89.90,
                duracion: '1 mes'
            },
            fechaInicio: '2024-11-10',
            fechaFin: '2024-12-10',
            estado: 'ACTIVA',
            proximoPago: '2024-12-10',
            metodoPago: 'Transferencia',
            ultimoPago: 89.90,
            historialPagos: [
                { fecha: '2024-11-10', monto: 89.90, estado: 'Completado' }
            ]
        },
        {
            id: 4,
            usuarioId: 104,
            usuario: {
                nombre: 'Ana Rodríguez',
                email: 'ana.rodriguez@email.com',
                telefono: '+51 987 654 324'
            },
            plan: {
                nombrePlan: 'PREMIUM',
                precio: 149.90,
                duracion: '1 mes'
            },
            fechaInicio: '2024-09-01',
            fechaFin: '2024-10-01',
            estado: 'SUSPENDIDA',
            proximoPago: '2024-10-01',
            metodoPago: 'Tarjeta Mastercard',
            ultimoPago: 149.90,
            historialPagos: [
                { fecha: '2024-09-01', monto: 149.90, estado: 'Completado' }
            ]
        },
        {
            id: 5,
            usuarioId: 105,
            usuario: {
                nombre: 'Luis Martínez',
                email: 'luis.martinez@email.com',
                telefono: '+51 987 654 325'
            },
            plan: {
                nombrePlan: 'VIP',
                precio: 299.90,
                duracion: '1 mes'
            },
            fechaInicio: '2024-11-05',
            fechaFin: '2024-12-05',
            estado: 'ACTIVA',
            proximoPago: '2024-12-05',
            metodoPago: 'Tarjeta Visa',
            ultimoPago: 299.90,
            historialPagos: [
                { fecha: '2024-11-05', monto: 299.90, estado: 'Completado' }
            ]
        },
        {
            id: 6,
            usuarioId: 106,
            usuario: {
                nombre: 'Sofia Hernández',
                email: 'sofia.hernandez@email.com',
                telefono: '+51 987 654 326'
            },
            plan: {
                nombrePlan: 'BÁSICA',
                precio: 89.90,
                duracion: '1 mes'
            },
            fechaInicio: '2024-10-20',
            fechaFin: '2024-11-20',
            estado: 'ACTIVA',
            proximoPago: '2024-11-20',
            metodoPago: 'PayPal',
            ultimoPago: 89.90,
            historialPagos: [
                { fecha: '2024-10-20', monto: 89.90, estado: 'Completado' }
            ]
        }
    ];

    useEffect(() => {
        const fetchSuscripciones = async () => {
            try {
                setLoading(true);
                const data = await listarSuscripciones();
                if (data && data.length > 0) {
                    // Formatear los datos de la API
                    const suscripcionesFormateadas = data.map(suscripcion => ({
                        id: suscripcion.id,
                        usuarioId: suscripcion.usuarioId,
                        usuario: suscripcion.usuario || {
                            nombre: `Usuario ${suscripcion.usuarioId}`,
                            email: 'email@ejemplo.com',
                            telefono: '+51 XXX XXX XXX'
                        },
                        plan: suscripcion.plan || {
                            nombrePlan: 'BÁSICA',
                            precio: 89.90,
                            duracion: '1 mes'
                        },
                        fechaInicio: suscripcion.fechaInicio || new Date().toISOString().split('T')[0],
                        fechaFin: suscripcion.fechaFin || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        estado: suscripcion.estado || 'ACTIVA',
                        proximoPago: suscripcion.proximoPago || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        metodoPago: suscripcion.metodoPago || 'No especificado',
                        ultimoPago: suscripcion.ultimoPago || 0,
                        historialPagos: suscripcion.historialPagos || []
                    }));
                    setSuscripciones(suscripcionesFormateadas);
                } else {
                    setSuscripciones(suscripcionesEjemplo);
                }
            } catch (error) {
                console.error("Error al cargar suscripciones:", error);
                setSuscripciones(suscripcionesEjemplo);
            } finally {
                setLoading(false);
            }
        };
        fetchSuscripciones();
    }, []);

    // Filtrar y ordenar suscripciones
    const suscripcionesFiltradas = suscripciones
        .filter(suscripcion => {
            const coincideBusqueda = 
                suscripcion.usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                suscripcion.usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
                suscripcion.plan.nombrePlan.toLowerCase().includes(busqueda.toLowerCase());
            
            const coincideFiltro = filtroActivo === 'todas' || 
                                (filtroActivo === 'activas' && suscripcion.estado === 'ACTIVA') ||
                                (filtroActivo === 'vencidas' && suscripcion.estado === 'VENCIDA') ||
                                (filtroActivo === 'suspendidas' && suscripcion.estado === 'SUSPENDIDA') ||
                                (filtroActivo === 'premium' && (suscripcion.plan.nombrePlan === 'PREMIUM' || suscripcion.plan.nombrePlan === 'VIP')) ||
                                (filtroActivo === 'basica' && suscripcion.plan.nombrePlan === 'BÁSICA');

            return coincideBusqueda && coincideFiltro;
        })
        .sort((a, b) => {
            const campo = orden.campo;
            let valorA = a[campo];
            let valorB = b[campo];
            
            // Manejar campos anidados
            if (campo.includes('.')) {
                const [objeto, propiedad] = campo.split('.');
                valorA = a[objeto]?.[propiedad];
                valorB = b[objeto]?.[propiedad];
            }
            
            // Convertir a string para comparación
            valorA = valorA?.toString().toLowerCase() || '';
            valorB = valorB?.toString().toLowerCase() || '';
            
            if (orden.direccion === 'asc') {
                return valorA.localeCompare(valorB);
            } else {
                return valorB.localeCompare(valorA);
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

    const abrirModalSuscripcion = (suscripcion) => {
        setSuscripcionSeleccionada(suscripcion);
    };

    const cerrarModal = () => {
        setSuscripcionSeleccionada(null);
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getEstadoColor = (estado) => {
        const colores = {
            'ACTIVA': '#28a745',
            'VENCIDA': '#dc3545',
            'SUSPENDIDA': '#ffc107',
            'CANCELADA': '#6c757d'
        };
        return colores[estado] || '#6c757d';
    };

    const getEstadoIcono = (estado) => {
        const iconos = {
            'ACTIVA': faCheckCircle,
            'VENCIDA': faExclamationTriangle,
            'SUSPENDIDA': faPauseCircle,
            'CANCELADA': faHistory
        };
        return iconos[estado] || faHistory;
    };

    const getPlanColor = (plan) => {
        const colores = {
            'BÁSICA': '#7f7676',
            'PREMIUM': '#ffd500',
            'VIP': '#ff6b6b'
        };
        return colores[plan] || '#7f7676';
    };

    const diasParaVencimiento = (fechaFin) => {
        const hoy = new Date();
        const fin = new Date(fechaFin);
        const diferencia = fin.getTime() - hoy.getTime();
        return Math.ceil(diferencia / (1000 * 3600 * 24));
    };

    const recargarSuscripciones = async () => {
        try {
            setLoading(true);
            const data = await listarSuscripciones();
            if (data && data.length > 0) {
                setSuscripciones(data);
            }
        } catch (error) {
            console.error("Error al recargar suscripciones:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportarReporte = () => {
        alert('Generando reporte de suscripciones...');
        // Aquí iría la lógica para exportar el reporte
    };

    if (loading) {
        return (
            <div className="admin-suscripciones-loading">
                <div className="loading-spinner"></div>
                <p>Cargando suscripciones...</p>
            </div>
        );
    }

    return (
        <div className="admin-suscripciones-page">
            {/* Header */}
            {/* Hero Section */}
            <section className="hero-suscripciones">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>GESTIÓN DE SUSCRIPCIONES</h1>
                        <p>Administra y supervisa todas las suscripciones activas de AresFitness</p>
                    </div>
                </div>
            </section>

            {/* Estadísticas Rápidas */}
            <section className="stats-suscripciones">
                <div className="stats-container">
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCheckCircle} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{suscripciones.filter(s => s.estado === 'ACTIVA').length}</h3>
                            <p>Suscripciones Activas</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{suscripciones.filter(s => s.estado === 'VENCIDA').length}</h3>
                            <p>Suscripciones Vencidas</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faCrown} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{suscripciones.filter(s => s.plan.nombrePlan === 'PREMIUM' || s.plan.nombrePlan === 'VIP').length}</h3>
                            <p>Clientes Premium/VIP</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faReceipt} className="stat-icon" />
                        <div className="stat-content">
                            <h3>S/ {suscripciones.reduce((total, s) => total + (s.ultimoPago || 0), 0).toLocaleString()}</h3>
                            <p>Ingresos Mensuales</p>
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
                            placeholder="Buscar por usuario, email o plan..."
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
                                { id: 'vencidas', label: 'Vencidas', icon: faExclamationTriangle },
                                { id: 'suspendidas', label: 'Suspendidas', icon: faPauseCircle },
                                { id: 'premium', label: 'Premium/VIP', icon: faCrown },
                                { id: 'basica', label: 'Básica', icon: faUser }
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
                            <button className="btn-recargar" onClick={recargarSuscripciones}>
                                <FontAwesomeIcon icon={faSync} />
                                Actualizar
                            </button>
                            <button className="btn-exportar" onClick={exportarReporte}>
                                <FontAwesomeIcon icon={faFileExport} />
                                Exportar
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabla de Suscripciones */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>SUSCRIPCIONES ACTIVAS</h2>
                    <div className="title-line"></div>
                    <p>Gestiona todas las suscripciones y estados de membresía</p>
                </div>

                <div className="tabla-container">
                    {suscripcionesFiltradas.length > 0 ? (
                        <div className="tabla-responsive">
                            <table className="tabla-suscripciones">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleOrdenar('usuario.nombre')}>
                                            <span>Usuario</span>
                                            <FontAwesomeIcon icon={getIconoOrden('usuario.nombre')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('plan.nombrePlan')}>
                                            <span>Plan</span>
                                            <FontAwesomeIcon icon={getIconoOrden('plan.nombrePlan')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('fechaInicio')}>
                                            <span>Fecha Inicio</span>
                                            <FontAwesomeIcon icon={getIconoOrden('fechaInicio')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('fechaFin')}>
                                            <span>Fecha Fin</span>
                                            <FontAwesomeIcon icon={getIconoOrden('fechaFin')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('estado')}>
                                            <span>Estado</span>
                                            <FontAwesomeIcon icon={getIconoOrden('estado')} />
                                        </th>
                                        <th>Próximo Pago</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suscripcionesFiltradas.map(suscripcion => {
                                        const diasRestantes = diasParaVencimiento(suscripcion.fechaFin);
                                        return (
                                            <tr key={suscripcion.id} className="fila-suscripcion">
                                                <td className="celda-usuario">
                                                    <div className="info-usuario">
                                                        <div className="avatar-mini">
                                                            {suscripcion.usuario.nombre.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div className="nombre-completo">
                                                                {suscripcion.usuario.nombre}
                                                            </div>
                                                            <div className="usuario-email">
                                                                {suscripcion.usuario.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="celda-plan">
                                                    <span 
                                                        className="badge-plan"
                                                        style={{ backgroundColor: getPlanColor(suscripcion.plan.nombrePlan) }}
                                                    >
                                                        {suscripcion.plan.nombrePlan}
                                                    </span>
                                                    <div className="plan-precio">
                                                        S/ {suscripcion.plan.precio}
                                                    </div>
                                                </td>
                                                <td className="celda-fecha">
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                    {formatearFecha(suscripcion.fechaInicio)}
                                                </td>
                                                <td className="celda-fecha">
                                                    <FontAwesomeIcon icon={faClock} />
                                                    {formatearFecha(suscripcion.fechaFin)}
                                                    {diasRestantes <= 7 && diasRestantes > 0 && (
                                                        <div className="dias-restantes advertencia">
                                                            {diasRestantes} días
                                                        </div>
                                                    )}
                                                    {diasRestantes <= 0 && (
                                                        <div className="dias-restantes vencido">
                                                            Vencida
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="celda-estado">
                                                    <div className="estado-container">
                                                        <FontAwesomeIcon 
                                                            icon={getEstadoIcono(suscripcion.estado)} 
                                                            style={{ color: getEstadoColor(suscripcion.estado) }}
                                                        />
                                                        <span 
                                                            className="badge-estado"
                                                            style={{ backgroundColor: getEstadoColor(suscripcion.estado) }}
                                                        >
                                                            {suscripcion.estado}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="celda-pago">
                                                    <div className="pago-info">
                                                        <div className="proximo-pago">
                                                            {formatearFecha(suscripcion.proximoPago)}
                                                        </div>
                                                        <div className="metodo-pago">
                                                            {suscripcion.metodoPago}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="celda-acciones">
                                                    <div className="acciones-grid">
                                                        <button 
                                                            className="btn-accion btn-ver"
                                                            onClick={() => abrirModalSuscripcion(suscripcion)}
                                                            title="Ver detalles"
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </button>
                                                        <button 
                                                            className="btn-accion btn-editar"
                                                            title="Editar suscripción"
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button 
                                                            className="btn-accion btn-renovar"
                                                            title="Renovar suscripción"
                                                        >
                                                            <FontAwesomeIcon icon={faSync} />
                                                        </button>
                                                        <button 
                                                            className="btn-accion btn-suspender"
                                                            title="Suspender suscripción"
                                                        >
                                                            <FontAwesomeIcon icon={faPauseCircle} />
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
                            <h3>No se encontraron suscripciones</h3>
                            <p>Intenta con otros términos de búsqueda o selecciona otro filtro</p>
                        </div>
                    )}
                </div>

                {/* Resumen */}
                <div className="resumen-tabla">
                    <p>
                        Mostrando <strong>{suscripcionesFiltradas.length}</strong> de <strong>{suscripciones.length}</strong> suscripciones
                        {filtroActivo !== 'todas' && ` (Filtro: ${filtroActivo})`}
                    </p>
                </div>
            </section>

            {/* Modal de Detalles de Suscripción */}
            {suscripcionSeleccionada && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={cerrarModal}>×</button>
                        
                        <div className="modal-header">
                            <div className="suscripcion-avatar">
                                {suscripcionSeleccionada.usuario.nombre.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="suscripcion-info">
                                <h2>{suscripcionSeleccionada.usuario.nombre}</h2>
                                <p className="suscripcion-email">{suscripcionSeleccionada.usuario.email}</p>
                                <div className="badges-container">
                                    <div 
                                        className="plan-badge"
                                        style={{ backgroundColor: getPlanColor(suscripcionSeleccionada.plan.nombrePlan) }}
                                    >
                                        {suscripcionSeleccionada.plan.nombrePlan} - S/ {suscripcionSeleccionada.plan.precio}
                                    </div>
                                    <div 
                                        className="estado-badge"
                                        style={{ backgroundColor: getEstadoColor(suscripcionSeleccionada.estado) }}
                                    >
                                        <FontAwesomeIcon icon={getEstadoIcono(suscripcionSeleccionada.estado)} />
                                        {suscripcionSeleccionada.estado}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="info-grid">
                                <div className="info-section">
                                    <h3>Información de la Suscripción</h3>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faIdCard} />
                                        <span>ID: #{suscripcionSeleccionada.id}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        <span>Inicio: {formatearFecha(suscripcionSeleccionada.fechaInicio)}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faClock} />
                                        <span>Vencimiento: {formatearFecha(suscripcionSeleccionada.fechaFin)}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faReceipt} />
                                        <span>Próximo pago: {formatearFecha(suscripcionSeleccionada.proximoPago)}</span>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h3>Información de Pago</h3>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faCreditCard} />
                                        <span>Método: {suscripcionSeleccionada.metodoPago}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faMoneyBillWave} />
                                        <span>Último pago: S/ {suscripcionSeleccionada.ultimoPago}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faHistory} />
                                        <span>Días restantes: {diasParaVencimiento(suscripcionSeleccionada.fechaFin)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="historial-section">
                                <h3>Historial de Pagos</h3>
                                <div className="historial-list">
                                    {suscripcionSeleccionada.historialPagos.length > 0 ? (
                                        suscripcionSeleccionada.historialPagos.map((pago, index) => (
                                            <div key={index} className="pago-item">
                                                <div className="pago-fecha">{formatearFecha(pago.fecha)}</div>
                                                <div className="pago-monto">S/ {pago.monto}</div>
                                                <div className={`pago-estado ${pago.estado.toLowerCase()}`}>
                                                    {pago.estado}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="sin-historial">No hay historial de pagos disponible</p>
                                    )}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="btn-primary">
                                    <FontAwesomeIcon icon={faSync} /> Renovar
                                </button>
                                <button className="btn-secondary">
                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                </button>
                                <button className="btn-warning">
                                    <FontAwesomeIcon icon={faPauseCircle} /> Suspender
                                </button>
                                <button className="btn-danger">
                                    <FontAwesomeIcon icon={faTrash} /> Cancelar
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
                    <p>&copy; 2025 AresFitness. Gestión de Suscripciones v2.0</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminSuscripcionesPage;