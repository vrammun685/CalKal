import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RutaPrivada from '../auth/RutaPrivada';

import Presentacion from '../Paginas/Presentacion/Presentacion';
/*
import Home from '../pages/Home';
import PaginaPesos from '../pages/PaginaPesos';
import MostrarDatos from '../pages/MostrarDatos';
import PaginaLogin from '../pages/PaginaLogin';

import TerminosCondiciones from '../pages/TerminosCondiciones';
import PoliticaPrivacidad from '../pages/PoliticaPrivacidad';
import PaginaRecuperarContraseñaCorreo from '../pages/PaginaRecuperarContraseñaCorreo';
import PaginaEscribirNuevaContraseña from '../pages/PaginaEscribirNuevaContraseña';*/
import NotFoundPage from '../Paginas/NotFound/NotFound';
import PaginaRegistro from '../Paginas/Registro/Registro';

export default function AppRouter() {
  return (
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Presentacion />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        {/* Rutas públicas 
        <Route path="/login" element={<PaginaLogin />} />
        
        <Route path="/registro/terminosYcondiciones" element={<TerminosCondiciones />} />
        <Route path="/registro/PoliticaPrivacidad" element={<PoliticaPrivacidad />} />
        <Route path="/RecuperarContraseña" element={<PaginaRecuperarContraseñaCorreo />} />
        <Route path="/RecuperarContraseña/EscribirContraseña/:uid/:token" element={<PaginaEscribirNuevaContraseña />} />
          */}
        {/* Rutas privadas
        <Route path="/home" element={<RutaPrivada><Home /></RutaPrivada>} />
        <Route path="/pesos" element={<RutaPrivada><PaginaPesos /></RutaPrivada>} />
        <Route path="/datos" element={<RutaPrivada><MostrarDatos /></RutaPrivada>} />
           */}
        {/* Ruta para página no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
}