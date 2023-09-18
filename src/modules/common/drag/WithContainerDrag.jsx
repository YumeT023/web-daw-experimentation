import Draggable from "react-draggable";
import { useRef, useState } from "react";

export const WithContainerDrag = ({ children, render, ...boxProps }) => {
  const [x, setX] = useState();

  /** @type MutableRefObject<HTMLDivElement> */
  const ref = useRef(null);

  const onStart = () => {
    ref.current.style.border = "1px solid #fff";
    ref.current.style.cursor = "grab";
  };

  const onStop = (_, o) => {
    console.log("o->x", o.x);
    setX(() => o.x);
    ref.current.style.borderColor = "transparent";
    ref.current.style.cursor = "default";
  };

  return (
    <Draggable bounds="parent" axis="x" onStop={onStop} onStart={onStart}>
      <div className="box" ref={ref} {...boxProps}>
        {render({ x })}
      </div>
    </Draggable>
  );
};
