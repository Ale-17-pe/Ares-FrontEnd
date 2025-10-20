import React, { useState, useEffect } from 'react';
import { listarUsuarios } from '../services/usuarioService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faUserPlus,
    faSearch,
    faFilter,
    faEdit,
    faTrash,
    faEye,
    faEnvelope,
    faPhone,
    faCalendar,
    faVenusMars,
    faDumbbell,
    faCrown as faMember,
    faChartLine,
    faUsers,
    faPlus,
    faSync,
    faSort,
    faSortUp,
    faSortDown
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './AdminUsuariosPage.css';

function AdminUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todos');
    const [orden, setOrden] = useState({ campo: 'nombre', direccion: 'asc' });
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    // Datos de ejemplo como fallback
    const usuariosEjemplo = [
        {
            id: 1,
            nombre: "Juan",
            apellido: "Pérez",
            email: "juan.perez@email.com",
            telefono: "+51 987 654 321",
            fechaRegistro: "2024-01-15",
            membresia: "Premium",
            estado: "Activo",
            genero: "Masculino",
            ultimaVisita: "2024-12-19"
        },
        {
            id: 2,
            nombre: "María",
            apellido: "García",
            email: "maria.garcia@email.com",
            telefono: "+51 987 654 322",
            fechaRegistro: "2024-02-20",
            membresia: "VIP",
            estado: "Activo",
            genero: "Femenino",
            ultimaVisita: "2024-12-18"
        },
        {
            id: 3,
            nombre: "Carlos",
            apellido: "López",
            email: "carlos.lopez@email.com",
            telefono: "+51 987 654 323",
            fechaRegistro: "2024-03-10",
            membresia: "Básica",
            estado: "Inactivo",
            genero: "Masculino",
            ultimaVisita: "2024-11-15"
        },
        {
            id: 4,
            nombre: "Ana",
            apellido: "Rodríguez",
            email: "ana.rodriguez@email.com",
            telefono: "+51 987 654 324",
            fechaRegistro: "2024-04-05",
            membresia: "Premium",
            estado: "Activo",
            genero: "Femenino",
            ultimaVisita: "2024-12-19"
        },
        {
            id: 5,
            nombre: "Luis",
            apellido: "Martínez",
            email: "luis.martinez@email.com",
            telefono: "+51 987 654 325",
            fechaRegistro: "2024-05-12",
            membresia: "Básica",
            estado: "Activo",
            genero: "Masculino",
            ultimaVisita: "2024-12-17"
        },
        {
            id: 6,
            nombre: "Sofia",
            apellido: "Hernández",
            email: "sofia.hernandez@email.com",
            telefono: "+51 987 654 326",
            fechaRegistro: "2024-06-08",
            membresia: "VIP",
            estado: "Activo",
            genero: "Femenino",
            ultimaVisita: "2024-12-19"
        }
    ];

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                setLoading(true);
                const data = await listarUsuarios();
                if (data && data.length > 0) {
                    // Formatear los datos de la API
                    const usuariosFormateados = data.map(usuario => ({
                        id: usuario.id,
                        nombre: usuario.nombre || 'Usuario',
                        apellido: usuario.apellido || '',
                        email: usuario.email,
                        telefono: usuario.telefono || '+51 XXX XXX XXX',
                        fechaRegistro: usuario.fechaRegistro || new Date().toISOString().split('T')[0],
                        membresia: usuario.membresia || 'Básica',
                        estado: usuario.estado || 'Activo',
                        genero: usuario.genero || 'No especificado',
                        ultimaVisita: usuario.ultimaVisita || new Date().toISOString().split('T')[0]
                    }));
                    setUsuarios(usuariosFormateados);
                } else {
                    setUsuarios(usuariosEjemplo);
                }
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
                setUsuarios(usuariosEjemplo);
            } finally {
                setLoading(false);
            }
        };
        cargarUsuarios();
    }, []);

    // Filtrar y ordenar usuarios
    const usuariosFiltrados = usuarios
        .filter(usuario => {
            const coincideBusqueda = 
                usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                usuario.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
                usuario.email.toLowerCase().includes(busqueda.toLowerCase());
            
            const coincideFiltro = filtroActivo === 'todos' || 
                                (filtroActivo === 'activos' && usuario.estado === 'Activo') ||
                                (filtroActivo === 'inactivos' && usuario.estado === 'Inactivo') ||
                                (filtroActivo === 'premium' && usuario.membresia === 'Premium') ||
                                (filtroActivo === 'vip' && usuario.membresia === 'VIP') ||
                                (filtroActivo === 'basica' && usuario.membresia === 'Básica');

            return coincideBusqueda && coincideFiltro;
        })
        .sort((a, b) => {
            const campo = orden.campo;
            const valorA = a[campo]?.toString().toLowerCase() || '';
            const valorB = b[campo]?.toString().toLowerCase() || '';
            
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

    const abrirModalUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
    };

    const cerrarModal = () => {
        setUsuarioSeleccionado(null);
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getEstadoColor = (estado) => {
        return estado === 'Activo' ? '#28a745' : '#dc3545';
    };

    const getMembresiaColor = (membresia) => {
        const colores = {
            'Básica': '#7f7676',
            'Premium': '#ffd500',
            'VIP': '#ff6b6b'
        };
        return colores[membresia] || '#7f7676';
    };

    const recargarUsuarios = async () => {
        try {
            setLoading(true);
            const data = await listarUsuarios();
            if (data && data.length > 0) {
                setUsuarios(data);
            }
        } catch (error) {
            console.error("Error al recargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-usuarios-loading">
                <div className="loading-spinner"></div>
                <p>Cargando clientes...</p>
            </div>
        );
    }

    return (
        <div className="admin-usuarios-page">
            {/* Header */}
            <header className="main-header">
                <div className="header-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img src="/assets/Imagenes/logo.png" alt="Logo AresFitness" />
                        </Link>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><Link to="/ubicacion"><FontAwesomeIcon icon={faMapMarkerAlt} /> UBICACIÓN</Link></li>
                            <li><Link to="/ejercicios"><FontAwesomeIcon icon={faRunning} /> EJERCICIOS</Link></li>
                            <li><Link to="/membresias"><FontAwesomeIcon icon={faCrown} /> MEMBRESÍAS</Link></li>
                        </ul>
                    </nav>
                    <div className="header-actions">
                        <button className="user-btn">
                            <FontAwesomeIcon icon={faUser} /> Mi Cuenta
                        </button>
                        <div className="auth-dropdown">
                            <Link to="/login">
                                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
                            </Link>
                            <Link to="/registro">
                                <FontAwesomeIcon icon={faUserPlus} /> Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-admin">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>PANEL DE CLIENTES</h1>
                        <p>Gestiona y administra todos los miembros de AresFitness</p>
                    </div>
                </div>
            </section>

            {/* Estadísticas Rápidas */}
            <section className="admin-stats-section">
                <div className="stats-container">
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{usuarios.length}</h3>
                            <p>Total Clientes</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faDumbbell} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{usuarios.filter(u => u.estado === 'Activo').length}</h3>
                            <p>Clientes Activos</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faMember} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{usuarios.filter(u => u.membresia === 'Premium' || u.membresia === 'VIP').length}</h3>
                            <p>Membresías Premium</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faChartLine} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{usuarios.filter(u => new Date(u.ultimaVisita) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</h3>
                            <p>Activos esta semana</p>
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
                            placeholder="Buscar clientes por nombre, apellido o email..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    
                    <div className="herramientas-derecha">
                        <div className="filtro-buttons">
                            {[
                                { id: 'todos', label: 'Todos', icon: faFilter },
                                { id: 'activos', label: 'Activos', icon: faDumbbell },
                                { id: 'inactivos', label: 'Inactivos', icon: faUser },
                                { id: 'premium', label: 'Premium', icon: faCrown },
                                { id: 'vip', label: 'VIP', icon: faMember },
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
                            <button className="btn-recargar" onClick={recargarUsuarios}>
                                <FontAwesomeIcon icon={faSync} />
                                Recargar
                            </button>
                            <button className="btn-nuevo">
                                <FontAwesomeIcon icon={faPlus} />
                                Nuevo Cliente
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabla de Usuarios */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>LISTA DE CLIENTES</h2>
                    <div className="title-line"></div>
                    <p>Gestiona la información de todos los miembros registrados</p>
                </div>

                <div className="tabla-container">
                    {usuariosFiltrados.length > 0 ? (
                        <div className="tabla-responsive">
                            <table className="tabla-usuarios">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleOrdenar('id')}>
                                            <span>ID</span>
                                            <FontAwesomeIcon icon={getIconoOrden('id')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('nombre')}>
                                            <span>Nombre Completo</span>
                                            <FontAwesomeIcon icon={getIconoOrden('nombre')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('email')}>
                                            <span>Email</span>
                                            <FontAwesomeIcon icon={getIconoOrden('email')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('telefono')}>
                                            <span>Teléfono</span>
                                            <FontAwesomeIcon icon={getIconoOrden('telefono')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('membresia')}>
                                            <span>Membresía</span>
                                            <FontAwesomeIcon icon={getIconoOrden('membresia')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('estado')}>
                                            <span>Estado</span>
                                            <FontAwesomeIcon icon={getIconoOrden('estado')} />
                                        </th>
                                        <th onClick={() => handleOrdenar('fechaRegistro')}>
                                            <span>Fecha Registro</span>
                                            <FontAwesomeIcon icon={getIconoOrden('fechaRegistro')} />
                                        </th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuariosFiltrados.map(usuario => (
                                        <tr key={usuario.id} className="fila-usuario">
                                            <td className="celda-id">#{usuario.id}</td>
                                            <td className="celda-nombre">
                                                <div className="info-usuario">
                                                    <div className="avatar-mini">
                                                        {usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="nombre-completo">
                                                            {usuario.nombre} {usuario.apellido}
                                                        </div>
                                                        <div className="genero">
                                                            <FontAwesomeIcon icon={faVenusMars} />
                                                            {usuario.genero}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="celda-email">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                                {usuario.email}
                                            </td>
                                            <td className="celda-telefono">
                                                <FontAwesomeIcon icon={faPhone} />
                                                {usuario.telefono}
                                            </td>
                                            <td className="celda-membresia">
                                                <span 
                                                    className="badge-membresia"
                                                    style={{ backgroundColor: getMembresiaColor(usuario.membresia) }}
                                                >
                                                    {usuario.membresia}
                                                </span>
                                            </td>
                                            <td className="celda-estado">
                                                <span 
                                                    className="badge-estado"
                                                    style={{ backgroundColor: getEstadoColor(usuario.estado) }}
                                                >
                                                    {usuario.estado}
                                                </span>
                                            </td>
                                            <td className="celda-fecha">
                                                <FontAwesomeIcon icon={faCalendar} />
                                                {formatearFecha(usuario.fechaRegistro)}
                                            </td>
                                            <td className="celda-acciones">
                                                <div className="acciones-grid">
                                                    <button 
                                                        className="btn-accion btn-ver"
                                                        onClick={() => abrirModalUsuario(usuario)}
                                                        title="Ver detalles"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                    <button 
                                                        className="btn-accion btn-editar"
                                                        title="Editar usuario"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button 
                                                        className="btn-accion btn-eliminar"
                                                        title="Eliminar usuario"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    <button 
                                                        className="btn-accion btn-email"
                                                        title="Enviar email"
                                                    >
                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-resultados">
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                            <h3>No se encontraron clientes</h3>
                            <p>Intenta con otros términos de búsqueda o selecciona otro filtro</p>
                        </div>
                    )}
                </div>

                {/* Resumen */}
                <div className="resumen-tabla">
                    <p>
                        Mostrando <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> clientes
                    </p>
                </div>
            </section>

            {/* Modal de Detalles */}
            {usuarioSeleccionado && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={cerrarModal}>×</button>
                        
                        <div className="modal-header">
                            <div className="usuario-avatar-large">
                                {usuarioSeleccionado.nombre.charAt(0)}{usuarioSeleccionado.apellido.charAt(0)}
                            </div>
                            <div className="usuario-info-modal">
                                <h2>{usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}</h2>
                                <p className="usuario-email">{usuarioSeleccionado.email}</p>
                                <div className="badges-container">
                                    <div 
                                        className="estado-badge"
                                        style={{ backgroundColor: getEstadoColor(usuarioSeleccionado.estado) }}
                                    >
                                        {usuarioSeleccionado.estado}
                                    </div>
                                    <div 
                                        className="membresia-badge"
                                        style={{ backgroundColor: getMembresiaColor(usuarioSeleccionado.membresia) }}
                                    >
                                        {usuarioSeleccionado.membresia}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="info-grid">
                                <div className="info-section">
                                    <h3>Información Personal</h3>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <span>{usuarioSeleccionado.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faPhone} />
                                        <span>{usuarioSeleccionado.telefono}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faVenusMars} />
                                        <span>{usuarioSeleccionado.genero}</span>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h3>Información de Membresía</h3>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faMember} />
                                        <span>{usuarioSeleccionado.membresia}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faCalendar} />
                                        <span>Registro: {formatearFecha(usuarioSeleccionado.fechaRegistro)}</span>
                                    </div>
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faDumbbell} />
                                        <span>Última visita: {formatearFecha(usuarioSeleccionado.ultimaVisita)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="btn-primary">
                                    <FontAwesomeIcon icon={faEdit} /> Editar Cliente
                                </button>
                                <button className="btn-secondary">
                                    <FontAwesomeIcon icon={faEnvelope} /> Enviar Email
                                </button>
                                <button className="btn-danger">
                                    <FontAwesomeIcon icon={faTrash} /> Eliminar Cliente
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
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/membresias">Planes</Link></li>
                            <li><Link to="/ubicacion">Ubicación</Link></li>
                            <li><Link to="/ejercicios">Ejercicios</Link></li>
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
                    <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminUsuariosPage;