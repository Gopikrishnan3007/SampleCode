import { useState, useEffect, useRef } from "react";

// ─── CONFIG — change these ─────────────────────────────────────────────────
const HER_NAME = "Ranjani";
const YOUR_NAME = "Gopi";
const HER_AGE = 24;               // ← her age this birthday
const LETTER_LINES = [
  `Hey paps,`,
  ``,
  `I know this year is going to be huge for you.`,
  `And I want you to remember something...`,
  ``,
  `Nee achieve pannalam nu nenaikura ellathayum vida`,
  `nee inum 100 madangu achieve panna mudiyum.`,
  ``,
  `Un kitta irukura talent, un kulla irukura power,`,
  `athai nee ipovum full ah realize pannala.`,
  ``,
  `"Don't underestimate the power of Sivaranjani."`,
  ``,
  `Yes. Un peru koode power ah iruku.`,
  `Nee vera level. Nee vera category thango!`,
  ``,
  `Inime dhaan life la problems neraiya varum.`,
  `I know. Namma rendu perukkum konjam kashtama irukum.`,
  `But I want you to know one thing clearly...`,
  ``,
  `Whatever happens, whenever it happens,`,
  `no matter how hard it gets —`,
  `I am here for you. Anytime. Anything.`,
  ``,
  `Morning 3 am kaila kuda nee kuda pesanum na,`,
  `I will be there.`,
  `Nee unakku thonunatha pesalam. Nee cry pannalam.`,
  `Nee silent ah irukalam.`,
  `Whatever you need — I'll be right next to you.`,
  ``,
  `And let me tell you what I see when I look at you...`,
  ``,
  `You are BEAUTIFUL.`,
  `Not just your face — your soul is beautiful.`,
  ``,
  `You are TALENTED.`,
  `Un kai vela pakkatha field eh illa.`,
  `Whatever you touch becomes gold.`,
  ``,
  `You are BRAVE.`,
  `Unaku theriyama nee romba periya vishayangala face paniruka.`,
  `And you're still standing. Still smiling. Still fighting.`,
  ``,
  `You are STRONGER than you think.`,
  `You are SMARTER than you believe.`,
  `You are WORTH more than you know.`,
  ``,
  `And you know what?`,
  `I am so PROUD to call you my Girl.`,
  ``,
  `Yes. You complete me.`,
  `Nee illama naan incomplete dha.`,
  `Nee varum munadi en life la oru gap irundhuchi.`,
  `Nee vandha piragu dhaan enaku purinjichi —`,
  ``,
  `Nee en life ku vandhadhu dhaan,`,
  `enaiku kidaicha best gift.`,
  ``,
  `So please...`,
  `Be happy paps.`,
  `That's my only wish for you.`,
  `Sriruchute iru `,
  ``,
  `Un sirippu dhaan enaku ellam.`,
  `Un happiness dhaan enaku mukkiyam.`,
  ``,
  `So on this day, on your birthday,`,
  `I just want you to know —`,
  ``,
  `You are enough.`,
  `You have always been enough.`,
  `And you will always be enough.`,
  ``,
  `Now go.`,
  `Conquer the world like only you can.`,
  `Because you are Sivaranjani.`,
  `And Sivaranjani can do ANYTHING.`,
  ``,
  `Happy Birthday, my queen.`,
  `My wife. My world. My everything.`,
  ``,
  `— Forever yours,`,
  ` UNNAVAN ♥`,
];

const SONG_URLS = [
  "https://dn711008.ca.archive.org/0/items/04Paartha/Harris%20Jayaraj%20Tamil%20Hit%20Songs/Idhayathai%20Yedho%20Ondru.mp3"
];

