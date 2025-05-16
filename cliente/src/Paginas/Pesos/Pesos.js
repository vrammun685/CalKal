import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListadoPesos from '../../Componentes/Listados/ListadoPesos/ListadoPesos';
import { GraficoPesos } from '../../Componentes/Graficos/Grafico_Pesos/Grafico_Pesos';
import api from '../../auth/axiosConfig';

export default function PaginaPesos(){
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    const [pesos, setPesos] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState(null);

    useEffect(() => {
        api.get('/pesos/')
            .then(res => {
            setPesos(res.data.pesos);
            setDatosUsuario(res.data.foto_perfil);
            console.log("Pesos del usuario:", res.data);
        })
        .catch(err => {
            console.error("Error al obtener los pesos del usuario:", err);
        });
    }, []);

    const eliminar = (pesoID) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este peso?")) {
            axios.delete(`http://localhost:8000/api/pesos/${pesoID}/`,{withCredentials:true})
            .then(res => {
                console.log(res.data.mensaje);
                setPesos(prev => prev.filter(p => p.id !== pesoID));
            })
            .catch(err => {
                console.error("Error al eliminar el peso:", err);
            });
        }
    }

    const editar = (pesoID) => {
        
    }

    return(
        <div>
            <MenuPrincipal idioma={idioma} setIdioma={setIdioma} imagenPerfil={datosUsuario}/>
            <GraficoPesos pesos={pesos}/>
            <ListadoPesos idioma={idioma} pesos={pesos} eliminar={eliminar}/>
        </div>
    )
}