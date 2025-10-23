import React, { useState, useEffect } from 'react';
import { listarPlanes, crearPlan, actualizarPlan, eliminarPlan } from '../services/membresiaService';
import './AdminPlanesPage.css';

function AdminPlanesPage() {
    const [planes, setPlanes] = useState([]);
    const [planActual, setPlanActual] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // NUEVO: Cargar planes con manejo mejorado de errores
    const cargarPlanes = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await listarPlanes();
            setPlanes(data);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al cargar los planes';
            setError(errorMsg);
            console.error('Error cargando planes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPlanes();
    }, []);

    // NUEVO: Mostrar mensaje de éxito temporal
    const mostrarExito = (mensaje) => {
        setSuccessMessage(mensaje);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleCrearClick = () => {
        setPlanActual({ 
            nombrePlan: '', 
            descripcion: '', 
            precio: '', 
            duracionEnDias: '' 
        });
        setFormVisible(true);
        setError('');
    };

    const handleEditarClick = (plan) => {
        setPlanActual({ ...plan });
        setFormVisible(true);
        setError('');
    };

    // NUEVO: Eliminar con confirmación mejorada
    const handleEliminarClick = async (id, nombrePlan) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el plan "${nombrePlan}"? Esta acción no se puede deshacer.`)) {
            try {
                await eliminarPlan(id);
                mostrarExito(`Plan "${nombrePlan}" eliminado correctamente`);
                cargarPlanes();
            } catch (err) {
                const errorMsg = err.response?.data?.message || 'Error al eliminar el plan';
                setError(errorMsg);
                console.error('Error eliminando plan:', err);
            }
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setPlanActual({ ...planActual, [name]: value });
    };

    // NUEVO: Submit mejorado con validaciones
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones mejoradas
        if (!planActual.nombrePlan.trim()) {
            setError('El nombre del plan es requerido');
            return;
        }

        if (!planActual.descripcion.trim()) {
            setError('La descripción es requerida');
            return;
        }

        const precio = parseFloat(planActual.precio);
        if (isNaN(precio) || precio <= 0) {
            setError('El precio debe ser un número mayor a 0');
            return;
        }

        const duracion = parseInt(planActual.duracionEnDias);
        if (isNaN(duracion) || duracion <= 0) {
            setError('La duración debe ser un número mayor a 0 días');
            return;
        }

        setLoading(true);
        try {
            if (planActual.id) {
                await actualizarPlan(planActual.id, planActual);
                mostrarExito(`Plan "${planActual.nombrePlan}" actualizado correctamente`);
            } else {
                await crearPlan(planActual);
                mostrarExito(`Plan "${planActual.nombrePlan}" creado correctamente`);
            }
            setFormVisible(false);
            setPlanActual(null);
            cargarPlanes();
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al guardar el plan';
            setError(errorMsg);
            console.error('Error guardando plan:', err);
        } finally {
            setLoading(false);
        }
    };

    // NUEVO: Ordenamiento de tabla
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // NUEVO: Filtrar y ordenar planes
    const planesFiltrados = planes
        .filter(plan =>
            plan.nombrePlan.toLowerCase().includes(busqueda.toLowerCase()) ||
            plan.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        )
        .sort((a, b) => {
            if (!sortConfig.key) return 0;
            
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (sortConfig.direction === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

    // NUEVO: Calcular estadísticas
    const estadisticas = {
        totalPlanes: planes.length,
        valorTotal: planes.reduce((acc, plan) => acc + parseFloat(plan.precio || 0), 0),
        diasTotales: planes.reduce((acc, plan) => acc + parseInt(plan.duracionEnDias || 0), 0),
        precioPromedio: planes.length > 0 ? 
            planes.reduce((acc, plan) => acc + parseFloat(plan.precio || 0), 0) / planes.length : 0
    };

    // NUEVO: Formatear moneda
    const formatearMoneda = (valor) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(valor);
    };

    return (
        <div className="admin-planes-page">
            {/* Loading Overlay Mejorado */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>{planActual ? 'Guardando plan...' : 'Cargando planes...'}</p>
                </div>
            )}

            {/* Mensaje de Éxito */}
            {successMessage && (
                <div className="success-message">
                    <span>✅</span> {successMessage}
                </div>
            )}

            <section className="hero-Planes-admin">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Administración de Planes</h1>
                        <p>Gestiona todos los planes de membresía disponibles</p>
                        <div className="hero-stats">
                            <span className="hero-stat">
                                <strong>{estadisticas.totalPlanes}</strong> planes activos
                            </span>
                            <span className="hero-stat">
                                <strong>{formatearMoneda(estadisticas.precioPromedio)}</strong> precio promedio
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section Mejorada */}
            <section className="admin-stats-section">
                <div className="stats-container">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h3>{estadisticas.totalPlanes}</h3>
                            <p>Planes Totales</p>
                            <span className="stat-trend positivo">+2 este mes</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                            <h3>{formatearMoneda(estadisticas.valorTotal)}</h3>
                            <p>Valor Total</p>
                            <span className="stat-trend positivo">+15%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-content">
                            <h3>{estadisticas.diasTotales}</h3>
                            <p>Días Totales</p>
                            <span className="stat-trend estable">0%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📈</div>
                        <div className="stat-content">
                            <h3>{formatearMoneda(estadisticas.precioPromedio)}</h3>
                            <p>Precio Promedio</p>
                            <span className="stat-trend positivo">+8%</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Herramientas Section Mejorada */}
            <section className="herramientas-section">
                <div className="herramientas-container">
                    <div className="search-container">
                        <div className="search-bar">
                            <div className="search-icon">🔍</div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Buscar planes por nombre o descripción..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            {busqueda && (
                                <button 
                                    className="clear-search"
                                    onClick={() => setBusqueda('')}
                                    title="Limpiar búsqueda"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="search-results">
                            {busqueda && (
                                <span>{planesFiltrados.length} planes encontrados</span>
                            )}
                        </div>
                    </div>
                    <div className="herramientas-derecha">
                        <div className="acciones-buttons">
                            <button 
                                className="btn-recargar" 
                                onClick={cargarPlanes} 
                                disabled={loading}
                                title="Recargar lista de planes"
                            >
                                <span className={loading ? 'spin' : ''}>🔄</span> 
                                {loading ? 'Cargando...' : 'Recargar'}
                            </button>
                            <button 
                                className="btn-nuevo" 
                                onClick={handleCrearClick} 
                                disabled={loading}
                                title="Crear nuevo plan"
                            >
                                <span>➕</span> Crear Plan
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal Mejorado */}
            {isFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button 
                            className="modal-close" 
                            onClick={() => setFormVisible(false)}
                            disabled={loading}
                        >
                            ×
                        </button>
                        <div className="modal-header">
                            <div className="plan-icon-large">
                                {planActual.id ? '✏️' : '➕'}
                            </div>
                            <div className="plan-info-modal">
                                <h2>{planActual.id ? 'Editar Plan' : 'Crear Nuevo Plan'}</h2>
                                <p className="plan-subtitle">
                                    {planActual.id ? 
                                        `Modificando "${planActual.nombrePlan}"` : 
                                        'Completa la información para crear un nuevo plan'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="modal-body">
                            {error && (
                                <div className="error-message">
                                    <span>⚠️</span> {error}
                                </div>
                            )}
                            <form onSubmit={handleFormSubmit} className="plan-form">
                                <div className="form-group">
                                    <label htmlFor="nombrePlan">Nombre del Plan *</label>
                                    <input
                                        id="nombrePlan"
                                        name="nombrePlan"
                                        value={planActual.nombrePlan}
                                        onChange={handleFormChange}
                                        placeholder="Ej: Plan Premium, Básico, etc."
                                        required
                                        maxLength={50}
                                    />
                                    <span className="char-count">
                                        {planActual.nombrePlan.length}/50
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción *</label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={planActual.descripcion}
                                        onChange={handleFormChange}
                                        placeholder="Describe los beneficios, características y servicios incluidos en este plan..."
                                        required
                                        rows="4"
                                        maxLength={500}
                                    />
                                    <span className="char-count">
                                        {planActual.descripcion.length}/500
                                    </span>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="precio">Precio (S/.) *</label>
                                        <input
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={planActual.precio}
                                            onChange={handleFormChange}
                                            placeholder="99.90"
                                            required
                                        />
                                        <small className="input-hint">Precio en soles peruanos</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="duracionEnDias">Duración (días) *</label>
                                        <input
                                            id="duracionEnDias"
                                            name="duracionEnDias"
                                            type="number"
                                            min="1"
                                            value={planActual.duracionEnDias}
                                            onChange={handleFormChange}
                                            placeholder="30"
                                            required
                                        />
                                        <small className="input-hint">Duración en días calendario</small>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button 
                                        type="submit" 
                                        className="btn-primary"
                                        disabled={loading}
                                    >
                                        <span className={loading ? 'spin' : ''}>
                                            {loading ? '⏳' : '💾'}
                                        </span> 
                                        {loading ? 'Guardando...' : 'Guardar Plan'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-secondary" 
                                        onClick={() => setFormVisible(false)}
                                        disabled={loading}
                                    >
                                        <span>❌</span> Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla Section Mejorada */}
            <section className="tabla-section">
                <div className="section-header">
                    <div className="section-title">
                        <h2>Lista de Planes</h2>
                        <div className="title-line"></div>
                        <p>Gestiona y administra todos los planes de membresía</p>
                    </div>
                    <div className="table-controls">
                        <span className="table-info">
                            Mostrando {planesFiltrados.length} de {planes.length} planes
                        </span>
                    </div>
                </div>

                <div className="tabla-container">
                    <div className="tabla-responsive">
                        <table className="tabla-planes">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('id')}>
                                        <span>
                                            ID 
                                            {sortConfig.key === 'id' && (
                                                <span className={`sort-arrow ${sortConfig.direction}`}>
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                    <th onClick={() => handleSort('nombrePlan')}>
                                        <span>
                                            Nombre del Plan
                                            {sortConfig.key === 'nombrePlan' && (
                                                <span className={`sort-arrow ${sortConfig.direction}`}>
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                    <th>Descripción</th>
                                    <th onClick={() => handleSort('precio')}>
                                        <span>
                                            Precio
                                            {sortConfig.key === 'precio' && (
                                                <span className={`sort-arrow ${sortConfig.direction}`}>
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                    <th onClick={() => handleSort('duracionEnDias')}>
                                        <span>
                                            Duración
                                            {sortConfig.key === 'duracionEnDias' && (
                                                <span className={`sort-arrow ${sortConfig.direction}`}>
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {planesFiltrados.length > 0 ? (
                                    planesFiltrados.map(plan => (
                                        <tr key={plan.id} className="fila-plan">
                                            <td className="celda-id">#{plan.id}</td>
                                            <td>
                                                <div className="info-plan">
                                                    <div className="plan-nombre">{plan.nombrePlan}</div>
                                                    <div className="plan-badge nuevo">Activo</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="plan-descripcion" title={plan.descripcion}>
                                                    {plan.descripcion}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="celda-precio">
                                                    <span className="price-icon">💰</span> 
                                                    <div className="price-info">
                                                        <div className="price-amount">
                                                            {formatearMoneda(parseFloat(plan.precio))}
                                                        </div>
                                                        <div className="price-period">por {plan.duracionEnDias} días</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="celda-duracion">
                                                    <span className="duration-icon">⏱️</span>
                                                    <div className="duration-info">
                                                        <div className="duration-days">{plan.duracionEnDias} días</div>
                                                        <div className="duration-months">
                                                            ({Math.round(plan.duracionEnDias / 30)} meses)
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="acciones-grid">
                                                    <button
                                                        onClick={() => handleEditarClick(plan)}
                                                        className="btn-accion btn-editar"
                                                        title={`Editar plan ${plan.nombrePlan}`}
                                                        disabled={loading}
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleEliminarClick(plan.id, plan.nombrePlan)}
                                                        className="btn-accion btn-eliminar"
                                                        title={`Eliminar plan ${plan.nombrePlan}`}
                                                        disabled={loading}
                                                    >
                                                        🗑️ Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">
                                            <div className="no-resultados">
                                                <div className="no-result-icon">📋</div>
                                                <h3>No se encontraron planes</h3>
                                                <p>
                                                    {busqueda ? 
                                                        `No hay planes que coincidan con "${busqueda}"` : 
                                                        'No hay planes registrados aún'
                                                    }
                                                </p>
                                                {!busqueda && (
                                                    <button 
                                                        className="btn-nuevo" 
                                                        onClick={handleCrearClick}
                                                        disabled={loading}
                                                    >
                                                        <span>➕</span> Crear Primer Plan
                                                    </button>
                                                )}
                                                {busqueda && (
                                                    <button 
                                                        className="btn-secondary" 
                                                        onClick={() => setBusqueda('')}
                                                    >
                                                        <span>🔍</span> Limpiar búsqueda
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
                        <div className="tabla-footer">
                            <div className="resumen-tabla">
                                <span>Mostrando {planesFiltrados.length} de {planes.length} planes</span>
                                {sortConfig.key && (
                                    <span className="sort-info">
                                        Ordenado por {sortConfig.key} ({sortConfig.direction === 'asc' ? 'ascendente' : 'descendente'})
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminPlanesPage;