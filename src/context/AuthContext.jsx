import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const tokenGuardado = localStorage.getItem('jwtToken');
        const usuarioGuardado = localStorage.getItem('usuario');

        if (usuarioGuardado && tokenGuardado) {
            console.log('🔍 Restaurando estado desde localStorage...');
            setUsuario(JSON.parse(usuarioGuardado));
            setToken(tokenGuardado);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokenGuardado}`;
        }
    }, []);

    const login = async (email, password) => {  
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token: newToken, usuario: datosUsuario } = response.data;

            // ✅ CORREGIDO: Actualizar estado ANTES de localStorage
            setUsuario(datosUsuario);
            setToken(newToken);

            // Luego guardar en localStorage
            localStorage.setItem('jwtToken', newToken);
            localStorage.setItem('usuario', JSON.stringify(datosUsuario));
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;


            // Redirigir
            if (datosUsuario.role === 'ADMIN' || datosUsuario.role === 'RECEPCIONISTA') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

            return { success: true };
        } catch (error) {
            console.error("Error en el login:", error);
            return {
                success: false,
                error: error.response?.data?.error || "Error al iniciar sesión"
            };
        }
    };

    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('usuario');
        delete apiClient.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const authData = {
        usuario,
        token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}