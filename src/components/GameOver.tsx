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
import { useScreenshot } from "use-react-screenshot";
import { useNavigate } from "react-router-dom";
import autoAnimate from "@formkit/auto-animate";
import { SCORES } from "../constants/scores";
import { postScore } from "../requests/score";

const GameOver = ({
  setGameOver,
  score,
  theme,
  targets,
  targetSize,
  setScore,
  setSecs,
  setSpm,
  setStartTime,
  setGameRunning,
  gameLength,
}) => {
  const parentRef = useRef();
  const resultRef = createRef(null);
  const downloadRef = createRef();
  const [grade, setGrade] = useState({
    name: "Generic Grade",
    message: "Generic Grade Message",
  });
  const [opacity, setOpacity] = useState(0)
  const [image, takeScreenshot] = useScreenshot();

  const navigate = useNavigate();

  const getImage = () => takeScreenshot(resultRef.current);

  const handleRetry = () => {
    setGameOver(false);
    setScore(0);
    setSecs(gameLength);
    setSpm(0);
    setGrade("");
    setStartTime(new Date().getTime());
  };

  const handleHome = () => {
    setScore(0);
    setSecs(gameLength);
    setSpm(0);
    setGrade("");
    setStartTime("");
    setGameRunning(false);
    setGameOver(false);
    navigate("/");
  };

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  const gradeGetter = (num) => {
    for (const score of SCORES) {
      if (num >= score.min && num <= score.max) {
        return score;
      }
    }
  };

  useEffect(() => {
    let finalResult = (score * (60 / gameLength)) / (targets + targetSize);
    setGrade(gradeGetter(Math.round(finalResult)));
    const _request = async () => {
      await postScore({
        tz_offset: -(new Date().getTimezoneOffset() / 60),
        game_length: gameLength,
        target_size: targetSize,
        total_target: targets,
        target_hit: score,
        mode: "C", // "C" for challenge, "CH" for chill
      });
    };
    _request();
    const op = setTimeout(() => {
      setOpacity(1);
    }, 300);
    // clearTimeout(op);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image, downloadRef]);

  return (
    <div className="game-over-wrapper flex-center-center" ref={parentRef} style={{opacity: opacity}}>
      <div
        className="go-content flex-center-center"
        style={{ border: `0.5vh solid ${theme}` }}
      >
        <div className="go-stats flex-center-center" ref={resultRef}>
          <div className="stat-group flex-center-center">
            <div
              className="go-stat flex-center-center"
              style={{ border: `0.25vh solid ${theme}` }}
            >
              <FaCrosshairs />
              <p>
                You aimed at target{" "}
                <span style={{ fontSize: "8vh" }}>{score}</span> times
              </p>
            </div>
            <div
              className="go-stat flex-center-center"
              style={{ border: `0.25vh solid ${theme}` }}
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
            style={{ border: `0.25vh solid ${theme}` }}
          >
            <h4 className="flex-center-center" style={{gap:".5vw"}}><FaCog /> Settings</h4>
            <div className="sg-info flex-center-center">
              <p>
                Target Size:{" "}
                <span style={{ fontSize: "3vh", fontWeight: "400" }}>
                  {targetSize}
                </span>
              </p>
              <p>
                Total Targets on Screen:{" "}
                <span style={{ fontSize: "3vh", fontWeight: "400" }}>
                  {targets}
                </span>
              </p>
            </div>
          </div>
          <div
            className="aimmaster-brand flex-center-center"
            style={{ backgroundColor: theme }}
          >
            <h1>AIM</h1>
            <img src={Logo} alt="" />
            <h1>MASTER</h1>
          </div>
        </div>
        <div className="btn-group flex-center-center">
          <div
            className="go-btn flex-center-center"
            style={{ border: `0.25vh solid ${theme}` }}
            onClick={() => handleRetry()}
          >
            {" "}
            <FaRedo /> Retry
          </div>
          <div
            className="go-btn flex-center-center"
            style={{ border: `0.25vh solid ${theme}` }}
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
            style={{ border: `0.25vh solid ${theme}` }}
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
