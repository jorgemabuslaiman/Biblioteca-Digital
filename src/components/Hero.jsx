import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-12 px-6 gap-8">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800">Descubre el mundo de la lectura digital</h1>
        <p className="text-lg md:text-xl mb-6 text-blue-600">Libros para niños y jóvenes, organizados por edad y temática. ¡Explora, aprende y disfruta!</p>
        <Link to="/catalogo" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-800 transition">Ver catálogo</Link>
      </div>
      <div className="flex-1 flex justify-center">
        <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80" alt="Lectura digital" className="w-64 h-64 object-cover rounded-xl shadow-lg bg-white" />
      </div>
    </section>
  );
}

export default Hero;
