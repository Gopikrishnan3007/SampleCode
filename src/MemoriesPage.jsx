import { useState, useRef } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const HER_NAME  = "Ranjani";
const YOUR_NAME = "Gopi";

// ─── MEMORIES DATA ───────────────────────────────────────────────────────────
// Replace `photo` with real image URLs when you have them.
// `bg` is the polaroid photo background colour (used as fallback / tint).
// categories: "first" | "celebrate" | "hard" | "silly" | "ordinary"

const PINNED = {
  id: 0,
  date: "13 May 2022",
  title: "The Night Everything Changed",
  emoji: "🚂",
  bg: "#1e1830",
  photo: null, // replace with real URL e.g. "https://i.imgur.com/..."
  story: `It was a train. Of all places.

I don't even remember what I was supposed to be doing that night — whatever it was, it stopped mattering the second you smiled.

You were talking about something completely ordinary and I was already thinking: this person is going to be important to me. I didn't know how right I was.

That night changed the entire shape of my future. I just didn't know it yet.

I think about it sometimes — how close I was to not being on that train. How easily we could have never happened. And then I hold that thought for exactly one second before I put it down, because we did happen. You are here. I am here.

Everything good in my life since that night has had your fingerprints on it.`,
  song: { title: "Munbe Vaa", film: "Sillunu Oru Kaadhal" },
};

