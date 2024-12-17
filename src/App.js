import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./pages/Game";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";

function App() {
  const [score, setScore] = useState(0);
  const [targetSize, setTargetSize] = useState(3);
  const [targets, setTargets] = useState(7);
  const [theme, setTheme] = useState("lightskyblue");
  const [gameRunning, setGameRunning] = useState(false);
  const [isChallenge, setIsChallenge] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [user, setUser] = useState(null);
  const [showMemberForm, setShowMemberForm] = useState(false);

  document.getElementById("root").style.color = theme;

  const clearGameSession = () => {
    setGameRunning(false);
    setScore(0);
    setIsChallenge(false);
    setStartTime("");
    setGameOver(false);
    setShowMemberForm(false);
  };

  useEffect(() => {
    if (localStorage.getItem("access") && localStorage.getItem("refresh")) {
      // send get user request
      setUser({
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
      });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header
          theme={theme}
          user={user}
          setUser={setUser}
          showMemberForm={showMemberForm}
          setShowMemberForm={setShowMemberForm}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                targetSize={targetSize}
                setTargetSize={setTargetSize}
                targets={targets}
                setTargets={setTargets}
                gameRunning={gameRunning}
                setGameRunning={setGameRunning}
                theme={theme}
                setTheme={setTheme}
                setScore={setScore}
                setIsChallenge={setIsChallenge}
                setStartTime={setStartTime}
                setGameOver={setGameOver}
                clearGameSession={clearGameSession}
                user={user}
                setShowMemberForm={setShowMemberForm}
              />
            }
          />
          <Route
            path="/game"
            element={
              <Game
                score={score}
                setScore={setScore}
                targetSize={targetSize}
                gameRunning={gameRunning}
                setGameRunning={setGameRunning}
                theme={theme}
                targets={targets}
                setTargets={setTargets}
                setStartTime={setStartTime}
                startTime={startTime}
                isChallenge={isChallenge}
                gameOver={gameOver}
                setGameOver={setGameOver}
                setShowMemberForm={setShowMemberForm}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
