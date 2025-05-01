import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MostrarDatos from './Pages/Mostrardatos';
import PaginaPresentacion from './Pages/PaginaPresentacion';
import PaginaLogin from './Pages/Registro/login';
import PaginaRegistro from './Pages/Registro/Registro';
import { TerminosCondiciones, PoliticaPrivacidad } from './Pages/Registro/TerminosCondiciones';
import {PaginaRecuperarContraseñaCorreo, PaginaEscribirNuevaContraseña} from './Pages/Registro/RecuperarContraseña';
import RutaPrivada from './Componentes/RutasPrivadas';
import { Home } from './Pages/Home';
import NotFoundPage from './Pages/NotFound';
import PaginaPesos from './Pages/PaginaPesos';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPresentacion />} />
        <Route path="/home" element={<RutaPrivada><Home /></RutaPrivada>} />
        <Route path="/pesos" element={<RutaPrivada><PaginaPesos /></RutaPrivada>} />
        <Route path="/datos" element={<RutaPrivada><MostrarDatos /></RutaPrivada>} />
        <Route path='/login' element={<PaginaLogin />} />
        <Route path='/registro' element={<PaginaRegistro />} />
        <Route path='/registro/terminosYcondiciones' element={<TerminosCondiciones />} />
        <Route path='/registro/PoliticaPrivacidad' element={<PoliticaPrivacidad />} />
        <Route path='/RecuperarContraseña' element={<PaginaRecuperarContraseñaCorreo />} />
        <Route path='/RecuperarContraseña/EscribirContraseña/:uid/:token' element={<PaginaEscribirNuevaContraseña />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
