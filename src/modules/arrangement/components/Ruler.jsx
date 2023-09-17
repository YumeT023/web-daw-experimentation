import { useArrangementContext } from "../ArrangementContext";
import { Graduation } from "./Graduation";
import { Cursor } from "./Cursor";

export const Ruler = () => {
  const { rulerWidth } = useArrangementContext();

  return (
    <div className="ruler" style={{ width: rulerWidth }}>
      <Graduation />
      <Cursor />
    </div>
  );
};
