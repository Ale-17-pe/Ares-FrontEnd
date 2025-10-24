import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Imagenes/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faUserPlus,
    faSearch,
    faFilter,
    faDumbbell,
    faHeartPulse,
    faPersonRunning,
    faFire,
    faClock,
    faChartLine,
    faPlay,
    faPause,
    faStopwatch,
    faWeightHanging
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './css/EjerciciosPage.css';

function EjerciciosPage() {
    const [categoriaActiva, setCategoriaActiva] = useState('todos');
    const [busqueda, setBusqueda] = useState('');
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

    // Datos de ejercicios
    const ejercicios = [
        {
            id: 1,
            nombre: "Press de Banca",
            categoria: "pecho",
            dificultad: "Intermedio",
            duracion: "4 sets x 12 reps",
            descripcion: "Ejercicio fundamental para desarrollar el pectoral mayor",
            instrucciones: [
                "Acuéstate boca arriba en el banco",
                "Agarra la barra con las manos separadas al ancho de los hombros",
                "Baja la barra controladamente hasta el pecho",
                "Empuja la barra hacia arriba hasta extender los brazos"
            ],
            musculos: ["Pectoral Mayor", "Tríceps", "Deltoides Anterior"],
            imagen: "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-800.jpg",
            video: "https://www.youtube.com/embed/TAH8RxOS0VI?si=8LtTIQUV34B2uUhs",
            icono: faDumbbell
        },
        {
            id: 2,
            nombre: "Sentadillas",
            categoria: "piernas",
            dificultad: "Principiante",
            duracion: "4 sets x 15 reps",
            descripcion: "Ejercicio completo para desarrollar piernas y glúteos",
            instrucciones: [
                "Párate con los pies separados al ancho de los hombros",
                "Mantén la espalda recta y el pecho hacia arriba",
                "Flexiona rodillas y caderas como si fueras a sentarte",
                "Baja hasta que los muslos estén paralelos al suelo",
                "Vuelve a la posición inicial empujando con los talones"
            ],
            musculos: ["Cuádriceps", "Glúteos", "Isquiotibiales"],
            imagen: "https://static.strengthlevel.com/images/exercises/squat/squat-800.jpg",
            video: "https://www.youtube.com/embed/VRKdOsad3HQ?si=lTMNcn-RVvMjyHxd",
            icono: faPersonRunning
        },
        {
            id: 3,
            nombre: "Dominadas",
            categoria: "espalda",
            dificultad: "Avanzado",
            duracion: "4 sets x 8 reps",
            descripcion: "Ejercicio superior para desarrollar la espalda",
            instrucciones: [
                "Agarra la barra con las palmas hacia adelante",
                "Cuelga con los brazos completamente extendidos",
                "Tira del cuerpo hacia arriba hasta que la barbilla pase la barra",
                "Baja controladamente a la posición inicial"
            ],
            musculos: ["Dorsal Ancho", "Bíceps", "Trapecio"],
            imagen: "https://static.strengthlevel.com/images/exercises/pull-ups/pull-ups-800.jpg",
            video: "https://www.youtube.com/embed/npyLB-7o19o?si=74kKUFRt1JfpcLzh&amp;start=7",
            icono: faWeightHanging
        },
        {
            id: 4,
            nombre: "Press Militar",
            categoria: "hombros",
            dificultad: "Intermedio",
            duracion: "4 sets x 10 reps",
            descripcion: "Ejercicio para desarrollar hombros fuertes",
            instrucciones: [
                "Siéntate en un banco con respaldo",
                "Agarra la barra a la altura de los hombros",
                "Empuja la barra hacia arriba hasta extender los brazos",
                "Baja controladamente a la posición inicial"
            ],
            musculos: ["Deltoides", "Tríceps", "Trapecio"],
            imagen: "https://static.strengthlevel.com/images/exercises/military-press/military-press-800.avif",
            video: "https://www.youtube.com/embed/o5M9RZ-vWrc?si=ndCE7DRdLO6nVWtD&amp;start=2",
            icono: faDumbbell
        },
        {
            id: 5,
            nombre: "Curl de Bíceps",
            categoria: "brazos",
            dificultad: "Principiante",
            duracion: "3 sets x 15 reps",
            descripcion: "Ejercicio aislado para desarrollar bíceps",
            instrucciones: [
                "Párate con los pies separados al ancho de los hombros",
                "Agarra las mancuernas con las palmas hacia adelante",
                "Flexiona los codos llevando las mancuernas hacia los hombros",
                "Baja controladamente a la posición inicial"
            ],
            musculos: ["Bíceps", "Antebrazo"],
            imagen: "https://static.strengthlevel.com/images/exercises/dumbbell-curl/dumbbell-curl-800.avif",
            video: "https://www.youtube.com/embed/6DeLZ6cbgWQ?si=YYrX0lYxctsbB_ZV&amp;start=2",
            icono: faWeightHanging
        },
        {
            id: 6,
            nombre: "Plancha",
            categoria: "core",
            dificultad: "Principiante",
            duracion: "3 sets x 60 segundos",
            descripcion: "Ejercicio isométrico para fortalecer el core",
            instrucciones: [
                "Colócate en posición de flexión apoyado en antebrazos",
                "Mantén el cuerpo recto como una tabla",
                "Contrae el abdomen y glúteos",
                "Mantén la posición el tiempo indicado"
            ],
            musculos: ["Abdominales", "Oblicuos", "Lumbares"],
            imagen: "https://fitcron.com/wp-content/uploads/2021/04/04631301-Front-Plank_waist-FIX_720.gif",
            video: "https://www.youtube.com/embed/ogfuXWgXVsg?si=nuZcCdvs1btPTo2b&amp;start=2",
            icono: faFire
        },
        {
            id: 7,
            nombre: "Peso Muerto",
            categoria: "piernas",
            dificultad: "Avanzado",
            duracion: "4 sets x 8 reps",
            descripcion: "Ejercicio compuesto para fuerza general",
            instrucciones: [
                "Párate con los pies bajo la barra",
                "Flexiona rodillas y caderas para agarrar la barra",
                "Mantén la espalda recta y el pecho hacia arriba",
                "Levántate extendiendo rodillas y caderas",
                "Baja la barra controladamente al suelo"
            ],
            musculos: ["Femorales", "Glúteos", "Espalda Baja"],
            imagen: "https://static.strengthlevel.com/images/exercises/deadlift/deadlift-800.avif",
            video: "https://www.youtube.com/embed/jIAl3XoBCjM?si=KxxnX7PsYg520l3K&amp;start=5",
            icono: faWeightHanging
        },
        {
            id: 8,
            nombre: "Fondos en Paralelas",
            categoria: "pecho",
            dificultad: "Intermedio",
            duracion: "4 sets x 10 reps",
            descripcion: "Ejercicio con peso corporal para pecho y tríceps",
            instrucciones: [
                "Sujeta las paralelas con las manos",
                "Baja el cuerpo flexionando codos",
                "Desciende hasta que los hombros estén a la altura de los codos",
                "Empuja hacia arriba hasta extender los brazos"
            ],
            musculos: ["Pectoral", "Tríceps", "Deltoides Anterior"],
            imagen: "https://static.strengthlevel.com/images/exercises/dips/dips-800.avif",
            video: "https://www.youtube.com/embed/NnJEg52IGjI?si=-XhUI8PyUMuOrWeQ&amp;start=5",
            icono: faPersonRunning
        }
    ];  

    const categorias = [
        { id: 'todos', nombre: 'Todos', icono: faFilter, count: ejercicios.length },
        { id: 'pecho', nombre: 'Pecho', icono: faDumbbell, count: ejercicios.filter(e => e.categoria === 'pecho').length },
        { id: 'espalda', nombre: 'Espalda', icono: faWeightHanging, count: ejercicios.filter(e => e.categoria === 'espalda').length },
        { id: 'piernas', nombre: 'Piernas', icono: faPersonRunning, count: ejercicios.filter(e => e.categoria === 'piernas').length },
        { id: 'hombros', nombre: 'Hombros', icono: faDumbbell, count: ejercicios.filter(e => e.categoria === 'hombros').length },
        { id: 'brazos', nombre: 'Brazos', icono: faWeightHanging, count: ejercicios.filter(e => e.categoria === 'brazos').length },
        { id: 'core', nombre: 'Core', icono: faFire, count: ejercicios.filter(e => e.categoria === 'core').length }
    ];

    // Filtrar ejercicios
    const ejerciciosFiltrados = ejercicios.filter(ejercicio => {
        const coincideCategoria = categoriaActiva === 'todos' || ejercicio.categoria === categoriaActiva;
        const coincideBusqueda = ejercicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                               ejercicio.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    const abrirModal = (ejercicio) => {
        setEjercicioSeleccionado(ejercicio);
    };

    const cerrarModal = () => {
        setEjercicioSeleccionado(null);
    };

    return (
        <div className="ejercicios-page">
            {/* Hero Section */}
            <section className="hero-ejercicios">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>BIBLIOTECA DE EJERCICIOS</h1>
                        <p>Aprende la técnica correcta de cada ejercicio y maximiza tus resultados</p>
                    </div>
                </div>
            </section>

            {/* Barra de Búsqueda y Filtros */}
            <section className="filtros-section">
                <div className="filtros-container">
                    <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar ejercicios..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    
                    <div className="categorias-filtro">
                        {categorias.map(categoria => (
                            <button
                                key={categoria.id}
                                className={`categoria-btn ${categoriaActiva === categoria.id ? 'active' : ''}`}
                                onClick={() => setCategoriaActiva(categoria.id)}
                            >
                                <FontAwesomeIcon icon={categoria.icono} />
                                {categoria.nombre}
                                <span className="ejercicios-count">({categoria.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid de Ejercicios */}
            <section className="ejercicios-section">
                <div className="section-title">
                    <h2>EJERCICIOS {categoriaActiva !== 'todos' ? categorias.find(c => c.id === categoriaActiva)?.nombre.toUpperCase() : ''}</h2>
                    <div className="title-line"></div>
                    <p>
                        {categoriaActiva === 'todos' 
                            ? 'Explora nuestra completa biblioteca de ejercicios' 
                            : `Ejercicios específicos para ${categorias.find(c => c.id === categoriaActiva)?.nombre.toLowerCase()}`
                        }
                    </p>
                </div>

                <div className="ejercicios-grid">
                    {ejerciciosFiltrados.length > 0 ? (
                        ejerciciosFiltrados.map(ejercicio => (
                            <div key={ejercicio.id} className="ejercicio-card">
                                <div className="ejercicio-imagen">
                                    <img 
                                        src={ejercicio.imagen} 
                                        alt={ejercicio.nombre}
                                        onError={(e) => {
                                            e.target.src = 'https://static.strengthlevel.com/images/exercises/bench-press/bench-press-800.jpg';
                                        }}
                                    />
                                    <div className="ejercicio-overlay">
                                        <button 
                                            className="btn-ver-detalles"
                                            onClick={() => abrirModal(ejercicio)}
                                        >
                                            <FontAwesomeIcon icon={faPlay} /> VER DETALLES
                                        </button>
                                    </div>
                                    <div className="dificultad-badge">
                                        {ejercicio.dificultad}
                                    </div>
                                </div>
                                
                                <div className="ejercicio-content">
                                    <div className="ejercicio-header">
                                        <FontAwesomeIcon icon={ejercicio.icono} className="ejercicio-icon" />
                                        <h3>{ejercicio.nombre}</h3>
                                    </div>
                                    
                                    <p className="ejercicio-descripcion">{ejercicio.descripcion}</p>
                                    
                                    <div className="ejercicio-meta">
                                        <div className="meta-item">
                                            <FontAwesomeIcon icon={faClock} />
                                            <span>{ejercicio.duracion}</span>
                                        </div>
                                        <div className="meta-item">
                                            <FontAwesomeIcon icon={faFire} />
                                            <span>{ejercicio.categoria}</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="btn-detalles"
                                        onClick={() => abrirModal(ejercicio)}
                                    >
                                        <FontAwesomeIcon icon={faChartLine} /> Ver Instrucciones
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-resultados">
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                            <h3>No se encontraron ejercicios</h3>
                            <p>Intenta con otros términos de búsqueda o selecciona otra categoría</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal de Detalles del Ejercicio */}
            {ejercicioSeleccionado && (
                <div className="modal-overlay" onClick={cerrarModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={cerrarModal}>×</button>
                        
                        <div className="modal-header">
                            <FontAwesomeIcon icon={ejercicioSeleccionado.icono} />
                            <h2>{ejercicioSeleccionado.nombre}</h2>
                            <span className="dificultad-tag">{ejercicioSeleccionado.dificultad}</span>
                        </div>

                        <div className="modal-body">
                            <div className="modal-video">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={ejercicioSeleccionado.video}
                                    title={`Video de ${ejercicioSeleccionado.nombre}`}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="modal-info">
                                <div className="info-section">
                                    <h3>Descripción</h3>
                                    <p>{ejercicioSeleccionado.descripcion}</p>
                                </div>

                                <div className="info-section">
                                    <h3>Instrucciones</h3>
                                    <ol className="instrucciones-list">
                                        {ejercicioSeleccionado.instrucciones.map((instruccion, index) => (
                                            <li key={index}>{instruccion}</li>
                                        ))}
                                    </ol>
                                </div>

                                <div className="info-section">
                                    <h3>Músculos Trabajados</h3>
                                    <div className="musculos-tags">
                                        {ejercicioSeleccionado.musculos.map((musculo, index) => (
                                            <span key={index} className="musculo-tag">{musculo}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h3>Duración Recomendada</h3>
                                    <p className="duracion-info">
                                        <FontAwesomeIcon icon={faStopwatch} />
                                        {ejercicioSeleccionado.duracion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="main-footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <div className="logo-footer">
                            <Link to="/">
                                <img src={logo} alt="Logo AresFitness" />
                            </Link>
                        </div>
                        <p>Transformando vidas a través del fitness desde 2020</p>
                        <div className="footer-social">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://www.instagram.com/aresfitness.peru/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Enlaces rápidos</h3>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/membresias">Planes</Link></li>
                            <li><Link to="/ubicacion">Ubicación</Link></li>
                            <li><Link to="/ejercicios">Ejercicios</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contáctanos</h3>
                
                    </div>

                    <div className="footer-section">
                        <h3>Horario de atención</h3>
                        <p>Lunes a Viernes: 5:00 am - 11:00 pm</p>
                        <p>Sábados: 6:00 am - 10:00 pm</p>
                        <p>Domingos: 7:00 am - 9:00 pm</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default EjerciciosPage;