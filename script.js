// Textos para las revelaciones
const texts = {
    text1: `Querida Venus, han pasado cuatro días, y el tiempo se siente como un rompecabezas que el universo me dio sin instrucciones. Tu “buenos días, amor” aún danza en mi cabeza, como una melodía que se niega a desvanecerse, y tu “necesito tiempo” fue un silencio que detuvo la música, dejando ecos que no sé descifrar. El universo es un bromista sabio, ¿no crees? Nos cruza en su danza cósmica, nos hace brillar juntos, y a veces nos detiene, como si quisiera que escucháramos el susurro de nuestra propia alma.`,
    text2: `Recuerdo la primera vez que viniste a mi casa y te fuiste, cómo lloré,  
como un niño perdido en la noche, buscando su fe.  
Tus pasos se desvanecieron, pero tu risa quedó,  
una chispa eterna que en mi cielo brilló.  
He pasado estos días perdido en pensamientos, buscando respuestas en fotos nuestras, en palabras que leo, en silencios que no entiendo. Y he aprendido algo: el amor no es una jaula que encierra, ni un mapa que debes seguir para no perderte. Es una noche estrellada, donde cada alma brilla a su manera, libre, sin miedo a que sus luces no encajen.`,
    text3: `“Amar es abrir las puertas de la jaula que el otro nunca pidió, y dejarlo volar aunque no sea hacia ti”, decía alguien que entendía más que yo. Y tú, Venus, eres la estrella más libre que he conocido: bailas cuando el mundo exige pasos firmes, hablas con el corazón aunque la voz tiemble, y haces que todo sea más bello solo por ser tú, sin moldes ni cadenas. Eso siempre me robó el aliento, aunque nunca supe decírtelo como merecías.`,
    text4: `No sé si nos extraviamos porque los dos somos un poco caos, o porque a veces queríamos que el otro brillara a nuestro compás. El miedo es un arquitecto cruel: construye jaulas invisibles, te hace creer que abrirte del todo romperá algo, que amar es perderte. Quizás sentiste que lo nuestro, por mucho que iluminara, te hacía depender de un peso que no querías cargar. Que tal vez te encerraba, alejándote de la Venus que brilla sin necesitar a nadie.`,
    text5: `Lo entiendo, porque el amor, cuando es inmenso, puede parecer una jaula disfrazada de refugio. Pero, Venus, lo nuestro nunca fue un encierro. Era un cielo abierto, donde podíamos ser nosotros, con nuestras risas tontas, nuestras discusiones que parecían apocalípticas, y esos instantes en que te dormías a mi lado y yo sentía que el universo, por un momento, estaba en paz. Recuerdo esa libreta tuya, donde apuntabas cosas sobre mí, lo que querías que mejorara o no te gustaba. Era un gesto tan tuyo, tan honesto, como si quisieras pulir lo nuestro con la verdad.`,
    text6: `Hicimos promesas bajo este cielo, Venus, y cada una es una estrella que nunca se apagará. Vamos a pintarlas juntas, como un lienzo que el universo guardará por siempre.`,
    text7: `No te escribo para cambiar lo que sientes, ni para pedirte un guion que explique tu corazón. Solo quiero dejar aquí lo que llevo dentro, como si estuviéramos bajo un cielo estrellado, sin prisas, sin jaulas. Tu “necesito tiempo” no es un punto final, es un paso en tu danza. Quizás sentiste que depender de alguien, aunque fuera un suspiro, te alejaba de la Venus que buscas ser. O que soltar era lo mejor, para ti, para mí, para los dos. Pero el miedo, aunque quiere protegerte, a veces teje jaulas donde no las hay. Lo que sé es que tú eres más fuerte que cualquier duda, más brillante que cualquier sombra.`
};

// Crear estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random();
        if (size < 0.5) star.classList.add('small');
        else if (size < 0.8) star.classList.add('medium');
        else star.classList.add('large');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}

// Efecto de escritura
function typeText(element, text, speed = 45, callback = null) {
    element.textContent = '';
    element.isTyping = false;
    clearTimeout(element.typingTimeout);

    let i = 0;
    element.isTyping = true;

    function typing() {
        if (!element.isTyping) return;
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            const delay = text.charAt(i-1).match(/[.,;:]/) ? speed * 8 : speed;
            element.typingTimeout = setTimeout(typing, delay);
        } else {
            element.isTyping = false;
            if (callback) callback();
        }
    }

    typing();
}

