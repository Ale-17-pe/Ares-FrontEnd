import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCrown,
    faCreditCard,
    faHistory,
    faSync,
    faCheckCircle,
    faExclamationTriangle,
    faClock,
    faTimesCircle,
    faDownload,
    faEye,
    faPlus,
    faCalendarAlt,
    faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import './css/MisMembresiasPage.css';

function MisMembresiasPage() {
    const [membresias, setMembresias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [membresiaActiva, setMembresiaActiva] = useState(null);

    useEffect(() => {
        cargarMembresias();
    }, []);

    const cargarMembresias = async () => {
        try {
            setLoading(true);
            // Simular carga de datos
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Datos de ejemplo
            const datosMembresias = [
                {
                    id: 1,
                    plan: {
                        nombrePlan: 'PREMIUM',
                        precio: 149.90,
                        duracion: 30,
                        descripcion: 'Acceso completo a todas las instalaciones y clases',
                        beneficios: ['Acceso ilimitado', 'Todas las clases', 'Sin restricciones horarias', 'Área VIP']
                    },
                    fechaInicio: '2024-01-01',
                    fechaFin: '2024-02-01',
                    estado: 'ACTIVA',
                    proximoPago: '2024-02-01',
                    metodoPago: 'Tarjeta Visa',
                    historialPagos: [
                        { id: 1, fecha: '2024-01-01', monto: 149.90, estado: 'COMPLETADO' },
                        { id: 2, fecha: '2023-12-01', monto: 149.90, estado: 'COMPLETADO' }
                    ]
                },
                {
                    id: 2,
                    plan: {
                        nombrePlan: 'BÁSICA',
                        precio: 89.90,
                        duracion: 30,
                        descripcion: 'Acceso básico a instalaciones en horario estándar',
                        beneficios: ['Acceso estándar', 'Clases básicas', 'Horario limitado']
                    },
                    fechaInicio: '2023-11-01',
                    fechaFin: '2023-12-01',
                    estado: 'VENCIDA',
                    proximoPago: null,
                    metodoPago: 'PayPal',
                    historialPagos: [
                        { id: 3, fecha: '2023-11-01', monto: 89.90, estado: 'COMPLETADO' }
                    ]
                }
            ];

            setMembresias(datosMembresias);
            setMembresiaActiva(datosMembresias.find(m => m.estado === 'ACTIVA') || null);
        } catch (error) {
            console.error("Error al cargar membresías:", error);
        } finally {
            setLoading(false);
        }
    };

    const getEstadoColor = (estado) => {
        const colores = {
            'ACTIVA': '#28a745',
            'VENCIDA': '#dc3545',
            'SUSPENDIDA': '#ffc107',
            'PENDIENTE': '#17a2b8',
            'CANCELADA': '#6c757d'
        };
        return colores[estado] || '#6c757d';
    };

    const getEstadoIcono = (estado) => {
        const iconos = {
            'ACTIVA': faCheckCircle,
            'VENCIDA': faTimesCircle,
            'SUSPENDIDA': faExclamationTriangle,
            'PENDIENTE': faClock,
            'CANCELADA': faTimesCircle
        };
        return iconos[estado] || faClock;
    };

    const calcularDiasRestantes = (fechaFin) => {
        if (!fechaFin) return 0;
        const hoy = new Date();
        const fin = new Date(fechaFin);
        const diffTiempo = fin.getTime() - hoy.getTime();
        const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDias);
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatearMoneda = (monto) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(monto);
    };

    if (loading) {
        return (
            <div className="mis-membresias-loading">
                <div className="loading-spinner"></div>
                <p>Cargando tus membresías...</p>
            </div>
        );
    }

    return (
        <div className="mis-membresias-page">
            {/* Hero Section */}
            <section className="hero-membresias">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>MIS MEMBRESÍAS</h1>
                        <p>Gestiona y consulta el estado de tus membresías en AresFitness</p>
                    </div>
                </div>
            </section>

            {/* Membresía Activa */}
            {membresiaActiva && (
                <section className="membresia-activa-section">
                    <div className="section-container">
                        <div className="section-header">
                            <h2>Tu Membresía Activa</h2>
                            <div className="title-line"></div>
                        </div>
                        
                        <div className="membresia-activa-card">
                            <div className="membresia-header">
                                <div className="plan-info">
                                    <FontAwesomeIcon icon={faCrown} className="plan-icon" />
                                    <div>
                                        <h3>{membresiaActiva.plan.nombrePlan}</h3>
                                        <p>{membresiaActiva.plan.descripcion}</p>
                                    </div>
                                </div>
                                <div className="estado-container">
                                    <span 
                                        className="badge-estado"
                                        style={{ backgroundColor: getEstadoColor(membresiaActiva.estado) }}
                                    >
                                        <FontAwesomeIcon icon={getEstadoIcono(membresiaActiva.estado)} />
                                        {membresiaActiva.estado}
                                    </span>
                                </div>
                            </div>

                            <div className="membresia-details">
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <FontAwesomeIcon icon={faMoneyBillWave} />
                                        <div>
                                            <label>Precio Mensual</label>
                                            <span>{formatearMoneda(membresiaActiva.plan.precio)}</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        <div>
                                            <label>Fecha de Inicio</label>
                                            <span>{formatearFecha(membresiaActiva.fechaInicio)}</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        <div>
                                            <label>Fecha de Fin</label>
                                            <span>{formatearFecha(membresiaActiva.fechaFin)}</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <FontAwesomeIcon icon={faClock} />
                                        <div>
                                            <label>Días Restantes</label>
                                            <span>{calcularDiasRestantes(membresiaActiva.fechaFin)} días</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="proximo-pago">
                                    <h4>Próximo Pago</h4>
                                    <div className="pago-info">
                                        <span className="pago-fecha">{formatearFecha(membresiaActiva.proximoPago)}</span>
                                        <span className="pago-monto">{formatearMoneda(membresiaActiva.plan.precio)}</span>
                                        <span className="pago-metodo">{membresiaActiva.metodoPago}</span>
                                    </div>
                                </div>

                                <div className="beneficios">
                                    <h4>Beneficios Incluidos</h4>
                                    <div className="beneficios-list">
                                        {membresiaActiva.plan.beneficios.map((beneficio, index) => (
                                            <div key={index} className="beneficio-item">
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                <span>{beneficio}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="membresia-actions">
                                <button className="btn-primario">
                                    <FontAwesomeIcon icon={faSync} />
                                    Renovar Membresía
                                </button>
                                <button className="btn-secundario">
                                    <FontAwesomeIcon icon={faDownload} />
                                    Descargar Comprobante
                                </button>
                                <button className="btn-detalles">
                                    <FontAwesomeIcon icon={faEye} />
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Historial de Membresías */}
            <section className="historial-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2>Historial de Membresías</h2>
                        <div className="title-line"></div>
                        <p>Consulta tu historial completo de membresías</p>
                    </div>

                    <div className="membresias-grid">
                        {membresias.filter(m => m.id !== membresiaActiva?.id).map(membresia => (
                            <div key={membresia.id} className="membresia-card">
                                <div className="card-header">
                                    <div className="plan-name">
                                        <FontAwesomeIcon icon={faCrown} />
                                        <h3>{membresia.plan.nombrePlan}</h3>
                                    </div>
                                    <span 
                                        className="badge-estado"
                                        style={{ backgroundColor: getEstadoColor(membresia.estado) }}
                                    >
                                        <FontAwesomeIcon icon={getEstadoIcono(membresia.estado)} />
                                        {membresia.estado}
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="membresia-info">
                                        <div className="info-item">
                                            <label>Precio:</label>
                                            <span>{formatearMoneda(membresia.plan.precio)}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Período:</label>
                                            <span>{formatearFecha(membresia.fechaInicio)} - {formatearFecha(membresia.fechaFin)}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Método de Pago:</label>
                                            <span>{membresia.metodoPago}</span>
                                        </div>
                                    </div>

                                    <div className="historial-pagos">
                                        <h4>Últimos Pagos</h4>
                                        {membresia.historialPagos.slice(0, 2).map(pago => (
                                            <div key={pago.id} className="pago-item">
                                                <span className="pago-fecha">{formatearFecha(pago.fecha)}</span>
                                                <span className="pago-monto">{formatearMoneda(pago.monto)}</span>
                                                <span className="pago-estado">{pago.estado}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button className="btn-detalles">
                                        <FontAwesomeIcon icon={faEye} />
                                        Ver Detalles
                                    </button>
                                    <button className="btn-descargar">
                                        <FontAwesomeIcon icon={faDownload} />
                                        Comprobante
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {membresias.filter(m => m.id !== membresiaActiva?.id).length === 0 && (
                        <div className="no-historial">
                            <FontAwesomeIcon icon={faHistory} size="3x" />
                            <h3>No hay historial de membresías</h3>
                            <p>No tienes membresías anteriores registradas</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            {!membresiaActiva && (
                <section className="cta-section">
                    <div className="section-container">
                        <div className="cta-content">
                            <FontAwesomeIcon icon={faCrown} className="cta-icon" />
                            <h2>¡Comienza tu Transformación!</h2>
                            <p>Únete a AresFitness y descubre todos los beneficios de nuestras membresías</p>
                            <Link to="/membresias">
                                <button className="btn-primario grande">
                                    <FontAwesomeIcon icon={faPlus} />
                                    Ver Planes Disponibles
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default MisMembresiasPage;