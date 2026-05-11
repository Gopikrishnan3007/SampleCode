import { useState, useRef, useEffect } from "react";

const HER_NAME = "Ranjani";
const YOUR_NAME = "Gopi";

// ─── NOTIFICATION CONFIG ─────────────────────────────────────────────────────
// Put your phone number here (with country code, no + or spaces)
// Example: "919876543210"
const GOPI_PHONE = "+91 8072031588";

// ─── MOOD DATA ───────────────────────────────────────────────────────────────
// Each mood has: icon, label, color accent, bg tint, letter, song, activities
const MOODS = [
  {
    id: "happy",
    icon: "☀️",
    label: "Happy",
    accent: "#e8a85a",
    tint: "rgba(232,168,90,0.08)",
    letter: `Dei Ranjuuuuuuuu, nee happy ah irukkatha patha enakkum romba santhosham da.

Seriously — un smile patha podhum, enaku vera edhuvum venam. Nee sirikum bothu un kannula oru vibe varum, adha paath enaku ella problem um marandhurum da.

Indha happy mood la nee enaku voice note anupuriya? — adha naan repeat mode la kekuren. Athu enaku podhum.

Intha happy ah irukura Ranjani kita oru request — indha feel ah save panniko. Kaduppa feel panna nerathula adha ninachu sirichuko.

Unaku indha happiness romba suit aagum da. sirippu na athu en Ranju kutti thaaa...`,
    song: { title: "Mental Manadhil", film: "Oh My Kadavule", why: "Un happy ah irukura vibe ku perfect da — light ah, cute ah, full positive ah irukkum." },
    activities: [
      { emoji: "📸", text: "Indha moment ah photo eduthu vachiko — future la nee happy illa nerathula pathu sirichu happy aaguradhuku." },
      { emoji: "🎤", text: "Unakku pudicha paatu podu. Full volume la potu dance adi. Naane ketutu iruken!" },
      { emoji: "💌", text: "Enaku oru random voice note anupu. Epdi iruka nu sollu. Nee happy nu kekurathukku enaku romba pudikkum." },
    ],
  },
  {
    id: "sad",
    icon: "🌧️",
    label: "Sad",
    accent: "#7fa8c8",
    tint: "rgba(80,120,180,0.08)",
    letter: `Ma, enna achu?

Unaku sad ah irukura vishayam enakku solla matra paathiyaaaa. Aana enakku theruyum thangooo. Un message la oru maari irukkum. Short ah reply varum. Voice note la oru thookam irukkum.

Nee aluga koodadhu nu naan solla maaten. Sariya? Aluga varutha alu.

Aana oru promise — alutha udane enaku call pannu. Naan iruken. Thoongura varaikum kuda naan phone la pesite iruppen.

Nee oruthi mattum illa ma. Naanu iruken. Athu podhum nu nenaikiren.`,
    song: { title: "Kanave Kanave", film: "David", why: "Un kannula thanni varum bothu indha paatu kekanum. Feel ah irukkum. Aana athoda niruthitu, aprom sirikanum." },
    activities: [
      { emoji: "🍫", text: "Unakku pudicha chocolate saptu paaru. Konjam feel change aagum. Illana enakku sollu, naan una sirikka try panre." },
      { emoji: "🛌", text: "pattu kelu. Thoongu. una engaged ah vachuko." },
      { emoji: "📝", text: "Enaku oru message anupu. 'oru maari irukku da' nu. Naan ooodi vanthu reply panren." },
    ],
  },
  {
    id: "alone",
    icon: "🌙",
    label: "Alone",
    accent: "#a07fc8",
    tint: "rgba(140,100,200,0.07)",
    letter: `Inga va ena tight aha hug pannite itha kelu?

Silent ah irukura time konjam kashtam tha. Athula namma overthink pannuvom?. naanum ipdi tha pannitu irupe ipo, unna pathi Yosuchutu irupe.

Somtimes nee alone nu feel panna, nee enakku takku nu oru call ah potru. Enakku theriyum, nee en kitta varanumnu nenaipa.kanna moodi imagine panniko da maa. ithu enoda tips hahah

Nee alone illa ma. Naan iruken. un manasula na iruke avata pesu avan unta nerla pesura mari pesuvan.`,
    song: { title: "sirikkalam parakkalam", film: " KKK", why: "alone ah irukura feel ku indha paatu perfect un mode ah change pannirum." },
    activities: [
      { emoji: "🌃", text: "Balcony la poi oru 2 nimisham nillu. Vaanatha paaru. Naanum apdi dhan pathutu iruken. Same vaanam da." },
      { emoji: "📱", text: "Namma palaiya conversation ah open panni oru random message ah repeat padi. Naaana iruken, athula." },
      { emoji: "🎧", text: "Unakku pudicha 'old' playlist potu kelu. Adhula nammala pathi neraya nyabagam varum." },
    ],
  },
  {
    id: "demotivated",
    icon: "💪",
    label: "Demotivated",
    accent: "#c87a5a",
    tint: "rgba(200,120,80,0.08)",
    letter: `Dei, pesu. Enna achu?

Unaku indha feel vara nerathula nee enakku solla matta. Enakku theriyum. Nee "nothing" nu solliruva, naan puduchuruven. Edi nee SIVARANJANI di ipdi lam irukalama?

Listen. Nee dhan da un life la main. Nee mattum dhan un situation ah thirutha mudiyum. Naan support panren, encouragement panren — aana nee dhan execute pannanum.

Aana ippo oru vishayam: Unakku mudila nu thonum bothu, enakku phone pannu. Naan solluven "Unnala mudiyum" nu.

One step da. Oru chinna step podu. Athu podhum. Mela vara.`,
    song: { title: "Unna Nenachu", film: "Psycho", why: "Motivation oda first step — unna ninachu. Athukku aprom dhan ellam." },
    activities: [
      { emoji: "📋", text: "Iniku oru goal mattum vachi. Atha complete pannu. Athu mattum podhum." },
      { emoji: "🚶", text: "10 nimisham veliya nadandhu va. Edhuku therla, aana nadanthu vandha konjam change aagum." },
      { emoji: "🏆", text: "Nee vera yarukko help pannina oru time atha pathi yosichu paaru. Neeyum help keka thevai illa. Nee strong dhan." },
    ],
  },
  {
    id: "angry",
    icon: "🔥",
    label: "Angry",
    accent: "#c85858",
    tint: "rgba(200,80,80,0.07)",
    letter: `Yaar da avan? Sollu.

Illana en mela kovama? Appo sollu. Kalyanathuku aprom veetla adikanum na ippo practice pannuva nu solriya?

Seriously ma, unakku kovam vantha — enakku sollu. Un mela kovam vantha kooda sollu. Naan correct panikuren. Illana naan un kovathuku reason ah irundha — sollu ma, naan change aaguren.

Aana oru visayam — nee romba nalla girl. Un kovathula nee onnum mosama pesida koodathu. Illana apram neeye feel pannuva.

 En kitta pesu. Naa iruken. Andha kovatha ah en mela potuko — naan thaangikaren.`,
    song: { title: "Nee Partha Vizhigal", film: "3", why: "summa oru song." },
    activities: [
      { emoji: "🥊", text: "Pillow ah oru 5 adi adi. Full force la. Sollu 'seri da' nu. Relieve aagum." },
      { emoji: "✍️", text: "Enaku oru long message anupu. Naan padichutu sonen — 'sari, naan iruken' nu." },
      { emoji: "🚿", text: "Cold water la face kazhuvu. Indha technique actually work aagum. Apram ennaku call pannu." },
    ],
  },
  {
    id: "anxious",
    icon: "🌀",
    label: "Anxious",
    accent: "#5ab8c8",
    tint: "rgba(80,180,200,0.07)",
    letter: `Dei, breath pannu.

Nee ippo endha thought loop la sikkikitu irukka. Enna? "What if this", "what if that" nu. Nee sollu, naan solution solren. Illana naan ketu iruken.

Unakku theriyuma? Nee ippo worry pandradhula 90% nadakadhu. Nadantha kooda — nee handle panniruka. Apdi dhan ippavum pannuva.

Breath: 4 seconds la inhale pannu, 4 seconds hold pannu, 4 seconds exhale pannu. Inni 4 seconds hold pannu. Repeat.

Nee kolappathula illa. Nee strong. Unakku stress varum — aana nee atha sari pannikra.
`,
    song: { title: "Kannazhaga", film: "3" },
    activities: [
      { emoji: "🫁", text: "Box breathing: Inhale 4, hold 4, exhale 4, hold 4. 4 rounds pannu. Ippo pannu." },
      { emoji: "📦", text: "Un room la 5 blue colour items ah search pannu. Un brain ah divert pannu." },
      { emoji: "📵", text: "Phone ah face down ah vachutu 20 mins edhuku touch pannadha. eluthu. Edhachu pannu." },
    ],
  },
  {
    id: "nostalgic",
    icon: "🎞️",
    label: "Nostalgic",
    accent: "#c8a05a",
    tint: "rgba(200,160,80,0.07)",
    letter: `Ah, nyabagam varutha?

Nee ippo enna yosikura? Namma first time pesinathu? Illa namma first meet? Illa adhukulla nadanthathu?

Nyabagam varrathu periya vishayam. Nee miss panrathu ellam namma life la part dhan. Atha miss panradhu thappu illa. Aana athlete miss panradhoda niruthikadha — move on pannu. Puthu nyabagam create pannu.

Nee romba sentimental da. Athu un strength. Atha mattum miss pannadha.

Namma epdiyum puthusa pesikalam. Nyabagam varum bothu, enakku oru message anupu. Naanum apdi dhan iruken.`,
    song: { title: "Ennodu Nee Irundhal", film: "I" },
    activities: [
      { emoji: "📷", title: "Purana photos ah paaru. Oru 5 mins ah paaru. Apram close pannitu enakku message anupu." },
      { emoji: "📞", text: "Andha nyabagam la irukura oru aaluku call pannu. Enakku illa. Andha 'friend' ku call pannu. Avangalukku santhosham aagum." },
      { emoji: "📖", text: "Andha memory ah full ah ezhuthi vachu. Enakku anupu. Naan padikiren. Apram nammala pathi puthusa pesuvom." },
    ],
  },
  {
    id: "missing",
    icon: "💌",
    label: "Missing You",
    accent: "#e86a8a",
    tint: "rgba(230,100,140,0.07)",
    letter: `Enna ma, nenacha?

Nee ippo enna panra? Naan unna miss panren. Nee enna miss panra? Epdi irukka?

Distance sucks da. Naan theriyum. Nee daily oru sandai podanum, naan sollanum, seri aaganum. Adhu illama irukku.

Aana oru vishayam: Nee miss panradhala dhan enakku theriyum — idhu real nu. Nee miss panra alavuku, naanum miss panren.

Countdown start pannitu iruken. Nee vara varaikum naan wait panren.

Innoru vishayam: Nee miss panna, enakku oru voice note anupu. Naan repeat ah keken.`,
    song: { title: "Idhayam", film: "Kadal" },
    activities: [
      { emoji: "💌", text: "Enakku oru long voice note anupu. Nee enna miss panra nu sollu. Naan ketutu iruken." },
      { emoji: "👕", text: "Naan thandha dress ah potuko. Unakku enna feel varum? Enakku theriyum. Naanum apdi dhan iruken." },
      { emoji: "🍿", text: "Namma romba movies ah pathi pesirukom. Adhula onnu pathutu, enakku message anupu." },
    ],
  },
  {
    id: "tired",
    icon: "🛋️",
    label: "Tired",
    accent: "#8aa07a",
    tint: "rgba(130,160,110,0.07)",
    letter: `Dei, tired ah irukka?

Nee ippo enna pannitu irukka? Work? Padichitu? Illa veetla? Nee romba overwork pannikira. Naan theriyum.

Unaku thookam varutha? Nee sollu, naan solluven 'thoongu da' nu. Aana thoongara munnadi enakku oru message anupu — 'thoonguren' nu. Naan sonnen 'good night' nu.

Nee rest edukkura nerathula, naan unna disturb pannala. Nee thoongitu irukka nu nenaikuren.

Iniku onnum pannadha. Paduthu thoongu. Nalaiku kaalaila unakku en message irukkum.`,
    song: { title: "Narumugaye", film: "Iruvar" },
    activities: [
      { emoji: "🛌", text: "Thoongu. No alarm. Alert panni thoongu. Naan morning call pannuven. Appo sollu 'thoongiten' nu." },
      { emoji: "🍵", text: "Warm ah edhachu saapdu. Tea, coffee, soup, edhachu. Athukapram paduthuko." },
      { emoji: "📵", text: "Phone ah silent la potu, oru 2 nimisham room la quiet ah iru. En ippo feel? Illa. Ithu dhan rest." },
    ],
  },
  {
    id: "grateful",
    icon: "🌸",
    label: "Grateful",
    accent: "#78c8a0",
    tint: "rgba(120,200,160,0.07)",
    letter: `Indha mood la nee irukurappa — naan romba lucky nu feel panren.

Nee grateful ah irukura vishayam sollu. Naanum solluren. Namma indha conversation la, indha bond la, indha love la.

Nee enakku kedaicha — adhu dhan en life la greatest thing. No joke.

Nee matum illa, un family, un friends, un growth. Ellathukum nee grateful ah iru. Ana romba miss panradhu — nee enakku grateful ah irukura feel um enakku venum.

Thank you for existing da. Really.`,
    song: { title: "Anbe En Anbe", film: "En Swasa Kaatre"},
    activities: [
      { emoji: "📓", text: "5 things: ippo grateful ah irukura vishayam ezhuthu. Detail ah ezhuthu. Apram enakku anupu. Naan padikiren." },
      { emoji: "💬", text: "Unakku unexpected ah oru aaluku thank you sollu. Call pannu, message anupu. Avangalukku santhosham aagum. Unakku feel aagum." },
      { emoji: "🌿", text: "Window pakkam poi nillu. Ippo enna pakura? Atha oru nimisham observe pannu. Ithu dhan life. Beautiful." },
    ],
  },
];
// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber: #c8843a;
  --al: #e8a85a;
  --ap: #f5c887;
  --cream: #fdf6ec;
  --dark: #180f05;
  --muted: #a07850;
  --mutl: #c4a07a;
  --card: rgba(253,246,236,0.055);
  --border: rgba(200,132,58,0.22);
}

