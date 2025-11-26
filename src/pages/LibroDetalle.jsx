import React, { useState } from 'react';
import Cuestionario from '../components/Cuestionario';
import cuestionarios from '../cuestionariosData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { librosDestacados } from '../librosData';

export default function LibroDetalle() {
  const { id } = useParams();
  const libro = librosDestacados[id] || null;
  const libroId = parseInt(id, 10);
  const tieneCuestionario = cuestionarios.some(q => q.libroId === libroId);
  const [mostrarCuestionario, setMostrarCuestionario] = useState(false);

  if (!libro) {
    return <div className="min-h-screen flex flex-col justify-center items-center text-center">Libro no encontrado</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
      <section className="max-w-xl mx-auto py-8 px-4 text-center">
        <img src={libro.img} alt={libro.title} className="mx-auto mb-4 rounded shadow w-40 h-60 object-cover" />
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{libro.title}</h2>
        <p className="mb-2 text-gray-700">Autor: {libro.author}</p>
        <p className="mb-4 text-gray-600">Categoría: {libro.category || 'Sin categoría'}</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">Leer libro</button>
        {tieneCuestionario && (
          <button
            className="ml-4 bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
            onClick={() => setMostrarCuestionario(v => !v)}
          >
            {mostrarCuestionario ? 'Ocultar cuestionario' : 'Cuestionario'}
          </button>
        )}
      </section>
      {mostrarCuestionario && (
        <section className="max-w-xl mx-auto pb-8 px-4">
          <Cuestionario libroId={libroId} />
        </section>
      )}
      <Footer />
    </div>
  );
}
