import '../App.css';
import { CambioIdioma } from '../Componentes/idioma';
import { useState, useEffect } from 'react';
import MenuPrincipal from '../Componentes/Menu';
import axios from 'axios';
import { GraficoCalorias } from '../Componentes/graficos';

export function Home(){
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    const [datosUsuario, setDatosUsuario] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/home/', { withCredentials: true })
            .then(res => {
                setDatosUsuario(res.data);
                console.log("Datos del usuario:", res.data);
                
            })
            .catch(err => {
                console.error("Error al obtener datos del usuario:", err);
            });
    }, []);

    return(
        <div>
            {datosUsuario && (
                <div>
                    <MenuPrincipal idioma={idioma} setIdioma={setIdioma} imagenPerfil={datosUsuario.foto_perfil}/>
                    <h3>!Buenas {datosUsuario.usuario}!</h3>
                    <GraficoCalorias consumidas = {datosUsuario.calorias_Consumidas} objetivo={datosUsuario.calorias_a_consumir}/>
                </div>
            )}
        </div>
    )
}