/* =========================================
   CONFIGURACIÓN DE IMÁGENES Y MENSAJES
   ========================================= */
const tusFotos = [
    'images/amor.jpg', 'images/2.jpg', 'images/3.jpg', 
    'images/4.jpg', 'images/5.jpg', 'images/6.jpg', 'images/7.jpg'
];

const fotosFinales = [
    'images/1.jpg', 'images/12.jpg', 'images/32.jpg', 
    'images/432 (2).jpg', 'images/432.jpg', 'images/a.jpg', 'images/amor.jpg', 'images/bv.jpg', 'images/c.jpg', 'images/d.jpeg', 'images/e.jpg',
    'images/f.jpg', 'images/fds.jpg', 'images/fsd.jpg', 'images/g.jpg', 'images/gsd.jpg', 'images/h.jpg', 'images/hgf.jpg', 'images/hgj.jpg', 'images/j.jpg',
    'images/k.jpg', 'images/kjh.jpg', 'images/q.jpg', 'images/s.jpg', 'images/t.jpg', 'images/w.jpg'
];

const misMensajes = [
    "Hola bebé, espero que éste regalo te guste.",
    "Cada momento a tu lado es un regalo del cielo, una bendición.",
    "Tu sonrisa ilumina mis días más oscuros, hasta cambio mi humor si estás conmigo.",
    "Gracias por ser mi compañera, gracias por siempre acompañarme.",
    "En tus ojos veo mi presente y mi futuro.",
    "Sos la luz que guía mis pasos, como en Enredados.",
    "Te voy amar por siempre, y un día más."
];

let currentPhotoIndex = 0;
let photosReference = []; 

document.addEventListener('DOMContentLoaded', () => {
    createStars();
});

function createStars() {
    const sky = document.getElementById('night-sky');
    const count = window.innerWidth < 768 ? 60 : 150;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        sky.appendChild(star);
    }
}

function startMagic() {
    const main = document.getElementById('main-lantern');
    const music = document.getElementById('background-music');
    if (music) {
        music.play().catch(e => console.log("Interacción requerida"));
    }
    main.style.transform = "translate(-50%, -450%) scale(0.1)";
    main.style.opacity = "0";
    setTimeout(startInfiniteLanterns, 500);
    setTimeout(createHeart, 1500);
}

function createHeart() {
    const container = document.getElementById('heart-container');
    const totalPoints = 60; 
    const photosCopy = [...tusFotos]; 
    const isMobile = window.innerWidth < 768;
    const baseScale = isMobile ? (window.innerWidth / 38) : 22;
    const safeIndices = [2, 8, 15, 22, 38, 45, 52, 58]; 
    photosReference = []; 

    for (let i = 0; i < totalPoints; i++) {
        const t = (i / totalPoints) * (2 * Math.PI);
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        const lantern = document.createElement('div');
        lantern.className = 'heart-lantern';
        const posX = (window.innerWidth / 2) + (x * baseScale);
        const posY = (window.innerHeight / 2) + (y * baseScale);
        if (safeIndices.includes(i) && photosCopy.length > 0) {
            const fotoUrl = photosCopy.shift();
            lantern.classList.add('with-photo');
            lantern.style.backgroundImage = `url('${fotoUrl}')`;
            photosReference.push(lantern); 
        }
        lantern.style.left = (window.innerWidth / 2) + 'px';
        lantern.style.top = (window.innerHeight / 2) + 'px';
        setTimeout(() => {
            lantern.style.left = posX + 'px';
            lantern.style.top = posY + 'px';
            lantern.style.opacity = '1';
        }, i * 50);
        container.appendChild(lantern);
    }
    setTimeout(() => {
        document.getElementById('final-message').classList.add('show');
        setTimeout(showNextModal, 3000);
    }, 5500);
}

function showNextModal() {
    if (currentPhotoIndex < photosReference.length) {
        const photo = photosReference[currentPhotoIndex];
        const modal = document.getElementById('message-modal');
        const modalContent = document.querySelector('.modal-content');
        const modalText = document.getElementById('modal-text');
        const randomRot = Math.random() * 6 - 3;
        modalContent.style.transform = `rotate(${randomRot}deg)`;
        photo.classList.add('photo-active');
        modalText.innerText = misMensajes[currentPhotoIndex] || "¡Te amo!";
        modal.classList.add('modal-show');
    }
}

function closeModal() {
    const modal = document.getElementById('message-modal');
    const photo = photosReference[currentPhotoIndex];
    modal.classList.remove('modal-show');
    photo.classList.remove('photo-active');
    currentPhotoIndex++;
    if (currentPhotoIndex < photosReference.length) {
        setTimeout(showNextModal, 1200); // Pausa un poco más larga entre mensajes
    } else {
        setTimeout(() => {
            createOrderedHeartCollage();
            createHeartRain(); 
        }, 1000);
    }
}

function createOrderedHeartCollage() {
    const container = document.getElementById('heart-container');
    container.innerHTML = ''; 
    const isMobile = window.innerWidth < 768;
    const totalPhotos = isMobile ? 55 : 120; 
    const photoSize = isMobile ? 32 : 65; 
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const scale = isMobile ? (window.innerWidth / 42) : (window.innerWidth / 55);                
    for (let i = 0; i < totalPhotos; i++) {
        const t = (i / totalPhotos) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const photoDiv = document.createElement('div');
        photoDiv.className = 'final-collage-photo';
        const randomFoto = fotosFinales[Math.floor(Math.random() * fotosFinales.length)];
        photoDiv.style.backgroundImage = `url('${randomFoto}')`;
        photoDiv.style.width = photoSize + 'px';
        photoDiv.style.height = photoSize + 'px';
        photoDiv.style.cursor = 'pointer';
        photoDiv.onclick = () => openPhoto(randomFoto);
        photoDiv.style.left = (centerX + x * scale) + 'px';
        photoDiv.style.top = (centerY + y * scale) + 'px';
        container.appendChild(photoDiv);
        setTimeout(() => {
            photoDiv.style.opacity = '1';
            photoDiv.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg) scale(1)`;
        }, i * 20);
    }
    setTimeout(() => {
        document.getElementById('thank-you-message').classList.add('show');
    }, 2500);
}

function openPhoto(url) {
    const viewer = document.getElementById('photo-viewer');
    const bigPhoto = document.getElementById('big-photo');
    bigPhoto.src = url;
    viewer.style.display = 'flex';
}

function closePhoto() {
    document.getElementById('photo-viewer').style.display = 'none';
}

function createHeartRain() {
    const sky = document.getElementById('night-sky');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        sky.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 400);
}

function startInfiniteLanterns() {
    const sky = document.getElementById('night-sky');
    setInterval(() => {
        const lantern = document.createElement('div');
        lantern.className = 'flying-lantern';
        lantern.style.left = `${Math.random() * 100}vw`;
        const size = 10 + Math.random() * 10;
        lantern.style.width = `${size}px`;
        lantern.style.height = `${size * 1.6}px`;
        const duration = 12 + Math.random() * 8;
        lantern.style.animationDuration = `${duration}s`;
        sky.appendChild(lantern);
        setTimeout(() => { lantern.remove(); }, duration * 1000);
    }, 800);
}