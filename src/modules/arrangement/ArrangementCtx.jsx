import { createContext, useContext, useMemo } from "react";

const Ctx = createContext({
  gridPixel: 0,
  gridCount: 0,
  tabFullWidth: 0,
  beatsPerMeasure: 0,
});

export const ArrangementCtxProvider = ({
  children,
  gridPixel,
  gridCount,
  beatsPerMeasure,
}) => {
  return (
    <Ctx.Provider
      value={useMemo(
        () => ({
          gridPixel,
          gridCount,
          beatsPerMeasure,
          tabFullWidth: gridCount * gridPixel,
        }),
        [gridPixel, gridCount, beatsPerMeasure]
      )}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useArrangementCtx = () => useContext(Ctx);
