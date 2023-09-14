import { useArrangementContext } from "../ArrangementContext";
import { Ruler } from "./Ruler";
import { Grid } from "./Grid";
import { Tracks } from "./Tracks";
import "./arrangement.css";

export const Arrangement = () => {
  const { mixerPlayState, mixerPlayStateAction } = useArrangementContext();

  return (
    <div className="arrangement">
      <div className="arrangement-options">
        <button onClick={mixerPlayStateAction.playPause}>
          {mixerPlayState === "stop" || mixerPlayState === "pause"
            ? "play"
            : "pause"}
        </button>
        <button onClick={mixerPlayStateAction.stop}>stop</button>
      </div>
      <div className="arrangement-track">
        <Ruler />
        <Tracks />
        <Grid />
      </div>
    </div>
  );
};
