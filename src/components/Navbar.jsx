import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function Navbar() {

  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.brand}>AresFitness</Link>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Inicio</Link></li>
        <li><Link to="/membresias" style={styles.link}>Membresías</Link></li>
        <li><Link to="/ubicacion" style={styles.link}>Ubicación</Link></li>

        {usuario ? (
          <>
            <li><Link to="/dashboard" style={styles.link}>Mi Cuenta</Link></li>
            <li><button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button></li>
          </>
        ) : (
          <li><Link to="/login" style={{ ...styles.link, ...styles.loginButton }}>Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
}

// Estilos básicos en el mismo archivo para simplicidad
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: '0 2rem',
    color: 'white',
    height: '60px'
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none'
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  loginButton: {
    backgroundColor: '#61dafb',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    color: '#222',
    fontWeight: 'bold'
  }
};

export default Navbar;