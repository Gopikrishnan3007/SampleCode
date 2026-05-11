// ============================================================
//  PuzzleOfLove.js  —  Puzzle of Love Page
//  Drop this into your React project as a .js or .jsx file
//  Import: import PuzzleOfLove from './PuzzleOfLove';
// ============================================================

import { useState, useEffect, useRef } from "react";

// ─── CONFIG — CHANGE ALL OF THESE ───────────────────────────────────────────

const HER_NAME = "Priya";
const YOUR_NAME = "Arjun";

// GAME 1 — Quiz questions. Only she can answer these.
// Change questions AND answers to things only you two know.
const QUIZ = [
  {
    q: "What was I wearing the first time we took a photo?",
    options: ["Blue shirt", "White shirt", "Black shirt", "Red shirt"],
    answer: 0, // index of correct option (0-based)
    reveal: "You noticed it before I even introduced myself. 🤍",
  },
  {
    q: "What's the one food I always order when I'm upset?",
    options: ["Maggi", "Ice cream", "parota", "Dosai"],
    answer: 2,
    reveal: "You started keeping it ready without me asking. That's when I knew.",
  },
  {
    q: "What the thing i usealy do with you?",
    options: ["squeezing eyes", "Look other things", "Bite my lip", "Clear my throat"],
    answer: 0,
    reveal: "And you always catch it anyway. Every single time.",
  },
  {
    q: "What's the first word I texted you everytime when you angry?",
    options: ["Edi", "Maaaa....", "paps", "thangame"],
    answer: 1,
    reveal: "For 487 days straight. Some things never change. 🌅",
  },
  {
    q: "Where was the place I told you I loved you first?",
    options: ["On a call", "In a message", "On the rooftop", "At the beach"],
    answer: 3,
    reveal: "I was terrified. You just smiled and said 'I know'. I melted.",
  },
];

// GAME 2 — Scrambled words. These should be meaningful to you both.
// word: the actual word | hint: a clue | story: revealed after unscramble
const SCRAMBLES = [
  {
    word: "PARK",
    hint: "The place we don't forget in our life",
    story: "We had a lot of disscussion. Figths. Love. All emotions in. morning ",
  },
  {
    word: "RANJUU",
    hint: "what I call you when no one's listening",
    story: "The first time it slipped out, I went quiet. You pretended not to notice. Then you smiled at your phone. I saw it.",
  },
  {
    word: "TAKKALI",
    hint: "Your First nikename",
    story: "Romantic word. It is a food. every time.",
  }
];

// GAME 3 — Timeline. Put these moments in the correct order (1 = earliest).
// correctOrder: the right sequence (1-based). Drag/drop to arrange.
const TIMELINE_EVENTS = [
  { id: 1, label: "The day in train", correctOrder: 1 },
  { id: 3, label: "The first fight with you", correctOrder: 3 },
  { id: 4, label: "The 1st family meetup in our collage", correctOrder: 5 },
  { id: 5, label: "Bike ride with you", correctOrder: 4 },
  { id: 2, label: "Our first kiss in our life", correctOrder: 2 },

];

// SEALED LETTERS — one unlocked per game completed
const LETTERS = [
  {
    title: "You Know Me Best",
    from: "after the Quiz",
    body: `Ithula mattum illa ella vishyathulayum ena nee nalla purunju vachurukka \n\n every little weird detail — A to Z. You didn't just fall in love with a version of me. You learned me. All of me.\n`,
  },
  {
    title: "These Words Are Ours",
    from: "after Unscramble",
    body: `Ithe mari tha en life la ella vishyathayum arrange pannitu irukka. \n\n I know your value. namma rendu perum senthu ellathayum sari panni semaiya vaazhalam\n`,
  },
  {
    title: "Our Story, In Order",
    from: "after the Timeline",
    body: `Theriyum nee ellathayum correct ah vachuruva,  ana naan tha maranthuruve haha \n\n but oru sila vishyam nallave nyabagam irukku ella capture aagi store panniruke`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Great+Vibes&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --amber:#c8843a;--al:#e8a85a;--ap:#f5c887;--ad:#7a4e1e;
  --cream:#fdf6ec;--dark:#180f05;--dark2:#1e1208;--dark3:#2a1a0a;
  --muted:#a07850;--mutl:#c4a07a;
  --card:rgba(253,246,236,0.055);--border:rgba(200,132,58,0.22);
  --success:#6dbf7e;
}
html,body{background:var(--dark);font-family:'Lora',serif;color:var(--cream);min-height:100vh;overflow-x:hidden}

/* bg */
.pbg{position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse 80% 50% at 50% 0%,#3d1f08 0%,#180f05 55%,#0a0602 100%)}
.orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(80px)}
.o1{width:500px;height:500px;background:rgba(200,132,58,.07);top:-100px;left:-150px}
.o2{width:350px;height:350px;background:rgba(200,132,58,.05);bottom:0;right:-80px}
.pstars{position:fixed;inset:0;z-index:0;pointer-events:none}
.ps{position:absolute;border-radius:50%;background:#f5c887;animation:tw ease-in-out infinite}
@keyframes tw{0%,100%{opacity:.06}50%{opacity:.5}}

/* layout */
.proot{position:relative;z-index:10;max-width:800px;margin:0 auto;padding:0 20px 120px}

/* header */
.pheader{padding:52px 0 16px;text-align:center;animation:fdown .7s ease both}
@keyframes fdown{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}}
.ph-orn{font-size:.9rem;color:var(--amber);opacity:.5;letter-spacing:12px;margin-bottom:14px}
.ph-title{font-family:'Great Vibes',cursive;font-size:clamp(2.6rem,8vw,4.2rem);color:transparent;background:linear-gradient(135deg,var(--ap),var(--al),var(--amber));-webkit-background-clip:text;background-clip:text;line-height:1.15;margin-bottom:6px}
.ph-sub{font-size:.72rem;color:var(--muted);letter-spacing:3px;text-transform:uppercase}

/* progress bar */
.prog-wrap{margin:28px 0 8px;animation:fup .6s .2s ease both}
@keyframes fup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.prog-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.prog-text{font-size:.7rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase}
.prog-count{font-family:'Cormorant Garamond',serif;font-size:.9rem;color:var(--al);font-style:italic}
.prog-track{height:4px;background:rgba(200,132,58,.15);border-radius:2px;overflow:hidden}
.prog-fill{height:100%;background:linear-gradient(90deg,var(--amber),var(--al));border-radius:2px;transition:width .6s cubic-bezier(.25,.8,.25,1)}

/* section label */
.slabel{display:flex;align-items:center;gap:12px;margin:40px 0 20px}
.slabel::before,.slabel::after{content:'';flex:1;height:1px;background:rgba(200,132,58,.15)}
.slabel-t{font-size:.66rem;color:var(--muted);letter-spacing:3px;text-transform:uppercase;white-space:nowrap}

/* game card */
.gcard{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:32px 28px;margin-bottom:16px;position:relative;overflow:hidden;animation:fup .5s ease both}
.gcard::before{content:'';position:absolute;inset:0;border-radius:20px;background:radial-gradient(ellipse at 20% 0%,rgba(200,132,58,.06) 0%,transparent 60%);pointer-events:none}
.gcard.done{border-color:rgba(109,191,126,.35);background:rgba(109,191,126,.04)}
.gcard-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:20px}
.gcard-num{font-family:'Great Vibes',cursive;font-size:3rem;color:rgba(200,132,58,.2);line-height:1;flex-shrink:0}
.gcard-titles{flex:1}
.gcard-tag{font-size:.62rem;color:var(--amber);letter-spacing:3px;text-transform:uppercase;margin-bottom:5px}
.gcard-title{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-style:italic;color:var(--cream);line-height:1.3}
.gcard-badge{flex-shrink:0;padding:5px 12px;border-radius:20px;font-size:.65rem;letter-spacing:2px;text-transform:uppercase;border:1px solid}
.badge-done{color:var(--success);border-color:rgba(109,191,126,.35);background:rgba(109,191,126,.08)}
.badge-todo{color:var(--muted);border-color:rgba(200,132,58,.2);background:transparent}

