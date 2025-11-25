import { useLayoutEffect, useRef, useEffect } from "react";

// 반환할 스타일 객체의 타입을 정의합니다.
interface ElementSizeStyle extends React.CSSProperties {
  "--content-width"?: string;
  "--content-height"?: string;
}

/**
 * 컴포넌트의 애니메이션을 위한 크기를 측정하는 훅입니다.
 * * @param isVisible - 컴포넌트가 열린 상태인지 여부 (true: 열림, false: 닫힘)
 * @returns [ref, style] - DOM 요소에 연결할 ref와 CSS 변수가 포함된 style 객체
 */
export const useMeasureElementSize = <T extends HTMLElement = HTMLDivElement>(
  isVisible: boolean,
): [React.RefObject<T | null>, ElementSizeStyle] => {
  const ref = useRef<T>(null);
  const heightRef = useRef<number>(0);
  const widthRef = useRef<number>(0);

  const originalStylesRef = useRef<{
    transitionDuration: string;
    animationName: string;
  } | null>(null);

  const isMountAnimationPreventedRef = useRef(isVisible);

  useEffect(() => {
    const rAF = requestAnimationFrame(() => {
      isMountAnimationPreventedRef.current = false;
    });
    return () => cancelAnimationFrame(rAF);
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!originalStylesRef.current) {
      originalStylesRef.current = {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };
    }

    node.style.transitionDuration = "0s";
    node.style.animationName = "none";

    const rect = node.getBoundingClientRect();
    if (isVisible) {
      heightRef.current = rect.height;
      widthRef.current = rect.width;
    }

    if (!isMountAnimationPreventedRef.current) {
      node.style.transitionDuration = originalStylesRef.current.transitionDuration;
      node.style.animationName = originalStylesRef.current.animationName;
    }
  }, [isVisible]);

  const style: ElementSizeStyle = {
    "--content-width": widthRef.current ? `${widthRef.current}px` : undefined,
    "--content-height": heightRef.current ? `${heightRef.current}px` : undefined,
  };

  return [ref, style] as const;
};
