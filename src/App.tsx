import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./pages/Game";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import { postScore } from "./requests/score";
import ProtectedRoute from "./pages/ProtectedRoute";
import { IAuthResponse } from "./types/auth.types";
import { Themes } from "./constants/themes";

function App() {
  const [score, setScore] = useState<number>(0);
  const [targetSize, setTargetSize] = useState<number>(3);
  const [targets, setTargets] = useState<number>(7);
  const [theme, setTheme] = useState<Themes>(Themes.LightSkyBlue);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [user, setUser] = useState<IAuthResponse>({ access: "", refresh: "" });
  const [showMemberForm, setShowMemberForm] = useState<boolean>(false);

  const root = document.getElementById("root");
  root && (root.style.color = theme);

  const clearGameSession = () => {
    setGameRunning(false);
    setScore(0);
    setIsChallenge(false);
    setStartTime(0);
    setGameOver(false);
    setShowMemberForm(false);
  };

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (access && refresh && access !== "" && refresh !== "") {
      setUser({
        access: access,
        refresh: refresh,
      });
    }
  }, []);

  useEffect(() => {
    if (!gameRunning && user) {
      const chillGame = localStorage.getItem("chill");
      if (chillGame) {
        const _request = async () => {
          await postScore(JSON.parse(chillGame));
        };
        _request();
        localStorage.removeItem("chill");
      }
    }
    // eslint-disable-next-line
  }, [gameRunning]);

  const isLoggedIn = (): boolean => {
    return user && user.access !== "" && user.refresh !== "";
  };

  return (
    <>
      <BrowserRouter>
        <Header
          theme={theme}
          setUser={setUser}
          showMemberForm={showMemberForm}
          setShowMemberForm={setShowMemberForm}
          setGameRunning={setGameRunning}
          isLoggedIn={isLoggedIn}
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
                setGameRunning={setGameRunning}
                theme={theme}
                setTheme={setTheme}
                setIsChallenge={setIsChallenge}
                clearGameSession={clearGameSession}
                setShowMemberForm={setShowMemberForm}
                isLoggedIn={isLoggedIn}
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
                setStartTime={setStartTime}
                startTime={startTime}
                isChallenge={isChallenge}
                gameOver={gameOver}
                setGameOver={setGameOver}
                setShowMemberForm={setShowMemberForm}
                user={user}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile theme={theme} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
