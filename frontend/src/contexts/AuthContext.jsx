import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(() => {
    const stored = localStorage.getItem("adminCredentials");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data) => {
    localStorage.setItem("adminCredentials", JSON.stringify(data));
    setCredentials(data);
  };

  const logout = () => {
    localStorage.clear();
    setCredentials(null);
  };

  return (
    <AuthContext.Provider value={{ credentials, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
