import React, { useEffect, useState } from 'react';
import { listarPlanes, crearPlan } from '../services/membresiaService.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faUserPlus,
    faCheck,
    faTimes,
    faStar,
    faFire,
    faDiamond,
    faClock,
    faUsers,
    faDumbbell,
    faHeart,
    faShieldAlt, faPhone, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './MembresiasPage.css';

function MembresiasPage() {
    const [membresias, setMembresias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
 const membresiasPredefinidas = [
        {
            id: 1,
            nombre: "BÁSICA",
            precio: 89.90,
            duracion: "1 mes",
            descripcion: "Perfecta para empezar tu journey fitness",
            caracteristicas: [
                "Acceso a zona de musculación",
                "Acceso a cardio",
                "Lockers disponibles",
                "Asesoría básica",
                "Sin acceso a clases grupales",
                "Sin área VIP"
            ],
            popular: false,
            icono: faDumbbell,
            color: "#7f7676"
        },
        {
            id: 2,
            nombre: "PREMIUM",
            precio: 149.90,
            duracion: "1 mes",
            descripcion: "La opción más popular para resultados óptimos",
            caracteristicas: [
                "Todo lo de Básica +",
                "Acceso ilimitado a clases grupales",
                "Área VIP incluida",
                "Plan nutricional básico",
                "2 sesiones de assessment",
                "Acceso a app móvil",
                "Invitados ocasionales"
            ],
            popular: true,
            icono: faFire,
            color: "#ffd500"
        },
        {
            id: 3,
            nombre: "VIP",
            precio: 299.90,
            duracion: "1 mes",
            descripcion: "Experiencia fitness completa y personalizada",
            caracteristicas: [
                "Todo lo de Premium +",
                "Entrenador personal (4 sesiones/mes)",
                "Plan nutricional avanzado",
                "Acceso 24/7",
                "Estacionamiento premium",
                "Toalla y kit de bienvenida",
                "Descuentos en suplementos",
                "Freeze de membresía"
            ],
            popular: false,
            icono: faDiamond,
            color: "#ff6b6b"
        }
    ];
    
 useEffect(() => {
        const fetchMembresias = async () => {
            try {
                setLoading(true);
                const data = await listarMembresias();
                if (data && data.length > 0) {
                    setMembresias(data);
                } else {
                    // Usar membresías predefinidas si la API no devuelve datos
                    setMembresias(membresiasPredefinidas);
                }
            } catch (error) {
                console.error('Error cargando membresías:', error);
                // Usar membresías predefinidas en caso de error
                setMembresias(membresiasPredefinidas);
            } finally {
                setLoading(false);
            }
        };
        fetchMembresias();
    }, []);

    const handleCrear = async (e) => {
        e.preventDefault();
        if (!nombre || !precio || !duracion) {
            alert('Por favor completa todos los campos');
            return;
        }

        try {
            const nuevaMembresia = {
                nombre,
                descripcion,
                precio: parseFloat(precio),
                duracion,
                caracteristicas: []
            };
            
            const data = await crearMembresia(nuevaMembresia);
            setMembresias([...membresias, data]);
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setDuracion('');
            setShowForm(false);
            alert('Membresía creada exitosamente');
        } catch (error) {
            console.error('Error creando membresía:', error);
            alert('Error al crear la membresía');
        }
    };

    const handleSeleccionarMembresia = (membresia) => {
        alert(`¡Excelente elección! Has seleccionado el plan ${membresia.nombre}`);
        // Aquí podrías redirigir al proceso de pago o registro
    };


 if (loading) {
        return (
            <div className="membresias-loading">
                <div className="loading-spinner"></div>
                <p>Cargando planes...</p>
            </div>
        );
    }

    return (
        <div className="membresias-page">
            {/* Header */}
            <header className="main-header">
                <div className="header-container">
                    <div className="logo-container">
                        <Link to="/">
                            <img src="/assets/Imagenes/logo.png" alt="Logo AresFitness" />
                        </Link>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><Link to="/ubicacion"><FontAwesomeIcon icon={faMapMarkerAlt} /> UBICACIÓN</Link></li>
                            <li><Link to="/ejercicios"><FontAwesomeIcon icon={faRunning} /> EJERCICIOS</Link></li>
                            <li><Link to="/membresias" className="active"><FontAwesomeIcon icon={faCrown} /> MEMBRESÍAS</Link></li>
                        </ul>
                    </nav>
                    <div className="header-actions">
                        <button className="user-btn">
                            <FontAwesomeIcon icon={faUser} /> Mi Cuenta
                        </button>
                        <div className="auth-dropdown">
                            <Link to="/login">
                                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
                            </Link>
                            <Link to="/registro">
                                <FontAwesomeIcon icon={faUserPlus} /> Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-membresias">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>ELIGE TU PLAN PERFECTO</h1>
                        <p>Descubre la membresía que se adapte a tus objetivos y transforma tu vida</p>
                    </div>
                </div>
            </section>

            {/* Membresías Section */}
            <section className="membresias-section">
                <div className="section-title">
                    <h2>NUESTROS PLANES</h2>
                    <div className="title-line"></div>
                    <p>Selecciona el plan que mejor se adapte a tus necesidades fitness</p>
                </div>

                <div className="membresias-grid">
                    {membresias.map((membresia) => (
                        <div 
                            key={membresia.id} 
                            className={`membresia-card ${membresia.popular ? 'popular' : ''}`}
                        >
                            {membresia.popular && (
                                <div className="popular-badge">
                                    <FontAwesomeIcon icon={faStar} />
                                    MÁS POPULAR
                                </div>
                            )}
                            
                            <div className="membresia-header">
                                <div className="membresia-icon">
                                    <FontAwesomeIcon 
                                        icon={membresia.icono || faCrown} 
                                        style={{ color: membresia.color || '#ffd500' }} 
                                    />
                                </div>
                                <h3>{membresia.nombre}</h3>
                                <p className="membresia-descripcion">{membresia.descripcion}</p>
                            </div>

                            <div className="membresia-precio">
                                <span className="precio">S/ {membresia.precio}</span>
                                <span className="duracion">/{membresia.duracion}</span>
                            </div>

                            <ul className="caracteristicas-list">
                                {membresia.caracteristicas && membresia.caracteristicas.map((caracteristica, index) => (
                                    <li key={index}>
                                        <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                        {caracteristica}
                                    </li>
                                ))}
                            </ul>

                            <button 
                                className={`btn-membresia ${membresia.popular ? 'btn-popular' : ''}`}
                                onClick={() => handleSeleccionarMembresia(membresia)}
                            >
                                SELECCIONAR PLAN
                            </button>
                        </div>
                    ))}
                </div>

                {/* Comparación de Planes */}
                <div className="comparison-section">
                    <div className="section-title">
                        <h2>COMPARACIÓN DE PLANES</h2>
                        <div className="title-line"></div>
                    </div>
                    
                    <div className="comparison-table">
                        <div className="comparison-header">
                            <div className="feature-column">CARACTERÍSTICAS</div>
                            <div className="plan-column">BÁSICA</div>
                            <div className="plan-column popular">PREMIUM</div>
                            <div className="plan-column">VIP</div>
                        </div>
                        
                        <div className="comparison-row">
                            <div className="feature-column">Acceso a musculación</div>
                            <div className="plan-column"><FontAwesomeIcon icon={faCheck} /></div>
                            <div className="plan-column popular"><FontAwesomeIcon icon={faCheck} /></div>
                            <div className="plan-column"><FontAwesomeIcon icon={faCheck} /></div>
                        </div>
                        
                        <div className="comparison-row">
                            <div className="feature-column">Clases grupales</div>
                            <div className="plan-column"><FontAwesomeIcon icon={faTimes} /></div>
                            <div className="plan-column popular"><FontAwesomeIcon icon={faCheck} /></div>
                            <div className="plan-column"><FontAwesomeIcon icon={faCheck} /></div>
                        </div>
                        
                        <div className="comparison-row">
                            <div className="feature-column">Entrenador personal</div>
                            <div className="plan-column"><FontAwesomeIcon icon={faTimes} /></div>
                            <div className="plan-column popular"><FontAwesomeIcon icon={faTimes} /></div>
                            <div className="plan-column"><FontAwesomeIcon icon={faCheck} /></div>
                        </div>
                        
                        <div className="comparison-row">
                            <div className="feature-column">Acceso 24/7</div>
                            <div className="plan-column"><FontAwesomeIcon icon={faTimes} /></div>
                            <div className="plan-column popular"><FontAwesomeIcon icon={faTimes} /></div>
                            <div className="plan-column"><FontAwesomeIcon icon={faCheck} /></div>
                        </div>
                    </div>
                </div>

                {/* Admin Section (Opcional) */}
                <div className="admin-section">
                    <button 
                        className="btn-admin-toggle"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'CANCELAR' : 'AGREGAR MEMBRESÍA'}
                    </button>

                    {showForm && (
                        <form className="membresia-form" onSubmit={handleCrear}>
                            <h3>Agregar Nueva Membresía</h3>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Nombre de la membresía"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    placeholder="Descripción"
                                    rows="3"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                        placeholder="Precio"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={duracion}
                                        onChange={(e) => setDuracion(e.target.value)}
                                        placeholder="Duración (ej: 1 mes)"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-submit">
                                CREAR MEMBRESÍA
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="main-footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <div className="logo-footer">
                            <Link to="/">
                                <img src="/assets/Imagenes/logo.png" alt="Logo AresFitness" />
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
                        <div className="contact-info">
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Av. Principal 123, Lima, Perú</p>
                            <p><FontAwesomeIcon icon={faPhone} /> (01) 123-4567</p>
                            <p><FontAwesomeIcon icon={faEnvelope} /> info@aresfitness.com</p>
                            <p><FontAwesomeIcon icon={faWhatsapp} /> +51 987 654 321</p>
                        </div>
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

export default MembresiasPage;