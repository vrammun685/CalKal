import '../App.css';
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { CambioIdioma } from './idioma';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



export default function MenuPrincipal({idioma, setIdioma}) {
  const redireccion = useNavigate();
  const { logout } = useAuth(); 

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };

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
    <nav>
      <button onClick={CerrarSesion}>{idioma === 'es' ? 'Cerrar Sesion' : 'Log out'}</button>
      <Link to="/home">{idioma === 'es' ? 'Inicio' : 'Home'}</Link>
      <Link to="/diarios">{idioma === 'es' ? 'Diarios' : 'Diaries'}</Link>
      <Link to="/pesos">{idioma === 'es' ? 'Pesos' : 'Weights'}</Link>
      <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
    </nav>
  );
}













