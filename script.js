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
        timestamp: Date.now()
    };

    posts.unshift(newPost);
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    input.value = '';

    alert("✅ პოსტი გამოქვეყნებულია!");
    renderFeed();
    renderMySpace();
}

function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const index = post.likedBy.indexOf("user");
    if (index > -1) {
        post.likedBy.splice(index, 1);
        post.likes--;
    } else {
        post.likedBy.push("user");
        post.likes++;
    }
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    renderFeed();
    renderMySpace();
}

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

function deletePost(id) {
    if (!confirm("ნამდვილად გსურთ პოსტის წაშლა?")) return;
    
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem('afterglow_posts', JSON.stringify(posts));
    renderFeed();
    renderMySpace();
}

function deleteComment(postId, commentId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments = post.comments.filter(c => c.id !== commentId);
        localStorage.setItem('afterglow_posts', JSON.stringify(posts));
        renderFeed();
        renderMySpace();
    }
}

// ===================== RENDER FUNCTIONS =====================
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
        const div = document.createElement('div');
        div.className = `card glass rounded-3xl p-8`;
        div.innerHTML = `
            <div class="flex justify-between text-sm text-slate-400 mb-4">
                <span>ანონიმური</span>
                <span>${timeAgo(post.timestamp)}</span>
            </div>
            <p class="text-lg leading-relaxed mb-6">${post.content}</p>
            <div class="flex items-center justify-between">
                <div class="flex gap-8 text-2xl">
                    <button onclick="toggleLike(${post.id})" class="flex items-center gap-2 ${post.likedBy.includes('user') ? 'text-pink-500' : ''}">
                        ❤️ <span>${post.likes}</span>
                    </button>
                    <button onclick="addComment(${post.id})" class="flex items-center gap-2">
                        💬 <span>${post.comments.length}</span>
                    </button>
                </div>
                <button onclick="deletePost(${post.id})" class="text-red-400 hover:text-red-500">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="mt-6 border-t border-purple-500/20 pt-4">
                ${post.comments.map(c => `
                    <div class="bg-[#1a1433] p-4 rounded-2xl mb-3 flex justify-between items-start">
                        <span>${c.text}</span>
                        <button onclick="deleteComment(${post.id}, ${c.id})" class="text-red-400 text-sm">×</button>
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
            <div class="flex gap-6 text-xl">
                <span>❤️ ${post.likes}</span>
                <span>💬 ${post.comments.length}</span>
            </div>
            <button onclick="deletePost(${post.id})" class="mt-4 text-red-400 hover:text-red-500 text-sm">წაშლა</button>
        `;
        container.appendChild(div);
    });
}

// ===================== MUSIC =====================
function toggleMusicPanel() {
    alert("🎵 მუსიკის პანელი მომავალ ვერსიაში გაუმჯობესდება");
}

// Initialize
window.onload = () => {
    switchTab(0);
    renderFeed();
    renderMySpace();
};
