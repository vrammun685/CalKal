import { useEffect, useState } from 'react';
import api from '../../../auth/axiosConfig';

export default function DetalleReceta({ receta, onCerrar }) {
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    if (receta?.id) {
      api.get(`/ingredientes/${receta.id}/`)
        .then(res => setIngredientes(res.data.ingredientes || []))
        .catch(err => console.error("Error cargando ingredientes:", err));
    }
  }, [receta]);

  if (!receta) return (
    <div className="card mt-3">
        <div className="card-body">
        <p className="text-muted">Selecciona una receta para ver los detalles.</p>
        </div>
    </div>
    );

  return (
    <div className="card mt-3">
      <div className="card-body">
        {/* Datos generales de la receta */}
        <h4>{receta.nombre}</h4>
        <p><strong>Calorías:</strong> {receta.calorias.toFixed(1)}</p>
        <p><strong>Porciones:</strong> {receta.numeroPorciones}</p>
        <p><strong>Proteínas:</strong> {receta.proteinas.toFixed(1)} g</p>
        <p><strong>Grasas:</strong> {receta.grasas.toFixed(1)} g</p>
        <p><strong>Carbohidratos:</strong> {receta.carbohidratos.toFixed(1)} g</p>

        {/* Tabla de ingredientes */}
        <h5 className="mt-4">Ingredientes</h5>
        {ingredientes.length === 0 ? (
          <p>No hay ingredientes cargados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Medida</th>
                  <th>Calorías</th>
                  <th>Grasas</th>
                  <th>Proteínas</th>
                  <th>Carbohidratos</th>
                </tr>
              </thead>
              <tbody>
                {ingredientes.map((ing, i) => (
                  <tr key={i}>
                    <td>{ing.nombre}</td>
                    <td>{ing.cantidad}</td>
                    <td>{ing.medida}</td>
                    <td>{ing.calorias_totales?.toFixed(2)}</td>
                    <td>{ing.grasas_totales?.toFixed(2)}</td>
                    <td>{ing.proteinas_totales?.toFixed(2)}</td>
                    <td>{ing.carbohidratos_totales?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Botón cerrar */}
        <button className="btn btn-secondary mt-3" onClick={onCerrar}>Cerrar</button>
      </div>
    </div>
  );
}
