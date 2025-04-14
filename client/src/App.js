import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PaginaInicio from './Pages/PaginaInicio';
import PaginaListadoAlimentos from './Pages/PaginaListadoAlimentos';
import MostrarDatos from './Pages/Mostrardatos';
import PaginaPresentacion from './Pages/PaginaPresentacion';
import PaginaLogin from './Pages/login';
import PaginaRegistro from './Pages/Registro';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPresentacion />} />
        <Route path="/home" element={<PaginaInicio />} />
        <Route path="/alimentos" element={<PaginaListadoAlimentos />} />
        <Route path="/datos" element={<MostrarDatos />} />
        <Route path='/login' element={<PaginaLogin />} />
        <Route path='/registro' element={<PaginaRegistro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
