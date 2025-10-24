// src/hooks/useHomeEffects.js
import { useEffect, useRef, useState, useCallback } from 'react';

export const useHomeEffects = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Refs para los elementos del DOM
    const menuBtnRef = useRef(null);
    const menuRef = useRef(null);
    const dropdownBtnRef = useRef(null);
    const dropdownRef = useRef(null);
    const userMenuBtnRef = useRef(null);
    const authDropdownRef = useRef(null);

    // Funciones de control con useCallback
    const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const toggleDropdown = useCallback(() => setIsDropdownOpen(prev => !prev), []);
    const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

    // Efecto para cerrar menús al hacer clic fuera
    useEffect(() => {
        const handleDocumentClick = (e) => {
            // Cierra el menú móvil
            const isMenuClickOutside = (
                menuRef.current && 
                !menuRef.current.contains(e.target) &&
                menuBtnRef.current && 
                !menuBtnRef.current.contains(e.target)
            );

            // Cierra el dropdown
            const isDropdownClickOutside = (
                (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                 dropdownBtnRef.current && !dropdownBtnRef.current.contains(e.target)) ||
                (authDropdownRef.current && !authDropdownRef.current.contains(e.target) &&
                 userMenuBtnRef.current && !userMenuBtnRef.current.contains(e.target))
            );

            if (isMenuClickOutside && isMenuOpen) {
                closeMenu();
            }

            if (isDropdownClickOutside && isDropdownOpen) {
                closeDropdown();
            }
        };

        // Cerrar con tecla Escape
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                if (isMenuOpen) closeMenu();
                if (isDropdownOpen) closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
        document.addEventListener('touchstart', handleDocumentClick);
        document.addEventListener('keydown', handleEscapeKey);
        
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
            document.removeEventListener('touchstart', handleDocumentClick);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isMenuOpen, isDropdownOpen, closeMenu, closeDropdown]);

    // Efecto para deshabilitar scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Efecto para evitar que ambos menús estén abiertos al mismo tiempo
    useEffect(() => {
        if (isMenuOpen && isDropdownOpen) {
            closeDropdown();
        }
    }, [isMenuOpen, isDropdownOpen, closeDropdown]);

    return {
        isMenuOpen,
        isDropdownOpen,
        
        menuBtnRef,
        menuRef,
        dropdownBtnRef,
        dropdownRef,
        userMenuBtnRef,
        authDropdownRef,
        
        toggleMenu,
        closeMenu,
        toggleDropdown,
        closeDropdown
    };
};