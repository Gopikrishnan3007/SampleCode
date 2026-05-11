// ============================================================
//  KavithaiCorner.js  —  Your Poetry Page
//  Import: import KavithaiCorner from './KavithaiCorner';
//  Usage:  <KavithaiCorner onBack={() => navigate('/home')} />
// ============================================================

import { useState, useEffect, useRef } from "react";

// ─── CONFIG — REPLACE WITH YOUR OWN KAVITHAI ────────────────────────────────
const YOUR_NAME = "Gopi";
const HER_NAME  = "Ranjani";

// Categories — feel free to add/remove
const CATEGORIES = ["அனைத்தும்", "காதல்", "பாரதி", "ஊக்கம்", "வலி", "கண்கள்", "இரவு", "பிறந்தநாள்"];
// Translation: All, Eyes, Night, Love, Pain, Birthday

const POEMS = [
  // ── BIRTHDAY SPECIAL — shown first, always featured ──────────────────────
  {
    id: 1,
    title: "இன்று உன் நாள்",
    titleEn: "Today Is Yours",
    category: "பிறந்தநாள்",
    isFeatured: true,
    lang: "tamil", // "tamil" | "english" | "mixed"
    lines: [
      "இன்று உலகம் உன்னோடு பிறந்தது,",
      "நட்சத்திரங்கள் உன் பெயர் சொன்னது,",
      "காற்று உன் கன்னம் தொட்டது —",
      "நான் மட்டும் தூரத்தில் நின்று",
      "புன்னகைத்தேன்.",
      "",
      "என் உலகம் உன்னால் தான்,",
      "என் வார்த்தைகள் உன்னால் தான்,",
      "இந்த கவிதை உன்னால் தான்.",
      "",
      "பிறந்தநாள் வாழ்த்துக்கள், என் அன்பே.",
    ],
    note: "The first poem I wrote thinking only of you. Every word arrived on its own — I just wrote them down.",
  },
  // ── EYES ──────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "உன் கண்கள்",
    titleEn: "Your Eyes",
    category: "கண்கள்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "உன் கண்களில் நான் தொலைந்தேன்,",
      "திரும்பி வர மறந்தேன்.",
      "",
      "ஒரு பார்வை போதும்,",
      "என் வார்த்தைகள் எல்லாம்",
      "மறந்து போகின்றன.",
      "",
      "கடல் பார்க்கின்றேன் —",
      "உன் கண்களை நினைக்கின்றேன்.",
    ],
    note: "Written at 11pm, staring at the ceiling, thinking of the exact way you look when you're not paying attention.",
  },
  // ── NIGHT ─────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "இரவு கவிதை",
    titleEn: "A Night Poem",
    category: "இரவு",
    isFeatured: false,
    lang: "mixed",
    lines: [
      "இரவு வருகிறது —",
      "நீ இல்லாமல்.",
      "",
      "நான் தூங்குவதில்லை,",
      "நீ நினைவில் வருகிறாய்.",
      "",
    ],
    note: "Tamil and English mixed — like us. We never fit neatly into one thing. That's what makes us us.",
  },
  // ── LOVE ──────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "காதல் என்பது",
    titleEn: "What Love Is",
    category: "காதல்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "காதல் என்பது",
      "பெரிய விஷயம் இல்லை —",
      "",
      "உன் குரல் கேட்கும்போது",
      "மனம் அமைதியாகும்.",
      "",
      "உன் சிரிப்பு பார்க்கும்போது",
      "எல்லாம் சரியாகும்.",
      "",
      "அது தான் காதல்.",
      "அது தான் நீ.",
    ],
    note: "I tried to write something grand and poetic. But love, with you, is quiet. So the poem became quiet too.",
  },
  // ── PAIN ──────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "தூரம்",
    titleEn: "Distance",
    category: "வலி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "தூரம் என்பது",
      "இடம் மட்டும் இல்லை —",
      "",
      "நீ பேசாத நாட்கள்,",
      "நான் புரிந்துகொள்ளாத நேரங்கள்,",
      "அதுவும் தூரம்.",
      "",
      "ஆனால் நாம் திரும்புகிறோம்.",
      "எப்போதும் திரும்புகிறோம்.",
      "",
      "அதுவே நமது வலிமை.",
    ],
    note: "Written after our hardest week. I didn't want to erase it — it's honest. And we got through it.",
  },
  // ── ENGLISH NIGHT POEM ────────────────────────────────────────────────────
  {
    id: 6,
    title: "Written At Midnight",
    titleEn: "Written At Midnight",
    category: "இரவு",
    isFeatured: false,
    lang: "english",
    lines: [
      "I don't know how to tell you",
      "what you feel like.",
      "",
      "Like the first five minutes",
      "of a song you didn't know",
      "you needed.",
      "",
      "Like the lights coming back on.",
      "Like exhaling.",
      "",
      "Like home.",
    ],
    note: "Some feelings don't translate. This one didn't need to.",
  },
  // ── BHARATHI KAVITHAI ─────────────────────────────────────────────────────
  {
    id: 7,
    title: "பாயும் ஒளி நீ எனக்கு",
    titleEn: "You Are My Light",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "பாயும் ஒளி நீ எனக்கு, பார்க்கும் விழி நான் உனக்கு,",
      "தோயும் மது நீ எனக்கு, தும்பி அடி நான் உனக்கு.",
      "",
      "வாயுரைக்க வருகுதில்லை, வாளின் நின்றன் மேன்மையெல்லாம்,",
      "தூய சுடர் வானொலியே, சூரையமுதே கண்ணம்மா!",
    ],
    note: "Mahakavi Bharathiyar's words are eternal. Every time I read this, I see you in the light he describes.",
  },
  // ── MOTIVATION ────────────────────────────────────────────────────────────
  {
    id: 8,
    title: "உன் கனவுகள்",
    titleEn: "Your Dreams",
    category: "ஊக்கம்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "நீ காணும் கனவுகள் தனித்தனி அல்ல,",
      "நமது இலட்சியங்கள் ஒன்றிணைந்தவை.",
      "",
      "உன் அன்பும் நம்பிக்கையும் இருக்கும் வரை,",
      "எந்த சவாலையும் எதிர்கொள்ளும் வீரம்",
      "என்னுள் பிறக்கிறது.",
      "",
      "நீ என் காதலி மட்டுமல்ல,",
      "என் வாழ்வின் உந்துசக்தியும் நீயே!",
    ],
    note: "For the days when you feel like the world is heavy. You are not alone in this fight.",
  },
  // ── EMOTIONAL LOVE ────────────────────────────────────────────────────────
  {
    id: 9,
    title: "உன் அருகாமை",
    titleEn: "Your Presence",
    category: "காதல்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "ஆயிரம் உறவுகள் சூழ்ந்திருந்தாலும்,",
      "உன் மௌனமான அருகாமை தரும் அமைதி",
      "எதிலும் கிடைப்பதில்லை.",
      "",
      "என் ஒவ்வொரு சுவாசத்திலும்",
      "நீ கலந்திருக்கிறாய்!",
    ],
    note: "Sometimes words are too loud. I just like being in the same room as you.",
  },
  // ── ABOUT HER ─────────────────────────────────────────────────────────────
  {
    id: 10,
    title: "எனது தேவதை",
    titleEn: "My Angel",
    category: "காதல்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "எத்தனை கவிதைகள் எழுதினாலும்,",
      "உன் கண்களைப் பார்த்துச் சொல்லும்",
      "அந்த ஒரு 'காதல்' வார்த்தைக்கு",
      "ஈடாகாது.",
      "",
      "கடவுள் எனக்கு கொடுத்த",
      "மிகச்சிறந்த பரிசு நீ.",
    ],
    note: "Plain and simple. You are the best thing that ever happened to me.",
  },
  // ── DEEP EMOTIONAL ────────────────────────────────────────────────────────
  {
    id: 11,
    title: "மௌனத்தின் மொழி",
    titleEn: "Language of Silence",
    category: "வலி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "வார்த்தைகள் தோற்கும் இடத்தில்",
      "உன் பார்வை பேசுகிறது.",
      "",
      "நீ அழுதால் என் கண்கள் நனைகின்றன,",
      "நீ சிரித்தால் என் உலகம் விடியுகிறது.",
      "",
      "உன் வலிகளை என்னிடம் தந்துவிடு,",
      "உன் மகிழ்ச்சியை மட்டும்",
      "நீ வைத்துக்கொள்.",
    ],
    note: "I wish I could take every pain you feel and carry it for you.",
  },
  // ── MOTIVATIONAL 2 ────────────────────────────────────────────────────────
  {
    id: 12,
    title: "வீழ்வதில்லை நாம்",
    titleEn: "We Shall Not Fall",
    category: "ஊக்கம்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "சிறகுகள் தளர்ந்தாலும்,",
      "உன் நம்பிக்கை என்னை பறக்க வைக்கும்.",
      "",
      "உலகம் நம்மை எதிர்த்தாலும்,",
      "உன் கைக்கோர்த்து நான் நடப்பேன்.",
      "",
      "நமது காதல் வெறும் கதை அல்ல,",
      "அது ஒரு வரலாறு.",
    ],
    note: "We are building something beautiful, one day at a time.",
  },
  // ── BHARATHIYAR - EYES ────────────────────────────────────────────────────
  {
    id: 13,
    title: "சுட்டும் விழிச் சுடர்",
    titleEn: "The Sparkling Light of Your Eyes",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "சுட்டும் விழிச் சுடர் தான் கண்ணம்மா!",
      "சூரிய சந்திரரோ?",
      "",
      "வட்டக் கரிய விழி — கண்ணம்மா!",
      "வானக்கருமை கொல்லோ?",
      "",
      "பட்டுக் கருநீலப் புடவை",
      "பதித்த நல்வயிரம் —",
      "நட்ட நடுநிசியில் — தெரியும்",
      "நட்சத்திரங்களோ?",
    ],
    note: "Bharathiyar compares your eyes to the sun, the moon, and the midnight stars. He's right.",
  },
  // ── BHARATHIDASAN - POWER OF LOVE ─────────────────────────────────────────
  {
    id: 14,
    title: "கண்ணின் கடைப்பார்வை",
    titleEn: "The Corner of Your Eye",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "கண்ணின் கடைப்பார்வை காதலியர் காட்டிவிட்டால்",
      "மண்ணில் குமரருக்கு மாமலையும் ஓர் கடுகாம்!",
      "",
      "சிரிப்பில் ஒரு பாதி —",
      "சிந்தும் விழி வீச்சில் ஒரு பாதி —",
      "உலகையே வெல்லும் வலிமை",
      "அங்கே ஒளிந்திருக்கிறது.",
    ],
    note: "Bharathidasan says a single glance from you makes mountains feel like mustard seeds. That's how much power you give me.",
  },
  // ── BHARATHIYAR - LONGING ─────────────────────────────────────────────────
  {
    id: 15,
    title: "காற்றின் வெளியிடை",
    titleEn: "In the Open Air",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "காற்றின் வெளியிடை கண்ணம்மா!",
      "நின்றன் காதலை எண்ணிக் களிக்கின்றேன்!",
      "",
      "நித்தம் நின்றன் நினைவு —",
      "நெஞ்சில் நெருப்பாய் எரிகிறது.",
      "",
      "ஆயினும் அது இனிக்கிறது —",
      "உன் நினைவுகள் இல்லாத நொடிகள்",
      "எனக்கு வாழ்வே இல்லை.",
    ],
    note: "Thinking of you in the wind. Your memory is a fire that warms me instead of burning.",
  },
  // ── MODERN - NIGHT & MOON ─────────────────────────────────────────────────
  {
    id: 16,
    title: "நிலவும் நீயும்",
    titleEn: "The Moon and You",
    category: "இரவு",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "வானத்தில் இருப்பது ஒரு நிலவு,",
      "வாழ்க்கையில் இருப்பது உன் நிலவு.",
      "",
      "அது பகலில் மறைந்துவிடும்,",
      "நீயோ என் பகலிலும்",
      "ஒளி தருகிறாய்.",
      "",
      "இரவு அழகானது —",
      "நீ என்னுடன் பேசும்போது மட்டும்.",
    ],
    note: "The real moon is jealous of how much brighter you make my life.",
  },
  // ── MOTIVATION - STANDING TALL ────────────────────────────────────────────
  {
    id: 17,
    title: "நிமிர்ந்து நில்",
    titleEn: "Stand Tall",
    category: "ஊக்கம்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "தடைகள் ஆயிரம் வரட்டும் —",
      "உன் புன்னகை அதை உடைக்கட்டும்.",
      "",
      "தோல்விகள் உன்னை தொடரட்டும் —",
      "உன் விடாமுயற்சி அதை வெல்லட்டும்.",
      "",
      "நான் இருக்கிறேன் உனக்காக,",
      "நாம் நடப்போம் நமக்காக.",
    ],
    note: "Whatever you're facing today, remember you've survived 100% of your hard days so far. Keep going.",
  },
  // ── EMOTIONAL - MY WORLD ──────────────────────────────────────────────────
  {
    id: 18,
    title: "எனது உலகம்",
    titleEn: "My Whole World",
    category: "காதல்",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "உனக்கும் எனக்கும் இடையில்",
      "வார்த்தைகள் தேவையில்லை.",
      "",
      "உன் மௌனம் எனக்குப் புரிகிறது,",
      "உன் கண்ணீர் எனக்கு வலிக்கிறது.",
      "",
      "நீ தான் என் உலகம் —",
      "அதில் நான் வெறும் பயணி அல்ல,",
      "உன் அன்பில் வாழும் உயிர்.",
    ],
    note: "I don't need the whole world to love me. I just need you.",
  },
  // ── BHARATHIYAR - KANNAMMA 2 ──────────────────────────────────────────────
  {
    id: 19,
    title: "சோலை மலரொளியோ",
    titleEn: "Light of the Garden Flowers",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "சோலை மல ரொளியோ —",
      "உனது சுந்தரப் புன்னகைதான்?",
      "",
      "நீலக் கடலலையே —",
      "உனது நெஞ்சி லலைக ளடீ!",
      "",
      "கோலக் குயி லோசை —",
      "உனது குரலி னிமை யடீ!",
      "",
      "வாலைக் குமரி யடீ! — கண்ணம்மா!",
      "மருவக் காதல் கொண்டேன்.",
    ],
    note: "Your smile is the light of the flowers, and your voice is the song of the Kuyil. Bharathi captured you perfectly.",
  },
  // ── BHARATHIYAR - ROMANTIC ────────────────────────────────────────────────
  {
    id: 20,
    title: "கன்னத்து முத்தம்",
    titleEn: "A Kiss on the Cheek",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "சாத்திரம் பேசு கிறாய், — கண்ணம்மா!",
      "சாத்திர மேதுக் கடீ!",
      "",
      "ஆத்திரங் கொண்டவர்க்கே — கண்ணம்மா!",
      "சாத்திர முண்டோ டீ!",
      "",
      "மூத்தவர் சம்மதியில் — வதுவை",
      "முறைகள் பின்பு செய்வோம்;",
      "",
      "காத்திருப்பேனோ டீ! — இதுபார்,",
      "கன்னத்து முத்த மொன்று!",
    ],
    note: "Bharathi says rules don't apply to those in love. A kiss on the cheek is worth more than a thousand books.",
  },
  // ── BHARATHIYAR - AFFECTION ───────────────────────────────────────────────
  {
    id: 21,
    title: "சின்னஞ்சிறு கிளியே",
    titleEn: "My Little Bird",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "சின்னஞ் சிறுகிளியே — கண்ணம்மா!",
      "செல்வக் களஞ்சியமே!",
      "",
      "என்னைக் கலிதீர்த்தே — உலகில்",
      "ஏற்றம் புரியவந்தாய்!",
      "",
      "பிள்ளைக் கனியமுதே — கண்ணம்மா!",
      "பேசும்பொற் சித்திரமே!",
      "",
      "அள்ளியணைத்திடவே — என் முன்னே",
      "ஆடிவருந் தேனே!",
    ],
    note: "You are the 'Selva Kalanjiyam' (treasure of wealth) that ended my sorrows. My golden painting that speaks.",
  },
  // ── BHARATHIYAR - BEAUTY ──────────────────────────────────────────────────
  {
    id: 22,
    title: "அமுதூற்றினை ஒத்த இதழ்கள்",
    titleEn: "Lips Like a Fountain of Nectar",
    category: "பாரதி",
    isFeatured: false,
    lang: "tamil",
    lines: [
      "அமுதூற்றினை ஒத்த இதழ்களும் —",
      "நிலவூறித் ததும்பும் விழிகளும் —",
      "",
      "பத்து மாற்றுப்பொன் னொத்தநின்",
      "மேனியும் — இந்த",
      "வையத் தமுதினைப் போன்றதே.",
      "",
      "கண்ணம்மா... உன்னை எண்ணியே",
      "நான் வாழ்கிறேன்.",
    ],
    note: "Your lips are nectar, your eyes are moonlight, and your heart is pure gold.",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Great+Vibes&family=Noto+Serif+Tamil:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --amber:#c8843a;--al:#e8a85a;--ap:#f5c887;--ad:#7a4e1e;
  --cream:#fdf6ec;--cream2:#f0e4cc;
  --dark:#0f0904;--dark2:#180f05;--dark3:#221508;--dark4:#2e1c0a;
  --muted:#a07850;--mutl:#c4a07a;--mutd:#6b4e2a;
  --card:rgba(253,246,236,0.05);--border:rgba(200,132,58,0.2);
}
html,body{background:var(--dark);font-family:'Lora',serif;color:var(--cream);min-height:100vh;overflow-x:hidden}

