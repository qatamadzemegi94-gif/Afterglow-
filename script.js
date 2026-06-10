// შენი არსებული კოდი (Particles, enterApp, switchTab, publishPost და ა.შ.) დარჩეს უცვლელად

// ==================== MUSIC PANEL ====================
let currentAudio = null;
let currentTrackIndex = -1;

const songs = [
    { title: "After Dark", artist: "Mr.Kitty", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Skyfall", artist: "Adele", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    // აქ დაამატე შენი სიმღერები:
    // { title: "სიმღერის სახელი", artist: "შემსრულებელი", url: "შენი ლინკი" }
];

function toggleMusicPanel() {
    const panel = document.getElementById('musicPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    if (panel.style.display === 'block') renderMusicList();
}

function renderMusicList(filteredSongs = songs) {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

    filteredSongs.forEach((song, index) => {
        const globalIndex = songs.indexOf(song);
        const isActive = globalIndex === currentTrackIndex;

        const div = document.createElement('div');
        div.className = `music-track ${isActive ? 'active' : ''}`;
        div.innerHTML = `
            <div>
                <div style="font-weight:500;">${song.title}</div>
                <div style="font-size:0.85rem; opacity:0.7;">${song.artist}</div>
            </div>
            <button onclick="playSong(${globalIndex}); event.stopImmediatePropagation()" style="background:none;border:none;font-size:1.6rem;color:#ff8ab5;">
                ${isActive ? '❚❚' : '▶'}
            </button>
        `;
        container.appendChild(div);
    });
}

function playSong(index) {
    if (currentTrackIndex === index && currentAudio) {
        currentAudio.pause();
        currentTrackIndex = -1;
        renderMusicList();
        return;
    }

    if (currentAudio) currentAudio.pause();

    currentAudio = new Audio(songs[index].url);
    currentAudio.play().then(() => {
        currentTrackIndex = index;
        renderMusicList();
        document.getElementById('nowPlaying').textContent = `${songs[index].title} - ${songs[index].artist}`;
    }).catch(() => {
        alert("სიმღერა ვერ ჩაიტვირთა");
    });
}

// Search
document.getElementById('musicSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(term) || 
        song.artist.toLowerCase().includes(term)
    );
    renderMusicList(filtered);
});

// Initialize Music
window.onload = function() {
    // შენი არსებული onload კოდი...
    renderMusicList(); // მუსიკის სია პირველად ჩაიტვირთოს
};
