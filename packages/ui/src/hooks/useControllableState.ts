import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
  equalityFn?: (a: T, b: T) => boolean;
}

export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
  equalityFn = Object.is,
}: UseControllableStateProps<T>): [T, Dispatch<SetStateAction<T>>] {
  const [uncontrolled, setUncontrolled] = useState<T>(() =>
    typeof defaultValue === "function" ? (defaultValue as () => T)() : (defaultValue as T),
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? (controlledValue as T) : uncontrolled;

  const valueRef = useRef(value);
  const isControlledRef = useRef(isControlled);
  const onChangeRef = useRef(onChange);
  const equalityFnRef = useRef(equalityFn);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    isControlledRef.current = isControlled;
  }, [isControlled]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    equalityFnRef.current = equalityFn;
  }, [equalityFn]);

  const setValue: Dispatch<SetStateAction<T>> = useCallback((next: SetStateAction<T>) => {
    const prev = valueRef.current;
    const resolved = typeof next === "function" ? (next as (prevState: T) => T)(prev) : next;
    if (equalityFnRef.current(prev, resolved)) return;

    if (!isControlledRef.current) {
      setUncontrolled(resolved);
    }
    onChangeRef.current?.(resolved);
  }, []);

  return [value, setValue];
}
