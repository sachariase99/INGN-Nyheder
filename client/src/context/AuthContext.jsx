import React, { createContext, useState } from 'react';

// Opretter en ny kontekst ved hjælp af createContext-funktionen fra React
const AuthContext = createContext();

// Definerer en AuthProvider-komponent, der bruger useState-hook'en til at håndtere autentificeringsstatus
export const AuthProvider = ({ children }) => {
  // State-variabler til at spore autentificeringsstatus og brugerens email
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Funktion til at logge en bruger ind, der opdaterer isLoggedIn og userEmail
  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  // Funktion til at logge en bruger ud, der nulstiller isLoggedIn og userEmail
  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Returnerer AuthContext.Provider med værdien af autentificeringsstatus og funktioner til at logge ind og ud
  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Eksporterer AuthContext, så det kan bruges i andre dele af din applikation
export default AuthContext;