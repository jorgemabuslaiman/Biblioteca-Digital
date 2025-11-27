import React from "react";

export default function GoogleLoginButton({ onSuccess, onFailure }) {
  // Este componente es un placeholder. Se reemplazará por el botón real de Google.
  return (
    <button
      className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition flex items-center gap-2"
      onClick={() => alert('Aquí irá el login de Google')}
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
      Iniciar sesión con Google
    </button>
  );
}
