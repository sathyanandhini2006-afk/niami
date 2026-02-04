import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { storageService } from '../services/storage';
import { useToast } from './ToastContext';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, pass: string) => Promise<boolean>;
    register: (data: any) => Promise<boolean>;
    logout: () => Promise<void>;
    updateUser: (user: User) => void;
    isLocked: boolean;
    setLocked: (locked: boolean) => void;
    setEmojiPassword: (password: string[]) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLocked, setIsLocked] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        const initAuth = async () => {
            const session = await storageService.getSession();
            if (session) {
                setUser(session);
                // On refresh, we don't automatically lock. 
                // The user stays unlocked if they were already in.
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, pass: string) => {
        setLoading(true);
        try {
            const res = await storageService.login(email, pass);
            if (res.success && res.data) {
                setUser(res.data);
                // Lock the app if user has an emoji password set
                if (res.data.emojiPassword && res.data.emojiPassword.length > 0) {
                    setIsLocked(true);
                }
                addToast(`Welcome back, ${res.data.name}!`, 'success');
                return true;
            } else {
                addToast(res.error || 'Login failed', 'error');
                return false;
            }
        } catch (err) {
            addToast('An unexpected error occurred during login', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: any) => {
        setLoading(true);
        try {
            // Create user
            const createRes = await storageService.createUser({
                id: crypto.randomUUID(),
                name: data.name,
                email: data.email,
                password: data.password,
                settings: { theme: 'dark', notificationsEnabled: true, defaultReminderTime: 15 }
            });

            if (createRes.success && createRes.data) {
                // Auto login
                const loginRes = await storageService.login(data.email, data.password);
                if (loginRes.success && loginRes.data) {
                    setUser(loginRes.data);
                    // Registration wouldn't have emoji pass yet, so no lock needed here
                    addToast('Account created successfully!', 'success');
                    return true;
                }
            }

            addToast(createRes.error || 'Registration failed', 'error');
            return false;
        } catch (err) {
            addToast('Registration error', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await storageService.logout();
        setUser(null);
        setIsLocked(false);
        addToast('Session ended securely', 'info');
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    }

    const setLocked = (locked: boolean) => {
        setIsLocked(locked);
    }

    const setEmojiPassword = async (password: string[]) => {
        if (!user) return false;
        try {
            const updatedUser = { ...user, emojiPassword: password };
            // In our mock storage, we need to update the user in the "database"
            const res = await storageService.updateUser(updatedUser);
            if (res.success) {
                setUser(updatedUser);
                addToast('Emoji password set successfully!', 'success');
                return true;
            }
            return false;
        } catch (err) {
            addToast('Failed to set emoji password', 'error');
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{
            user, loading, login, register, logout, updateUser,
            isLocked, setLocked, setEmojiPassword
        }}>
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
