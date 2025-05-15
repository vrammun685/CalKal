import { Link } from "react-router-dom";
import FormularioRegistro from '../../Componentes/Formularios/Formulario_Registro/FormularioRegistro';
import { CambioIdioma } from "../../Componentes/Selector_Idioma/SelectorIdiom";
import React, { useState } from 'react';

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