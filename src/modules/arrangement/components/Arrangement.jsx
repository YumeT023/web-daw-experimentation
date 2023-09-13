import { useArrangementContext } from "../ArrangementContext";
import { Ruler } from "./Ruler";
import { Grid } from "./Grid";
import "./arrangement.css";

export const Arrangement = () => {
  const { playPause, isPlaying, stop } = useArrangementContext();

  return (
    <div className="arrangement">
      <div className="arrangement-options">
        <button onClick={playPause}>{isPlaying ? "pause" : "play"}</button>
        <button onClick={stop}>stop</button>
      </div>
      <div className="arrangement-track">
        <Ruler />
        <Grid />
      </div>
    </div>
  );
};
