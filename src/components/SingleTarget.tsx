import { useEffect, useRef } from "react";
import { ISingleTarget } from "../types/component.types";

const SingleTarget = ({
  targetSize,
  gameRunning,
  setScore,
  score,
  theme,
  gameOver,
  clickToHit,
}: ISingleTarget) => {
  let targetRef = useRef<HTMLDivElement | null>(null);

  const handleTargetHit = (e: React.MouseEvent<HTMLDivElement>) => {
    const hit = () => {
      if (gameRunning && !gameOver) {
        stylist();
        setScore(score + 1);
      }
    };
    switch (e.type) {
      case "click":
        clickToHit && hit();
        break;
      case "mouseover":
        !clickToHit && hit();
        break;
    }
  };

  const stylist = () => {
    const rndTop = Math.floor(Math.random() * 77) + 20;
    const rndRight = Math.floor(Math.random() * 91) + 5;
    targetRef?.current && (targetRef.current.style.top = `${rndTop}%`);
    targetRef?.current && (targetRef.current.style.right = `${rndRight}%`);
  };

  useEffect(() => {
    if (gameRunning) {
      stylist();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="single-target"
      ref={targetRef}
      onMouseOver={(e) => handleTargetHit(e)}
      onClick={(e) => handleTargetHit(e)}
      style={{
        width: `${targetSize}vh`,
        height: `${targetSize}vh`,
        backgroundColor: theme,
      }}
    ></div>
  );
};
export default SingleTarget;