const MEMORIES = [
  // ── FIRST TIMES ─────────────────────────────────────────────────────────
  {
    id: 1,
    category: "first",
    date: "13 May 2022",
    title: "First Time We Talked",
    emoji: "🚂",
    bg: "#1a1535",
    photo: null,
    caption: "A train, a conversation, and the rest is us.",
    note: `I kept finding reasons to keep talking. You kept answering. Neither of us wanted it to end.\n\nI think we both knew something was happening. We just didn't say it yet.`,
    song: { title: "Munbe Vaa", film: "Sillunu Oru Kaadhal" },
  },
  {
    id: 2,
    category: "first",
    date: "2022",
    title: "First Time You Called Me",
    emoji: "📞",
    bg: "#0f2030",
    photo: null,
    caption: "3 hours. Felt like 20 minutes.",
    note: `You called and I picked up on the first ring like I'd been waiting. Which I had been.\n\nI sat on my floor the entire call because I forgot chairs existed.`,
    song: { title: "Dhimu Dhimu", film: "Engeyum Kadhal" },
  },
  {
    id: 3,
    category: "first",
    date: "2022",
    title: "First Time I Said Ti Amo",
    emoji: "💬",
    bg: "#1f1020",
    photo: null,
    caption: "In a different language. But you understood.",
    note: `I was scared to say it in Tamil. So I said it in Italian first, like a coward.\n\nYou went quiet. Then you said it back.\n\nBest two seconds of my life.`,
    song: { title: "Aathadi Aathadi", film: "Anegan" },
  },

  // ── CELEBRATIONS ────────────────────────────────────────────────────────
  {
    id: 4,
    category: "celebrate",
    date: "2023",
    title: "Your Birthday",
    emoji: "🎂",
    bg: "#201510",
    photo: null,
    caption: "I spent three days planning this. You cried. I cried. Great day.",
    note: `Every single thing I planned for that day — I thought of you first.\n\nWatching you be happy is genuinely my favourite thing. I'd do it every single day if I could.`,
    song: { title: "Kannaana Kanney", film: "Viswasam" },
  },
  {
    id: 5,
    category: "celebrate",
    date: "2023",
    title: "Your Exam Results",
    emoji: "🏆",
    bg: "#0f2015",
    photo: null,
    caption: "You worked so hard for this. You deserved every bit of it.",
    note: `You called me the second you found out. I heard you scream before I heard your voice.\n\nI was so proud I didn't know what to do with myself. I still am.`,
    song: { title: "Vellai Pookal", film: "Kannathil Muthamittal" },
  },

  // ── HARD TIMES ──────────────────────────────────────────────────────────
  {
    id: 6,
    category: "hard",
    date: "2022",
    title: "The Night You Were Crying",
    emoji: "🌧️",
    bg: "#0d1825",
    photo: null,
    caption: "I couldn't fix it. But I stayed. That felt like enough.",
    note: `You didn't need solutions. You needed to not be alone.\n\nI stayed on the phone until you fell asleep. I didn't mind. I'd do it a hundred times over.`,
    song: { title: "Nila Kaigiradhu", film: "Indira" },
  },
  {
    id: 7,
    category: "hard",
    date: "2023",
    title: "Our First Real Fight",
    emoji: "⚡",
    bg: "#1f1008",
    photo: null,
    caption: "We were both wrong. We figured it out. That's the important part.",
    note: `I hated every minute of that silence between us.\n\nBut I think it taught us something — that we're both stubborn, and both soften first when it matters. That's a good thing to know about each other.`,
    song: { title: "Uyire Uyire", film: "Bombay" },
  },

  // ── SILLY ───────────────────────────────────────────────────────────────
  {
    id: 8,
    category: "silly",
    date: "2022",
    title: "That One Voice Note",
    emoji: "😂",
    bg: "#1a1505",
    photo: null,
    caption: "I still have it saved. I replay it when I need to laugh.",
    note: `I don't even remember what you said. I just remember laughing until I couldn't breathe.\n\nYou have no idea how funny you are. And that makes it funnier.`,
    song: { title: "Adiye Kolluthey", film: "Vaaranam Aayiram" },
  },
  {
    id: 9,
    category: "silly",
    date: "2023",
    title: "When You Got Lost",
    emoji: "🗺️",
    bg: "#101a10",
    photo: null,
    caption: "You called me for directions. From 400km away. I loved it.",
    note: `You were so annoyed. I was trying so hard not to laugh.\n\nI didn't laugh. (I laughed. But quietly. On mute.)`,
    song: { title: "Venmathi Venmathiye", film: "Minnale" },
  },

  // ── ORDINARY ────────────────────────────────────────────────────────────
  {
    id: 10,
    category: "ordinary",
    date: "2023",
    title: "That Random Tuesday Night",
    emoji: "🌙",
    bg: "#0f0f20",
    photo: null,
    caption: "Nothing happened. Everything happened.",
    note: `We weren't doing anything special. Just talking. Just existing together.\n\nThose are the moments I think about most. Not the big ones. These ones. The ordinary ones that became extraordinary just because you were in them.`,
    song: { title: "Nenjukulle", film: "Kadal" },
  },
  {
    id: 11,
    category: "ordinary",
    date: "2022",
    title: "Good Morning Texts",
    emoji: "☀️",
    bg: "#1f1208",
    photo: null,
    caption: "Every single morning. Without fail. You made waking up worth it.",
    note: `There were 487 days in a row where the first thing I read was from you.\n\nMost people don't get that. I don't take it for granted. Not for a second.`,
    song: { title: "Aathadi Aathadi", film: "Anegan" },
  },
  {
    id: 12,
    category: "ordinary",
    date: "2023",
    title: "Late Night Calls",
    emoji: "🌛",
    bg: "#080d1a",
    photo: null,
    caption: "Started at 10pm. Ended at 3am. Every time.",
    note: `I don't know how we always had that much to say.\n\nMaybe we just didn't want to stop talking. Maybe that's still true.`,
    song: { title: "Dhimu Dhimu", film: "Engeyum Kadhal" },
  },
];

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",       label: "All Memories", emoji: "✨" },
  { id: "first",     label: "First Times",  emoji: "🥇" },
  { id: "celebrate", label: "Celebrations", emoji: "🎉" },
  { id: "hard",      label: "Hard Times",   emoji: "🌧️" },
  { id: "silly",     label: "Silly Moments",emoji: "😂" },
  { id: "ordinary",  label: "Ordinary Days",emoji: "💛" },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400&family=Caveat:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber: #c8843a;
  --al: #e8a85a;
  --ap: #f5c887;
  --cream: #fdf6ec;
  --dark: #180f05;
  --muted: #a07850;
  --mutl: #c4a07a;
  --border: rgba(200,132,58,0.22);
}

