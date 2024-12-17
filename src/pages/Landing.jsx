import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { THEMES } from "../constants/themes";
import { FaLock } from "react-icons/fa";

const Landing = ({
  targetSize,
  setTargetSize,
  targets,
  setTargets,
  setGameRunning,
  theme,
  setTheme,
  setIsChallenge,
  clearGameSession,
  user,
  setShowMemberForm,
}) => {
  const navigate = useNavigate();

  const handleClick = (challenge = false) => {
    if (!user && challenge) {
      setShowMemberForm(true);
      return;
    }
    setGameRunning(true);
    navigate("/game");
    challenge && setIsChallenge(true);
  };

  const handleTarget = (el, isSize) => {
    let val = parseInt(el.value);
    const min = parseInt(el.min);
    const max = parseInt(el.max);
    val = val !== "" ? Math.min(Math.max(val, min), max) : min;
    isSize ? setTargetSize(val) : setTargets(val);
  };

  useEffect(() => {
    clearGameSession();
    // eslint-disable-next-line
  }, []);

  const challengeBtnStyles = {
    backgroundColor: theme,
    position: "relative",
  };

  return (
    <div className="landing flex-center-center">
      <h1>Customize Your Game</h1>
      <div className="set-size flex-center-center">
        <p>Set How Big Target is (1-20)</p>
        <input
          type="number"
          value={targetSize}
          onChange={(e) => handleTarget(e.target, true)}
          max="20"
          min="1"
          style={{ backgroundColor: theme }}
        />
        <div
          className="st-example"
          style={{
            width: `${targetSize === 1 ? 0.5 : targetSize - 1}vh`,
            height: `${targetSize === 1 ? 0.5 : targetSize - 1}vh`,
            backgroundColor: theme,
          }}
        ></div>
      </div>
      <div className="set-target-amount flex-center-center">
        <p>Set How Many Targets on Screen (1-30)</p>
        <input
          type="number"
          value={targets}
          onChange={(e) => handleTarget(e.target, false)}
          max="30"
          min="1"
          style={{ backgroundColor: theme }}
        />
      </div>
      <p className="cam-text">Choose a Theme</p>
      <div className="set-theme flex-center-center">
        {THEMES?.map((t) => (
          <div
            className={`theme theme-${t}`}
            onClick={() => setTheme(t)}
            style={{ backgroundColor: t }}
            key={String(t) + String(Math.random())}
          ></div>
        ))}
      </div>
      <p className="cam-text">Choose a Mode</p>
      <div className="start-game flex-center-center">
        <div
          className="sg-btn flex-center-center"
          style={{ backgroundColor: theme }}
          onClick={() => handleClick()}
        >
          CHILL
        </div>
        <div
          className="sg-btn flex-center-center challenge-btn"
          style={challengeBtnStyles}
          onClick={() => handleClick(true)}
        >
          {!user ? <FaLock style={{ cursor: "pointer" }} title="Sign in to unlock this feature" /> : "CHALLENGE"}
        </div>
      </div>
    </div>
  );
};
export default Landing;
