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
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// App Logic
let currentMood = "calm";
let posts = [];

function createSamplePosts() {
    posts = [
        { id: 1, name: "Anonymous Star", text: "დღეს ძალიან მძიმე დღე მქონდა...", likes: 14, hugs: 8, mood: "sad" },
        { id: 2, name: "Anonymous Cloud", text: "ვფიქრობ ყველაფერი გამოვა. დროა საჭირო.", likes: 23, hugs: 19, mood: "hopeful" }
    ];
    renderFeed();
}

function renderFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post-card fade-in';
        postEl.innerHTML = `
            <div class="post-header">
                <span class="anon-name">${post.name}</span>
                <span style="margin-left: auto; opacity: 0.6;">${post.mood}</span>
            </div>
            <div class="post-text">${post.text}</div>
            <div class="post-actions">
                <button class="action-btn" onclick="likePost(${post.id})">❤️ <span>${post.likes}</span></button>
                <button class="action-btn" onclick="commentPost(${post.id})">💬</button>
                <button class="action-btn" onclick="hugPost(${post.id})">🫂 <span>${post.hugs}</span></button>
            </div>
        `;
        feed.appendChild(postEl);
    });
}

function publishPost() {
    const text = document.getElementById('postText').value.trim();
    if (!text) return;

    const newPost = {
        id: Date.now(),
        name: "Anonymous " + ["Moon", "Nebula", "Echo", "Phoenix"][Math.floor(Math.random()*4)],
        text: text,
        likes: 0,
        hugs: 0,
        mood: currentMood
    };

    posts.unshift(newPost);
    renderFeed();

    // Thank you message
    const thank = document.createElement('div');
    thank.style.cssText = `position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(139,92,246,0.95); color:white; padding:25px 40px; border-radius:30px; z-index:1000; box-shadow:0 0 60px #ff8ab5;`;
    thank.textContent = 'Thank you for sharing 💜';
    document.body.appendChild(thank);

    setTimeout(() => thank.remove(), 2500);

    document.getElementById('postText').value = '';
}

function likePost(id) {
    const post = posts.find(p => p.id === id);
    if (post) post.likes++;
    renderFeed();
}

function hugPost(id) {
    const post = posts.find(p => p.id === id);
    if (post) post.hugs++;
    renderFeed();
}

function commentPost(id) {
    const comment = prompt("დაწერე შენი მხარდაჭერა (ანონიმურად):");
    if (comment) alert("კომენტარი გაგზავნილია 💜");
}

function setMood(el) {
    document.querySelectorAll('.mood-option').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
    currentMood = el.dataset.mood;
}

function enterApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    createSamplePosts();
}

// Music
let isPlaying = false;
const audio = document.getElementById('audioPlayer');

function toggleMusic() {
    const player = document.getElementById('musicPlayer');
    player.style.display = player.style.display === 'none' ? 'block' : 'none';
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playBtn').textContent = '▶';
    } else {
        audio.play();
        document.getElementById('playBtn').textContent = '❚❚';
    }
    isPlaying = !isPlaying;
}

// Quotes
const quotes = [
    "You survived every hard day so far.",
    "It’s okay not to be okay.",
    "You are enough, exactly as you are.",
    "The stars are still shining for you."
];

function rotateQuote() {
    const quoteEl = document.getElementById('dailyQuote');
    let index = 0;
    setInterval(() => {
        index = (index + 1) % quotes.length;
        quoteEl.style.opacity = 0;
        setTimeout(() => {
            quoteEl.textContent = `"${quotes[index]}"`;
            quoteEl.style.opacity = 1;
        }, 600);
    }, 12000);
}

// Tab Switch
function switchTab(n) {
    document.querySelectorAll('.nav-item').forEach((el, i) => {
        el.classList.toggle('active', i === n);
    });
}

// Initialize
window.onload = () => {
    resizeCanvas();
    initParticles();
    animateParticles();
    rotateQuote();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
};
