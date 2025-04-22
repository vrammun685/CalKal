import '../../App.css';
import { useState, useEffect } from 'react';
import { CambioIdioma } from '../../Componentes/idioma';
import { FormularioPedirEmail, FormularioCambiarContraseña } from '../../Componentes/formularios';

export function PaginaRecuperarContraseñaCorreo(){

    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

    const cambiarIdioma = (nuevoIdioma) => {
        setIdioma(nuevoIdioma);
        localStorage.setItem('idioma', nuevoIdioma);
      };
      
    return(
        <div>
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
            <FormularioPedirEmail idioma={idioma} />
        </div>        
    )
}

export function PaginaEscribirNuevaContraseña(){
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

    const cambiarIdioma = (nuevoIdioma) => {
        setIdioma(nuevoIdioma);
        localStorage.setItem('idioma', nuevoIdioma);
      };
      return(
        <div>
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
            <FormularioCambiarContraseña idioma={idioma} />
        </div>
      )
}

