import React from "react";

const colores = [
  "bg-yellow-200 text-yellow-900 border-yellow-400",
  "bg-green-200 text-green-900 border-green-400",
  "bg-blue-200 text-blue-900 border-blue-400",
  "bg-pink-200 text-pink-900 border-pink-400",
  "bg-purple-200 text-purple-900 border-purple-400",
];

const RangoEtarioCard = ({ rango, descripcion, icono, colorIdx = 0, onClick }) => (
  <button
    className={`w-full md:w-56 h-40 rounded-2xl border-4 shadow-lg flex flex-col items-center justify-center gap-2 p-4 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary ${colores[colorIdx % colores.length]}`}
    onClick={onClick}
    aria-label={`Ver libros para ${rango}`}
  >
    <span className="text-5xl mb-2">{icono}</span>
    <span className="text-xl font-bold">{rango}</span>
    <span className="text-sm text-center opacity-80">{descripcion}</span>
  </button>
);

export default RangoEtarioCard;
