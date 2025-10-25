import React, { useState } from 'react';
import { registrarCliente } from '../services/usuarioService';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";
import icono from "../assets/Imagenes/usuario.png";
import {
    faUser,
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
    faIdCard,
    faPhone,
    faMapMarkerAlt,
    faCalendarAlt,
    faVenusMars,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './css/RegistroPage.css';

function RegistroPage() {
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        dni: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        genero: '',
        password: '',
        confirmPassword: '',
        aceptaPromociones: false
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
        // Limpiar errores cuando el usuario empiece a escribir
        if (error) setError('');
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!usuario.nombre.trim() || !usuario.apellido.trim() || !usuario.dni.trim()) {
                    setError('Por favor completa todos los campos personales');
                    return false;
                }
                if (usuario.dni.length !== 8) {
                    setError('El DNI debe tener 8 dígitos');
                    return false;
                }
                return true;
            case 2:
                if (!usuario.email.trim() || !usuario.telefono.trim() || !usuario.direccion.trim()) {
                    setError('Por favor completa todos los campos de contacto');
                    return false;
                }
                if (!/\S+@\S+\.\S+/.test(usuario.email)) {
                    setError('Por favor ingresa un email válido');
                    return false;
                }
                return true;
            case 3:
                if (!usuario.fechaNacimiento || !usuario.genero) {
                    setError('Por favor completa todos los campos personales');
                    return false;
                }
                // Validar edad mínima (18 años)
                const birthDate = new Date(usuario.fechaNacimiento);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 18) {
                    setError('Debes ser mayor de 18 años para registrarte');
                    return false;
                }
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            setError('');
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones finales
        if (usuario.password !== usuario.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (usuario.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (!acceptTerms) {
            setError('Debes aceptar los términos y condiciones');
            return;
        }

        setLoading(true);
        try {
            const usuarioParaEnviar = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                dni: usuario.dni,
                email: usuario.email,
                password: usuario.password,
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                fechaNacimiento: usuario.fechaNacimiento,
                sexo: usuario.genero,
            };

            await registrarCliente(usuarioParaEnviar);
            setSuccess('¡Usuario registrado correctamente! Redirigiendo...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.error || 'Error al registrar usuario');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Indicador de progreso
    const ProgressBar = () => (
        <div className="registro-progress">
            <div className="progress-steps">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
                        <div className="step-number">{step}</div>
                        <div className="step-label">
                            {step === 1 && 'Personal'}
                            {step === 2 && 'Contacto'}
                            {step === 3 && 'Detalles'}
                            {step === 4 && 'Seguridad'}
                        </div>
                    </div>
                ))}
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${(currentStep - 1) * 33.33}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="registro-page">
            {/* Header con Logo */}
            <header className="registro-header">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="Ares Fitness" />
                    </Link>
                </div>
            </header>

            <div className="registro-main-wrapper">
                <div className="registro-container">
                    <div className="registro-form-content">
                        {/* Icono de Usuario */}
                        <div className="registro-user-icon">
                            <img src={icono} alt="Icono de usuario" />
                        </div>

                        {/* Título y Subtítulo */}
                        <div className="registro-header-content">
                            <h1 className="registro-title">CREAR CUENTA</h1>
                            <p className="registro-subtitle">Únete a nuestra comunidad fitness</p>
                        </div>

                        {/* Barra de Progreso */}
                        <ProgressBar />

                        {/* Mensajes de Estado */}
                        {error && (
                            <div className="registro-error-message">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="registro-success-message">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} autoComplete="off">
                            {/* Paso 1: Información Personal */}
                            {currentStep === 1 && (
                                <div className="form-step active">
                                    <h3 className="step-title">Información Personal</h3>
                                    <div className="registro-input-group">
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faUser} />
                                            <input
                                                type="text"
                                                name="nombre"
                                                placeholder="Nombre"
                                                value={usuario.nombre}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faUser} />
                                            <input
                                                type="text"
                                                name="apellido"
                                                placeholder="Apellido"
                                                value={usuario.apellido}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faIdCard} />
                                            <input
                                                type="text"
                                                name="dni"
                                                placeholder="DNI (8 dígitos)"
                                                value={usuario.dni}
                                                onChange={handleChange}
                                                maxLength="8"
                                                pattern="\d{8}"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Paso 2: Información de Contacto */}
                            {currentStep === 2 && (
                                <div className="form-step active">
                                    <h3 className="step-title">Información de Contacto</h3>
                                    <div className="registro-input-group">
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={usuario.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faPhone} />
                                            <input
                                                type="tel"
                                                name="telefono"
                                                placeholder="Teléfono"
                                                value={usuario.telefono}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            <input
                                                type="text"
                                                name="direccion"
                                                placeholder="Dirección"
                                                value={usuario.direccion}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Paso 3: Detalles Personales */}
                            {currentStep === 3 && (
                                <div className="form-step active">
                                    <h3 className="step-title">Detalles Personales</h3>
                                    <div className="registro-input-group">
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                            <input
                                                type="date"
                                                name="fechaNacimiento"
                                                placeholder="Fecha de Nacimiento"
                                                value={usuario.fechaNacimiento}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faVenusMars} />
                                            <select
                                                name="genero"
                                                value={usuario.genero}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Selecciona tu género</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                                <option value="Otro">Otro</option>
                                                <option value="Prefiero no decir">Prefiero no decir</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Paso 4: Seguridad */}
                            {currentStep === 4 && (
                                <div className="form-step active">
                                    <h3 className="step-title">Seguridad</h3>
                                    <div className="registro-input-group">
                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faLock} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Contraseña (mín. 6 caracteres)"
                                                value={usuario.password}
                                                onChange={handleChange}
                                                minLength="6"
                                                required
                                            />
                                            <span
                                                className="registro-toggle-password"
                                                onClick={togglePasswordVisibility}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </span>
                                        </div>

                                        <div className="registro-input-field">
                                            <FontAwesomeIcon icon={faLock} />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                placeholder="Confirmar Contraseña"
                                                value={usuario.confirmPassword}
                                                onChange={handleChange}
                                                minLength="6"
                                                required
                                            />
                                            <span
                                                className="registro-toggle-password"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                            </span>
                                        </div>

                                        {/* Términos y condiciones */}
                                        <div className="registro-terms">
                                            <input
                                                type="checkbox"
                                                id="acceptTerms"
                                                checked={acceptTerms}
                                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                            />
                                            <label htmlFor="acceptTerms">
                                                Acepto los <a href="/terminos" target="_blank">términos y condiciones</a> y la <a href="/privacidad" target="_blank">política de privacidad</a>
                                            </label>
                                        </div>
                                        {/* ¡NUEVO CAMPO! Aceptar Promociones */}
                                        <div className="registro-terms">
                                            <input
                                                type="checkbox"
                                                id="acceptPromos"
                                                name="aceptaPromociones"
                                                checked={usuario.aceptaPromociones}
                                                onChange={(e) => setUsuario({ ...usuario, aceptaPromociones: e.target.checked })}
                                            />
                                            <label htmlFor="acceptPromos">
                                                Deseo recibir correos y promociones.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botones de Navegación */}
                            <div className="form-navigation">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        className="btn-prev"
                                        onClick={prevStep}
                                        disabled={loading}
                                    >
                                        Anterior
                                    </button>
                                )}

                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        className="btn-next"
                                        onClick={nextStep}
                                    >
                                        Siguiente
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn-registro"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="loading-spinner"></div>
                                                Registrando...
                                            </>
                                        ) : (
                                            'COMPLETAR REGISTRO'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Enlace a Login */}
                        <div className="registro-login-link">
                            <span>¿Ya tienes cuenta?</span>
                            <Link to="/login">INICIAR SESIÓN</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="registro-footer">
                <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default RegistroPage;