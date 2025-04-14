import '../App.css';
import { useState, useEffect } from 'react';
import { ListaAlimentos } from '../Componentes/Listados';
import { FiltroAlimentos } from '../Componentes/formularios';
import Menu from '../Componentes/Menu';

export default function PaginaListadoAlimentos() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [filtro, setFiltro] = useState('');
  const [alimentos, setAlimentos] = useState([]);

  //Llama a la api para recibir los datos
  useEffect(() => {
    fetch("https://calkal-default-rtdb.firebaseio.com/alimentos.json")
      .then(res => res.json())
      .then(data => {
        const alimentosArray = Object.values(data); // convierte el objeto en array
        setAlimentos(alimentosArray);
      })
      .catch(error => console.error("Error al listar:", error));
  }, []);

  return (
    <div>
      <h1>{idioma === 'es' ? 'Listado de Alimentos' : 'Food List'}</h1>
      <Menu idioma={idioma} setIdioma={setIdioma}/>
      <FiltroAlimentos filtro={filtro} setFiltro={setFiltro} />
      <ListaAlimentos idioma={idioma} filtro={filtro} alimentos={alimentos} />
    </div>
  );
}
