import { useEffect } from "react";
import SetTheme from "../components/SetTheme";
import CustomizeTargets from "../components/CustomizeTargets";
import StartGame from "../components/StartGame";
import { ILanding } from "../types/component.types";

const Landing = ({
  targetSize,
  targets,
  theme,
  clickToHit,
  setGameRunning,
  setIsChallenge,
  setShowMemberForm,
  setTargetSize,
  setTargets,
  setTheme,
  clearGameSession,
  isLoggedIn,
  setClickToHit,
}: ILanding) => {
  useEffect(() => {
    clearGameSession();
    // eslint-disable-next-line
  }, []);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClickToHit(e.target.checked);
  };

  return (
    <div className="landing flex-center-center">
      <h1>Customize Your Game</h1>
      <CustomizeTargets
        targetSize={targetSize}
        targets={targets}
        theme={theme}
        setTargetSize={setTargetSize}
        setTargets={setTargets}
      />
      <SetTheme theme={theme} setTheme={setTheme} />
      <p>Mouse click to hit targets?</p>
      <label
        className="switch"
        style={{ marginTop: "1vh", "--color-button": theme }}
      >
        <input type="checkbox" onChange={handleCheckbox} checked={clickToHit} />
        <span className="slider"></span>
      </label>
      <StartGame
        theme={theme}
        isLoggedIn={isLoggedIn}
        setGameRunning={setGameRunning}
        setIsChallenge={setIsChallenge}
        setShowMemberForm={setShowMemberForm}
      />
    </div>
  );
};
export default Landing;
