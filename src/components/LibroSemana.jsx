import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function getLibroDeLaSemana(libros) {
  // Calcular el número de lunes desde el inicio del mes
  const hoy = new Date();
  const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  let lunes = [];
  for (let d = new Date(primerDiaMes); d.getMonth() === hoy.getMonth(); d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 1) lunes.push(new Date(d));
  }
  if (lunes.length === 0) lunes = [primerDiaMes];
  // Buscar el lunes más reciente
  const lunesActual = lunes.filter(l => l <= hoy).pop() || lunes[0];
  // Usar el índice del lunes para elegir el libro
  const idx = lunes.findIndex(l => l.getTime() === lunesActual.getTime());
  return libros[idx % libros.length];
}



const LibroSemana = ({ libros }) => {
  const [libroIdx, setLibroIdx] = useState(0);
  const libro = libros && libros.length > 0 ? libros[libroIdx % libros.length] : null;
  const [resumen, setResumen] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!libro) return;
    setResumen("");
    setLoading(true);
    // Buscar resumen en Wikipedia (español)
    const queryFull = encodeURIComponent(`${libro.title} ${libro.author}`);
    const queryTitle = encodeURIComponent(libro.title);
    fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${queryFull}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.extract && data.title && esResumenValido(data, libro)) {
          setResumen(data.extract);
          setLoading(false);
        } else {
          // Si no hay resultado, buscar solo por título
          fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${queryTitle}`)
            .then(res2 => res2.ok ? res2.json() : null)
            .then(data2 => {
              if (data2 && data2.extract && data2.title && esResumenValido(data2, libro)) setResumen(data2.extract);
              else setResumen("");
            })
            .catch(() => setResumen(""))
            .finally(() => setLoading(false));
        }
      })
      .catch(() => {
        // Si falla la primera búsqueda, intentar solo por título
        fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${queryTitle}`)
          .then(res2 => res2.ok ? res2.json() : null)
          .then(data2 => {
            if (data2 && data2.extract && data2.title && esResumenValido(data2, libro)) setResumen(data2.extract);
            else setResumen("");
          })
          .catch(() => setResumen(""))
          .finally(() => setLoading(false));
      });

  // Función para validar si el resumen es relevante para el libro
  function esResumenValido(data, libro) {
    const tituloWiki = data.title.toLowerCase();
    const tituloLibro = libro.title.toLowerCase();
    // Si el título de la página contiene el título del libro, es válido
    if (tituloWiki.includes(tituloLibro)) return true;
    // Palabras clave que indican que es un género/concepto
    const palabrasClave = ["género", "literario", "novela", "cuento", "subgénero", "narrativo", "ficción", "literatura", "obra colectiva", "libro de texto"];
    const resumen = (data.extract || "").toLowerCase();
    if (palabrasClave.some(palabra => resumen.includes(palabra))) return false;
    // Si el título de la página es igual a la categoría, también descartar
    if (tituloWiki === (libro.category || '').toLowerCase()) return false;
    return false;
  }
  }, [libro]);

  if (!libro) return null;
  return (
    <section className="bg-linear-to-r from-yellow-100 to-blue-100 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 my-8">
      <img src={libro.img} alt={libro.title} className="w-32 h-44 object-cover rounded-lg shadow-md border-4 border-yellow-300" />
      <div className="flex-1 text-left">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">📚 Libro de la semana</h2>
        <h3 className="text-xl font-semibold text-primary mb-1">{libro.title}</h3>
        <p className="text-gray-700 mb-2">de <span className="font-medium">{libro.author}</span></p>
        <p className="text-sm text-gray-600 mb-2">Categoría: <span className="font-semibold">{libro.category}</span></p>
        <p className="text-sm text-gray-600 mb-2">Público: <span className="font-semibold">{libro.rango || 'General'}</span></p>
        <p className="text-gray-800 mb-4 line-clamp-3">
          {loading
            ? 'Buscando resumen...'
            : resumen || libro.resumen || libro.descripcion || 'Un libro recomendado para esta semana. ¡Descúbrelo y disfruta la lectura!'}
        </p>
        <Link
          to={libro.url ? libro.url : `/leer/${libroIdx}`}
          target={libro.url ? "_blank" : undefined}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition font-semibold"
        >
          Leer ahora
        </Link>
        <button
          className="ml-4 mt-2 inline-block bg-yellow-300 text-yellow-900 px-4 py-2 rounded shadow hover:bg-yellow-400 transition font-semibold"
          onClick={() => setLibroIdx(idx => (idx + 1) % libros.length)}
        >
          Cambiar libro
        </button>
      </div>
    </section>
  );
};

export default LibroSemana;