const SONGS = [
  { title: "Aththadi Aththadi", artist: "Anegan", url: SONG_URLS[0] }
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Great+Vibes&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --amber:#c8843a;--amber-l:#e8a85a;--amber-p:#f5c887;--amber-dim:#7a4e1e;
  --cream:#fdf6ec;--cream-d:#f0e4cc;
  --dark:#180f05;--dark-2:#1e1208;--dark-3:#2a1a0a;
  --muted:#a07850;--muted-l:#c4a07a;
}
html,body{background:var(--dark);font-family:'Lora',serif;color:var(--cream);min-height:100vh;overflow-x:hidden}

/* ── canvas fireworks ── */
#fireworks{position:fixed;inset:0;z-index:1;pointer-events:none}

/* ── petals ── */
.petals-layer{position:fixed;inset:0;z-index:2;pointer-events:none;overflow:hidden}
.petal{
  position:absolute;top:-40px;border-radius:50% 0 50% 0;
  animation:petalFall linear infinite;opacity:0;
}
@keyframes petalFall{
  0%  {transform:translateY(0) rotate(0deg) translateX(0);opacity:0}
  5%  {opacity:.7}
  90% {opacity:.5}
  100%{transform:translateY(110vh) rotate(720deg) translateX(60px);opacity:0}
}

/* ── stars ── */
.stars{position:fixed;inset:0;z-index:0;pointer-events:none}
.s{position:absolute;border-radius:50%;background:#f5c887;animation:tw ease-in-out infinite}
@keyframes tw{0%,100%{opacity:.06}50%{opacity:.5}}

/* ── background ── */
.bg{
  position:fixed;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 0%,#3d1f08 0%,#180f05 50%,#0a0602 100%),
    radial-gradient(ellipse 50% 40% at 50% 100%,#2a1208 0%,transparent 70%);
}

/* ── root ── */
.root{position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}

/* ── PHASE 1: Name reveal ── */
.phase-name{
  position:fixed;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:var(--dark);
  transition:opacity 1s ease;
}
.phase-name.fade-out{opacity:0;pointer-events:none}

.big-name{
  font-family:'Great Vibes',cursive;
  font-size:clamp(4rem,15vw,8rem);
  color:transparent;
  background:linear-gradient(135deg,var(--amber-p) 0%,var(--amber-l) 40%,var(--amber) 70%,var(--amber-dim) 100%);
  -webkit-background-clip:text;background-clip:text;
  text-align:center;line-height:1.1;
  animation:nameReveal 2s ease forwards;
  filter:drop-shadow(0 0 40px rgba(200,132,58,0.4));
}
@keyframes nameReveal{
  0%  {opacity:0;transform:scale(.85) translateY(20px);letter-spacing:.3em}
  60% {opacity:1;transform:scale(1.03) translateY(-4px);letter-spacing:.08em}
  100%{opacity:1;transform:scale(1) translateY(0);letter-spacing:.06em}
}
.tap-hint{
  margin-top:32px;font-size:.72rem;color:var(--muted);letter-spacing:4px;text-transform:uppercase;
  animation:blink 2s ease infinite 2s;opacity:0;
}
@keyframes blink{0%,100%{opacity:0}50%{opacity:.6}}
.phase-name-sub{
  font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(1rem,3vw,1.4rem);
  color:var(--muted-l);margin-top:16px;text-align:center;opacity:0;
  animation:fadeIn 1s 1.5s ease forwards;
}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* ── PHASE 2: Main content ── */
.main-content{
  width:100%;max-width:700px;margin:0 auto;padding:60px 24px 140px;
  opacity:0;transform:translateY(30px);transition:opacity 1s ease,transform 1s ease;
}
.main-content.visible{opacity:1;transform:translateY(0)}

.cake-row{text-align:center;margin-bottom:40px;animation:cakePop .6s .2s ease both}
@keyframes cakePop{
  0%{transform:scale(0) rotate(-20deg);opacity:0}
  70%{transform:scale(1.2) rotate(5deg)}
  100%{transform:scale(1) rotate(0);opacity:1}
}
.cake-emoji{font-size:clamp(3.5rem,10vw,5.5rem);display:inline-block;animation:cakeFloat 3s ease-in-out infinite .8s}
@keyframes cakeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}

.hb-headline{
  font-family:'Great Vibes',cursive;
  font-size:clamp(2.8rem,9vw,5rem);
  color:transparent;
  background:linear-gradient(135deg,var(--amber-p),var(--amber-l),var(--amber));
  -webkit-background-clip:text;background-clip:text;
  text-align:center;line-height:1.2;margin-bottom:6px;
  animation:fadeIn .8s .3s ease both;
}
.hb-name{
  font-family:'Great Vibes',cursive;
  font-size:clamp(3.5rem,11vw,6.5rem);
  color:var(--amber-l);text-align:center;line-height:1.1;
  animation:fadeIn .8s .5s ease both;
  filter:drop-shadow(0 0 20px rgba(232,168,90,.35));
}
.hb-divider{
  display:flex;align-items:center;gap:16px;margin:28px 0;
  animation:fadeIn .8s .7s ease both;
}
.hb-divider::before,.hb-divider::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,132,58,.4),transparent)}
.hb-divider-icon{color:var(--amber);font-size:1.1rem;opacity:.8}

