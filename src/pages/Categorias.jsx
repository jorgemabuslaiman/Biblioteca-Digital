import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { categorias, librosDestacados } from '../librosData';

export default function Categorias() {
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const booksPerPage = 8;
  const navigate = useNavigate();
  const filteredBooks = selected
    ? librosDestacados.filter(libro =>
        libro.category === selected &&
        (libro.title.toLowerCase().includes(search.toLowerCase()) ||
         libro.author.toLowerCase().includes(search.toLowerCase()))
      )
    : [];
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice((page - 1) * booksPerPage, page * booksPerPage);
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
      <section className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Categorías</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center mb-8">
          {categorias.map((cat, idx) => (
            <button
              key={cat.name}
              className={`focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg p-2 ${selected === cat.name ? 'bg-blue-100' : ''}`}
              onClick={() => setSelected(cat.name)}
              aria-label={`Ver libros de la categoría ${cat.name}`}
            >
              <CategoryCard name={cat.name} img={cat.img} />
            </button>
          ))}
        </div>
        {selected && (
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Libros de la categoría: {selected}</h3>
            <div className="flex flex-col items-center mb-6">
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Buscar por título o autor..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                aria-label="Buscar libro por título o autor"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center items-stretch">
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((libro, i) => (
                  <BookCard
                    key={i}
                    title={libro.title}
                    author={libro.author}
                    img={libro.img}
                    onRead={() => navigate(`/visor/${librosDestacados.indexOf(libro)}`)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No hay libros en esta categoría.
                </div>
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Página anterior"
                >
                  &lt;
                </button>
                <span className="px-2 text-blue-700 font-bold">Página {page} de {totalPages}</span>
                <button
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Página siguiente"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
