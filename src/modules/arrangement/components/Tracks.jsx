import { WaveSurfer } from "../../wavesurfer/components";
import { useArrangementContext } from "../ArrangementContext";

export const Tracks = () => {
  const { rulerWidth } = useArrangementContext();
  return (
    <div className="tracks" style={{ width: rulerWidth }}>
      <WaveSurfer id="Remote_Track_01" />
    </div>
  );
};
