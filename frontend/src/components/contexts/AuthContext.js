import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState(''); // Add role state

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');

        if (token && storedUsername) {
            setLoggedIn(true);
            setUsername(storedUsername);//set de load ko mat username
            setRole(storedRole);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const login = (token, username, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        setUsername(username);
        setLoggedIn(true);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUsername('');
        setLoggedIn(false);
        setRole('');
    };

    return (
        <AuthContext.Provider value={{ username, role, loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>);
};

export { AuthContext, AuthProvider }