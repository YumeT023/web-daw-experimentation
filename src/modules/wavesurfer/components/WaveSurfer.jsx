import WaveSurferJs from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { useArrangementContext } from "../../arrangement";
import "./wavesurfer.css";

export const WaveSurfer = ({ id }) => {
  const ref = useRef(null);
  const { cursorPixel, tabFullWidth } = useArrangementContext();
  const [hasImported, setHasImported] = useState(false);

  useEffect(() => {
    const ws = ref.current;
    if (ws) {
      let progress = 0;
      if (cursorPixel > 0) {
        const duration = ws.getDuration();
        const pxPerSec = 100;
        progress = cursorPixel / (pxPerSec * duration + 0.7);
      }
      ws.seekTo(progress);
    }
  }, [cursorPixel, ref, tabFullWidth]);

  useEffect(() => {
    const ws = WaveSurferJs.create({
      container: "#" + id,
      waveColor: "#fff",
      progressColor: "#fff",
      minPxPerSec: 100,
      fillParent: false,
      height: 80,
    });

    ws.on("ready", () => {});

    ref.current = ws;

    return () => {
      ws.destroy();
    };
  }, [id]);

  const loadBlobIntoWavesurfer = (blob) => {
    ref.current.loadBlob(blob);
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
