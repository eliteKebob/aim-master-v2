import SingleTarget from "../components/SingleTarget";
import { useState, useEffect } from "react";
import { FaClock, FaCrosshairs, FaFireAlt } from "react-icons/fa";
import GameOver from "../components/GameOver";
import { useNavigate } from "react-router-dom";

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
  user,
}) => {
  const [targetsArr, setTargetsArr] = useState([0, 1, 2, 3, 4, 5, 6]); // default 7 targets
  const [secs, setSecs] = useState(5);
  const [now, setNow] = useState(0);
  const [spm, setSpm] = useState(0);

  const navigate = useNavigate();

  const SECONDS_PER_GAME = 30;
  const MILLISECONDS_PER_GAME = SECONDS_PER_GAME * 1000;
  const SECONDS_PER_MINUTE = 60;

  useEffect(() => {
    if (!gameRunning) {
      navigate("/")
    }
    setShowMemberForm(false);
    setStartTime(new Date().getTime());
    if (isChallenge === true) {
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
    if (isChallenge) {
      let countDownDate = startTime + MILLISECONDS_PER_GAME;
      let distance = countDownDate - now;
      setSecs(Math.floor((distance % MILLISECONDS_PER_GAME) / 1000));
    } else {
      setSecs(Math.floor((now - startTime) / 1000));
    }
    // eslint-disable-next-line
  }, [now]);

  useEffect(() => {
    if (isChallenge === true) {
      if (secs > 0) {
        setSpm(
          Math.floor(
            (score / (SECONDS_PER_GAME + 1 - secs)) * SECONDS_PER_MINUTE
          )
        );
      } else {
        setSpm(0);
        return;
      }
    } else {
      if (score > 0 && user) {
        localStorage.setItem(
          "chill",
          JSON.stringify({
            tz_offset: -(new Date().getTimezoneOffset() / 60),
            game_length: secs,
            target_size: targetSize,
            total_target: targets,
            target_hit: score,
            mode: "CH", // "C" for challenge, "CH" for chill
          })
        );
      }
    }
    // eslint-disable-next-line
  }, [score]);

  useEffect(() => {
    if (isChallenge === true) {
      if (now - startTime > MILLISECONDS_PER_GAME) {
        setGameOver(true);
      }
    } else {
      if (score > 0 && secs > 0) {
        setSpm(Math.floor((score / secs) * SECONDS_PER_MINUTE));
      } else {
        setSpm(0);
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
        <>
          {secs >= 0 ? (
            <div className="countdown flex-center-center">
              <FaClock />{" "}
              {isChallenge
                ? secs + 1 > SECONDS_PER_GAME
                  ? SECONDS_PER_GAME
                  : secs + 1
                : secs}
              s
            </div>
          ) : (
            ""
          )}
          <div className="spm-count flex-center-center">
            <FaFireAlt /> {spm} SPM
          </div>
        </>
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
          gameLength={SECONDS_PER_GAME}
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
              gameOver={gameOver}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