/* ── candle bg ── */
.kbg{
  position:fixed;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 100% 60% at 50% 100%,#2a1208 0%,transparent 60%),
    radial-gradient(ellipse 70% 50% at 50% 0%,#2e1508 0%,#0f0904 55%,#060401 100%);
}
.kbg::after{
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  opacity:.7;pointer-events:none;
}

/* ── candle glow orbs ── */
.korb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(90px)}
.ko1{width:600px;height:400px;background:rgba(200,120,40,.08);bottom:-100px;left:50%;transform:translateX(-50%)}
.ko2{width:300px;height:300px;background:rgba(200,132,58,.05);top:10%;left:5%}
.ko3{width:250px;height:250px;background:rgba(240,160,60,.04);top:20%;right:5%}

/* ── stars ── */
.kstars{position:fixed;inset:0;z-index:0;pointer-events:none}
.ks{position:absolute;border-radius:50%;background:#f5c887;animation:ktw ease-in-out infinite}
@keyframes ktw{0%,100%{opacity:.05}50%{opacity:.4}}

/* ── candle flicker ── */
.candle-row{display:flex;justify-content:center;gap:40px;margin-bottom:32px;animation:fadeIn .8s ease both}
.candle{display:flex;flex-direction:column;align-items:center;gap:0}
.flame{
  width:10px;height:20px;
  background:radial-gradient(ellipse at 50% 80%,#fff 0%,var(--ap) 30%,var(--al) 60%,transparent 100%);
  border-radius:50% 50% 20% 20%;
  animation:flicker 2s ease-in-out infinite;
  filter:drop-shadow(0 0 6px rgba(245,200,135,.8));
  position:relative;
}
.flame::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:4px;height:6px;background:var(--ap);border-radius:0 0 2px 2px;opacity:.6}
@keyframes flicker{
  0%,100%{transform:scaleX(1) scaleY(1) rotate(0deg);opacity:1}
  25%{transform:scaleX(.9) scaleY(1.05) rotate(-2deg);opacity:.9}
  50%{transform:scaleX(1.05) scaleY(.97) rotate(1deg);opacity:1}
  75%{transform:scaleX(.95) scaleY(1.03) rotate(-1deg);opacity:.95}
}
.candle-body{width:14px;height:48px;background:linear-gradient(180deg,var(--cream2) 0%,#e8d4b4 100%);border-radius:2px;position:relative;overflow:hidden}
.candle-body::after{content:'';position:absolute;top:0;left:3px;right:3px;height:100%;background:rgba(255,255,255,.15);border-radius:1px}
.candle-base{width:18px;height:4px;background:rgba(200,132,58,.3);border-radius:1px}
.wax-drip{position:absolute;width:4px;height:10px;background:rgba(240,220,190,.6);border-radius:0 0 3px 3px}

/* ── layout ── */
.kroot{position:relative;z-index:10;max-width:780px;margin:0 auto;padding:0 22px 100px}

/* ── header ── */
.kheader{padding:52px 0 24px;text-align:center;animation:kfadeDown .8s ease both}
@keyframes kfadeDown{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}}
.kh-orn{font-size:.85rem;color:var(--amber);opacity:.45;letter-spacing:14px;margin-bottom:20px}
.kh-title{font-family:'Great Vibes',cursive;font-size:clamp(2.8rem,9vw,5rem);color:transparent;background:linear-gradient(135deg,var(--ap) 0%,var(--al) 45%,var(--amber) 80%);-webkit-background-clip:text;background-clip:text;line-height:1.15;margin-bottom:10px;filter:drop-shadow(0 0 30px rgba(200,132,58,.2))}
.kh-sub{font-size:.7rem;color:var(--muted);letter-spacing:3px;text-transform:uppercase;margin-bottom:6px}
.kh-quote{font-family:'Cormorant Garamond',serif;font-size:.9rem;font-style:italic;color:var(--mutd);margin-top:8px}

/* ── category filter ── */
.cat-strip{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:28px 0 36px;animation:kfu .6s .2s ease both}
@keyframes kfu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.cat-btn{
  padding:7px 18px;border-radius:30px;font-family:'Cormorant Garamond',serif;
  font-size:.88rem;font-style:italic;cursor:pointer;transition:all .25s;
  border:1px solid rgba(200,132,58,.22);background:transparent;color:var(--muted);
}
.cat-btn:hover{border-color:rgba(200,132,58,.5);color:var(--mutl);background:rgba(200,132,58,.06)}
.cat-btn.active{border-color:var(--amber);color:var(--ap);background:rgba(200,132,58,.1);box-shadow:0 0 14px rgba(200,132,58,.12)}

/* ── featured poem ── */
.feat-poem{
  position:relative;border:1px solid rgba(200,132,58,.35);border-radius:22px;
  padding:44px 40px 36px;margin-bottom:32px;overflow:hidden;
  background:linear-gradient(160deg,rgba(46,28,10,.8) 0%,rgba(24,15,5,.9) 100%);
  animation:kfu .6s .1s ease both;
}
.feat-poem::before{
  content:'';position:absolute;inset:0;border-radius:22px;
  background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(200,132,58,.08) 0%,transparent 70%);
  pointer-events:none;
}
.feat-tag{font-size:.6rem;color:var(--amber);letter-spacing:4px;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.feat-tag::after{content:'';flex:1;height:1px;background:rgba(200,132,58,.25)}
.feat-title-ta{font-family:'Noto Serif Tamil',serif;font-size:clamp(1.4rem,4vw,1.9rem);font-weight:400;color:var(--cream);line-height:1.4;margin-bottom:4px}
.feat-title-en{font-family:'Cormorant Garamond',serif;font-size:.8rem;font-style:italic;color:var(--muted);letter-spacing:2px;margin-bottom:28px}
.feat-lines{margin-bottom:24px}
.feat-line{font-family:'Noto Serif Tamil',serif;font-size:clamp(.95rem,2.5vw,1.1rem);font-weight:300;color:var(--cream);line-height:2.1;min-height:2.1em}
.feat-line.en{font-family:'Cormorant Garamond',serif;font-size:clamp(1rem,2.8vw,1.15rem);font-style:italic;font-weight:300}
.feat-line.empty{min-height:1em}
.feat-note{
  border-top:1px solid rgba(200,132,58,.15);padding-top:18px;
  font-family:'Cormorant Garamond',serif;font-size:.88rem;font-style:italic;
  color:var(--mutd);line-height:1.7;
}
.feat-note::before{content:'✦ ';color:var(--amber);opacity:.6}

/* ── poem grid ── */
.poem-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}

/* ── poem card ── */
.pcard{
  border:1px solid var(--border);border-radius:18px;padding:28px 24px 22px;
  background:var(--card);cursor:pointer;transition:all .35s cubic-bezier(.25,.8,.25,1);
  position:relative;overflow:hidden;animation:kfu .5s ease both;
}
.pcard::before{content:'';position:absolute;inset:0;border-radius:18px;background:radial-gradient(ellipse at 30% 0%,rgba(200,132,58,.06) 0%,transparent 60%);opacity:0;transition:opacity .3s}
.pcard:hover{border-color:rgba(200,132,58,.45);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.5),0 0 24px rgba(200,132,58,.07)}
.pcard:hover::before{opacity:1}
.pcard:nth-child(1){animation-delay:.05s}.pcard:nth-child(2){animation-delay:.1s}.pcard:nth-child(3){animation-delay:.15s}.pcard:nth-child(4){animation-delay:.2s}.pcard:nth-child(5){animation-delay:.25s}
.pc-cat{font-size:.58rem;color:var(--amber);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;opacity:.8}
.pc-title-ta{font-family:'Noto Serif Tamil',serif;font-size:1.05rem;font-weight:400;color:var(--cream);margin-bottom:3px;line-height:1.4}
.pc-title-en{font-family:'Cormorant Garamond',serif;font-size:.75rem;font-style:italic;color:var(--muted);margin-bottom:16px;letter-spacing:1px}
.pc-preview{font-family:'Noto Serif Tamil',serif;font-size:.85rem;font-weight:300;color:var(--mutl);line-height:1.8;margin-bottom:14px}
.pc-preview.en{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.9rem}
.pc-footer{display:flex;align-items:center;justify-content:space-between}
.pc-read{font-size:.65rem;color:var(--amber);letter-spacing:2px;text-transform:uppercase;opacity:0;transform:translateX(-6px);transition:all .3s}
.pcard:hover .pc-read{opacity:1;transform:translateX(0)}
.pc-lang{font-size:.6rem;color:var(--mutd);letter-spacing:2px;text-transform:uppercase;padding:3px 8px;border:1px solid rgba(200,132,58,.15);border-radius:10px}

