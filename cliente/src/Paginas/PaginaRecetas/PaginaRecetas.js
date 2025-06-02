import { useEffect, useState } from 'react';
import api from '../../auth/axiosConfig';
import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import ListaRecetas from '../../Componentes/Listados/ListadoRecetas/ListaRecetas';
import DetalleReceta from '../../Componentes/Listados/ListadoIngradientes/ListadoIngredientes';

export default function PaginaRecetas() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  useEffect(() => {
    api.get('/recetas/')
      .then(res => {
        setRecetas(res.data.Comidas || []);
      })
      .catch(err => {
        console.error('Error al obtener las recetas:', err);
      });
  }, []);

  return (
    <>
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} />

      <div className="container mt-4">
        <div className="row">
          {/* Tabla de recetas */}
          <div className="col-md-6">
            <ListaRecetas
              recetas={recetas}
              onSeleccionarReceta={setRecetaSeleccionada}
            />
          </div>

          {/* Detalle de la receta seleccionada (siempre visible) */}
          <div className="col-md-6">
            <DetalleReceta
              receta={recetaSeleccionada}
              onCerrar={() => setRecetaSeleccionada(null)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
