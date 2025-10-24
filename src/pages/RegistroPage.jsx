import React, { useState } from 'react';
import { registrarUsuario } from '../services/usuarioService';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";
import icono from "../assets/Imagenes/usuario.png";
import { faEnvelopeCircleCheck, faIdCard } from '@fortawesome/free-solid-svg-icons';

import {
    faUser,
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
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
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
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
                genero: usuario.genero
            };

            await registrarUsuario(usuarioParaEnviar); // Enviamos el objeto correcto

            alert('Usuario registrado correctamente');
            setUsuario({
                nombre: '', apellido: '', email: '', password: '',
                confirmPassword: '', telefono: '', direccion: '',
                fechaNacimiento: '', genero: ''
            });
            navigate('/login');
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

    return (
        <div className="registro-page">

            <div className="registro-main-wrapper">
                <div className="registro-container">
                    <div className="registro-form-content">
                        <div className="registro-user-icon">
                            <img src={icono} alt="Icono de usuario" />
                        </div>

                        <h1 className="registro-title">CREAR CUENTA</h1>
                        <p className="registro-subtitle">Completa tus datos para registrarte</p>

                        {error && (
                            <div className="registro-error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="registro-input-group">
                                {/* Campo Nombre */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="   Nombre completo"
                                        value={usuario.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Campo Apellido (NUEVO) */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type="text"
                                        name="apellido"
                                        placeholder="   Apellido"
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
                                        placeholder="   DNI"
                                        value={usuario.dni}
                                        onChange={handleChange}
                                        maxLength="8"
                                        pattern="\d{8}"
                                        title="Debe tener 8 dígitos numéricos"
                                        required
                                    />
                                </div>
                                {/* Campo Email */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="   Email"
                                        value={usuario.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Campo Teléfono */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type="text"
                                        name="telefono"
                                        placeholder="   Teléfono"
                                        value={usuario.telefono}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Campo Dirección */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type="text"
                                        name="direccion"
                                        placeholder="   Dirección"
                                        value={usuario.direccion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Campo Fecha de Nacimiento */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        type="date"
                                        name="fechaNacimiento"
                                        placeholder="   Fecha de nacimiento"
                                        value={usuario.fechaNacimiento}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Campo Género */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faUser} />
                                    <select
                                        name="genero"
                                        value={usuario.genero}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona género</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                {/* Campo Contraseña */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faLock} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="   Contraseña"
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

                                {/* Campo Confirmar Contraseña */}
                                <div className="registro-input-field">
                                    <FontAwesomeIcon icon={faLock} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="   Confirmar contraseña"
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
                                        Acepto los <a href="/terminos">términos y condiciones</a>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-registro"
                                disabled={loading}
                            >
                                {loading ? 'Registrando...' : 'REGISTRARSE'}
                            </button>
                        </form>

                        <div className="registro-login-link">
                            <span>¿Ya tienes cuenta?</span>
                            <Link to="/login">INICIAR SESIÓN</Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="registro-footer">
                <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default RegistroPage;