/* ── poem modal ── */
.modal-bg{position:fixed;inset:0;z-index:200;background:rgba(6,3,1,.9);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:20px;animation:kfi .3s ease}
@keyframes kfi{from{opacity:0}to{opacity:1}}
.modal{
  width:min(600px,96vw);max-height:90vh;overflow-y:auto;
  background:linear-gradient(160deg,rgba(42,22,8,.98),rgba(20,12,4,.98));
  border:1px solid rgba(200,132,58,.3);border-radius:24px;
  padding:44px 40px 40px;position:relative;
  box-shadow:0 40px 80px rgba(0,0,0,.8),0 0 60px rgba(200,132,58,.06);
  animation:mpop .4s cubic-bezier(.25,.8,.25,1) both;
  scrollbar-width:thin;scrollbar-color:rgba(200,132,58,.2) transparent;
}
@keyframes mpop{from{opacity:0;transform:scale(.92) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
.modal::-webkit-scrollbar{width:4px}.modal::-webkit-scrollbar-thumb{background:rgba(200,132,58,.2);border-radius:2px}
.mclose{position:absolute;top:18px;right:22px;background:none;border:none;color:var(--muted);font-size:1.1rem;cursor:pointer;transition:color .2s;z-index:1;padding:4px}
.mclose:hover{color:var(--cream)}
.m-candles{display:flex;justify-content:center;gap:24px;margin-bottom:28px}
.m-cat{font-size:.6rem;color:var(--amber);letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;text-align:center}
.m-title-ta{font-family:'Noto Serif Tamil',serif;font-size:clamp(1.5rem,4vw,2rem);font-weight:400;color:var(--cream);text-align:center;margin-bottom:4px;line-height:1.4}
.m-title-en{font-family:'Cormorant Garamond',serif;font-size:.82rem;font-style:italic;color:var(--muted);text-align:center;margin-bottom:32px;letter-spacing:2px}
.m-divider{width:60px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,132,58,.5),transparent);margin:0 auto 32px}
.m-lines{margin-bottom:32px;text-align:center}
.m-line{font-family:'Noto Serif Tamil',serif;font-size:clamp(1rem,2.8vw,1.15rem);font-weight:300;color:var(--cream);line-height:2.2;min-height:2.2em}
.m-line.en{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(1.05rem,3vw,1.2rem)}
.m-line.empty{min-height:1.1em}
.m-note{
  border-top:1px solid rgba(200,132,58,.15);padding-top:22px;
  font-family:'Cormorant Garamond',serif;font-size:.9rem;font-style:italic;
  color:var(--mutd);line-height:1.75;text-align:center;
}
.m-note::before{content:'"';font-family:'Great Vibes',cursive;font-size:1.8rem;color:rgba(200,132,58,.3);display:block;margin-bottom:6px}
.m-from{margin-top:20px;text-align:right;font-family:'Great Vibes',cursive;font-size:1.6rem;color:var(--amber);opacity:.65}

