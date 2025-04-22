import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PaginaInicio from './Pages/PaginaInicio';
import MostrarDatos from './Pages/Mostrardatos';
import PaginaPresentacion from './Pages/PaginaPresentacion';
import PaginaLogin from './Pages/Registro/login';
import PaginaRegistro from './Pages/Registro/Registro';
import { TerminosCondiciones, PoliticaPrivacidad } from './Pages/Registro/TerminosCondiciones';
import {PaginaRecuperarContraseñaCorreo, PaginaEscribirNuevaContraseña} from './Pages/Registro/RecuperarContraseña';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPresentacion />} />
        <Route path="/home" element={<PaginaInicio />} />
        <Route path="/datos" element={<MostrarDatos />} />
        <Route path='/login' element={<PaginaLogin />} />
        <Route path='/registro' element={<PaginaRegistro />} />
        <Route path='/registro/terminosYcondiciones' element={<TerminosCondiciones />} />
        <Route path='/registro/PoliticaPrivacidad' element={<PoliticaPrivacidad />} />
        <Route path='/RecuperarContraseña' element={<PaginaRecuperarContraseñaCorreo />} />
        <Route path='/RecuperarContraseña/EscribirContraseña/:uid/:token' element={<PaginaEscribirNuevaContraseña />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
