import './MenuPrincipal.css';
import { Link } from "react-router-dom";
import { CambioIdioma } from '../../Selector_Idioma/SelectorIdiom';
import MenuPerfil from '../MenuPerfil/MenuPerfil';



export default function MenuPrincipal({idioma, setIdioma, imagenPerfil}) {
  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <div className="container-fluid d-flex align-items-center">

        {/* LOGO A LA IZQUIERDA */}
        <div className="d-flex align-items-center me-3">
          <img src="/media/logo.png" alt="logo" className="imagen-logo-esquina" />
        </div>

        {/* BOTÓN HAMBURGUESA */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENÚ COLAPSABLE */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* UL con botones centrados usando mx-auto y flex-grow-1 */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-grow-1 justify-content-center">
            <li className="nav-item px-3">
              <Link to="/home" className="nav-link fs-5 custom-link" aria-current="page">
                {idioma === 'es' ? 'Inicio' : 'Home'}
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/diarios" className="nav-link fs-5 custom-link">
                {idioma === 'es' ? 'Diarios' : 'Diaries'}
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/pesos" className="nav-link fs-5 custom-link">
                {idioma === 'es' ? 'Pesos' : 'Weights'}
              </Link>
            </li>
          </ul>

          {/* Selector idioma + Perfil a la derecha */}
          <div className="d-flex align-items-center gap-3">
            <CambioIdioma idioma={idioma} onChangeIdioma={cambiarIdioma} />
            <MenuPerfil idioma={idioma} imagenPerfil={imagenPerfil} />
          </div>
        </div>
      </div>
    </nav>
  );
}