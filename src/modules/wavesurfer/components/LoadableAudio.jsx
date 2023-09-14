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
    audio && (audio.currentTime = cursorPixel / grid_pixel);
  }, [ref, cursorPixel]);

  useEffect(() => {
    const audio = ref.current;
    audio && syncInternalAudioState(audio, mixerPlayState);
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

  return (
    <div id={id} style={{ position: "relative", zIndex: 2 }}>
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
