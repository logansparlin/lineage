import { useMemo, useRef } from "react"
import { useIsomorphicLayoutEffect } from "react-use";

export const useMeasure = (ref: React.RefObject<HTMLElement>) => {
  const rect = useRef<any>({});

  const observer = useMemo(
    () =>
      new (window as any).ResizeObserver((entries) => {
        if (entries[0]) {
          const { x, y, width, height, top, left, bottom, right } = entries[0].contentRect;
          rect.current = { x, y, width, height, top, left, bottom, right };
        }
      }),
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return rect;
}