html, body {
  background: var(--dark);
  font-family: 'Lora', serif;
  color: var(--cream);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── BACKGROUND ── */
.mp-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, #3d1f08 0%, #180f05 60%, #0a0602 100%);
}
.mp-orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(90px);
}
.mp-orb-1 { width: 500px; height: 500px; background: rgba(200,132,58,.07); top: -120px; left: -120px; }
.mp-orb-2 { width: 380px; height: 380px; background: rgba(200,132,58,.05); bottom: -60px; right: -80px; }
.mp-stars { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.mp-star {
  position: absolute;
  border-radius: 50%;
  background: #f5c887;
  animation: mpTwinkle ease-in-out infinite;
}
@keyframes mpTwinkle {
  0%, 100% { opacity: .07; }
  50%       { opacity: .5; }
}

/* ── ROOT ── */
.mp-root {
  position: relative;
  z-index: 10;
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 24px 120px;
}

/* ── HEADER ── */
.mp-header {
  padding: 52px 0 8px;
  text-align: center;
  animation: mpDown .7s ease both;
}
@keyframes mpDown {
  from { opacity: 0; transform: translateY(-18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.mp-orn {
  color: var(--amber);
  letter-spacing: 12px;
  font-size: .9rem;
  opacity: .45;
  margin-bottom: 14px;
}
.mp-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 7vw, 3.6rem);
  font-style: italic;
  font-weight: 300;
  color: var(--cream);
  line-height: 1.2;
  margin-bottom: 10px;
}
.mp-title span { color: var(--al); }
.mp-sub {
  font-size: .72rem;
  color: var(--muted);
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* ── SECTION LABEL ── */
.mp-sl {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 44px 0 22px;
}
.mp-sl::before, .mp-sl::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(200,132,58,.15);
}
.mp-sl-t {
  font-size: .65rem;
  color: var(--muted);
  letter-spacing: 3px;
  text-transform: uppercase;
  white-space: nowrap;
}

/* ── PINNED CARD ── */
.mp-pinned {
  position: relative;
  background: rgba(253,246,236,.055);
  border: 1px solid rgba(200,132,58,.35);
  border-radius: 24px;
  padding: 0;
  overflow: hidden;
  animation: mpUp .7s .1s ease both;
  cursor: pointer;
  transition: transform .3s, box-shadow .3s;
}
.mp-pinned:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 40px rgba(200,132,58,.1);
}
.mp-pinned-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 340px;
}
@media (max-width: 620px) {
  .mp-pinned-inner { grid-template-columns: 1fr; }
}
.mp-pinned-photo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  min-height: 220px;
  overflow: hidden;
}
.mp-pinned-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mp-pinned-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.1) 100%);
}
.mp-pinned-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 5px 12px;
  background: rgba(200,132,58,.9);
  border-radius: 20px;
  font-size: .62rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #180f05;
  font-weight: 600;
  backdrop-filter: blur(8px);
}
.mp-pinned-content {
  padding: 32px 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.mp-pinned-date {
  font-size: .68rem;
  color: var(--amber);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.mp-pinned-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.4rem, 3.5vw, 2rem);
  font-style: italic;
  font-weight: 300;
  color: var(--cream);
  line-height: 1.3;
  margin-bottom: 18px;
}
.mp-pinned-story {
  font-family: 'Cormorant Garamond', serif;
  font-size: .95rem;
  font-style: italic;
  font-weight: 300;
  color: #c4a07a;
  line-height: 1.85;
  flex: 1;
  white-space: pre-line;
}
.mp-pinned-song {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(200,132,58,.15);
  display: flex;
  align-items: center;
  gap: 10px;
}
.mp-pinned-song-icon {
  font-size: 1.1rem;
  opacity: .7;
}
.mp-pinned-song-info {
  font-size: .72rem;
  color: var(--muted);
  font-style: italic;
  letter-spacing: .5px;
}
.mp-pinned-song-info strong {
  color: var(--al);
  font-weight: 400;
}

/* ── CATEGORY FILTER ── */
@keyframes mpUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.mp-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  animation: mpUp .6s .2s ease both;
}
.mp-cat {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 30px;
  border: 1px solid rgba(200,132,58,.2);
  background: rgba(255,255,255,.03);
  cursor: pointer;
  transition: all .25s;
  user-select: none;
}
.mp-cat:hover {
  border-color: var(--amber);
  background: rgba(200,132,58,.07);
  transform: translateY(-2px);
}
.mp-cat.active {
  border-color: var(--amber);
  background: rgba(200,132,58,.12);
}
.mp-cat-emoji { font-size: 1rem; }
.mp-cat-label {
  font-size: .72rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--muted);
  transition: color .25s;
}
.mp-cat.active .mp-cat-label { color: var(--al); }

/* ── POLAROID GRID ── */
.mp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 28px;
  animation: mpUp .6s .3s ease both;
}

/* ── POLAROID ── */
.mp-pol-wrap {
  perspective: 1000px;
  cursor: pointer;
}

