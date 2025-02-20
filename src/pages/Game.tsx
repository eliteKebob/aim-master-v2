import SingleTarget from "../components/SingleTarget";
import { useState, useEffect } from "react";
import { FaClock, FaCrosshairs, FaFireAlt } from "react-icons/fa";
import GameOver from "../components/GameOver";
import { useNavigate } from "react-router-dom";
import { GameModes } from "../constants/scores";
import { Themes } from "../constants/themes";
import { IAuthResponse } from "../types/auth.types";

type IGameProps = {
  score: number;
  targetSize: number;
  gameRunning: boolean;
  theme: Themes;
  targets: number;
  startTime: number;
  isChallenge: boolean;
  gameOver: boolean;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMemberForm: React.Dispatch<React.SetStateAction<boolean>>;
  user: IAuthResponse;
};

const Game = (props: IGameProps) => {
  const [targetsArr, setTargetsArr] = useState([0, 1, 2, 3, 4, 5, 6]); // default 7 targets
  const [secs, setSecs] = useState(5);
  const [now, setNow] = useState(0);
  const [spm, setSpm] = useState(0);

  const navigate = useNavigate();

  const SECONDS_PER_GAME = 30;
  const MILLISECONDS_PER_MINUTE = 1000;
  const MILLISECONDS_PER_GAME = SECONDS_PER_GAME * MILLISECONDS_PER_MINUTE;
  const SECONDS_PER_MINUTE = 60;

  useEffect(() => {
    if (!props.gameRunning) {
      navigate("/");
    }
    props.setShowMemberForm(false);
    props.setStartTime(new Date().getTime());
    if (props.isChallenge === true) {
      props.setScore(0);
      setSpm(0);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let newTargetsArr = [];
    for (let i = 0; i < props.targets; i++) newTargetsArr.push(i);
    setTargetsArr(newTargetsArr);
    // eslint-disable-next-line
  }, [props.targets]);

  var x = setInterval(function () {
    if (!props.gameOver) {
      setNow(new Date().getTime());
      clearInterval(x);
    }
  }, 1000);

  useEffect(() => {
    if (props.isChallenge) {
      let countDownDate = props.startTime + MILLISECONDS_PER_GAME;
      let distance = countDownDate - now;
      setSecs(
        Math.floor((distance % MILLISECONDS_PER_GAME) / MILLISECONDS_PER_MINUTE)
      );
    } else {
      setSecs(Math.floor((now - props.startTime) / MILLISECONDS_PER_MINUTE));
    }
    // eslint-disable-next-line
  }, [now]);

  useEffect(() => {
    if (props.isChallenge === true) {
      if (secs > 0) {
        setSpm(
          Math.floor(
            (props.score / (SECONDS_PER_GAME + 1 - secs)) * SECONDS_PER_MINUTE
          )
        );
      } else {
        setSpm(0);
        return;
      }
    } else {
      if (props.score > 0 && props.user) {
        localStorage.setItem(
          "chill",
          JSON.stringify({
            tz_offset: -(new Date().getTimezoneOffset() / SECONDS_PER_MINUTE),
            game_length: secs,
            target_size: props.targetSize,
            total_target: props.targets,
            target_hit: props.score,
            mode: GameModes.Chill,
          })
        );
      }
    }
    // eslint-disable-next-line
  }, [props.score]);

  useEffect(() => {
    if (props.isChallenge === true) {
      if (now - props.startTime > MILLISECONDS_PER_GAME) {
        props.setGameOver(true);
      }
    } else {
      if (props.score > 0 && secs > 0) {
        setSpm(Math.floor((props.score / secs) * SECONDS_PER_MINUTE));
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
        style={{ borderBottom: `0.5vh solid ${props.theme}` }}
      >
        <div className="score-count flex-center-center">
          <FaCrosshairs /> {props.score}
        </div>
        <>
          {secs >= 0 ? (
            <div className="countdown flex-center-center">
              <FaClock />{" "}
              {props.isChallenge
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
      {props.gameOver ? (
        <GameOver
          setGameOver={props.setGameOver}
          score={props.score}
          theme={props.theme}
          targetSize={props.targetSize}
          targets={props.targets}
          setScore={props.setScore}
          setSecs={setSecs}
          setSpm={setSpm}
          setStartTime={props.setStartTime}
          setGameRunning={props.setGameRunning}
          gameLength={SECONDS_PER_GAME}
        />
      ) : (
        <>
          {targetsArr?.map((_, idx) => (
            <SingleTarget
              key={idx}
              targetSize={props.targetSize}
              setScore={props.setScore}
              score={props.score}
              gameRunning={props.gameRunning}
              theme={props.theme}
              gameOver={props.gameOver}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
