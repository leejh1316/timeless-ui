import { useBreakpoint } from "../../hooks/useBreakpoint"; // 리팩토링된 훅 임포트
import { ReactNode, RefObject } from "react";

type BreakpointQuery = { up?: string; down?: string; only?: string };

interface BreakpointProps extends BreakpointQuery {
  children: ReactNode;
  breakpoints?: Record<string, number>;
  targetRef?: RefObject<HTMLElement | null> | null;
}

export const Breakpoint = ({ children, breakpoints: propsBreakpoints, targetRef, up, down, only }: BreakpointProps) => {
  // 모든 로직을 훅에 위임하고 'matches' 결과만 받습니다.
  const { matches } = useBreakpoint({
    breakpoints: propsBreakpoints,
    targetRef,
    up,
    down,
    only,
  });

  // 훅이 계산한 결과(matches)에 따라 렌더링합니다.
  return matches ? <>{children}</> : null;
};

Breakpoint.displayName = "Breakpoint";