.age-badge{
  display:flex;justify-content:center;margin-bottom:36px;
  animation:fadeIn .8s .8s ease both;
}
.age-inner{
  border:1px solid rgba(200,132,58,.3);border-radius:50px;
  padding:10px 28px;display:flex;flex-direction:column;align-items:center;gap:8px;
  background:rgba(200,132,58,.06);text-align:center;
}
.age-num{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:300;color:var(--amber-l);line-height:1}
.age-text{font-size:.72rem;color:var(--muted);letter-spacing:1px;text-transform:uppercase;max-width:300px;line-height:1.4}

.letter-wrap{
  background:rgba(253,246,236,.04);border:1px solid rgba(200,132,58,.18);
  border-radius:20px;padding:36px 36px 32px;margin-bottom:36px;
  position:relative;overflow:hidden;
  animation:fadeIn .8s 1s ease both;
}
.letter-wrap::before{
  content:'"';position:absolute;top:-20px;left:16px;
  font-family:'Great Vibes',cursive;font-size:8rem;
  color:rgba(200,132,58,.06);line-height:1;pointer-events:none;
}
.letter-tag{font-size:.65rem;color:var(--amber);letter-spacing:4px;text-transform:uppercase;margin-bottom:20px;opacity:.8}
.letter-line{
  font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,2.8vw,1.15rem);
  font-weight:300;font-style:italic;color:var(--cream);
  line-height:1.85;min-height:1.85em;
  opacity:0;animation:letterIn .5s ease forwards;
}
.letter-line.empty{min-height:.9em}
@keyframes letterIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
.letter-cursor{display:inline-block;width:2px;height:1em;background:var(--amber-l);margin-left:2px;vertical-align:middle;animation:cursorBlink .8s ease infinite}
@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}

.confetti-heart{
  position:fixed;pointer-events:none;z-index:3;
  font-size:1.2rem;animation:confettiFall linear forwards;
}
@keyframes confettiFall{
  0%{transform:translateY(-50px) rotate(0deg);opacity:1}
  100%{transform:translateY(110vh) rotate(720deg);opacity:0}
}

.enter-wrap{text-align:center;animation:fadeIn .8s 1.2s ease both}
.enter-btn{
  display:inline-flex;align-items:center;gap:12px;
  padding:18px 40px;
  background:linear-gradient(135deg,var(--amber) 0%,var(--amber-l) 100%);
  border:none;border-radius:50px;cursor:pointer;
  font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-style:italic;
  color:var(--dark);letter-spacing:.5px;
  transition:all .35s cubic-bezier(.25,.8,.25,1);
  box-shadow:0 8px 32px rgba(200,132,58,.3);
  position:relative;overflow:hidden;
}
.enter-btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 16px 48px rgba(200,132,58,.45)}
.enter-arrow{font-size:1rem;transition:transform .3s}
.enter-btn:hover .enter-arrow{transform:translateX(4px)}
.enter-sub{margin-top:14px;font-size:.72rem;color:rgba(160,120,80,.5);font-style:italic}

