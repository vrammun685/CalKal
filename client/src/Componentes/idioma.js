import '../App.css';
import { useEffect, useState} from 'react';

export function CambioIdioma({ idioma, onChangeIdioma }) {
  return (
    <div className="btn-group" role="group" aria-label="Cambio de idioma">
      <button
        type="button"
        className={`btn btn-outline-primary ${idioma === 'es' ? 'active' : ''}`}
        onClick={() => onChangeIdioma('es')}
      >
        🇪🇸 Español
      </button>
      <button
        type="button"
        className={`btn btn-outline-primary ${idioma === 'en' ? 'active' : ''}`}
        onClick={() => onChangeIdioma('en')}
      >
        🇺🇸 English
      </button>
    </div>
  );
}