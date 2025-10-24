import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/Imagenes/logo.png";
import libro from "../assets/Imagenes/LibroR.png";
import extencion from "../assets/Imagenes/extencion.jpg";

import {
    faMapMarkerAlt,
    faRunning,
    faCrown,
    faUser,
    faSignInAlt,
    faUserPlus,
    faClock,
    faPhone,
    faEnvelope,
    faDirections,
    faBus,
    faSubway,
    faParking
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import './css/UbicacionPage.css';

function UbicacionPage() {
    const userMenuBtnRef = useRef(null);
    const authDropdownRef = useRef(null);

    useEffect(() => {
        const userMenuBtn = userMenuBtnRef.current;
        const authDropdown = authDropdownRef.current;

        const handleUserMenuClick = (e) => {
            e.stopPropagation();
            authDropdown.classList.toggle('show');
        };

        const handleDocumentClick = (e) => {
            if (userMenuBtn && !userMenuBtn.contains(e.target) && 
                authDropdown && !authDropdown.contains(e.target)) {
                authDropdown.classList.remove('show');
            }
        };

        const handleAuthDropdownClick = (e) => {
            e.stopPropagation();
        };

        if (userMenuBtn && authDropdown) {
            userMenuBtn.addEventListener('click', handleUserMenuClick);
            authDropdown.addEventListener('click', handleAuthDropdownClick);
            document.addEventListener('click', handleDocumentClick);
        }

        return () => {
            if (userMenuBtn) {
                userMenuBtn.removeEventListener('click', handleUserMenuClick);
            }
            if (authDropdown) {
                authDropdown.removeEventListener('click', handleAuthDropdownClick);
            }
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className="ubicacion-page">


            {/* Main Content */}
            <main>
                <section 
                    className="hero-location" 
                    style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(https://substackcdn.com/image/fetch/$s_!vHIc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2dd9e8fc-8177-4229-8424-916ccfdf87aa_1280x720.jpeg) no-repeat center center/cover`
                    }}
                >
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h1>ENCUÉNTRANOS FÁCILMENTE</h1>
                            <p>Ven y conoce nuestras modernas instalaciones en un lugar estratégico de la ciudad</p>
                        </div>
                    </div>
                </section>

                <section className="location-section">
                    <div className="section-title">
                        <h2>NUESTRA UBICACIÓN</h2>
                        <div className="title-line"></div>
                        <p>Estamos ubicados en un lugar estratégico para tu comodidad</p>
                    </div>

                    <div className="location-container">
                        <div className="map-container">
                            <div className="map-frame">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.6893812773908!2d-76.82245228381464!3d-11.991272776981225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105e988107f9313%3A0xf42c35c05adcef9f!2sARES%20FITNESS!5e0!3m2!1ses-419!2spe!4v1745024811727!5m2!1ses-419!2spe"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación de AresFitness"
                                >
                                </iframe>
                            </div>
                        </div>

                        <div className="location-info">
                            <div className="info-card">
                                <div className="info-icon">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </div>
                                <div className="info-content">
                                    <h3>Dirección</h3>
                                    <p>ARES FITNESS, Entrada de Huascata, Chaclacayo 15472</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FontAwesomeIcon icon={faClock} />
                                </div>
                                <div className="info-content">
                                    <h3>Horario de Atención</h3>
                                    <p>Lunes a Viernes: 5:00 am - 11:00 pm</p>
                                    <p>Sábados: 6:00 am - 10:00 pm</p>
                                    <p>Domingos: 7:00 am - 9:00 pm</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <div className="info-content">
                                    <h3>Teléfono</h3>
                                    <p>(01) 123-4567</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <div className="info-content">
                                    <h3>Email</h3>
                                    <p>info@aresfitness.com</p>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <a 
                                    href="https://maps.app.goo.gl/jWqao1vUVbAip5KW9"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn-direction"
                                >
                                    <FontAwesomeIcon icon={faDirections} /> CÓMO LLEGAR
                                </a>
                                <a 
                                    href="https://api.whatsapp.com/send?phone=51987076253" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn-whatsapp"
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} /> ESCRIBENOS
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="transport-section">
                    <div className="section-title">
                        <h2>MEDIOS DE TRANSPORTE</h2>
                        <div className="title-line"></div>
                        <p>Llega fácilmente a nuestras instalaciones</p>
                    </div>

                    <div className="transport-options">
                        <div className="transport-card">
                            <div className="transport-icon">
                                <FontAwesomeIcon icon={faBus} />
                            </div>
                            <h3>Transporte Público</h3>
                            <p>Líneas de buses 102, 204 y 305 con parada a media cuadra</p>
                        </div>

                        <div className="transport-card">
                            <div className="transport-icon">
                                <FontAwesomeIcon icon={faSubway} />
                            </div>
                            <h3>Metro</h3>
                            <p>Estación Central a 3 cuadras de distancia</p>
                        </div>

                        <div className="transport-card">
                            <div className="transport-icon">
                                <FontAwesomeIcon icon={faParking} />
                            </div>
                            <h3>Estacionamiento</h3>
                            <p>Amplio estacionamiento gratuito para clientes</p>
                        </div>
                    </div>
                </section>
            </main>

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
                            <li><Link to="/Planes">Planes</Link></li>
                            <li><Link to="/ubicacion">Ubicación</Link></li>
                            <li><Link to="/ejercicios">Ejercicios</Link></li>
                            <li><Link to="/membresias">Membresías</Link></li>
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
                        <div className="reclamation">
                            <img src={libro} alt="Libro de Reclamaciones" />
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; 2025 AresFitness. Todos los derechos reservados.</p>
                        <div className="legal-links">
                            <a href="#">Términos y Condiciones</a>
                            <a href="#">Políticas de Privacidad</a>
                            <a href="#">Quejas y Reclamaciones</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default UbicacionPage;