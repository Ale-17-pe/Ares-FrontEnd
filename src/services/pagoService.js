import api from './api';

export const crearPago = async (transaccion) => {
    try {
        const response = await api.post('/api/pagos', transaccion);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerPago = async (id) => {
    try {
        const response = await api.get(`/api/pagos/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listarPagos = async () => {
    try {
        // Si necesitas un endpoint para listar todos los pagos
        const response = await api.get('/api/pagos');
        return response.data;
    } catch (error) {
        throw error;
    }
};