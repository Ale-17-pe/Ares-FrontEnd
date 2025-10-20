// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";
import { useAuth } from '../context/AuthContext';

import {
    faHome, faMapMarkerAlt, faDumbbell, faCrown, faUsers,
    faUser, faSignInAlt, faUserPlus, faSignOutAlt, 
    faTachometerAlt, faShieldAlt, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

import { useHomeEffects } from '../hooks/useHomeEffects';
import './Header.css';

function Header() {
    const { usuario, logout } = useAuth();
    const {
        isMenuOpen, toggleMenu, closeMenu,
        isDropdownOpen, toggleDropdown, closeDropdown,
        menuBtnRef, menuRef,
        dropdownBtnRef, dropdownRef,
        userMenuBtnRef, authDropdownRef
    } = useHomeEffects();

    const handleLogout = () => {
        logout();
        closeDropdown();
        closeMenu();
    };

    const isAdmin = usuario && (usuario.rol === 'admin' || usuario.rol === 'recepcionista');

    return (
        <header className="portfolio-header">
            <div className="header-container">
                {/* Logo Minimalista */}
                <div className="logo-section">
                    <Link to={isAdmin ? "/admin" : "/"} className="logo-link" onClick={closeMenu}>
                        <img src={logo} alt="Ares Fitness" className="logo-img" />
                        <span className="logo-text">ARES FITNESS</span>
                    </Link>
                </div>

                {/* Navegación Principal - Estilo Tabla */}
                {!isAdmin && (
                    <nav className={`nav-section ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                        <div className="nav-grid">
                            <Link to="/" className="nav-item" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faHome} />
                                <span>Inicio</span>
                            </Link>
                            <Link to="/ubicacion" className="nav-item" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <span>Ubicación</span>
                            </Link>
                            <Link to="/ejercicios" className="nav-item" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faDumbbell} />
                                <span>Ejercicios</span>
                            </Link>
                            <Link to="/planes" className="nav-item" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faCrown} />
                                <span>Membresías</span>
                            </Link>
                            <Link to="/nosotros" className="nav-item" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faUsers} />
                                <span>Nosotros</span>
                            </Link>
                        </div>
                    </nav>
                )}

                {/* Sección de Usuario */}
                <div className="user-section">
                    {!usuario ? (
                        <div className="auth-buttons">
                            <Link to="/login" className="auth-btn login-btn">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                <span>Ingresar</span>
                            </Link>
                            <Link to="/registro" className="auth-btn register-btn">
                                <FontAwesomeIcon icon={faUserPlus} />
                                <span>Registrarse</span>
                            </Link>
                        </div>
                    ) : isAdmin ? (
                        <div className="user-menu">
                            <button className="user-profile admin-profile" onClick={toggleDropdown} ref={userMenuBtnRef}>
                                <FontAwesomeIcon icon={faShieldAlt} />
                                <span>Admin Panel</span>
                            </button>
                            <div className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`} ref={authDropdownRef}>
                                <Link to="/admin" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faTachometerAlt} />
                                    <span>Dashboard</span>
                                </Link>
                                <Link to="/" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faHome} />
                                    <span>Ir al Sitio</span>
                                </Link>
                                <button onClick={handleLogout} className="logout-btn">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span>Cerrar Sesión</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="user-menu">
                            <button className="user-profile" onClick={toggleDropdown} ref={userMenuBtnRef}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>Hola, {usuario.nombre}</span>
                            </button>
                            <div className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`} ref={authDropdownRef}>
                                <Link to="/dashboard" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faTachometerAlt} />
                                    <span>Mi Dashboard</span>
                                </Link>
                                <Link to="/perfil" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Mi Perfil</span>
                                </Link>
                                <button onClick={handleLogout} className="logout-btn">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span>Cerrar Sesión</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Botón Menú Móvil */}
                {!isAdmin && (
                    <button className="mobile-toggle" onClick={toggleMenu} ref={menuBtnRef}>
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;