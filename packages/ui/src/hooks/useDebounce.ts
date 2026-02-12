import { useCallback, useEffect, useRef } from "react";

type DebounceOptions = {
  leading?: boolean; //첫 호출 즉시 실행 여부 (기본값: true)
  trailing?: boolean; // 마지막 호출을 제한 시간 후에 실행할지 여부 (기본값: true)
};
const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  { leading = true, trailing = true }: DebounceOptions = {},
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef<T>(func);

  useEffect(() => {
    callbackRef.current = func;
  }, [func]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => cancel, [cancel]);

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      // 첫 호출 즉시 실행 여부 판단
      const isInvoking = leading && !timer.current;

      if (timer.current) {
        clearTimeout(timer.current);
      }
      // 타이머가 설정되어 있지 않은 (첫 호출) 일때 즉시 실행
      if (isInvoking) {
        callbackRef.current(...args);
      }

      // 마지막 호출을 wait 시간 후에 실행
      timer.current = setTimeout(() => {
        if (trailing && !isInvoking) {
          callbackRef.current(...args);
        }
        timer.current = null;
      }, wait);
    },

    [wait, leading, trailing],
  );

  return [debounce, cancel] as const;
};

export { useDebounce };