html, body {
  background: var(--dark);
  font-family: 'Lora', serif;
  color: var(--cream);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── BG ── */
.fr-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  transition: background 1.2s ease;
}

.fr-orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(90px);
  transition: background 1.2s ease;
}

.fr-orb-1 { width: 500px; height: 500px; top: -120px; left: -120px; }
.fr-orb-2 { width: 380px; height: 380px; bottom: -60px; right: -80px; }
.fr-orb-3 { width: 280px; height: 280px; top: 40%; left: 50%; transform: translateX(-50%); }

.fr-stars { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.fr-star {
  position: absolute;
  border-radius: 50%;
  background: #f5c887;
  animation: frTwinkle ease-in-out infinite;
}
@keyframes frTwinkle {
  0%, 100% { opacity: 0.08; }
  50%       { opacity: 0.55; }
}

/* ── ROOT ── */
.fr-root {
  position: relative;
  z-index: 10;
  max-width: 780px;
  margin: 0 auto;
  padding: 0 20px 100px;
}

/* ── HEADER ── */
.fr-header {
  padding: 52px 0 8px;
  text-align: center;
  animation: frDown .7s ease both;
}
@keyframes frDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fr-orn {
  font-size: .9rem;
  letter-spacing: 12px;
  opacity: .45;
  margin-bottom: 14px;
  transition: color 1s ease;
}

.fr-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 7vw, 3.4rem);
  font-style: italic;
  font-weight: 300;
  line-height: 1.2;
  transition: color 1s ease;
}

