import { useCallback, useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { useMeasureSize } from "./useMeasureSize";

interface UseOverflowDetectOptions {
  /** 아이템 간 간격 (gap) - 기본값: 0 */
  gap?: number;
  /** 컨테이너 너비에서 추가로 빼야 할 여백 (버튼 영역 등) - 기본값: 0 */
  offset?: number;
}

/**
 * 내부 아이템들의 총 너비가 컨테이너 너비를 초과하는지 판별하는 hook
 *
 * @example
 * ```tsx
 * const { containerRef, itemRefs, isOverflow } = useOverflowDetect({ gap: 8, offset: 50 });
 *
 * return (
 *   <div ref={containerRef}>
 *     {items.map((item, index) => (
 *       <div key={index} ref={(el) => itemRefs.current[index] = el}>
 *         {item}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useOverflowDetect = <TContainer extends HTMLElement = HTMLDivElement, TItem extends HTMLElement = HTMLDivElement>(
  options: UseOverflowDetectOptions = {},
) => {
  const { gap = 0, offset = 0 } = options;

  // useMeasureSize를 사용하여 컨테이너 크기 변화 감지
  const [containerRef, containerSize] = useMeasureSize<TContainer>();
  const itemRefs = useRef<(TItem | null)[]>([]);
  const [isOverflow, setIsOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth - offset;

    // 각 아이템의 너비를 합산
    const itemsWidth = itemRefs.current.reduce((total, item, index) => {
      if (!item) return total;
      const itemWidth = item.getBoundingClientRect().width;
      // 첫 번째 아이템이 아니면 gap 추가
      const gapWidth = index > 0 ? gap : 0;
      return total + itemWidth + gapWidth;
    }, 0);

    setIsOverflow(itemsWidth > containerWidth);
  }, [containerRef, gap, offset]);

  // 아이템 ref를 설정하는 콜백 함수 생성
  const setItemRef = useCallback((index: number) => {
    return (el: TItem | null) => {
      itemRefs.current[index] = el;
    };
  }, []);

  // 컨테이너 크기가 변경될 때 overflow 체크
  useLayoutEffect(() => {
    checkOverflow();
  }, [containerSize, checkOverflow]);

  // DOM 변경시 overflow 체크
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new MutationObserver(() => {
      checkOverflow();
    });
    observer.observe(containerRef.current, { childList: true, characterData: true, subtree: true });

    return () => observer.disconnect();
  }, [containerRef, checkOverflow]);

  return {
    /** 컨테이너에 연결할 ref */
    containerRef,
    /** 아이템들의 ref 배열 */
    itemRefs,
    /** 아이템 ref를 설정하는 함수 (index) => ref callback */
    setItemRef,
    /** overflow 발생 여부 */
    isOverflow,
    /** 수동으로 overflow 체크를 트리거 */
    checkOverflow,
  };
};
