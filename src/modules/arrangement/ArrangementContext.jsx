import { createContext, useContext, useMemo, useState } from "react";
import { useMixerPlayState } from "./hooks/useMixerPlayState";

const Ctx = createContext({
  gridPixel: 0,
  gridCount: 0,
  rulerWidth: 0,
  beatsPerMeasure: 0,
  cursorPixel: 0,
  setCursorPixel: (px) => {},
  mixerPlayState: "stop",
  mixerPlayStateAction: {
    pause: () => {},
    play: () => {},
    stop: () => {},
    playPause: () => {},
  },
});

export const ArrangementContextProvider = ({
  children,
  gridPixel,
  gridCount,
  beatsPerMeasure,
}) => {
  const [cursorPixel, setCursorPixel] = useState(0);
  const [mixerPlayState, mixerPlayStateAction] = useMixerPlayState();

  return (
    <Ctx.Provider
      value={useMemo(
        () => ({
          gridPixel,
          gridCount,
          beatsPerMeasure,
          cursorPixel,
          rulerWidth: gridCount * gridPixel,
          setCursorPixel: (pixel) => setCursorPixel(pixel),
          mixerPlayState,
          mixerPlayStateAction,
        }),
        [
          gridPixel,
          gridCount,
          beatsPerMeasure,
          cursorPixel,
          setCursorPixel,
          mixerPlayState,
          mixerPlayStateAction,
        ]
      )}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useArrangementContext = () => useContext(Ctx);
