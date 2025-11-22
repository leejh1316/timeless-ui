import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface UseIntersectionProps extends IntersectionObserverInit {
  once?: boolean;
  disabled?: boolean;
  onEnter?: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
  onLeave?: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
  onChange?: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
}

export const useIntersection = ({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  once = false,
  disabled = false,
  onEnter,
  onLeave,
  onChange,
}: UseIntersectionProps) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [target, setTarget] = useState<Element | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isExecutedRef = useRef(false);
  const onEnterRef = useRef(onEnter);
  const onLeaveRef = useRef(onLeave);
  const onChangeRef = useRef(onChange);

  onEnterRef.current = onEnter;
  onLeaveRef.current = onLeave;
  onChangeRef.current = onChange;

  const resetOnce = useCallback(
    (isHardReset?: boolean) => {
      isExecutedRef.current = false;
      if (observerRef.current && target && !disabled) {
        observerRef.current.observe(target);
      }
      if (isHardReset) {
        setHasEntered(false);
        setIsVisible(false);
        setEntry(null);
      }
    },
    [target, disabled],
  );

  const callbackFn = useCallback<IntersectionObserverCallback>(([entry], observer) => {
    setEntry(entry);
    onChangeRef.current?.(entry, observer);
    if (entry.isIntersecting) {
      setHasEntered(true);
      setIsVisible(true);
      onEnterRef.current?.(entry, observer);
      if (once && !isExecutedRef.current) {
        isExecutedRef.current = true;
        observerRef.current?.disconnect();
      }
    } else {
      setIsVisible(false);
      onLeaveRef.current?.(entry, observer);
    }
  }, []);

  useEffect(() => {
    if (!target || disabled) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(callbackFn, { root, rootMargin, threshold });
    observerRef.current.observe(target);
    return () => observerRef.current?.disconnect();
  }, [target, root, rootMargin, threshold, disabled]);
  return { target, setTarget, hasEntered, isVisible, entry, resetOnce, observerRef };
};
