import { useEffect, useRef } from "react";

const SingleTarget = ({
  targetSize,
  gameRunning,
  setScore,
  score,
  theme,
  gameOver
}) => {
  let targetRef = useRef(null);
  const handleHover = () => {
    if (gameRunning && !gameOver) {
      stylist();
      setScore(score + 1);
    } else {
      return;
    }
  };

  const stylist = () => {
    let rndTop = Math.floor(Math.random() * 77) + 20;
    let rndRight = Math.floor(Math.random() * 91) + 5;
    targetRef.current.style.top = `${rndTop}%`;
    targetRef.current.style.right = `${rndRight}%`;
  };

  useEffect(() => {
    if (gameRunning) {
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
        width: `${targetSize}vh`,
        height: `${targetSize}vh`,
        backgroundColor: theme,
      }}
    ></div>
  );
};
export default SingleTarget;
