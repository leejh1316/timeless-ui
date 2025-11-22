import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UseSnoozeOptions = {
  key: string; // 스토리지에 저장할 키
  duration: "day" | number; // 다시 보지 않을 기간,"day" 또는 밀리초 단위 숫자
  storageType?: "local" | "session"; // 로컬 스토리지 또는 세션 스토리지
  autoReactivate?: boolean; // duration이 지나면 자동으로 다시 활성화 (기본값: false)
};
type UseSnoozeFn = (options: UseSnoozeOptions) => [boolean, () => void];

/**
 * Snooze 기능을 구현하는 커스텀 훅.
 * 특정 기간 동안 UI 요소의 활성 상태를 비활성화(snooze)합니다.
 * @param {SnoozeOptions} options - 스누즈 옵션 (key, duration, storageType)
 * @returns {[boolean, () => void]} [isActive, snooze]
 * - isActive: UI를 활성화(보여줘야)하는지 여부
 * - snooze: UI를 비활성화(스누즈)할 때 호출할 함수
 */
export const useSnooze: UseSnoozeFn = (options) => {
  const { key, duration, storageType = "local", autoReactivate = false } = options;
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const storage = useMemo(() => {
    if (typeof window === "undefined") return null;
    return storageType === "local" ? window.localStorage : window.sessionStorage;
  }, [storageType]);

  const normalizedDuration = useMemo(() => {
    if (typeof duration === "number") return duration;
    if (duration === "day") return 1000 * 60 * 60 * 24;
    return 0;
  }, [duration]);

  const snooze = useCallback(() => {
    if (!storage) return;
    setIsActive(false);
    const snoozedUntilTimestamp = new Date().getTime() + normalizedDuration;
    storage.setItem(key, snoozedUntilTimestamp.toString());
  }, [storage, key, normalizedDuration]);

  useEffect(() => {
    if (!storage) return;
    const snoozedUntilTimestamp = storage.getItem(key);
    if (!snoozedUntilTimestamp) {
      setIsActive(true);
      return;
    }
    const now = new Date().getTime();
    if (now >= parseInt(snoozedUntilTimestamp)) {
      setIsActive(true);
    }
  }, [key, storage]);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    if (!autoReactivate || isActive) {
      clearTimer();
      return;
    }
    timerRef.current = setTimeout(() => {
      setIsActive(true);
    }, normalizedDuration);
    return clearTimer;
  }, [autoReactivate, isActive, normalizedDuration]);

  return [isActive, snooze];
};
