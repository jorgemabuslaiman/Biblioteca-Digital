

import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Header() {
  // Estado de usuario simulado
  const [usuario, setUsuario] = useState(() => {
     const guardado = localStorage.getItem('usuario_simulado')
    return guardado ? JSON.parse(guardado) : null;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [showClave, setShowClave] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!correo || !clave) {
      setError("Completa ambos campos");
      return;
    }
    if (correo === "informatica@ministerio.com" && clave === "123456") {
      const user = {
        nombre: "Informatica",
        foto: "/icoministerio.png"
      };
      setUsuario(user);
      localStorage.setItem('usuario_simulado', JSON.stringify(user));
      setShowModal(false);
      setCorreo("");
      setClave("");
      setError("");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario_simulado');
    setShowLogout(false);
    window.alert('Sesión cerrada');
  };

  return (
    <header className="w-full bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6 gap-4 relative">
        {/* Overlay para mobile */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden animate-fadein"
            style={{backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'}}
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
        {/* Botón hamburguesa animado */}
        <button
          className={`md:hidden absolute right-6 top-5 z-50 bg-blue-700 p-2 rounded focus:outline-none flex flex-col justify-center items-center transition-all duration-300 ${menuOpen ? 'ring-2 ring-yellow-300' : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'mb-1'}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        <Link to="/" className="flex items-center gap-2 focus:outline-none" tabIndex={0} aria-label="Ir al inicio">
          <img src="/vite.svg" alt="Logo Ministerio" className="h-10 w-10" />
          <span className="text-2xl font-bold tracking-tight">Biblioteca Digital</span>
        </Link>
        <nav
          className={`md:flex md:flex-row md:gap-6 md:static fixed top-0 left-0 h-full w-64 ${menuOpen ? 'bg-gradient-to-b from-blue-900 to-blue-700 shadow-2xl' : ''} z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-auto md:bg-transparent md:shadow-none flex-col gap-0`}
          aria-label="Navegación principal"
        >
          <div className="flex flex-col gap-2 mt-8 md:mt-0 md:flex-row md:gap-6 md:items-center w-full">
            {/* Elementos de navegación */}
            <div className="flex flex-col md:flex-row md:gap-6 md:items-center flex-1">
              <Link to="/" className="block text-lg md:text-base hover:bg-blue-600 md:hover:bg-transparent hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-400 px-8 py-3 md:p-0 rounded transition" onClick={() => setMenuOpen(false)}>Inicio</Link>
              <Link to="/catalogo" className="block text-lg md:text-base hover:bg-blue-600 md:hover:bg-transparent hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-400 px-8 py-3 md:p-0 rounded transition" onClick={() => setMenuOpen(false)}>Catálogo</Link>
              <Link to="/categorias" className="block text-lg md:text-base hover:bg-blue-600 md:hover:bg-transparent hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-400 px-8 py-3 md:p-0 rounded transition" onClick={() => setMenuOpen(false)}>Categorías</Link>
              <Link to="/cuestionarios" className="block text-lg md:text-base hover:bg-green-700 md:hover:bg-transparent hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-300 font-bold px-8 py-3 md:p-0 rounded transition" onClick={() => setMenuOpen(false)}>Cuestionarios</Link>
              <Link to="/gamificacion" className="block text-lg md:text-base hover:bg-yellow-600 md:hover:bg-transparent hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-yellow-300 font-bold px-8 py-3 md:p-0 rounded transition" onClick={() => setMenuOpen(false)}>Mundo Lector</Link>
              <Link to="/contacto" className="block text-lg md:text-base hover:bg-blue-600 md:hover:bg-transparent hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-blue-400 px-8 py-3 md:p-0 rounded transition" onClick={() => setMenuOpen(false)}>Contacto</Link>
            </div>
            {/* Botón de login en mobile y a la derecha en desktop */}
            {!usuario && (
              <button
                className="block bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2 md:mb-0 md:ml-4 md:block"
                onClick={() => { setShowModal(true); setMenuOpen(false); }}
              >
                Iniciar sesión
              </button>
            )}
            {/* Botón de usuario logueado en mobile */}
            {usuario && (
              <button
                className="block md:hidden flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg focus:outline-none mt-2"
                onClick={() => setShowLogout(true)}
              >
                <img src={usuario.foto} alt={usuario.nombre} className="w-8 h-8 rounded-full border-2 border-white" />
                <span className="font-semibold">Hola {usuario.nombre}</span>
              </button>
            )}
          </div>
        </nav>
        {/* Botón de usuario logueado en desktop */}
        {usuario && (
          <div className="relative hidden md:block">
            <button
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg focus:outline-none"
              onClick={() => setShowLogout(true)}
            >
              <img src={usuario.foto} alt={usuario.nombre} className="w-8 h-8 rounded-full border-2 border-white" />
              <span className="font-semibold">Hola {usuario.nombre}</span>
            </button>
            {showLogout && (
              <div className="absolute right-0 mt-2 bg-white text-blue-800 rounded shadow-lg z-50">
                <button
                  className="block px-4 py-2 hover:bg-blue-100 w-full text-left"
                  onClick={handleLogout}
                >Cerrar sesión</button>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-gray-500"
                  onClick={() => setShowLogout(false)}
                >Cancelar</button>
              </div>
            )}
          </div>
        )}
            {/* Modal de login simulado */}
            {showModal && (
              <ModalLoginMobile onClose={() => { setShowModal(false); setError(""); }} onSubmit={handleLogin} correo={correo} setCorreo={setCorreo} clave={clave} setClave={setClave} error={error} />
            )}
      </div>
    </header>
  );
}

export function ModalLoginMobile({ onClose, onSubmit, correo, setCorreo, clave, setClave, error }) {
  // Asegura que React esté disponible (por si el bundler no lo inyecta implícitamente)
  // Bloquear scroll del body al abrir el modal
  React.useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen"
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        left: 0,
        top: 0,
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'rgba(255,255,255,0.01)',
      }}
    >
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-xs flex flex-col items-center gap-4 p-4"
        style={{ minWidth: 0, boxSizing: 'border-box' }}
      >
        <h2 className="text-xl font-bold text-blue-800 mb-2">Iniciar sesión</h2>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-semibold text-blue-900" htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            placeholder="Correo"
            className="border rounded px-3 py-2 w-full text-blue-900 placeholder-black"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm font-semibold text-blue-900" htmlFor="clave">Contraseña</label>
          <input
            id="clave"
            type="password"
            placeholder="Contraseña"
            className="border rounded px-3 py-2 w-full text-blue-900 placeholder-black"
            value={clave}
            onChange={e => setClave(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm w-full text-center">{error}</div>}
        <div className="flex gap-2 w-full mt-2">
          <button type="submit" className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">Iniciar sesión</button>
          <button type="button" className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default Header;
