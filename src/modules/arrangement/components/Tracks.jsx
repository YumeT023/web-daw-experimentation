import { WaveSurfer } from "../../wavesurfer/components";
import { useArrangementContext } from "../ArrangementContext";

export const Tracks = () => {
  const { rulerWidth } = useArrangementContext();
  return (
    <div className="tracks" style={{ width: rulerWidth }}>
      <WaveSurfer id="Track_01_Wavesurfer_Container" />
      <WaveSurfer id="Track_02_Wavesurfer_Container" />
    </div>
  );
};
