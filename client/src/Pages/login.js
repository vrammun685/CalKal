import '../App.css';
import { useState, useEffect } from 'react';
import { CambioIdioma } from '../Componentes/idioma';
import { Link } from "react-router-dom";
import { FormularioLogin } from '../Componentes/formularios';
export default function PaginaLogin() {
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  
    const cambiarIdioma = (nuevoIdioma) => {
      setIdioma(nuevoIdioma);
      localStorage.setItem('idioma', nuevoIdioma);
    };

    return(
        <div>
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
            <FormularioLogin idioma={idioma}/>
        </div>
    );

}