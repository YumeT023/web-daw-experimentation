import { createContext, useContext, useMemo, useState } from "react";

const Ctx = createContext({
  gridPixel: 0,
  gridCount: 0,
  tabFullWidth: 0,
  beatsPerMeasure: 0,
  cursorPixel: 0,
  setCursorPixel: (pixel) => {},
});

export const ArrangementContextProvider = ({
  children,
  gridPixel,
  gridCount,
  beatsPerMeasure,
}) => {
  const [cursorPixel, setCursorPixel] = useState(0);

  return (
    <Ctx.Provider
      value={useMemo(
        () => ({
          gridPixel,
          gridCount,
          beatsPerMeasure,
          cursorPixel,
          setCursorPixel: (pixel) => setCursorPixel(pixel),
          tabFullWidth: gridCount * gridPixel,
        }),
        [gridPixel, gridCount, beatsPerMeasure, cursorPixel, setCursorPixel]
      )}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useArrangementContext = () => useContext(Ctx);
