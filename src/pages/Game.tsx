import SingleTarget from "../components/SingleTarget";
import { useState, useEffect } from "react";
import { FaClock, FaCrosshairs, FaFireAlt } from "react-icons/fa";
import GameOver from "../components/GameOver";
import { useNavigate } from "react-router-dom";
import { GameModes } from "../constants/scores";
import {
  MILLISECONDS_PER_GAME,
  MILLISECONDS_PER_MINUTE,
  SECONDS_PER_GAME,
  SECONDS_PER_MINUTE,
} from "../constants/date";
import { IGame } from "../types/component.types";

const Game = ({
  score,
  targetSize,
  gameOver,
  gameRunning,
  targets,
  theme,
  setGameOver,
  setGameRunning,
  setScore,
  setShowMemberForm,
  setStartTime,
  startTime,
  isChallenge,
  user,
  clickToHit,
}: IGame) => {
  const [targetsArr, setTargetsArr] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [secs, setSecs] = useState<number>(SECONDS_PER_GAME);
  const [now, setNow] = useState<number>(0);
  const [spm, setSpm] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!gameRunning) {
      navigate("/");
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
      const countDownDate = startTime + MILLISECONDS_PER_GAME;
      const distance = countDownDate - now;
      if (countDownDate !== distance) {
        setSecs(
          Math.floor(
            (distance % MILLISECONDS_PER_GAME) / MILLISECONDS_PER_MINUTE
          )
        );
      }
    } else {
      setSecs(Math.floor((now - startTime) / MILLISECONDS_PER_MINUTE));
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
          GameModes.Chill,
          JSON.stringify({
            tz_offset: -(new Date().getTimezoneOffset() / SECONDS_PER_MINUTE),
            game_length: secs,
            target_size: targetSize,
            total_target: targets,
            target_hit: score,
            mode: GameModes.Chill,
          })
        );
      }
    }
    // eslint-disable-next-line
  }, [score]);

  useEffect(() => {
    if (isChallenge) {
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

  const determineSecondsToRender = (): number => {
    if (isChallenge) {
      if (secs + 1 >= SECONDS_PER_GAME) {
        return SECONDS_PER_GAME;
      }
      return secs + 1;
    }
    return secs;
  };

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
          {secs >= 0 && (
            <div className="countdown flex-center-center">
              <FaClock /> {determineSecondsToRender()}s
            </div>
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
          {targetsArr?.map((_, idx) => (
            <SingleTarget
              key={idx}
              targetSize={targetSize}
              setScore={setScore}
              score={score}
              gameRunning={gameRunning}
              theme={theme}
              gameOver={gameOver}
              clickToHit={clickToHit}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
