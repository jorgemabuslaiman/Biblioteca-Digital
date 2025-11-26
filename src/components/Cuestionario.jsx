  // Permitir seleccionar opciones (radio y checkbox)
  const handleChange = (idx, opIdx, tipo) => {
    if (finalizado || bloqueado) return;
    setRespuestas(prev => {
      const nuevas = [...prev];
      if (tipo === "multiple") {
        if (!Array.isArray(nuevas[idx])) nuevas[idx] = [];
        if (nuevas[idx].includes(opIdx)) {
          nuevas[idx] = nuevas[idx].filter(i => i !== opIdx);
        } else {
          nuevas[idx] = [...nuevas[idx], opIdx];
        }
      } else {
        nuevas[idx] = opIdx;
      }
      return nuevas;
    });
  };

  // Permitir reiniciar el cuestionario
  const reiniciarCuestionario = () => {
    localStorage.removeItem(storageKey);
    setRespuestas(Array(cuestionario?.preguntas.length).fill(null));
    setFinalizado(false);
    setBloqueado(false);
    setShowResultados(false);
    setShowModal(false);
    setTiempoRestante(1800);
    // Reiniciar temporizador
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTiempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
      // Permitir seleccionar opciones (radio y checkbox)
      const handleChange = (idx, opIdx, tipo) => {
        if (finalizado || bloqueado) return;
        setRespuestas(prev => {
          const nuevas = [...prev];
          if (tipo === "multiple") {
            if (!Array.isArray(nuevas[idx])) nuevas[idx] = [];
            if (nuevas[idx].includes(opIdx)) {
              nuevas[idx] = nuevas[idx].filter(i => i !== opIdx);
            } else {
              nuevas[idx] = [...nuevas[idx], opIdx];
            }
          } else {
            nuevas[idx] = opIdx;
          }
          return nuevas;
        });
      };

      // Permitir reiniciar el cuestionario
      const reiniciarCuestionario = () => {
        localStorage.removeItem(storageKey);
        setRespuestas(Array(cuestionario?.preguntas.length).fill(null));
        setFinalizado(false);
        setBloqueado(false);
        setShowResultados(false);
        setShowModal(false);
        setTiempoRestante(1800);
        // Reiniciar temporizador
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setTiempoRestante(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              setFinalizado(true);
              setBloqueado(true);
              localStorage.setItem(storageKey, JSON.stringify({ terminado: false, tiempoFinal: Date.now() }));
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      };
          setFinalizado(true);
          setBloqueado(true);
          localStorage.setItem(storageKey, JSON.stringify({ terminado: false, tiempoFinal: Date.now() }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };


import React, { useEffect, useRef, useState } from "react";


// Puzzle interactivo simple (ejemplo: ordenar letras)
function PuzzleInteractivo({ disabled, onSolved }) {
  const [input, setInput] = useState("");
  const palabra = "LIBRO";
  const solucion = "BORIL";
  // El puzzle es: reordenar las letras de "LIBRO" para formar "BORIL"
  return (
    <div className="my-2">
      <div className="mb-2">Reordena las letras para formar una nueva palabra: <span className="font-mono font-bold">{palabra.split("").sort(() => 0.5 - Math.random()).join(" ")}</span></div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value.toUpperCase())}
        disabled={disabled}
        className="border px-2 py-1 rounded mr-2"
        placeholder="Escribe la palabra"
      />
      <button
        type="button"
        className="bg-blue-500 text-white px-2 py-1 rounded"
        disabled={disabled}
        onClick={() => onSolved(input === solucion)}
      >Comprobar</button>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import cuestionarios from "../cuestionariosData";

export default function Cuestionario({ libroId, onFinish }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showResultados, setShowResultados] = useState(false);
  const cuestionario = cuestionarios.find(q => q.libroId === libroId);
  // Soporte para selección múltiple
  const [respuestas, setRespuestas] = useState(
    Array(cuestionario?.preguntas.length).fill(null)
  );
  const [finalizado, setFinalizado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(1800); // 30 minutos en segundos
  const [bloqueado, setBloqueado] = useState(false);
  const timerRef = useRef();

  // Clave única para localStorage
  const storageKey = `cuestionario_${libroId}_intento`;

  useEffect(() => {
    // Revisar si ya fue respondido
    const data = localStorage.getItem(storageKey);
    if (data) {
      const { terminado, puntaje, tiempoFinal } = JSON.parse(data);
      if (terminado) {
        setFinalizado(true);
        setBloqueado(true);
        setTiempoRestante(0);
      } else if (tiempoFinal) {
        // Si el tiempo expiró
        setFinalizado(true);
        setBloqueado(true);
        setTiempoRestante(0);
      }
    } else {
      // Iniciar temporizador
      timerRef.current = setInterval(() => {
        setTiempoRestante(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setFinalizado(true);
            setBloqueado(true);
            localStorage.setItem(storageKey, JSON.stringify({ terminado: false, tiempoFinal: Date.now() }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, []); // <-- Cierra el useEffect correctamente

  const handleSubmit = (e) => {
    e.preventDefault();
    if (finalizado || bloqueado) return;
    setShowModal(true);
  };

  const finalizarCuestionario = () => {
    setFinalizado(true);
    setBloqueado(true);
    clearInterval(timerRef.current);
    // Calcular puntaje considerando selección múltiple
    const puntaje = respuestas.reduce((acc, r, idx) => {
      const p = cuestionario.preguntas[idx];
      if (p.tipo === "multiple") {
        // Respuestas correctas: todos los índices deben estar y no debe haber extras
        if (
          Array.isArray(r) &&
          Array.isArray(p.respuestasCorrectas) &&
          r.length === p.respuestasCorrectas.length &&
          r.every(val => p.respuestasCorrectas.includes(val))
        ) {
          return acc + 1;
        }
        return acc;
      } else {
        return r === p.respuestaCorrecta ? acc + 1 : acc;
      }
    }, 0);
    localStorage.setItem(storageKey, JSON.stringify({ terminado: true, puntaje, fecha: Date.now() }));
    if (onFinish) onFinish(respuestas, puntaje);
    setShowModal(false);
    setShowResultados(true);
  };

  const puntaje = respuestas.reduce((acc, r, idx) =>
    r === cuestionario.preguntas[idx].respuestaCorrecta ? acc + 1 : acc, 0
  );

  // Formato mm:ss
  const formatTime = s => `${String(Math.floor(s/60)).padStart(2, '0')}:${String(s%60).padStart(2, '0')}`;

  if (bloqueado && !finalizado) {
    return <div className="p-4 bg-red-100 text-red-700 rounded">Ya has realizado tu intento para este cuestionario.</div>;
  }

  // Modal de confirmación y resultados
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Cuestionario de comprensión lectora</h2>
        <div className="mb-4 text-right text-sm text-gray-600">Tiempo restante: <span className={tiempoRestante < 60 ? 'text-red-600 font-bold' : ''}>{formatTime(tiempoRestante)}</span></div>
        {cuestionario.preguntas.map((p, idx) => (
          <div key={idx} className="mb-6">
            <p className="font-semibold mb-2">{idx + 1}. {p.pregunta}</p>
            {p.tipo === "puzzle" ? (
              <PuzzleInteractivo disabled={finalizado || bloqueado} onSolved={ok => {
                const nuevas = [...respuestas];
                nuevas[idx] = ok ? 1 : 0;
                setRespuestas(nuevas);
              }} />
            ) : (
              <div className="space-y-1">
                {p.opciones && p.opciones.map((op, opIdx) => (
                  <label key={opIdx} className="block cursor-pointer">
                    <input
                      type={p.tipo === "multiple" ? "checkbox" : "radio"}
                      name={`pregunta-${idx}`}
                      value={opIdx}
                      checked={p.tipo === "multiple"
                        ? Array.isArray(respuestas[idx]) && respuestas[idx].includes(opIdx)
                        : respuestas[idx] === opIdx}
                      onChange={() => handleChange(idx, opIdx, p.tipo)}
                      disabled={finalizado || bloqueado}
                      className="mr-2"
                    />
                    {op}
                    {finalizado && (
                      p.tipo === "multiple"
                        ? (Array.isArray(respuestas[idx]) && respuestas[idx].includes(opIdx) && p.respuestasCorrectas && p.respuestasCorrectas.includes(opIdx)) && <span className="ml-2 text-green-600 font-bold">✔</span>
                        : (respuestas[idx] === opIdx && (opIdx === p.respuestaCorrecta ? <span className="ml-2 text-green-600 font-bold">✔</span> : <span className="ml-2 text-red-600 font-bold">✘</span>))
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-2 mt-4">
          {!finalizado ? (
            <button type="button" onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Finalizar cuestionario</button>
          ) : (
            <div className="text-lg font-semibold">Puntaje: {puntaje} / {cuestionario.preguntas.length}</div>
          )}
          <button type="button" onClick={reiniciarCuestionario} className="bg-yellow-500 text-white px-4 py-2 rounded">Reiniciar cuestionario</button>
          {bloqueado && finalizado && (
            <div className="text-red-600">Solo tienes un intento por dispositivo.</div>
          )}
        </div>
      </form>

      {/* Modal de confirmación */}
      {showModal && !showResultados && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Está a punto de finalizar el cuestionario</h3>
            <p className="mb-6">¿Desea finalizar y enviar sus respuestas? No podrá volver a intentarlo.</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Atrás</button>
              <button onClick={finalizarCuestionario} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de resultados */}
      {showResultados && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">¡Cuestionario finalizado!</h3>
            <ul className="mb-4">
              {cuestionario.preguntas.map((p, idx) => (
                <li key={idx} className={respuestas[idx] === p.respuestaCorrecta ? 'text-green-700 font-semibold' : 'text-gray-700'}>
                  {idx + 1}. {p.pregunta} {respuestas[idx] === p.respuestaCorrecta && <span className="ml-2">✔</span>}
                </li>
              ))}
            </ul>
            <div className="mb-4">Tiempo utilizado: <span className="font-semibold">{formatTime(1800 - tiempoRestante)}</span></div>
            <div className="flex justify-end">
              <button onClick={() => navigate('/cuestionarios')} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
