import MenuPrincipal from '../Componentes/Menu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListadoPesos } from '../Componentes/Listados';
import { GraficoPesos } from '../Componentes/graficos';

export default function PaginaPesos(){
    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
    const [pesos, setPesos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/pesos/', { withCredentials: true })
            .then(res => {
                setPesos(res.data.pesos);
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
            <MenuPrincipal idioma={idioma} setIdioma={setIdioma}/>
            <GraficoPesos pesos={pesos}/>
            <ListadoPesos idioma={idioma} pesos={pesos} eliminar={eliminar}/>
        </div>
    )
}