.fr-title span { font-style: normal; font-weight: 400; }
.fr-sub {
  margin-top: 10px;
  font-size: .72rem;
  color: var(--muted);
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* ── SECTION LABEL ── */
.fr-sl {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 44px 0 20px;
}
.fr-sl::before, .fr-sl::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(200,132,58,.15);
  transition: background 1s ease;
}
.fr-sl-t {
  font-size: .65rem;
  color: var(--muted);
  letter-spacing: 3px;
  text-transform: uppercase;
  white-space: nowrap;
}

/* ── MOOD GRID ── */
.fr-mood-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
}

.fr-mood-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 12px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--card);
  cursor: pointer;
  transition: all .3s;
  user-select: none;
}

.fr-mood-pill:hover {
  transform: translateY(-4px);
  border-color: var(--amber);
  background: rgba(200,132,58,.08);
}

.fr-mood-pill.active {
  border-width: 2px;
  background: rgba(200,132,58,.12);
  transform: translateY(-4px);
}

.fr-mood-emoji { font-size: 1.8rem; }

.fr-mood-label {
  font-size: .72rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
  transition: color .3s;
}

.fr-mood-pill.active .fr-mood-label { color: var(--al); }

/* ── FEELINGS PANEL ── */
.fr-panel {
  margin-top: 32px;
  animation: frUp .6s ease both;
}
@keyframes frUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── LETTER CARD ── */
.fr-letter {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 36px 32px;
  position: relative;
  overflow: hidden;
  margin-bottom: 18px;
}

