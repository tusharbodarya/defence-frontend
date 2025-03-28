// context/AuthContext.js

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const login = (token, email) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("email", email);
    setAuthToken(token); // Update context state
    setEmail(email); // Update context state
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    setAuthToken(null); // Update context state
    setEmail(null); // Update context state
  };


  return (
    <AuthContext.Provider value={{ authToken, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
