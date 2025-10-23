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
        const tokenGuardado = localStorage.getItem('jwtToken');
        
        if (usuarioGuardado && tokenGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
            setToken(tokenGuardado);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokenGuardado}`;
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

            // Redirigir según el rol
            if (datosUsuario.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
            
            return { success: true };
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            return { 
                success: false, 
                error: error.response?.data?.error || "Error al iniciar sesión" 
            };
        }
    };

    const logout = () => {
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

export function useAuth() {
    return useContext(AuthContext);
}   