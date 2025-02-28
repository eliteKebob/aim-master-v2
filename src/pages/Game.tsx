import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MILLISECONDS_PER_GAME, SECONDS_PER_GAME } from "../constants/date";
import { GameModes } from "../constants/scores";
import { IGame } from "../types/component.types";
import SingleTarget from "../components/SingleTarget";
import GameOver from "../components/GameOver";
import Scoreboard from "../components/Scoreboard";
import PauseMenu from "../components/PauseMenu";
import Crosshair from "../assets/crosshair.png";
import { getTimezoneOffset, vhToPixels, vwToPixels } from "../utils/util";
import { saveLocalSession } from "../helpers/game";
import useSpm from "../hooks/useSpm";
import useTime from "../hooks/useTime";
import useMouseMove from "../hooks/useMouseMove";
import usePointerLock from "../hooks/usePointerLock";

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
  const navigate = useNavigate();

  const [aimed, position, setPosition] = useMouseMove({
    sensitivity: sensitivity,
    clickToHit: clickToHit,
    gameRunning: gameRunning,
  });

  const [now, secs, stoppage, setSecs] = useTime({
    gameOver: gameOver,
    startTime: startTime,
    isChallenge: isChallenge,
    gameRunning: gameRunning,
  });

  const [spm, setSpm] = useSpm({
    secs: secs,
    score: score,
    isChallenge: isChallenge,
  });

  const start = () => {
    if (game?.current) {
      setGameRunning(true);
      // centering crosshair
      setPosition((prev) => ({
        x: prev.x !== 0 ? prev.x : vwToPixels(50),
        y: prev.y !== 0 ? prev.y : vhToPixels(50),
      }));
      game.current.requestPointerLock({
        unadjustedMovement: true,
      });
    }
  };

  const [isLocked, game] = usePointerLock({
    setGameRunning: setGameRunning,
    start: start,
  });

  useEffect(() => {
    if (!gameRunning && !gameOver) {
      navigate("/");
    }
    setShowMemberForm(false);
    setStartTime(Date.now());
    if (isChallenge) {
      setScore(0);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isChallenge && user && score > 0) {
      saveLocalSession({
        mode: GameModes.Chill,
        tz_offset: getTimezoneOffset(),
        game_length: secs,
        target_size: targetSize,
        total_target: targets,
        target_hit: score,
      });
    }
    // eslint-disable-next-line
  }, [score]);

  useEffect(() => {
    if (isChallenge) {
      if (now - startTime > MILLISECONDS_PER_GAME + stoppage.total) {
        setGameOver(true);
        setGameRunning(false);
      }
    }
    // eslint-disable-next-line
  }, [secs]);

  const handleContinue = () => {
    if (isLocked) {
      document.exitPointerLock();
      setGameRunning(false);
    } else if (game?.current) {
      start();
    }
  };

  return (
    <div className="game-wrapper" id="game-table">
      <PauseMenu
        theme={theme}
        gameRunning={gameRunning}
        resumeFn={handleContinue}
        gameOver={gameOver}
      />
      <Scoreboard
        score={score}
        secs={secs}
        spm={spm}
        isChallenge={isChallenge}
        theme={theme}
        gameRunning={gameRunning}
      />
      {gameOver ? (
        <GameOver
          score={score}
          theme={theme}
          start={start}
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
            {isLocked && (
              <img
                className="crosshair"
                src={Crosshair}
                alt="crosshair"
                style={{
                  top: `${position.y}px`,
                  left: `${position.x}px`,
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
