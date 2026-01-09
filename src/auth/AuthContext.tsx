import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import { getMe } from '@/api/auth';
import type { User } from '@/api/types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAuthData: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state on mount
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

            if (storedToken) {
                setToken(storedToken);
                try {
                    // Validate token by fetching user data
                    const userData = await getMe();
                    setUser(userData);
                } catch (error) {
                    // Invalid token, clear storage
                    console.error('Token validation failed:', error);
                    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
                    localStorage.removeItem(STORAGE_KEYS.USER);
                    setToken(null);
                }
            }

            setIsLoading(false);
        };

        initAuth();
    }, []);

    const setAuthData = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    };

    const handleLogout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token && !!user,
                isLoading,
                setAuthData,
                logout: handleLogout,
            }}
        >
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
