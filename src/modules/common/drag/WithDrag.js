import { noop } from "../../../utils/fn";
import { useStatefulDragElement } from "./useStatefulDragElement";
import { useMemo } from "react";

const defaultOptions = {
  x: true,
  y: true,
};

export const WithDrag = ({ options = {}, scroll, render = noop }) => {
  options = { ...defaultOptions, ...options };
  const { pos, ref } = useStatefulDragElement({options, scroll});
  return useMemo(() => render({ ref, pos }), [pos, render, ref]);
};
