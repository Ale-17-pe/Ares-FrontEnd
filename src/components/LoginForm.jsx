import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setToken('');
    try {
      await login(email, password); 
      navigate('/dashboard');
      const response = await apiClient.post('/auth/login', { email, password });
      const receivedToken = response.data.token;
      setToken(receivedToken);
      localStorage.setItem('jwtToken', receivedToken);
    } catch (err) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {token && <p style={{ color: 'green' }}>¡Login exitoso!</p>}
      <p>
        ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default LoginForm;