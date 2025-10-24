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
    faMoneyBillWave,
    faBell,
    faDownload,
    faPrint,
    faQrcode
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './css/AdminSuscripcionesPage.css';

function AdminSuscripcionesPage() {
    const [suscripciones, setSuscripciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todas');
    const [orden, setOrden] = useState({ campo: 'fechaInicio', direccion: 'desc' });
    const [suscripcionSeleccionada, setSuscripcionSeleccionada] = useState(null);
    const [estadisticas, setEstadisticas] = useState({
        total: 0,
        activas: 0,
        vencidas: 0,
        suspendidas: 0,
        ingresosMensuales: 0,
        clientesPremium: 0
    });
    const [notificaciones, setNotificaciones] = useState([]);

    // Datos de ejemplo mejorados
    const suscripcionesEjemplo = [
        {
            id: 1,
            usuarioId: 101,
            usuario: {
                nombre: 'Juan Pérez',
                email: 'juan.perez@email.com',
                telefono: '+51 987 654 321',
                fechaRegistro: '2024-01-15'
            },
            plan: {
                id: 1,
                nombrePlan: 'PREMIUM',
                precio: 149.90,
                duracion: 30,
                descripcion: 'Acceso completo a todas las instalaciones y clases'
            },
            fechaInicio: '2024-11-01',
            fechaFin: '2024-12-01',
            estado: 'ACTIVA',
            proximoPago: '2024-12-01',
            metodoPago: 'Tarjeta Visa',
            ultimoPago: 149.90,
            frecuenciaPago: 'mensual',
            historialPagos: [
                { id: 1, fecha: '2024-11-01', monto: 149.90, estado: 'Completado', metodo: 'Visa' },
                { id: 2, fecha: '2024-10-01', monto: 149.90, estado: 'Completado', metodo: 'Visa' }
            ],
            notificaciones: ['Próximo pago en 5 días']
        },
        {
            id: 2,
            usuarioId: 102,
            usuario: {
                nombre: 'María García',
                email: 'maria.garcia@email.com',
                telefono: '+51 987 654 322',
                fechaRegistro: '2024-02-20'
            },
            plan: {
                id: 2,
                nombrePlan: 'VIP',
                precio: 299.90,
                duracion: 30,
                descripcion: 'Acceso VIP con entrenador personal y beneficios exclusivos'
            },
            fechaInicio: '2024-10-15',
            fechaFin: '2024-11-15',
            estado: 'VENCIDA',
            proximoPago: '2024-11-15',
            metodoPago: 'PayPal',
            ultimoPago: 299.90,
            frecuenciaPago: 'mensual',
            historialPagos: [
                { id: 3, fecha: '2024-10-15', monto: 299.90, estado: 'Completado', metodo: 'PayPal' }
            ],
            notificaciones: ['Suscripción vencida - Contactar al cliente']
        },
        {
            id: 3,
            usuarioId: 103,
            usuario: {
                nombre: 'Carlos López',
                email: 'carlos.lopez@email.com',
                telefono: '+51 987 654 323',
                fechaRegistro: '2024-03-10'
            },
            plan: {
                id: 3,
                nombrePlan: 'BÁSICA',
                precio: 89.90,
                duracion: 30,
                descripcion: 'Acceso básico a instalaciones en horario estándar'
            },
            fechaInicio: '2024-11-10',
            fechaFin: '2024-12-10',
            estado: 'ACTIVA',
            proximoPago: '2024-12-10',
            metodoPago: 'Transferencia',
            ultimoPago: 89.90,
            frecuenciaPago: 'mensual',
            historialPagos: [
                { id: 4, fecha: '2024-11-10', monto: 89.90, estado: 'Completado', metodo: 'Transferencia' }
            ],
            notificaciones: []
        },
        {
            id: 4,
            usuarioId: 104,
            usuario: {
                nombre: 'Ana Rodríguez',
                email: 'ana.rodriguez@email.com',
                telefono: '+51 987 654 324',
                fechaRegistro: '2024-04-05'
            },
            plan: {
                id: 1,
                nombrePlan: 'PREMIUM',
                precio: 149.90,
                duracion: 30,
                descripcion: 'Acceso completo a todas las instalaciones y clases'
            },
            fechaInicio: '2024-09-01',
            fechaFin: '2024-10-01',
            estado: 'SUSPENDIDA',
            proximoPago: '2024-10-01',
            metodoPago: 'Tarjeta Mastercard',
            ultimoPago: 149.90,
            frecuenciaPago: 'mensual',
            historialPagos: [
                { id: 5, fecha: '2024-09-01', monto: 149.90, estado: 'Completado', metodo: 'Mastercard' }
            ],
            notificaciones: ['Suscripción suspendida - Pendiente de pago']
        },
        {
            id: 5,
            usuarioId: 105,
            usuario: {
                nombre: 'Luis Martínez',
                email: 'luis.martinez@email.com',
                telefono: '+51 987 654 325',
                fechaRegistro: '2024-05-12'
            },
            plan: {
                id: 2,
                nombrePlan: 'VIP',
                precio: 299.90,
                duracion: 30,
                descripcion: 'Acceso VIP con entrenador personal y beneficios exclusivos'
            },
            fechaInicio: '2024-11-05',
            fechaFin: '2024-12-05',
            estado: 'ACTIVA',
            proximoPago: '2024-12-05',
            metodoPago: 'Tarjeta Visa',
            ultimoPago: 299.90,
            frecuenciaPago: 'mensual',
            historialPagos: [
                { id: 6, fecha: '2024-11-05', monto: 299.90, estado: 'Completado', metodo: 'Visa' }
            ],
            notificaciones: []
        },
        {
            id: 6,
            usuarioId: 106,
            usuario: {
                nombre: 'Sofia Hernández',
                email: 'sofia.hernandez@email.com',
                telefono: '+51 987 654 326',
                fechaRegistro: '2024-06-18'
            },
            plan: {
                id: 3,
                nombrePlan: 'BÁSICA',
                precio: 89.90,
                duracion: 30,
                descripcion: 'Acceso básico a instalaciones en horario estándar'
            },
            fechaInicio: '2024-10-20',
            fechaFin: '2024-11-20',
            estado: 'ACTIVA',
            proximoPago: '2024-11-20',
            metodoPago: 'PayPal',
            ultimoPago: 89.90,
            frecuenciaPago: 'mensual',
            historialPagos: [
                { id: 7, fecha: '2024-10-20', monto: 89.90, estado: 'Completado', metodo: 'PayPal' }
            ],
            notificaciones: ['Próximo pago en 2 días']
        }
    ];

    useEffect(() => {
        const fetchSuscripciones = async () => {
            try {
                setLoading(true);
                const data = await listarSuscripciones();
                if (data && data.length > 0) {
                    const suscripcionesFormateadas = data.map(suscripcion => ({
                        id: suscripcion.id,
                        usuarioId: suscripcion.usuarioId,
                        usuario: suscripcion.usuario || {
                            nombre: `Usuario ${suscripcion.usuarioId}`,
                            email: 'email@ejemplo.com',
                            telefono: '+51 XXX XXX XXX',
                            fechaRegistro: new Date().toISOString().split('T')[0]
                        },
                        plan: suscripcion.plan || {
                            id: 3,
                            nombrePlan: 'BÁSICA',
                            precio: 89.90,
                            duracion: 30,
                            descripcion: 'Plan básico de membresía'
                        },
                        fechaInicio: suscripcion.fechaInicio || new Date().toISOString().split('T')[0],
                        fechaFin: suscripcion.fechaFin || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        estado: suscripcion.estado || 'ACTIVA',
                        proximoPago: suscripcion.proximoPago || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        metodoPago: suscripcion.metodoPago || 'No especificado',
                        ultimoPago: suscripcion.ultimoPago || 0,
                        frecuenciaPago: suscripcion.frecuenciaPago || 'mensual',
                        historialPagos: suscripcion.historialPagos || [],
                        notificaciones: suscripcion.notificaciones || []
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

    // Calcular estadísticas en tiempo real
    useEffect(() => {
        const nuevasEstadisticas = {
            total: suscripciones.length,
            activas: suscripciones.filter(s => s.estado === 'ACTIVA').length,
            vencidas: suscripciones.filter(s => s.estado === 'VENCIDA').length,
            suspendidas: suscripciones.filter(s => s.estado === 'SUSPENDIDA').length,
            ingresosMensuales: suscripciones
                .filter(s => s.estado === 'ACTIVA')
                .reduce((total, s) => total + (s.ultimoPago || 0), 0),
            clientesPremium: suscripciones.filter(s =>
                s.plan.nombrePlan === 'PREMIUM' || s.plan.nombrePlan === 'VIP'
            ).length
        };
        setEstadisticas(nuevasEstadisticas);
    }, [suscripciones]);

    // Filtrar y ordenar suscripciones
    const suscripcionesFiltradas = suscripciones
        .filter(suscripcion => {
            const coincideBusqueda =
                suscripcion.usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                suscripcion.usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
                suscripcion.plan.nombrePlan.toLowerCase().includes(busqueda.toLowerCase()) ||
                suscripcion.usuario.telefono.includes(busqueda);

            const coincideFiltro = filtroActivo === 'todas' ||
                (filtroActivo === 'activas' && suscripcion.estado === 'ACTIVA') ||
                (filtroActivo === 'vencidas' && suscripcion.estado === 'VENCIDA') ||
                (filtroActivo === 'suspendidas' && suscripcion.estado === 'SUSPENDIDA') ||
                (filtroActivo === 'premium' && (suscripcion.plan.nombrePlan === 'PREMIUM' || suscripcion.plan.nombrePlan === 'VIP')) ||
                (filtroActivo === 'basica' && suscripcion.plan.nombrePlan === 'BÁSICA') ||
                (filtroActivo === 'proximas-vencer' && diasParaVencimiento(suscripcion.fechaFin) <= 7 && diasParaVencimiento(suscripcion.fechaFin) > 0);

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

            // Manejar fechas
            if (campo.includes('fecha')) {
                valorA = new Date(valorA).getTime();
                valorB = new Date(valorB).getTime();
            }

            if (orden.direccion === 'asc') {
                return valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
            } else {
                return valorA > valorB ? -1 : valorA < valorB ? 1 : 0;
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

    const formatearMoneda = (monto) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(monto);
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
        const fecha = new Date().toISOString().split('T')[0];
        const nombreArchivo = `reporte-suscripciones-${fecha}.csv`;

        // Crear contenido CSV
        const headers = ['Usuario', 'Email', 'Plan', 'Estado', 'Fecha Inicio', 'Fecha Fin', 'Último Pago', 'Método Pago'];
        const filas = suscripcionesFiltradas.map(s => [
            s.usuario.nombre,
            s.usuario.email,
            s.plan.nombrePlan,
            s.estado,
            s.fechaInicio,
            s.fechaFin,
            s.ultimoPago,
            s.metodoPago
        ]);

        const contenidoCSV = [headers, ...filas]
            .map(fila => fila.map(campo => `"${campo}"`).join(','))
            .join('\n');

        // Descargar archivo
        const blob = new Blob([contenidoCSV], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const imprimirReporte = () => {
        window.print();
    };

    const generarQR = (suscripcion) => {
        alert(`Generando QR para ${suscripcion.usuario.nombre}...`);
        // Aquí iría la lógica para generar QR
    };

    const enviarRecordatorio = (suscripcion) => {
        alert(`Enviando recordatorio a ${suscripcion.usuario.email}...`);
        // Aquí iría la lógica para enviar recordatorio
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
            <section className="hero-suscripciones">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>GESTIÓN DE SUSCRIPCIONES</h1>
                        <p>Administra y supervisa todas las suscripciones activas de AresFitness</p>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <FontAwesomeIcon icon={faChartLine} />
                                <span><strong>{estadisticas.activas}</strong> activas de <strong>{estadisticas.total}</strong> total</span>
                            </div>
                            <div className="hero-stat">
                                <FontAwesomeIcon icon={faMoneyBillWave} />
                                <span><strong>{formatearMoneda(estadisticas.ingresosMensuales)}</strong> ingresos mensuales</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Estadísticas Rápidas Mejoradas */}
            <section className="stats-suscripciones">
                <div className="stats-container">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="stat-content">
                            <h3>{estadisticas.activas}</h3>
                            <p>Activas</p>
                            <span className="stat-trend positivo">+5% este mes</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </div>
                        <div className="stat-content">
                            <h3>{estadisticas.vencidas}</h3>
                            <p>Vencidas</p>
                            <span className="stat-trend negativo">-2%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faCrown} />
                        </div>
                        <div className="stat-content">
                            <h3>{estadisticas.clientesPremium}</h3>
                            <p>Premium/VIP</p>
                            <span className="stat-trend positivo">+12%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FontAwesomeIcon icon={faReceipt} />
                        </div>
                        <div className="stat-content">
                            <h3>{formatearMoneda(estadisticas.ingresosMensuales)}</h3>
                            <p>Ingresos Mensuales</p>
                            <span className="stat-trend positivo">+8%</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Barra de Herramientas Mejorada */}
            <section className="herramientas-section">
                <div className="herramientas-container">
                    <div className="search-container">
                        <div className="search-bar">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por usuario, email, teléfono o plan..."
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
                                <span>{suscripcionesFiltradas.length} suscripciones encontradas</span>
                            )}
                        </div>
                    </div>

                    <div className="herramientas-derecha">
                        <div className="filtro-buttons">
                            {[
                                { id: 'todas', label: 'Todas', icon: faFilter, color: '#7f7676' },
                                { id: 'activas', label: 'Activas', icon: faCheckCircle, color: '#28a745' },
                                { id: 'vencidas', label: 'Vencidas', icon: faExclamationTriangle, color: '#dc3545' },
                                { id: 'suspendidas', label: 'Suspendidas', icon: faPauseCircle, color: '#ffc107' },
                                { id: 'premium', label: 'Premium/VIP', icon: faCrown, color: '#ffd500' },
                                { id: 'basica', label: 'Básica', icon: faUser, color: '#7f7676' },
                                { id: 'proximas-vencer', label: 'Próximas a Vencer', icon: faClock, color: '#ff6b6b' }
                            ].map(filtro => (
                                <button
                                    key={filtro.id}
                                    className={`filtro-btn ${filtroActivo === filtro.id ? 'active' : ''}`}
                                    onClick={() => setFiltroActivo(filtro.id)}
                                    style={{ borderColor: filtro.color }}
                                >
                                    <FontAwesomeIcon icon={filtro.icon} style={{ color: filtro.color }} />
                                    {filtro.label}
                                </button>
                            ))}
                        </div>

                        <div className="acciones-buttons">
                            <button
                                className="btn-recargar"
                                onClick={recargarSuscripciones}
                                title="Actualizar lista"
                            >
                                <FontAwesomeIcon icon={faSync} className={loading ? 'spin' : ''} />
                                {loading ? 'Actualizando...' : 'Actualizar'}
                            </button>
                            <button
                                className="btn-exportar"
                                onClick={exportarReporte}
                                title="Exportar reporte CSV"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                Exportar CSV
                            </button>
                            <button
                                className="btn-imprimir"
                                onClick={imprimirReporte}
                                title="Imprimir reporte"
                            >
                                <FontAwesomeIcon icon={faPrint} />
                                Imprimir
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabla de Suscripciones Mejorada */}
            <section className="tabla-section">
                <div className="section-header">
                    <div className="section-title">
                        <h2>SUSCRIPCIONES ACTIVAS</h2>
                        <div className="title-line"></div>
                        <p>Gestiona todas las suscripciones y estados de membresía</p>
                    </div>
                    <div className="table-controls">
                        <span className="table-info">
                            Mostrando {suscripcionesFiltradas.length} de {suscripciones.length} suscripciones
                        </span>
                        {orden.campo && (
                            <span className="sort-info">
                                Ordenado por {orden.campo.replace('.', ' ')} ({orden.direccion})
                            </span>
                        )}
                    </div>
                </div>

                <div className="tabla-container">
                    {suscripcionesFiltradas.length > 0 ? (
                        <div className="tabla-responsive">
                            <table className="tabla-suscripciones">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleOrdenar('usuario.nombre')}>
                                            <span>
                                                Usuario
                                                <FontAwesomeIcon icon={getIconoOrden('usuario.nombre')} />
                                            </span>
                                        </th>
                                        <th onClick={() => handleOrdenar('plan.nombrePlan')}>
                                            <span>
                                                Plan
                                                <FontAwesomeIcon icon={getIconoOrden('plan.nombrePlan')} />
                                            </span>
                                        </th>
                                        <th onClick={() => handleOrdenar('fechaInicio')}>
                                            <span>
                                                Fecha Inicio
                                                <FontAwesomeIcon icon={getIconoOrden('fechaInicio')} />
                                            </span>
                                        </th>
                                        <th onClick={() => handleOrdenar('fechaFin')}>
                                            <span>
                                                Fecha Fin
                                                <FontAwesomeIcon icon={getIconoOrden('fechaFin')} />
                                            </span>
                                        </th>
                                        <th onClick={() => handleOrdenar('estado')}>
                                            <span>
                                                Estado
                                                <FontAwesomeIcon icon={getIconoOrden('estado')} />
                                            </span>
                                        </th>
                                        <th>Próximo Pago</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suscripcionesFiltradas.map(suscripcion => {
                                        const diasRestantes = diasParaVencimiento(suscripcion.fechaFin);
                                        const tieneNotificaciones = suscripcion.notificaciones.length > 0;

                                        return (
                                            <tr key={suscripcion.id} className={`fila-suscripcion ${tieneNotificaciones ? 'con-notificacion' : ''}`}>
                                                <td className="celda-usuario">
                                                    <div className="info-usuario">
                                                        <div className="avatar-mini">
                                                            {suscripcion.usuario.nombre.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div className="usuario-info">
                                                            <div className="nombre-completo">
                                                                {suscripcion.usuario.nombre}
                                                                {tieneNotificaciones && (
                                                                    <span className="notificacion-dot" title="Tiene notificaciones"></span>
                                                                )}
                                                            </div>
                                                            <div className="usuario-email">
                                                                {suscripcion.usuario.email}
                                                            </div>
                                                            <div className="usuario-telefono">
                                                                {suscripcion.usuario.telefono}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="celda-plan">
                                                    <div className="plan-info">
                                                        <span
                                                            className="badge-plan"
                                                            style={{ backgroundColor: getPlanColor(suscripcion.plan.nombrePlan) }}
                                                        >
                                                            {suscripcion.plan.nombrePlan}
                                                        </span>
                                                        <div className="plan-detalles">
                                                            <div className="plan-precio">
                                                                {formatearMoneda(suscripcion.plan.precio)}
                                                            </div>
                                                            <div className="plan-duracion">
                                                                {suscripcion.plan.duracion} días
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="celda-fecha">
                                                    <div className="fecha-container">
                                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                                        <span>{formatearFecha(suscripcion.fechaInicio)}</span>
                                                    </div>
                                                </td>
                                                <td className="celda-fecha">
                                                    <div className="fecha-container">
                                                        <FontAwesomeIcon icon={faClock} />
                                                        <span>{formatearFecha(suscripcion.fechaFin)}</span>
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
                                                    </div>
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
                                                            <FontAwesomeIcon icon={faCreditCard} />
                                                            {suscripcion.metodoPago}
                                                        </div>
                                                        <div className="ultimo-pago">
                                                            Último: {formatearMoneda(suscripcion.ultimoPago)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="celda-acciones">
                                                    <div className="acciones-grid">
                                                        <button
                                                            className="btn-accion btn-ver"
                                                            onClick={() => abrirModalSuscripcion(suscripcion)}
                                                            title="Ver detalles completos"
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </button>
                                                        <button
                                                            className="btn-accion btn-qr"
                                                            onClick={() => generarQR(suscripcion)}
                                                            title="Generar QR de acceso"
                                                        >
                                                            <FontAwesomeIcon icon={faQrcode} />
                                                        </button>
                                                        <button
                                                            className="btn-accion btn-recordatorio"
                                                            onClick={() => enviarRecordatorio(suscripcion)}
                                                            title="Enviar recordatorio"
                                                        >
                                                            <FontAwesomeIcon icon={faBell} />
                                                        </button>
                                                        <button
                                                            className="btn-accion btn-renovar"
                                                            title="Renovar suscripción"
                                                        >
                                                            <FontAwesomeIcon icon={faSync} />
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
                            <div className="no-result-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <h3>No se encontraron suscripciones</h3>
                            <p>
                                {busqueda ?
                                    `No hay suscripciones que coincidan con "${busqueda}"` :
                                    'No hay suscripciones que coincidan con los filtros seleccionados'
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
                        </div>
                    )}
                </div>

                {/* Resumen Mejorado */}
                {suscripcionesFiltradas.length > 0 && (
                    <div className="tabla-footer">
                        <div className="resumen-tabla">
                            <div className="resumen-info">
                                <span>
                                    Mostrando <strong>{suscripcionesFiltradas.length}</strong> de <strong>{suscripciones.length}</strong> suscripciones
                                </span>
                                {filtroActivo !== 'todas' && (
                                    <span className="filtro-activo">
                                        Filtro activo: <strong>{filtroActivo}</strong>
                                    </span>
                                )}
                            </div>
                            <div className="resumen-acciones">
                                <button className="btn-exportar-pequeno" onClick={exportarReporte}>
                                    <FontAwesomeIcon icon={faDownload} />
                                    Exportar
                                </button>
                                <button className="btn-imprimir-pequeno" onClick={imprimirReporte}>
                                    <FontAwesomeIcon icon={faPrint} />
                                    Imprimir
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            {suscripcionSeleccionada && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Detalles de Suscripción</h2>
                            <button className="btn-cerrar-modal" onClick={cerrarModal}>
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* Información del Usuario */}
                            <div className="modal-section">
                                <h3>
                                    <FontAwesomeIcon icon={faUser} />
                                    Información del Usuario
                                </h3>
                                <div className="usuario-detalles">
                                    <div className="detalle-item">
                                        <label>Nombre completo:</label>
                                        <span>{suscripcionSeleccionada.usuario.nombre}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Email:</label>
                                        <span>{suscripcionSeleccionada.usuario.email}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Teléfono:</label>
                                        <span>{suscripcionSeleccionada.usuario.telefono}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Fecha de registro:</label>
                                        <span>{formatearFecha(suscripcionSeleccionada.usuario.fechaRegistro)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Información del Plan */}
                            <div className="modal-section">
                                <h3>
                                    <FontAwesomeIcon icon={faCrown} />
                                    Información del Plan
                                </h3>
                                <div className="plan-detalles-completos">
                                    <div className="plan-header">
                                        <span
                                            className="badge-plan-grande"
                                            style={{ backgroundColor: getPlanColor(suscripcionSeleccionada.plan.nombrePlan) }}
                                        >
                                            {suscripcionSeleccionada.plan.nombrePlan}
                                        </span>
                                        <div className="plan-precio-grande">
                                            {formatearMoneda(suscripcionSeleccionada.plan.precio)}
                                        </div>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Descripción:</label>
                                        <span>{suscripcionSeleccionada.plan.descripcion}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Duración:</label>
                                        <span>{suscripcionSeleccionada.plan.duracion} días</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Frecuencia de pago:</label>
                                        <span>{suscripcionSeleccionada.frecuenciaPago}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Estado y Fechas */}
                            <div className="modal-section">
                                <h3>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    Estado y Fechas
                                </h3>
                                <div className="estado-detalles">
                                    <div className="detalle-item">
                                        <label>Estado:</label>
                                        <span className="estado-badge" style={{
                                            backgroundColor: getEstadoColor(suscripcionSeleccionada.estado)
                                        }}>
                                            <FontAwesomeIcon icon={getEstadoIcono(suscripcionSeleccionada.estado)} />
                                            {suscripcionSeleccionada.estado}
                                        </span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Fecha de inicio:</label>
                                        <span>{formatearFecha(suscripcionSeleccionada.fechaInicio)}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Fecha de fin:</label>
                                        <span>{formatearFecha(suscripcionSeleccionada.fechaFin)}</span>
                                        {diasParaVencimiento(suscripcionSeleccionada.fechaFin) <= 7 && (
                                            <span className="dias-advertencia">
                                                ({diasParaVencimiento(suscripcionSeleccionada.fechaFin)} días restantes)
                                            </span>
                                        )}
                                    </div>
                                    <div className="detalle-item">
                                        <label>Próximo pago:</label>
                                        <span>{formatearFecha(suscripcionSeleccionada.proximoPago)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Pago */}
                            <div className="modal-section">
                                <h3>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Información de Pago
                                </h3>
                                <div className="pago-detalles">
                                    <div className="detalle-item">
                                        <label>Método de pago:</label>
                                        <span>{suscripcionSeleccionada.metodoPago}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Último pago:</label>
                                        <span>{formatearMoneda(suscripcionSeleccionada.ultimoPago)}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <label>Próximo pago:</label>
                                        <span>{formatearMoneda(suscripcionSeleccionada.plan.precio)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Historial de Pagos */}
                            {suscripcionSeleccionada.historialPagos && suscripcionSeleccionada.historialPagos.length > 0 && (
                                <div className="modal-section">
                                    <h3>
                                        <FontAwesomeIcon icon={faHistory} />
                                        Historial de Pagos
                                    </h3>
                                    <div className="historial-pagos">
                                        {suscripcionSeleccionada.historialPagos.map((pago, index) => (
                                            <div key={pago.id || index} className="pago-item">
                                                <div className="pago-fecha">{formatearFecha(pago.fecha)}</div>
                                                <div className="pago-monto">{formatearMoneda(pago.monto)}</div>
                                                <div className="pago-estado" style={{ color: pago.estado === 'Completado' ? '#28a745' : '#dc3545' }}>
                                                    {pago.estado}
                                                </div>
                                                <div className="pago-metodo">{pago.metodo}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Notificaciones */}
                            {suscripcionSeleccionada.notificaciones && suscripcionSeleccionada.notificaciones.length > 0 && (
                                <div className="modal-section">
                                    <h3>
                                        <FontAwesomeIcon icon={faBell} />
                                        Notificaciones
                                    </h3>
                                    <div className="notificaciones-list">
                                        {suscripcionSeleccionada.notificaciones.map((notif, index) => (
                                            <div key={index} className="notificacion-item">
                                                <FontAwesomeIcon icon={faExclamationTriangle} className="notificacion-icon" />
                                                <span>{notif}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <div className="acciones-modal">
                                <button
                                    className="btn-modal btn-secundario"
                                    onClick={() => enviarRecordatorio(suscripcionSeleccionada)}
                                >
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    Enviar Recordatorio
                                </button>
                                <button
                                    className="btn-modal btn-secundario"
                                    onClick={() => generarQR(suscripcionSeleccionada)}
                                >
                                    <FontAwesomeIcon icon={faQrcode} />
                                    Generar QR
                                </button>
                                <button className="btn-modal btn-peligro">
                                    <FontAwesomeIcon icon={faPauseCircle} />
                                    Suspender
                                </button>
                                <button className="btn-modal btn-primario">
                                    <FontAwesomeIcon icon={faSync} />
                                    Renovar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="admin-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>AresFitness</h4>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 AresFitness. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminSuscripcionesPage;