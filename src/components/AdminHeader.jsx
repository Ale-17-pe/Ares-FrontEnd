// src/components/AdminHeader.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importar useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faTachometerAlt, faSignOutAlt, faChartLine, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/Imagenes/logo.png";
import { useAuth } from '../context/AuthContext';
import { useHomeEffects } from '../hooks/useHomeEffects'; // Asumo que este es el nombre correcto de tu hook

import './AdminHeader.css'; // Un archivo de estilos separado

function AdminHeader() {
    const { logout } = useAuth();
    const navigate = useNavigate(); // Hook para redirigir

    // Obtienes toda la lógica del menú desde tu hook personalizado
    const {
        isDropdownOpen,
        toggleDropdown,
        closeDropdown,
        userMenuBtnRef,
        authDropdownRef
    } = useHomeEffects();

    // 2. Crear la función de logout
    const handleLogout = () => {
        logout();
        closeDropdown(); // Cierra el menú
        navigate('/login'); // Redirige al login
    };

    return (
        <header className="main-header">
            <div className="header-container">
                <div className="logo-container">
                    {/* 3. El logo ahora lleva al dashboard de admin */}
                    <Link to="/admin">
                        <img src={logo} alt="Logo AresFitness" />
                    </Link>
                </div>
                <div className="header-actions">
                    <button className="user-btn admin-badge" onClick={toggleDropdown} ref={userMenuBtnRef}>
                        <FontAwesomeIcon icon={faShieldAlt} /> Panel Admin
                    </button>

                    {/* 4. Aplicar la clase dinámica y la referencia */}
                    <div 
                        className={`auth-dropdown ${isDropdownOpen ? 'show' : ''}`}
                        ref={authDropdownRef}
                    >
                        <Link to="/admin" onClick={closeDropdown}>
                            <FontAwesomeIcon icon={faTachometerAlt} />Panel
                        </Link>
                        <Link to="/" onClick={closeDropdown}>
                            <FontAwesomeIcon icon={faDumbbell} /> Ir al Sitio
                        </Link>
                        {/* 5. Añadir el botón de Cerrar Sesión */}
                        <button onClick={handleLogout} className="btn-logout-dropdown">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;