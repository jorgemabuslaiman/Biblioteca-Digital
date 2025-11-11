import { useState } from 'react';

function BookViewerModal({ open, onClose, book }) {
  const [page, setPage] = useState(1);
  const [fontSize, setFontSize] = useState('text-base');

  if (!open || !book) return null;

  // Simulación de páginas
  const totalPages = 5;
  const pages = [
    'Érase una vez... (página 1)',
    'El Principito vivía en un pequeño planeta... (página 2)',
    'Conoció a la rosa... (página 3)',
    'Viajó por el universo... (página 4)',
    'Descubrió el valor de la amistad. (página 5)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-blue-700 hover:text-blue-900 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Cerrar visor"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">{book.author}</p>
        <div className={`bg-gray-100 rounded p-4 mb-4 ${fontSize} min-h-[120px] flex items-center justify-center`}>{pages[page-1]}</div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Página anterior"
          >Anterior</button>
          <span className="text-blue-700 font-semibold">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Página siguiente"
          >Siguiente</button>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <label htmlFor="fontSize" className="text-sm text-blue-700">Tamaño de texto:</label>
          <select
            id="fontSize"
            value={fontSize}
            onChange={e => setFontSize(e.target.value)}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="text-sm">Pequeño</option>
            <option value="text-base">Mediano</option>
            <option value="text-lg">Grande</option>
            <option value="text-xl">Extra grande</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Favorito</button>
          <button className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Compartir</button>
          <span className="text-sm text-gray-500">Progreso: {Math.round((page/totalPages)*100)}%</span>
        </div>
      </div>
    </div>
  );
}

export default BookViewerModal;