.fr-letter::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  background: radial-gradient(ellipse at 20% 0%, rgba(200,132,58,.06) 0%, transparent 65%);
  pointer-events: none;
}

.fr-letter-tag {
  font-size: .62rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 12px;
  transition: color 1s ease;
}

.fr-letter-salutation {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  font-style: italic;
  margin-bottom: 18px;
  transition: color 1s ease;
}

.fr-letter-body {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 300;
  line-height: 2;
  color: #e8ddd0;
  white-space: pre-line;
}

.fr-letter-footer {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid rgba(200,132,58,.15);
  font-family: 'Cormorant Garamond', serif;
  font-size: .85rem;
  font-style: italic;
  transition: color 1s ease;
}

/* ── SONG CARD ── */
.fr-song {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 22px 24px;
  margin-bottom: 18px;
}

.fr-song-disc {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  animation: spin 10s linear infinite;
  animation-play-state: paused;
}

.fr-song-disc.playing { animation-play-state: running; }

@keyframes spin { to { transform: rotate(360deg); } }

.fr-song-info { flex: 1; }

.fr-song-tag {
  font-size: .62rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 5px;
  transition: color 1s ease;
}

.fr-song-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  color: var(--cream);
  margin-bottom: 3px;
}

.fr-song-film {
  font-size: .75rem;
  color: var(--muted);
  letter-spacing: 1px;
}

