import React, { useState } from 'react';
import { loginUsuario } from '../services/usuarioService.js';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import logo from "../assets/Imagenes/logo.png";
import icono from "../assets/Imagenes/usuario.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
  const [usuario, setUsuario] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUsuario(usuario);
      localStorage.setItem('usuario', JSON.stringify(result.usuario));
      alert(`Bienvenido, ${result.usuario.nombre}`);
      setUsuario({ email: '', password: '' });
      if (result.usuario.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
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
    <div className="login-page">

      <div className="main-wrapper">
        <div className="container">
          <div className="form-content">
            <div className="user-icon">
              <img src={icono} alt="Icono de usuario" />
            </div>

            <h1 id="title">INICIAR SESIÓN</h1>
            <p className="subtitle">Introduce tus credenciales para acceder</p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="input-group">
                <div className="input-field">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type="email"
                    name="email"
                    placeholder="   Correo electrónico"
                    value={usuario.email}
                    onChange={handleChange}
                    title="Ingrese tu correo "
                    required
                  />
                </div>

                {/* Campo Contraseña */}
                <div className="input-field">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="     Contraseña"
                    value={usuario.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>

                <div className="OLVIDE">
                  <Link to="/olvide">¿Olvidaste tu contraseña?</Link>
                </div>

                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me">Mantener mi sesión iniciada</label>
                </div>
              </div>

              <button
                type="submit"
                className="btn-login"
                disabled={loading}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            <div className="Registrar">
              <span>¿No tienes cuenta?</span>
              <Link to="/registro">REGÍSTRATE</Link>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default LoginPage;