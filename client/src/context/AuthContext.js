import { createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({children}) {

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = () => setToken(true); // en cookies, no necesitamos guardar token literal

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout/', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
    setToken(null);
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/refreshtoken/', {}, {
        withCredentials: true,  // Necesario para enviar las cookies
      });

      if (response.status === 200) {
        // Si la renovación es exitosa, actualizamos el token
        
        setToken(true);  // Aquí puedes almacenar el token real si lo deseas
        console.log("Token renovado");
      } else {
        console.error("No se pudo renovar el token");
      }
    } catch (error) {
      console.error("Error al intentar renovar el token:", error);
      setToken(null);  // Si no se puede renovar el token, cerramos sesión
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get('http://localhost:8000/api/checktoken/', {
          withCredentials: true
        });
        setToken(true);
      } catch {
        await refreshToken();  // Aquí sí puedes usar await
      } finally {
        setLoading(false);
      }
    };
  
    verifyToken();
  }, []);  

    return (
      <AuthContext.Provider value={{ token, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
}


export const useAuth = () => useContext(AuthContext);