.love-note{
  position:fixed;z-index:4;pointer-events:none;
  font-family:'Cormorant Garamond',serif;font-style:italic;
  color:rgba(200,132,58,0.12);font-size:.85rem;
  animation:noteDrift ease-in-out infinite;white-space:nowrap;
}
@keyframes noteDrift{
  0%,100%{transform:translateY(0) rotate(-2deg);opacity:.12}
  50%{transform:translateY(-12px) rotate(2deg);opacity:.22}
}

/* ── music bar ── */
.music-bar{
  position:fixed;left:0;right:0;bottom:0;z-index:100;
  display:flex;align-items:center;gap:16px;padding:12px 20px;
  background:rgba(24,15,5,0.92);backdrop-filter:blur(20px);
  border-top:1px solid rgba(200,132,58,0.15);
}
.music-dot{
  width:8px;height:8px;border-radius:50%;background:var(--amber);
  animation:pulse 1.8s infinite;
}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.5)}}
.music-info{flex:1}
.music-title{font-size:.85rem;color:var(--cream)}
.music-sub{font-size:.7rem;color:var(--muted)}
.music-btns{display:flex;align-items:center;gap:8px}
.music-btn{
  width:32px;height:32px;border-radius:50%;
  border:1px solid rgba(200,132,58,.25);background:none;
  color:var(--amber-l);cursor:pointer;display:flex;align-items:center;justify-content:center;
}
.music-vol{width:70px;-webkit-appearance:none;background:rgba(200,132,58,.2);border-radius:10px;height:4px}
.music-vol::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:var(--amber);cursor:pointer}
`;

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i, left: `${(i * 5.7 + 3) % 100}%`,
  size: `${10 + Math.random() * 14}px`,
  dur: `${6 + i * 0.7}s`, delay: `${i * 0.6}s`,
  color: i % 3 === 0 ? '#f5c887' : i % 3 === 1 ? '#e8a85a' : '#c8843a',
}));

const STARS_D = Array.from({ length: 55 }, (_, i) => ({
  id: i, left: `${(i * 17.3 + 5) % 100}%`, top: `${(i * 23.1 + 3) % 100}%`,
  size: i % 7 === 0 ? 3 : 2, dur: `${2.5 + (i % 5) * .6}s`, delay: `${(i * .35) % 5}s`,
}));

const NOTES = [
  { text: "you are loved", top: "12%", left: "4%", delay: "0s", dur: "5s" },
  { text: "my favourite person", top: "25%", right: "3%", delay: "1.5s", dur: "6s" },
  { text: "happy birthday ♥", top: "60%", left: "2%", delay: "2s", dur: "5.5s" },
  { text: "always, always", top: "75%", right: "5%", delay: "0.8s", dur: "7s" },
];

export default function BirthdayPage({ onEnter }) {
  const [phase, setPhase] = useState("name");
  const [nameOut, setNameOut] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [letterIdx, setLetterIdx] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const [confetti, setConfetti] = useState([]);

  const audioRef = useRef(null);

  useEffect(() => {
    if (nameOut) return;
    const t = setTimeout(() => {
      setNameOut(true);
      spawnConfetti();
      setTimeout(() => {
        setPhase("content");
        setContentVisible(true);
        startLetter();
      }, 1000);
    }, 3200);
    return () => clearTimeout(t);
  }, [nameOut]);

  const handleNameClick = () => {
    if (nameOut) return;
    setNameOut(true);
    spawnConfetti();
    setTimeout(() => {
      setPhase("content");
      setContentVisible(true);
      startLetter();
    }, 1000);
  };

  const startLetter = () => {
    let i = 0;
    const next = () => {
      setLetterIdx(prev => prev + 1);
      i++;
      if (i < LETTER_LINES.length) {
        const delay = LETTER_LINES[i - 1] === "" ? 180 : 260;
        setTimeout(next, delay);
      } else {
        setShowCursor(false);
      }
    };
    setTimeout(next, 800);
  };

  const spawnConfetti = () => {
    const hearts = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      dur: `${1.8 + Math.random() * 2}s`,
      delay: `${Math.random() * 0.8}s`,
      sym: ["♥", "✦", "✿", "★"][i % 4],
      size: `${0.9 + Math.random() * .8}rem`,
    }));
    setConfetti(hearts);
    setTimeout(() => setConfetti([]), 4000);
  };

  return (
    <>
      <style>{css}</style>
      <div className="bg" />
      <div className="stars">{STARS_D.map(s => <div key={s.id} className="s" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDuration: s.dur, animationDelay: s.delay }} />)}</div>
      <div className="petals-layer">
        {PETALS.map(p => (
          <div key={p.id} className="petal" style={{
            left: p.left, width: p.size, height: p.size,
            background: p.color, animationDuration: p.dur, animationDelay: p.delay,
          }} />
        ))}
      </div>

      {phase === "content" && NOTES.map((n, i) => (
        <div key={i} className="love-note" style={{ top: n.top, left: n.left, right: n.right, animationDelay: n.delay, animationDuration: n.dur }}>{n.text}</div>
      ))}

      {confetti.map(c => (
        <div key={c.id} className="confetti-heart" style={{ left: c.left, animationDuration: c.dur, animationDelay: c.delay, fontSize: c.size }}>
          {c.sym}
        </div>
      ))}

      {phase === "name" && (
        <div className={`phase-name ${nameOut ? "fade-out" : ""}`} onClick={handleNameClick}>
          <div className="big-name">{HER_NAME}</div>
          <div className="phase-name-sub">today is entirely yours</div>
          <div className="tap-hint">tap to open ♥</div>
        </div>
      )}

      <div className="root">
        <div className={`main-content ${contentVisible ? "visible" : ""}`}>
          <div className="cake-row">
            <span className="cake-emoji">🎂</span>
          </div>
          <div className="hb-headline">Happy Birthday</div>
          <div className="hb-name">{HER_NAME}</div>
          <div className="hb-divider">
            <span className="hb-divider-icon">♥</span>
          </div>
          <div className="age-badge">
            <div className="age-inner">
              <span className="age-num">{HER_AGE}</span>
              <span className="age-text">
                year start aagiruchu, inime than unmaiyaana valkai innum super ah start aagum.<br />
                intha varusham unakku romba romba super ah irukum nu nenikiren. <br />
                i love you soo much da..
              </span>
            </div>
          </div>

          <div className="letter-wrap">
            <div className="letter-tag">Oru kutti wish.. from {YOUR_NAME}</div>
            {LETTER_LINES.slice(0, letterIdx + 1).map((line, i) => (
              <div key={i} className={`letter-line ${line === "" ? "empty" : ""}`}>
                {line}
                {i === Math.min(letterIdx, LETTER_LINES.length - 1) && showCursor && (
                  <span className="letter-cursor" />
                )}
              </div>
            ))}
          </div>

          {!showCursor && letterIdx >= LETTER_LINES.length - 1 && (
            <div className="enter-wrap">
              <button className="enter-btn" onClick={() => { spawnConfetti(); setTimeout(() => onEnter && onEnter(), 600); }}>
                explore your world
                <span className="enter-arrow">→</span>
              </button>
              <p className="enter-sub">everything was made for you ♥</p>
            </div>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={SONGS[0].url} autoPlay loop />

    </>
  );
}