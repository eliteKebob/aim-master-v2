import { useEffect } from "react";
import { IPauseMenu } from "../types/component.types";

const PauseMenu = ({ gameRunning, theme }: IPauseMenu) => {
  useEffect(() => {
    console.log("game paused")
    // eslint-disable-next-line
  }, [gameRunning]);

  return (
    <div
      className={"pause-menu-wrapper " + (!gameRunning ? "active" : "passive")}
    >
      PauseMenu
    </div>
  );
};

export default PauseMenu;
