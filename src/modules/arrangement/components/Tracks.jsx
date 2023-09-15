import { LoadableAudio } from "../../wavesurfer/components";
import { useArrangementContext } from "../ArrangementContext";

export const Tracks = () => {
  const { rulerWidth } = useArrangementContext();
  return (
    <div className="tracks" style={{ width: rulerWidth }}>
      <LoadableAudio id="Wavesurfer_Container_T0" />
      <LoadableAudio id="Wavesurfer_Container_T1" />
      <LoadableAudio id="Wavesurfer_Container_T2" />
      <LoadableAudio id="Wavesurfer_Container_T3" />
      <LoadableAudio id="Wavesurfer_Container_T4" />
    </div>
  );
};
