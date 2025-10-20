import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);

    const navigate = useNavigate();
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token, usuario: datosUsuario } = response.data;

            localStorage.setItem('jwtToken', token);
            localStorage.setItem('usuario', JSON.stringify(datosUsuario));
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setToken(token);
            setUsuario(datosUsuario);

            navigate('/dashboard');
            return { success: true };
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || "Error al iniciar sesión" };
        }
    };

    const logout = () => {
        console.log("Cerrando sesión desde el contexto...");
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('usuario');
        delete apiClient.defaults.headers.common['Authorization'];
        setToken(null);
        setUsuario(null);
        navigate('/login');
    };

    const authData = { usuario, token, login, logout };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Creamos un "Hook" personalizado para usar el contexto fácilmente
export function useAuth() {
    return useContext(AuthContext);
}