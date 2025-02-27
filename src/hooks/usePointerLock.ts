import { useEffect, useRef, useState } from "react";
import { IPointerLock } from "../types/component.types";

const usePointerLock = ({ setGameRunning }: IPointerLock) => {
  const game = useRef<HTMLDivElement>(null);

  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    const handleLockChange = () => {
      setIsLocked(document.pointerLockElement === game?.current);
      setGameRunning(document.pointerLockElement === game?.current);
    };
    document.addEventListener("pointerlockchange", handleLockChange);
    return () => {
      document.removeEventListener("pointerlockchange", handleLockChange);
    };
    // eslint-disable-next-line
  }, []);

  return [isLocked, game] as const;
};

export default usePointerLock;
