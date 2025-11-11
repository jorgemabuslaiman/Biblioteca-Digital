import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
      <section className="max-w-xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Contacto</h2>
        <p className="mb-4 text-gray-700">¿Tienes dudas, sugerencias o quieres colaborar?</p>
        <div className="mb-6">
          <p className="text-blue-800 font-semibold">Ministerio de Educación de Tucumán</p>
          <p>Email: <a href="mailto:biblioteca@educaciontuc.gov.ar" className="text-blue-500 underline">biblioteca@educaciontuc.gov.ar</a></p>
          <p>Teléfono: <a href="tel:+543814234567" className="text-blue-500 underline">+54 381 423-4567</a></p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <a href="https://www.educaciontuc.gov.ar" target="_blank" rel="noopener" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">Sitio oficial</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