.mp-pol {
  position: relative;
  width: 100%;
  border-radius: 4px;
  transform-style: preserve-3d;
  transition: transform .65s cubic-bezier(.25,.8,.25,1);
  animation: mpPop .5s ease both;
}
@keyframes mpPop {
  from { opacity: 0; transform: scale(.9) rotateY(0); }
  to   { opacity: 1; transform: scale(1) rotateY(0); }
}

.mp-pol.flipped { transform: rotateY(180deg); }

/* slight rotation per card — applied inline */
.mp-pol-face, .mp-pol-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 4px;
  box-shadow:
    0 4px 12px rgba(0,0,0,.45),
    0 1px 2px rgba(0,0,0,.3),
    2px 3px 8px rgba(0,0,0,.2);
}

/* FRONT */
.mp-pol-face {
  background: #f5f0e8;
  padding: 10px 10px 48px;
  display: flex;
  flex-direction: column;
}
.mp-pol-photo {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.mp-pol-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mp-pol-caption {
  margin-top: 10px;
  font-family: 'Caveat', cursive;
  font-size: 1.05rem;
  color: #3a2a1a;
  text-align: center;
  line-height: 1.4;
  padding: 0 4px;
}
.mp-pol-date-tag {
  position: absolute;
  bottom: 14px;
  right: 12px;
  font-family: 'Caveat', cursive;
  font-size: .75rem;
  color: #8a7060;
}
.mp-pol-hint {
  position: absolute;
  bottom: 10px;
  left: 12px;
  font-size: .6rem;
  color: #b09070;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: .6;
}

/* BACK */
.mp-pol-back {
  position: absolute;
  inset: 0;
  background: #f0e8d8;
  padding: 20px 16px 16px;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}
.mp-pol-back-title {
  font-family: 'Caveat', cursive;
  font-size: 1.15rem;
  color: #3a2a1a;
  margin-bottom: 10px;
  font-weight: 600;
  border-bottom: 1px dashed #c4a07a;
  padding-bottom: 8px;
}
.mp-pol-back-note {
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  color: #4a3520;
  line-height: 1.65;
  flex: 1;
  white-space: pre-line;
}
.mp-pol-back-song {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed #c4a07a;
  font-family: 'Caveat', cursive;
  font-size: .85rem;
  color: #8a6040;
  display: flex;
  align-items: center;
  gap: 6px;
}
.mp-pol-back-sig {
  margin-top: 8px;
  font-family: 'Caveat', cursive;
  font-size: 1rem;
  color: var(--amber);
  text-align: right;
}
.mp-pol-back-date {
  font-family: 'Caveat', cursive;
  font-size: .8rem;
  color: #9a8070;
  text-align: right;
  margin-top: 4px;
}

/* ── CAT BADGE on polaroid ── */
.mp-cat-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: .85rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,.3));
}

/* ── COUNT ── */
.mp-count {
  font-size: .72rem;
  color: var(--muted);
  font-style: italic;
  margin-bottom: 12px;
  animation: mpFade .4s ease both;
}
@keyframes mpFade { from { opacity: 0; } to { opacity: 1; } }

/* ── EMPTY ── */
.mp-empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: var(--muted);
  font-size: 1rem;
}

/* ── BACK BTN ── */
.mp-back {
  display: block;
  margin: 40px auto 0;
  background: none;
  border: 1px solid rgba(200,132,58,.2);
  border-radius: 10px;
  padding: 10px 26px;
  font-family: 'Cormorant Garamond', serif;
  font-size: .9rem;
  font-style: italic;
  color: var(--muted);
  cursor: pointer;
  transition: all .25s;
}
.mp-back:hover { border-color: var(--amber); color: var(--mutl); }

