// src/hooks/useHomeEffects.js (versión simplificada)
import { useEffect, useRef, useState, useCallback } from 'react';

export const useHomeEffects = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const menuBtnRef = useRef(null);
    const menuRef = useRef(null);
    const userMenuBtnRef = useRef(null);
    const authDropdownRef = useRef(null);

    const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const toggleDropdown = useCallback(() => setIsDropdownOpen(prev => !prev), []);
    const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) &&
                menuBtnRef.current && !menuBtnRef.current.contains(e.target)) {
                closeMenu();
            }
            
            if (authDropdownRef.current && !authDropdownRef.current.contains(e.target) &&
                userMenuBtnRef.current && !userMenuBtnRef.current.contains(e.target)) {
                closeDropdown();
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeMenu();
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [closeMenu, closeDropdown]);

    return {
        isMenuOpen,
        isDropdownOpen,
        menuBtnRef,
        menuRef,
        userMenuBtnRef,
        authDropdownRef,
        toggleMenu,
        closeMenu,
        toggleDropdown,
        closeDropdown
    };
};  