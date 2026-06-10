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
    update() { this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = `rgba(180, 140, 255, ${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function initParticles() { particles = []; for (let i = 0; i < 120; i++) particles.push(new Particle()); }
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

// Tab System
function switchTab(n) {
    document.querySelectorAll('.nav-item').forEach((el, i) => el.classList.toggle('active', i === n));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(['home-page','feed-page','space-page'][n]).classList.add('active');
}

// Motivational Slider
const motivationalTexts = [
    "შენს გრძნობებს მნიშვნელობა აქვს.",
    "დღეს შეიძლება რთული დღეა, მაგრამ შენ მაინც აქ ხარ.",
    "პატარა ნაბიჯებიც წინსვლაა.",
    "არ არის აუცილებელი ყოველთვის ძლიერი იყო.",
    "ყველაფერი დროებითია, ცუდი მომენტებიც."
];

let currentQuote = 0;
function rotateMotivational() {
    const el = document.getElementById('motivationalText');
    setInterval(() => {
        currentQuote = (currentQuote + 1) % motivationalTexts.length;
        el.style.opacity = 0;
        setTimeout(() => {
            el.textContent = motivationalTexts[currentQuote];
            el.style.opacity = 1;
        }, 600);
    }, 8000);
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
                <div style="font-size:0.85rem; opacity:0.7;">${track.artist}</div>
            </div>
            <button class="play-btn" onclick="playTrack(${i}); event.stopImmediatePropagation()">${active ? '❚❚' : '▶'}</button>
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

// Emoji Picker
function toggleEmojiPicker() {
    const picker = document.getElementById('emojiPicker');
    picker.style.display = picker.style.display === 'flex' ? 'none' : 'flex';
}

function addEmojiToPost(el) {
    const textarea = document.getElementById('postText');
    textarea.value += el.textContent;
    toggleEmojiPicker();
}

// Post System
let posts = [];
let currentUserPosts = [];

function publishPost() {
    const text = document.getElementById('postText').value.trim();
    if (!text) return;

    const newPost = {
        id: Date.now(),
        name: "Anonymous " + ["Moon","Star","Cloud","Echo","Nebula"][Math.floor(Math.random()*5)],
        text: text,
        likes: 0,
        reactions: { like:0, funny:0, sad:0, wow:0 },
        comments: [],
        mood: "neutral"
    };

    posts.unshift(newPost);
    currentUserPosts.unshift(newPost);
    renderFeed();
    renderMySpace();

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
    posts.forEach(post => createPostElement(post, feed));
}

function renderMySpace() {
    const container = document.getElementById('my-posts');
    container.innerHTML = '';
    currentUserPosts.forEach(post => createPostElement(post, container));
}

function createPostElement(post, container) {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
        <div class="post-header"><span class="anon-name">${post.name}</span></div>
        <div class="post-text">${post.text}</div>
        <div class="post-actions">
            <button onclick="addReaction(${post.id}, 'like')">❤️ ${post.reactions.like}</button>
            <button onclick="addReaction(${post.id}, 'funny')">😂 ${post.reactions.funny}</button>
            <button onclick="addReaction(${post.id}, 'sad')">😢 ${post.reactions.sad}</button>
            <button onclick="addReaction(${post.id}, 'wow')">😮 ${post.reactions.wow}</button>
        </div>
    `;
    container.appendChild(div);
}

function addReaction(id, type) {
    const post = posts.find(p => p.id === id);
    if (post) post.reactions[type]++;
    renderFeed();
    renderMySpace();
}

function setMood(el) {
    document.querySelectorAll('.mood-option').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

function enterApp() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    switchTab(0);
}

// Initialize
window.onload = () => {
    resizeCanvas();
    initParticles();
    animateParticles();
    rotateMotivational();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
};
