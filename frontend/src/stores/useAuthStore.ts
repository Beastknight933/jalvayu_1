import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    full_name?: string;
    is_active: boolean;
    is_superuser: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    
    // Actions
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setTokens: (accessToken, refreshToken) => 
                set({ accessToken, refreshToken, isAuthenticated: true }),
                
            setUser: (user) => set({ user }),

            logout: () => set({ 
                user: null, 
                accessToken: null, 
                refreshToken: null, 
                isAuthenticated: false 
            }),
        }),
        {
            name: 'auth-storage', // Key for localStorage
        }
    )
);
