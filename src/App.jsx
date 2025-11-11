

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookCard from './components/BookCard';
import CategoryCard from './components/CategoryCard';
import Footer from './components/Footer';
import BookViewerModal from './components/BookViewerModal';

function App() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleReadBook = (book) => {
    setSelectedBook(book);
    setViewerOpen(true);
  };

  // Filtros y búsqueda
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredBooks = librosDestacados.filter(libro => {
    const matchesSearch = libro.title.toLowerCase().includes(search.toLowerCase()) || libro.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || filterCategory === "Todas" || libro.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
      <Hero />
      <section id="catalogo" className="max-w-7xl mx-auto py-8 px-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Libros destacados</h2>
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-blue-300 rounded px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="border border-blue-300 rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.map((libro, i) => (
            <BookCard
              key={i}
              title={libro.title}
              author={libro.author}
              img={libro.img}
              onRead={() => handleReadBook(libro)}
            />
          ))}
        </div>
      </section>
      <section id="categorias" className="max-w-7xl mx-auto py-8 px-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Categorías</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {categorias.map((cat, idx) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              img={cat.img}
            />
          ))}
        </div>
      </section>
      <Footer />
      <BookViewerModal open={viewerOpen} onClose={() => setViewerOpen(false)} book={selectedBook} />
    </div>
  );
}

const librosDestacados = [
  {
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Matilda',
    author: 'Roald Dahl',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Cuentos de la selva',
    author: 'Horacio Quiroga',
    img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80',
  },
];

const categorias = [
  {
    name: 'Infantil',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=64&q=80',
  },
  {
    name: 'Juvenil',
    img: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=64&q=80',
  },
  {
    name: 'Aventura',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=64&q=80',
  },
  {
    name: 'Ciencia',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=64&q=80',
  },
  {
    name: 'Fantasía',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=64&q=80',
  },
  {
    name: 'Educativo',
    img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=64&q=80',
  },
  {
    name: 'Clásicos',
    img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=64&q=80',
  },
  {
    name: 'Misterio',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=64&q=80',
  },
];

export default App;
