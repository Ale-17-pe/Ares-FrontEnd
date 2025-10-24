import api from './api';

export const crearOpinion = async (opinion) => {
    try {
        const response = await api.post('/api/calificaciones', opinion);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerOpiniones = async (tipoEntidad, idEntidad) => {
    try {
        const response = await api.get(`/api/calificaciones/${tipoEntidad}/${idEntidad}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerPromedioCalificacion = async (tipoEntidad, idEntidad) => {
    try {
        const response = await api.get(`/api/calificaciones/promedio/${tipoEntidad}/${idEntidad}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};