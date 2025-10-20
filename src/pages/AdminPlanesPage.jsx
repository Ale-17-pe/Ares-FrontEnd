import React, { useState, useEffect } from 'react';
import { listarPlanes, crearPlan, actualizarPlan, eliminarPlan } from '../services/membresiaService';
import './AdminPlanesPage.css';

function AdminPlanesPage() {
    const [planes, setPlanes] = useState([]);
    const [planActual, setPlanActual] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [busqueda, setBusqueda] = useState('');

    const cargarPlanes = async () => {
        try {
            const data = await listarPlanes();
            setPlanes(data);
        } catch (err) {
            setError('Error al cargar los planes.');
            console.error(err);
        }
    };

    useEffect(() => {
        cargarPlanes();
    }, []);

    const handleCrearClick = () => {
        setPlanActual({ nombrePlan: '', descripcion: '', precio: '', duracionEnDias: '' });
        setFormVisible(true);
    };

    const handleEditarClick = (plan) => {
        setPlanActual({ ...plan });
        setFormVisible(true);
    };

    const handleEliminarClick = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este plan? Esta acción no se puede deshacer.')) {
            try {
                await eliminarPlan(id);
                cargarPlanes();
            } catch (err) {
                setError('Error al eliminar el plan.');
                console.error(err);
            }
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setPlanActual({ ...planActual, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (planActual.id) {
                await actualizarPlan(planActual.id, planActual);
            } else {
                await crearPlan(planActual);
            }
            setFormVisible(false);
            setPlanActual(null);
            cargarPlanes();
        } catch (err) {
            setError('Error al guardar el plan.');
            console.error(err);
        }
    };

    // Filtrar planes según la búsqueda
    const planesFiltrados = planes.filter(plan => 
        plan.nombrePlan.toLowerCase().includes(busqueda.toLowerCase()) ||
        plan.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="admin-planes-page">
            {/* Hero Section */}
            <section className="hero-admin">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Administración de Planes</h1>
                        <p>Gestiona todos los planes de membresía disponibles</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="admin-stats-section">
                <div className="stats-container">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h3>{planes.length}</h3>
                            <p>Planes Totales</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                            <h3>S/. {planes.reduce((acc, plan) => acc + parseFloat(plan.precio), 0).toFixed(2)}</h3>
                            <p>Valor Total</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-content">
                            <h3>{planes.reduce((acc, plan) => acc + parseInt(plan.duracionEnDias), 0)}</h3>
                            <p>Días Totales</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Herramientas Section */}
            <section className="herramientas-section">
                <div className="herramientas-container">
                    <div className="search-bar">
                        <div className="search-icon">🔍</div>
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Buscar planes..." 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    <div className="herramientas-derecha">
                        <div className="acciones-buttons">
                            <button className="btn-recargar" onClick={cargarPlanes}>
                                <span>🔄</span> Recargar
                            </button>
                            <button className="btn-nuevo" onClick={handleCrearClick}>
                                <span>➕</span> Crear Plan
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulario Modal */}
            {isFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setFormVisible(false)}>×</button>
                        <div className="modal-header">
                            <div className="plan-icon-large">
                                {planActual.id ? '✏️' : '➕'}
                            </div>
                            <div className="plan-info-modal">
                                <h2>{planActual.id ? 'Editar Plan' : 'Crear Nuevo Plan'}</h2>
                                <p className="plan-subtitle">
                                    {planActual.id ? 'Modifica los detalles del plan seleccionado' : 'Completa la información para crear un nuevo plan'}
                                </p>
                            </div>
                        </div>
                        <div className="modal-body">
                            {error && <p className="error-message">{error}</p>}
                            <form onSubmit={handleFormSubmit} className="plan-form">
                                <div className="form-group">
                                    <label>Nombre del Plan</label>
                                    <input 
                                        name="nombrePlan" 
                                        value={planActual.nombrePlan} 
                                        onChange={handleFormChange} 
                                        placeholder="Ej: Plan Premium" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea 
                                        name="descripcion" 
                                        value={planActual.descripcion} 
                                        onChange={handleFormChange} 
                                        placeholder="Describe los beneficios y características del plan" 
                                        required 
                                        rows="4"
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Precio (S/.)</label>
                                        <input 
                                            name="precio" 
                                            type="number" 
                                            step="0.01" 
                                            value={planActual.precio} 
                                            onChange={handleFormChange} 
                                            placeholder="99.90" 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Duración (días)</label>
                                        <input 
                                            name="duracionEnDias" 
                                            type="number" 
                                            value={planActual.duracionEnDias} 
                                            onChange={handleFormChange} 
                                            placeholder="30" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="btn-primary">
                                        <span>💾</span> Guardar Plan
                                    </button>
                                    <button type="button" className="btn-secondary" onClick={() => setFormVisible(false)}>
                                        <span>❌</span> Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla Section */}
            <section className="tabla-section">
                <div className="section-title">
                    <h2>Lista de Planes</h2>
                    <div className="title-line"></div>
                    <p>Gestiona y administra todos los planes de membresía</p>
                </div>

                <div className="tabla-container">
                    <div className="tabla-responsive">
                        <table className="tabla-planes">
                            <thead>
                                <tr>
                                    <th><span>ID</span></th>
                                    <th><span>Nombre del Plan</span></th>
                                    <th><span>Descripción</span></th>
                                    <th><span>Precio</span></th>
                                    <th><span>Duración</span></th>
                                    <th><span>Acciones</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {planesFiltrados.length > 0 ? (
                                    planesFiltrados.map(plan => (
                                        <tr key={plan.id} className="fila-plan">
                                            <td className="celda-id">{plan.id}</td>
                                            <td>
                                                <div className="info-plan">
                                                    <div className="plan-nombre">{plan.nombrePlan}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="plan-descripcion">
                                                    {plan.descripcion}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="celda-precio">
                                                    <span>💰</span> S/. {parseFloat(plan.precio).toFixed(2)}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="celda-duracion">
                                                    <span>⏱️</span> {plan.duracionEnDias} días
                                                </div>
                                            </td>
                                            <td>
                                                <div className="acciones-grid">
                                                    <button 
                                                        onClick={() => handleEditarClick(plan)} 
                                                        className="btn-accion btn-editar"
                                                        title="Editar plan"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button 
                                                        onClick={() => handleEliminarClick(plan.id)} 
                                                        className="btn-accion btn-eliminar"
                                                        title="Eliminar plan"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">
                                            <div className="no-resultados">
                                                <div>📋</div>
                                                <h3>No se encontraron planes</h3>
                                                <p>{busqueda ? 'No hay planes que coincidan con tu búsqueda' : 'No hay planes registrados aún'}</p>
                                                {!busqueda && (
                                                    <button className="btn-nuevo" onClick={handleCrearClick}>
                                                        <span>➕</span> Crear Primer Plan
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {planesFiltrados.length > 0 && (
                        <div className="resumen-tabla">
                            Mostrando {planesFiltrados.length} de {planes.length} planes
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminPlanesPage;