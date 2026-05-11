import React, { useState, useEffect, useRef } from 'react';

const QUESTIONS = [
  {
    id: "nickname",
    prompt: "Na unakku vacha chella paeru ena?",
    placeholder: "your secret name...",
    hint: "un name thaan ana..., paathi and chellama",
    answer: ["ranju", "ranjani"],
  },
  {
    id: "date",
    prompt: "The night everything changed for me...",
    placeholder: "dd/mm/yyyy",
    hint: "Train journey",
    answer: ["13/05/2022", "13-05-2022", "13.05.2022", "13/5/2022"],
  },
  {
    id: "word",
    prompt: "The word we only say to each other...",
    placeholder: "you receive it when someone arounds you..",
    hint: "different language, same meaning",
    answer: ["tiamo", "ti amo"],
  },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --amber: #c8843a;
    --amber-light: #e8a85a;
    --amber-pale: #f5c887;
    --cream: #fdf6ec;
    --cream-dark: #f0e4cc;
    --warm-dark: #2a1a0a;
    --warm-mid: #5c3d1e;
    --warm-text: #3d2510;
    --warm-muted: #a07850;
  }

  body {
    background: var(--warm-dark);
    font-family: 'Lora', serif;
    min-height: 100vh;
  }

  .login-root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse at 30% 20%, #3d2010 0%, #1a0e05 40%, #0d0703 100%);
  }

  .login-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 50% 80%, rgba(200,132,58,0.13) 0%, transparent 70%),
      radial-gradient(ellipse 40% 30% at 20% 10%, rgba(200,132,58,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 30% 20% at 80% 15%, rgba(240,180,80,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .login-root::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.6;
    pointer-events: none;
    z-index: 1;
  }

  .hearts-layer {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    overflow: hidden;
  }

  .floating-heart {
    position: absolute;
    bottom: -10%;
    color: var(--amber);
    animation: floatUp linear infinite;
    user-select: none;
    font-family: serif;
  }

  @keyframes floatUp {
    0%   { transform: translateY(0) rotate(-10deg) scale(1); opacity: var(--op, 0.12); }
    50%  { transform: translateY(-45vh) rotate(10deg) scale(1.1); }
    100% { transform: translateY(-110vh) rotate(-5deg) scale(0.8); opacity: 0; }
  }

  .stars {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: var(--amber-pale);
    animation: twinkle ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.4); }
  }

  .login-card {
    position: relative;
    z-index: 10;
    width: min(480px, 92vw);
    background: linear-gradient(160deg, rgba(253,246,236,0.07) 0%, rgba(200,132,58,0.04) 100%);
    border: 1px solid rgba(200,132,58,0.25);
    border-radius: 24px;
    padding: 52px 44px 48px;
    backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(200,132,58,0.08),
      0 40px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(200,132,58,0.06),
      inset 0 1px 0 rgba(253,246,236,0.12);
    transition: box-shadow 0.5s ease;
  }

  .login-card.glow-active {
    box-shadow:
      0 0 0 1px rgba(200,132,58,0.4),
      0 40px 80px rgba(0,0,0,0.6),
      0 0 80px rgba(200,132,58,0.25),
      inset 0 1px 0 rgba(253,246,236,0.2);
  }

  .card-top-ornament {
    text-align: center;
    margin-bottom: 6px;
    font-size: 1.3rem;
    color: var(--amber);
    opacity: 0.7;
    letter-spacing: 8px;
  }

  .login-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 5vw, 2.1rem);
    font-weight: 300;
    font-style: italic;
    color: var(--cream);
    text-align: center;
    line-height: 1.3;
    margin-bottom: 6px;
  }

  .login-subtitle {
    font-family: 'Lora', serif;
    font-size: 0.72rem;
    color: var(--warm-muted);
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }

  .step-dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 36px;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(200,132,58,0.2);
    border: 1px solid rgba(200,132,58,0.3);
    transition: all 0.4s ease;
  }

  .dot.done {
    background: var(--amber);
    border-color: var(--amber);
    box-shadow: 0 0 8px rgba(200,132,58,0.6);
  }

  .dot.active {
    background: rgba(200,132,58,0.5);
    border-color: var(--amber-light);
    transform: scale(1.2);
  }

  .question-block {
    animation: fadeSlideIn 0.5s ease forwards;
  }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .question-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.05rem, 3vw, 1.25rem);
    font-weight: 400;
    font-style: italic;
    color: var(--cream);
    line-height: 1.55;
    margin-bottom: 6px;
    text-align: center;
  }

  .question-hint {
    font-size: 0.72rem;
    color: #e8a85a;
    text-align: center;
    margin-bottom: 22px;
    letter-spacing: 1px;
  }

  .input-wrap {
    position: relative;
    margin-bottom: 10px;
  }

  .love-input {
    width: 100%;
    background: rgba(253,246,236,0.05);
    border: 1px solid rgba(200,132,58,0.3);
    border-radius: 12px;
    padding: 15px 20px;
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    color: var(--cream);
    outline: none;
    transition: all 0.3s ease;
    text-align: center;
    letter-spacing: 1px;
  }

  .love-input::placeholder {
    color: rgba(160,120,80,0.5);
    font-style: italic;
  }

  .love-input:focus {
    border-color: rgba(200,132,58,0.7);
    background: rgba(253,246,236,0.08);
    box-shadow: 0 0 0 3px rgba(200,132,58,0.1), 0 0 20px rgba(200,132,58,0.08);
  }

  .love-input.shake {
    animation: shakeIt 0.5s ease;
  }

  @keyframes shakeIt {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }

  .error-msg {
    text-align: center;
    font-size: 0.78rem;
    color: #e8a85a;
    font-style: italic;
    min-height: 20px;
    margin-bottom: 4px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }

  .submit-btn {
    width: 100%;
    margin-top: 18px;
    padding: 15px;
    background: linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%);
    border: none;
    border-radius: 12px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-style: italic;
    font-weight: 500;
    color: var(--warm-dark);
    cursor: pointer;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(200,132,58,0.3);
    position: relative;
    overflow: hidden;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(200,132,58,0.45);
  }

  .submit-btn:hover::after { opacity: 1; }
  .submit-btn:active { transform: translateY(0); }

  .prev-answers {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid rgba(200,132,58,0.12);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .prev-answer-item {
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0.55;
    animation: fadeIn 0.4s ease;
  }

  .prev-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--amber);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: var(--warm-dark);
    flex-shrink: 0;
    box-shadow: 0 0 8px rgba(200,132,58,0.5);
  }

  .prev-answer-text {
    font-size: 0.78rem;
    color: var(--warm-muted);
    font-style: italic;
    font-family: 'Cormorant Garamond', serif;
  }

  .unlock-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse at center, #3d2010 0%, #0d0703 100%);
    animation: fadeInOverlay 0.6s ease forwards;
  }

  @keyframes fadeInOverlay {
    from { opacity: 0; } to { opacity: 1; }
  }

  .unlock-icon {
    font-size: 3.5rem;
    animation: unlockPulse 1.4s ease infinite;
    margin-bottom: 24px;
  }

  @keyframes unlockPulse {
    0%,100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(200,132,58,0.6)); }
    50% { transform: scale(1.15); filter: drop-shadow(0 0 25px rgba(232,168,90,0.9)); }
  }

  .unlock-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.4rem, 5vw, 2rem);
    font-style: italic;
    color: var(--cream);
    text-align: center;
    animation: fadeInUp 0.8s 0.3s ease both;
  }

  .unlock-sub {
    margin-top: 12px;
    font-size: 0.78rem;
    color: var(--warm-muted);
    letter-spacing: 3px;
    text-transform: uppercase;
    animation: fadeInUp 0.8s 0.6s ease both;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .unlock-hearts {
    display: flex;
    gap: 16px;
    margin-top: 28px;
    animation: fadeInUp 0.8s 0.9s ease both;
  }

  .unlock-heart {
    color: var(--amber);
    font-size: 1.4rem;
    animation: heartBeat 0.8s ease infinite;
  }

  .unlock-heart:nth-child(2) { animation-delay: 0.15s; }
  .unlock-heart:nth-child(3) { animation-delay: 0.3s; }

  @keyframes heartBeat {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.3); }
  }

  .card-footer {
    margin-top: 32px;
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.82rem;
    font-style: italic;
    color: rgba(160,120,80,0.45);
    line-height: 1.6;
  }
`;

// ─── Sub-components ────────────────────────────────────────────────────────────

function FloatingHeart({ style }) {
  return React.createElement("div", { className: "floating-heart", style }, "\u2665");
}

// Pre-generate stars once so they don't re-randomise on every render
const STARS = Array.from({ length: 55 }, (_, i) => ({
  key: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDuration: `${2 + Math.random() * 4}s`,
  animationDelay: `${Math.random() * 4}s`,
  opacity: Math.random() * 0.5,
  width: Math.random() > 0.8 ? "3px" : "2px",
  height: Math.random() > 0.8 ? "3px" : "2px",
}));

// ─── Main component ────────────────────────────────────────────────────────────

function LoginPage({ onLogin }) {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [answered, setAnswered] = useState([false, false, false]);
  const inputRef = useRef(null);

  // Auto-focus input on step change
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  // Spawn floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-12),
        {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          animDuration: `${4 + Math.random() * 4}s`,
          size: `${0.7 + Math.random() * 1.2}rem`,
          opacity: 0.08 + Math.random() * 0.18,
          delay: `${Math.random() * 2}s`,
        },
      ]);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleCheck() {
    const current = QUESTIONS[step];
    const userVal = inputs[step].trim().toLowerCase();
    const correctAnswers = Array.isArray(current.answer)
      ? current.answer.map(a => a.trim().toLowerCase())
      : [current.answer.trim().toLowerCase()];

    if (correctAnswers.includes(userVal)) {
      const newAnswered = [...answered];
      newAnswered[step] = true;
      setAnswered(newAnswered);
      setGlow(true);
      setError("");

      setTimeout(() => {
        setGlow(false);
        if (step < QUESTIONS.length - 1) {
          setStep(step + 1);
        } else {
          setUnlocking(true);
          setTimeout(() => { if (onLogin) onLogin(); }, 2800);
        }
      }, 900);
    } else {
      setShake(true);
      setError("Ada mentalu, Okay nalla yosi da thango!");
      setTimeout(() => setShake(false), 600);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleCheck();
  }

  function handleInput(val) {
    const newInputs = [...inputs];
    newInputs[step] = val;
    setInputs(newInputs);
    setError("");
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  const ce = React.createElement;

  // Stars layer
  const starsLayer = ce(
    "div",
    { className: "stars" },
    ...STARS.map((s) =>
      ce("div", {
        key: s.key,
        className: "star",
        style: {
          left: s.left,
          top: s.top,
          animationDuration: s.animationDuration,
          animationDelay: s.animationDelay,
          opacity: s.opacity,
          width: s.width,
          height: s.height,
        },
      })
    )
  );

  // Floating hearts layer
  const heartsLayer = ce(
    "div",
    { className: "hearts-layer" },
    ...hearts.map((h) =>
      ce(FloatingHeart, {
        key: h.id,
        style: {
          left: h.left,
          fontSize: h.size,
          animationDuration: h.animDuration,
          animationDelay: h.delay,
          "--op": h.opacity,
        },
      })
    )
  );

  // Step progress dots
  const stepDots = ce(
    "div",
    { className: "step-dots" },
    ...QUESTIONS.map((_, i) =>
      ce("div", {
        key: i,
        className: `dot ${answered[i] ? "done" : i === step ? "active" : ""}`,
      })
    )
  );

  // Previous correct answers
  const prevAnswers =
    answered.some(Boolean)
      ? ce(
        "div",
        { className: "prev-answers" },
        ...QUESTIONS.slice(0, step).map((q, i) =>
          answered[i]
            ? ce(
              "div",
              { className: "prev-answer-item", key: i },
              ce("div", { className: "prev-check" }, "\u2713"),
              ce("span", { className: "prev-answer-text" }, q.prompt)
            )
            : null
        )
      )
      : null;

  // Current question block
  const questionBlock = ce(
    "div",
    { className: "question-block", key: step },
    ce("p", { className: "question-text" }, QUESTIONS[step].prompt),
    ce("p", { className: "question-hint" }, QUESTIONS[step].hint),
    ce(
      "div",
      { className: "input-wrap" },
      ce("input", {
        ref: inputRef,
        className: `love-input ${shake ? "shake" : ""}`,
        type: "text",
        placeholder: QUESTIONS[step].placeholder,
        value: inputs[step],
        onChange: (e) => handleInput(e.target.value),
        onKeyDown: handleKeyDown,
        autoComplete: "off",
      })
    ),
    ce("div", { className: "error-msg" }, error),
    ce(
      "button",
      { className: "submit-btn", onClick: handleCheck },
      step < QUESTIONS.length - 1 ? "next \u2192" : "open the door \u2665"
    )
  );

  // Unlock overlay
  const unlockOverlay = unlocking
    ? ce(
      "div",
      { className: "unlock-overlay" },
      ce("div", { className: "unlock-icon" }, "\uD83D\uDD13"),
      ce("div", { className: "unlock-text" }, "the door is open, my love"),
      ce("div", { className: "unlock-sub" }, "welcome to your world"),
      ce(
        "div",
        { className: "unlock-hearts" },
        ce("span", { className: "unlock-heart" }, "\u2665"),
        ce("span", { className: "unlock-heart" }, "\u2665"),
        ce("span", { className: "unlock-heart" }, "\u2665")
      )
    )
    : null;

  // Main card
  const card = ce(
    "div",
    { className: `login-card ${glow ? "glow-active" : ""}` },
    ce("div", { className: "card-top-ornament" }, "\u2014 \u2665 \u2014"),
    ce("h1", { className: "login-title" }, "A place made just for you"),
    ce("p", { className: "login-subtitle" }, "answer with your heart"),
    stepDots,
    questionBlock,
    prevAnswers,
    ce(
      "div",
      { className: "card-footer" },
      "\u201CI built this entire world,",
      ce("br", null),
      "so you\u2019d never feel alone in it.\u201D"
    )
  );

  // Root
  return ce(
    React.Fragment,
    null,
    ce("style", null, CSS),
    unlockOverlay,
    ce(
      "div",
      { className: "login-root" },
      starsLayer,
      heartsLayer,
      card
    )
  );
}
export default LoginPage;
