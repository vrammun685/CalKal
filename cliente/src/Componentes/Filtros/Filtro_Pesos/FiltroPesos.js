import { useState, useMemo } from 'react';
import { GraficoPesos } from '../../Graficos/Grafico_Pesos/Grafico_Pesos';
import ListadoPesos from '../../Listados/ListadoPesos/ListadoPesos';
import "./FiltroPesos.css"

const opcionesFiltro = [
  { id: 'todo', label: 'Todo' },
  { id: '1year', label: 'Último año' },
  { id: '3months', label: 'Últimos 3 meses' },
  { id: '1month', label: 'Último mes' },
  { id: '1week', label: 'Última semana' },
];

export default function FiltroPesos({ pesos, idioma, eliminar }) {
  const [filtro, setFiltro] = useState('todo');

  const fechaLimite = useMemo(() => {
    const hoy = new Date();
    switch(filtro) {
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
    <div>
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-3 py-3">
        {opcionesFiltro.map(opcion => (
          <button
            key={opcion.id}
            type="button"
            className={`btn filtro-btn ${filtro === opcion.id ? 'active' : ''}`}
            onClick={() => setFiltro(opcion.id)}
          >
            {idioma === 'es' ? opcion.label : translateLabel(opcion.label)}
          </button>
        ))}
      </div>
      <GraficoPesos pesos={pesosFiltrados} />
      <ListadoPesos idioma={idioma} pesos={pesosFiltrados} eliminar={eliminar} />
    </div>
  );
}

function translateLabel(label) {
  const map = {
    'Todo': 'All',
    'Último año': 'Last year',
    'Últimos 3 meses': 'Last 3 months',
    'Último mes': 'Last month',
    'Última semana': 'Last week',
  };
  return map[label] || label;
}
