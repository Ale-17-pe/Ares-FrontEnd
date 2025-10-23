import React, { useState, useEffect } from 'react';
import { listarUsuarios } from '../services/usuarioService';
import './AdminClientesPage.css';

function AdminClientesPage() {
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                setCargando(true);
                const data = await listarUsuarios();
                setClientes(data);
            } catch (error) {
                console.error("Error al cargar clientes:", error);
            } finally {
                setCargando(false);
            }
        };
        fetchClientes();
    }, []);

    const handleVerDetalles = (cliente) => {
        setClienteSeleccionado(cliente);
        setModalVisible(true);
    };

    const handleCerrarModal = () => {
        setModalVisible(false);
        setClienteSeleccionado(null);
    };

    const generarIniciales = (nombre, apellido) => {
        return `${nombre?.charAt(0) || ''}${apellido?.charAt(0) || ''}`.toUpperCase();
    };

    const formatearFecha = (fechaString) => {
        if (!fechaString) return 'No registrada';
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Filtrar clientes según la búsqueda
    const clientesFiltrados = clientes.filter(cliente => 
        cliente.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.email?.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (cargando) {
        return (
            <div className="admin-clientes-loading">
                <div className="loading-spinner"></div>
                <p>Cargando información de clientes...</p>
            </div>
        );
    }

    return (
        <div className="admin-clientes-page">
            {/* Hero Section */}
            <section className="hero-Clientes-admin">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Administración de Clientes</h1>
                        <p>Gestiona y visualiza toda la información de tus clientes</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="admin-stats-section">
                <div className="stats-container">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                            <h3>{clientes.length}</h3>
                            <p>Total de Clientes</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📧</div>
                        <div className="stat-content">
                            <h3>{clientes.filter(c => c.email).length}</h3>
                            <p>Clientes con Email</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-content">
                            <h3>{new Date().getFullYear()}</h3>
                            <p>Año Actual</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Herramientas Section */}
            <section className="herramientas-section">
                <div className="herramientas-container">
                    <div className="search-bar">
                        <div className="search-icon">🔍</div>
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Buscar clientes por nombre, apellido o email..." 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    <div className="herramientas-derecha">
                        <div className="acciones-buttons">
                            <button className="btn-recargar" onClick={() => window.location.reload()}>
                                <span>🔄</span> Recargar
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabla Section */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>Lista de Clientes</h2>
                    <div className="title-line"></div>
                    <p>Gestiona y administra toda la información de tus clientes</p>
                </div>

                <div className="tabla-container">
                    <div className="tabla-responsive">
                        <table className="tabla-clientes">
                            <thead>
                                <tr>
                                    <th><span>ID</span></th>
                                    <th><span>Cliente</span></th>
                                    <th><span>Información de Contacto</span></th>
                                    <th><span>Fecha Registro</span></th>
                                    <th><span>Acciones</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesFiltrados.length > 0 ? (
                                    clientesFiltrados.map(cliente => (
                                        <tr key={cliente.id} className="fila-cliente">
                                            <td className="celda-id">{cliente.id}</td>
                                            <td>
                                                <div className="info-cliente">
                                                    <div className="avatar-mini">
                                                        {generarIniciales(cliente.nombre, cliente.apellido)}
                                                    </div>
                                                    <div className="info-texto">
                                                        <div className="nombre-completo">
                                                            {cliente.nombre} {cliente.apellido}
                                                        </div>
                                                        <div className="genero">
                                                            {cliente.genero || 'No especificado'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="info-contacto">
                                                    <div className="celda-email">
                                                        <span>📧</span> {cliente.email || 'No registrado'}
                                                    </div>
                                                    <div className="celda-telefono">
                                                        <span>📱</span> {cliente.telefono || 'No registrado'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="celda-fecha">
                                                    <span>📅</span> {formatearFecha(cliente.fechaRegistro)}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="acciones-grid">
                                                    <button 
                                                        onClick={() => handleVerDetalles(cliente)} 
                                                        className="btn-accion btn-ver"
                                                        title="Ver detalles"
                                                    >
                                                        👁️
                                                    </button>
                                                    <button 
                                                        className="btn-accion btn-email"
                                                        title="Enviar email"
                                                    >
                                                        ✉️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">
                                            <div className="no-resultados">
                                                <div>👥</div>
                                                <h3>No se encontraron clientes</h3>
                                                <p>{busqueda ? 'No hay clientes que coincidan con tu búsqueda' : 'No hay clientes registrados aún'}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {clientesFiltrados.length > 0 && (
                        <div className="resumen-tabla">
                            Mostrando {clientesFiltrados.length} de {clientes.length} clientes
                        </div>
                    )}
                </div>
            </section>

            {/* Modal de Detalles del Cliente */}
            {isModalVisible && clienteSeleccionado && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCerrarModal}>×</button>
                        <div className="modal-header">
                            <div className="usuario-avatar-large">
                                {generarIniciales(clienteSeleccionado.nombre, clienteSeleccionado.apellido)}
                            </div>
                            <div className="usuario-info-modal">
                                <h2>{clienteSeleccionado.nombre} {clienteSeleccionado.apellido}</h2>
                                <p className="usuario-email">{clienteSeleccionado.email || 'Email no registrado'}</p>
                                <div className="badges-container">
                                    <span className="estado-badge" style={{background: '#4caf50'}}>
                                        Activo
                                    </span>
                                    <span className="membresia-badge" style={{background: '#ffd500', color: '#2c2c2c'}}>
                                        Cliente
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="info-grid">
                                <div className="info-section">
                                    <h3>Información Personal</h3>
                                    <div className="info-item">
                                        <span>👤</span>
                                        <div>
                                            <strong>Nombre completo:</strong><br />
                                            {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span>⚤</span>
                                        <div>
                                            <strong>Género:</strong><br />
                                            {clienteSeleccionado.genero || 'No especificado'}
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span>🎂</span>
                                        <div>
                                            <strong>Fecha de nacimiento:</strong><br />
                                            {formatearFecha(clienteSeleccionado.fechaNacimiento)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="info-section">
                                    <h3>Información de Contacto</h3>
                                    <div className="info-item">
                                        <span>📧</span>
                                        <div>
                                            <strong>Email:</strong><br />
                                            {clienteSeleccionado.email || 'No registrado'}
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span>📱</span>
                                        <div>
                                            <strong>Teléfono:</strong><br />
                                            {clienteSeleccionado.telefono || 'No registrado'}
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span>📍</span>
                                        <div>
                                            <strong>Dirección:</strong><br />
                                            {clienteSeleccionado.direccion || 'No registrada'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="info-section">
                                    <h3>Información de la Cuenta</h3>
                                    <div className="info-item">
                                        <span>🆔</span>
                                        <div>
                                            <strong>ID de Cliente:</strong><br />
                                            {clienteSeleccionado.id}
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span>📅</span>
                                        <div>
                                            <strong>Fecha de registro:</strong><br />
                                            {formatearFecha(clienteSeleccionado.fechaRegistro)}
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <span>🔄</span>
                                        <div>
                                            <strong>Última actualización:</strong><br />
                                            {formatearFecha(clienteSeleccionado.fechaActualizacion)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-actions">
                                <button className="btn-primary">
                                    <span>✏️</span> Editar Cliente
                                </button>
                                <button className="btn-secondary">
                                    <span>✉️</span> Enviar Mensaje
                                </button>
                                <button className="btn-secondary">
                                    <span>📊</span> Ver Historial
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminClientesPage;