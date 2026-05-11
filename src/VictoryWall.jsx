import React, { useState } from "react";

// ─── CONFIG — REPLACE WITH YOUR DETAILS ────────────────────────────────────
const HER_NAME = "Ranjani";
const YOUR_NAME = "Gopi";

// ─── ACHIEVEMENT DATA — Customize these with her real wins ─────────────────
// Each achievement has:
//   - title: short, punchy name
//   - category: one of the categories below
//   - icon: emoji (crown, star, trophy, sparkle, etc)
//   - yourWords: what YOU write about this victory — make it raw, specific, emotional
//   - date: optional (e.g., "March 2024")
//   - image: optional (leave empty string if none)
const ACHIEVEMENTS = [
  // 🎓 Academic / Career wins
  {
    id: 1,
    title: "That Results Day",
    category: "academic",
    icon: "🎓",
    date: "June 2024",
    yourWords: "The day you got your results — I saw you cry happy tears. I've never been more proud of anyone in my life. You stayed up countless nights, you doubted yourself, but you never stopped. This is yours. You earned every bit of it. Watching you achieve this changed something in me — I realized I was in love with someone unstoppable.",
    image: "",
  },
  {
    id: 2,
    title: "The Job You Deserved",
    category: "academic",
    icon: "💼",
    date: "August 2024",
    yourWords: "You got the offer and you called me shaking. I remember sitting in my room, holding my phone, trying not to cry because I could hear it in your voice — relief, joy, everything. They didn't just hire someone qualified. They hired YOU. And that's so much more.",
    image: "",
  },
  {
    id: 3,
    title: "That Presentation You Nailed",
    category: "academic",
    icon: "🎤",
    yourWords: "You were terrified. You told me 'I'm going to mess up'. You didn't. You stood there and owned the room. Afterwards, people came up to you. That's who you are — someone who turns fear into fire.",
    image: "",
  },

  // 💪 Personal battles she won
  {
    id: 4,
    title: "The Hardest Morning",
    category: "battle",
    icon: "⚔️",
    date: "February 2024",
    yourWords: "You didn't want to get out of bed. I know. But you did. And you made it through that day. And the next. You don't give yourself enough credit for the wars you fight that no one sees. But I see them. And you're winning.",
    image: "",
  },
  {
    id: 5,
    title: "She Said No — To What Hurt Her",
    category: "battle",
    icon: "🛡️",
    yourWords: "Walking away from something that was breaking you — that took more strength than anything else on this wall. You chose yourself. And I've never respected you more.",
    image: "",
  },
  {
    id: 6,
    title: "The Panic Attack She Calmed",
    category: "battle",
    icon: "🌊",
    yourWords: "You were spiraling. Your hands were shaking. And then you breathed. You talked yourself down. I watched you do something incredibly hard — choose to be okay. That's a victory no trophy can measure.",
    image: "",
  },

  // 🌟 Times she helped someone else
  {
    id: 7,
    title: "When You Held Her Hand",
    category: "helped",
    icon: "🤲",
    date: "November 2023",
    yourWords: "Your friend was breaking down. Everyone else stood there awkwardly. You just sat with her. You listened. You didn't fix it — you stayed. That's who you are. The person who stays.",
    image: "",
  },
  {
    id: 8,
    title: "The Advice That Changed Everything",
    category: "helped",
    icon: "💬",
    yourWords: "Someone told me later — 'She said exactly what I needed to hear.' You do that. You give people words they don't even know they're starving for.",
    image: "",
  },
  {
    id: 9,
    title: "You Made Someone Feel Seen",
    category: "helped",
    icon: "👁️",
    yourWords: "You noticed when someone was left out. You made sure they weren't alone. That small thing? It wasn't small to them. It never is.",
    image: "",
  },

  // 😊 Days she chose to be happy despite everything
  {
    id: 10,
    title: "The Rainy Tuesday",
    category: "happiness",
    icon: "☀️",
    date: "July 2024",
    yourWords: "Everything was going wrong. And then you just... danced in the kitchen. You laughed. You chose joy. That day taught me something I'll never forget — happiness isn't what happens to you. It's what you decide.",
    image: "",
  },
  {
    id: 11,
    title: "She Smiled First",
    category: "happiness",
    icon: "😊",
    yourWords: "You were exhausted. Burnt out. And then I made a stupid joke and you laughed — really laughed. That sound is my favorite thing in the world. Thank you for finding reasons to smile. Even on hard days.",
    image: "",
  },

  // 🦋 Ways she has grown
  {
    id: 12,
    title: "She Speaks Softer Now",
    category: "growth",
    icon: "🦋",
    yourWords: "You used to shout when you were scared. Now you pause. You breathe. You've learned that your voice doesn't need to be loud to be heard. I've watched you grow into someone so much more at peace.",
    image: "",
  },
  {
    id: 13,
    title: "She Asks For What She Needs",
    category: "growth",
    icon: "🗣️",
    yourWords: "You told me 'I need you to just listen right now'. That's new. That's brave. You spent so long pretending you didn't need anything. Now you know that asking isn't weakness — it's the opposite.",
    image: "",
  },
  {
    id: 14,
    title: "She Forgave Herself",
    category: "growth",
    icon: "🕊️",
    yourWords: "You carried that guilt for so long. And then one day, you let it go. You said 'I did the best I could'. And you meant it. That's not small. That's everything.",
    image: "",
  },
];

// Category labels and display config
const CATEGORIES = [
  { id: "all", label: "All Victories", icon: "🏆", color: "var(--amber)" },
  { id: "academic", label: "Academic / Career", icon: "🎓", color: "#7aa2c4" },
  { id: "battle", label: "Personal Battles", icon: "⚔️", color: "#d68b6e" },
  { id: "helped", label: "Times She Helped", icon: "🤲", color: "#8fbc8f" },
  { id: "happiness", label: "Chose Happiness", icon: "☀️", color: "#f0c674" },
  { id: "growth", label: "Ways She Grew", icon: "🦋", color: "#b39df0" },
];

// ─── CSS ───────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Great+Vibes&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0f0904;
  font-family: 'Lora', serif;
}

/* background layer */
.vw-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 30%, #2a1a0a 0%, #0f0904 70%, #060301 100%);
  overflow: hidden;
}

.vw-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* soft orbs */
.vw-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}
.vw-orb-1 {
  width: 500px;
  height: 500px;
  background: rgba(200, 132, 58, 0.06);
  top: -150px;
  right: -150px;
}
.vw-orb-2 {
  width: 400px;
  height: 400px;
  background: rgba(180, 100, 40, 0.04);
  bottom: -100px;
  left: -100px;
}
.vw-orb-3 {
  width: 300px;
  height: 300px;
  background: rgba(200, 132, 58, 0.05);
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
}

/* stars */
.vw-stars {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.vw-star {
  position: absolute;
  background: #f5c887;
  border-radius: 50%;
  animation: vwTwinkle ease-in-out infinite;
}
@keyframes vwTwinkle {
  0%, 100% { opacity: 0.08; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

/* main container */
.vw-container {
  position: relative;
  z-index: 10;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 100px;
}

/* header */
.vw-header {
  text-align: center;
  margin-bottom: 48px;
  animation: vwFadeDown 0.8s ease both;
}
@keyframes vwFadeDown {
  from { opacity: 0; transform: translateY(-24px); }
  to { opacity: 1; transform: translateY(0); }
}
.vw-crown-icon {
  font-size: 2.8rem;
  filter: drop-shadow(0 0 12px rgba(200, 132, 58, 0.4));
  margin-bottom: 8px;
}
.vw-header h1 {
  font-family: 'Great Vibes', cursive;
  font-size: clamp(2.5rem, 8vw, 4.2rem);
  font-weight: 400;
  background: linear-gradient(135deg, #f5c887, #e8a85a, #c8843a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
  margin-bottom: 8px;
}
.vw-header-sub {
  font-size: 0.75rem;
  color: #a07850;
  letter-spacing: 4px;
  text-transform: uppercase;
  font-style: italic;
}
.vw-header-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: #c4a07a;
  margin-top: 16px;
  opacity: 0.8;
}

/* category filter */
.vw-category-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  animation: vwFadeUp 0.6s 0.1s ease both;
}
@keyframes vwFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.vw-cat-btn {
  padding: 8px 20px;
  border-radius: 40px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  font-style: italic;
  background: rgba(253, 246, 236, 0.03);
  border: 1px solid rgba(200, 132, 58, 0.2);
  color: #c4a07a;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.vw-cat-btn:hover {
  border-color: rgba(200, 132, 58, 0.6);
  background: rgba(200, 132, 58, 0.08);
  color: #fdf6ec;
  transform: translateY(-2px);
}
.vw-cat-btn.active {
  border-color: #c8843a;
  background: rgba(200, 132, 58, 0.12);
  color: #f5c887;
  box-shadow: 0 0 12px rgba(200, 132, 58, 0.15);
}

/* achievement grid */
.vw-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 64px;
}

/* glowing card */
.vw-card {
  background: rgba(253, 246, 236, 0.04);
  border: 1px solid rgba(200, 132, 58, 0.2);
  border-radius: 28px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
  animation: vwCardAppear 0.5s ease both;
}
@keyframes vwCardAppear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.vw-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 0%, rgba(200, 132, 58, 0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.vw-card:hover {
  transform: translateY(-6px);
  border-color: rgba(200, 132, 58, 0.5);
  background: rgba(253, 246, 236, 0.06);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(200, 132, 58, 0.08);
}
.vw-card:hover::before {
  opacity: 1;
}

.vw-card-icon {
  font-size: 2.2rem;
  margin-bottom: 16px;
  display: inline-block;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
}
.vw-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fdf6ec;
  margin-bottom: 6px;
  line-height: 1.3;
}
.vw-card-date {
  font-size: 0.65rem;
  color: #a07850;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.vw-card-preview {
  font-size: 0.85rem;
  color: #c4a07a;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-style: italic;
  margin-bottom: 18px;
}
.vw-card-read {
  font-size: 0.7rem;
  color: #c8843a;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s;
}
.vw-card:hover .vw-card-read {
  opacity: 1;
  transform: translateX(0);
}

/* category accent border on cards */
.vw-card[data-cat="academic"] { border-left: 3px solid #7aa2c4; }
.vw-card[data-cat="battle"] { border-left: 3px solid #d68b6e; }
.vw-card[data-cat="helped"] { border-left: 3px solid #8fbc8f; }
.vw-card[data-cat="happiness"] { border-left: 3px solid #f0c674; }
.vw-card[data-cat="growth"] { border-left: 3px solid #b39df0; }

/* modal for full achievement */
.vw-modal-bg {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(6, 3, 1, 0.92);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: vwFadeIn 0.25s ease;
}
@keyframes vwFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.vw-modal {
  width: min(600px, 94vw);
  max-height: 85vh;
  overflow-y: auto;
  background: linear-gradient(160deg, rgba(42, 25, 10, 0.98), rgba(24, 14, 6, 0.98));
  border: 1px solid rgba(200, 132, 58, 0.35);
  border-radius: 32px;
  padding: 40px 36px;
  position: relative;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(200, 132, 58, 0.1);
  animation: vwModalPop 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1) both;
  scrollbar-width: thin;
  scrollbar-color: rgba(200, 132, 58, 0.3) transparent;
}
.vw-modal::-webkit-scrollbar { width: 4px; }
.vw-modal::-webkit-scrollbar-track { background: transparent; }
.vw-modal::-webkit-scrollbar-thumb { background: rgba(200, 132, 58, 0.3); border-radius: 4px; }
@keyframes vwModalPop {
  from { opacity: 0; transform: scale(0.94) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.vw-modal-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: #a07850;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
  padding: 6px;
}
.vw-modal-close:hover { color: #fdf6ec; }
.vw-modal-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}
.vw-modal-category {
  text-align: center;
  font-size: 0.65rem;
  color: #c8843a;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.vw-modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-weight: 500;
  color: #fdf6ec;
  text-align: center;
  margin-bottom: 8px;
}
.vw-modal-date {
  text-align: center;
  font-size: 0.7rem;
  color: #a07850;
  letter-spacing: 2px;
  margin-bottom: 28px;
}
.vw-modal-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c8843a, transparent);
  margin: 0 auto 24px;
}
.vw-modal-message {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.85;
  color: #e8d8c4;
  white-space: pre-line;
  background: rgba(200, 132, 58, 0.05);
  padding: 24px;
  border-radius: 20px;
  border-left: 2px solid rgba(200, 132, 58, 0.4);
}
.vw-modal-signature {
  margin-top: 28px;
  text-align: right;
  font-family: 'Great Vibes', cursive;
  font-size: 1.5rem;
  color: #c8843a;
  opacity: 0.7;
}

/* letter section at bottom */
.vw-letter-section {
  margin-top: 40px;
  border-top: 1px solid rgba(200, 132, 58, 0.15);
  padding-top: 48px;
  animation: vwFadeUp 0.6s 0.3s ease both;
}
.vw-letter-preview {
  background: linear-gradient(135deg, rgba(200, 132, 58, 0.08), rgba(200, 132, 58, 0.02));
  border: 1px solid rgba(200, 132, 58, 0.2);
  border-radius: 32px;
  padding: 40px 36px;
  cursor: pointer;
  transition: all 0.35s;
  position: relative;
  overflow: hidden;
}
.vw-letter-preview:hover {
  border-color: rgba(200, 132, 58, 0.5);
  transform: translateY(-4px);
  background: rgba(200, 132, 58, 0.06);
}
.vw-letter-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}
.vw-letter-preview h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 500;
  color: #f5c887;
  margin-bottom: 8px;
}
.vw-letter-preview p {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: #c4a07a;
  line-height: 1.7;
  font-size: 0.95rem;
}
.vw-letter-preview small {
  display: inline-block;
  margin-top: 16px;
  color: #c8843a;
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* full letter modal */
.vw-letter-modal {
  width: min(560px, 94vw);
}
.vw-letter-body {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.9;
  color: #fdf6ec;
  white-space: pre-line;
  margin: 24px 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

/* empty state */
.vw-empty {
  text-align: center;
  padding: 60px 20px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: #a07850;
  font-size: 1rem;
}

/* back button */
.vw-back-btn {
  text-align: center;
  margin-top: 48px;
}
.vw-back-btn button {
  background: none;
  border: 1px solid rgba(200, 132, 58, 0.25);
  border-radius: 40px;
  padding: 10px 28px;
  color: #c4a07a;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-style: italic;
  cursor: pointer;
  transition: all 0.25s;
}
.vw-back-btn button:hover {
  border-color: #c8843a;
  color: #f5c887;
  transform: translateY(-2px);
}

/* responsive */
@media (max-width: 700px) {
  .vw-container { padding: 20px 16px 80px; }
  .vw-grid { gap: 16px; }
  .vw-card { padding: 20px; }
  .vw-modal { padding: 28px 24px; }
  .vw-letter-preview { padding: 28px 24px; }
}
`;

// generate stars
const STARS_DATA = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${(i * 19.3 + 7) % 100}%`,
  top: `${(i * 27.1 + 2) % 100}%`,
  size: i % 7 === 0 ? 3 : 2,
  dur: `${2 + (i % 6) * 0.4}s`,
  delay: `${(i * 0.15) % 4}s`,
}));

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function VictoryWall({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showFullLetter, setShowFullLetter] = useState(false);

  const filteredAchievements =
    activeCategory === "all"
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === activeCategory);

  // the letter at the bottom
  const letterContent = `My dearest ${HER_NAME},

I need you to read this slowly. Because every word here is true, and I need you to actually hear it.

You don't see what I see. I know you don't. When you look in the mirror, you see flaws. You see the days you failed, the times you weren't enough, the moments you broke down.

But here's what I see.

I see someone who gets out of bed on days when the weight of the world feels like too much. I see someone who cries — and then wipes her tears and keeps going. I see someone who has been knocked down more times than I can count, and every single time, she stands back up.

That's not weakness. That's the strongest thing I've ever witnessed.

You think you're too much? Too emotional? Too sensitive? Let me tell you something — your heart is the reason I fall in love with you again every single morning. The way you care, the way you feel everything so deeply — that's not a flaw. That's your superpower.

You've survived things you don't even talk about. You've carried people when you were barely standing yourself. You've smiled when you were falling apart inside. And you never once asked for a medal.

So I'm giving you one anyway. This wall? Every card here is real. Every victory is something you actually did. And I will keep adding to it for as long as I live.

You are not broken. You are not behind. You are not too much or not enough.

You are exactly who you're supposed to be. And I believe in you — not despite your struggles, but because of how you've faced them.

Always, always, always.

— ${YOUR_NAME} ♥`;

  return (
    <>
      <style>{css}</style>

      {/* background */}
      <div className="vw-bg">
        <div className="vw-orb vw-orb-1" />
        <div className="vw-orb vw-orb-2" />
        <div className="vw-orb vw-orb-3" />
      </div>
      <div className="vw-stars">
        {STARS_DATA.map((s) => (
          <div
            key={s.id}
            className="vw-star"
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

      <div className="vw-container">
        {/* header */}
        <div className="vw-header">
          <div className="vw-crown-icon">🏆</div>
          <h1>Her Victory Wall</h1>
          <div className="vw-header-sub">a shrine to everything she's won</div>
          <div className="vw-header-quote">
            "Every battle you thought you lost — I saw you win."
          </div>
        </div>

        {/* category filter */}
        <div className="vw-category-strip">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`vw-cat-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* achievement grid */}
        <div className="vw-grid">
          {filteredAchievements.length === 0 ? (
            <div className="vw-empty">✨ more victories coming soon ✨</div>
          ) : (
            filteredAchievements.map((ach, idx) => (
              <div
                key={ach.id}
                className="vw-card"
                data-cat={ach.category}
                style={{ animationDelay: `${idx * 0.05}s` }}
                onClick={() => setSelectedAchievement(ach)}
              >
                <div className="vw-card-icon">{ach.icon}</div>
                <div className="vw-card-title">{ach.title}</div>
                {ach.date && (
                  <div className="vw-card-date">
                    <span>📅</span> {ach.date}
                  </div>
                )}
                <div className="vw-card-preview">
                  {ach.yourWords.slice(0, 120)}...
                </div>
                <div className="vw-card-read">
                  <span>✦</span> read what I wrote <span>→</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* letter section */}
        <div className="vw-letter-section">
          <div className="vw-letter-preview" onClick={() => setShowFullLetter(true)}>
            <div className="vw-letter-icon">💌</div>
            <h3>Why I Believe In You</h3>
            <p>
              A letter from me to you. Everything I see in you that you might not
              see in yourself. Raw, honest, unfiltered.
            </p>
            <small>open letter →</small>
          </div>
        </div>

        {/* back button */}
        {onBack && (
          <div className="vw-back-btn">
            <button onClick={onBack}>← back to home</button>
          </div>
        )}
      </div>

      {/* achievement modal */}
      {selectedAchievement && (
        <div className="vw-modal-bg" onClick={() => setSelectedAchievement(null)}>
          <div className="vw-modal" onClick={(e) => e.stopPropagation()}>
            <button className="vw-modal-close" onClick={() => setSelectedAchievement(null)}>
              ✕
            </button>
            <div className="vw-modal-icon">{selectedAchievement.icon}</div>
            <div className="vw-modal-category">
              {CATEGORIES.find((c) => c.id === selectedAchievement.category)?.label || "victory"}
            </div>
            <div className="vw-modal-title">{selectedAchievement.title}</div>
            {selectedAchievement.date && (
              <div className="vw-modal-date">{selectedAchievement.date}</div>
            )}
            <div className="vw-modal-divider" />
            <div className="vw-modal-message">{selectedAchievement.yourWords}</div>
            <div className="vw-modal-signature">— {YOUR_NAME}</div>
          </div>
        </div>
      )}

      {/* full letter modal */}
      {showFullLetter && (
        <div className="vw-modal-bg" onClick={() => setShowFullLetter(false)}>
          <div className="vw-modal vw-letter-modal" onClick={(e) => e.stopPropagation()}>
            <button className="vw-modal-close" onClick={() => setShowFullLetter(false)}>
              ✕
            </button>
            <div className="vw-modal-icon">📜</div>
            <div className="vw-modal-category">a letter from {YOUR_NAME}</div>
            <div className="vw-modal-title">Why I Believe In You</div>
            <div className="vw-modal-divider" />
            <div className="vw-letter-body">{letterContent}</div>
            <div className="vw-modal-signature">always, {YOUR_NAME}</div>
          </div>
        </div>
      )}
    </>
  );
}