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

export const obtenerPlanPorId = async (id) => {
  try {
    const response = await apiClient.get(`/membresias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el plan:', error);
    throw error;
  }
};

export const actualizarPlan = async (id, planData) => {
  try {
    const response = await apiClient.put(`/membresias/actualizar/${id}`, planData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el plan:', error);
    throw error;
  }
};

export const eliminarPlan = async (id) => { 
  try {
    await apiClient.delete(`/membresias/eliminar/${id}`);
  } catch (error) {
    console.error('Error al eliminar plan:', error);
    throw error;
  }
};



export const suscribirUsuarioAPlan = async (datosSuscripcion) => {
  try {
    const response = await apiClient.post('/membresias/suscripciones', datosSuscripcion);
    return response.data;
  } catch (error) {
    console.error('Error al suscribir usuario:', error);
    throw error;
  }
};


export const obtenerMembresiaUsuario = async (usuarioId) => {
  try {
    const response = await apiClient.get(`/membresias/suscripciones/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener membresía del usuario:', error);
    throw error;
  }
};

export const listarSuscripciones = async () => {
  try {
    const response = await apiClient.get('/membresias/suscripciones');
    return response.data;
  } catch (error) {
    console.error('Error al listar suscripciones:', error);
    return [];
  }
};