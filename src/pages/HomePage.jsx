import React, { useEffect, useRef, useState } from "react";
import "./css/HomePage.css"; 
import logo from "../assets/Imagenes/logo.png";
import cuerda from "../assets/Imagenes/Cuerda.jpg";
import remo from "../assets/Imagenes/remo.jpg";
import espalda from "../assets/Imagenes/Espalda.PNG";
import minionMamado from "../assets/Imagenes/minionMamado.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, faSignInAlt, faUserPlus, faMapMarkerAlt, faRunning, faCrown,
    faHeartbeat, faUsers, faTrophy, faCheckCircle, faPhone, faEnvelope,
    faBars, faTimes, faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { 
    faFacebookF, faInstagram, faTwitter, faTiktok, faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

function HomePage() {
    const statsRef = useRef(null);
    const [countersVisible, setCountersVisible] = useState(false);

    // Efecto para detectar cuando las estadísticas son visibles
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCountersVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    // Componente Counter simple
    const Counter = ({ target, duration = 2000 }) => {
        const [count, setCount] = useState(0);
        
        useEffect(() => {
            if (!countersVisible) return;
            
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            
            return () => clearInterval(timer);
        }, [countersVisible, target, duration]);
        
        return count;
    };

    return (
        <>
            <section
                className="hero"
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${minionMamado}) no-repeat center center/cover`,
                }}
            >
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>TRANSFORMA TU CUERPO, TRANSFORMA TU VIDA</h1>
                        <p>Únete a la familia AresFitness y alcanza tus metas con los mejores entrenadores y equipos</p>
                        <div className="hero-buttons">
                            <a href="/registro" className="btn-primary">COMENZAR AHORA</a>
                            <a href="/planes" className="btn-secondary">VER PLANES</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUIÉNES SOMOS */}
            <section className="about-section">
                <div className="section-title">
                    <h2>¿QUIÉNES SOMOS?</h2>
                    <div className="title-line"></div>
                </div>

                <div className="about-container">
                    <div className="about-content">
                        <p>En <strong>AresFitness</strong>, somos más que un gimnasio: 
                        somos una comunidad apasionada por transformar vidas...</p>

                        <div className="about-features">
                            <div className="feature">
                                <FontAwesomeIcon icon={faHeartbeat} />
                                <h4>Salud Integral</h4>
                                <p>Nos preocupamos por tu bienestar físico y mental</p>
                            </div>
                            <div className="feature">
                                <FontAwesomeIcon icon={faUsers} />
                                <h4>Comunidad</h4>
                                <p>Únete a nuestra familia fitness y comparte tus logros</p>
                            </div>
                            <div className="feature">
                                <FontAwesomeIcon icon={faTrophy} />
                                <h4>Resultados</h4>
                                <p>Programas diseñados para que alcances tus metas</p>
                            </div>
                        </div>

                        {/* Estadísticas con efecto de conteo */}
                        <div className="stats-container" ref={statsRef}>
                            <div className="stat-item">
                                <h3>
                                    {countersVisible ? 
                                        <Counter target={5000} duration={2000} /> : 
                                        "0"
                                    }
                                </h3>
                                <p>Clientes Satisfechos</p>
                            </div>
                            <div className="stat-item">
                                <h3>
                                    {countersVisible ? 
                                        <Counter target={5} duration={1500} /> : 
                                        "0"
                                    }
                                </h3>
                                <p>Años de Experiencia</p>
                            </div>
                            <div className="stat-item">
                                <h3>
                                    {countersVisible ? 
                                        <Counter target={50} duration={1800} /> : 
                                        "0"
                                    }
                                </h3>
                                <p>Entrenadores Certificados</p>
                            </div>
                        </div>
                    </div>

                    <div className="about-image">
                        <img src={cuerda} alt="Instalaciones AresFitness" />
                    </div>
                </div>
            </section>

            {/* EXPERIENCIA */}
            <section className="experience-section">
                <div className="experience-container">
                    <div className="experience-image">
                        <img src={remo} alt="Clientes entrenando en AresFitness" />
                    </div>
                    <div className="experience-content">
                        <h2>MÁS DE 5 AÑOS TRANSFORMANDO VIDAS</h2>
                        <p>Llevamos más de <strong>5 años</strong> en el rubro del fitness...</p>
                        <ul className="experience-list">
                            <li><FontAwesomeIcon icon={faCheckCircle} /> Entrenadores certificados y con experiencia</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} /> Equipos de última generación</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} /> Programas personalizados</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} /> Ambiente motivador y seguro</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* VIDEO */}
            <section className="video-section">
                <div className="section-title">
                    <h2>CONOCE MÁS SOBRE NOSOTROS</h2>
                    <div className="title-line"></div>
                </div>
                <div className="video-container">
                    <iframe
                        width="800"
                        height="500"
                        src="https://www.youtube.com/embed/riWch046AqI?mute=1"
                        title="Video presentación AresFitness"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            {/* CTA */}
            <section
                className="cta-section"
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${espalda}) no-repeat center center/cover`,
                }}
            >
                <div className="cta-overlay">
                    <div className="cta-content">
                        <h2>¿LISTO PARA COMENZAR TU TRANSFORMACIÓN?</h2>
                        <p>Únete hoy mismo y obtén una sesión gratuita</p>
                        <div className="cta-buttons">
                            <a href="/registro" className="btn-primary">INSCRIBIRME AHORA</a>
                            <a href="/Planes" className="btn-primary">VER PLANES</a>
                            <a href="/ubicacion" className="btn-secondary">VISÍTANOS</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="main-footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <div className="logo-footer">
                            <a href="/">
                                <img src={logo} alt="Logo AresFitness" />
                            </a>
                        </div>
                        <p>Transformando vidas a través del fitness desde 2020</p>
                        <div className="footer-social">
                            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="https://www.instagram.com/aresfitness.peru/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTiktok} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h3>Contáctanos</h3>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Av. Principal 123, Lima, Perú</p>
                        <p><FontAwesomeIcon icon={faPhone} /> (01) 123-4567</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> info@aresfitness.com</p>
                        <p><FontAwesomeIcon icon={faWhatsapp} /> +51 987 654 321</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    );
}

export default HomePage;