/* quiz */
.quiz-q{font-family:'Cormorant Garamond',serif;font-size:clamp(1.05rem,3vw,1.2rem);font-style:italic;color:var(--cream);line-height:1.6;margin-bottom:18px;text-align:center}
.quiz-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.qopt{
  padding:12px 16px;border:1px solid rgba(200,132,58,.22);border-radius:12px;
  background:rgba(253,246,236,.03);cursor:pointer;font-family:'Lora',serif;
  font-size:.82rem;color:var(--mutl);transition:all .25s;text-align:center;
}
.qopt:hover{border-color:var(--amber);color:var(--cream);background:rgba(200,132,58,.08);transform:translateY(-2px)}
.qopt.correct{border-color:rgba(109,191,126,.6);color:var(--success);background:rgba(109,191,126,.1);pointer-events:none}
.qopt.wrong{border-color:rgba(220,80,80,.4);color:rgba(220,80,80,.7);background:rgba(220,80,80,.06);pointer-events:none}
.qopt.disabled{pointer-events:none;opacity:.5}
.quiz-reveal{margin-top:14px;padding:14px 18px;border-left:2px solid var(--amber);background:rgba(200,132,58,.06);border-radius:0 10px 10px 0;font-family:'Cormorant Garamond',serif;font-size:.95rem;font-style:italic;color:var(--mutl);line-height:1.6;animation:fup .4s ease both}
.quiz-progress{display:flex;justify-content:center;gap:8px;margin-top:14px}
.qp-dot{width:7px;height:7px;border-radius:50%;border:1px solid rgba(200,132,58,.3);background:transparent;transition:all .3s}
.qp-dot.done{background:var(--amber);border-color:var(--amber)}
.qp-dot.curr{background:rgba(200,132,58,.4);border-color:var(--al);transform:scale(1.2)}
.quiz-next{margin-top:18px;width:100%;padding:13px;background:linear-gradient(135deg,var(--amber),var(--al));border:none;border-radius:12px;font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:var(--dark);cursor:pointer;transition:all .3s;letter-spacing:.5px}
.quiz-next:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(200,132,58,.35)}
.quiz-done-msg{text-align:center;font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--al);font-size:1rem;padding:8px 0}

/* scramble */
.scr-hint{font-size:.75rem;color:var(--muted);text-align:center;font-style:italic;margin-bottom:16px;letter-spacing:1px}
.scr-wrap{display:flex;flex-direction:column;align-items:center;gap:16px}
.scr-letters{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:4px}
.scr-tile{
  width:42px;height:48px;display:flex;align-items:center;justify-content:center;
  border:1px solid rgba(200,132,58,.3);border-radius:10px;background:rgba(253,246,236,.04);
  font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:500;color:var(--cream);
  cursor:pointer;transition:all .2s;user-select:none;
}
.scr-tile:hover{border-color:var(--amber);background:rgba(200,132,58,.1);transform:translateY(-3px)}
.scr-tile.selected{border-color:var(--al);background:rgba(200,132,58,.18);color:var(--ap);transform:translateY(-3px) scale(1.05)}
.scr-tile.used{opacity:.25;pointer-events:none}
.scr-answer{display:flex;gap:8px;justify-content:center}
.scr-slot{
  width:42px;height:48px;display:flex;align-items:center;justify-content:center;
  border-bottom:2px solid rgba(200,132,58,.35);
  font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:500;color:var(--al);
  transition:all .2s;cursor:pointer;
}
.scr-slot:hover{border-color:var(--amber)}
.scr-slot.filled{border-color:rgba(200,132,58,.6)}
.scr-btns{display:flex;gap:10px;margin-top:8px}
.scr-btn{padding:10px 22px;border-radius:10px;font-family:'Cormorant Garamond',serif;font-size:.9rem;font-style:italic;cursor:pointer;transition:all .25s;letter-spacing:.5px}
.scr-submit{background:linear-gradient(135deg,var(--amber),var(--al));border:none;color:var(--dark)}
.scr-submit:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(200,132,58,.35)}
.scr-reset{background:transparent;border:1px solid rgba(200,132,58,.25);color:var(--muted)}
.scr-reset:hover{border-color:var(--amber);color:var(--mutl)}
.scr-wrong{color:rgba(220,80,80,.8);font-size:.78rem;text-align:center;font-style:italic;animation:shake .4s ease}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.scr-story{margin-top:16px;padding:16px 20px;border-left:2px solid var(--amber);background:rgba(200,132,58,.06);border-radius:0 12px 12px 0;font-family:'Cormorant Garamond',serif;font-size:.95rem;font-style:italic;color:var(--mutl);line-height:1.65;animation:fup .4s ease both}
.scr-items{display:flex;flex-direction:column;gap:10px}
.scr-item-row{display:flex;align-items:center;gap:10px}
.scr-item-dot{width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.65rem;border:1px solid rgba(200,132,58,.3);color:var(--muted)}
.scr-item-dot.done2{background:var(--amber);border-color:var(--amber);color:var(--dark)}
.scr-item-label{font-size:.78rem;color:var(--mutl);font-style:italic}
.scr-item-label.done2{color:var(--al)}

