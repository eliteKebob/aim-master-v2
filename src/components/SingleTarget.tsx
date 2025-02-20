import { useEffect, useRef } from "react";
import { Themes } from "../constants/themes";

type ISingleTarget = {
  targetSize: number;
  gameRunning: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  theme: Themes;
  gameOver: boolean;
};

const SingleTarget = (props: ISingleTarget) => {
  let targetRef = useRef<HTMLDivElement | null>(null);
  const handleHover = () => {
    if (props.gameRunning && !props.gameOver) {
      stylist();
      props.setScore(props.score + 1);
    } else {
      return;
    }
  };

  const stylist = () => {
    const rndTop = Math.floor(Math.random() * 77) + 20;
    const rndRight = Math.floor(Math.random() * 91) + 5;
    targetRef?.current && (targetRef.current.style.top = `${rndTop}%`);
    targetRef?.current && (targetRef.current.style.right = `${rndRight}%`);
  };

  useEffect(() => {
    if (props.gameRunning) {
      stylist();
    } else {
      return;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="single-target"
      ref={targetRef}
      onMouseOver={() => handleHover()}
      style={{
        width: `${props.targetSize}vh`,
        height: `${props.targetSize}vh`,
        backgroundColor: props.theme,
      }}
    ></div>
  );
};
export default SingleTarget;
