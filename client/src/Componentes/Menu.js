import '../App.css';
import '../estilos/Componentes/Menu.css';
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { CambioIdioma } from './idioma';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



export default function MenuPrincipal({idioma, setIdioma, imagenPerfil}) {
  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };

  return (
    <nav>
      <Link to="/home">{idioma === 'es' ? 'Inicio' : 'Home'}</Link>
      <Link to="/diarios">{idioma === 'es' ? 'Diarios' : 'Diaries'}</Link>
      <Link to="/pesos">{idioma === 'es' ? 'Pesos' : 'Weights'}</Link>
      <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
      <MenuPerfil idioma={idioma} imagenPerfil={imagenPerfil}/>
    </nav>
  );
}

export function MenuPerfil({idioma, imagenPerfil}){
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const redireccion = useNavigate();
  const CerrarSesion = async () => {
    
    try{ 
      await logout();
      redireccion('/login');
    }
      catch(error){
        console.error('Error cerrando sesión:', error);
      }
    }

  return (
    <div className="perfil-dropdown">
      <img
        src={imagenPerfil}
        alt="Perfil"
        className="perfil-imagen"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="perfil-menu">
          <Link to="/editarPerfil">{idioma === 'es' ? 'Editar Perfil' : 'Edit profile'}</Link>
          <button onClick={CerrarSesion}>{idioma === 'es' ? 'Cerrar Sesion' : 'Log out'}</button>
        </div>
      )}
    </div>
  );
};













