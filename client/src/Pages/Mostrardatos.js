import MenuPrincipal from '../Componentes/Menu';
import { useState, useEffect } from 'react';
import {ListadosUsuarios} from '../Componentes/Listados';


export default function MostrarDatos() {
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    
    return (
        <div>
            <h1>Página de MuestraDatos</h1>
            <MenuPrincipal idioma={idioma} setIdioma={setIdioma}/>

            <ListadosUsuarios />
        </div>
    );
  }