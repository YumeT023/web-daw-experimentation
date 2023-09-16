import { useArrangementContext } from "../ArrangementContext";
import { LoadableAudio } from "../../waveform/components";
import { useState } from "react";

export const Tracks = () => {
  const { rulerWidth } = useArrangementContext();
  // for testing purpose
  const [tracks, setTracks] = useState([]);

  return (
    <div className="tracks" style={{ width: rulerWidth }}>
      {tracks.map((_, index) => (
        <LoadableAudio
          key={/* TODO */ index}
          id={"Wavesurfer_Container_T" + index}
        />
      ))}
      <button
        onClick={() => setTracks((_) => [..._, null])}
        style={{ /* TODO */ position: "relative", zIndex: 2 }}
      >
        add track
      </button>
    </div>
  );
};