// Navegación entre secciones
function showSection(id) {
    console.log('Showing section:', id); // Debug
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(id);
    if (!targetSection) {
        console.error('Section not found:', id);
        return;
    }
    targetSection.classList.add('active');
    window.scrollTo(0, 0);

    const textElement = targetSection.querySelector('.typewriter');
    if (textElement && !textElement.hasWritten) {
        const textKey = textElement.id.replace('text-', 'text');
        typeText(textElement, texts[textKey], 35, () => {
            console.log('Typewriter finished for section:', id); // Debug
        });
        textElement.hasWritten = true;
    }

    if (id === 'final') {
        setupChoiceButtons();
    }
}

// SVG para una estrella
const starSVG = `
<svg viewBox="0 0 32 32">
    <path d="M16 0l4.2 10.2h11.2l-8.8 6.8 3.4 10.8-8.8-6.8-8.8 6.8 3.4-10.8-8.8-6.8h11.2z" />
</svg>
`;

// Interacción 1: Dibujar un camino estelar
function createStarPath() {
    const canvas = document.getElementById('star-path-canvas');
    canvas.innerHTML = '';
    const positions = [
        { left: 30, top: 20 },
        { left: 50, top: 50 },
        { left: 70, top: 80 }
    ];

    let clicks = 0;
    let lastPoint = null;

    positions.forEach(pos => {
        const point = document.createElement('div');
        point.classList.add('star-point');
        point.innerHTML = starSVG;
        point.style.left = `${pos.left}%`;
        point.style.top = `${pos.top}%`;
        canvas.appendChild(point);

        point.addEventListener('click', function() {
            clicks++;
            point.querySelector('svg').style.opacity = '1';
            point.style.animation = 'none';

            if (lastPoint) {
                const line = document.createElement('div');
                line.classList.add('star-line');
                const x1 = lastPoint.offsetLeft + lastPoint.offsetWidth / 2;
                const y1 = lastPoint.offsetTop + lastPoint.offsetHeight / 2;
                const x2 = point.offsetLeft + point.offsetWidth / 2;
                const y2 = point.offsetTop + point.offsetHeight / 2;
                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                line.style.width = `${length}px`;
                line.style.left = `${x1}px`;
                line.style.top = `${y1}px`;
                line.style.transform = `rotate(${angle}deg)`;
                canvas.appendChild(line);
            }

            lastPoint = point;

            if (clicks === 3) {
                setTimeout(() => {
                    showSection('reveal-1');
                }, 1000);
            }
        }, { once: true });
    });
}

// Interacción 2: Liberar una estrella atrapada
function createFreeStar() {
    const canvas = document.getElementById('free-star-canvas');
    canvas.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const cage = document.createElement('div');
        cage.classList.add('star-cage');
        const innerStar = document.createElement('div');
        innerStar.classList.add('inner-star');
        innerStar.innerHTML = starSVG;
        cage.appendChild(innerStar);
        canvas.appendChild(cage);
    }

    const cages = document.querySelectorAll('.star-cage');
    let freed = 0;

    cages.forEach(cage => {
        cage.addEventListener('click', function() {
            cage.classList.add('freed');
            freed++;
            if (freed === 3) {
                setTimeout(() => {
                    showSection('reveal-2');
                }, 1000);
            }
        }, { once: true });
    });
}

// Interacción 3: Iluminar una nebulosa
function createNebulaLight() {
    const canvas = document.getElementById('nebula-canvas');
    canvas.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const part = document.createElement('div');
        part.classList.add('nebula-part');
        part.innerHTML = starSVG;
        canvas.appendChild(part);
    }

    const parts = document.querySelectorAll('.nebula-part');
    let illuminated = 0;

    parts.forEach(part => {
        part.addEventListener('click', function() {
            part.classList.add('illuminated');
            illuminated++;
            if (illuminated === 3) {
                setTimeout(() => {
                    showSection('reveal-3');
                }, 1000);
            }
        }, { once: true });
    });
}

// Interacción 4: Romper cadenas estelares
function createBreakChains() {
    const canvas = document.getElementById('chains-canvas');
    canvas.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const chain = document.createElement('div');
        chain.classList.add('chain-link');
        chain.innerHTML = starSVG;
        canvas.appendChild(chain);
    }

    const chains = document.querySelectorAll('.chain-link');
    let broken = 0;

    chains.forEach(chain => {
        chain.addEventListener('click', function() {
            chain.classList.add('broken');
            broken++;
            if (broken === 3) {
                setTimeout(() => {
                    showSection('reveal-4');
                }, 1000);
            }
        }, { once: true });
    });
}

