import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaPrivada({ children }) {
  const { token, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // o un spinner

  if (!token) return <Navigate to="/login" replace />;

  return children;
}