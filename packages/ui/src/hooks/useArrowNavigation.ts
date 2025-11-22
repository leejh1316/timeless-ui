import { ComponentPropsWithRef, RefObject, useCallback, useEffect, useRef, useState } from "react";

type OnNavigateFn = (details: {
  direction: "next" | "prev";
  activeItem: HTMLElement; // 현재 활성화된 아이템
  prevItem: HTMLElement | null; // 이전 활성화된 아이템 (없을 수도 있음)
  activeIndex: number; // 현재 활성화된 인덱스
  prevIndex: number; // 이전 활성화 인덱스 (-1일 수도 있음)
  event: React.KeyboardEvent; // 원본 키보드 이벤트
}) => void;

interface UseArrowNavigationOptionsBase {
  onNavigate?: OnNavigateFn; // 화살표 키로 항목 이동 시 호출되는 콜백
  orientation?: "horizontal" | "vertical" | "both"; // 기본값: "both"
  loop?: boolean; // 처음과 끝에서 다시 반대편으로 이동
  clickOnNavigate?: boolean; // 화살표 키로 이동 시 해당 아이템 클릭 이벤트도 발생
  initialIndex?: number; // 초기 활성화 인덱스 (기본값: -1, 비활성화)
}
type SelectorOptions = {
  selector: string;
  isReady?: boolean;
};

type ItemCountOptions = {
  itemCount: number;
};

type UseArrowNavigationOptions = UseArrowNavigationOptionsBase & (SelectorOptions | ItemCountOptions);
type GetItemPropsOptions<E extends React.ElementType = "div"> = ComponentPropsWithRef<E> & { index: number };
interface UseArrowNavigationReturn<E extends React.ElementType = "div"> {
  rootRef: RefObject<any>; // 루트 요소에 할당할 ref
  activeIndex: number; // 현재 활성화된 아이템의 인덱스
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>; // 활성화된 아이템의 인덱스를 설정하는 함수
  activeElement: HTMLElement | null; // 현재 활성화된 아이템의 DOM 요소
  getItemProps: (props: GetItemPropsOptions<E>) => ComponentPropsWithRef<E>; // [itemCount 모드 전용] 개별 아이템에 필요한 props(ref, onClick 등)를 주입하는 함수
  handleKeyDown: (event: React.KeyboardEvent) => void; // 루트 요소에 할당할 키다운 이벤트 핸들러
}

const ACTIVE_ITEM_ATTRIBUTE = "data-arrow-navigation-active-item";

