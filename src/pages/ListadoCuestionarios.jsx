import React, { useState } from "react";
import { librosDestacados } from "../librosData";
import cuestionarios from "../cuestionariosData";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function filtrarLibros({ nombre, categoria, rango }) {
  return cuestionarios
    .map(q => {
      const libro = librosDestacados[q.libroId];
      if (!libro) return null;
      return { ...libro, id: q.libroId };
    })
    .filter(Boolean)
    .filter(libro =>
      (!nombre || libro.title.toLowerCase().includes(nombre.toLowerCase())) &&
      (!categoria || libro.category === categoria) &&
      (!rango || libro.rango === rango)
    );
}

export default function ListadoCuestionarios() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [rango, setRango] = useState("");

  // Extraer categorías y rangos únicos
  const categorias = Array.from(new Set(librosDestacados.map(l => l.category).filter(Boolean)));
  const rangos = Array.from(new Set(librosDestacados.map(l => l.rango).filter(Boolean)));

  const librosFiltrados = filtrarLibros({ nombre, categoria, rango });

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Libros con cuestionario disponible</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <select value={categoria} onChange={e => setCategoria(e.target.value)} className="border px-2 py-1 rounded">
            <option value="">Todas las categorías</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={rango} onChange={e => setRango(e.target.value)} className="border px-2 py-1 rounded">
            <option value="">Todos los rangos</option>
            {rangos.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <ul className="space-y-4">
          {librosFiltrados.length === 0 && <li>No se encontraron libros.</li>}
          {librosFiltrados.map(libro => (
            <li key={libro.id} className="p-4 bg-white rounded shadow flex items-center gap-4">
              <img src={libro.img} alt={libro.title} className="w-16 h-24 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{libro.title}</h2>
                <p className="text-gray-600">{libro.author}</p>
                <p className="text-gray-500 text-sm">{libro.category} {libro.rango && `| ${libro.rango}`}</p>
              </div>
              <Link to={`/libro/${libro.id}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Ir al cuestionario</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
