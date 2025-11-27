import { useState } from "react";
// Utilidad para obtener puntaje total y cantidad de cuestionarios
function getResumenCuestionarios() {
  let totalPuntaje = 0;
  let totalPreguntas = 0;
  let completados = 0;
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('cuestionario_'));
    keys.forEach(k => {
      const data = JSON.parse(localStorage.getItem(k));
      if (data && data.terminado && typeof data.puntaje === 'number') {
        completados++;
        totalPuntaje += data.puntaje;
        totalPreguntas += 10; // Asumimos 10 preguntas por cuestionario
      }
    });
  } catch {}
  return { totalPuntaje, totalPreguntas, completados };
}
import React from "react";


function getMedallasGamificacion() {
  let completados = 0;
  let perfectos = 0;
  let generos = new Set();
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('cuestionario_'));
    keys.forEach(k => {
      const data = JSON.parse(localStorage.getItem(k));
      if (data && data.terminado && typeof data.puntaje === 'number') {
        completados++;
        if (data.puntaje === 10) perfectos++;
        // Extraer género del libro si está disponible
        const libroIdx = parseInt(k.split('_')[1], 10);
        if (!isNaN(libroIdx) && window.librosDestacados) {
          const libro = window.librosDestacados[libroIdx];
          if (libro && libro.category) generos.add(libro.category);
        }
      }
    });
  } catch {}
  const medallas = [];
  if (completados >= 1) medallas.push({ nombre: "Primer Cuestionario", icono: "🥇", descripcion: "Completaste tu primer cuestionario" });
  if (completados >= 5) medallas.push({ nombre: "Lector Constante", icono: "📚", descripcion: "Completaste 5 cuestionarios" });
  if (perfectos >= 1) medallas.push({ nombre: "¡Perfecto!", icono: "💯", descripcion: "Obtuviste 100% en un cuestionario" });
  if (generos.size >= 3) medallas.push({ nombre: "Explorador", icono: "🌎", descripcion: "Completaste cuestionarios de 3 géneros distintos" });
  return medallas;
}

const retosEjemplo = [
  { nombre: "Reto Tucumán", descripcion: "Lee un libro de un autor tucumano" },
  { nombre: "Reto Provincial", descripcion: "Completa 5 libros este mes" },
];

const Gamificacion = ({ usuario }) => {
  const resumen = getResumenCuestionarios();

  // Estado para avatar y popup
  const [avatar, setAvatar] = useState(() => localStorage.getItem('avatar_usuario') || usuario?.avatar || "🦊");
  const [showPopup, setShowPopup] = useState(false);
  const [seleccionado, setSeleccionado] = useState(avatar);

  // Opciones de avatares (animales y vehículos)
  const avatares = [
    "🦊", "🐻", "🐼", "🐯", "🐸", "🐵", "🐶", "🐱", "🦁", "🐮", "🐷", "🐰",
    "🐔", "🐧", "🐢", "🐙", "🐬", "🦄", "🐴", "🐘", "🦓", "🦒", "🚗", "🚕", "🚙", "🚌", "🚓", "🚑", "🚒", "🚜", "🚲", "🛴", "🏍️", "🚂", "✈️", "🚀"
  ];

  // Borra todos los datos de cuestionarios y recarga la página
  const reiniciarPuntajes = () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith('cuestionario_'))
      .forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  // Guardar avatar seleccionado
  const aceptarAvatar = () => {
    setAvatar(seleccionado);
    localStorage.setItem('avatar_usuario', seleccionado);
    setShowPopup(false);
  };

  return (
    <section className="bg-slateGray py-10 rounded-xl shadow-lg my-8">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        Mundo Lector Tucumán
      </h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Avatar y progreso */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-deepSlate flex items-center justify-center text-5xl mb-2 border-4 border-primary">
            {avatar}
          </div>
          <button
            onClick={() => { setSeleccionado(avatar); setShowPopup(true); }}
            className="mb-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
          >
            Cambiar imagen
          </button>
          <div className="text-lg font-semibold text-midnight_text mb-1">{usuario?.nombre || "Invitado"}</div>
          <div className="w-32 bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-primary h-4 rounded-full"
              style={{ width: `${usuario?.progreso || 20}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-600">Progreso lector: {usuario?.progreso || 20}%</span>
          <span className="text-xs text-gray-700 mt-1">Cuestionarios completados: <b>{resumen.completados}</b></span>
          <span className="text-xs text-gray-700">Puntaje total: <b>{resumen.totalPuntaje}</b> / {resumen.totalPreguntas}</span>
          <button
            onClick={reiniciarPuntajes}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow text-sm"
          >
            Reiniciar puntajes
          </button>
        </div>

        {/* Popup para elegir avatar */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'}}>
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full flex flex-col items-center">
              <h3 className="text-lg font-bold mb-4">Elige tu imagen</h3>
              <div className="grid grid-cols-6 gap-3 mb-6 max-h-64 overflow-y-auto">
                {avatares.map((icon, idx) => (
                  <button
                    key={idx}
                    className={`text-3xl w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all ${seleccionado === icon ? 'border-blue-500 bg-blue-100 scale-110' : 'border-transparent bg-gray-100'}`}
                    onClick={() => setSeleccionado(icon)}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={aceptarAvatar}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                >Aceptar</button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow"
                >Atrás</button>
              </div>
            </div>
          </div>
        )}
        {/* Medallas */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold text-secondary mb-2">Medallas</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {getMedallasGamificacion().length === 0 && (
              <div className="text-gray-500 text-sm">¡Aún no tienes medallas! Responde cuestionarios para ganar logros.</div>
            )}
            {getMedallasGamificacion().map((med, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow p-3 w-24">
                <span className="text-3xl mb-1">{med.icono}</span>
                <span className="font-semibold text-sm text-primary text-center">{med.nombre}</span>
                <span className="text-xs text-gray-500 text-center">{med.descripcion}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Retos */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold text-secondary mb-2">Retos</h3>
          <ul className="space-y-2">
            {retosEjemplo.map((reto, idx) => (
              <li key={idx} className="bg-white rounded-lg shadow p-3 w-48">
                <span className="font-semibold text-primary">{reto.nombre}</span>
                <div className="text-xs text-gray-500">{reto.descripcion}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Gamificacion;
