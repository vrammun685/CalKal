import '../App.css';
import '../estilos/Componentes/Listado.css';
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

export function ListadoPesos({idioma, pesos, eliminar, editar}){
  const pesosOrdenados = [...pesos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const abrirImagen = (url) => setImagenSeleccionada(url);
  const cerrarModal = () => setImagenSeleccionada(null);

  
  return(
    <div>
      <h2>Historial de pesos</h2>
      <table>
        <tbody>
          {pesosOrdenados.map((peso) => (
            <tr key={peso.id}>
              <td>{peso.fecha}</td>
              <td>{peso.peso}Kg</td>
              <td>{peso.foto_pesaje ? (<img src={peso.foto_pesaje} alt="Foto de pesaje" className='imagen-miniatura' onClick={() => abrirImagen(peso.foto_pesaje)}/>) : ("Sin Foto")}</td>
              <td><button>{idioma === 'es' ? "Editar" : "Update"}</button></td>
              <td><button onClick={() => eliminar(peso.id)}>{idioma === 'es' ? "Eliminar" : "Delete"}</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {imagenSeleccionada && (
      <div className='fondo-imagen-Agrandada' onClick={cerrarModal}>
        <img className='imagen-Agrandada'src={imagenSeleccionada} alt="Ampliada"/>
      </div>
      )}
    </div>
  )
}