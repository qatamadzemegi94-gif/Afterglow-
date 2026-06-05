let posts = JSON.parse(localStorage.getItem('afterglow_posts')) || [];
let currentTab = 0;

// ===================== NAVIGATION =====================
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${['home','feed','myspace'][tab]}`).classList.remove('hidden');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.getElementById(`nav-${['home','feed','myspace'][tab]}`).classList.add('active');
}

// ===================== MUSIC PLAYER =====================
let currentTrackIndex = 0;
let isPlaying = false;

const playlist = [
    { title: "Lo-Fi Chill", artist: "Afterglow", videoId: "YywWuTPoGqc" },
    { title: "Night Drive", artist: "Dreamwave", videoId: "0cHtUNmdq_c" }
];

function toggleMusicPanel() {
    document.getElementById('music-panel').classList.toggle('translate-x-full');
}

function renderPlaylist() {
    const container = document.getElementById('playlist');
    container.innerHTML = '';
    playlist.forEach((track, i) => {
        const div = document.createElement('div');
        div.className = `p-4 rounded-2xl cursor-pointer transition-all ${i === currentTrackIndex ? 'bg-purple-600/30' : 'hover:bg-white/5'}`;
        div.innerHTML = `<div class="flex items-center gap-4"><div class="text-2xl">▶</div><div><p class="font-medium">${track.title}</p><p class="text-sm text-slate-400">${track.artist}</p></div></div>`;
        div.onclick = () => playTrack(i);
        container.appendChild(div);
    });
}

function playTrack(index) {
    currentTrackIndex = index;
    const track = playlist[index];
    document.getElementById('current-title').textContent = track.title;
    document.getElementById('current-artist').textContent = track.artist;

    const container = document.getElementById('now-playing');
    container.innerHTML = `
        <iframe width="100%" height="280" src="https://www.youtube.com/embed/${track.videoId}?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>
        <p class="font-semibold text-lg mt-4">${track.title}</p>
        <p class="text-slate-400">${track.artist}</p>
    `;
    isPlaying = true;
    document.getElementById('play-btn').innerHTML = `<i class="fas fa-pause"></i>`;
}

function togglePlay() { isPlaying = !isPlaying; document.getElementById('play-btn').innerHTML = isPlaying ? `<i class="fas fa-pause"></i>` : `<i class="fas fa-play"></i>`; }
function nextTrack() { currentTrackIndex = (currentTrackIndex + 1) % playlist.length; playTrack(currentTrackIndex); }
function prevTrack() { currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; playTrack(currentTrackIndex); }

// ===================== POST FUNCTIONS =====================
function publishPost() {
    const input = document.getElementById('post-input');
    if (!input.value.trim()) return;

    const newPost = {
        id: Date.now(),
        content: input.value.trim(),
        likes: 0,
        likedBy: [],
        comments: [],
        timestamp: Date.now()
    };

    posts.unshift(newPost);
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    input.value = '';
    renderFeed();
}

function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    const index = post.likedBy.indexOf('user');
    if (index > -1) {
        post.likedBy.splice(index, 1);
        post.likes--;
    } else {
        post.likedBy.push('user');
        post.likes++;
    }
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    renderFeed();
}

function addComment(id) {
    const text = prompt("დაწერე კომენტარი:");
    if (!text) return;
    const post = posts.find(p => p.id === id);
    if (post) {
        post.comments.push({id: Date.now(), text});
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
    }
}

function deletePost(id) {
    if (confirm("წაიშალოს პოსტი?")) {
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
    }
}

function renderFeed() {
    const container = document.getElementById('feed');
    container.innerHTML = '';
    posts.forEach(post => {
        const isLiked = post.likedBy.includes('user');
        const div = document.createElement('div');
        div.className = `card glass rounded-3xl p-8`;
        div.innerHTML = `
            <div class="flex justify-between text-sm text-slate-400 mb-4">
                <span>ანონიმური</span>
                <span>${timeAgo(post.timestamp)}</span>
            </div>
            <p class="text-lg leading-relaxed mb-6">${post.content}</p>
            <div class="flex items-center justify-between">
                <div class="flex gap-6">
                    <button onclick="toggleLike(${post.id})" class="flex items-center gap-2 text-2xl ${isLiked ? 'text-pink-500' : ''}">❤️ <span>${post.likes}</span></button>
                    <button onclick="addComment(${post.id})" class="flex items-center gap-2 text-2xl">💬 <span>${post.comments.length}</span></button>
                </div>
                <button onclick="deletePost(${post.id})" class="text-red-400 hover:text-red-500"><i class="fas fa-trash"></i></button>
            </div>
        `;
        container.appendChild(div);
    });
}

function timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return "ახლახანს";
    if (diff < 3600) return Math.floor(diff/60) + " წუთის წინ";
    if (diff < 86400) return Math.floor(diff/3600) + " საათის წინ";
    return Math.floor(diff/86400) + " დღის წინ";
}

// Initialize
window.onload = () => {
    switchTab(0); // Home
    renderFeed();
    renderPlaylist();
};
