import React, { useState, useEffect, useRef } from "react";

const SONG_URLS = [
  "https://dn710001.ca.archive.org/0/items/tamil-melody-hits/En-Kadhal-Solla.mp3",
  "https://ia600504.us.archive.org/34/items/04Paartha/Harris%20Jayaraj%20Tamil%20Hit%20Songs/04%20Paartha.mp3",
  "https://dn711008.ca.archive.org/0/items/04Paartha/Harris%20Jayaraj%20Tamil%20Hit%20Songs/Engeyum%20Kaadhal.mp3",
  "https://dn711008.ca.archive.org/0/items/04Paartha/Harris%20Jayaraj%20Tamil%20Hit%20Songs/04%20Unakkul%20Naan%20%28F%29.mp3",
  "https://dn711008.ca.archive.org/0/items/04Paartha/Harris%20Jayaraj%20Tamil%20Hit%20Songs/Ennamo%20Yeadho.mp3"
];

const SONGS = [
  { title: "Unakkul Naan", artist: "", url: SONG_URLS[3] },
  { title: "PaarEn kadhal solla", artist: "", url: SONG_URLS[0] },
  { title: "Enamo Yeadho", artist: "", url: SONG_URLS[4] },
  { title: "Engeyum kadhal", artist: "", url: SONG_URLS[2] },
  { title: "Partha muthal naalye", artist: "", url: SONG_URLS[1] },
];

const css = `
.music-bar{
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  z-index:1000;
  display:flex;
  align-items:center;
  gap:16px;
  padding:12px 20px;
  background:rgba(24,15,5,0.95);
  backdrop-filter:blur(20px);
  border-top:1px solid rgba(200,132,58,0.2);
  color: #fdf6ec;
  font-family: 'Lora', serif;
}

.music-dot{
  width:8px;
  height:8px;
  border-radius:50%;
  background:#c8843a;
  animation:pulse 1.8s infinite;
}

@keyframes pulse{
  0%,100%{ transform:scale(1); }
  50%{ transform:scale(1.5); }
}

.music-info{ flex:1; }
.music-title{ font-size:0.85rem; font-weight: 500; }
.music-sub{ font-size:0.7rem; color:#a07850; }

.music-btns{
  display:flex;
  align-items:center;
  gap:12px;
}

.music-btn{
  width:32px;
  height:32px;
  border-radius:50%;
  border:1px solid rgba(200,132,58,0.3);
  background:none;
  color:#e8a85a;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.music-btn:hover {
  background: rgba(200,132,58,0.1);
  border-color: #c8843a;
}

.music-vol {
  width: 80px;
  -webkit-appearance: none;
  background: rgba(200,132,58,0.2);
  border-radius: 10px;
  height: 4px;
}

.music-vol::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c8843a;
  cursor: pointer;
}
`;

export default function MusicBar() {
  const [songIdx, setSongIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [vol, setVol] = useState(70);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (playing) {
        audioRef.current.play().catch(e => console.log("Playback blocked:", e));
      }
    }
  }, [songIdx]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) audioRef.current.play().catch(e => console.log("Playback blocked:", e));
      else audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vol / 100;
  }, [vol]);

  return (
    <>
      <style>{css}</style>
      <audio ref={audioRef} src={SONGS[songIdx].url} loop />

      <div className="music-bar">
        <div className="music-dot" style={{ animationPlayState: playing ? "running" : "paused" }}></div>
        
        <div className="music-info">
          <div className="music-title">🎵 {SONGS[songIdx].title}</div>
          <div className="music-sub">{SONGS[songIdx].artist}</div>
        </div>

        <div className="music-btns">
          <button className="music-btn" onClick={() => setSongIdx(p => (p - 1 + SONGS.length) % SONGS.length)}>◀</button>
          <button className="music-btn" onClick={() => setPlaying(!playing)}>{playing ? "⏸" : "▶"}</button>
          <button className="music-btn" onClick={() => setSongIdx(p => (p + 1) % SONGS.length)}>▶▶</button>
          
          <input 
            type="range" 
            min="0" max="100" 
            value={vol} 
            className="music-vol" 
            onChange={(e) => setVol(Number(e.target.value))} 
          />
        </div>
      </div>
    </>
  );
}
