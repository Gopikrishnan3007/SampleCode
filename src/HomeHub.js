import React, { useState } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const HER_NAME = "Ranjani";
const YOUR_NAME = "Gopi";
const LOVE_SINCE = "2022-05-13";
const HER_PHOTO = "https://i.imgur.com/2ZQYjTt.jpg";

// ─── CSS ───────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Lora:wght@400;500&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:'Lora',serif;
  background:#180f05;
  color:#fdf6ec;
}

.root{
  min-height:100vh;
  position:relative;
  overflow-x:hidden;
  background:
  radial-gradient(circle at top,#3d1f08 0%,#180f05 60%,#0a0602 100%);
}

/* ORBS */
.orb{
  position:fixed;
  border-radius:50%;
  filter:blur(80px);
  z-index:0;
}

.orb-1{
  width:500px;
  height:500px;
  background:rgba(200,132,58,0.08);
  top:-100px;
  left:-100px;
}

.orb-2{
  width:350px;
  height:350px;
  background:rgba(200,132,58,0.05);
  bottom:-50px;
  right:-50px;
}

.orb-3{
  width:250px;
  height:250px;
  background:rgba(232,168,90,0.04);
  top:40%;
  left:50%;
  transform:translateX(-50%);
}

/* STARS */
.stars{
  position:fixed;
  inset:0;
  z-index:0;
}

.s{
  position:absolute;
  background:#f5c887;
  border-radius:50%;
  animation:twinkle ease-in-out infinite;
}

@keyframes twinkle{
  0%,100%{
    opacity:0.1;
  }
  50%{
    opacity:0.6;
  }
}

/* CONTENT */
.content{
  position:relative;
  z-index:2;
  max-width:1000px;
  margin:auto;
  padding:40px 20px 120px;
}

/* HEADER */
.header{
  text-align:center;
  margin-bottom:40px;
}

.header-ornament{
  color:#c8843a;
  margin-bottom:14px;
  letter-spacing:10px;
}

.header-name{
  font-size:clamp(2.4rem,7vw,4rem);
  font-family:'Cormorant Garamond',serif;
  font-style:italic;
  font-weight:300;
  line-height:1.2;
}

.header-name span{
  color:#e8a85a;
}

.header-sub{
  margin-top:12px;
  color:#a07850;
  font-size:0.8rem;
  letter-spacing:2px;
  text-transform:uppercase;
}

/* COUNTER */
.love-counter{
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  margin-top:28px;
  gap:12px;
}

.count-unit{
  padding:14px 20px;
  border:1px solid rgba(200,132,58,0.2);
  border-radius:14px;
  min-width:90px;
  background:rgba(255,255,255,0.03);
}

.count-num{
  display:block;
  font-size:1.5rem;
  color:#e8a85a;
  font-family:'Cormorant Garamond',serif;
}

.count-label{
  font-size:0.7rem;
  color:#a07850;
  text-transform:uppercase;
  letter-spacing:2px;
}

.counter-caption{
  margin-top:14px;
  font-size:0.8rem;
  color:#8a6a48;
  font-style:italic;
}

/* SECTION */
.section-label{
  display:flex;
  align-items:center;
  gap:12px;
  margin:50px 0 20px;
}

.section-label::before,
.section-label::after{
  content:'';
  flex:1;
  height:1px;
  background:rgba(200,132,58,0.2);
}

.section-label-text{
  font-size:0.7rem;
  letter-spacing:3px;
  text-transform:uppercase;
  color:#a07850;
}

/* MOODS */
.mood-strip{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.mood-pill{
  padding:10px 16px;
  border-radius:30px;
  border:1px solid rgba(200,132,58,0.2);
  background:rgba(255,255,255,0.03);
  cursor:pointer;
  transition:0.3s;
  display:flex;
  align-items:center;
  gap:8px;
}

.mood-pill:hover,
.mood-pill.active{
  background:rgba(200,132,58,0.1);
  border-color:#c8843a;
}

/* FEATURED CARD */
.card-featured{
  margin-top:20px;
  display:flex;
  gap:24px;
  align-items:center;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(200,132,58,0.2);
  border-radius:22px;
  padding:28px;
  transition:0.3s;
  cursor:pointer;
}

.card-featured:hover{
  transform:translateY(-4px);
  border-color:#c8843a;
}

.featured-emoji{
  font-size:3rem;
}

.featured-tag{
  color:#c8843a;
  font-size:0.7rem;
  letter-spacing:2px;
  text-transform:uppercase;
  margin-bottom:8px;
}

.featured-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.7rem;
  margin-bottom:10px;
}

.featured-desc{
  color:#c4a07a;
  line-height:1.7;
  font-size:0.9rem;
}

.featured-cta{
  margin-top:18px;
  padding:10px 18px;
  border:none;
  border-radius:10px;
  background:linear-gradient(135deg,#c8843a,#e8a85a);
  cursor:pointer;
  font-size:0.9rem;
}

/* GRID */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:18px;
  margin-top:24px;
}

/* ROOM CARD */
.room-card{
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(200,132,58,0.2);
  border-radius:20px;
  padding:24px;
  transition:0.3s;
  cursor:pointer;
}

.room-card:hover{
  transform:translateY(-4px);
  border-color:#c8843a;
}

.room-emoji{
  font-size:2.2rem;
}

.room-title{
  margin-top:12px;
  font-size:1.3rem;
  font-family:'Cormorant Garamond',serif;
}

.room-desc{
  margin-top:10px;
  color:#c4a07a;
  line-height:1.7;
  font-size:0.85rem;
}

.room-arrow{
  margin-top:16px;
  color:#c8843a;
  font-size:0.75rem;
  letter-spacing:2px;
  text-transform:uppercase;
}

/* QUOTE */
.quote-strip{
  margin-top:50px;
  padding:26px;
  border-left:3px solid rgba(200,132,58,0.4);
  background:rgba(200,132,58,0.05);
  border-radius:0 14px 14px 0;
}

.quote-text{
  font-size:1.1rem;
  font-family:'Cormorant Garamond',serif;
  line-height:1.8;
  font-style:italic;
}

.quote-from{
  margin-top:12px;
  font-size:0.75rem;
  color:#a07850;
  letter-spacing:2px;
  text-transform:uppercase;
}

/* NAV DOTS */
.nav-hint{
  display:flex;
  justify-content:center;
  gap:6px;
  margin-top:28px;
}

.nav-dot{
  width:6px;
  height:6px;
  border-radius:50%;
  background:#c8843a;
}

.nav-dot.big{
  width:18px;
  border-radius:4px;
}
`;

// ─── DATA ──────────────────────────────────────────────────────────────────
const ROOMS = [
  // {
  //   emoji: "📸",
  //   title: "Our Memories",
  //   desc: "Every moment we've lived together.",
  //   path: "/memories",
  // },
  // {
  //   emoji: "🏆",
  //   title: "Her Victory Wall",
  //   desc: "Every battle you've won.",
  //   path: "/victories",
  // },
  {
    emoji: "🧩",
    title: "Puzzle of Love",
    desc: "Little games made from our world.",
    path: "/puzzles",
  },
  {
    emoji: "💌",
    title: "Kavithai Corner",
    desc: "Open when you need something",
    path: "/kavithai",
  },
];

const MOODS = [
  { label: "happy", emoji: "☀️" },
  { label: "sad", emoji: "🌧️" },
  { label: "missing you", emoji: "💌" },
  { label: "alone", emoji: "🌙" },
];

const STARS_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 23) % 100}%`,
  size: i % 6 === 0 ? 3 : 2,
  dur: `${2 + (i % 5)}s`,
  delay: `${i * 0.2}s`,
}));

