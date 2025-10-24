import apiClient from './api.js';

export const registrarUsuario = async (usuario) => {
  const response = await apiClient.post('/usuarios/registrar', usuario);
  return response.data;
};

export const crearRecepcionista = async (usuario) => {
  const response = await apiClient.post('/usuarios/crear-recepcionista', usuario);
  return response.data;
};

export const loginUsuario = async (usuario) => {
  const response = await apiClient.post('/usuarios/login', usuario);
  return response.data;
};

export const listarUsuarios = async () => {
  const response = await apiClient.get('/usuarios');
  return response.data;
};

export const actualizarUsuario = async (id, datos) => {
  const response = await apiClient.put(`/usuarios/actualizar/${id}`, datos);
  return response.data;
};

export const eliminarUsuario = async (id) => {
  const response = await apiClient.delete(`/usuarios/${id}`);
  return response.data;
};
export const obtenerUsuarioPorId = async (id) => {
  const response = await apiClient.get(`/usuarios/${id}`);
  return response.data;
};