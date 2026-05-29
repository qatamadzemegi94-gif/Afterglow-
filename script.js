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

// App Variables
let currentMood = "calm";
let posts = [];
let currentAudio = null;
let currentTrackIndex = -1;

// Music Tracks
const musicTracks = [
    { title: "Midnight Bloom", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://picsum.photos/id/1015/200/200" },
    { title: "Soft Rain", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://picsum.photos/id/102/200/200" },
    { title: "Starry Night", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "https://picsum.photos/id/133/200/200" },
    { title: "Gentle Dreams", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover: "https://picsum.photos/id/201/200/200" }
];

// Render Music List
function renderMusicList() {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

    musicTracks.forEach((track, index) => {
        const isActive = index === currentTrackIndex;
        const div = document.createElement('div');
        div.className = `music-track ${isActive ? 'active' : ''}`;
        div.innerHTML = `
            <img src="${track.cover}" alt="${track.title}">
            <div class="track-info">
                <div class="track-title">${track.title}</div>
            </div>
            <div class="play-btn" onclick="playTrack(${index}); event.stopImmediatePropagation()">
                ${isActive ? '❚❚' : '▶'}
            </div>
            ${isActive ? `<div class="equalizer"><span></span><span></span><span></span><span></span></div>` : ''}
        `;
        container.appendChild(div);
    });
}

// Play Track
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
    currentAudio.volume = 0.75;

    currentAudio.play().then(() => {
        currentTrackIndex = index;
        renderMusicList();
    }).catch(err => {
        console.error("Music Error:", err);
        alert("მუსიკის დაკვრა ვერ მოხერხდა. სცადე თავიდან.");
    });

    currentAudio.onended = () => {
        currentTrackIndex = -1;
        renderMusicList();
    };
}

function toggleMusicPanel() {
    const panel = document.getElementById('musicPanel');
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
        renderMusicList();
    }
}

// Other Functions
function publishPost() {
    const text = document.getElementById('postText').value.trim();
    if (!text) return;

    const newPost = {
        id: Date.now(),
        name: "Anonymous " + ["Moon", "Star", "Cloud", "Echo"][Math.floor(Math.random()*4)],
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
    setTimeout(() => thank.remove(), 2500);

    document.getElementById('postText').value = '';
}

function renderFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post-card';
        postEl.innerHTML = `
            <div class="post-header"><span class="anon-name">${post.name}</span></div>
            <div class="post-text">${post.text}</div>
            <div class="post-actions">
                <button class="action-btn" onclick="likePost(${post.id})">❤️ ${post.likes}</button>
                <button class="action-btn" onclick="commentPost(${post.id})">💬</button>
                <button class="action-btn" onclick="hugPost(${post.id})">🫂 ${post.hugs}</button>
            </div>
        `;
        feed.appendChild(postEl);
    });
}

function likePost(id) { const p = posts.find(x => x.id === id); if(p) p.likes++; renderFeed(); }
function hugPost(id) { const p = posts.find(x => x.id === id); if(p) p.hugs++; renderFeed(); }
function commentPost(id) { prompt("დაწერე მხარდაჭერა:"); }

function setMood(el) {
    document.querySelectorAll('.mood-option').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
    currentMood = el.dataset.mood;
}

function createSamplePosts() {
    posts = [
        { id: 1, name: "Anonymous Star", text: "დღეს ძალიან მძიმე დღე მქონდა...", likes: 14, hugs: 8, mood: "sad" },
        { id: 2, name: "Anonymous Cloud", text: "ვფიქრობ ყველაფერი გამოვა...", likes: 23, hugs: 19, mood: "hopeful" }
    ];
    renderFeed();
}

function enterApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    createSamplePosts();
}

// Initialize
window.onload = () => {
    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
};