/* ── footer quote ── */
.k-footer{margin-top:52px;text-align:center;animation:kfu .6s .6s ease both}
.kf-line{font-family:'Cormorant Garamond',serif;font-size:clamp(.9rem,2.5vw,1.05rem);font-style:italic;color:var(--mutd);line-height:1.8}
.kf-name{margin-top:12px;font-family:'Great Vibes',cursive;font-size:1.6rem;color:rgba(200,132,58,.4)}
`;

const STARS_D = Array.from({ length: 50 }, (_, i) => ({
  id: i, left: `${(i * 17.1 + 4) % 100}%`, top: `${(i * 23.3 + 6) % 100}%`,
  size: i % 8 === 0 ? 3 : 2, dur: `${2.5 + (i % 6) * .5}s`, delay: `${(i * .38) % 5}s`,
}));

function Candle({ small }) {
  return (
    <div className="candle">
      <div className="flame" style={small ? { width: 7, height: 14 } : {}} />
      <div className="candle-body" style={small ? { width: 10, height: 32 } : {}}>
        <div className="wax-drip" style={{ right: 2, top: 4 }} />
      </div>
      <div className="candle-base" style={small ? { width: 13 } : {}} />
    </div>
  );
}

function getLangLabel(lang) {
  if (lang === "tamil") return "தமிழ்";
  if (lang === "english") return "English";
  return "Mixed";
}

function PoemModal({ poem, onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="mclose" onClick={onClose}>✕</button>

        <div className="m-candles">
          <Candle small /><Candle small /><Candle small />
        </div>

        <div className="m-cat">{poem.category}</div>
        <div className="m-title-ta">{poem.title}</div>
        {poem.title !== poem.titleEn && (
          <div className="m-title-en">{poem.titleEn}</div>
        )}
        <div className="m-divider" />

        <div className="m-lines">
          {poem.lines.map((line, i) => (
            <div key={i} className={`m-line ${poem.lang === "english" || poem.lang === "mixed" ? "en" : ""} ${line === "" ? "empty" : ""}`}>
              {line}
            </div>
          ))}
        </div>

        {poem.note && (
          <div className="m-note">{poem.note}</div>
        )}
        <div className="m-from">— {YOUR_NAME} ♥</div>
      </div>
    </div>
  );
}

export default function KavithaiCorner({ onBack }) {
  const [activeCat, setActiveCat] = useState("அனைத்தும்");
  const [openPoem, setOpenPoem] = useState(null);

  const featured = POEMS.find(p => p.isFeatured);
  const rest = POEMS.filter(p => !p.isFeatured);

  const filtered = activeCat === "அனைத்தும்"
    ? rest
    : rest.filter(p => p.category === activeCat);

  return (
    <>
      <style>{css}</style>
      <div className="kbg" />
      <div className="korb ko1" /><div className="korb ko2" /><div className="korb ko3" />
      <div className="kstars">{STARS_D.map(s => <div key={s.id} className="ks" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDuration: s.dur, animationDelay: s.delay }} />)}</div>

      <div className="kroot">
        {/* Header */}
        <div className="kheader">
          <div className="candle-row">
            <Candle /><Candle /><Candle />
          </div>
          <div className="kh-orn">📜 ✦ 📜</div>
          <div className="kh-title">Kavithai Corner</div>
          <div className="kh-sub">words written only for you</div>
          <div className="kh-quote">"Every poem I've ever written has your name hidden somewhere in it."</div>
        </div>

        {/* Category filter */}
        <div className="cat-strip">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${activeCat === cat ? "active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >{cat}</button>
          ))}
        </div>

        {/* Featured poem — always shown */}
        {(activeCat === "அனைத்தும்" || activeCat === featured?.category) && featured && (
          <div className="feat-poem" onClick={() => setOpenPoem(featured)}>
            <div className="feat-tag">✦ birthday special · featured poem</div>
            <div className="feat-title-ta">{featured.title}</div>
            <div className="feat-title-en">{featured.titleEn}</div>
            <div className="feat-lines">
              {featured.lines.map((line, i) => (
                <div key={i} className={`feat-line ${featured.lang === "english" ? "en" : ""} ${line === "" ? "empty" : ""}`}>
                  {line}
                </div>
              ))}
            </div>
            {featured.note && <div className="feat-note">{featured.note}</div>}
          </div>
        )}

        {/* Poem grid */}
        <div className="poem-grid">
          {filtered.map((poem, i) => (
            <div
              key={poem.id}
              className="pcard"
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => setOpenPoem(poem)}
            >
              <div className="pc-cat">{poem.category}</div>
              <div className="pc-title-ta">{poem.title}</div>
              {poem.title !== poem.titleEn && <div className="pc-title-en">{poem.titleEn}</div>}
              <div className={`pc-preview ${poem.lang === "english" ? "en" : ""}`}>
                {poem.lines.filter(l => l).slice(0, 3).join("\n")}
              </div>
              <div className="pc-footer">
                <span className="pc-read">read poem →</span>
                <span className="pc-lang">{getLangLabel(poem.lang)}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "var(--muted)", fontSize: "1rem" }}>
            no poems in this category yet — coming soon ♥
          </div>
        )}

        {/* Footer */}
        <div className="k-footer">
          <div className="kf-line">
            "I write because of you.<br />
            Every word I've ever written has your name hidden in it."
          </div>
          <div className="kf-name">— {YOUR_NAME}</div>
        </div>

        {onBack && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={onBack} style={{ background: "none", border: "1px solid rgba(200,132,58,.2)", borderRadius: 10, padding: "10px 24px", color: "var(--muted)", fontFamily: "'Cormorant Garamond',serif", fontSize: ".9rem", fontStyle: "italic", cursor: "pointer", transition: "all .25s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--amber)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(200,132,58,.2)"}
            >← back to home</button>
          </div>
        )}
      </div>

      {openPoem && <PoemModal poem={openPoem} onClose={() => setOpenPoem(null)} />}
    </>
  );
}
