function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-12 px-6 gap-8">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800">Descubre el mundo de la lectura digital</h1>
        <p className="text-lg md:text-xl mb-6 text-blue-600">Libros para niños y jóvenes, organizados por edad y temática. ¡Explora, aprende y disfruta!</p>
        <a href="#catalogo" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-800 transition">Ver catálogo</a>
      </div>
      <div className="flex-1 flex justify-center">
        <img src="https://www.educaciontuc.gov.ar/wp-content/uploads/2022/03/Logo-Educacion-2022.png" alt="Hero" className="w-64 h-64 object-contain rounded-xl shadow-lg bg-white" />
      </div>
    </section>
  );
}

export default Hero;
