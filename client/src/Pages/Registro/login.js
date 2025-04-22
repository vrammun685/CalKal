import '../../App.css';
import { useState, useEffect } from 'react';
import { CambioIdioma } from '../../Componentes/idioma';
import { FormularioLogin } from '../../Componentes/formularios';
import { useLocation } from 'react-router-dom';

export default function PaginaLogin() {
    const mensaje = useLocation().state;
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  
    const cambiarIdioma = (nuevoIdioma) => {
      setIdioma(nuevoIdioma);
      localStorage.setItem('idioma', nuevoIdioma);
    };

    return(
        <div>
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
            {mensaje && (
            <div className="alert alert-success text-center">
                {idioma === 'es' ? mensaje.mensajees : mensaje.mensajeen}
            </div>)}
            <FormularioLogin idioma={idioma}/>
        </div>
    );

}