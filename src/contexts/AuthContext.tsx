import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import type { UserCreate } from '@/types/api.types';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (userData: UserCreate) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [username, setUsername] = useState<string | null>("Demo User");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = authService.isAuthenticated();
        const storedUsername = authService.getUsername();

        if (token && storedUsername) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        await authService.login(username, password);
        setIsAuthenticated(true);
        setUsername(username);
    };

    const register = async (userData: UserCreate) => {
        await authService.register(userData);
        setIsAuthenticated(true);
        setUsername(userData.username);
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
