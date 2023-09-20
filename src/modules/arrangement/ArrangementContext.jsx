import { createContext, useContext, useMemo, useRef, useState } from "react";
import { useMixerPlayState } from "./hooks/useMixerPlayState";
import { min_grid_count } from "../audiolib/options";

const Ctx = createContext({
  gridPixel: 0,
  gridCount: 0,
  rulerWidth: 0,
  beatsPerMeasure: 0,
  cursorPixel: 0,
  updateGridCount: (timeSeconds) => {},
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
  beatsPerMeasure,
}) => {
  const [cursorPixel, setCursorPixel] = useState(0);
  const [mixerPlayState, mixerPlayStateAction] = useMixerPlayState();
  const [gridCount, setGridCount] = useState(min_grid_count);
  const isGridCountUpdated = useRef(false);

  return (
    <Ctx.Provider
      value={useMemo(
        () => ({
          gridPixel,
          gridCount,
          updateGridCount: (timeSeconds) => {
            const newGridCount = Math.round(timeSeconds) + 1;
            setGridCount((prev) => Math.max(prev, newGridCount));
            isGridCountUpdated.current = true;
          },
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
          setGridCount,
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
