import { useArrangementCtx } from "./ArrangementCtx";

export const Grid = () => {
  const { gridPixel, tabFullWidth } = useArrangementCtx();

  const bx = gridPixel / 4;

  return (
    <div
      className="grid"
      style={{
        position: "absolute",
        top: 0,
        width: tabFullWidth,
        height: "100%",
      }}
    >
      <svg style={{ height: "100%", width: "100%", position: "relative" }}>
        <defs>
          <pattern
            id="grid-pattern"
            width={gridPixel}
            height="100vh"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={0}
              y={0}
              fill="var(--graduation-fill)"
              height="100vh"
              width={0.5}
            />
            <rect
              x={bx}
              y={30}
              fill="var(--graduation-fill)"
              height="100vh"
              width={0.5}
            />
            <rect
              x={bx * 2}
              y={30}
              fill="var(--graduation-fill)"
              height="100vh"
              width={0.5}
            />
            <rect
              x={bx * 3}
              y={30}
              fill="var(--graduation-fill)"
              height="100vh"
              width={0.5}
            />
          </pattern>
        </defs>

        <rect height="100%" width={tabFullWidth} fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
};
