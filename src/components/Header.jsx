
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6 gap-4">
        <Link to="/" className="flex items-center gap-2 focus:outline-none" tabIndex={0} aria-label="Ir al inicio">
          <img src="/vite.svg" alt="Logo Ministerio" className="h-10 w-10" />
          <span className="text-2xl font-bold tracking-tight">Biblioteca Digital</span>
        </Link>
        <nav className="flex gap-6" aria-label="Navegación principal">
          <Link to="/" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Inicio</Link>
          <Link to="/catalogo" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Catálogo</Link>
          <Link to="/categorias" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Categorías</Link>
          <Link to="/gamificacion" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 text-yellow-300 font-bold">Mundo Lector</Link>
          <Link to="/contacto" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Contacto</Link>
        </nav>
        <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">Iniciar sesión</button>
      </div>
    </header>
  );
}

export default Header;
