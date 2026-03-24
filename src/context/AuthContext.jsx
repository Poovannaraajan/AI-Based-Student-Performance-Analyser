import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('spa_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('spa_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('spa_user');
        }
    }, [user]);

    const login = (universityId, password) => {
        if (!universityId) return { success: false, message: 'University ID is required' };
        if (!password) return { success: false, message: 'Password is required' };

        const found = users.find(u => u.id === universityId);
        if (!found) return { success: false, message: 'User not found' };
        if (found.password !== password) return { success: false, message: 'Wrong password' };

        const { password: _, ...userWithoutPassword } = found;
        setUser(userWithoutPassword);
        return { success: true, user: userWithoutPassword };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('spa_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

export default AuthContext;
