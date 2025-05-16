import { useState, useEffect } from 'react';
import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import axios from 'axios';
import { GraficoCalorias } from '../../Componentes/Graficos/Grafico_Calorias/GraficoCalorias';
import { MacroBar } from '../../Componentes/Graficos/Grafico_Macros/Grafico_Macros';
import api from '../../auth/axiosConfig';

export default function Home(){
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    const [datosUsuario, setDatosUsuario] = useState(null);
    
    useEffect(() => {
        api.get('/home/')
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
                    <GraficoCalorias consumidas = {datosUsuario.calorias_Consumidas} objetivo={datosUsuario.calorias_a_consumir}/>
                    <div className="macro-bar-container d-flex flex-column flex-md-row justify-content-between align-items-stretch">
                        <div className="flex-fill">
                            <MacroBar
                            idioma = {idioma}
                            color = "EF6461"
                            nombreES="Proteínas"
                            nombreEN="Proteins"
                            valor={datosUsuario.proteinas_Consumidas}
                            maximo={datosUsuario.proteinas_a_Consumir}
                            />
                        </div>
                        <div className="flex-fill">
                            <MacroBar
                            idioma = {idioma}
                            color = "E4B363"
                            nombreES="Grasas"
                            nombreEN="Fats"
                            valor={datosUsuario.grasas_Consumidas}
                            maximo={datosUsuario.grasas_a_Consumir}
                            />
                        </div>
                        <div className="flex-fill">
                            <MacroBar
                            idioma = {idioma}
                            color = "4CAF87"
                            nombreES="Carbohidratos"
                            nombreEN="Carbohydrates"
                            valor={datosUsuario.carbohidratos_Consumidas}
                            maximo={datosUsuario.carbohidratos_a_Consumir}
                            />
                        </div>
                    </div>
                </div>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='ola'>
                <path fill="#4CAF87" fill-opacity="1" d="M0,32L60,74.7C120,117,240,203,360,213.3C480,224,600,160,720,154.7C840,149,960,203,1080,229.3C1200,256,1320,256,1380,256L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
        </div>
    )
}