.fr-song-why {
  margin-top: 8px;
  font-size: .8rem;
  color: var(--mutl);
  font-style: italic;
  line-height: 1.6;
}

/* ── ACTIVITIES ── */
.fr-acts {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 24px 26px;
  margin-bottom: 18px;
}

.fr-acts-tag {
  font-size: .62rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 18px;
  transition: color 1s ease;
}

.fr-act-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(200,132,58,.1);
}

.fr-act-item:last-child { border-bottom: none; padding-bottom: 0; }

.fr-act-emoji {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.fr-act-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: var(--mutl);
  line-height: 1.65;
}

/* ── TALK TO ME ── */
.fr-talk {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 26px;
  margin-bottom: 18px;
}

.fr-talk-tag {
  font-size: .62rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
  transition: color 1s ease;
}

.fr-talk-prompt {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: var(--mutl);
  margin-bottom: 16px;
  line-height: 1.6;
}

.fr-talk-area {
  width: 100%;
  min-height: 120px;
  background: rgba(253,246,236,.04);
  border: 1px solid rgba(200,132,58,.25);
  border-radius: 12px;
  padding: 14px 16px;
  font-family: 'Lora', serif;
  font-size: .88rem;
  color: var(--cream);
  resize: vertical;
  outline: none;
  line-height: 1.7;
  transition: border-color .3s, box-shadow .3s;
}

.fr-talk-area::placeholder {
  color: rgba(160,120,80,.45);
  font-style: italic;
}

.fr-talk-area:focus {
  border-color: rgba(200,132,58,.6);
  box-shadow: 0 0 0 3px rgba(200,132,58,.08);
}

.fr-talk-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}

.fr-btn-send {
  padding: 11px 22px;
  background: linear-gradient(135deg, var(--amber), var(--al));
  border: none;
  border-radius: 10px;
  font-family: 'Cormorant Garamond', serif;
  font-size: .95rem;
  font-style: italic;
  color: #180f05;
  cursor: pointer;
  transition: all .3s;
  letter-spacing: .5px;
}

.fr-btn-send:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,132,58,.35); }
.fr-btn-send:disabled { opacity: .45; pointer-events: none; }

.fr-btn-ping {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 10px 18px;
  background: rgba(253,246,236,0.05);
  border: 1px solid rgba(200,132,58,0.25);
  border-radius: 30px;
  font-family: 'Cormorant Garamond', serif;
  font-size: .85rem;
  font-style: italic;
  color: var(--mutl);
  cursor: pointer;
  transition: all .3s;
}
.fr-btn-ping:hover {
  background: rgba(200,132,58,0.1);
  border-color: var(--amber);
  color: var(--cream);
  transform: translateX(4px);
}

.fr-btn-clear {
  padding: 11px 18px;
  background: transparent;
  border: 1px solid rgba(200,132,58,.2);
  border-radius: 10px;
  font-family: 'Cormorant Garamond', serif;
  font-size: .95rem;
  font-style: italic;
  color: var(--muted);
  cursor: pointer;
  transition: all .25s;
}

