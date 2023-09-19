import { useArrangementContext } from "../ArrangementContext";
import { useEffect, useRef } from "react";
import { cursor_step, cursor_tick_millis } from "../../audiolib/options";

export const Cursor = ({ container }) => {
  const { rulerWidth, setCursorPixel, mixerPlayState } =
    useArrangementContext();
  const ref = useRef(null);
  const atPixel = useRef(0);

  useEffect(() => {
    const cursor = ref.current;
    let intervalId = null;

    const doSyncCursor = () => {
      switch (mixerPlayState) {
        case "play":
          intervalId = setInterval(() => {
            atPixel.current += cursor_step;
            cursor.style.left = `${atPixel.current}px`;
            container.scrollLeft = `${atPixel.current - 100}`;
          }, cursor_tick_millis);
          break;
        case "pause":
          setCursorPixel(atPixel.current);
          clearInterval(intervalId);
          break;
        default:
          atPixel.current = 0;
          cursor.style.left = "0";
          container && (container.scrollLeft = 0);
          setCursorPixel(0);
          clearInterval(intervalId);
          break;
      }
    };

    doSyncCursor();

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [mixerPlayState /* TODO: setCursorPixel is not memoized */]);

  const seekPos = (e) => {
    const cursor = ref.current;
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    setCursorPixel(x);
    cursor.style.left = `${x}px`;
    atPixel.current = x;
  };

  return (
    <div
      className="cursor"
      style={{ width: rulerWidth }}
      role="button"
      onClick={seekPos}
    >
      <span className="cursor-block" ref={ref}></span>
    </div>
  );
};
