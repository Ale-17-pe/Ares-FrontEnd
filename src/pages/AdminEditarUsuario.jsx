import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerUsuarioPorId, actualizarUsuario } from '../services/usuarioService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/Imagenes/logo.png';
import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faUserPlus,
    faArrowLeft,
    faSave,
    faTimes,
    faSync,
    faEnvelope,
    faPhone,
    faCalendar,
    faVenusMars,
    faDumbbell,
    faCrown as faMember,
    faIdCard,
    faHome,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import './css/AdminEditarUsuario.css';

function AdminEditarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        genero: 'Masculino',
        rol: 'CLIENTE',
        membresia: 'Básica',
        estado: 'Activo',
        fechaRegistro: '',
        ultimaVisita: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Datos de ejemplo como fallback
    const usuarioEjemplo = {
        id: parseInt(id),
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@email.com",
        telefono: "+51 987 654 321",
        direccion: "Av. Principal 123, Lima, Perú",
        fechaNacimiento: "1990-05-15",
        fechaRegistro: "2024-01-15",
        genero: "Masculino",
        membresia: "Premium",
        estado: "Activo",
        rol: "CLIENTE",
        ultimaVisita: "2024-12-19"
    };

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                setLoading(true);
                const data = await obtenerUsuarioPorId(id);

                if (data) {
                    const usuarioData = {
                        nombre: data.nombre || '',
                        apellido: data.apellido || '',
                        email: data.email || '',
                        telefono: data.telefono || '',
                        direccion: data.direccion || '',
                        fechaNacimiento: data.fechaNacimiento || '',
                        genero: data.genero || 'Masculino',
                        rol: data.role || 'CLIENTE',
                        membresia: data.membresia || 'Básica',
                        estado: data.activo ? 'Activo' : 'Inactivo',
                        fechaRegistro: data.fechaRegistro || '',
                        ultimaVisita: data.ultimaVisita || ''
                    };

                    setUsuario(data);
                    setFormData(usuarioData);
                } else {
                    setUsuario(usuarioEjemplo);
                    setFormData({
                        nombre: usuarioEjemplo.nombre,
                        apellido: usuarioEjemplo.apellido,
                        email: usuarioEjemplo.email,
                        telefono: usuarioEjemplo.telefono,
                        direccion: usuarioEjemplo.direccion,
                        fechaNacimiento: usuarioEjemplo.fechaNacimiento,
                        genero: usuarioEjemplo.genero,
                        rol: usuarioEjemplo.role,
                        membresia: usuarioEjemplo.membresia,
                        estado: usuarioEjemplo.activo ? 'Activo' : 'Inactivo'
                    });
                }
            } catch (error) {
                console.error("Error al cargar usuario:", error);
                setUsuario(usuarioEjemplo);
                setFormData({
                    nombre: usuarioEjemplo.nombre,
                    apellido: usuarioEjemplo.apellido,
                    email: usuarioEjemplo.email,
                    telefono: usuarioEjemplo.telefono,
                    direccion: usuarioEjemplo.direccion,
                    fechaNacimiento: usuarioEjemplo.fechaNacimiento,
                    genero: usuarioEjemplo.genero,
                    rol: usuarioEjemplo.role,
                    membresia: usuarioEjemplo.membresia,
                    estado: usuarioEjemplo.activo ? 'Activo' : 'Inactivo'
                });
            } finally {
                setLoading(false);
            }
        };

        cargarUsuario();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        } else if (formData.nombre.trim().length < 2) {
            newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
        }

        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es obligatorio';
        } else if (formData.apellido.trim().length < 2) {
            newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (formData.telefono && !/^\+?[\d\s-()]+$/.test(formData.telefono)) {
            newErrors.telefono = 'El formato del teléfono no es válido';
        }

        if (formData.fechaNacimiento) {
            const fechaNacimiento = new Date(formData.fechaNacimiento);
            const hoy = new Date();
            const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

            if (fechaNacimiento > hoy) {
                newErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser futura';
            } else if (edad < 16) {
                newErrors.fechaNacimiento = 'El usuario debe tener al menos 16 años';
            } else if (edad > 100) {
                newErrors.fechaNacimiento = 'Por favor verifica la fecha de nacimiento';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


   const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setSaving(true);
            
            // Preparar datos para la API
            const datosActualizacion = {
                nombre: formData.nombre.trim(),
                apellido: formData.apellido.trim(),
                email: formData.email.trim(),
                telefono: formData.telefono.trim(),
                direccion: formData.direccion.trim(),
                fechaNacimiento: formData.fechaNacimiento,
                genero: formData.genero,
                role: formData.rol,
                membresia: formData.membresia,
                activo: formData.estado === 'Activo'
            };

            await actualizarUsuario(id, datosActualizacion);
            
            setSuccessMessage('¡Usuario actualizado exitosamente!');
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/admin/usuarios');
            }, 2000);
            
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            let errorMessage = 'Error al actualizar el usuario. Intente nuevamente.';
            
            if (error.response) {
                // Error de la API
                if (error.response.status === 400) {
                    errorMessage = 'Datos inválidos. Por favor verifica la información.';
                } else if (error.response.status === 409) {
                    errorMessage = 'El email ya está en uso por otro usuario.';
                } else if (error.response.status === 404) {
                    errorMessage = 'Usuario no encontrado.';
                }
            }
            
            setErrors({ submit: errorMessage });
        } finally {
            setSaving(false);
        }
    };


    const handleReset = () => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre || '',
                apellido: usuario.apellido || '',
                email: usuario.email || '',
                telefono: usuario.telefono || '',
                direccion: usuario.direccion || '',
                fechaNacimiento: usuario.fechaNacimiento || '',
                genero: usuario.genero || 'Masculino',
                rol: usuario.role || 'CLIENTE',
                membresia: usuario.membresia || 'Básica',
                estado: usuario.activo ? 'Activo' : 'Inactivo',
                fechaRegistro: usuario.fechaRegistro || '',
                ultimaVisita: usuario.ultimaVisita || ''
            });
        }
        setErrors({});
        setSuccessMessage('');
    };

    const getMembresiaColor = (membresia) => {
        const colores = {
            'Básica': '#6c757d',
            'Premium': '#ffc107',
            'VIP': '#dc3545'
        };
        return colores[membresia] || '#6c757d';
    };

    const getEstadoColor = (estado) => {
        return estado === 'Activo' ? '#28a745' : '#dc3545';
    };

    if (loading) {
        return (
            <div className="admin-editar-loading">
                <div className="loading-spinner"></div>
                <p>Cargando información del usuario...</p>
            </div>
        );
    }

    return (
        <div className="admin-editar-page">
            {/* Header */}
            <header className="main-header">
                <div className="header-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img src={logo} alt="Logo AresFitness" />
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
                        <button className="user-btn"><FontAwesomeIcon icon={faUser} /> Mi Cuenta</button>
                        <div className="auth-dropdown">
                            <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión</Link>
                            <Link to="/registro"><FontAwesomeIcon icon={faUserPlus} /> Registrarse</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-editar">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>EDITAR USUARIO</h1>
                        <p>Actualiza la información del miembro #{id}</p>
                    </div>
                </div>
            </section>

            {/* Breadcrumb y Controles */}
            <section className="control-section">
                <div className="control-container">
                    <div className="breadcrumb">
                        <Link to="/admin/usuarios" className="breadcrumb-link">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Volver a Usuarios
                        </Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">Editar Usuario #{id}</span>
                    </div>

                    <div className="user-quick-info">
                        <div className="user-avatar">
                            {usuario?.nombre?.charAt(0)}{usuario?.apellido?.charAt(0)}
                        </div>
                        <div className="user-details">
                            <h3>{usuario?.nombre} {usuario?.apellido}</h3>
                            <div className="user-badges">
                                <span
                                    className="badge membresia-badge"
                                    style={{ backgroundColor: getMembresiaColor(usuario?.membresia) }}
                                >
                                    {usuario?.membresia}
                                </span>
                                <span
                                    className="badge estado-badge"
                                    style={{ backgroundColor: getEstadoColor(usuario?.estado) }}
                                >
                                    {usuario?.estado}
                                </span>
                                <span className="badge rol-badge">
                                    {usuario?.rol}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulario de Edición */}
            <section className="form-section">
                <div className="form-container">
                    {successMessage && (
                        <div className="success-message">
                            <FontAwesomeIcon icon={faSave} />
                            {successMessage}
                        </div>
                    )}

                    {errors.submit && (
                        <div className="error-message">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="editar-usuario-form">
                        <div className="form-grid">
                            {/* Información Personal */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <FontAwesomeIcon icon={faIdCard} />
                                    <h3>Información Personal</h3>
                                </div>
                                <div className="form-fields">
                                    <div className="form-group">
                                        <label htmlFor="nombre">
                                            Nombre *
                                            {errors.nombre && <span className="error-text"> - {errors.nombre}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            className={errors.nombre ? 'error' : ''}
                                            placeholder="Ingrese el nombre"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="apellido">
                                            Apellido *
                                            {errors.apellido && <span className="error-text"> - {errors.apellido}</span>}
                                        </label>
                                        <input
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            value={formData.apellido}
                                            onChange={handleInputChange}
                                            className={errors.apellido ? 'error' : ''}
                                            placeholder="Ingrese el apellido"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email *
                                            {errors.email && <span className="error-text"> - {errors.email}</span>}
                                        </label>
                                        <div className="input-with-icon">
                                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={errors.email ? 'error' : ''}
                                                placeholder="usuario@ejemplo.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="telefono">
                                            Teléfono
                                            {errors.telefono && <span className="error-text"> - {errors.telefono}</span>}
                                        </label>
                                        <div className="input-with-icon">
                                            <FontAwesomeIcon icon={faPhone} className="input-icon" />
                                            <input
                                                type="text"
                                                id="telefono"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                className={errors.telefono ? 'error' : ''}
                                                placeholder="+51 XXX XXX XXX"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="genero">Género</label>
                                        <select
                                            id="genero"
                                            name="genero"
                                            value={formData.genero}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Otro">Otro</option>
                                            <option value="No especificado">No especificado</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fechaNacimiento">
                                            Fecha de Nacimiento
                                            {errors.fechaNacimiento && <span className="error-text"> - {errors.fechaNacimiento}</span>}
                                        </label>
                                        <div className="input-with-icon">
                                            <FontAwesomeIcon icon={faCalendar} className="input-icon" />
                                            <input
                                                type="date"
                                                id="fechaNacimiento"
                                                name="fechaNacimiento"
                                                value={formData.fechaNacimiento}
                                                onChange={handleInputChange}
                                                className={errors.fechaNacimiento ? 'error' : ''}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Dirección */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <FontAwesomeIcon icon={faHome} />
                                    <h3>Información de Dirección</h3>
                                </div>
                                <div className="form-fields">
                                    <div className="form-group full-width">
                                        <label htmlFor="direccion">Dirección</label>
                                        <div className="input-with-icon">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
                                            <input
                                                type="text"
                                                id="direccion"
                                                name="direccion"
                                                value={formData.direccion}
                                                onChange={handleInputChange}
                                                placeholder="Ingrese la dirección completa"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Configuración de Cuenta */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <FontAwesomeIcon icon={faShieldAlt} />
                                    <h3>Configuración de Cuenta</h3>
                                </div>
                                <div className="form-fields">
                                    <div className="form-group">
                                        <label htmlFor="rol">Rol del Usuario</label>
                                        <select
                                            id="rol"
                                            name="rol"
                                            value={formData.rol}
                                            onChange={handleInputChange}
                                        >
                                            <option value="CLIENTE">Cliente</option>
                                            <option value="RECEPCIONISTA">Recepcionista</option>
                                            <option value="ADMIN">Administrador</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="membresia">Tipo de Membresía</label>
                                        <select
                                            id="membresia"
                                            name="membresia"
                                            value={formData.membresia}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Básica">Básica</option>
                                            <option value="Premium">Premium</option>
                                            <option value="VIP">VIP</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="estado">Estado de la Cuenta</label>
                                        <select
                                            id="estado"
                                            name="estado"
                                            value={formData.estado}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Activo">Activo</option>
                                            <option value="Inactivo">Inactivo</option>
                                            <option value="Suspendido">Suspendido</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Información del Sistema */}
                            <div className="form-section-card">
                                <div className="section-header">
                                    <FontAwesomeIcon icon={faDumbbell} />
                                    <h3>Información del Sistema</h3>
                                </div>
                                <div className="form-fields readonly-fields">
                                    <div className="form-group">
                                        <label>Fecha de Registro</label>
                                        <div className="readonly-field">
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span>
                                                {formData.fechaRegistro ?
                                                    new Date(formData.fechaRegistro).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) :
                                                    'No disponible'
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Última Visita</label>
                                        <div className="readonly-field">
                                            <FontAwesomeIcon icon={faDumbbell} />
                                            <span>
                                                {formData.ultimaVisita ?
                                                    new Date(formData.ultimaVisita).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) :
                                                    'No registrada'
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>ID de Usuario</label>
                                        <div className="readonly-field">
                                            <FontAwesomeIcon icon={faIdCard} />
                                            <span>#{id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Acciones del Formulario */}
                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleReset}
                                disabled={saving}
                            >
                                <FontAwesomeIcon icon={faSync} />
                                Restablecer
                            </button>

                            <button
                                type="button"
                                className="btn btn-cancel"
                                onClick={() => navigate('/admin/usuarios')}
                                disabled={saving}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={saving}
                            >
                                <FontAwesomeIcon icon={faSave} />
                                {saving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

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

export default AdminEditarUsuario;