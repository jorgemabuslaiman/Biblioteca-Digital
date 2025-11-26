import React from "react";

// Ejemplo de medallas y retos (puedes expandirlo luego)
const medallasEjemplo = [
  { nombre: "Primer Libro", icono: "🥇", descripcion: "Leíste tu primer libro" },
  { nombre: "Explorador", icono: "🌎", descripcion: "Visitaste 5 géneros distintos" },
  { nombre: "Maratón", icono: "🏃‍♂️", descripcion: "Leíste 3 libros en una semana" },
];

const retosEjemplo = [
  { nombre: "Reto Tucumán", descripcion: "Lee un libro de un autor tucumano" },
  { nombre: "Reto Provincial", descripcion: "Completa 5 libros este mes" },
];

const Gamificacion = ({ usuario }) => {
  return (
    <section className="bg-slateGray py-10 rounded-xl shadow-lg my-8">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        Mundo Lector Tucumán
      </h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Avatar y progreso */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-deepSlate flex items-center justify-center text-5xl mb-2 border-4 border-primary">
            {/* Avatar del usuario o ícono */}
            {usuario?.avatar || "👦"}
          </div>
          <div className="text-lg font-semibold text-midnight_text mb-1">{usuario?.nombre || "Invitado"}</div>
          <div className="w-32 bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-primary h-4 rounded-full"
              style={{ width: `${usuario?.progreso || 20}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-600">Progreso lector: {usuario?.progreso || 20}%</span>
        </div>
        {/* Medallas */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold text-secondary mb-2">Medallas</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {medallasEjemplo.map((med, idx) => (
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
