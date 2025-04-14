import '../App.css';
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { CambioIdioma } from './idioma';

export default function Menu({idioma, setIdioma}) {
  
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
    </nav>
  );
}