// Interacción 5: Crear una constelación de recuerdos
function createMemoryConstellation() {
    const canvas = document.getElementById('memory-canvas');
    canvas.innerHTML = '';
    const memories = [
        'Tu risa bonita',
        'Nuestras discusiones',
        'Tu libreta honesta'
    ];

    for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        star.classList.add('memory-star');
        star.innerHTML = starSVG;
        const text = document.createElement('span');
        text.classList.add('memory-text');
        text.textContent = memories[i];
        star.appendChild(text);
        canvas.appendChild(star);
    }

    const stars = document.querySelectorAll('.memory-star');
    let revealed = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            star.classList.add('revealed');
            revealed++;
            if (revealed === 3) {
                setTimeout(() => {
                    showSection('reveal-5');
                }, 1000);
            }
        }, { once: true });
    });
}

// Interacción 6: Crear un cometa de deseos
function createCometWish() {
    const button = document.getElementById('launch-comet');
    const input = document.getElementById('wish-input');
    const animationContainer = document.getElementById('comet-animation');

    input.disabled = false;
    input.value = '';
    input.focus();
    button.disabled = false;

    input.addEventListener('input', function() {
        input.placeholder = 'Escribe tu deseo aquí...';
        input.style.borderColor = 'var(--accent)';
        input.classList.remove('error');
    });

    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);

    newButton.addEventListener('click', function() {
        if (input.value.trim() === '') {
            input.placeholder = 'Por favor, escribe un deseo...';
            input.style.borderColor = '#ff6b6b';
            input.classList.add('error');
            return;
        }

        newButton.disabled = true;
        input.disabled = true;
        animationContainer.innerHTML = '';

        const comet = document.createElement('div');
        comet.classList.add('comet');
        const tail = document.createElement('div');
        tail.classList.add('comet-tail');
        comet.appendChild(tail);
        animationContainer.appendChild(comet);

        const hint = document.createElement('p');
        hint.textContent = '¡Tu deseo ha sido lanzado al cielo!';
        hint.style.color = 'var(--accent)';
        hint.style.marginTop = '1.5rem';
        animationContainer.appendChild(hint);

        setTimeout(() => {
            showSection('reveal-6');
        }, 3000);
    }, { once: true });
}

// Interacción 7: Pintar el cielo con promesas
function createPaintSky() {
    const canvas = document.getElementById('paint-sky-canvas');
    const interactionBox = document.getElementById('paint-sky-box');
    canvas.innerHTML = '';
    const promises = [
        'Siempre seremos libres, pero nunca distantes.',
        'Tu risa será mi refugio, hoy y siempre.',
        'Nuestro amor brillará, incluso en la tormenta.'
    ];

    const positions = [
        { left: 30, top: 20 },
        { left: 50, top: 50 },
        { left: 70, top: 80 }
    ];

    const points = [];
    for (let i = 0; i < 3; i++) {
        const point = document.createElement('div');
        point.classList.add('promise-point');
        point.innerHTML = starSVG;
        point.style.left = `${positions[i].left}%`;
        point.style.top = `${positions[i].top}%`;
        const text = document.createElement('span');
        text.classList.add('promise-text');
        text.textContent = promises[i];
        point.appendChild(text);
        canvas.appendChild(point);
        points.push(point);
    }

    let currentIndex = 0;
    points[currentIndex].classList.add('active');

    points.forEach((point, index) => {
        point.addEventListener('click', function() {
            point.classList.add('revealed');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const angle = Math.random() * 360;
                const distance = Math.random() * 50 + 20;
                particle.style.left = `${point.offsetLeft + point.offsetWidth / 2}px`;
                particle.style.top = `${point.offsetTop + point.offsetHeight / 2}px`;
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                canvas.appendChild(particle);
            }

            point.classList.remove('active');
            currentIndex++;
            if (currentIndex < points.length) {
                points[currentIndex].classList.add('active');
            }

            if (currentIndex === points.length) {
                interactionBox.classList.add('glowing');
                setTimeout(() => {
                    showSection('reveal-7');
                }, 2000);
            }
        }, { once: true });
    });
}

