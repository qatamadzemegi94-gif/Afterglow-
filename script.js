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
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(['home-page','feed-page','space-page'][n]).classList.add('active');
}

// Enter App (მთავარი ფუნქცია)
function enterApp() {
    const landing = document.getElementById('landing');
    const app = document.getElementById('app');

    landing.style.transition = 'opacity 0.8s ease';
    landing.style.opacity = '0';

    setTimeout(() => {
        landing.style.display = 'none';
        app.style.display = 'block';
        switchTab(0); // Home-ზე გადავიდეს
    }, 700);
}

// Simple Post
function publishPost() {
    const text = document.getElementById('postText').value.trim();
    if (!text) return;
    alert('პოსტი წარმატებით გამოქვეყნდა 💜');
    document.getElementById('postText').value = '';
}

// Music Panel
function toggleMusicPanel() {
    alert("🎵 მუსიკის პანელი მალე გააქტიურდება!");
}

// Initialize
window.onload = () => {
    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
};
