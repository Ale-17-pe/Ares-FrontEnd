import apiClient from './api.js';

export const registrarUsuario = async (usuario) => {
  const response = await apiClient.post('/usuarios/registrar', usuario);
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