/* timeline */
.tl-instruction{font-size:.78rem;color:var(--muted);text-align:center;font-style:italic;margin-bottom:18px;letter-spacing:.5px}
.tl-list{display:flex;flex-direction:column;gap:10px;margin-bottom:18px}
.tl-item{
  display:flex;align-items:center;gap:14px;padding:14px 18px;
  border:1px solid rgba(200,132,58,.22);border-radius:12px;
  background:rgba(253,246,236,.03);cursor:grab;transition:all .25s;
  user-select:none;
}
.tl-item:hover{border-color:rgba(200,132,58,.45);background:rgba(200,132,58,.06);transform:translateX(3px)}
.tl-item.dragging{opacity:.4;cursor:grabbing}
.tl-item.correct2{border-color:rgba(109,191,126,.5);background:rgba(109,191,126,.06);pointer-events:none}
.tl-handle{color:var(--muted);font-size:1rem;flex-shrink:0;opacity:.5}
.tl-text{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:var(--cream);flex:1}
.tl-num{font-family:'Cormorant Garamond',serif;font-size:.85rem;color:var(--amber);font-style:italic;flex-shrink:0}
.tl-check-btn{width:100%;padding:13px;background:linear-gradient(135deg,var(--amber),var(--al));border:none;border-radius:12px;font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:var(--dark);cursor:pointer;transition:all .3s;letter-spacing:.5px}
.tl-check-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(200,132,58,.35)}
.tl-result{margin-top:12px;text-align:center;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.95rem;animation:fup .4s ease both}
.tl-result.ok{color:var(--success)}
.tl-result.bad{color:rgba(220,80,80,.8)}

/* locked envelope section */
.env-section{margin-top:48px;animation:fup .6s .4s ease both}
.env-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin-top:4px}
.env-card{
  border:1px solid var(--border);border-radius:16px;padding:24px 20px;
  background:var(--card);text-align:center;transition:all .3s;position:relative;overflow:hidden;
}
.env-card.locked{opacity:.55;filter:grayscale(.4)}
.env-card.unlocked{border-color:rgba(200,132,58,.5);cursor:pointer}
.env-card.unlocked:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.4),0 0 24px rgba(200,132,58,.12)}
.env-icon{font-size:2.2rem;margin-bottom:10px;display:block}
.env-title{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;color:var(--cream);margin-bottom:5px}
.env-from{font-size:.65rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase}
.env-lock{font-size:.8rem;color:var(--muted);margin-top:8px;opacity:.6}

