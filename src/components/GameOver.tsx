import {
  FaCrosshairs,
  FaFileDownload,
  FaRedo,
  FaHome,
  FaAward,
  FaCog,
} from "react-icons/fa";
import { useEffect, useState, createRef, useRef } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import autoAnimate from "@formkit/auto-animate";
import { GameModes, SCORES } from "../constants/scores";
import { postScore } from "../requests/score";
import { Themes } from "../constants/themes";
import { IGrade } from "../types/score.types";
// @ts-expect-error
import { useScreenshot } from "use-react-screenshot";

type IGameOverProps = {
  score: number;
  theme: Themes;
  targets: number;
  targetSize: number;
  gameLength: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setSecs: React.Dispatch<React.SetStateAction<number>>;
  setSpm: React.Dispatch<React.SetStateAction<number>>;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

const genericGrade = {
  name: "Generic Grade",
  message: "Generic Grade Message",
};

const SECONDS_PER_MIN = 60;

const GameOver = (props: IGameOverProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const resultRef = createRef<HTMLDivElement | null>();
  const downloadRef = createRef<HTMLAnchorElement | null>();

  const [grade, setGrade] = useState<IGrade>(genericGrade);
  const [opacity, setOpacity] = useState<number>(0);
  const [image, takeScreenshot] = useScreenshot();

  const navigate = useNavigate();

  const getImage = () => takeScreenshot(resultRef.current);

  const handleRetry = () => {
    props.setGameOver(false);
    props.setScore(0);
    props.setSecs(props.gameLength);
    props.setSpm(0);
    props.setStartTime(new Date().getTime());
    setGrade(genericGrade);
  };

  const handleHome = () => {
    props.setScore(0);
    props.setSecs(props.gameLength);
    props.setSpm(0);
    props.setStartTime(0);
    props.setGameRunning(false);
    props.setGameOver(false);
    setGrade(genericGrade);
    navigate("/");
  };

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  const gradeGetter = (num: number) => {
    for (const score of SCORES) {
      if (num >= score.min && num <= score.max) {
        return score;
      }
    }
  };

  useEffect(() => {
    const finalResult =
      (props.score * (SECONDS_PER_MIN / props.gameLength)) /
      (props.targets + props.targetSize);
    const grade = gradeGetter(Math.round(finalResult)) as IGrade;
    setGrade(grade);

    const _request = async () => {
      await postScore({
        tz_offset: -(new Date().getTimezoneOffset() / SECONDS_PER_MIN),
        game_length: props.gameLength,
        target_size: props.targetSize,
        total_target: props.targets,
        target_hit: props.score,
        mode: GameModes.Challenge,
      });
    };
    _request();

    setTimeout(() => {
      setOpacity(1);
    }, 300);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (image) {
      downloadRef?.current && downloadRef.current.click();
    }
  }, [image, downloadRef]);

  return (
    <div
      className="game-over-wrapper flex-center-center"
      ref={parentRef}
      style={{ opacity: opacity }}
    >
      <div
        className="go-content flex-center-center"
        style={{ border: `0.5vh solid ${props.theme}` }}
      >
        <div className="go-stats flex-center-center" ref={resultRef}>
          <div className="stat-group flex-center-center">
            <div
              className="go-stat flex-center-center"
              style={{ border: `0.25vh solid ${props.theme}` }}
            >
              <FaCrosshairs />
              <p>
                You aimed at target{" "}
                <span style={{ fontSize: "8vh" }}>{props.score}</span> times
              </p>
            </div>
            <div
              className="go-stat flex-center-center"
              style={{ border: `0.25vh solid ${props.theme}` }}
            >
              <FaAward />
              <p>
                Grade: <span style={{ fontSize: "8vh" }}>{grade.name}</span>
                <br></br>
                {grade.message}
              </p>
            </div>
          </div>
          <div
            className="settings-group flex-center-center"
            style={{ border: `0.25vh solid ${props.theme}` }}
          >
            <h4 className="flex-center-center" style={{ gap: ".5vw" }}>
              <FaCog /> Settings
            </h4>
            <div className="sg-info flex-center-center">
              <p>
                Target Size:{" "}
                <span style={{ fontSize: "3vh", fontWeight: "400" }}>
                  {props.targetSize}
                </span>
              </p>
              <p>
                Total Targets on Screen:{" "}
                <span style={{ fontSize: "3vh", fontWeight: "400" }}>
                  {props.targets}
                </span>
              </p>
            </div>
          </div>
          <div
            className="aimmaster-brand flex-center-center"
            style={{ backgroundColor: props.theme }}
          >
            <h1>AIM</h1>
            <img src={Logo} alt="" />
            <h1>MASTER</h1>
          </div>
        </div>
        <div className="btn-group flex-center-center">
          <div
            className="go-btn flex-center-center"
            style={{ border: `0.25vh solid ${props.theme}` }}
            onClick={() => handleRetry()}
          >
            {" "}
            <FaRedo /> Retry
          </div>
          <div
            className="go-btn flex-center-center"
            style={{ border: `0.25vh solid ${props.theme}` }}
            onClick={getImage}
          >
            {" "}
            <FaFileDownload /> Download Screenshot
            {image && (
              <a
                ref={downloadRef}
                href={image}
                download="result.png"
                style={{ display: "none" }}
              >
                Download
              </a>
            )}
          </div>
          <div
            className="go-btn flex-center-center"
            style={{ border: `0.25vh solid ${props.theme}` }}
            onClick={() => handleHome()}
          >
            {" "}
            <FaHome /> Homepage
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameOver;
