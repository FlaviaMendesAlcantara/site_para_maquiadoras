import React, { createContext, useContext, useState } from 'react';

// Crie o contexto de autenticação
const AuthContext = createContext();

// Crie um componente de provedor que fornece o contexto de autenticação para seus componentes filhos
export const AuthProvider = ({ children }) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userIsAdmin, setUserIsAdmin] = useState(false);

    return (
        <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, userIsAdmin, setUserIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

// Crie um hook personalizado para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
