import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect, useMemo } from 'react';
import api from '../../auth/axiosConfig';
import FiltroPesos from '../../Componentes/Filtros/Filtro_Pesos/FiltroPesos';
import GraficoPesos from '../../Componentes/Graficos/Grafico_Pesos/Grafico_Pesos';
import ListadoPesos from '../../Componentes/Listados/ListadoPesos/ListadoPesos';
import ModalFormularioPeso from '../../Componentes/Modal/Modal_Peso/Modal_peso';
import "./Pesos.css";

export default function PaginaPesos() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [pesos, setPesos] = useState([]);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [filtro, setFiltro] = useState('todo');
  const [pesoEditar, setPesoEditar] = useState(null);
  const [mostrarModalPeso, setMostrarModalPeso] = useState(false);

  const editarPeso = async (peso) => {
    try {
      const res = await api.get(`/pesos/?pk=${peso.id}`);
      const pesoCompleto = res.data;

      setPesoEditar(pesoCompleto);
      setMostrarModalPeso(true);
    } catch (error) {
      console.error('Error al obtener el peso para editar:', error);
      alert('No se pudo cargar el peso');
    }
  };

  const crearPeso = () => {
    setPesoEditar(null);
    setMostrarModalPeso(true);
  };

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
  };

  const fechaLimite = useMemo(() => {
    const hoy = new Date();
    switch (filtro) {
      case '1year':
        return new Date(hoy.getFullYear() - 1, hoy.getMonth(), hoy.getDate());
      case '3months':
        return new Date(hoy.getFullYear(), hoy.getMonth() - 3, hoy.getDate());
      case '1month':
        return new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());
      case '1week':
        return new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
      default:
        return null;
    }
  }, [filtro]);

  const pesosFiltrados = useMemo(() => {
    if (!fechaLimite) return pesos;
    return pesos.filter(peso => new Date(peso.fecha) >= fechaLimite);
  }, [pesos, fechaLimite]);

  return (
    <div className='pesos'>
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} imagenPerfil={datosUsuario} />
      
      <FiltroPesos filtro={filtro} setFiltro={setFiltro} idioma={idioma} />

      <GraficoPesos pesos={pesosFiltrados} />

      {/* Botón para abrir modal de creación */}
      <button className="btn btn-primary mb-3" onClick={crearPeso}>
        Nuevo Registro de Peso
      </button>

      {/* Listado de pesos */}
      <ListadoPesos idioma={idioma} pesos={pesosFiltrados} eliminar={eliminar} editar={editarPeso} />

      {/* Modal con formulario para crear/editar peso */}
      {mostrarModalPeso && (
        <ModalFormularioPeso
          
          show={mostrarModalPeso}
          cerrar={() => setMostrarModalPeso(false)}
          pesos={pesos}
          setPesos={setPesos}
          pesoEditar={pesoEditar}
          setPesoEditar={setPesoEditar}
          idioma={idioma}
        />
      )}
    </div>
  );
}
