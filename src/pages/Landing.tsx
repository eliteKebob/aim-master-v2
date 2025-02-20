import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Themes } from "../constants/themes";
import { FaLock } from "react-icons/fa";

type ILandingProps = {
  targetSize: number;
  targets: number;
  theme: Themes;
  setTargets: React.Dispatch<React.SetStateAction<number>>;
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
  setIsChallenge: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMemberForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTargetSize: React.Dispatch<React.SetStateAction<number>>;
  clearGameSession: () => void;
  isLoggedIn: () => boolean;
};

const Landing = (props: ILandingProps) => {
  const navigate = useNavigate();

  const handleClick = (challenge: boolean = false) => {
    if (!props.isLoggedIn() && challenge) {
      props.setShowMemberForm(true);
      return;
    }
    props.setGameRunning(true);
    challenge && props.setIsChallenge(true);
    navigate("/game");
  };

  const handleTarget = (el: HTMLInputElement, isSize: boolean) => {
    let val = parseInt(el.value);
    const min = parseInt(el.min);
    const max = parseInt(el.max);
    val = Math.min(Math.max(val, min), max);
    isSize ? props.setTargetSize(val) : props.setTargets(val);
  };

  useEffect(() => {
    props.clearGameSession();
    // eslint-disable-next-line
  }, []);

  const challengeBtnStyles = {
    backgroundColor: props.theme,
    position: "relative" as const,
  };

  return (
    <div className="landing flex-center-center">
      <h1>Customize Your Game</h1>
      <div className="set-size flex-center-center">
        <p>Set How Big Target is (1-20)</p>
        <input
          type="number"
          value={props.targetSize}
          onChange={(e) => handleTarget(e.target, true)}
          max="20"
          min="1"
          style={{ backgroundColor: props.theme }}
        />
        <div
          className="st-example"
          style={{
            width: `${props.targetSize === 1 ? 0.5 : props.targetSize - 1}vh`,
            height: `${props.targetSize === 1 ? 0.5 : props.targetSize - 1}vh`,
            backgroundColor: props.theme,
          }}
        ></div>
      </div>
      <div className="set-target-amount flex-center-center">
        <p>Set How Many Targets on Screen (1-30)</p>
        <input
          type="number"
          value={props.targets}
          onChange={(e) => handleTarget(e.target, false)}
          max="30"
          min="1"
          style={{ backgroundColor: props.theme }}
        />
      </div>
      <p className="cam-text">Choose a Theme</p>
      <div className="set-theme flex-center-center">
        {(Object.keys(Themes) as Array<keyof typeof Themes>)?.map((t) => (
          <div
            className={`theme theme-${Themes[t]}`}
            onClick={() => props.setTheme(Themes[t])}
            style={{ backgroundColor: Themes[t] }}
            key={String(Themes[t]) + String(Math.random())}
          ></div>
        ))}
      </div>
      <p className="cam-text">Choose a Mode</p>
      <div className="start-game flex-center-center">
        <div
          className="sg-btn flex-center-center"
          style={{ backgroundColor: props.theme }}
          onClick={() => handleClick()}
        >
          CHILL
        </div>
        <div
          className="sg-btn flex-center-center challenge-btn"
          style={challengeBtnStyles}
          onClick={() => handleClick(true)}
        >
          {!props.isLoggedIn() ? (
            <FaLock
              style={{ cursor: "pointer" }}
              title="Sign in to unlock this feature"
            />
          ) : (
            "CHALLENGE"
          )}
        </div>
      </div>
    </div>
  );
};
export default Landing;
