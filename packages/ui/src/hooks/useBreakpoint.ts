import { useState, useLayoutEffect, useMemo, RefObject } from "react";

// tailwindcss 기본 브레이크포인트
const defaultBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const getActiveBreakpoint = (width: number, breakpoints: Record<string, number>): string | undefined => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
  const found = sortedBreakpoints.find(([, minWidth]) => width >= minWidth);
  return found ? found[0] : undefined;
};

type BreakpointQuery = { up?: string; down?: string; only?: string };

type UseBreakPointParams<T extends HTMLElement = HTMLDivElement> = BreakpointQuery & {
  breakpoints?: Record<string, number>;
  targetRef?: RefObject<T | null> | null;
};

export function useBreakpoint<T extends HTMLElement = HTMLDivElement>({
  breakpoints = defaultBreakpoints,
  targetRef,
  only,
  up,
  down,
}: UseBreakPointParams<T>): {
  activeBreakpoint: string | undefined;
  breakpoints: Record<string, number>;
  matches: boolean; // 로직 결과 반환
} {
  const [width, setWidth] = useState(0);
  const element = targetRef?.current;

  useLayoutEffect(() => {
    if (element) {
      const observerCallback = () => {
        requestAnimationFrame(() => {
          setWidth(element.scrollWidth);
        });
      };
      observerCallback();
      const observer = new ResizeObserver(observerCallback);
      observer.observe(element);
      return () => observer.disconnect();
    } else {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [element]);

  const activeBreakpoint = useMemo(() => getActiveBreakpoint(width, breakpoints), [width, breakpoints]);

  // --- 로직 병합 ---
  // Breakpoint 컴포넌트의 로직을 훅 내부로 이동

  // 1. 브레이크포인트 키를 값(width) 기준으로 오름차순 정렬
  const sortedBreakpointKeys = useMemo(
    () => Object.keys(breakpoints).sort((a, b) => breakpoints[a] - breakpoints[b]),
    [breakpoints],
  );

  // 2. 쿼리(only, up, down)를 기반으로 렌더링 여부(matches) 계산
  const matches = useMemo(() => {
    if (only) {
      return activeBreakpoint === only;
    }

    const activeIndex = activeBreakpoint ? sortedBreakpointKeys.indexOf(activeBreakpoint) : -1;

    if (up) {
      const upIndex = sortedBreakpointKeys.indexOf(up);
      // activeIndex가 -1 (즉, 'sm'보다 작음)일 경우, upIndex가 0('sm') 이상이면 항상 false
      return activeIndex >= upIndex;
    }

    if (down) {
      const downIndex = sortedBreakpointKeys.indexOf(down);
      // activeIndex가 -1일 경우, 항상 downIndex보다 작거나 같으므로 true (sm 미만은 'sm down'에 포함)
      return activeIndex <= downIndex;
    }

    // 쿼리가 없으면 항상 true
    return true;
  }, [activeBreakpoint, only, up, down, sortedBreakpointKeys]);

  return { activeBreakpoint, breakpoints, matches }; // matches 반환
}
