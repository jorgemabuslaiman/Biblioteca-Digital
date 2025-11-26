import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Categorias from './pages/Categorias';
import LibroDetalle from './pages/LibroDetalle';
import ListadoCuestionarios from './pages/ListadoCuestionarios';
import VisorLibro from './pages/VisorLibro';


import Contacto from './pages/Contacto';
import GamificacionPage from './pages/Gamificacion';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:nombre" element={<Catalogo />} />
  <Route path="/libro/:id" element={<LibroDetalle />} />
  <Route path="/leer/:id" element={<VisorLibro />} />
  <Route path="/contacto" element={<Contacto />} />
        <Route path="/gamificacion" element={<GamificacionPage />} />
        <Route path="/cuestionarios" element={<ListadoCuestionarios />} />
      </Routes>
    </BrowserRouter>
  );
}
