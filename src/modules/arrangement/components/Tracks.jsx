import { useArrangementContext } from "../ArrangementContext";
import { useState } from "react";
import { AudioTrack } from "../../waveform/components";
import { WithContainerDrag } from "../../common/drag";

export const Tracks = () => {
  const { rulerWidth } = useArrangementContext();
  const [tracks, setTracks] = useState([]);

  return (
    <div className="tracks" style={{ width: rulerWidth, position: "relative" }}>
      {tracks.map((_, index) => (
        <WithContainerDrag
          key={index}
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "10px",
            width: "fit-content",
            borderRadius: "4px",
          }}
          render={({ x }) => {
            return (
              <AudioTrack
                // ref={ref}
                startAtPixel={x}
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
        }}
      >
        add track
      </button>
    </div>
  );
};
