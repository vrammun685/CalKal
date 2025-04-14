import Menu from "../Componentes/Menu";
import { useState, useEffect } from 'react';

export default function PaginaInicio() {
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

    return (
        <div>
            <h1>Página de Inicio</h1>
            <Menu idioma={idioma} setIdioma={setIdioma}/>
        </div>
    );
  }