import { useState } from "react";

export const useMixerPlayState = () => {
  const [state, setState] = useState("stop");
  return [
    state,
    {
      play: () => setState("play"),
      stop: () => setState("stop"),
      pause: () => setState("pause"),
      playPause: () => {
        switch (state) {
          case "pause":
          case "stop":
            setState("play");
            break;
          default:
            setState("pause");
            break;
        }
      },
    },
  ];
};
