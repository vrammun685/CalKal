import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FiltroPesos from '../../Componentes/Filtros/Filtro_Pesos/FiltroPesos';
import api from '../../auth/axiosConfig';
import "./Pesos.css";

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
            api.delete(`/pesos/${pesoID}/`)
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
        <div className='pesos'>
            <MenuPrincipal idioma={idioma} setIdioma={setIdioma} imagenPerfil={datosUsuario}/>
            <FiltroPesos idioma={idioma} pesos={pesos} eliminar={eliminar} />
        </div>
    )
}