import React, { useState, useEffect } from 'react';
import { listarUsuarios, eliminarUsuario } from '../services/usuarioService';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/Imagenes/logo.png';
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
    faSortDown,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import './css/AdminUsuariosPage.css';

function AdminUsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todos');
    const [orden, setOrden] = useState({ campo: 'nombre', direccion: 'asc' });
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [modalNuevoUsuario, setModalNuevoUsuario] = useState(false);
    const navigate = useNavigate();

    // Estado para nuevo usuario
    const [nuevoUsuario, setNuevoUsuario] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        genero: 'Masculino',
        rol: 'CLIENTE',
        membresia: 'Básica',
        estado: 'Activo'
    });

    // Datos de ejemplo como fallback
    const usuariosEjemplo = [
        {
            id: 1,
            nombre: "Juan",
            apellido: "Pérez",
            email: "juan.perez@email.com",
            telefono: "+51 987 654 321",
            direccion: "Av. Principal 123",
            fechaNacimiento: "1990-05-15",
            fechaRegistro: "2024-01-15",
            membresia: "Premium",
            estado: "Activo",
            genero: "Masculino",
            rol: "CLIENTE",
            ultimaVisita: "2024-12-19"
        },
        {
            id: 2,
            nombre: "María",
            apellido: "García",
            email: "maria.garcia@email.com",
            telefono: "+51 987 654 322",
            direccion: "Calle Secundaria 456",
            fechaNacimiento: "1992-08-20",
            fechaRegistro: "2024-02-20",
            membresia: "VIP",
            estado: "Activo",
            genero: "Femenino",
            rol: "CLIENTE",
            ultimaVisita: "2024-12-18"
        },
        {
            id: 3,
            nombre: "Carlos",
            apellido: "López",
            email: "carlos.lopez@email.com",
            telefono: "+51 987 654 323",
            direccion: "Jr. Los Olivos 789",
            fechaNacimiento: "1985-03-10",
            fechaRegistro: "2024-03-10",
            membresia: "Básica",
            estado: "Inactivo",
            genero: "Masculino",
            rol: "CLIENTE",
            ultimaVisita: "2024-11-15"
        },
        {
            id: 4,
            nombre: "Ana",
            apellido: "Rodríguez",
            email: "ana.rodriguez@email.com",
            telefono: "+51 987 654 324",
            direccion: "Av. Libertad 321",
            fechaNacimiento: "1988-11-05",
            fechaRegistro: "2024-04-05",
            membresia: "Premium",
            estado: "Activo",
            genero: "Femenino",
            rol: "RECEPCIONISTA",
            ultimaVisita: "2024-12-19"
        }
    ];

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                setLoading(true);
                const data = await listarUsuarios();
                if (data && data.length > 0) {
                    const usuariosFormateados = data.map(usuario => ({
                        id: usuario.id,
                        nombre: usuario.nombre || 'Usuario',
                        apellido: usuario.apellido || '',
                        email: usuario.email,
                        telefono: usuario.telefono || '+51 XXX XXX XXX',
                        direccion: usuario.direccion || '',
                        fechaNacimiento: usuario.fechaNacimiento || '',
                        fechaRegistro: usuario.fechaRegistro || new Date().toISOString().split('T')[0],
                        genero: usuario.genero || 'No especificado',
                        membresia: usuario.membresia || 'Básica',
                        estado: usuario.activo ? 'Activo' : 'Inactivo',
                        rol: usuario.role || 'CLIENTE',
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

            const coincideFiltro =
                filtroActivo === 'todos' ||
                (filtroActivo === 'activos' && usuario.estado === 'Activo') ||
                (filtroActivo === 'inactivos' && usuario.estado === 'Inactivo') ||
                (filtroActivo === 'premium' && usuario.membresia === 'Premium') ||
                (filtroActivo === 'vip' && usuario.membresia === 'VIP') ||
                (filtroActivo === 'basica' && usuario.membresia === 'Básica') ||
                (filtroActivo === 'cliente' && usuario.rol === 'CLIENTE') ||
                (filtroActivo === 'recepcionista' && usuario.rol === 'RECEPCIONISTA');

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
        if (!fecha) return 'No especificado';
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
            'Básica': '#6c757d',
            'Premium': '#ffc107',
            'VIP': '#dc3545'
        };
        return colores[membresia] || '#6c757d';
    };

    const recargarUsuarios = async () => {
        try {
            setLoading(true);
            const data = await listarUsuarios();
            if (data && data.length > 0) {
                const usuariosFormateados = data.map(usuario => ({
                    id: usuario.id,
                    nombre: usuario.nombre || 'Usuario',
                    apellido: usuario.apellido || '',
                    email: usuario.email,
                    telefono: usuario.telefono || '+51 XXX XXX XXX',
                    direccion: usuario.direccion || '',
                    fechaNacimiento: usuario.fechaNacimiento || '',
                    fechaRegistro: usuario.fechaRegistro || new Date().toISOString().split('T')[0],
                    genero: usuario.genero || 'No especificado',
                    membresia: usuario.membresia || 'Básica',
                    estado: usuario.activo ? 'Activo' : 'Inactivo',
                    rol: usuario.role || 'CLIENTE',
                    ultimaVisita: usuario.ultimaVisita || new Date().toISOString().split('T')[0]
                }));
                setUsuarios(usuariosFormateados);
            }
        } catch (error) {
            console.error("Error al recargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
        try {
            await eliminarUsuario(id);
            setUsuarios(prev => prev.filter(u => u.id !== id));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("Error al eliminar usuario");
        }
    };

    const handleNuevoUsuarioChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleCrearUsuario = async (e) => {
        e.preventDefault();
        try {
            // En un entorno real, aquí llamarías a tu API
            const usuarioCreado = {
                id: Math.max(...usuarios.map(u => u.id)) + 1,
                ...nuevoUsuario,
                fechaRegistro: new Date().toISOString().split('T')[0],
                ultimaVisita: new Date().toISOString().split('T')[0]
            };

            setUsuarios(prev => [...prev, usuarioCreado]);
            setModalNuevoUsuario(false);
            setNuevoUsuario({
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                direccion: '',
                fechaNacimiento: '',
                genero: 'Masculino',
                rol: 'CLIENTE',
                membresia: 'Básica',
                estado: 'Activo'
            });
            alert("Usuario creado exitosamente");
        } catch (error) {
            console.error("Error al crear usuario:", error);
            alert("Error al crear usuario");
        }
    };

    const handleEditarUsuario = (id) => {
        navigate(`/admin/usuarios/editar/${id}`);
    };

    if (loading) {
        return (
            <div className="admin-usuarios-loading">
                <div className="loading-spinner"></div>
                <p>Cargando Usuarios...</p>
            </div>
        );
    }

    return (
        <div className="admin-usuarios-page">
            {/* Header */}


            {/* Hero Section */}
            <section className="hero-admin">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>PANEL DE USUARIOS</h1>
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
                            <p>Total Usuarios</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FontAwesomeIcon icon={faDumbbell} className="stat-icon" />
                        <div className="stat-content">
                            <h3>{usuarios.filter(u => u.estado === 'Activo').length}</h3>
                            <p>Usuarios Activos</p>
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
                            placeholder="Buscar usuarios por nombre, apellido o email..."
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
                                { id: 'basica', label: 'Básica', icon: faUser },
                                { id: 'cliente', label: 'Clientes', icon: faUser },
                                { id: 'recepcionista', label: 'Recepcionistas', icon: faUser }
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
                            <button
                                className="btn-nuevo"
                                onClick={() => setModalNuevoUsuario(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Nuevo Usuario
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabla de Usuarios */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>LISTA DE USUARIOS</h2>
                    <div className="title-line"></div>
                    <p>Gestiona la información de todos los usuarios registrados</p>
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
                                        <th onClick={() => handleOrdenar('rol')}>
                                            <span>Rol</span>
                                            <FontAwesomeIcon icon={getIconoOrden('rol')} />
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
                                            <td className="celda-rol">
                                                <span className="badge-rol">
                                                    {usuario.rol}
                                                </span>
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
                                                        onClick={() => handleEditarUsuario(usuario.id)}
                                                        title="Editar usuario"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        className="btn-accion btn-eliminar"
                                                        onClick={() => handleEliminar(usuario.id)}
                                                        title="Eliminar usuario"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
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
                            <h3>No se encontraron usuarios</h3>
                            <p>Intenta con otros términos de búsqueda o selecciona otro filtro</p>
                        </div>
                    )}
                </div>

                {/* Resumen */}
                <div className="resumen-tabla">
                    <p>
                        Mostrando <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> usuarios
                    </p>
                </div>
            </section>

            {/* Modal de Detalles de Usuario */}
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
                                    <span
                                        className="estado-badge"
                                        style={{ backgroundColor: getEstadoColor(usuarioSeleccionado.estado) }}
                                    >
                                        {usuarioSeleccionado.estado}
                                    </span>
                                    <span
                                        className="membresia-badge"
                                        style={{ backgroundColor: getMembresiaColor(usuarioSeleccionado.membresia) }}
                                    >
                                        {usuarioSeleccionado.membresia}
                                    </span>
                                    <span className="rol-badge">
                                        {usuarioSeleccionado.rol}
                                    </span>
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
                                    <div className="info-item">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        <span>{usuarioSeleccionado.direccion || 'No especificada'}</span>
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
                                    {usuarioSeleccionado.fechaNacimiento && (
                                        <div className="info-item">
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span>Nacimiento: {formatearFecha(usuarioSeleccionado.fechaNacimiento)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    className="btn-primary"
                                    onClick={() => handleEditarUsuario(usuarioSeleccionado.id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Editar Usuario
                                </button>
                                <button className="btn-secondary">
                                    <FontAwesomeIcon icon={faEnvelope} /> Enviar Email
                                </button>
                                <button
                                    className="btn-danger"
                                    onClick={() => handleEliminar(usuarioSeleccionado.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Eliminar Usuario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Crear Nuevo Usuario */}
            {modalNuevoUsuario && (
                <div className="modal-overlay" onClick={() => setModalNuevoUsuario(false)}>
                    <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setModalNuevoUsuario(false)}>×</button>
                        <h2>Crear Nuevo Usuario</h2>

                        <form onSubmit={handleCrearUsuario} className="form-nuevo-usuario">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nombre *</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={nuevoUsuario.nombre}
                                        onChange={handleNuevoUsuarioChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido *</label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        value={nuevoUsuario.apellido}
                                        onChange={handleNuevoUsuarioChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={nuevoUsuario.email}
                                        onChange={handleNuevoUsuarioChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>DNI *</label>
                                    <input
                                        type="text"
                                        name="dni"
                                        placeholder="Ingrese DNI"
                                        value={nuevoUsuario.dni}
                                        onChange={handleNuevoUsuarioChange}
                                        maxLength="8"
                                        pattern="\d{8}"
                                        title="Debe contener exactamente 8 dígitos numéricos"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <input
                                        type="text"
                                        name="telefono"
                                        value={nuevoUsuario.telefono}
                                        onChange={handleNuevoUsuarioChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dirección</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        value={nuevoUsuario.direccion}
                                        onChange={handleNuevoUsuarioChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha de nacimiento</label>
                                    <input
                                        type="date"
                                        name="fechaNacimiento"
                                        value={nuevoUsuario.fechaNacimiento}
                                        onChange={handleNuevoUsuarioChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Género</label>
                                    <select
                                        name="genero"
                                        value={nuevoUsuario.genero}
                                        onChange={handleNuevoUsuarioChange}
                                    >
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                        <option value="No especificado">No especificado</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <select
                                        name="rol"
                                        value={nuevoUsuario.rol}
                                        onChange={handleNuevoUsuarioChange}
                                    >
                                        <option value="CLIENTE">Cliente</option>
                                        <option value="RECEPCIONISTA">Recepcionista</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Membresía</label>
                                    <select
                                        name="membresia"
                                        value={nuevoUsuario.membresia}
                                        onChange={handleNuevoUsuarioChange}
                                    >
                                        <option value="Básica">Básica</option>
                                        <option value="Premium">Premium</option>
                                        <option value="VIP">VIP</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        name="estado"
                                        value={nuevoUsuario.estado}
                                        onChange={handleNuevoUsuarioChange}
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn-cancelar"
                                    onClick={() => setModalNuevoUsuario(false)}
                                >
                                    <FontAwesomeIcon icon={faTimes} /> Cancelar
                                </button>
                                <button type="submit" className="btn-primary">
                                    <FontAwesomeIcon icon={faPlus} /> Crear Usuario
                                </button>
                            </div>
                        </form>
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
            </footer>
        </div>
    );
}

export default AdminUsuariosPage;