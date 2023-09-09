import { useArrangementCtx } from "./ArrangementCtx";
import { useMemo } from "react";

const Cursor = () => {};

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

  return <div style={{ position: "relative", color: "#bcbcbc" }}>{spans}</div>;
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
