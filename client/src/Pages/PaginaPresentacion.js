import '../App.css';
import { useState, useEffect } from 'react';
import { CambioIdioma } from '../Componentes/idioma';
import { Link } from "react-router-dom";


export default function PaginaPresentacion() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };

  return(
    <div className='cartel-presentacion'>
        <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
        <section className="portada">
            <h1>{idioma === 'es' ? 'Bienvenido a CalKal' : 'Welcome to CalKal'}</h1>
             <p>{idioma === 'es' ? 'Tu guía de alimentos y calorías' : 'Your guide to food and calories'}</p>
        </section>
        <Link to="/login">
            <button>{idioma === 'es' ? 'Comencemos!' : 'Lets get started!'}</button>
        </Link>
    </div>
  );
}