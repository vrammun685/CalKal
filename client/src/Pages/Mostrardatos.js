import Menu from "../Componentes/Menu";
import { useState, useEffect } from 'react';
import {ListadosUsuarios} from '../Componentes/Listados';
import {FormulariosPrueba} from '../Componentes/formularios';

export default function MostrarDatos() {
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    
    return (
        <div>
            <h1>Página de MuestraDatos</h1>
            <Menu idioma={idioma} setIdioma={setIdioma}/>
            <FormulariosPrueba />
            <ListadosUsuarios />
        </div>
    );
  }