import { useNavigate } from 'react-router-dom';

export default function ListaRecetas({ recetas, onSeleccionarReceta }) {
  const navigate = useNavigate();

  const irAEditar = (id) => {
    navigate(`/recetas/crear/${id}`);
  };

  return (
    <div>
      <h3>Mis Recetas</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Calorías</th>
              <th>Porciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {recetas.map((receta, idx) => (
              <tr key={idx}>
                <td>{receta.nombre}</td>
                <td>{receta.calorias.toFixed(2)}</td>
                <td>{receta.numeroPorciones}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onSeleccionarReceta(receta)}
                  >
                    Ver detalles
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => irAEditar(receta.id)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
