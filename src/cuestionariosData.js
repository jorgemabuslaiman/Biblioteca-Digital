
// Generador automático de cuestionarios para cada libro
import { librosDestacados } from "./librosData";

function generarPreguntas(libro, idx) {
  // Preguntas base, adaptadas al título y autor
  let preguntas = [
    {
      tipo: "unica",
      pregunta: `¿Quién es el autor de "${libro.title}"?`,
      opciones: [libro.author, "Varios", "Anónimo", "Desconocido"],
      respuestaCorrecta: 0
    },
    {
      tipo: "unica",
      pregunta: `¿A qué género pertenece "${libro.title}"?`,
      opciones: [libro.category || "Infantil", "Aventura", "Ciencia", "Fantasía"],
      respuestaCorrecta: 0
    },
    {
      tipo: "unica",
      pregunta: `¿Cuál de estos títulos es el libro que leíste?`,
      opciones: [libro.title, "El Principito", "Matilda", "Don Quijote de la Mancha"],
      respuestaCorrecta: 0
    },
    {
      tipo: "unica",
      pregunta: `¿El libro "${libro.title}" es una obra de...?`,
      opciones: [libro.author, "Roald Dahl", "Jules Verne", "Horacio Quiroga"],
      respuestaCorrecta: 0
    },
    {
      tipo: "unica",
      pregunta: `¿Qué imagen representa mejor el libro "${libro.title}"?`,
      opciones: ["Aventura", "Ciencia", "Fantasía", "Educativo"],
      respuestaCorrecta: 0
    },
    {
      tipo: "multiple",
      pregunta: `Selecciona los elementos que podrían aparecer en "${libro.title}"`,
      opciones: ["Personajes", "Animales", "Viajes", "Magia"],
      respuestasCorrectas: [0, 2] // ejemplo
    },
    {
      tipo: "unica",
      pregunta: `¿El libro "${libro.title}" fue escrito por...?`,
      opciones: [libro.author, "Varios autores", "Un científico", "Un poeta"],
      respuestaCorrecta: 0
    },
    {
      tipo: "unica",
      pregunta: `¿Cuál es el mensaje principal de "${libro.title}"?`,
      opciones: ["Reflexión", "Aventura", "Diversión", "Aprendizaje"],
      respuestaCorrecta: 0
    },
    {
      tipo: "unica",
      pregunta: `¿En qué lugar se desarrolla principalmente "${libro.title}"?`,
      opciones: ["Ciudad", "Bosque", "Escuela", "Casa"],
      respuestaCorrecta: 0
    },
    {
      tipo: "unica",
      pregunta: `¿Qué personaje es importante en "${libro.title}"?`,
      opciones: ["Protagonista", "Antagonista", "Secundario", "Narrador"],
      respuestaCorrecta: 0
    }
  ];
  // Si es el primer libro, incluir un puzzle como primera pregunta
  if (idx === 0) {
    preguntas = [
      {
        tipo: "puzzle",
        pregunta: "Resuelve el puzzle para continuar: reordena las letras de LIBRO para formar una nueva palabra.",
      },
      ...preguntas.slice(0, 9)
    ];
  }
  return preguntas;
}

const cuestionarios = librosDestacados.map((libro, idx) => ({
  libroId: idx,
  preguntas: generarPreguntas(libro, idx)
}));

export default cuestionarios;
