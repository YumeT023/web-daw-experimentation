import { useArrangementContext } from "../ArrangementContext";
import { LoadableAudio } from "../../waveform/components";

export const Tracks = () => {
  const { rulerWidth } = useArrangementContext();
  return (
    <div className="tracks" style={{ width: rulerWidth }}>
      <LoadableAudio id="Wavesurfer_Container_T0" />
      <LoadableAudio id="Wavesurfer_Container_T1" startAtPixel={640} />
      <LoadableAudio id="Wavesurfer_Container_T2" />
      <LoadableAudio id="Wavesurfer_Container_T3" />
      <LoadableAudio id="Wavesurfer_Container_T4" />
    </div>
  );
};
