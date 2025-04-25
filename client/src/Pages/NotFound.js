import React from 'react';
import { Link } from 'react-router-dom'; // Solo si usás React Router

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="fs-3"> <span className="text-danger">Oops!</span> Página no encontrada.</p>
      <p className="lead">
        La página que estás buscando no existe o fue movida.
      </p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}