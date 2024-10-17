// Variables globales
let palabraElegida = '';
let palabraGuiones = [];
let letrasUsadas = [];
let errores = 0;
const maxErrores = 6;
const palabras = ['javascript', 'html', 'css', 'bootstrap', 'programacion'];
const partesAhorcado = ['cabeza', 'cuerpo', 'brazoIzquierdo', 'brazoDerecho', 'piernaIzquierda', 'piernaDerecha'];

// Inicializar el juego
function iniciarJuego() {
    palabraElegida = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
    palabraGuiones = Array(palabraElegida.length).fill('_');
    letrasUsadas = [];
    errores = 0;
    document.getElementById("palabra").textContent = palabraGuiones.join(' ');
    document.getElementById("letras").textContent = letrasUsadas.join(' ');
    document.getElementById("mensaje").textContent = '';
    document.getElementById("inputLetra").value = '';
    resetearAhorcado();
}

// Adivinar letra
function adivinaLetra() {
    const letra = document.getElementById("inputLetra").value.toLowerCase();
    document.getElementById("inputLetra").value = '';  // Resetea el input
    if (letra && !letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra);
        document.getElementById("letras").textContent = letrasUsadas.join(' ');

        if (palabraElegida.includes(letra)) {
            for (let i = 0; i < palabraElegida.length; i++) {
                if (palabraElegida[i] === letra) {
                    palabraGuiones[i] = letra;
                }
            }
            document.getElementById("palabra").textContent = palabraGuiones.join(' ');
             //Verificación de si haz ganado
            if (palabraGuiones.join('') === palabraElegida) {
                document.getElementById("mensaje").textContent = "¡Ganaste! ¡Felicidades!";
            }
        } else {
            errores++;
            actualizarDibujoAhorcado();
            if (errores === maxErrores) {
                document.getElementById("mensaje").textContent = "Perdiste, la palabra era: " + palabraElegida;
            }
        }
    }
}

// Función que actualiza el dibujo del ahorcado según los errores
function actualizarDibujoAhorcado() {
    if (errores <= partesAhorcado.length) {
        document.getElementById(partesAhorcado[errores - 1]).style.display = 'block';
    }
}

// Resetea el ahorcado ocultando todas las partes
function resetearAhorcado() {
    partesAhorcado.forEach(parte => {
        document.getElementById(parte).style.display = 'none';
    });
}

// Botón para reiniciar el juego
document.getElementById("reset-button").addEventListener('click', iniciarJuego);

// Iniciar el juego al cargar la página
window.onload = iniciarJuego;
