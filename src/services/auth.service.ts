import { api } from './api';
import type { UserCreate, Token } from '@/types/api.types';

export const authService = {
    async register(userData: UserCreate): Promise<Token> {
        const response = await api.post<Token>('/auth/register', userData);
        const { access_token } = response.data;

        // Store token and username
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('username', userData.username);

        return response.data;
    },

    async login(username: string, password: string): Promise<Token> {
        // FastAPI OAuth2 expects form data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post<Token>('/auth/token', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const { access_token } = response.data;

        // Store token and username
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('username', username);

        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    },

    getUsername(): string | null {
        return localStorage.getItem('username');
    },
};
