import React, { useState, useEffect } from 'react';
// Necesitarías un servicio para obtener pagos por usuario
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCreditCard,
    faCheckCircle,
    faClock,
    faTimesCircle,
    faDownload
} from '@fortawesome/free-solid-svg-icons';
import './css/MisPagosPage.css';

function MisPagosPage() {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => {
            setPagos([
                {
                    id: 1,
                    monto: 149.90,
                    descripcion: 'Membresía Premium Mensual',
                    estado: 'COMPLETADO',
                    fecha: '2024-01-15',
                    metodoPago: 'Tarjeta Visa'
                },
                {
                    id: 2,
                    monto: 149.90,
                    descripcion: 'Membresía Premium Mensual',
                    estado: 'PENDIENTE',
                    fecha: '2024-02-15',
                    metodoPago: 'Tarjeta Visa'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div className="loading">Cargando tus pagos...</div>;
    }

    return (
        <div className="mis-pagos-page">
            <div className="header">
                <h1><FontAwesomeIcon icon={faCreditCard} /> Mis Pagos</h1>
                <p>Historial de tus transacciones</p>
            </div>

            <div className="pagos-list">
                {pagos.map(pago => (
                    <div key={pago.id} className={`pago-item ${pago.estado.toLowerCase()}`}>
                        <div className="pago-header">
                            <h3>{pago.descripcion}</h3>
                            <span className={`estado ${pago.estado.toLowerCase()}`}>
                                <FontAwesomeIcon icon={
                                    pago.estado === 'COMPLETADO' ? faCheckCircle :
                                    pago.estado === 'PENDIENTE' ? faClock : faTimesCircle
                                } />
                                {pago.estado}
                            </span>
                        </div>
                        <div className="pago-details">
                            <div className="monto">${pago.monto.toFixed(2)}</div>
                            <div className="fecha">{pago.fecha}</div>
                            <div className="metodo">{pago.metodoPago}</div>
                        </div>
                        {pago.estado === 'COMPLETADO' && (
                            <button className="btn-descargar">
                                <FontAwesomeIcon icon={faDownload} />
                                Descargar Recibo
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MisPagosPage;