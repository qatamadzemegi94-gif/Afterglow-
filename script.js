// Particles (იგივე)
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
        this.x += this.speedX; this.y += this.speedY;
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

// ==================== MUSIC SECTION ====================
let currentAudio = null;
let currentTrackIndex = -1;

// შენი სიმღერები (ჩააგდე mp3 ფაილები "music" საქაღალდეში)
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
    }).catch(err => {
        console.error("Audio Error:", err);
        alert(`ვერ ჩაიტვირთა: ${track.title}\nშეამოწმე რომ mp3 ფაილი არსებობს "music" საქაღალდეში`);
    });

    currentAudio.onended = () => {
        currentTrackIndex = -1;
        renderMusicList();
    };
}

function toggleMusicPanel() {
    const panel = document.getElementById('musicPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    if (panel.style.display === 'block') renderMusicList();
}

// ==================== დანარჩენი აპლიკაცია ====================
let currentMood = "calm";
let posts = [];

function publishPost() { /* იგივე კოდი წინა ვერსიიდან */ 
    const text = document.getElementById('postText').value.trim();
    if (!text) return;
    const newPost = { id: Date.now(), name: "Anonymous " + ["Moon","Star","Cloud","Echo"][Math.floor(Math.random()*4)], text, likes:0, hugs:0, liked:false, hugged:false, comments:[], mood:currentMood };
    posts.unshift(newPost);
    renderFeed();
    // thank you message...
    document.getElementById('postText').value = '';
}

function renderFeed() { /* იგივე კოდი წინა ვერსიიდან */ 
    // ... (შეგიძლია წინა ვერსიიდან აიღო)
}

function likePost(id) { /* ... */ }
function hugPost(id) { /* ... */ }
function toggleCommentInput(id) { /* ... */ }
function addComment(postId) { /* ... */ }
function setMood(el) { /* ... */ }

function createSamplePosts() {
    posts = [{ id: 1, name: "Anonymous Star", text: "დღეს ძალიან მძიმე დღე მქონდა...", likes: 14, hugs: 15, liked: false, hugged: false, comments: [], mood: "sad" }];
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
