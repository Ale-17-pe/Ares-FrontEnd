import React, { useState, useEffect } from 'react';
import { crearOpinion, obtenerOpiniones, obtenerPromedioCalificacion } from '../services/calificacionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faStarHalfAlt,
    faStar as faStarRegular,
    faPaperPlane,
    faClock,
    faCheckCircle,
    faDumbbell,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import './css/CalificacionesPage.css';

function CalificacionesPage() {
    const [opinion, setOpinion] = useState({
        tipoEntidad: 'GIMNASIO',
        idEntidad: 1, // ID del gimnasio
        calificacion: 5,
        comentario: '',
        usuarioNombre: 'Usuario Actual' // En realidad vendría del contexto de auth
    });
    const [opiniones, setOpiniones] = useState([]);
    const [promedio, setPromedio] = useState(0);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        cargarOpiniones();
        cargarPromedio();
    }, []);

    const cargarOpiniones = async () => {
        try {
            const data = await obtenerOpiniones('GIMNASIO', 1);
            setOpiniones(data);
        } catch (error) {
            console.error("Error al cargar opiniones:", error);
        }
    };

    const cargarPromedio = async () => {
        try {
            const data = await obtenerPromedioCalificacion('GIMNASIO', 1);
            setPromedio(data);
        } catch (error) {
            console.error("Error al cargar promedio:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!opinion.comentario.trim()) {
            alert('Por favor escribe un comentario');
            return;
        }

        setEnviando(true);
        try {
            await crearOpinion(opinion);
            setOpinion(prev => ({ ...prev, comentario: '', calificacion: 5 }));
            alert('¡Gracias por tu opinión! Está pendiente de moderación.');
            cargarOpiniones();
            cargarPromedio();
        } catch (error) {
            console.error("Error al enviar opinión:", error);
            alert('Error al enviar la opinión');
        } finally {
            setEnviando(false);
        }
    };

    const renderStars = (calificacion) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            if (calificacion >= starValue) {
                return <FontAwesomeIcon key={index} icon={faStar} className="star filled" />;
            } else if (calificacion >= starValue - 0.5) {
                return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="star half" />;
            } else {
                return <FontAwesomeIcon key={index} icon={faStarRegular} className="star" />;
            }
        });
    };

    return (
        <div className="calificaciones-page">
            <div className="header">
                <h1><FontAwesomeIcon icon={faStar} /> Calificaciones y Opiniones</h1>
                <p>Comparte tu experiencia en AresFitness</p>
            </div>

            {/* Resumen de Calificaciones */}
            <div className="resumen-calificaciones">
                <div className="promedio">
                    <div className="puntuacion">{promedio.toFixed(1)}</div>
                    <div className="estrellas">{renderStars(promedio)}</div>
                    <div className="total-opiniones">{opiniones.length} opiniones</div>
                </div>
            </div>

            {/* Formulario de Opinión */}
            <form className="form-opinion" onSubmit={handleSubmit}>
                <h3>Deja tu opinión</h3>
                <div className="calificacion-input">
                    <label>Calificación:</label>
                    <div className="estrellas-seleccion">
                        {[1, 2, 3, 4, 5].map(star => (
                            <FontAwesomeIcon
                                key={star}
                                icon={faStar}
                                className={`star ${opinion.calificacion >= star ? 'filled' : ''}`}
                                onClick={() => setOpinion(prev => ({ ...prev, calificacion: star }))}
                            />
                        ))}
                    </div>
                </div>
                <div className="comentario-input">
                    <label>Comentario:</label>
                    <textarea
                        value={opinion.comentario}
                        onChange={(e) => setOpinion(prev => ({ ...prev, comentario: e.target.value }))}
                        placeholder="Comparte tu experiencia en el gimnasio..."
                        rows="4"
                    />
                </div>
                <button type="submit" disabled={enviando}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    {enviando ? 'Enviando...' : 'Enviar Opinión'}
                </button>
            </form>

            {/* Lista de Opiniones */}
            <div className="lista-opiniones">
                <h3>Opiniones de la comunidad</h3>
                {opiniones.length > 0 ? (
                    opiniones.map(opinion => (
                        <div key={opinion.id} className="opinion-item">
                            <div className="opinion-header">
                                <div className="usuario-info">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>{opinion.usuarioNombre}</span>
                                </div>
                                <div className="calificacion">
                                    {renderStars(opinion.calificacion)}
                                </div>
                            </div>
                            <div className="comentario">
                                {opinion.comentario}
                            </div>
                            <div className="opinion-footer">
                                <FontAwesomeIcon icon={faClock} />
                                <span>{new Date(opinion.fechaCreacion).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-opiniones">
                        <p>No hay opiniones aún. ¡Sé el primero en comentar!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CalificacionesPage;