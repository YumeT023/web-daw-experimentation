import { useArrangementContext } from "../ArrangementContext";
import { useRef, useState } from "react";
import { WithDrag } from "../../common/drag";
import { ScheduleAudio } from "../../waveform/components/ScheduleAudio";

const offsetX = 335.9895935058594;

export const Tracks = ({ scroll }) => {
  const { rulerWidth } = useArrangementContext();
  // for testing purpose
  const [tracks, setTracks] = useState([]);
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="tracks"
      style={{ width: rulerWidth, position: "relative" }}
    >
      {tracks.map((_, index) => (
        <WithDrag
          scroll={scroll}
          render={({ ref, pos }) => {
            const bPos = pos.x - offsetX;
            const left = bPos > 0 ? bPos : 0;
            return (
              <ScheduleAudio
                ref={ref}
                startAtPixel={left}
                key={/* TODO */ index}
                id="WF_container0"
              />
            );
          }}
        />
      ))}
      <button
        onClick={() => setTracks((_) => [..._, null])}
        style={{
          /* TODO */ position: "relative",
          zIndex: 2,
          marginTop: 100 * tracks.length,
        }}
      >
        add track
      </button>
    </div>
  );
};
