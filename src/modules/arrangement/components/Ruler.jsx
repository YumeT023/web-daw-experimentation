import { useMemo, useRef } from "react";
import { useArrangementCtx } from "../ArrangementCtx";

const Cursor = () => {
  const { tabFullWidth } = useArrangementCtx();
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

const GradUnit = ({ unit, x }) => (
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
  const { gridPixel, gridCount } = useArrangementCtx();

  const spans = useMemo(() => {
    return Array(gridCount)
      .fill(undefined)
      .map((_, index) => (
        <GradUnit key={index * gridPixel} unit={index} x={index * gridPixel}>
          {index}
        </GradUnit>
      ));
  }, [gridPixel, gridCount]);

  return <div className="graduation">{spans}</div>;
};

export const Ruler = () => {
  const { tabFullWidth } = useArrangementCtx();

  return (
    <div className="ruler" style={{ width: tabFullWidth }}>
      <Graduation />
      <Cursor />
    </div>
  );
};
