@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap');

:root { --accent: #ff8ab5; }

* { margin:0; padding:0; box-sizing:border-box; }

body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #0a0a1f, #1a0a2e, #2a1a3f);
    color: #e0d4ff;
    min-height: 100vh;
    overflow-x: hidden;
}

#particles { position:fixed; top:0; left:0; width:100%; height:100%; z-index:1; pointer-events:none; }

/* Landing */
#landing {
    height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; position:relative; z-index:2;
}

.logo {
    font-family:'Playfair Display',serif; font-size:5.5rem; font-weight:700;
    background:linear-gradient(90deg,#c4a1ff,#ff8ab5,#a1c4ff);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    animation:glowPulse 3s infinite alternate;
}

.glow-btn {
    padding:18px 48px; font-size:1.3rem; font-weight:600;
    background:rgba(255,255,255,0.1); border:2px solid rgba(255,138,181,0.6);
    border-radius:50px; color:white; cursor:pointer; box-shadow:0 0 30px rgba(255,138,181,0.5);
    transition:all 0.4s;
}

.glow-btn:hover { transform:translateY(-5px) scale(1.05); box-shadow:0 0 50px rgba(255,138,181,0.8); }

/* Header */
header {
    background:rgba(10,10,31,0.95); backdrop-filter:blur(15px);
    padding:1rem 5%; display:flex; align-items:center; justify-content:space-between;
    position:sticky; top:0; z-index:100;
}

.logo-small { font-family:'Playfair Display',serif; color:#ff8ab5; font-size:1.8rem; }

.nav { display:flex; gap:2rem; }
.nav-item {
    padding:10px 20px; cursor:pointer; position:relative; transition:0.3s;
}
.nav-item.active { color:#ff8ab5; }
.nav-item.active::after {
    content:''; position:absolute; bottom:-6px; left:50%; transform:translateX(-50%);
    width:50%; height:3px; background:#ff8ab5; border-radius:3px;
}

/* Pages */
.page { display:none; padding:30px 5%; }
.page.active { display:block; }

.content-wrapper { max-width:700px; margin:0 auto; }

/* Motivational Slider */
.motivational-slider {
    background:rgba(255,255,255,0.08); padding:20px; border-radius:20px;
    text-align:center; font-style:italic; margin-bottom:25px; min-height:70px;
    display:flex; align-items:center; justify-content:center;
}

/* Post Form */
.post-form {
    background:rgba(255,255,255,0.07); border-radius:24px; padding:25px;
    backdrop-filter:blur(12px); border:1px solid rgba(255,138,181,0.15);
}

.post-form textarea {
    width:100%; background:transparent; border:none; color:#e0d4ff;
    font-size:1.1rem; resize:none; height:140px; outline:none;
}

.emoji-btn, .post-btn {
    padding:10px 18px; border-radius:50px; cursor:pointer; font-size:1.3rem;
    background:rgba(255,138,181,0.2); border:none; color:white;
}

.post-btn { background:linear-gradient(90deg,#ff8ab5,#c4a1ff); }

/* Emoji Picker */
.emoji-picker {
    display:none; position:absolute; background:rgba(20,15,45,0.95);
    padding:15px; border-radius:16px; gap:10px; flex-wrap:wrap;
    box-shadow:0 10px 30px rgba(0,0,0,0.6); z-index:100;
    max-width:300px;
}

.emoji-picker span {
    font-size:1.8rem; cursor:pointer; padding:8px; border-radius:12px;
    transition:0.2s;
}

.emoji-picker span:hover { background:rgba(255,138,181,0.3); }

/* Music */
.music-float-btn {
    position:fixed; bottom:25px; right:25px; width:68px; height:68px;
    background:linear-gradient(135deg,#6b4e9e,#ff8ab5); color:white;
    font-size:2rem; display:flex; align-items:center; justify-content:center;
    border-radius:50%; box-shadow:0 10px 40px rgba(255,138,181,0.6);
    cursor:pointer; z-index:300;
}

.music-panel {
    position:fixed; bottom:110px; right:25px; width:380px;
    background:rgba(15,10,45,0.97); backdrop-filter:blur(25px);
    border-radius:24px; padding:20px; border:1px solid rgba(255,138,181,0.4);
    display:none; z-index:400;
}

.music-track {
    display:flex; align-items:center; gap:15px; padding:14px;
    border-radius:16px; margin-bottom:10px; background:rgba(255,255,255,0.07);
    cursor:pointer; transition:0.3s;
}

.music-track:hover { background:rgba(255,138,181,0.15); }
.music-track.active { background:rgba(255,138,181,0.25); box-shadow:0 0 20px rgba(255,138,181,0.5); }

.play-btn { background:none; border:none; font-size:1.8rem; color:#ff8ab5; cursor:pointer; }

@keyframes glowPulse {
    from { text-shadow:0 0 20px rgba(255,138,181,0.6); }
    to { text-shadow:0 0 50px rgba(255,138,181,0.9); }
}
