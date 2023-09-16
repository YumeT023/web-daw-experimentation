import { useEffect, useRef, useState } from "react";
import { useArrangementContext } from "../../arrangement";
import { grid_pixel } from "../../audiolib/options";

// TODO: put this in a more appropriate place
const syncInternalAudioState = (audio, state) => {
  switch (state) {
    case "play":
      audio.play();
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

export const LoadableAudio = ({ id }) => {
  const [hasImported, setHasImported] = useState(false);
  const { cursorPixel, mixerPlayState } = useArrangementContext();
  const ref = useRef(new Audio());

  useEffect(() => {
    const audio = ref.current;
    if (audio) {
      const time = cursorPixel / grid_pixel;
      if (time <= audio.duration) {
        audio.ended && audio.play();
      }
      audio.currentTime = time;
    }
  }, [ref, cursorPixel]);

  useEffect(() => {
    const audio = ref.current;
    audio.src && syncInternalAudioState(audio, mixerPlayState);
  }, [ref, mixerPlayState]);

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
