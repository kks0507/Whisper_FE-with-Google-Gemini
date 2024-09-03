import React, { createContext, useContext, useState } from 'react';
import { isAuthenticated as checkAuth, login as doLogin, logout as doLogout } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

    const login = (token) => {
        doLogin(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        doLogout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


