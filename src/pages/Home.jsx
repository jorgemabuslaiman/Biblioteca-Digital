import React, { useRef, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { librosDestacados } from '../librosData';

function Home() {
  const [pause, setPause] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 5, spacing: 16 },
    mode: 'free',
    drag: true,
    animation: { duration: 600, easing: (t) => t },
  });

  React.useEffect(() => {
    let interval;
    if (!pause && instanceRef.current) {
      interval = setInterval(() => {
        instanceRef.current.next();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [pause, instanceRef]);

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">
      <Header />
      <Hero />
      <section className="max-w-2xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Bienvenido a la Biblioteca Digital</h2>
        <p className="mb-6 text-gray-700">Explora miles de libros, categorías y recursos educativos. Descubre novedades, libros destacados y mucho más.</p>
        <div className="flex flex-col gap-4 items-center">
          <Link to="/catalogo" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">Ver catálogo completo</Link>
          <Link to="/categorias" className="bg-blue-100 text-blue-700 px-6 py-2 rounded shadow hover:bg-blue-200 transition">Explorar categorías</Link>
        </div>
        {/* Carrousel con keen-slider */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 w-full max-w-2xl mx-auto">
            <button
              className="px-2 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => instanceRef.current?.prev()}
              aria-label="Anterior"
              style={{ zIndex: 2 }}
            >
              &#8592;
            </button>
            <div
              ref={sliderRef}
              className="keen-slider w-full max-w-xl h-[140px] px-2"
              onMouseEnter={() => setPause(true)}
              onMouseLeave={() => setPause(false)}
              style={{ zIndex: 1 }}
            >
              {librosDestacados.map((libro, idx) => (
                <div key={idx} className="keen-slider__slide flex flex-col items-center bg-white rounded-lg shadow p-1 min-w-20 max-w-20 mx-2">
                  <img src={libro.img} alt={libro.title} className="mb-1 rounded shadow w-12 h-16 object-cover" />
                  <h3 className="text-[11px] font-semibold text-blue-700 text-center line-clamp-2">{libro.title}</h3>
                  <p className="text-[9px] text-gray-600 mb-1 text-center">{libro.author}</p>
                  <Link to={`/visor/${idx}`} className="text-blue-500 underline text-[9px]">Leer libro</Link>
                </div>
              ))}
            </div>
            <button
              className="px-2 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => instanceRef.current?.next()}
              aria-label="Siguiente"
              style={{ zIndex: 2 }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
  }
  export default Home;
