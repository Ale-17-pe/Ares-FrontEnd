import React, { useState, useEffect } from 'react';
import { listarSuscripciones } from '../services/membresiaService';

function AdminMembresiasPage() {
    const [suscripciones, setSuscripciones] = useState([]);

    useEffect(() => {
        const cargarSuscripciones = async () => {
            try {
                const data = await listarSuscripciones();
                setSuscripciones(data);
            } catch (error) {
                console.error("Error al cargar suscripciones:", error);
            }
        };
        cargarSuscripciones();
    }, []);

    return (
        <div>
            <h1>Panel de Membresías Activas</h1>
            <table border="1" style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID Suscripción</th>
                        <th>ID Usuario</th>
                        <th>Plan</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {suscripciones.map(sub => (
                        <tr key={sub.id}>
                            <td>{sub.id}</td>
                            <td>{sub.usuarioId}</td>
                            <td>{sub.plan.nombrePlan}</td>
                            <td>{new Date(sub.fechaInicio).toLocaleDateString()}</td>
                            <td>{new Date(sub.fechaFin).toLocaleDateString()}</td>
                            <td>{sub.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminMembresiasPage;