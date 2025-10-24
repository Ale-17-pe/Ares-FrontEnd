import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";

import {
    faMapMarkerAlt,
    faCrown,
    faUserPlus,
    faHeart,
    faShieldAlt,
    faTrophy,
    faCalendarAlt,
    faGraduationCap,
    faEye,
    faPhone,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons';

import './css/NosotrosPage.css';

function NosotrosPage() {
    // Datos del equipo
    const equipo = [
        {
            id: 1,
            nombre: "Carlos Rodríguez",
            puesto: "Fundador & Head Coach",
            experiencia: "8+ años",
            especialidad: "Strength Training",
            imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face",
            redes: {
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            id: 2,
            nombre: "Ana Martínez",
            puesto: "Nutrition Specialist",
            experiencia: "6+ años",
            especialidad: "Sports Nutrition",
            imagen: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face",
            redes: {
                instagram: "#",
                linkedin: "#"
            }
        },
        {
            id: 3,
            nombre: "Miguel Torres",
            puesto: "Functional Trainer",
            experiencia: "5+ años",
            especialidad: "Cross Training",
            imagen: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop&crop=face",
            redes: {
                instagram: "#",
                linkedin: "#"
            }
        }
    ];

    // Valores de la empresa
    const valores = [
        {
            icono: faHeart,
            titulo: "Pasión por la Comunidad",
            descripcion: "Creemos en el poder transformador del fitness y nos apasiona ayudar a cada miembro a alcanzar su máximo potencial."
        },
        {
            icono: faTrophy,
            titulo: "Excelencia",
            descripcion: "Nos esforzamos por ofrecer los mejores equipos, entrenamientos y servicios para garantizar resultados excepcionales."
        },
        {
            icono: faUsers,
            titulo: "Comunidad",
            descripcion: "Más que un gimnasio, somos una familia donde cada miembro encuentra apoyo, motivación y amistad."
        },
        {
            icono: faShieldAlt,
            titulo: "Seguridad",
            descripcion: "Tu bienestar es nuestra prioridad. Instalaciones seguras y profesionales certificados en cada área."
        }
    ];

    // Logros y estadísticas
    const logros = [
        { numero: "5000+", texto: "Miembros Transformados" },
        { numero: "5+", texto: "Años de Experiencia" },
        { numero: "50+", texto: "Entrenadores Certificados" },
        { numero: "98%", texto: "Satisfacción del Cliente" }
    ];

    return (
        <div className="ares-nosotros-page">
            {/* Hero Section */}
            <section className="ares-hero-nosotros">
                <div className="ares-hero-overlay">
                    <div className="ares-hero-content">
                        <h1>MÁS QUE UN GIMNASIO, UNA FAMILIA</h1>
                        <p>Descubre la historia, valores y equipo detrás de AresFitness</p>
                    </div>
                </div>
            </section>

            {/* Historia Section */}
            <section className="ares-historia-section">
                <div className="ares-container">
                    <div className="ares-section-title">
                        <h2>NUESTRA HISTORIA</h2>
                        <div className="ares-title-line"></div>
                    </div>

                    <div className="ares-historia-content">
                        <div className="ares-historia-text">
                            <h3>De una visión a una realidad transformadora</h3>
                            <p>
                                Fundado en <strong>2020</strong>, AresFitness nació de una simple pero poderosa visión:
                                crear un espacio donde cada persona, sin importar su nivel de experiencia, pudiera
                                encontrar las herramientas, guía y comunidad necesarias para transformar su vida
                                a través del fitness.
                            </p>
                            <p>
                                Lo que comenzó como un pequeño local con equipos básicos, hoy es un centro de
                                fitness de referencia con <strong>más de 5,000 miembros</strong> que han confiado
                                en nosotros para su journey fitness.
                            </p>
                            <div className="ares-historia-logros">
                                {logros.map((logro, index) => (
                                    <div key={index} className="ares-logro-item">
                                        <span className="ares-logro-numero">{logro.numero}</span>
                                        <span className="ares-logro-texto">{logro.texto}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="ares-historia-imagen">
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=700&fit=crop"
                                alt="Historia de AresFitness"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Misión Visión Section */}
            <section className="ares-mision-vision-section">
                <div className="ares-container">
                    <div className="ares-mision-vision-grid">
                        <div className="ares-mision-card">
                            <div className="ares-card-icon">
                                <FontAwesomeIcon icon={faTrophy} />
                            </div>
                            <h3>Nuestra Misión</h3>
                            <p>
                                Empoderar a cada individuo para alcanzar su mejor versión a través
                                de programas de fitness personalizados, comunidad de apoyo y
                                un ambiente motivador que inspire transformaciones duraderas.
                            </p>
                        </div>

                        <div className="ares-vision-card">
                            <div className="ares-card-icon">
                                <FontAwesomeIcon icon={faEye} />
                            </div>
                            <h3>Nuestra Visión</h3>
                            <p>
                                Ser el referente líder en fitness a nivel nacional, reconocido
                                por nuestra excelencia en servicio, innovación en entrenamientos
                                y por construir la comunidad fitness más unida y motivada.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores Section */}
            <section className="ares-valores-section">
                <div className="ares-container">
                    <div className="ares-section-title">
                        <h2>NUESTROS VALORES</h2>
                        <div className="ares-title-line"></div>
                        <p>Los principios que guían cada decisión y acción en AresFitness</p>
                    </div>

                    <div className="ares-valores-grid">
                        {valores.map((valor, index) => (
                            <div key={index} className="ares-valor-card">
                                <div className="ares-valor-icon">
                                    <FontAwesomeIcon icon={valor.icono} />
                                </div>
                                <h4>{valor.titulo}</h4>
                                <p>{valor.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipo Section */}
            <section className="ares-equipo-section">
                <div className="ares-container">
                    <div className="ares-section-title">
                        <h2>NUESTRO EQUIPO</h2>
                        <div className="ares-title-line"></div>
                        <p>Conoce a los profesionales apasionados que harán de tu journey una experiencia única</p>
                    </div>

                    <div className="ares-equipo-grid">
                        {equipo.map((miembro) => (
                            <div key={miembro.id} className="ares-miembro-card">
                                <div className="ares-miembro-imagen">
                                    <img src={miembro.imagen} alt={miembro.nombre} />
                                    <div className="ares-miembro-overlay">
                                        <div className="ares-redes-sociales">
                                            <a href={miembro.redes.instagram} aria-label="Instagram">
                                                <FontAwesomeIcon icon={faInstagram} />
                                            </a>
                                            <a href={miembro.redes.linkedin} aria-label="LinkedIn">
                                                <FontAwesomeIcon icon={faLinkedin} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="ares-miembro-info">
                                    <h4>{miembro.nombre}</h4>
                                    <p className="ares-miembro-puesto">{miembro.puesto}</p>
                                    <div className="ares-miembro-datos">
                                        <span className="ares-experiencia">
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                            {miembro.experiencia}
                                        </span>
                                        <span className="ares-especialidad">
                                            <FontAwesomeIcon icon={faGraduationCap} />
                                            {miembro.especialidad}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instalaciones Section */}
            <section className="ares-instalaciones-section">
                <div className="ares-container">
                    <div className="ares-section-title">
                        <h2>NUESTRAS INSTALACIONES</h2>
                        <div className="ares-title-line"></div>
                        <p>Espacios diseñados para optimizar tu experiencia fitness</p>
                    </div>

                    <div className="ares-instalaciones-grid">
                        <div className="ares-instalacion-card">
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
                                alt="Zona de Musculación"
                            />
                            <div className="ares-instalacion-info">
                                <h4>Zona de Musculación</h4>
                                <p>Equipos de última generación para entrenamiento de fuerza</p>
                            </div>
                        </div>

                        <div className="ares-instalacion-card">
                            <img
                                src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&h=300&fit=crop"
                                alt="Área Cardio"
                            />
                            <div className="ares-instalacion-info">
                                <h4>Área Cardio</h4>
                                <p>Máquinas cardiovasculares con tecnología de punta</p>
                            </div>
                        </div>

                        <div className="ares-instalacion-card">
                            <img
                                src="https://images.unsplash.com/photo-1549060279-7e168faa7091?w=400&h=300&fit=crop"
                                alt="Estudio de Clases"
                            />
                            <div className="ares-instalacion-info">
                                <h4>Estudio de Clases</h4>
                                <p>Espacio dedicado para clases grupales y funcionales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="ares-cta-nosotros">
                <div className="ares-container">
                    <div className="ares-cta-content">
                        <h2>¿LISTO PARA UNIRTE A NUESTRA FAMILIA?</h2>
                        <p>Comienza tu transformación hoy mismo con una sesión gratuita</p>
                        <div className="ares-cta-buttons">
                            <Link to="/registro" className="ares-btn-cta-primary">
                                <FontAwesomeIcon icon={faUserPlus} /> COMENZAR AHORA
                            </Link>
                            <Link to="/planes" className="ares-btn-cta-secondary">
                                <FontAwesomeIcon icon={faCrown} /> VER PLANES
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="ares-main-footer">
                <div className="ares-footer-container">
                    <div className="ares-footer-section">
                        <div className="ares-logo-footer">
                            <Link to="/">
                                <img src={logo} alt="Logo AresFitness" />
                            </Link>
                        </div>
                        <p>Transformando vidas a través del fitness desde 2020</p>
                        <div className="ares-footer-social">
                            <a href="#" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://www.instagram.com/aresfitness.peru/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" aria-label="TikTok">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a href="#" aria-label="Twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>
                    </div>

                    <div className="ares-footer-section">
                        <h3>Enlaces rápidos</h3>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/nosotros">Nosotros</Link></li>
                            <li><Link to="/planes">Planes</Link></li>
                            <li><Link to="/ubicacion">Ubicación</Link></li>
                        </ul>
                    </div>

                    <div className="ares-footer-section">
                        <h3>Contacto</h3>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Av. Principal 123, Lima, Perú</p>
                        <p><FontAwesomeIcon icon={faPhone} /> (01) 123-4567</p>
                        <p><FontAwesomeIcon icon={faWhatsapp} /> +51 987 654 321</p>
                    </div>

                    <div className="ares-footer-section">
                        <h3>Horario de atención</h3>
                        <p>Lunes a Viernes: 5:00 am - 11:00 pm</p>
                        <p>Sábados: 6:00 am - 10:00 pm</p>
                        <p>Domingos: 7:00 am - 9:00 pm</p>
                    </div>
                </div>

                <div className="ares-footer-bottom">
                    <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default NosotrosPage;