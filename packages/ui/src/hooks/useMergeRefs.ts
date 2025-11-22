import { useMemo } from "react";

type CompatibleRef<T> = React.RefCallback<T> | React.MutableRefObject<T> | React.Dispatch<React.SetStateAction<T | null>> | null;

export function useMergeRefs<T>(...refs: CompatibleRef<T>[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (node: T | null) => {
      refs.forEach((ref) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(node);
          } else {
            (ref as any).current = node;
          }
        }
      });
    };
  }, refs);
}
