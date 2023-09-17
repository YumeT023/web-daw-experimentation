import { useArrangementContext } from "../ArrangementContext";
import { useMemo } from "react";

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

export const Graduation = () => {
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
