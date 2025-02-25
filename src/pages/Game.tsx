import SingleTarget from "../components/SingleTarget";
import { useState, useEffect, useRef } from "react";
import GameOver from "../components/GameOver";
import { useNavigate } from "react-router-dom";
import { GameModes } from "../constants/scores";
import {
  MILLISECONDS_PER_GAME,
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_GAME,
  SECONDS_PER_MINUTE,
} from "../constants/date";
import { IGame, IMouseCoordinates } from "../types/component.types";
import Scoreboard from "../components/Scoreboard";
import Crosshair from "../assets/crosshair.png";
import { _scroll, getTimezoneOffset, vhToPixels, vwToPixels } from "../utils/util";
import { HEADER_HEIGHT } from "../constants/style";
import PauseMenu from "../components/PauseMenu";
import { throttle } from "lodash";

const Game = ({
  user,
  theme,
  score,
  targetSize,
  gameOver,
  gameRunning,
  targets,
  startTime,
  isChallenge,
  clickToHit,
  sensitivity,
  setGameOver,
  setGameRunning,
  setScore,
  setShowMemberForm,
  setStartTime,
}: IGame) => {
  const game = useRef<HTMLDivElement>(null);

  const defaultCoordinates: IMouseCoordinates = {
    x: 0,
    y: -vhToPixels(HEADER_HEIGHT.numeric),
  };

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [secs, setSecs] = useState<number>(SECONDS_PER_GAME);
  const [now, setNow] = useState<number>(0);
  const [spm, setSpm] = useState<number>(0);
  const [position, setPosition] =
    useState<IMouseCoordinates>(defaultCoordinates);
  const [aimed, setAimed] = useState<IMouseCoordinates>(defaultCoordinates);

  const navigate = useNavigate();

  useEffect(() => {
    if (!gameRunning && !gameOver) {
      navigate("/");
    }
    setShowMemberForm(false);
    setStartTime(new Date().getTime());
    if (isChallenge) {
      setScore(0);
      setSpm(0);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    _scroll(vhToPixels(HEADER_HEIGHT.numeric));
    const handleMouseMove = throttle((e: MouseEvent) => {
      setPosition((prev) => {
        const coordinates = {
          x: prev.x + e.movementX * sensitivity,
          y: prev.y + e.movementY * sensitivity,
        };
        return coordinates;
      });
    }, 1); // make this 1 value as performance setting

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
      handleMouseMove.cancel();
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
  }, MILLISECONDS_PER_SECOND);

  useEffect(() => {
    if (isChallenge) {
      const countDownDate = startTime + MILLISECONDS_PER_GAME;
      const distance = countDownDate - now;
      if (countDownDate !== distance) {
        setSecs(
          Math.floor(
            (distance % MILLISECONDS_PER_GAME) / MILLISECONDS_PER_SECOND
          )
        );
      }
    } else {
      setSecs(Math.floor((now - startTime) / MILLISECONDS_PER_SECOND));
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
            tz_offset: getTimezoneOffset(),
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
      setGameRunning(false)
    } else if (game?.current) {
      // centering crosshair
      setPosition({
        x: vwToPixels(50),
        y: vhToPixels(50 + HEADER_HEIGHT.numeric),
      });
      game.current.requestPointerLock({
        unadjustedMovement: true,
      });
      setGameRunning(true)
    }
  };

  return (
    <div className="game-wrapper" id="game-table">
      <PauseMenu theme={theme} gameRunning={gameRunning} />
      <Scoreboard
        score={score}
        secs={secs}
        spm={spm}
        isChallenge={isChallenge}
        theme={theme}
      />
      {gameOver ? (
        <GameOver
          score={score}
          theme={theme}
          targets={targets}
          targetSize={targetSize}
          gameLength={SECONDS_PER_GAME}
          setSpm={setSpm}
          setSecs={setSecs}
          setScore={setScore}
          setGameOver={setGameOver}
          setStartTime={setStartTime}
          setGameRunning={setGameRunning}
        />
      ) : (
        <>
          <div id="game" ref={game}>
            <p onClick={handleClick} style={{ cursor: "pointer" }}>
              {isLocked ? "Pause" : "Resume"}
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
