import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Gamificacion from "../components/Gamificacion";

// Simulación de usuario (puedes conectar con contexto o backend luego)
const usuarioDemo = {
  nombre: "Sofi",
  avatar: "🦊",
  progreso: 45,
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
