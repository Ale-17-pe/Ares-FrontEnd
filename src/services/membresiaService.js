import apiClient from './api';

export const crearPlan = async (membresia) => {
  try {
    const response = await apiClient.post('/membresias/crear', membresia);
    return response.data.planMembresia;
  } catch (error) {
    console.error('Error al crear membresía:', error);
    throw error;
  }
}

export const listarPlanes = async () => {
  try {
    const response = await apiClient.get('/membresias/listar');
    return response.data;
  } catch (error) {
    console.error('Error al listar membresías:', error);
    return [];
  }
};

export const actualizarPlan = async (id, planData) => {
    const response = await apiClient.put(`/membresias/planes/${id}`, planData);
    return response.data;
};

export const eliminarPlan = async (id) => {
    await apiClient.delete(`/membresias/planes/${id}`);
};



export const suscribirUsuarioAPlan = async (datosSuscripcion) => {
    const response = await apiClient.post('/membresias/suscripciones', datosSuscripcion);
    return response.data;
};


export const obtenerMembresiaUsuario = async (usuarioId) => {
    const response = await apiClient.get(`/membresias/suscripciones/usuario/${usuarioId}`);
    return response.data;
};

export const listarSuscripciones = async () => {
    const response = await apiClient.get('/membresias/suscripciones');
    return response.data;
};