// Configurar los botones de elección
function setupChoiceButtons() {
    console.log('Setting up choice buttons'); // Debug
    const hopeButton = document.querySelector('.hope-button');
    const closureButton = document.querySelector('.closure-button');
    const finalMessage = document.getElementById('final-message');

    if (!hopeButton || !closureButton) {
        console.error('Choice buttons not found');
        return;
    }

    hopeButton.addEventListener('click', function() {
        console.log('Hope button clicked'); // Debug
        window.location.href = 'https://wa.me/+34633382159?text=Venus%2C%20mi%20luz%2C%20este%20cielo%20me%20recuerda%20cu%C3%A1nto%20te%20amo.%20Quiero%20pintar%20un%20nuevo%20amanecer%20contigo%2C%20con%20risas%20y%20sue%C3%B1os%20libres.%20%C2%BFTe%20animas%20a%20brillar%20juntos%20otra%20vez%3F';
    }, { once: true });

    closureButton.addEventListener('click', function() {
        console.log('Closure button clicked'); // Debug
        finalMessage.textContent = 'Quizás ni con este cielo te he convencido, Venus, pero que sepas que mis brazos siempre estarán abiertos para ti. Vuela alto, estrella, y que el universo te llene de felicidad, espero que nos volvamos a encontrar';
        finalMessage.style.animation = 'fadeIn 2s forwards';
        hopeButton.style.display = 'none';
        closureButton.style.display = 'none';
    }, { once: true });
}

// Control de música y eventos globales
function setupMusicControl() {
    const music = document.getElementById('background-music');
    const control = document.getElementById('music-control');

    music.volume = 0.2;
    control.textContent = '▶️';

    control.addEventListener('click', function() {
        if (music.paused) {
            music.play().catch(e => console.log('No se pudo reproducir la música:', e));
            this.textContent = '🎵';
        } else {
            music.pause();
            this.textContent = '▶️';
        }
    });
}

// Configurar el popup de la primera foto
function setupPhotoPopup() {
    const showPhotoBtn = document.getElementById('show-photo');
    const popup = document.getElementById('photo-popup');
    const closePopup = popup.querySelector('.close-popup');

    showPhotoBtn.addEventListener('click', function() {
        popup.style.display = 'flex';
    }, { once: true });

    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
    }, { once: true });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
}

// Configurar los popups de las notas
function setupNotePopups() {
    const notes = document.querySelectorAll('.memory-note');
    notes.forEach(note => {
        note.addEventListener('click', function() {
            const noteId = this.getAttribute('data-note-id');
            const popup = document.getElementById(`note-popup-${noteId}`);
            popup.style.display = 'flex';
        }, { once: true });

        const popup = document.getElementById(`note-popup-${note.getAttribute('data-note-id')}`);
        const closePopup = popup.querySelector('.close-popup');
        closePopup.addEventListener('click', function() {
            popup.style.display = 'none';
        }, { once: true });

        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Debug
    createStars();
    setupMusicControl();

    const music = document.getElementById('background-music');
    document.getElementById('start-button').addEventListener('click', function() {
        console.log('Start button clicked'); // Debug
        showSection('star-path');
        createStarPath();
        music.play().catch(e => console.log('No se pudo reproducir la música al iniciar:', e));
        document.getElementById('music-control').textContent = '🎵';
    }, { once: true });

    document.getElementById('next-1').addEventListener('click', function() {
        console.log('Next-1 clicked'); // Debug
        showSection('free-star');
        createFreeStar();
    }, { once: true });

    document.getElementById('next-2').addEventListener('click', function() {
        console.log('Next-2 clicked'); // Debug
        showSection('nebula-light');
        createNebulaLight();
    }, { once: true });

    document.getElementById('next-3').addEventListener('click', function() {
        console.log('Next-3 clicked'); // Debug
        showSection('break-chains');
        createBreakChains();
    }, { once: true });

    document.getElementById('next-4').addEventListener('click', function() {
        console.log('Next-4 clicked'); // Debug
        showSection('memory-constellation');
        createMemoryConstellation();
    }, { once: true });

    document.getElementById('next-5').addEventListener('click', function() {
        console.log('Next-5 clicked'); // Debug
        showSection('comet-wish');
        createCometWish();
    }, { once: true });

    document.getElementById('next-6').addEventListener('click', function() {
        console.log('Next-6 clicked'); // Debug
        showSection('paint-sky');
        createPaintSky();
    }, { once: true });

    document.getElementById('next-7').addEventListener('click', function() {
        console.log('Next-7 clicked'); // Debug
        showSection('photo-memory');
        setupPhotoPopup();
    }, { once: true });

    document.getElementById('next-photo').addEventListener('click', function() {
        console.log('Next-photo clicked'); // Debug
        showSection('memory-notes');
        setupNotePopups();
    }, { once: true });

    document.getElementById('next-notes').addEventListener('click', function() {
        console.log('Next-notes clicked'); // Debug
        showSection('final');
    }, { once: true });
});