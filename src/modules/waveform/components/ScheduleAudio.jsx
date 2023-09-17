import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useArrangementContext } from "../../arrangement";
import { grid_pixel } from "../../audiolib/options";
import { toTime } from "../../audiolib/utils";
import { AudioController } from "../../audiolib/AudioController";

export const ScheduleAudio = forwardRef(
  ({ startAtPixel = 0, id }, containerRef) => {
    const [hasImported, setHasImported] = useState(false);
    const { cursorPixel, mixerPlayState } = useArrangementContext();
    const audioRef = useRef(new AudioController());

    const startTime = useMemo(() => toTime(startAtPixel), [startAtPixel]);
    const cursorTime = useMemo(() => toTime(cursorPixel), [cursorPixel]);

    useEffect(() => {
      const audio = audioRef.current;

      // TODO
      const doSyncAudio = () => {
        switch (mixerPlayState) {
          case "stop":
            audio.isPlaying && audio.stop();
            break;
          case "pause":
            audio.isPlaying && audio.pause();
            break;
          default:
            const isCursorBeforeTrack = cursorTime < audio.duration + startTime;
            if (isCursorBeforeTrack) {
              const currentTime =
                cursorTime > startTime ? cursorTime - startTime : 0;
              if (currentTime === 0) {
                audio.isPlaying && audio.stop();
                audio.schedulePlayAt(startTime - cursorTime, 0);
                return;
              }
              audio.play(currentTime);
            }
        }
      };

      doSyncAudio();
    }, [startTime, cursorTime, mixerPlayState]);

    const loadBlobIntoWavesurfer = async (blob) => {
      const buffer = await blob.arrayBuffer();
      await audioRef.current.loadArrayBuffer(buffer);
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

    const duration = audioRef.current.duration;

    return (
      <div
        id={id}
        ref={containerRef}
        style={{
          left: startAtPixel,
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
  }
);