/* letter modal */
.modal-bg{position:fixed;inset:0;z-index:200;background:rgba(10,6,2,.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fi .3s ease}
@keyframes fi{from{opacity:0}to{opacity:1}}
.modal{width:min(560px,96vw);background:linear-gradient(160deg,rgba(45,25,10,.97),rgba(30,18,8,.97));border:1px solid rgba(200,132,58,.35);border-radius:24px;padding:40px 36px 36px;position:relative;box-shadow:0 40px 80px rgba(0,0,0,.7),0 0 60px rgba(200,132,58,.08);animation:mpop .4s cubic-bezier(.25,.8,.25,1) both}
@keyframes mpop{from{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
.modal-close{position:absolute;top:16px;right:20px;background:none;border:none;color:var(--muted);font-size:1.2rem;cursor:pointer;transition:color .2s;line-height:1}
.modal-close:hover{color:var(--cream)}
.modal-tag{font-size:.62rem;color:var(--amber);letter-spacing:4px;text-transform:uppercase;margin-bottom:12px}
.modal-title{font-family:'Great Vibes',cursive;font-size:clamp(2rem,6vw,2.8rem);color:var(--al);margin-bottom:4px;line-height:1.2}
.modal-from{font-size:.68rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid rgba(200,132,58,.15)}
.modal-body{font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,2.8vw,1.1rem);font-style:italic;font-weight:300;color:var(--cream);line-height:1.9;white-space:pre-line}
.modal-footer{margin-top:24px;text-align:right;font-family:'Great Vibes',cursive;font-size:1.5rem;color:var(--amber);opacity:.7}
`;

const STARS_D = Array.from({length:45},(_,i)=>({
  id:i,left:`${(i*17.3+5)%100}%`,top:`${(i*23.1+3)%100}%`,
  size:i%7===0?3:2,dur:`${2.5+(i%5)*.6}s`,delay:`${(i*.35)%5}s`,
}));

// ── scramble helpers ──────────────────────────────────────────────────────────
function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function makeScramble(word) {
  const letters = word.split("").map((ch, i) => ({ ch, id: i }));
  return shuffleArr(letters);
}

// ── QuizGame ─────────────────────────────────────────────────────────────────
function QuizGame({ onComplete }) {
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = QUIZ[qi];

  const pick = (idx) => {
    if (chosen !== null) return;
    if (idx === q.answer) {
      setChosen(idx);
      setRevealed(true);
    } else {
      setWrong(idx);
      setTimeout(() => setWrong(null), 800);
    }
  };

  const next = () => {
    if (qi < QUIZ.length-1) {
      setQi(qi+1);
      setChosen(null);
      setWrong(null);
      setRevealed(false);
    } else {
      setFinished(true);
      onComplete();
    }
  };

  if (finished) return <div className="quiz-done-msg">You know me so well. 💛 Letter unlocked ↓</div>;

  return (
    <div>
      <div className="quiz-progress">
        {QUIZ.map((_,i)=>(
          <div key={i} className={`qp-dot ${i<qi?"done":i===qi?"curr":""}`}/>
        ))}
      </div>
      <div className="quiz-q" style={{marginTop:16}}>{q.q}</div>
      <div className="quiz-opts">
        {q.options.map((opt,i)=>(
          <div
            key={i}
            className={`qopt ${chosen===i?"correct":wrong===i?"wrong":chosen!==null?"disabled":""}`}
            onClick={()=>pick(i)}
          >{opt}</div>
        ))}
      </div>
      {revealed && <div className="quiz-reveal">✦ {q.reveal}</div>}
      {revealed && (
        <button className="quiz-next" onClick={next}>
          {qi < QUIZ.length-1 ? "next question →" : "finish quiz ♥"}
        </button>
      )}
    </div>
  );
}

// ── ScrambleGame ──────────────────────────────────────────────────────────────
function ScrambleGame({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState(()=>makeScramble(SCRAMBLES[0].word));
  const [answer, setAnswer] = useState([]);
  const [wrong, setWrong] = useState(false);
  const [storyShown, setStoryShown] = useState(false);
  const [done, setDone] = useState(Array(SCRAMBLES.length).fill(false));

  const cur = SCRAMBLES[idx];

  const pickTile = (tile) => {
    if (answer.find(t=>t.id===tile.id)) return;
    setAnswer(p=>[...p,tile]);
  };
  const removeLast = () => setAnswer(p=>p.slice(0,-1));
  const reset = () => { setAnswer([]); setWrong(false); };

  const submit = () => {
    const typed = answer.map(t=>t.ch).join("");
    if (typed === cur.word) {
      setStoryShown(true);
      const nd = [...done]; nd[idx]=true; setDone(nd);
    } else {
      setWrong(true);
      setTimeout(()=>setWrong(false),700);
      setAnswer([]);
    }
  };

  const nextWord = () => {
    if (idx < SCRAMBLES.length-1) {
      const ni = idx+1;
      setIdx(ni);
      setTiles(makeScramble(SCRAMBLES[ni].word));
      setAnswer([]);
      setStoryShown(false);
      setWrong(false);
    } else {
      onComplete();
    }
  };

  const usedIds = new Set(answer.map(t=>t.id));

  return (
    <div>
      {/* progress */}
      <div className="scr-items" style={{marginBottom:18}}>
        {SCRAMBLES.map((s,i)=>(
          <div key={i} className="scr-item-row">
            <div className={`scr-item-dot ${done[i]?"done2":""}`}>{done[i]?"✓":i+1}</div>
            <span className={`scr-item-label ${done[i]?"done2":""}`}>{done[i]?s.word:s.hint}</span>
          </div>
        ))}
      </div>

      <div className="scr-hint">hint: {cur.hint}</div>
      <div className="scr-wrap">
        {/* answer slots */}
        <div className="scr-answer">
          {cur.word.split("").map((_,i)=>(
            <div key={i} className={`scr-slot ${answer[i]?"filled":""}`} onClick={removeLast}>
              {answer[i]?.ch||""}
            </div>
          ))}
        </div>
        {/* letter tiles */}
        <div className="scr-letters">
          {tiles.map(tile=>(
            <div
              key={tile.id}
              className={`scr-tile ${answer.find(t=>t.id===tile.id)?"used":""}`}
              onClick={()=>pickTile(tile)}
            >{tile.ch}</div>
          ))}
        </div>
        {wrong && <div className="scr-wrong">not quite... try again 🥺</div>}
        {!storyShown && (
          <div className="scr-btns">
            <button className="scr-btn scr-reset" onClick={reset}>clear</button>
            <button className="scr-btn scr-submit" onClick={submit} disabled={answer.length!==cur.word.length}>
              reveal ♥
            </button>
          </div>
        )}
        {storyShown && (
          <>
            <div className="scr-story">✦ {cur.story}</div>
            <button className="quiz-next" style={{marginTop:14}} onClick={nextWord}>
              {idx<SCRAMBLES.length-1?"next word →":"finish ♥"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── TimelineGame ──────────────────────────────────────────────────────────────
function TimelineGame({ onComplete }) {
  const [items, setItems] = useState(()=>shuffleArr(TIMELINE_EVENTS));
  const [dragIdx, setDragIdx] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const dragOver = (e,i) => {
    e.preventDefault();
    if (dragIdx===null||dragIdx===i) return;
    const ni=[...items];
    const [moved]=ni.splice(dragIdx,1);
    ni.splice(i,0,moved);
    setItems(ni);
    setDragIdx(i);
  };

  const check = () => {
    const ok = items.every((item,i)=>item.correctOrder===i+1);
    setChecked(true);
    setCorrect(ok);
    if (ok) { setTimeout(()=>{ setFinished(true); onComplete(); },1200); }
  };

  if (finished) return <div className="quiz-done-msg">Perfect order. Our story, exactly as it happened. 💛 Letter unlocked ↓</div>;

  return (
    <div>
      <div className="tl-instruction">drag the moments into the right order ↕</div>
      <div className="tl-list">
        {items.map((item,i)=>(
          <div
            key={item.id}
            className={`tl-item ${dragIdx===i?"dragging":""} ${checked&&correct?"correct2":""}`}
            draggable
            onDragStart={()=>setDragIdx(i)}
            onDragOver={(e)=>dragOver(e,i)}
            onDragEnd={()=>setDragIdx(null)}
          >
            <span className="tl-handle">⠿</span>
            <span className="tl-text">{item.label}</span>
            <span className="tl-num">#{i+1}</span>
          </div>
        ))}
      </div>
      {!checked && (
        <button className="tl-check-btn" onClick={check}>check the order ♥</button>
      )}
      {checked && (
        <div className={`tl-result ${correct?"ok":"bad"}`}>
          {correct
            ? "✓ Perfect. You know our story by heart. 💛"
            : "Not quite — try rearranging again 🥺"}
        </div>
      )}
      {checked && !correct && (
        <button className="tl-check-btn" style={{marginTop:10}} onClick={()=>setChecked(false)}>try again →</button>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PuzzleOfLove({ onBack }) {
  const [completed, setCompleted] = useState([false,false,false]);
  const [openLetter, setOpenLetter] = useState(null);

  const complete = (i) => setCompleted(p=>{ const n=[...p]; n[i]=true; return n; });
  const totalDone = completed.filter(Boolean).length;

  return (
    <>
      <style>{css}</style>
      <div className="pbg"/>
      <div className="orb o1"/><div className="orb o2"/>
      <div className="pstars">{STARS_D.map(s=><div key={s.id} className="ps" style={{left:s.left,top:s.top,width:s.size,height:s.size,animationDuration:s.dur,animationDelay:s.delay}}/>)}</div>

      <div className="proot">
        {/* Header */}
        <div className="pheader">
          <div className="ph-orn">🧩 ♥ 🧩</div>
          <div className="ph-title">Puzzle of Love</div>
          <div className="ph-sub">little games from our world — only you know the answers</div>
        </div>

        {/* Progress */}
        <div className="prog-wrap">
          <div className="prog-label">
            <span className="prog-text">letters unlocked</span>
            <span className="prog-count">{totalDone} of {LETTERS.length}</span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{width:`${(totalDone/LETTERS.length)*100}%`}}/>
          </div>
        </div>

        {/* ── GAME 1: Quiz ── */}
        <div className="slabel"><span className="slabel-t">game one</span></div>
        <div className={`gcard ${completed[0]?"done":""}`}>
          <div className="gcard-top">
            <span className="gcard-num">01</span>
            <div className="gcard-titles">
              <div className="gcard-tag">how well do you know us?</div>
              <div className="gcard-title">The Love Quiz</div>
            </div>
            <div className={`gcard-badge ${completed[0]?"badge-done":"badge-todo"}`}>
              {completed[0]?"✓ done":"5 questions"}
            </div>
          </div>
          <QuizGame onComplete={()=>complete(0)}/>
        </div>

        {/* ── GAME 2: Scramble ── */}
        <div className="slabel"><span className="slabel-t">game two</span></div>
        <div className={`gcard ${completed[1]?"done":""}`}>
          <div className="gcard-top">
            <span className="gcard-num">02</span>
            <div className="gcard-titles">
              <div className="gcard-tag">words only we know</div>
              <div className="gcard-title">Unscramble My Love</div>
            </div>
            <div className={`gcard-badge ${completed[1]?"badge-done":"badge-todo"}`}>
              {completed[1]?"✓ done":"4 words"}
            </div>
          </div>
          <ScrambleGame onComplete={()=>complete(1)}/>
        </div>

        {/* ── GAME 3: Timeline ── */}
        <div className="slabel"><span className="slabel-t">game three</span></div>
        <div className={`gcard ${completed[2]?"done":""}`}>
          <div className="gcard-top">
            <span className="gcard-num">03</span>
            <div className="gcard-titles">
              <div className="gcard-tag">our story, in order</div>
              <div className="gcard-title">The Love Timeline</div>
            </div>
            <div className={`gcard-badge ${completed[2]?"badge-done":"badge-todo"}`}>
              {completed[2]?"✓ done":"5 moments"}
            </div>
          </div>
          <TimelineGame onComplete={()=>complete(2)}/>
        </div>

        {/* ── Sealed Letters ── */}
        <div className="env-section">
          <div className="slabel"><span className="slabel-t">your sealed letters</span></div>
          <div className="env-grid">
            {LETTERS.map((letter,i)=>(
              <div
                key={i}
                className={`env-card ${completed[i]?"unlocked":"locked"}`}
                onClick={()=>completed[i]&&setOpenLetter(i)}
              >
                <span className="env-icon">{completed[i]?"💌":"🔒"}</span>
                <div className="env-title">{letter.title}</div>
                <div className="env-from">{letter.from}</div>
                {!completed[i] && <div className="env-lock">complete the game to unlock</div>}
                {completed[i] && <div className="env-lock" style={{color:"var(--al)",opacity:.8}}>tap to read ♥</div>}
              </div>
            ))}
          </div>
        </div>

        {/* back */}
        {onBack && (
          <div style={{textAlign:"center",marginTop:40}}>
            <button onClick={onBack} style={{background:"none",border:"1px solid rgba(200,132,58,.2)",borderRadius:10,padding:"10px 24px",color:"var(--muted)",fontFamily:"'Cormorant Garamond',serif",fontSize:".9rem",fontStyle:"italic",cursor:"pointer",transition:"all .25s"}}
              onMouseOver={e=>e.target.style.borderColor="var(--amber)"}
              onMouseOut={e=>e.target.style.borderColor="rgba(200,132,58,.2)"}
            >← back to home</button>
          </div>
        )}
      </div>

      {/* Letter Modal */}
      {openLetter!==null && (
        <div className="modal-bg" onClick={()=>setOpenLetter(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setOpenLetter(null)}>✕</button>
            <div className="modal-tag">a letter from {YOUR_NAME}</div>
            <div className="modal-title">{LETTERS[openLetter].title}</div>
            <div className="modal-from">unlocked {LETTERS[openLetter].from}</div>
            <div className="modal-body">{LETTERS[openLetter].body}</div>
            <div className="modal-footer">— {YOUR_NAME} ♥</div>
          </div>
        </div>
      )}
    </>
  );
}
