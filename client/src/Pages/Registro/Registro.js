import '../../App.css';
import { useState, useEffect } from 'react';
import { CambioIdioma } from '../../Componentes/idioma';
import { Link } from "react-router-dom";
import FormularioRegistro from '../../Componentes/formularios';

export default function PaginaRegistro() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };
  return(
    <div className='cartel-presentacion'>
        <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
        <FormularioRegistro idioma={idioma}/>
    </div>
  );
}