/* ── MODAL ── */
.mp-modal-bg {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(10,6,2,.9);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: mpFade .3s ease both;
}
.mp-modal {
  width: min(620px, 96vw);
  max-height: 92vh;
  overflow-y: auto;
  background: linear-gradient(160deg, rgba(45,25,10,.98), rgba(30,18,8,.98));
  border: 1px solid rgba(200,132,58,.35);
  border-radius: 24px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,.7), 0 0 60px rgba(200,132,58,.08);
  animation: mpModalIn .4s cubic-bezier(.25,.8,.25,1) both;
}
@keyframes mpModalIn {
  from { opacity: 0; transform: scale(.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.mp-modal-photo {
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  position: relative;
  overflow: hidden;
}
.mp-modal-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mp-modal-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(24,15,5,.9) 100%);
}
.mp-modal-body { padding: 28px 32px 32px; }
.mp-modal-date {
  font-size: .65rem;
  color: var(--amber);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.mp-modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-style: italic;
  font-weight: 300;
  color: var(--cream);
  margin-bottom: 20px;
  line-height: 1.3;
}
.mp-modal-note {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
  color: #c4a07a;
  line-height: 1.9;
  white-space: pre-line;
}
.mp-modal-song {
  margin-top: 22px;
  padding: 14px 18px;
  border-left: 2px solid rgba(200,132,58,.35);
  background: rgba(200,132,58,.05);
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.mp-modal-song-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: .88rem;
  font-style: italic;
  color: var(--mutl);
}
.mp-modal-song-text strong { color: var(--al); font-weight: 400; }
.mp-modal-close {
  position: absolute;
  top: 16px;
  right: 18px;
  background: rgba(0,0,0,.4);
  border: 1px solid rgba(200,132,58,.2);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--mutl);
  font-size: 1rem;
  backdrop-filter: blur(8px);
  transition: all .2s;
  z-index: 10;
}
.mp-modal-close:hover { color: var(--cream); border-color: var(--amber); }
`;

// ─── STARS ───────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: `${(i * 17.3 + 5) % 100}%`,
  top: `${(i * 23.1 + 3) % 100}%`,
  size: i % 7 === 0 ? 3 : 2,
  dur: `${2.5 + (i % 5) * 0.6}s`,
  delay: `${(i * 0.3) % 5}s`,
}));

// slight tilt per card for realism
const TILTS = [-3.5, 2.1, -1.4, 3.2, -2.8, 1.7, -0.8, 2.5, -3.1, 0.9, -2.2, 3.8];
const CAT_COLORS = {
  first:     "#1a1535",
  celebrate: "#201510",
  hard:      "#0d1825",
  silly:     "#1a1505",
  ordinary:  "#0f0f20",
};

// ─── POLAROID CARD ───────────────────────────────────────────────────────────
function Polaroid({ memory, idx, onClick }) {
  const [flipped, setFlipped] = useState(false);
  const tilt = TILTS[idx % TILTS.length];
  const catEmoji = CATEGORIES.find((c) => c.id === memory.category)?.emoji ?? "✨";

  const handleClick = () => {
    // on mobile/small or if user wants detail — open modal
    // flip to see note
    setFlipped((p) => !p);
  };

  return (
    <div className="mp-pol-wrap" onClick={handleClick} title={flipped ? "tap to flip back" : "tap to read ♥"}>
      <div
        className={`mp-pol ${flipped ? "flipped" : ""}`}
        style={{ transform: `rotate(${tilt}deg) ${flipped ? "rotateY(180deg)" : ""}` }}
      >
        {/* FRONT */}
        <div className="mp-pol-face" style={{ background: "#f5f0e8" }}>
          <div className="mp-pol-photo" style={{ background: memory.bg }}>
            {memory.photo
              ? <img src={memory.photo} alt={memory.title} />
              : <span style={{ position: "relative", zIndex: 1 }}>{memory.emoji}</span>
            }
            <span className="mp-cat-badge">{catEmoji}</span>
          </div>
          <p className="mp-pol-caption">{memory.caption}</p>
          <span className="mp-pol-date-tag">{memory.date}</span>
          <span className="mp-pol-hint">tap to read ♥</span>
        </div>

        {/* BACK */}
        <div className="mp-pol-back">
          <p className="mp-pol-back-title">{memory.title}</p>
          <p className="mp-pol-back-note">{memory.note}</p>
          {memory.song && (
            <div className="mp-pol-back-song">
              <span>🎵</span>
              <span>{memory.song.title} — {memory.song.film}</span>
            </div>
          )}
          <p className="mp-pol-back-sig">— {YOUR_NAME} ♥</p>
          <p className="mp-pol-back-date">{memory.date}</p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MemoriesPage({ onBack }) {
  const [filter, setFilter]     = useState("all");
  const [modal, setModal]       = useState(null); // null | PINNED | memory obj
  const [pinnedOpen, setPinnedOpen] = useState(false);

  const filtered = filter === "all"
    ? MEMORIES
    : MEMORIES.filter((m) => m.category === filter);

  return (
    <>
      <style>{css}</style>

      {/* ── BACKGROUND ── */}
      <div className="mp-bg" />
      <div className="mp-orb mp-orb-1" />
      <div className="mp-orb mp-orb-2" />
      <div className="mp-stars">
        {STARS.map((s) => (
          <div key={s.id} className="mp-star" style={{
            left: s.left, top: s.top,
            width: s.size, height: s.size,
            animationDuration: s.dur, animationDelay: s.delay,
          }} />
        ))}
      </div>

      <div className="mp-root">

        {/* ── HEADER ── */}
        <div className="mp-header">
          <div className="mp-orn">📸 ♥ 📸</div>
          <h1 className="mp-title">
            Our Memories,<br />
            <span>{HER_NAME}</span>
          </h1>
          <p className="mp-sub">every moment we've lived — written just for you</p>
        </div>

        {/* ── PINNED FAVOURITE ── */}
        <div className="mp-sl">
          <span className="mp-sl-t">📌 my favourite memory</span>
        </div>

        <div className="mp-pinned" onClick={() => setPinnedOpen(true)}>
          <div className="mp-pinned-inner">
            {/* Photo side */}
            <div className="mp-pinned-photo" style={{ background: PINNED.bg }}>
              {PINNED.photo
                ? <img src={PINNED.photo} alt={PINNED.title} />
                : <span style={{ position: "relative", zIndex: 1 }}>{PINNED.emoji}</span>
              }
              <div className="mp-pinned-photo-overlay" />
              <span className="mp-pinned-badge">⭐ Favourite Memory</span>
            </div>
            {/* Content side */}
            <div className="mp-pinned-content">
              <div>
                <p className="mp-pinned-date">{PINNED.date}</p>
                <h2 className="mp-pinned-title">{PINNED.title}</h2>
                <p className="mp-pinned-story">
                  {PINNED.story.split("\n\n").slice(0, 2).join("\n\n")}
                  {"\n\n"}
                  <span style={{ color: "var(--amber)", fontSize: ".85rem", fontStyle: "italic" }}>
                    tap to read the full story →
                  </span>
                </p>
              </div>
              {PINNED.song && (
                <div className="mp-pinned-song">
                  <span className="mp-pinned-song-icon">🎵</span>
                  <span className="mp-pinned-song-info">
                    <strong>{PINNED.song.title}</strong> — {PINNED.song.film}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── CATEGORY FILTER ── */}
        <div className="mp-sl">
          <span className="mp-sl-t">our memory wall</span>
        </div>

        <div className="mp-cats">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`mp-cat ${filter === cat.id ? "active" : ""}`}
              onClick={() => setFilter(cat.id)}
            >
              <span className="mp-cat-emoji">{cat.emoji}</span>
              <span className="mp-cat-label">{cat.label}</span>
            </div>
          ))}
        </div>

        <p className="mp-count" style={{ marginTop: 14 }}>
          {filtered.length} {filtered.length === 1 ? "memory" : "memories"}
          {filter !== "all" && ` in ${CATEGORIES.find(c => c.id === filter)?.label}`}
        </p>

        {/* ── POLAROID GRID ── */}
        <div className="mp-grid">
          {filtered.length === 0 && (
            <div className="mp-empty">no memories here yet — but we're making them ♥</div>
          )}
          {filtered.map((mem, idx) => (
            <Polaroid key={mem.id} memory={mem} idx={idx} onClick={() => setModal(mem)} />
          ))}
        </div>

        {/* ── BACK ── */}
        {onBack && (
          <button className="mp-back" onClick={onBack}>← back to home</button>
        )}
      </div>

      {/* ── PINNED MODAL ── */}
      {pinnedOpen && (
        <div className="mp-modal-bg" onClick={() => setPinnedOpen(false)}>
          <div className="mp-modal" style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button className="mp-modal-close" onClick={() => setPinnedOpen(false)}>✕</button>
            <div className="mp-modal-photo" style={{ background: PINNED.bg }}>
              {PINNED.photo
                ? <img src={PINNED.photo} alt={PINNED.title} />
                : <span style={{ position: "relative", zIndex: 1 }}>{PINNED.emoji}</span>
              }
              <div className="mp-modal-photo-overlay" />
            </div>
            <div className="mp-modal-body" style={{ overflowY: "auto", maxHeight: "55vh" }}>
              <p className="mp-modal-date">{PINNED.date} · pinned favourite</p>
              <h2 className="mp-modal-title">{PINNED.title}</h2>
              <p className="mp-modal-note">{PINNED.story}</p>
              {PINNED.song && (
                <div className="mp-modal-song">
                  <span>🎵</span>
                  <span className="mp-modal-song-text">
                    <strong>{PINNED.song.title}</strong> — {PINNED.song.film}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