// ─── LOVE COUNTER HOOK ────────────────────────────────────────────────────
function useLoveDays(since) {
  const [counter, setCounter] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const update = () => {
      const start = new Date(since);
      const now = new Date();

      const diff = now - start;

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setCounter({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [since]);

  return counter;
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function HomeHub({ onNavigate }) {
  const [activeMood, setActiveMood] = useState(null);
  const counter = useLoveDays(LOVE_SINCE);

  const navigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      console.log("Navigate to:", path);
    }
  };

  return (
    <>
      <style>{css}</style>

      {/* AMBIENT */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* STARS */}
      <div className="stars">
        {STARS_DATA.map((s) => (
          <div
            key={s.id}
            className="s"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDuration: s.dur,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      <div className="root">
        <div className="content">

          {/* HEADER */}
          <div className="header">
            <div className="header-ornament">♥ ♥ ♥</div>

            <h1 className="header-name">
              Welcome home,
              <br />
              <span>{HER_NAME}</span>
            </h1>

            <p className="header-sub">
              built with love by {YOUR_NAME}
            </p>

            {/* COUNTER */}
            <div className="love-counter">
              <div className="count-unit">
                <span className="count-num">{counter.days}</span>
                <span className="count-label">days</span>
              </div>
              <div className="count-unit">
                <span className="count-num">{counter.hours}</span>
                <span className="count-label">hours</span>
              </div>
              <div className="count-unit">
                <span className="count-num">{counter.minutes}</span>
                <span className="count-label">minutes</span>
              </div>
              <div className="count-unit">
                <span className="count-num">{counter.seconds}</span>
                <span className="count-label">seconds</span>
              </div>
            </div>

            <p className="counter-caption">
              you've been making my world better for this long ♥
            </p>
          </div>

          {/* MOODS */}
          <div className="section-label">
            <span className="section-label-text">
              how are you feeling right now?
            </span>
          </div>

          <div className="mood-strip">
            {MOODS.map((mood) => (
              <div
                key={mood.label}
                className={`mood-pill ${activeMood === mood.label ? "active" : ""}`}
                onClick={() => {
                  setActiveMood(mood.label);
                  navigate("/feelings");
                }}
              >
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </div>
            ))}
          </div>

          {/* FEATURED */}
          <div className="section-label">
            <span className="section-label-text">your rooms</span>
          </div>

          <div className="card-featured" onClick={() => navigate("/feelings")}>
            <span className="featured-emoji">🌧️</span>
            <div className="featured-body">
              <p className="featured-tag">always open · always waiting</p>
              <h2 className="featured-title">The Feelings Room</h2>
              <p className="featured-desc">
                Whatever you're carrying right now — I already have something ready for you.
              </p>
              <button
                className="featured-cta"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/feelings");
                }}
              >
                open the room →
              </button>
            </div>
          </div>

          {/* ROOM GRID */}
          <div className="grid">
            {ROOMS.map((room) => (
              <div key={room.path} className="room-card" onClick={() => navigate(room.path)}>
                <span className="room-emoji">{room.emoji}</span>
                <h3 className="room-title">{room.title}</h3>
                <p className="room-desc">{room.desc}</p>
                <div className="room-arrow">enter this room →</div>
              </div>
            ))}
          </div>

          {/* QUOTE */}
          <div className="quote-strip">
            <p className="quote-text">"Every version of my future has you in it."</p>
            <p className="quote-from">— {YOUR_NAME}, always</p>
          </div>

          {/* NAV DOTS */}
          <div className="nav-hint">
            <div className="nav-dot big"></div>
            <div className="nav-dot"></div>
            <div className="nav-dot"></div>
          </div>

        </div>
      </div>
    </>
  );
}