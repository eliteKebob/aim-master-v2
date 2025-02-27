import { useEffect, useState } from "react";
import { IMouseCoordinates, IMouseMove } from "../types/component.types";
import { throttle } from "lodash";

const defaultCoordinates: IMouseCoordinates = {
  x: 0,
  y: 0,
};

const useMouseMove = ({ sensitivity, clickToHit }: IMouseMove) => {
  const [aimed, setAimed] = useState<IMouseCoordinates>(defaultCoordinates);
  const [position, setPosition] =
    useState<IMouseCoordinates>(defaultCoordinates);

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setPosition((prev) => {
        const coordinates = {
          x: prev.x + e.movementX * sensitivity,
          y: prev.y + e.movementY * sensitivity,
        };
        return coordinates;
      });
    }, 1); // make this 1 value as performance setting

    const handleAim = (e: MouseEvent) => {
      setPosition((prev) => {
        const coordinates = { x: prev.x, y: prev.y };
        setAimed(coordinates);
        return coordinates;
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    clickToHit && document.addEventListener("click", handleAim);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      handleMouseMove.cancel();
      clickToHit && document.removeEventListener("click", handleAim);
    };
    // eslint-disable-next-line
  }, []);

  return [aimed, position, setPosition] as const;
};

export default useMouseMove;
