import { useLayoutEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export const useMeasureSize = <T extends HTMLElement = HTMLDivElement>(): [React.RefObject<T>, Size] => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observerCallback = () => {
      requestAnimationFrame(() => {
        setSize({
          width: element.scrollWidth,
          height: element.scrollHeight,
        });
      });
    };
    observerCallback();

    const observer = new ResizeObserver(observerCallback);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);
  return [ref, size] as const;
};
