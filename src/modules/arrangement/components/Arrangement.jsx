import { Ruler } from "./Ruler";
import { Grid } from "./Grid";
import { Tracks } from "./Tracks";
import "./arrangement.css";

export const Arrangement = () => {
  return (
    <div className="arrangement">
      <div className="arrangement-options"></div>
      <div className="arrangement-track">
        <Ruler />
        <Tracks />
        <Grid />
      </div>
    </div>
  );
};
