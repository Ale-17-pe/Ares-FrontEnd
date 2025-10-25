import React, { useState } from 'react';
import { loginUsuario } from '../services/usuarioService.js';
import { useNavigate, Link } from 'react-router-dom';
import './css/LoginPage.css';
import logo from "../assets/Imagenes/logo.png";
import icono from "../assets/Imagenes/usuario.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEnvelope, 
    faLock, 
    faEye, 
    faEyeSlash, 
    faUser,
    faShieldAlt,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
    const [usuario, setUsuario] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await loginUsuario(usuario);
            localStorage.setItem('usuario', JSON.stringify(result.usuario));
            
            setSuccess(`¡Bienvenido, ${result.usuario.nombre}!`);
            
            setTimeout(() => {
                if (result.usuario.role === 'ADMIN' || result.usuario.role === 'RECEPCIONISTA') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            }, 1500);
            
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Error al iniciar sesión';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-login-page">
            {/* Header */}
            <header className="auth-login-header">
                <div className="auth-login-logo">
                    <Link to="/">
                        <img src={logo} alt="Ares Fitness" />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="auth-login-main">
                <div className="auth-login-container">
                    <div className="auth-login-content">
                        <div className="auth-login-icon">
                            <img src={icono} alt="Icono de usuario" />
                        </div>

                        <div className="auth-login-header-text">
                            <h1 className="auth-login-title">INICIAR SESIÓN</h1>
                            <p className="auth-login-subtitle">Accede a tu cuenta de Ares Fitness</p>
                        </div>

                        {/* Mensajes de Estado */}
                        {error && (
                            <div className="auth-login-error">
                                <FontAwesomeIcon icon={faShieldAlt} />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="auth-login-success">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} autoComplete="off" className="auth-login-form">
                            <div className="auth-login-inputs">
                                <div className="auth-login-field">
                                    <FontAwesomeIcon icon={faEnvelope} className="auth-login-field-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo electrónico"
                                        value={usuario.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="auth-login-field">
                                    <FontAwesomeIcon icon={faLock} className="auth-login-field-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Contraseña"
                                        value={usuario.password}
                                        onChange={handleChange}
                                        minLength="6"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="auth-login-toggle-password"
                                        onClick={togglePasswordVisibility}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>

                                <div className="auth-login-options">
                                    <div className="auth-login-remember">
                                        <input
                                            type="checkbox"
                                            id="remember-me"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label htmlFor="remember-me">Mantener sesión activa</label>
                                    </div>
                                    
                                    <div className="auth-login-forgot">
                                        <Link to="/olvide">¿Olvidaste tu contraseña?</Link>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="auth-login-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="auth-login-spinner"></div>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'INICIAR SESIÓN'
                                )}
                            </button>
                        </form>

                        <div className="auth-login-register">
                            <span>¿No tienes una cuenta?</span>
                            <Link to="/registro">REGÍSTRATE AHORA</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="auth-login-footer">
                <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default LoginPage;