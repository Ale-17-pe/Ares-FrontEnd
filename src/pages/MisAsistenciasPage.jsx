import React, { useState, useEffect } from 'react';
import { obtenerHistorialPorUsuario } from '../services/asistenciaService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCheck,
    faCalendarAlt,
    faClock,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './css/MisAsistenciasPage.css';

function MisAsistenciasPage() {
    const [asistencias, setAsistencias] = useState([]);
    const [loading, setLoading] = useState(true);

    // En una implementación real, obtendrías el ID del usuario del contexto de autenticación
    const usuarioId = 1; // Ejemplo

    useEffect(() => {
        const cargarMisAsistencias = async () => {
            try {
                setLoading(true);
                const data = await obtenerHistorialPorUsuario(usuarioId);
                setAsistencias(data);
            } catch (error) {
                console.error("Error al cargar asistencias:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarMisAsistencias();
    }, [usuarioId]);

    if (loading) {
        return <div className="loading">Cargando tus asistencias...</div>;
    }

    return (
        <div className="mis-asistencias-page">
            <div className="header">
                <h1><FontAwesomeIcon icon={faUserCheck} /> Mis Asistencias</h1>
                <p>Historial de tu asistencia al gimnasio</p>
            </div>

            <div className="asistencias-list">
                {asistencias.map(asistencia => (
                    <div key={asistencia.id} className="asistencia-item">
                        <div className="asistencia-icon">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="asistencia-info">
                            <h3>Asistencia Registrada</h3>
                            <div className="asistencia-details">
                                <span><FontAwesomeIcon icon={faCalendarAlt} /> {asistencia.fecha}</span>
                                <span><FontAwesomeIcon icon={faClock} /> {asistencia.horaEntrada}</span>
                            </div>
                            {asistencia.claseNombre && (
                                <div className="clase-info">
                                    Clase: {asistencia.claseNombre}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MisAsistenciasPage;