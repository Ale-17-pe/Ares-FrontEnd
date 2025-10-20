import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

function RegistroForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await apiClient.post('usuarios/registrar', formData);
      setSuccess('¡Registro exitoso! Serás redirigido al login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMessage = err.response?.data;
      if (typeof errorMessage === 'string') {
        setError(errorMessage);
      } else {
        setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      }
    }
  };

  return (
    <div>
      <h2>Crear una Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" type="text" placeholder="Nombre" onChange={handleChange} required />
        <input name="apellido" type="text" placeholder="Apellido" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default RegistroForm;