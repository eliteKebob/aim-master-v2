import { IPauseMenu } from "../types/component.types";

const PauseMenu = ({ gameRunning, theme, resumeFn }: IPauseMenu) => {

  return (
    <div
      className={"pause-menu-wrapper flex-center-center " + (!gameRunning ? "active" : "passive")}
    >
      <h1>Paused</h1>
      <p style={{backgroundColor: theme}} onClick={resumeFn}>Continue</p>
    </div>
  );
};

export default PauseMenu;