function useArrowNavigation(
  options: UseArrowNavigationOptionsBase & SelectorOptions,
): Omit<UseArrowNavigationReturn, "getItemProps">;
function useArrowNavigation<E extends React.ElementType = "div">(
  options: UseArrowNavigationOptionsBase & ItemCountOptions,
): UseArrowNavigationReturn<E>;
function useArrowNavigation(options: UseArrowNavigationOptions): UseArrowNavigationReturn {
  const {
    itemCount,
    selector,
    onNavigate,
    orientation = "both",
    loop = true,
    clickOnNavigate = false,
    initialIndex = -1,
    isReady = true,
  } = options as UseArrowNavigationOptions & { itemCount?: number; selector?: string; isReady?: boolean };

  const isInitialMount = useRef(true);
  const rootRef = useRef<HTMLElement | null>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  // [itemCount 모드 전용] 개별 아이템에 필요한 props(ref, onClick 등)를 주입하는 함수
  const getItemProps = useCallback(
    (props: GetItemPropsOptions<any>) => {
      const { index, ref: userRef, onClick: userOnClick, ...otherProps } = props;
      const handleInternalClick = (e: React.MouseEvent<HTMLElement>) => {
        setActiveIndex(index);
        setActiveElement(e.currentTarget);
        if (userOnClick) userOnClick(e);
      };
      return {
        ref: (node: HTMLElement | null) => {
          itemsRef.current[index] = node;
          if (typeof userRef === "function") {
            return userRef(node);
          } else if (userRef !== null && userRef !== undefined) {
            userRef.current = node;
          }
        },
        onClick: handleInternalClick,
        [ACTIVE_ITEM_ATTRIBUTE]: index === activeIndex ? "true" : "false",
        ...otherProps,
      };
    },
    [activeIndex],
  );
  // 키보드 이벤트를 처리하는 핵심 핸들러
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const key = e.key;
      const isVertical = orientation === "vertical" || orientation === "both";
      const isHorizontal = orientation === "horizontal" || orientation === "both";

      const upKeys = isVertical ? ["ArrowUp"] : [];
      const downKeys = isVertical ? ["ArrowDown"] : [];
      const leftKeys = isHorizontal ? ["ArrowLeft"] : [];
      const rightKeys = isHorizontal ? ["ArrowRight"] : [];
      const allKeys = [...upKeys, ...downKeys, ...leftKeys, ...rightKeys];
      if (!allKeys.includes(key)) return;

      e.preventDefault();
      e.stopPropagation();

      const items = selector
        ? Array.from(rootRef.current?.querySelectorAll<HTMLElement>(`${selector}:not([aria-disabled="true"])`) ?? [])
        : itemsRef.current.filter(
            (item): item is HTMLElement => item !== null && item.getAttribute("aria-disabled") !== "true",
          );
      if (items.length === 0) return;

      const currentIndex = activeIndex;
      let nextIndex = -1;

      if ([...rightKeys, ...downKeys].includes(key)) {
        nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) {
          nextIndex = loop ? 0 : items.length - 1;
        }
      } else if ([...leftKeys, ...upKeys].includes(key)) {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = loop ? items.length - 1 : 0;
        }
      }

      if (nextIndex !== -1 && nextIndex !== currentIndex) {
        const prevItem = items[currentIndex] || null;
        const nextItem = items[nextIndex];
        setActiveIndex(nextIndex);
        setActiveElement(nextItem);
        nextItem.focus();
        if (clickOnNavigate) {
          nextItem.click();
        }
        if (onNavigate) {
          const direction = [...rightKeys, ...downKeys].includes(key) ? "next" : "prev";
          onNavigate({
            direction,
            activeItem: nextItem,
            prevItem,
            activeIndex: nextIndex,
            prevIndex: currentIndex,
            event: e,
          });
        }
      }
    },
    [activeIndex, loop, orientation, selector, onNavigate, clickOnNavigate],
  );

  // [itemCount 모드 전용] 아이템 개수가 변경될 때 activeIndex가 유효 범위를 벗어나면 초기화
  useEffect(() => {
    if (itemCount !== undefined && activeIndex >= itemCount) {
      setActiveIndex(-1);
      setActiveElement(null);
    }
  }, [itemCount, activeIndex]);

  // [selector 모드 전용] selector prop이 '변경'될 때마다 activeIndex를 초기화
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!selector) return;
    setActiveIndex(-1);
    setActiveElement(null);
  }, [selector]);

  // [selector 모드 전용] isReady가 true가 되는 시점에, initialIndex를 기준으로 모든 아이템의 data-attribute를 초기 설정
  useEffect(() => {
    if (!isReady || !selector || !rootRef.current) {
      return;
    }
    const rootElement = rootRef.current;
    const items = Array.from(rootElement.querySelectorAll<HTMLElement>(`${selector}:not([aria-disabled="true"])`));
    items.forEach((item, index) => {
      item.setAttribute(ACTIVE_ITEM_ATTRIBUTE, index === initialIndex ? "true" : "false");
    });
  }, [isReady, selector]);

  // [selector 모드 전용] 이벤트 위임하여 루트 요소에 클릭 리스너를 등록
  useEffect(() => {
    const rootElement = rootRef.current;
    if (!selector || !rootElement) return;

    const handleDelegated = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const itemElement = target.closest(selector) as HTMLElement | null;
      if (!itemElement || itemElement.getAttribute("aria-disabled") === "true") return;
      const items = Array.from(rootElement.querySelectorAll<HTMLElement>(`${selector}:not([aria-disabled="true"])`));
      const index = items.indexOf(itemElement);
      if (index !== -1) {
        setActiveIndex(index);
        setActiveElement(itemElement);
      }
    };
    rootElement.addEventListener("click", handleDelegated);
    // rootElement.addEventListener("mouseover", handleDelegated);
    return () => {
      rootElement.removeEventListener("click", handleDelegated);
      // rootElement.removeEventListener("mouseover", handleDelegated);
    };
  }, [selector]);

  // [selector 모드 전용] UI 업데이트를 전담, activeIndex가 변경될 때마다 data-attribute를 갱신
  useEffect(() => {
    if (!selector || !rootRef.current) {
      return;
    }

    if (!isReady) return;

    const rootElement = rootRef.current;
    const items = Array.from(rootElement.querySelectorAll<HTMLElement>(`${selector}:not([aria-disabled="true"])`));

    const prevActiveItem = items.find((item) => item.getAttribute(ACTIVE_ITEM_ATTRIBUTE) === "true");
    if (prevActiveItem) {
      prevActiveItem.setAttribute(ACTIVE_ITEM_ATTRIBUTE, "false");
    }

    const newActiveItem = items[activeIndex];
    if (newActiveItem) {
      newActiveItem.setAttribute(ACTIVE_ITEM_ATTRIBUTE, "true");
    }
  }, [activeIndex, isReady, selector]);

  return {
    rootRef,
    activeIndex,
    setActiveIndex,
    activeElement,
    getItemProps,
    handleKeyDown,
  };
}

export { useArrowNavigation };
