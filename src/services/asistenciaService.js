import api from './api';

export const registrarAsistencia = async (idUsuario, idReserva = null) => {
    try {
        const response = await api.post('/api/asistencias/registrar', null, {
            params: { idUsuario, idReserva }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerHistorialPorUsuario = async (idUsuario) => {
    try {
        const response = await api.get(`/api/asistencias/usuario/${idUsuario}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listarAsistencias = async () => {
    try {
        // Si necesitas un endpoint para listar todas las asistencias
        const response = await api.get('/api/asistencias');
        return response.data;
    } catch (error) {
        throw error;
    }
};