let posts = JSON.parse(localStorage.getItem('afterglow_posts')) || [];

// ===================== NAVIGATION =====================
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tab}`).classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach((link, i) => {
        link.classList.toggle('active', i === tab);
    });

    if (tab === 1) renderFeed();
    if (tab === 2) renderMySpace();
}

// ===================== POST FUNCTIONS =====================
function publishPost() {
    const input = document.getElementById('post-input');
    if (!input.value.trim()) return alert("დაწერე რამე...");

    const newPost = {
        id: Date.now(),
        content: input.value.trim(),
        likes: 0,
        likedBy: [],
        comments: [],
        reactions: {},
        timestamp: Date.now()
    };

    posts.unshift(newPost);
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    input.value = '';

    alert("✅ პოსტი გამოქვეყნებულია!");
    renderFeed();
    renderMySpace();
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    const newText = prompt("რედაქტირება:", post.content);
    if (newText !== null && newText.trim() !== "") {
        post.content = newText.trim();
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
        renderMySpace();
    }
}

function deletePost(id) {
    if (!confirm("ნამდვილად გსურთ პოსტის წაშლა?")) return;
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    renderFeed();
    renderMySpace();
}

// ===================== REACTIONS =====================
const reactionEmojis = ["❤️","💜","💙","🖤","💛","💚","😂","😭","😍","🤗","😎","🤔","🔥","⭐","🌙","✨","🌸","👏","🙏","💪","🚀","🎵"];

function addReaction(postId, emoji) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    if (!post.reactions) post.reactions = {};
    post.reactions[emoji] = (post.reactions[emoji] || 0) + 1;
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    renderFeed();
    renderMySpace();
}

// ===================== COMMENTS =====================
function addComment(id) {
    const text = prompt("დაწერე კომენტარი:");
    if (!text) return;
    const post = posts.find(p => p.id === id);
    if (post) {
        post.comments.push({ id: Date.now(), text: text });
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
        renderMySpace();
    }
}

function editComment(postId, commentId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const comment = post.comments.find(c => c.id === commentId);
    if (!comment) return;

    const newText = prompt("რედაქტირება:", comment.text);
    if (newText !== null && newText.trim() !== "") {
        comment.text = newText.trim();
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
        renderMySpace();
    }
}

function deleteComment(postId, commentId) {
    if (!confirm("წაიშალოს კომენტარი?")) return;
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments = post.comments.filter(c => c.id !== commentId);
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
        renderMySpace();
    }
}

// ===================== LIKE =====================
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    if (!post.likedBy) post.likedBy = [];
    const index = post.likedBy.indexOf("user");
    if (index > -1) {
        post.likedBy.splice(index, 1);
        post.likes = (post.likes || 0) - 1;
    } else {
        post.likedBy.push("user");
        post.likes = (post.likes || 0) + 1;
    }
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    renderFeed();
    renderMySpace();
}

// ===================== RENDER =====================
function timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return "ახლახანს";
    if (diff < 3600) return Math.floor(diff/60) + " წუთის წინ";
    if (diff < 86400) return Math.floor(diff/3600) + " საათის წინ";
    return Math.floor(diff/86400) + " დღის წინ";
}

function renderFeed() {
    const container = document.getElementById('feed');
    container.innerHTML = '';

    posts.forEach(post => {
        let reactionsHTML = '';
        if (post.reactions) {
            reactionsHTML = Object.entries(post.reactions).map(([emoji, count]) => `
                <button onclick="addReaction(${post.id}, '${emoji}')" class="reaction-btn text-xl mx-1">${emoji}<span class="text-xs">${count}</span></button>
            `).join('');
        }

        const div = document.createElement('div');
        div.className = `card glass rounded-3xl p-8`;
        div.innerHTML = `
            <div class="flex justify-between text-sm text-slate-400 mb-4">
                <span>ანონიმური</span>
                <span>${timeAgo(post.timestamp)}</span>
            </div>
            <p class="text-lg leading-relaxed mb-6">${post.content}</p>
            
            <div class="flex flex-wrap gap-2 mb-6">${reactionsHTML}</div>
            
            <div class="flex gap-6 text-2xl border-t border-purple-500/20 pt-4">
                <button onclick="toggleLike(${post.id})" class="flex items-center gap-2 ${post.likedBy && post.likedBy.includes('user') ? 'text-pink-500' : ''}">❤️ <span>${post.likes || 0}</span></button>
                <button onclick="addComment(${post.id})" class="flex items-center gap-2">💬 <span>${post.comments.length}</span></button>
                <button onclick="editPost(${post.id})" class="text-yellow-400">✏️</button>
                <button onclick="deletePost(${post.id})" class="text-red-400">🗑️</button>
            </div>

            <div class="mt-6">
                ${post.comments.map(c => `
                    <div class="bg-[#1a1433] p-4 rounded-2xl mb-3 flex justify-between items-start group">
                        <span>${c.text}</span>
                        <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="editComment(${post.id}, ${c.id})" class="text-yellow-400">✏️</button>
                            <button onclick="deleteComment(${post.id}, ${c.id})" class="text-red-400">🗑️</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(div);
    });
}

function renderMySpace() {
    const container = document.getElementById('my-posts');
    container.innerHTML = `<h3 class="text-xl mb-6">ჩემი პოსტები (${posts.length})</h3>`;

    if (posts.length === 0) {
        container.innerHTML += `<p class="text-slate-400">ჯერჯერობით პოსტები არ გაქვს</p>`;
        return;
    }

    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = `card glass rounded-3xl p-8`;
        div.innerHTML = `
            <div class="flex justify-between text-sm text-slate-400 mb-4">
                <span>ჩემი პოსტი</span>
                <span>${timeAgo(post.timestamp)}</span>
            </div>
            <p class="text-lg leading-relaxed mb-6">${post.content}</p>
            <div class="flex gap-6">
                <span>❤️ ${post.likes || 0}</span>
                <span>💬 ${post.comments.length}</span>
            </div>
            <div class="flex gap-4 mt-4">
                <button onclick="editPost(${post.id})" class="text-yellow-400">✏️ რედაქტირება</button>
                <button onclick="deletePost(${post.id})" class="text-red-400">🗑️ წაშლა</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// ===================== MUSIC PANEL =====================
let playlist = [
    { title: "Lo-Fi Chill", artist: "Afterglow", videoId: "YywWuTPoGqc" },
    { title: "Night Drive", artist: "Dreamwave", videoId: "0cHtUNmdq_c" },
    { title: "Calm Vibes", artist: "Chillhop", videoId: "YywWuTPoGqc" }
];

function toggleMusicPanel() {
    const panel = document.getElementById('music-panel');
    panel.classList.toggle('translate-x-full');
    if (!panel.classList.contains('translate-x-full')) {
        renderMusicPlaylist("");
    }
}

function renderMusicPlaylist(searchTerm) {
    const container = document.getElementById('playlist-container');
    container.innerHTML = '';

    const filtered = playlist.filter(track => 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.forEach(track => {
        const div = document.createElement('div');
        div.className = `p-4 rounded-2xl cursor-pointer hover:bg-white/10 transition-all`;
        div.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-2xl">🎵</div>
                <div>
                    <p class="font-medium">${track.title}</p>
                    <p class="text-sm text-slate-400">${track.artist}</p>
                </div>
            </div>
        `;
        div.onclick = () => playMusic(track);
        container.appendChild(div);
    });
}

function playMusic(track) {
    alert(`🎵 ირთვება: ${track.title} - ${track.artist}\n(YouTube Embed მომავალ ვერსიაში გაუმჯობესდება)`);
}

// Search Event
document.addEventListener('input', function(e) {
    if (e.target.id === 'music-search') {
        renderMusicPlaylist(e.target.value);
    }
});

// Initialize
window.onload = () => {
    switchTab(0);
    renderFeed();
    renderMySpace();
};
