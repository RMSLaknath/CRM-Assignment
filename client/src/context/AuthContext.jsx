import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      // Optional: decode token or fetch user later
      setUser({ authenticated: true });
    }

    setLoading(false);
  }, []);

  // Login function
  const login = (jwtToken, userData = null) => {
    localStorage.setItem("token", jwtToken);

    setToken(jwtToken);
    setUser(userData || { authenticated: true });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
