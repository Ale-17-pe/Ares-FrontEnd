import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faComment, 
    faUser, 
    faStar, 
    faPaperPlane,
    faClock,
    faTrash,
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import './css/ComentariosSection.css';

function ComentariosSection() {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState({
        nombre: '',
        email: '',
        mensaje: '',
        calificacion: 5
    });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Cargar comentarios del localStorage al iniciar
    useEffect(() => {
        const comentariosGuardados = localStorage.getItem('comentariosAresFitness');
        if (comentariosGuardados) {
            setComentarios(JSON.parse(comentariosGuardados));
        } else {
            // Comentarios de ejemplo para empezar
            setComentarios(comentariosEjemplo);
        }
    }, []);

    // Comentarios de ejemplo
    const comentariosEjemplo = [
        {
            id: 1,
            nombre: 'María González',
            mensaje: '¡Increíble gimnasio! Los entrenadores son muy profesionales y las instalaciones de primera. He logrado resultados que nunca imaginé.',
            calificacion: 5,
            fecha: '2024-01-15',
            avatar: '👩‍💼'
        },
        {
            id: 2,
            nombre: 'Carlos Rodríguez',
            mensaje: 'La comunidad aquí es espectacular. Siempre me motivan a dar lo mejor de mí. Recomendado 100%.',
            calificacion: 5,
            fecha: '2024-01-10',
            avatar: '👨‍💻'
        },
        {
            id: 3,
            nombre: 'Ana Martínez',
            mensaje: 'Llevo 6 meses y he transformado mi cuerpo completamente. El plan nutricional fue clave para mis resultados.',
            calificacion: 4,
            fecha: '2024-01-08',
            avatar: '👩‍🎓'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoComentario(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCalificacionClick = (puntos) => {
        setNuevoComentario(prev => ({
            ...prev,
            calificacion: puntos
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!nuevoComentario.nombre.trim() || !nuevoComentario.mensaje.trim()) {
            alert('Por favor, completa al menos tu nombre y comentario.');
            return;
        }

        const comentario = {
            id: Date.now(),
            nombre: nuevoComentario.nombre.trim(),
            email: nuevoComentario.email.trim(),
            mensaje: nuevoComentario.mensaje.trim(),
            calificacion: nuevoComentario.calificacion,
            fecha: new Date().toISOString().split('T')[0],
            avatar: getAvatarAleatorio()
        };

        const nuevosComentarios = [comentario, ...comentarios];
        setComentarios(nuevosComentarios);
        localStorage.setItem('comentariosAresFitness', JSON.stringify(nuevosComentarios));
        
        // Resetear formulario
        setNuevoComentario({
            nombre: '',
            email: '',
            mensaje: '',
            calificacion: 5
        });
        setMostrarFormulario(false);
        
        alert('¡Gracias por tu comentario! Tu opinión ayuda a mejorar nuestro servicio.');
    };

    const getAvatarAleatorio = () => {
        const avatares = ['👦', '👧', '👨', '👩', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍⚕️', '👩‍⚕️'];
        return avatares[Math.floor(Math.random() * avatares.length)];
    };

    const eliminarComentario = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            const comentariosFiltrados = comentarios.filter(comentario => comentario.id !== id);
            setComentarios(comentariosFiltrados);
            localStorage.setItem('comentariosAresFitness', JSON.stringify(comentariosFiltrados));
        }
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section className="comentarios-section">
            <div className="container">
                <div className="section-title">
                    <FontAwesomeIcon icon={faComment} className="section-icon" />
                    <h2>OPINIONES DE NUESTROS MIEMBROS</h2>
                    <div className="title-line"></div>
                    <p>Lo que dicen quienes ya forman parte de la familia AresFitness</p>
                </div>

                {/* Estadísticas rápidas */}
                <div className="estadisticas-comentarios">
                    <div className="estadistica-item">
                        <span className="numero">{comentarios.length}+</span>
                        <span className="texto">Opiniones</span>
                    </div>
                    <div className="estadistica-item">
                        <span className="numero">
                            {comentarios.length > 0 
                                ? (comentarios.reduce((acc, curr) => acc + curr.calificacion, 0) / comentarios.length).toFixed(1)
                                : '5.0'
                            }
                        </span>
                        <span className="texto">Calificación promedio</span>
                    </div>
                    <div className="estadistica-item">
                        <span className="numero">
                            {comentarios.filter(c => c.calificacion === 5).length}
                        </span>
                        <span className="texto">Excelentes</span>
                    </div>
                </div>

                {/* Botón para agregar comentario */}
                <div className="agregar-comentario-btn-container">
                    <button 
                        className="btn-agregar-comentario"
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    >
                        <FontAwesomeIcon icon={faComment} />
                        {mostrarFormulario ? 'CANCELAR' : 'AGREGAR MI OPINIÓN'}
                    </button>
                </div>

                {/* Formulario de comentario */}
                {mostrarFormulario && (
                    <div className="formulario-comentario-container">
                        <form className="formulario-comentario" onSubmit={handleSubmit}>
                            <h3>Comparte tu experiencia</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nombre">Tu Nombre *</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={nuevoComentario.nombre}
                                        onChange={handleInputChange}
                                        placeholder="¿Cómo te llamas?"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email (opcional)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={nuevoComentario.email}
                                        onChange={handleInputChange}
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tu Calificación</label>
                                <div className="calificacion-estrellas">
                                    {[1, 2, 3, 4, 5].map(estrella => (
                                        <button
                                            key={estrella}
                                            type="button"
                                            className={`estrella ${estrella <= nuevoComentario.calificacion ? 'activa' : ''}`}
                                            onClick={() => handleCalificacionClick(estrella)}
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                        </button>
                                    ))}
                                    <span className="puntos-calificacion">
                                        {nuevoComentario.calificacion}.0
                                    </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="mensaje">Tu Experiencia *</label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    value={nuevoComentario.mensaje}
                                    onChange={handleInputChange}
                                    placeholder="Comparte tu experiencia en AresFitness... ¿Qué te gustó? ¿Cómo ha sido tu transformación?"
                                    rows="5"
                                    required
                                />
                                <small className="contador-caracteres">
                                    {nuevoComentario.mensaje.length}/500 caracteres
                                </small>
                            </div>

                            <button type="submit" className="btn-enviar-comentario">
                                <FontAwesomeIcon icon={faPaperPlane} />
                                PUBLICAR MI OPINIÓN
                            </button>
                        </form>
                    </div>
                )}

                {/* Lista de comentarios */}
                <div className="lista-comentarios">
                    {comentarios.length > 0 ? (
                        comentarios.map(comentario => (
                            <div key={comentario.id} className="tarjeta-comentario">
                                <div className="comentario-header">
                                    <div className="info-usuario">
                                        <div className="avatar">{comentario.avatar}</div>
                                        <div className="datos-usuario">
                                            <h4>{comentario.nombre}</h4>
                                            <div className="fecha-calificacion">
                                                <span className="fecha">
                                                    <FontAwesomeIcon icon={faClock} />
                                                    {formatearFecha(comentario.fecha)}
                                                </span>
                                                <div className="calificacion">
                                                    {[...Array(5)].map((_, index) => (
                                                        <FontAwesomeIcon 
                                                            key={index}
                                                            icon={faStar} 
                                                            className={index < comentario.calificacion ? 'activa' : ''}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        className="btn-eliminar"
                                        onClick={() => eliminarComentario(comentario.id)}
                                        title="Eliminar comentario"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <div className="comentario-mensaje">
                                    <p>{comentario.mensaje}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="sin-comentarios">
                            <FontAwesomeIcon icon={faComment} size="3x" />
                            <h3>Sin opiniones aún</h3>
                            <p>Sé el primero en compartir tu experiencia en AresFitness</p>
                        </div>
                    )}
                </div>

                {/* Información adicional */}
                <div className="info-comentarios">
                    <div className="info-item">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Comentarios verificados de miembros reales</span>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faStar} />
                        <span>Calificaciones basadas en experiencias reales</span>
                    </div>
                    <div className="info-item">
                        <FontAwesomeIcon icon={faComment} />
                        <span>Tus comentarios ayudan a mejorar nuestro servicio</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ComentariosSection;