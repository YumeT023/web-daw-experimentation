import { useEffect, useMemo, useRef, useState } from "react";
import { useArrangementContext } from "../../arrangement";
import { grid_pixel } from "../../audiolib/options";
import { toMillis, toTime } from "../../audiolib/utils";

// TODO: put this in a more appropriate place
const syncInternalAudioState = ({ audio, startTime }, state) => {
  switch (state) {
    case "play":
      setTimeout(() => audio.play(), startTime);
      break;
    case "pause":
      audio.pause();
      break;
    case "stop":
      audio.currentTime = 0;
      audio.pause();
      break;
    default:
      throw new Error("unexpected mixer play state: " + state);
  }
};

export const LoadableAudio = ({ id, startAtPixel = 0 }) => {
  const [hasImported, setHasImported] = useState(false);
  const { cursorPixel, mixerPlayState } = useArrangementContext();
  const ref = useRef(new Audio());

  const startTime = useMemo(() => toTime(startAtPixel), [startAtPixel]);
  const cursorTime = useMemo(() => toTime(cursorPixel), [cursorPixel]);

  useEffect(() => {
    const audio = ref.current;

    let timeoutID = null;

    const doUpdatePlayback = async () => {
      audio.currentTime = 0;
      audio.pause();

      const isCursorBeforeTrack = cursorTime < audio.duration + startTime;

      if (isCursorBeforeTrack) {
        const currentTime = cursorTime > startTime ? cursorTime - startTime : 0;

        if (currentTime === 0) {
          const timeout = Math.abs(cursorTime - startTime);
          timeoutID = setTimeout(() => audio.play(), toMillis(timeout));
          return;
        }
        audio.currentTime = currentTime;
        await audio.play();
      }
    };

    audio && doUpdatePlayback();

    return () => {
      timeoutID && clearInterval(timeoutID);
    };
  }, [startTime, ref, cursorTime]);

  useEffect(() => {
    const audio = ref.current;
    audio.src &&
      syncInternalAudioState(
        { audio, startTime: toMillis(startTime) },
        mixerPlayState
      );
  }, [startTime, ref, mixerPlayState]);

  const loadBlobIntoWavesurfer = (blob) => {
    ref.current.src = URL.createObjectURL(blob);
  };

  const importAudio = (e) => {
    const items = e.target.files;
    if (items && items.length) {
      const file = items.item(0);
      loadBlobIntoWavesurfer(file);
      setHasImported(true);
      e.target.value = ""; // This is done so that I can import the same media twice
    }
  };

  const duration = ref.current.duration || 0;

  return (
    <div
      id={id}
      style={{
        marginLeft: startAtPixel,
        position: "relative",
        backgroundColor: "blue",
        marginBottom: 10,
        height: "5rem",
        zIndex: 2,
        width: duration * grid_pixel,
      }}
    >
      {!hasImported ? (
        <input
          type="file"
          id="import-file"
          accept="audio/*"
          onChange={importAudio}
        />
      ) : null}
    </div>
  );
};
