import apiClient from './api';

export const listarClases = async () => {
    try {
        const response = await apiClient.get('/reservas/clases');
        return response.data;
    } catch (error) {
        console.error('Error al listar las clases:', error);
        return [];
    }
};


export const crearClase = async (claseData) => {
    const response = await apiClient.post('/reservas/clases', claseData);
    return response.data;
};

export const actualizarClase = async (id, claseData) => {
    const response = await apiClient.put(`/reservas/clases/${id}`, claseData);
    return response.data;
};


export const eliminarClase = async (id) => {
    await apiClient.delete(`/reservas/clases/${id}`);
};

// --- Aquí irían las funciones para las reservas de los usuarios ---

export const crearReserva = async (reservaData) => {
    const response = await apiClient.post('/reservas', reservaData);
    return response.data;
};

export const obtenerReservasUsuario = async (usuarioId) => {
    const response = await apiClient.get(`/reservas/usuario/${usuarioId}`);
    return response.data;
};