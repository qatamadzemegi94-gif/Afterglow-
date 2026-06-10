@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap');

:root {
    --accent: #ff8ab5;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #0a0a1f, #1a0a2e, #2a1a3f);
    color: #e0d4ff;
    overflow-x: hidden;
    min-height: 100vh;
}

/* Particles */
#particles {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;
}

/* Landing, Header, Mood, Post, Feed სტილები (იგივე რაც წინა ვერსიაში) */
.logo {
    font-family: 'Playfair Display', serif;
    font-size: 5.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #c4a1ff, #ff8ab5, #a1c4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: glowPulse 3s infinite alternate;
}

/* ... (სრული სტილები წინა ვერსიიდან) ... */

/* Music Styles */
.music-float-btn {
    position: fixed; bottom: 25px; right: 25px; width: 68px; height: 68px;
    background: linear-gradient(135deg, #6b4e9e, #ff8ab5);
    color: white; font-size: 2rem; display: flex; align-items: center; justify-content: center;
    border-radius: 50%; box-shadow: 0 10px 40px rgba(255, 138, 181, 0.6);
    cursor: pointer; z-index: 300; transition: all 0.4s ease; animation: pulse 2s infinite;
}

.music-panel {
    position: fixed; bottom: 110px; right: 25px; width: 380px; max-height: 75vh;
    background: rgba(15, 10, 45, 0.97); backdrop-filter: blur(25px);
    border-radius: 24px; padding: 20px; box-shadow: 0 25px 70px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,138,181,0.4); display: none; z-index: 400;
    animation: slideUp 0.4s ease;
}

.music-track {
    display: flex; align-items: center; gap: 15px; padding: 14px; border-radius: 16px;
    margin-bottom: 10px; background: rgba(255,255,255,0.07); transition: all 0.3s;
    cursor: pointer;
}

.music-track:hover { background: rgba(255,138,181,0.15); transform: translateX(5px); }
.music-track.active { background: rgba(255,138,181,0.25); box-shadow: 0 0 20px rgba(255,138,181,0.5); }

.music-track img { width: 58px; height: 58px; border-radius: 12px; object-fit: cover; }
.track-info { flex: 1; }
.play-btn { background: none; border: none; font-size: 1.8rem; color: #ff8ab5; cursor: pointer; }

@keyframes pulse { 0%,100% { box-shadow: 0 10px 40px rgba(255,138,181,0.6); } 50% { box-shadow: 0 15px 50px rgba(255,138,181,0.9); } }
@keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes glowPulse { from { text-shadow: 0 0 20px rgba(255,138,181,0.6); } to { text-shadow: 0 0 50px rgba(255,138,181,0.9); } }
