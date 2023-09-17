import { useArrangementContext } from "../ArrangementContext";
import { Ruler } from "./Ruler";
import { Grid } from "./Grid";
import { Tracks } from "./Tracks";
import "./arrangement.css";
import { useEffect, useRef, useState } from "react";

export const Arrangement = () => {
  const { mixerPlayState, mixerPlayStateAction } = useArrangementContext();
  const [scroll, setScroll] = useState(0);
  const ref = useRef();

  // TODO
  useEffect(() => {
    const div = ref.current;

    function onScroll(e) {
      setScroll(e.currentTarget.scrollLeft);
    }

    div.addEventListener("scroll", onScroll);

    return () => {
      div.removeEventListener("scroll", onScroll);
    };
  }, []);

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
      <div className="arrangement-track" ref={ref}>
        <Ruler />
        <Tracks scroll={scroll} />
        <Grid />
      </div>
    </div>
  );
};
