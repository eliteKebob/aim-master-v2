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
import useMouseMove from "../hooks/useMouseMove";
import useTime from "../hooks/useTime";
import useSpm from "../hooks/useSpm";
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
  });

  const [now, secs, setSecs] = useTime({
    gameOver: gameOver,
    startTime: startTime,
    isChallenge: isChallenge,
    gameRunning: gameRunning,
  });

  const [spm, setSpm] = useSpm({
    isChallenge: isChallenge,
    score: score,
    secs: secs,
  });

  const [isLocked, game] = usePointerLock({
    setGameRunning: setGameRunning,
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
      if (now - startTime > MILLISECONDS_PER_GAME) {
        setGameOver(true);
      }
    }
    // eslint-disable-next-line
  }, [secs]);

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      document.exitPointerLock();
      setGameRunning(false);
    } else if (game?.current) {
      // centering crosshair
      setPosition({
        x: vwToPixels(50),
        y: vhToPixels(50),
      });
      game.current.requestPointerLock({
        unadjustedMovement: true,
      });
      setGameRunning(true);
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
