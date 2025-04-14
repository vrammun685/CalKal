import '../App.css';
import { useEffect, useState} from 'react';

export function ListadosUsuarios(){
    const [usuarios, setUsuarios] = useState([]);
  
  
    useEffect(() => {
      fetch("http://localhost:8000/api/usuarios/")
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener los usuarios:', error));
    }, []);
    return (
      <div>
        <h2>Listado de Usuarios</h2>
        {usuarios.length === 0 ? (
          <p>No hay usuarios disponibles.</p> // Mensaje si no hay usuarios
        ) : (
          <ul>
            {usuarios.map(usuario => (
              <li key={usuario.username}>
                {usuario.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}


export function ListaAlimentos({ idioma, filtro, alimentos }) {
  //Filtra los alimentos pero no los llama quien llama es la pagina
  const alimentosFiltrados = alimentos.filter((alimento) =>
    (idioma === 'es' ? alimento.nombre_es : alimento.nombre_en)
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  const anadir = (index) => {
    console.log("Editar:", alimentos[index]);
  };

  return (
    <div>
      {alimentosFiltrados.length === 0 ? (
        <p>{idioma === 'es' ? 'No hay alimentos que coincidan con la búsqueda.' : 'No foods match the search.'}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{idioma === 'es' ? 'Nombre' : 'Name'}</th>
              <th>{idioma === 'es' ? 'Calorías' : 'Calories'}</th>
              <th>{idioma === 'es' ? 'Medida' : 'Measure'}</th>
              <th>{idioma === 'es' ? 'Proteínas' : 'Proteins'}</th>
              <th>{idioma === 'es' ? 'Carbohidratos' : 'Carbs'}</th>
              <th>{idioma === 'es' ? 'Grasas' : 'Fats'}</th>
              <th>{idioma === 'es' ? 'Añadir' : 'Add'}</th>
            </tr>
          </thead>
          <tbody>
            {alimentosFiltrados.map((alimento, index) => (
              <tr key={alimento.id || index}>
                <td>{idioma === 'es' ? alimento.nombre_es : alimento.nombre_en}</td>
                <td>{alimento.calorias}</td>
                <td>100 {alimento.medida}</td>
                <td>{alimento.proteinas}</td>
                <td>{alimento.carbohidratos}</td>
                <td>{alimento.grasas}</td>
                <td>
                  <button
                    className="btn btn-dark text-white"
                    onClick={() => anadir(index)}
                  >
                    {idioma === 'es' ? 'Añadir' : 'Add'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}