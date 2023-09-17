import { useEffect, useMemo, useRef } from "react";
import { useArrangementContext } from "../ArrangementContext";
import { cursor_step, cursor_tick_millis } from "../../audiolib/options";

const Cursor = () => {
  const { rulerWidth, setCursorPixel, cursorPixel, mixerPlayState } =
    useArrangementContext();
  const cursorRef = useRef(null);
  const cursorPixelTemp = useRef(cursorPixel);
  const tickRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let tick;

    const syncInternalCursorState = () => {
      switch (mixerPlayState) {
        case "play":
          tick = setInterval(() => {
            cursorPixelTemp.current += cursor_step;
            cursor.style.left = `${cursorPixelTemp.current}px`;
          }, cursor_tick_millis);

          tickRef.current = tick;
          break;
        case "pause":
          setCursorPixel(cursorPixelTemp.current);
          clearInterval(tickRef.current);
          break;
        case "stop":
          cursor.style.left = 0;
          cursorPixelTemp.current = 0;
          clearInterval(tickRef.current);
          break;
        default:
          throw new Error("unexpected mixer play state: " + mixerPlayState);
      }
    };

    cursor && syncInternalCursorState();

    return () => {
      tick && clearInterval(tick);
    };
  }, [cursorRef, cursorPixel, tickRef, mixerPlayState]);

  useEffect(() => {
    cursorRef.current.style.left = `${cursorPixel}px`;
    cursorPixelTemp.current = cursorPixel;
  }, [cursorRef, cursorPixel]);

  const seekPos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setCursorPixel(x);
    cursorRef.current.style.left = `${x}px`;
  };

  return (
    <div
      className="cursor"
      style={{ width: rulerWidth }}
      role="button"
      onClick={seekPos}
    >
      <span className="cursor-block" ref={cursorRef}></span>
    </div>
  );
};

const GraduationUnit = ({ unit, x }) => (
  <span
    style={{
      left: `${x}px`,
      position: "absolute",
      textIndent: "5px",
      fontSize: "12px",
    }}
  >
    {unit}
  </span>
);

const Graduation = () => {
  const { gridPixel, gridCount } = useArrangementContext();

  const spans = useMemo(() => {
    return Array(gridCount)
      .fill(undefined)
      .map((_, index) => (
        <GraduationUnit
          key={index * gridPixel}
          unit={index}
          x={index * gridPixel}
        >
          {index}
        </GraduationUnit>
      ));
  }, [gridPixel, gridCount]);

  return <div className="graduation">{spans}</div>;
};

export const Ruler = () => {
  const { rulerWidth } = useArrangementContext();

  return (
    <div className="ruler" style={{ width: rulerWidth }}>
      <Graduation />
      <Cursor />
    </div>
  );
};
