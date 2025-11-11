import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import { librosDestacados } from '../librosData';

export default function Catalogo() {
  const PAGE_SIZE = 8;
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState(nombre || "");

  // Actualiza filtro si cambia la URL
  React.useEffect(() => {
    if (nombre) setFilterCategory(nombre);
  }, [nombre]);


  const filteredBooks = librosDestacados.filter(libro => {
    const matchesSearch = libro.title.toLowerCase().includes(search.toLowerCase()) || libro.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || filterCategory === "Todas" || libro.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginación
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const paginatedBooks = filteredBooks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilterCategory(value);
    if (value && value !== "Todas") {
      navigate(`/categorias/${value}`);
    } else {
      navigate('/catalogo');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
  <section className="max-w-7xl mx-auto py-8 px-2 sm:px-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Catálogo de Libros</h2>
  <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-blue-300 rounded px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filterCategory}
            onChange={handleCategoryChange}
            className="border border-blue-300 rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todas las categorías</option>
            <option value="Infantil">Infantil</option>
            <option value="Juvenil">Juvenil</option>
            <option value="Aventura">Aventura</option>
            <option value="Ciencia">Ciencia</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Educativo">Educativo</option>
            <option value="Clásicos">Clásicos</option>
            <option value="Misterio">Misterio</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center items-stretch">
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((libro, i) => (
              <div
                key={i}
                tabIndex={0}
                aria-label={`Libro: ${libro.title} de ${libro.author}`}
                className="focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <BookCard
                  title={libro.title}
                  author={libro.author}
                  img={libro.img}
                  onRead={() => navigate(`/leer/${librosDestacados.indexOf(libro)}`)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No se encontraron libros para esta búsqueda o categoría.
            </div>
          )}
        </div>
        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >Anterior</button>
            <span className="px-2">Página {page} de {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >Siguiente</button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
