import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarClases, crearReserva } from '../services/reservaService';
// import './ClasesPage.css'; // Opcional: para estilos

function ClasesPage() {
    const [clases, setClases] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cargarClases = async () => {
            const data = await listarClases();
            setClases(data);
        };
        cargarClases();
    }, []);

    const handleReservar = async (claseId) => {
        setMensaje('');
        setError('');

        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
        if (!usuarioLogueado) {
            setError("Debes iniciar sesión para reservar una clase.");
            setTimeout(() => navigate('/login'), 3000);
            return;
        }

        try {
            const reservaData = {
                usuarioId: usuarioLogueado.id,
                claseId: claseId,
            };
            await crearReserva(reservaData);
            setMensaje(`¡Reserva para la clase exitosa!`);
        } catch (err) {
            // El backend devuelve un mensaje de error específico
            const errorMessage = err.response?.data?.error || "No se pudo realizar la reserva.";
            setError(errorMessage);
        }
    };

    return (
        <div className="page-container">
            <h1>Clases Disponibles</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

            <div className="card-grid">
                {clases.map(clase => (
                    <div key={clase.id} className="clase-card">
                        <h3>{clase.nombreClase}</h3>
                        <p>Instructor ID: {clase.instructorId}</p>
                        <p>Capacidad Máxima: {clase.capacidadMaxima}</p>
                        <button onClick={() => handleReservar(clase.id)}>Reservar Cupo</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClasesPage;