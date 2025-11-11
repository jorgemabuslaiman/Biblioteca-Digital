
function Header() {
  return (
    <header className="w-full bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6 gap-4">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo Ministerio" className="h-10 w-10" />
          <span className="text-2xl font-bold tracking-tight">Biblioteca Digital</span>
        </div>
        <nav className="flex gap-6" aria-label="Navegación principal">
          <a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Inicio</a>
          <a href="#catalogo" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Catálogo</a>
          <a href="#categorias" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Categorías</a>
          <a href="#contacto" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Contacto</a>
        </nav>
        <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">Iniciar sesión</button>
      </div>
    </header>
  );
}

export default Header;
