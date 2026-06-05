let posts = JSON.parse(localStorage.getItem('afterglow_posts')) || [];
let currentUserLikes = JSON.parse(localStorage.getItem('afterglow_likes')) || [];
let currentUserComments = JSON.parse(localStorage.getItem('afterglow_comments')) || [];

const quotes = [
    "ყოველი დღე ახალი დასაწყისია ✨",
    "შენი ისტორია მნიშვნელოვანია 💜",
    "შენ იმაზე ძლიერი ხარ, ვიდრე გგონია 🌙",
    "დღესაც შეგიძლია გაიღიმო ⭐"
];

function init() {
    renderFeed();
    renderMySpace();
}

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
    renderMySpace();
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
    renderMySpace();
}

function addComment(id) {
    const text = prompt("დაწერე მხარდამჭერი კომენტარი:");
    if (!text) return;

    const post = posts.find(p => p.id === id);
    if (post) {
        post.comments.push({
            id: Date.now(),
            text: text,
            timestamp: Date.now()
        });
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
    }
}

function deletePost(id) {
    if (confirm("ნამდვილად გსურთ პოსტის წაშლა?")) {
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
        renderMySpace();
    }
}

function deleteComment(postId, commentId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments = post.comments.filter(c => c.id !== commentId);
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
                    <button onclick="toggleLike(${post.id})" class="flex items-center gap-2 text-xl transition-all ${isLiked ? 'heart-liked' : ''}">
                        ❤️ <span>${post.likes}</span>
                    </button>
                    <button onclick="addComment(${post.id})" class="flex items-center gap-2 text-xl">
                        💬 <span>${post.comments.length}</span>
                    </button>
                </div>
                <button onclick="deletePost(${post.id})" class="text-red-400 hover:text-red-500">
                    <i class="fas fa-trash"></i>
                </button>
            </div>

            <div class="mt-6 border-t border-purple-500/20 pt-4">
                ${post.comments.map(c => `
                    <div class="text-sm bg-[#1a1433] p-3 rounded-2xl mb-2 flex justify-between">
                        <span>${c.text}</span>
                        <button onclick="deleteComment(${post.id}, ${c.id})" class="text-red-400 text-xs">×</button>
                    </div>
                `).join('')}
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

function renderMySpace() {
    // შეგიძლია გააფართოვო მოგვიანებით
    document.getElementById('my-posts').innerHTML = posts.length ? posts.map(p => `<div class="text-sm">${p.content.substring(0,80)}...</div>`).join('') : '<p class="text-slate-400">ჯერ არ გაქვს პოსტები</p>';
}

function showTab(tab) {
    document.getElementById('feed-tab').classList.toggle('hidden', tab !== 'feed');
    document.getElementById('myspace-tab').classList.toggle('hidden', tab !== 'myspace');
}

// Music Panel
let isPlaying = false;
let currentTrack = 0;

const playlist = [
    { title: "Lo-Fi Chill", artist: "Afterglow", url: "#" },
    { title: "Night Drive", artist: "Dreamwave", url: "#" },
    // აქ ჩაწერე შენი სიმღერების ლინკები
];

function toggleMusicPanel() {
    const panel = document.getElementById('music-panel');
    panel.classList.toggle('translate-x-full');
}

function renderPlaylist() {
    const container = document.getElementById('playlist');
    container.innerHTML = playlist.map((song, i) => `
        <div onclick="playTrack(${i})" class="flex justify-between p-3 hover:bg-white/10 rounded-xl cursor-pointer">
            <div>
                <p class="font-medium">${song.title}</p>
                <p class="text-xs text-slate-400">${song.artist}</p>
            </div>
        </div>
    `).join('');
}

function playTrack(i) {
    currentTrack = i;
    document.getElementById('song-title').textContent = playlist[i].title;
    // აქ შეგიძლია დაუკავშირო რეალური audio
}

function togglePlay() {
    isPlaying = !isPlaying;
    document.getElementById('play-btn').innerHTML = isPlaying ? `<i class="fas fa-pause"></i>` : `<i class="fas fa-play"></i>`;
}

function nextTrack() { 
    currentTrack = (currentTrack + 1) % playlist.length; 
    playTrack(currentTrack); 
}

function prevTrack() { 
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length; 
    playTrack(currentTrack); 
}

// Initialize
window.onload = () => {
    init();
    renderPlaylist();
};
