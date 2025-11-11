import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { librosDestacados } from '../librosData';

export default function VisorLibro() {
  const { id } = useParams();
  // Buscar el libro por índice (número) o por id string
  let libro = null;
  if (!isNaN(Number(id))) {
    libro = librosDestacados[Number(id)] || null;
  } else {
    libro = librosDestacados.find(l => l.id === id) || null;
  }
  const [page, setPage] = useState(1);
  const totalPages = 10; // Simulado
  const [fontSize, setFontSize] = useState('text-base');
  const [modoLectura, setModoLectura] = useState('bg-white text-black');

  // Detectar modo oscuro
  const isDark = modoLectura === 'bg-gray-900 text-white';

  if (!libro) {
    return <div className="min-h-screen flex flex-col justify-center items-center text-center">Libro no encontrado</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${modoLectura} font-sans`}>
      <Header />
      <section className="max-w-xl mx-auto py-8 px-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2" tabIndex={0} aria-label={`Título del libro: ${libro.title}`}>{libro.title}</h2>
        <p className="mb-2 text-gray-700" tabIndex={0} aria-label={`Autor: ${libro.author}`}>Autor: {libro.author}</p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setFontSize('text-sm')} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100'}`}>A-</button>
          <button onClick={() => setFontSize('text-base')} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100'}`}>A</button>
          <button onClick={() => setFontSize('text-lg')} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100'}`}>A+</button>
          <button onClick={() => setModoLectura('bg-white text-black')} className={`px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100'}`}>Claro</button>
          <button onClick={() => setModoLectura('bg-gray-900 text-white')} className="px-2 py-1 bg-blue-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200">Oscuro</button>
        </div>
        <div
          className={`border rounded shadow p-4 w-full mb-4 ${fontSize} min-h-[200px] transition-all duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}
          tabIndex={0}
          aria-label={`Página ${page} de ${totalPages}`}
        >
          <p>Página {page} de {totalPages}</p>
          {libro.url ? (
            <a href={libro.url} target="_blank" rel="noopener" className="text-blue-400 underline focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 block mt-2">
              Leer o descargar el libro completo
            </a>
          ) : (
            <p className="mt-2">(Aquí iría el contenido simulado del libro. Puedes conectar con un PDF o texto real.)</p>
          )}
        </div>
        <div className="flex gap-4 mb-4">
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className={`px-4 py-2 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100'}`}>Anterior</button>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className={`px-4 py-2 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100'}`}>Siguiente</button>
        </div>
        <div className="flex gap-2 mb-4">
          <button className={`px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 ${isDark ? 'bg-yellow-600 text-white' : 'bg-yellow-300'}`}>Favorito</button>
          <button className={`px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${isDark ? 'bg-blue-700 text-white' : 'bg-blue-300'}`}>Compartir</button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
