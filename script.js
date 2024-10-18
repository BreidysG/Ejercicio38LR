let speed = 300; // Velocidad predeterminada en milisegundos
let timer = 180; // 3 minutos en segundos
let timerInterval;
let currentIndex = 0;
let lines = [
    "Van de la vida estas tardes sin sol ni luceros! Va cayendo la noche:",
    "La bruma ha bajado a los montes el cielo; una lluvia menuda y monótona",
    "Humedece los árboles secos. El rumor de sus gotas penetra hasta",
    "El corazón de la naturaleza, como si le susurraran su último adiós.",
    "La luz se desvanece lentamente, dejando tras de sí un rastro de sombras.",
    "Los pájaros cantan su último trino antes de refugiarse en sus nidos.",
    "Un viento suave acaricia las hojas, haciendo susurrar los árboles.",
    "La luna comienza a asomarse tímidamente por el horizonte oscuro.",
    "El paisaje se sumerge en una quietud que invita al pensamiento profundo.",
    "Todo parece detenerse en este instante de calma y reflexión.",
    "Las estrellas comienzan a brillar en el cielo como pequeños destellos de esperanza.",
"En la lejanía, el murmullo de un río acompaña la serenidad de la noche."
];

document.getElementById('startBtn').addEventListener('click', startExercise);

function startExercise() {
    // Obtener la velocidad ingresada por el usuario
    const userSpeed = document.getElementById('speed').value;
    speed = parseInt(userSpeed) || 300; // Asignar la velocidad del usuario, o 300ms si no es válida

    document.getElementById("exerciseArea").classList.remove("hidden");
    document.getElementById("p1").classList.add("hidden");
    document.getElementById("div1").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");

    // Inicializar el temporizador
    startTimer();

    // Comenzar a mostrar las líneas de texto con el subrayado
    showNextLines();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo restante: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

function showNextLines() {
    const textArea = document.getElementById('textArea');
    const thirdLine = document.getElementById('thirdLine');
    textArea.innerHTML = ''; // Limpiar el área de texto antes de mostrar nuevas líneas
    thirdLine.innerHTML = ''; // Limpiar la tercera línea

    if (currentIndex < lines.length) {
        // Mostrar las siguientes dos líneas de texto
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        const line3 = document.createElement('div'); // Nueva línea de texto
        line1.classList.add('line', 'active');
        line2.classList.add('line', 'active');
        line3.classList.add('line', 'active'); // Nueva línea de texto
        line1.innerText = lines[currentIndex];
        line2.innerText = lines[currentIndex + 1] || ""; // Mostrar la siguiente línea o vacía si no existe
        line3.innerText = lines[currentIndex + 2] || ""; // Nueva línea de texto o vacía si no existe
        textArea.appendChild(line1);
        textArea.appendChild(line2);
        thirdLine.appendChild(line3); // Añadir la nueva línea de texto

        // Resaltar la primera línea
        highlightLine(line1, () => {
            // Después de que termine, resaltar la segunda línea
            highlightLine(line2, () => {
                // Resaltar la tercera línea
                highlightLine(line3, () => {
                    // Avanzar al siguiente trío de líneas después de que se resalte la tercera
                    currentIndex += 3;

                    // Si llegamos al final, reiniciar el ciclo
                    if (currentIndex >= lines.length) {
                        currentIndex = 0;
                    }

                    // Continuar con las siguientes líneas después de un pequeño retraso
                    setTimeout(showNextLines, speed);
                });
            });
        });
    }
}

function highlightLine(line, callback) {
    line.classList.add('highlight'); // Añadir el fondo de subrayado
    setTimeout(() => {
        line.classList.remove('highlight'); // Quitar el fondo después de la duración
        callback(); // Llamar a la siguiente acción
    }, speed);
}