.fr-btn-clear:hover { border-color: var(--amber); color: var(--mutl); }

.fr-saved-msg {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: .88rem;
  font-style: italic;
  color: var(--al);
  margin-top: 10px;
  animation: frFade .4s ease both;
}

@keyframes frFade {
  from { opacity: 0; } to { opacity: 1; }
}

/* ── BACK BTN ── */
.fr-back {
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

.fr-back:hover { border-color: var(--amber); color: var(--mutl); }

/* ── QUOTE STRIP ── */
.fr-quote {
  margin: 28px 0 0;
  padding: 20px 22px;
  border-left: 3px solid rgba(200,132,58,.35);
  background: rgba(200,132,58,.04);
  border-radius: 0 12px 12px 0;
  transition: border-color 1s ease;
}

.fr-quote-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.75;
  color: var(--mutl);
}

.fr-quote-from {
  margin-top: 8px;
  font-size: .68rem;
  color: var(--muted);
  letter-spacing: 2px;
  text-transform: uppercase;
}
`;

// ─── STARS ───────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(i * 17.3 + 5) % 100}%`,
  top: `${(i * 23.1 + 3) % 100}%`,
  size: i % 7 === 0 ? 3 : 2,
  dur: `${2.5 + (i % 5) * 0.6}s`,
  delay: `${(i * 0.3) % 5}s`,
}));

