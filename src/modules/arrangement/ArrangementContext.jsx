import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMixerPlayState } from "./hooks/useMixerPlayState";
import { min_grid_count } from "../audiolib/options";
import { Mixer } from "../audiolib/Mixer";
import { toTime } from "../audiolib/utils";

const Ctx = createContext({
  gridPixel: 0,
  gridCount: 0,
  rulerWidth: 0,
  beatsPerMeasure: 0,
  cursorPixel: 0,
  updateGridCount: (timeSeconds) => {},
  setCursorPixel: (px) => {},
  mixer: new Mixer(),
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

  const mixer = useRef(new Mixer([]));

  useEffect(() => {
    const doUpdateMixer = () => {
      switch (mixerPlayState) {
        case "play":
          mixer.current.play();
          break;
        case "pause":
          mixer.current.pause();
          break;
        default:
          mixer.current.stop();
          break;
      }
    };
    doUpdateMixer();
  }, [mixer, mixerPlayState]);

  return (
    <Ctx.Provider
      value={useMemo(
        () => ({
          gridPixel,
          gridCount,
          mixer: mixer.current,
          updateGridCount: (timeSeconds) => {
            const newGridCount = Math.round(timeSeconds) + 1;
            setGridCount((prev) => Math.max(prev, newGridCount));
            isGridCountUpdated.current = true;
          },
          beatsPerMeasure,
          cursorPixel,
          rulerWidth: gridCount * gridPixel,
          setCursorPixel: (pixel) => {
            mixer.current.currentTime = toTime(pixel);
            setCursorPixel(pixel);
          },
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
          mixer,
        ]
      )}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useArrangementContext = () => useContext(Ctx);
