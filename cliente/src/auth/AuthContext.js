import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout/', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setIsAuthenticated(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/refreshtoken/', {}, {
        withCredentials: true
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        console.log("Token renovado");
      } else {
        console.error("No se pudo renovar el token");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error al intentar renovar el token:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get('http://localhost:8000/api/checktoken/', {
          withCredentials: true
        });
        setIsAuthenticated(true);
      } catch {
        await refreshToken();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);