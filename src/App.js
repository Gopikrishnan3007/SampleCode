import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// Remove these duplicate imports
// import ReactDOM from 'react-dom/client';
// import './index.css';

import LoginPage from './LoginPage';
import HomeHub from './HomeHub';
import BirthdayPage from './BirthdayPage';
import PuzzleOfLove from './PuzzleOfLove';
import KavithaiCorner from './KavithaiCorner';
import FeelingsRoom from './FeelingsRoom';
// import MemoriesPage from './MemoriesPage';
// import VictoryWall from './VictoryWall';
import MusicBar from './MusicBar';

// Wrapper component to handle navigation
function AppContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showBirthday, setShowBirthday] = useState(true);
  const navigate = useNavigate();

  const handleEnterHome = () => {
    setShowBirthday(false);
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  if (showBirthday) {
    return <BirthdayPage onEnter={handleEnterHome} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeHub onNavigate={handleNavigate} />} />
        <Route path="/puzzles" element={<PuzzleOfLove />} />
        <Route path="/kavithai" element={<KavithaiCorner />} />
        <Route path="/feelings" element={<FeelingsRoom />} />
        {/* <Route path="/memories" element={<MemoriesPage />} /> */}
        {/* <Route path="/victories" element={<VictoryWall />} /> */}
      </Routes>
      <MusicBar />
    </>
  );
}

// Main App component with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;  // Only export, don't render here