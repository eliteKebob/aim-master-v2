import SingleTarget from "../components/SingleTarget";
import { useState, useEffect } from "react";
import { FaClock, FaCrosshairs, FaFireAlt } from "react-icons/fa";
import GameOver from "../components/GameOver";

const Game = ({
  score,
  setScore,
  targetSize,
  gameRunning,
  theme,
  targets,
  setStartTime,
  startTime,
  isChallenge,
  gameOver,
  setGameOver,
  setGameRunning,
  setShowMemberForm,
}) => {
  const [targetsArr, setTargetsArr] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [secs, setSecs] = useState(5);
  const [now, setNow] = useState(0);
  const [spm, setSpm] = useState(0);

  const SECONDS_PER_GAME = 30;
  const MILLISECONDS_PER_GAME = 30000;

  useEffect(() => {
    setShowMemberForm(false);
    if (isChallenge === true) {
      setStartTime(new Date().getTime());
      setScore(0);
      setSpm(0);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let newTargetsArr = [];
    for (let i = 0; i < targets; i++) newTargetsArr.push(i);
    setTargetsArr(newTargetsArr);
    // eslint-disable-next-line
  }, [targets]);

  var x = setInterval(function () {
    if (!gameOver) {
      setNow(new Date().getTime());
      clearInterval(x);
    }
  }, 1000);

  useEffect(() => {
    let countDownDate = startTime + MILLISECONDS_PER_GAME;
    let distance = countDownDate - now;
    setSecs(Math.floor((distance % (MILLISECONDS_PER_GAME)) / 1000));
    // eslint-disable-next-line
  }, [now]);

  useEffect(() => {
    if (isChallenge === true) {
      if (secs > 0) {
        setSpm(Math.floor((score / (SECONDS_PER_GAME - secs)) * 60));
      } else {
        setSpm(0);
        return;
      }
    }
    // eslint-disable-next-line
  }, [score]);

  useEffect(() => {
    if (isChallenge === true) {
      if (now - startTime > MILLISECONDS_PER_GAME) {
        setGameOver(true);
      }
    }
    // eslint-disable-next-line
  }, [secs]);

  return (
    <div className="game-wrapper" id="game-table">
      <div
        className="scoreboard flex-center-center"
        style={{ borderBottom: `0.5vh solid ${theme}` }}
      >
        <div className="score-count flex-center-center">
          <FaCrosshairs /> {score}
        </div>
        {isChallenge ? (
          <>
            {secs > 0 ? (
              <div className="countdown flex-center-center">
                <FaClock /> {secs}s
              </div>
            ) : (
              ""
            )}
            <div className="spm-count flex-center-center">
              <FaFireAlt /> {spm} SPM
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {gameOver ? (
        <GameOver
          setGameOver={setGameOver}
          score={score}
          theme={theme}
          targetSize={targetSize}
          targets={targets}
          setScore={setScore}
          setSecs={setSecs}
          setSpm={setSpm}
          setStartTime={setStartTime}
          setGameRunning={setGameRunning}
        />
      ) : (
        <>
          {targetsArr?.map((target, idx) => (
            <SingleTarget
              key={idx}
              target={target}
              targetSize={targetSize}
              setScore={setScore}
              score={score}
              gameRunning={gameRunning}
              theme={theme}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
