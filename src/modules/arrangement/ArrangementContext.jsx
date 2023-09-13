import { createContext, useContext, useMemo, useRef, useState } from "react";
import { cursor_step, cursor_tick_millis } from "../audiolib/options";

const Ctx = createContext({
  gridPixel: 0,
  gridCount: 0,
  rulerWidth: 0,
  beatsPerMeasure: 0,
  cursorPixel: 0,
  isPlaying: false,
  stop: () => {},
  playPause: () => {},
  setCursorPixel: (px) => {},
});

export const ArrangementContextProvider = ({
  children,
  gridPixel,
  gridCount,
  beatsPerMeasure,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPixel, setCursorPixel] = useState(0);
  const tickRef = useRef(null);

  const tickInterval = () => {
    tickRef.current = setInterval(() => {
      setCursorPixel((prev) => prev + cursor_step);
    }, cursor_tick_millis);
  };

  return (
    <Ctx.Provider
      value={useMemo(
        () => ({
          gridPixel,
          gridCount,
          beatsPerMeasure,
          cursorPixel,
          rulerWidth: gridCount * gridPixel,
          isPlaying,
          stop: () => {
            setIsPlaying(false);
            setCursorPixel(0);
            tickRef.current && clearInterval(tickRef.current);
          },
          playPause: () =>
            setIsPlaying((is) => {
              const _v = !is;
              tickRef.current && clearInterval(tickRef.current);
              if (_v) {
                tickInterval();
              }
              return _v;
            }),
          setCursorPixel: (pixel) => setCursorPixel(pixel),
        }),
        [
          gridPixel,
          gridCount,
          beatsPerMeasure,
          cursorPixel,
          isPlaying,
          setCursorPixel,
          setIsPlaying,
        ]
      )}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useArrangementContext = () => useContext(Ctx);
