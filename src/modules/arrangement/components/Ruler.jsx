import { useMemo, useRef } from "react";
import { useArrangementContext } from "../ArrangementContext";

const Cursor = () => {
  const { tabFullWidth } = useArrangementContext();
  const cursorRef = useRef(null);

  const seekPos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    cursorRef.current.style.left = `${x}px`;
  };

  return (
    <div
      className="cursor"
      style={{ width: tabFullWidth }}
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
  const { tabFullWidth } = useArrangementContext();

  return (
    <div className="ruler" style={{ width: tabFullWidth }}>
      <Graduation />
      <Cursor />
    </div>
  );
};
