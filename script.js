// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = `rgba(180, 140, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

// Tab System
function switchTab(n) {
    document.querySelectorAll('.nav-item').forEach((el, i) => {
        el.classList.toggle('active', i === n);
    });

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(['home-page', 'feed-page', 'space-page'][n]).classList.add('active');
}

// Music
let currentAudio = null;
let currentTrackIndex = -1;

const musicTracks = [
    { title: "After Dark", artist: "Mr.Kitty", src: "music/after-dark.mp3" },
    { title: "Skyfall", artist: "Adele", src: "music/skyfall.mp3" },
    { title: "Blinding Lights", artist: "The Weeknd", src: "music/blinding-lights.mp3" },
    { title: "Sweater Weather", artist: "The Neighbourhood", src: "music/sweater-weather.mp3" }
];

function renderMusicList() {
    const container = document.getElementById('musicList');
    container.innerHTML = '';
    musicTracks.forEach((track, i) => {
        const active = i === currentTrackIndex ? 'active' : '';
        const div = document.createElement('div');
        div.className = `music-track ${active}`;
        div.innerHTML = `
            <div class="track-info">
                <div class="track-title">${track.title}</div>
                <div style="opacity:0.7; font-size:0.9rem;">${track.artist}</div>
            </div>
            <button class="play-btn" onclick="playTrack(${i}); event.stopImmediatePropagation()">
                ${active ? '❚❚' : '▶'}
            </button>
        `;
        container.appendChild(div);
    });
}

function playTrack(i) {
    if (currentTrackIndex === i && currentAudio) {
        currentAudio.pause();
        currentTrackIndex = -1;
        renderMusicList();
        return;
    }
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(musicTracks[i].src);
    currentAudio.play().then(() => {
        currentTrackIndex = i;
        renderMusicList();
    }).catch(() => alert("მუსიკა ვერ ჩაიტვირთა"));
}

function toggleMusicPanel() {
    const panel = document.getElementById('musicPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    if (panel.style.display === 'block') renderMusicList();
}

// Other Functions
let currentMood = "calm";

function publishPost() {
    const text = document.getElementById('postText').value.trim();
    if (!text) return;
    alert("პოსტი გამოქვეყნებულია! 💜");
    document.getElementById('postText').value = '';
}

function setMood(el) {
    document.querySelectorAll('.mood-option').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
    currentMood = el.dataset.mood;
}

function enterApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    switchTab(0);
}

// Init
window.onload = () => {
    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
};
