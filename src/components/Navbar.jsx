import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">AresFitness</Link>
      <ul className="nav-links">
        <li><Link to="/" className="link">Inicio</Link></li>
        <li><Link to="/membresias" className="link">Membresías</Link></li>
        <li><Link to="/ubicacion" className="link">Ubicación</Link></li>

        {usuario ? (
          <>
            <li><Link to="/dashboard" className="link">Mi Cuenta</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="login-button">
              Iniciar Sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;