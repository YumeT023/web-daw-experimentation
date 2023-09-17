import { useEffect, useRef, useState } from "react";

export const useStatefulDragElement = ({ options, scroll }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  // This bool value should be kept even if a render happens
  const isPressed = useRef(false);

  useEffect(() => {
    const el = ref.current;

    if (el == null) {
      throw new Error("ref is not bound with a html element");
    }

    function onMousedown(e) {
      isPressed.current = true;
      el.style.border = "1px solid #fff";
      document.body.style.cursor = "grab";
    }

    function onMouseup() {
      isPressed.current = false;
      el.style.border = "1px solid transparent";
      document.body.style.cursor = "default";
    }

    function onMousemove(e) {
      if (!isPressed.current) return;
      const { x, y } = e;
      if (options.x) setPos((_) => ({ ..._, x: x + scroll }));
      // if (options.y) setPos((_) => ({ ..._, y }));
    }

    el.addEventListener("mousedown", onMousedown);
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);

    return () => {
      el.removeEventListener("mousedown", onMousedown);
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
    };
  }, [options]);

  return { ref, pos };
};
