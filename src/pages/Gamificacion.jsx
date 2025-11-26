import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Gamificacion from "../components/Gamificacion";


// Calcular progreso lector a partir de cuestionarios completados
function getProgresoLector() {
  let total = 0;
  let correctas = 0;
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('cuestionario_'));
    keys.forEach(k => {
      const data = JSON.parse(localStorage.getItem(k));
      if (data && data.terminado && typeof data.puntaje === 'number') {
        total += 10; // Cada cuestionario tiene 10 preguntas
        correctas += data.puntaje;
      }
    });
  } catch {}
  if (total === 0) return 0;
  // Progreso: porcentaje de respuestas correctas sobre el total posible
  return Math.round((correctas / total) * 100);
}

const usuarioDemo = {
  nombre: "Sofi",
  avatar: "🦊",
  progreso: getProgresoLector(),
};

const GamificacionPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <Gamificacion usuario={usuarioDemo} />
      </main>
      <Footer />
    </div>
  );
};

export default GamificacionPage;
