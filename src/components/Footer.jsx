
function Footer() {
  return (
    <footer id="contacto" className="w-full bg-blue-900 text-white mt-auto py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo Ministerio" className="h-8 w-8" />
          <span className="font-bold">Biblioteca Digital</span>
        </div>
        <div className="text-sm">Contacto: <a href="mailto:info@educaciontuc.gov.ar" className="underline focus:outline-none focus:ring-2 focus:ring-blue-400">info@educaciontuc.gov.ar</a></div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Política de privacidad</a>
          <a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">Términos de uso</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
