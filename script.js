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

// ==================== TAB NAVIGATION ====================
function switchTab(tab) {
    document.querySelectorAll('.nav-item').forEach((item, i) => {
        item.classList.toggle('active', i === tab);
    });

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    if (tab === 0) document.getElementById('home-page').classList.add('active');
    if (tab === 1) document.getElementById('feed-page').classList.add('active');
    if (tab === 2) document.getElementById('space-page').classList.add('active');
}

// ==================== MUSIC ====================
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

    musicTracks.forEach((track, index) => {
        const isActive = index === currentTrackIndex;
        const div = document.createElement('div');
        div.className = `music-track ${isActive ? 'active' : ''}`;
        div.innerHTML = `
            <div class="track-info">
                <div class="track-title">${track.title}</div>
                <div style="font-size:0.85rem; opacity:0.7;">${track.artist}</div>
            </div>
            <div class="play-btn" onclick="playTrack(${index}); event.stopImmediatePropagation()">
                ${isActive ? '❚❚' : '▶'}
            </div>
        `;
        container.appendChild(div);
    });
}

function playTrack(index) {
    const track = musicTracks[index];
    if (currentTrackIndex === index && currentAudio) {
        currentAudio.pause();
        currentTrackIndex = -1;
        renderMusicList();
        return;
    }
    if (currentAudio) currentAudio.pause();

    currentAudio = new Audio(track.src);
    currentAudio.volume = 0.8;
    currentAudio.play().then(() => {
        currentTrackIndex = index;
        renderMusicList();
    }).catch(() => alert(`შეცდომა: ${track.title}`));
}

function toggleMusicPanel() {
    const panel = document.getElementById('musicPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    if (panel.style.display === 'block') renderMusicList();
}

// ==================== OTHER FUNCTIONS ====================
let currentMood = "calm";
let posts = [];

function publishPost() {
    const text = document.getElementById('postText').value.trim();
    if (!text) return;

    const newPost = {
        id: Date.now(),
        name: "Anonymous " + ["Moon","Star","Cloud","Echo"][Math.floor(Math.random()*4)],
        text: text,
        likes: 0,
        hugs: 0,
        mood: currentMood
    };

    posts.unshift(newPost);
    renderFeed();

    const thank = document.createElement('div');
    thank.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(139,92,246,0.95);color:white;padding:30px 50px;border-radius:30px;z-index:1000;box-shadow:0 0 60px #ff8ab5;`;
    thank.textContent = 'Thank you for sharing 💜';
    document.body.appendChild(thank);
    setTimeout(() => thank.remove(), 2200);

    document.getElementById('postText').value = '';
}

function renderFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-card';
        div.innerHTML = `<div class="post-text">${post.text}</div>`;
        feed.appendChild(div);
    });
}

function setMood(el) {
    document.querySelectorAll('.mood-option').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
    currentMood = el.dataset.mood;
}

function enterApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    switchTab(0); // Home-ზე გადავიდეს
}

// Initialize
window.onload = () => {
    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
};
