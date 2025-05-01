import '../App.css';
import '../estilos/Componentes/idioma.css';
export function CambioIdioma({ idioma, onChangeIdioma, className }) {
  return (
    <div className={`cambioIdioma-container ${className}`} role="group" aria-label="Cambio de idioma">
      <button
        type="button"
        className={`cambioIdioma-btn ${idioma === 'es' ? 'active' : ''}`}
        onClick={() => onChangeIdioma('es')}
      >
        🇪🇸 Español
      </button>
      <button
        type="button"
        className={`cambioIdioma-btn ${idioma === 'en' ? 'active' : ''}`}
        onClick={() => onChangeIdioma('en')}
      >
        🇺🇸 English
      </button>
    </div>
  );
}