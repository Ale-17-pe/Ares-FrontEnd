import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faTachometerAlt, 
  faSignOutAlt, 
  faDumbbell,
  faChevronDown  // Agregar este icono
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useHomeEffects } from '../hooks/useHomeEffects';
import logo from "../assets/Imagenes/logo.png";
import './AdminHeader.css';

function AdminHeader() {
  const { logout, usuario } = useAuth(); // Agregar usuario del contexto
  const navigate = useNavigate();

  const {
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    userMenuBtnRef,
    authDropdownRef
  } = useHomeEffects();

  const handleLogout = () => {
    logout();
    closeDropdown();
    navigate('/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="logo-container">
          <Link to="/admin">
            <img src={logo} alt="Logo AresFitness" />
          </Link>
        </div>
        
        <div className="admin-header-actions">
          <div className="user-menu">
            <button 
              className="admin-user-btn" 
              onClick={toggleDropdown} 
              ref={userMenuBtnRef}
            >
              <FontAwesomeIcon icon={faShieldAlt} /> 
              <span>
                {usuario ? `Hola, ${usuario.nombre}` : 'Panel Admin'}
              </span>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`} 
              />
            </button>

            <div 
              className={`admin-auth-dropdown ${isDropdownOpen ? 'show' : ''}`}
              ref={authDropdownRef}
            >
              <Link to="/admin" onClick={closeDropdown}>
                <FontAwesomeIcon icon={faTachometerAlt} /> 
                Panel de Control
              </Link>
              <Link to="/" onClick={closeDropdown}>
                <FontAwesomeIcon icon={faDumbbell} /> 
                Ir al Sitio Principal
              </Link>
              <button onClick={handleLogout} className="admin-logout-btn">
                <FontAwesomeIcon icon={faSignOutAlt} /> 
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;