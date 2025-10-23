// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";
import { useAuth } from '../context/AuthContext';

import {
    faMapMarkerAlt, faRunning, faCrown, faUser, faSignInAlt, faUserPlus,
    faSignOutAlt, faTachometerAlt, faBars, faTimes, faChevronDown,
    faShieldAlt, faDumbbell, faHome, faUsers
} from '@fortawesome/free-solid-svg-icons';

import { useHomeEffects } from '../hooks/useHomeEffects';
import './Header.css';

function Header() {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate(); 

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
        navigate('/'); 
    }

    const isAdmin = usuario && (usuario.role === 'ADMIN' || usuario.role === 'RECEPCIONISTA');

    return (
        <header className="main-header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo-container">
                    <Link to={isAdmin ? "/admin" : "/"} onClick={closeMenu}>
                        <img src={logo} alt="Logo Ares Fitness" />

                    </Link>
                </div>

                {/* Navegación Principal - Solo para no admin */}
                {!isAdmin && (
                    <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                        <ul>
                            <li>
                                <Link to="/" onClick={closeMenu}>
                                    <FontAwesomeIcon icon={faHome} /> INICIO
                                </Link>
                            </li>
                            <li>
                                <Link to="/ubicacion" onClick={closeMenu}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> UBICACIÓN
                                </Link>
                            </li>
                            <li>
                                <Link to="/ejercicios" onClick={closeMenu}>
                                    <FontAwesomeIcon icon={faRunning} /> EJERCICIOS
                                </Link>
                            </li>
                            <li>
                                <Link to="/planes" onClick={closeMenu}>
                                    <FontAwesomeIcon icon={faCrown} /> MEMBRESÍAS
                                </Link>
                            </li>
                            <li>
                                <Link to="/nosotros" onClick={closeMenu}>
                                    <FontAwesomeIcon icon={faUsers} /> NOSOTROS
                                </Link>
                            </li>
                        </ul>

                        {/* Botones de acción en menú móvil */}
                        <div className="mobile-actions">
                            {!usuario ? (
                                <div className="mobile-auth-buttons">
                                    <Link to="/login" className="btn-login-mobile" onClick={closeMenu}>
                                        <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
                                    </Link>
                                    <Link to="/registro" className="btn-register-mobile" onClick={closeMenu}>
                                        <FontAwesomeIcon icon={faUserPlus} /> Registrarse
                                    </Link>
                                </div>
                            ) : (
                                <div className="mobile-user-info">
                                    <p>¡Hola, {usuario.nombre}!</p>
                                    <Link to="/dashboard" className="btn-dashboard-mobile" onClick={closeMenu}>
                                        <FontAwesomeIcon icon={faTachometerAlt} /> Mi Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="btn-logout-mobile">
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>
                )}

                {/* Acciones de Usuario */}
                <div className="header-actions">
                    {!usuario ? (
                        <div className="user-menu">
                            <button className="user-btn" onClick={toggleDropdown} ref={dropdownBtnRef}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>Mi Cuenta</span>
                                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                            </button>
                            <div className={`auth-dropdown ${isDropdownOpen ? 'show' : ''}`} ref={dropdownRef}>
                                <Link to="/login" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
                                </Link>
                                <Link to="/registro" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faUserPlus} /> Registrarse
                                </Link>
                            </div>
                        </div>
                    ) : isAdmin ? (
                        <div className="user-menu">
                            <button className="user-btn admin-badge" onClick={toggleDropdown} ref={userMenuBtnRef}>
                                <FontAwesomeIcon icon={faShieldAlt} />
                                <span>Panel Admin</span>
                            </button>
                            <div className={`auth-dropdown ${isDropdownOpen ? 'show' : ''}`} ref={authDropdownRef}>
                                <Link to="/admin" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faTachometerAlt} /> Panel de Control
                                </Link>
                                <Link to="/" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faDumbbell} /> Ir al Sitio
                                </Link>
                                <button onClick={handleLogout} className="btn-logout-dropdown">
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="user-menu">
                            <button className="user-btn" onClick={toggleDropdown} ref={userMenuBtnRef}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>¡Hola, {usuario.nombre}!</span>
                                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                            </button>
                            <div className={`auth-dropdown ${isDropdownOpen ? 'show' : ''}`} ref={authDropdownRef}>
                                <Link to="/dashboard" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faTachometerAlt} /> Mi Dashboard
                                </Link>
                                <Link to="/perfil" onClick={closeDropdown}>
                                    <FontAwesomeIcon icon={faUser} /> Mi Perfil
                                </Link>
                                <button onClick={handleLogout} className="btn-logout-dropdown">
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {!isAdmin && (
                    <button className="mobile-menu-btn" onClick={toggleMenu} ref={menuBtnRef} aria-label="Menú principal">
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;