import { useEffect, useState } from 'react';
import FiltroAlimentos from '../../Filtros/FiltroAlimento/FiltroAlimentos';
import api from '../../../auth/axiosConfig';

export default function ListaAlimentosReceta({ idioma, onAlimentoSeleccionado }) {
  const [filtro, setFiltro] = useState('');
  const [alimentos, setAlimentos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  useEffect(() => {
    api.get('/alimentos/')
      .then((res) => {
        setAlimentos(res.data || []);
        setCargando(false);
      })
      .catch((err) => {
        alert("Algo ha ido mal. Por favor, inténtalo de nuevo más tarde.");
        setCargando(false);
      });
  }, []);

  const alimentosFiltrados = alimentos.filter((alimento) =>
    (idioma === 'es' ? alimento.nombre_es : alimento.nombre_en)
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [filtro]);

  const totalPaginas = Math.ceil(alimentosFiltrados.length / itemsPorPagina);
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const fin = inicio + itemsPorPagina;
  const alimentosPagina = alimentosFiltrados.slice(inicio, fin);

  if (cargando) return <p>{idioma === 'es' ? 'Cargando alimentos...' : 'Loading foods...'}</p>;

  return (
    <div className="container mt-4">
      <FiltroAlimentos filtro={filtro} setFiltro={setFiltro} />

      {alimentosFiltrados.length === 0 ? (
        <p>
          {idioma === 'es'
            ? 'No hay alimentos que coincidan con la búsqueda.'
            : 'No foods match the search.'}
        </p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
                <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
                <th>{idioma === 'es' ? 'Proteínas' : 'Proteins'}</th>
                <th>{idioma === 'es' ? 'Carbohidratos' : 'Carbs'}</th>
                <th>{idioma === 'es' ? 'Grasas' : 'Fats'}</th>
                <th>{idioma === 'es' ? 'Añadir' : 'Add'}</th>
              </tr>
            </thead>
            <tbody>
              {alimentosPagina.map((alimento) => (
                <tr key={alimento.id}>
                  <td>{idioma === 'es' ? alimento.nombre_es : alimento.nombre_en}</td>
                  <td>{alimento.calorias}</td>
                  <td>{alimento.proteinas}</td>
                  <td>{alimento.carbohidratos}</td>
                  <td>{alimento.grasas}</td>
                  <td>
                    <button
                      className="btn boton btn-sm"
                      onClick={() => onAlimentoSeleccionado(alimento)}
                    >
                      {idioma === 'es' ? 'Añadir' : 'Add'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center my-3">
            <button
              className="btn btn-secondary"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              {idioma === 'es' ? 'Anterior' : 'Previous'}
            </button>

            <span>
              {idioma === 'es' ? 'Página' : 'Page'} {paginaActual} {idioma === 'es' ? 'de' : 'of'} {totalPaginas}
            </span>

            <button
              className="btn btn-secondary"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              {idioma === 'es' ? 'Siguiente' : 'Next'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
