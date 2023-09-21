import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useArrangementContext } from "../../arrangement";
import { grid_pixel } from "../../audiolib/options";
import { toTime } from "../../audiolib/utils";
import { genRandomColor } from "../../../utils/color";
import { Track } from "../../audiolib/Track";

export const AudioTrack = forwardRef(
  ({ startAtPixel = 0, id }, containerRef) => {
    const [hasImported, setHasImported] = useState(false);
    const { updateGridCount, mixer } = useArrangementContext();

    const track = useRef(new Track({ title: "t0" }));

    useEffect(() => {
      track.current.startsAt = toTime(startAtPixel);
    }, [startAtPixel]);

    const loadBlobIntoWavesurfer = async (blob) => {
      const buffer = await blob.arrayBuffer();
      await track.current.initAudio(buffer);
      mixer.addTrack(track.current);
      updateGridCount(track.current.audio.duration ?? 0);
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

    const duration = track.current.audio?.duration ?? 0;
    const backgroundColor = useMemo(() => genRandomColor(), []);

    return (
      <div
        id={id}
        ref={containerRef}
        style={{
          borderRadius: "4px",
          position: "relative",
          height: "5rem",
          zIndex: 2,
          width: duration * grid_pixel,
          backgroundColor,
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
  }
);
