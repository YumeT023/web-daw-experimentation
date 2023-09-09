import { createContext, useContext, useMemo } from "react";

const Ctx = createContext({
  gridPixel: 0,
  gridCount: 0,
  tabFullWidth: 0,
});

export const ArrangementCtxProvider = ({ children, gridPixel, gridCount }) => {
  return (
    <Ctx.Provider
      value={useMemo(
        () => ({
          gridPixel,
          gridCount,
          tabFullWidth: gridCount * gridPixel,
        }),
        [gridPixel, gridCount]
      )}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useArrangementCtx = () => useContext(Ctx);
