import SingleTarget from "../components/SingleTarget";
import { useState, useEffect, useRef } from "react";
import GameOver from "../components/GameOver";
import { useNavigate } from "react-router-dom";
import { GameModes } from "../constants/scores";
import {
  MILLISECONDS_PER_GAME,
  MILLISECONDS_PER_MINUTE,
  SECONDS_PER_GAME,
  SECONDS_PER_MINUTE,
} from "../constants/date";
import { IGame, IMouseCoordinates } from "../types/component.types";
import Scoreboard from "../components/Scoreboard";
import Crosshair from "../assets/crosshair.png";

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
  sensitivity,
}: IGame) => {
  const game = useRef<HTMLDivElement>(null);

  const [secs, setSecs] = useState<number>(SECONDS_PER_GAME);
  const [now, setNow] = useState<number>(0);
  const [spm, setSpm] = useState<number>(0);

  const [position, setPosition] = useState<IMouseCoordinates>({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [aimed, setAimed] = useState<IMouseCoordinates>({ x: 0, y: 0 });

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
    const handleMouseMove = (e: MouseEvent) => {
      setPosition((prev) => {
        const coordinates = {
          x: prev.x + e.movementX * sensitivity,
          y: prev.y + e.movementY * sensitivity,
        };
        return coordinates;
      });
    };
    const handleAim = (e: MouseEvent) => {
      setPosition((prev) => {
        const coordinates = { x: prev.x, y: prev.y };
        setAimed(coordinates);
        return coordinates;
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    clickToHit && document.addEventListener("click", handleAim);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clickToHit && document.removeEventListener("click", handleAim);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleLockChange = () => {
      setIsLocked(document.pointerLockElement === game.current);
    };
    document.addEventListener("pointerlockchange", handleLockChange);
    return () => {
      document.removeEventListener("pointerlockchange", handleLockChange);
    };
  }, []);

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

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      document.exitPointerLock();
    } else if (game.current) {
      setPosition({ x: e.clientX, y: e.clientY });
      game.current.requestPointerLock({
        unadjustedMovement: true,
      });
    }
  };

  return (
    <div className="game-wrapper" id="game-table">
      <Scoreboard
        score={score}
        secs={secs}
        spm={spm}
        isChallenge={isChallenge}
        theme={theme}
      />
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
          <div id="game" ref={game}>
            <p onClick={handleClick} style={{ cursor: "pointer" }}>
              {isLocked ? "Pointer Locked" : "Click to Lock Pointer"}
            </p>
            {isLocked && (
              <img
                src={Crosshair}
                alt="crosshair"
                style={{
                  width: "20px",
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                  transform: "translate(-50%, -50%)",
                  position: "absolute",
                  zIndex: "6",
                  pointerEvents: "none",
                }}
              ></img>
            )}
            {[...Array(targets)]?.map((_, idx) => (
              <SingleTarget
                key={idx}
                targetSize={targetSize}
                setScore={setScore}
                gameRunning={gameRunning}
                theme={theme}
                gameOver={gameOver}
                clickToHit={clickToHit}
                position={position}
                aimed={aimed}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