// ─── MOOD QUOTES (shown before any mood is selected) ─────────────────────────
const DEFAULT_QUOTE = {
  text: "Whatever you're feeling right now — you don't have to carry it alone.",
  from: `${YOUR_NAME}, always`,
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function FeelingsRoom({ onBack }) {
  const [activeMood, setActiveMood] = useState(null);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [discSpin, setDiscSpin] = useState(false);
  const panelRef = useRef(null);

  const mood = MOODS.find((m) => m.id === activeMood);

  // accent colours for dynamic theming
  const accent = mood?.accent ?? "#c8843a";
  const tint = mood?.tint ?? "rgba(200,132,58,0.07)";

  const bgGrad = mood
    ? `radial-gradient(ellipse 80% 50% at 50% 0%, ${tint.replace("0.07", "0.35").replace("0.08", "0.35")} 0%, #180f05 60%, #0a0602 100%)`
    : "radial-gradient(ellipse 80% 50% at 50% 0%, #3d1f08 0%, #180f05 60%, #0a0602 100%)";

  const orbBg = `${tint.replace("0.07", "0.12").replace("0.08", "0.12")}`;

  // scroll to panel when mood selected
  useEffect(() => {
    if (activeMood && panelRef.current) {
      setTimeout(() => {
        panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [activeMood]);

  const handleSend = () => {
    if (!message.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const text = `Dei ${YOUR_NAME}, Feelings Room la irundhu oru message:\n\n"${message}"\n\n(Sent at ${time})`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${GOPI_PHONE}?text=${encoded}`, '_blank');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePingMood = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const text = `Dei ${YOUR_NAME}, ippo naan konjam "${mood.label}" ah feel panren... 💭\n\nUn letter padichen, thank you da! ♥️\n\n(Sent at ${time})`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${GOPI_PHONE}?text=${encoded}`, '_blank');
  };

  const selectMood = (id) => {
    if (activeMood === id) { setActiveMood(null); return; }
    setActiveMood(id);
    setMessage("");
    setSaved(false);
    setDiscSpin(false);
  };

  return (
    <>
      <style>{css}</style>

      {/* ── DYNAMIC BACKGROUND ── */}
      <div className="fr-bg" style={{ background: bgGrad }} />
      <div className="fr-orb fr-orb-1" style={{ background: orbBg }} />
      <div className="fr-orb fr-orb-2" style={{ background: orbBg }} />
      <div className="fr-orb fr-orb-3" style={{ background: orbBg }} />

      {/* ── STARS ── */}
      <div className="fr-stars">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="fr-star"
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

      <div className="fr-root">

        {/* ── HEADER ── */}
        <div className="fr-header">
          <div className="fr-orn" style={{ color: accent }}>
            🌧️ ♥ ☀️
          </div>
          <h1 className="fr-title" style={{ color: mood ? accent : "#fdf6ec" }}>
            The Feelings Room
          </h1>
          <p className="fr-sub">
            whatever you're carrying — I already have something ready
          </p>
        </div>

        {/* ── MOOD PICKER ── */}
        <div className="fr-sl">
          <span className="fr-sl-t">how are you feeling right now?</span>
        </div>

        <div className="fr-mood-grid">
          {MOODS.map((m) => (
            <div
              key={m.id}
              className={`fr-mood-pill ${activeMood === m.id ? "active" : ""}`}
              style={activeMood === m.id ? { borderColor: m.accent } : {}}
              onClick={() => selectMood(m.id)}
            >
              <span className="fr-mood-emoji">{m.icon}</span>
              <span className="fr-mood-label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* ── DEFAULT QUOTE (no mood yet) ── */}
        {!mood && (
          <div className="fr-quote" style={{ borderColor: "rgba(200,132,58,.35)" }}>
            <p className="fr-quote-text">"{DEFAULT_QUOTE.text}"</p>
            <p className="fr-quote-from">— {DEFAULT_QUOTE.from}</p>
          </div>
        )}

        {/* ── FEELINGS PANEL ── */}
        {mood && (
          <div className="fr-panel" ref={panelRef} key={mood.id}>

            {/* LETTER */}
            <div className="fr-sl">
              <span className="fr-sl-t">a letter from {YOUR_NAME}</span>
            </div>

            <div className="fr-letter">
              <p className="fr-letter-tag" style={{ color: accent }}>
                ✦ written just for this moment
              </p>
              <p className="fr-letter-salutation" style={{ color: accent }}>
                Hey {HER_NAME},
              </p>
              <p className="fr-letter-body">{mood.letter}</p>

              <button className="fr-btn-ping" onClick={handlePingMood}>
                <span>📲</span> Let {YOUR_NAME} know I'm feeling this
              </button>

              <p className="fr-letter-footer" style={{ color: accent }}>
                — {YOUR_NAME}, always ♥
              </p>
            </div>

            {/* SONG */}
            <div className="fr-sl">
              <span className="fr-sl-t">a song I picked for you</span>
            </div>

            <div className="fr-song">
              <div
                className={`fr-song-disc ${discSpin ? "playing" : ""}`}
                style={{ borderColor: accent }}
                onClick={() => setDiscSpin((p) => !p)}
                title="tap to spin"
              >
                🎵
              </div>
              <div className="fr-song-info">
                <p className="fr-song-tag" style={{ color: accent }}>
                  curated for · {mood.label.toLowerCase()}
                </p>
                <p className="fr-song-title">{mood.song.title}</p>
                <p className="fr-song-film">{mood.song.film}</p>
                <p className="fr-song-why">{mood.song.why}</p>
              </div>
            </div>

            {/* ACTIVITIES */}
            <div className="fr-sl">
              <span className="fr-sl-t">things that will help</span>
            </div>

            <div className="fr-acts">
              <p className="fr-acts-tag" style={{ color: accent }}>
                ✦ small things · real impact
              </p>
              {mood.activities.map((act, i) => (
                <div className="fr-act-item" key={i}>
                  <span className="fr-act-emoji">{act.emoji}</span>
                  <p className="fr-act-text">{act.text}</p>
                </div>
              ))}
            </div>

            {/* TALK TO ME */}
            <div className="fr-sl">
              <span className="fr-sl-t">talk to me</span>
            </div>

            <div className="fr-talk">
              <p className="fr-talk-tag" style={{ color: accent }}>
                ✦ I'm listening
              </p>
              <p className="fr-talk-prompt">
                Tell me what's on your mind. You don't have to make it pretty — just real.
              </p>
              <textarea
                className="fr-talk-area"
                placeholder={`Start typing... I'm right here, ${HER_NAME}.`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="fr-talk-actions">
                <button
                  className="fr-btn-clear"
                  onClick={() => { setMessage(""); setSaved(false); }}
                >
                  clear
                </button>
                <button
                  className="fr-btn-send"
                  disabled={!message.trim()}
                  onClick={handleSend}
                >
                  send to {YOUR_NAME} ♥
                </button>
              </div>
              {saved && (
                <p className="fr-saved-msg">
                  Sent with love. He'll read every word. 💌
                </p>
              )}
            </div>

          </div>
        )}

        {/* ── BACK ── */}
        {onBack && (
          <button className="fr-back" onClick={onBack}>
            ← back to home
          </button>
        )}

      </div>
    </>
  );
}
