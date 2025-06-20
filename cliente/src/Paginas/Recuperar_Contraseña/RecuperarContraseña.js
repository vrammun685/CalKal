import { useState, useEffect } from 'react';
import { CambioIdioma } from '../../Componentes/Selector_Idioma/SelectorIdiom';
import  FormularioPedirEmail  from '../../Componentes/Formularios/Formulario_PedirContraseña/FormularioPedirContraseña';

export default function PaginaRecuperarContraseñaCorreo(){

    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');

    const cambiarIdioma = (nuevoIdioma) => {
        setIdioma(nuevoIdioma);
        localStorage.setItem('idioma', nuevoIdioma);
      };
      
    return(
        <div className='fondo'>
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} className="cambioIdioma bg-white"/>
            <FormularioPedirEmail idioma={idioma} />
        </div>        
    )
}