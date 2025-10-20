import React, { useEffect, useState } from "react";
import { listarPlanes} from "../services/membresiaService";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import libro from '../assets/Imagenes/LibroR.png';
import logo from "../assets/Imagenes/logo.png";

import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faUserPlus,
    faCheck,
    faStar,
    faFire,
    faDiamond,
    faDumbbell,
    faClock,
    faUsers,
    faHeart,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import "./PlanesPage.css";

function PlanesPage() {
    const [planes, setPlanes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Planes predefinidos como fallback
    const planesPredefinidos = [
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
        const fetchPlanes = async () => {
            try {
                setLoading(true);
                const data = await listarPlanes();
                if (data && data.length > 0) {
                    const planesConEstilo = data.map((plan, index) => ({
                        ...plan,
                        popular: index === 1,
                        icono: [faDumbbell, faFire, faDiamond][index] || faCrown,
                        color: ["#7f7676", "#ffd500", "#ff6b6b"][index] || "#ffd500",
                        caracteristicas: plan.caracteristicas || [
                            "Acceso a todas las áreas",
                            "Asesoría personalizada",
                            "Horario extendido"
                        ],
                        duracion: plan.duracion || "1 mes"
                    }));
                    setPlanes(planesConEstilo);
                } else {
                    setPlanes(planesPredefinidos);
                }
            } catch (error) {
                console.error("Error al cargar las membresías:", error);
                setError("No se pudieron cargar los planes. Inténtalo más tarde."); setPlanes(planesPredefinidos);
            } finally {
                setLoading(false);
            }
        };
        fetchPlanes();
    }, []);

    const handleSuscribirse = async (planId) => {
        setMensaje('');
        setError('');

        // Obtenemos el ID del usuario que ha iniciado sesión
        const usuarioLogueado = localStorage.getItem('usuario');
        if (!usuarioLogueado) {
            setError("Debes iniciar sesión para poder suscribirte.");
            // Opcional: redirigir al login
            setTimeout(() => navigate('/login'), 3000);
            return;
        }
        const usuario = JSON.parse(usuarioLogueado);

        try {
            // Preparamos el objeto que espera el backend
            const datosSuscripcion = {
                usuarioId: usuario.id,
                planId: planId,
            };

            await suscribirUsuarioAPlan(datosSuscripcion);

            setMensaje("¡Suscripción exitosa! Serás redirigido a tu dashboard en 3 segundos.");
            setTimeout(() => navigate('/dashboard'), 3000);

        } catch (err) {
            console.error("Error al suscribirse:", err);
            setError("Ocurrió un error al procesar tu suscripción. Es posible que ya tengas un plan activo.");
        }
    };

    if (loading) {
        return (
            <div className="planes-loading">
                <div className="loading-spinner"></div>
                <p>Cargando planes...</p>
            </div>
        );
    }

    return (
        <div className="planes-page">
            {/* Hero Section */}
            <section className="hero-planes">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>ELIGE TU PLAN IDEAL</h1>
                        <p>Encuentra la membresía perfecta para alcanzar tus metas fitness</p>
                    </div>
                </div>
            </section>

            {error && <p className="mensaje-error">{error}</p>}
            {mensaje && <p className="mensaje-exito">{mensaje}</p>}

            {/* Planes Section */}
            <section className="planes-section">
                <div className="section-title">
                    <h2>NUESTROS PLANES</h2>
                    <div className="title-line"></div>
                    <p>Selecciona el plan que se adapte a tu estilo de vida y objetivos</p>
                </div>

                <div className="planes-grid">
                    {planes.length > 0 ? (
                        planes.map((plan) => (
                            <div
                                key={plan.id}
                                className={`plan-card ${plan.popular ? 'popular' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="popular-badge">
                                        <FontAwesomeIcon icon={faStar} />
                                        MÁS POPULAR
                                    </div>
                                )}

                                <div className="plan-header">
                                    <div className="plan-icon">
                                        <FontAwesomeIcon
                                            icon={plan.icono || faCrown}
                                            style={{ color: plan.color || '#ffd500' }}
                                        />
                                    </div>
                                    <h3>{plan.nombre}</h3>
                                    <p className="plan-descripcion">{plan.descripcion}</p>
                                </div>

                                <div className="plan-precio">
                                    <span className="precio">S/ {plan.precio.toFixed(2)}</span>
                                    <span className="duracion">/{plan.duracionEnDias} días</span>
                                </div>

                                <ul className="caracteristicas-list">
                                    {plan.descripcion.split('. ').map((caracteristica, index) => (
                                        caracteristica && <li key={index}>
                                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                            {caracteristica}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`btn-suscribirse ${plan.popular ? 'btn-popular' : ''}`}
                                    onClick={() => handleSuscribirse(plan.id)}
                                >
                                    SUSCRIBIRME
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-planes">
                            <FontAwesomeIcon icon={faCrown} size="3x" />
                            <h3>No hay planes disponibles</h3>
                            <p>Próximamente tendremos nuevas membresías para ti</p>
                        </div>
                    )}
                </div>

                {/* Beneficios Adicionales */}
                <div className="beneficios-section">
                    <div className="section-title">
                        <h2>BENEFICIOS INCLUIDOS</h2>
                        <div className="title-line"></div>
                    </div>

                    <div className="beneficios-grid">
                        <div className="beneficio-card">
                            <FontAwesomeIcon icon={faClock} />
                            <h4>Horario Flexible</h4>
                            <p>Acceso en nuestro amplio horario de atención</p>
                        </div>

                        <div className="beneficio-card">
                            <FontAwesomeIcon icon={faUsers} />
                            <h4>Comunidad Activa</h4>
                            <p>Únete a nuestra comunidad fitness motivadora</p>
                        </div>

                        <div className="beneficio-card">
                            <FontAwesomeIcon icon={faShieldAlt} />
                            <h4>Seguridad Garantizada</h4>
                            <p>Instalaciones seguras y equipos de calidad</p>
                        </div>

                        <div className="beneficio-card">
                            <FontAwesomeIcon icon={faHeart} />
                            <h4>Asesoría Profesional</h4>
                            <p>Guía de entrenadores certificados</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>¿NO ESTÁS SEGURO QUÉ PLAN ELEGIR?</h2>
                    <p>Visítanos y recibe una sesión de assessment gratuita</p>
                    <div className="cta-buttons">
                        <Link to="/ubicacion" className="btn-cta-primary">
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> VISITAR GIMNASIO
                        </Link>
                        <Link to="/registro" className="btn-cta-secondary">
                            <FontAwesomeIcon icon={faUserPlus} /> CONSULTAR MÁS
                        </Link>
                    </div>
                </div>
            </section>

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

export default PlanesPage;