import { WaveSurfer } from "../../wavesurfer/components";
import { useArrangementContext } from "../ArrangementContext";

export const Tracks = () => {
  const { tabFullWidth } = useArrangementContext();
  return (
    <div className="tracks" style={{ width: tabFullWidth }}>
      <WaveSurfer id="Remote_Track_01" />
    </div>
  );
};
