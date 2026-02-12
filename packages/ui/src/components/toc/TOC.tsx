import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createContext, useDebounce } from "../../hooks";

// Types
type TOCItem = {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
};

type TOCStateContextValue = {
  visibleItemId: string | null;
  items: TOCItem[];
};

type TOCDispatchContextValue = {
  onActiveItemChange?: (item: TOCItem) => void;
  setVisibleItemId: (id: string | null) => void;
};

// Utils
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // 공백을 하이픈(-)으로 치환
    .replace(/[^a-z0-9가-힣-]/g, "") // 영어, 숫자, 한글, 하이픈만 남기고 제거
    .replace(/\-\-+/g, "-") // 하이픈이 여러 개면 하나로 줄임
    .replace(/^-+/, "") // 시작 부분 하이픈 제거
    .replace(/-+$/, ""); // 끝 부분 하이픈 제거
};

// Contexts
const DEFAULT_SEARCH_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const [TOCStateProvider, useTOCStateContext] = createContext<TOCStateContextValue>("TOC.State");
const [TOCDispatchProvider, useTOCDispatchContext] = createContext<TOCDispatchContextValue>("TOC.Dispatch");

const useHeadingsDiscovery = (targetElement: Element | null | undefined, searchTags: string[]) => {
  const [items, setItems] = useState<TOCItem[]>([]);

  const scanHeadings = useCallback(() => {
    const target = targetElement || (typeof document !== "undefined" ? document.body : null);
    if (!target) return;
    const selector = searchTags.join(",");

    const elements = Array.from(target.querySelectorAll(selector)) as HTMLElement[];
    const idList: { [key: string]: number } = {};

    // 기존 ID 카운트 집계 (ID 중복 방지)
    elements.forEach((el) => {
      if (el.id) {
        idList[el.id] = (idList[el.id] || 0) + 1;
      }
    });

    const newItems = elements.map((el) => {
      const text = el.textContent || "";

      // ID 생성 및 주입 (기존 ID 유지)
      if (!el.id) {
        let newId = slugify(text);

        if (idList[newId]) {
          let count = 2;
          while (idList[`${newId}-${count}`]) {
            count++;
          }
          newId = `${newId}-${count}`;
        }

        idList[newId] = 1;
        el.id = newId;
      }

      return {
        id: el.id,
        text: text,
        level: parseInt(el.tagName.substring(1), 10),
        element: el,
      };
    });

    setItems((prev) => {
      const isSame = prev.length === newItems.length && prev.every((p, i) => p.id === newItems[i].id);
      return isSame ? prev : newItems;
    });
  }, [searchTags, targetElement]);

  const [debouncedScan] = useDebounce(scanHeadings, 200);

  useEffect(() => {
    debouncedScan();

    const target = targetElement || (typeof document !== "undefined" ? document.body : null);
    if (!target) return;

    const observer = new MutationObserver((mutations) => {
      const isUpdated = mutations.some((mutation) => {
        if (mutation.type === "childList") return true;
        if (mutation.type === "characterData") {
          const parent = mutation.target.parentElement as HTMLElement;
          return parent && searchTags.includes(parent.tagName.toLowerCase());
        }
        return false;
      });
      if (isUpdated) debouncedScan();
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [targetElement, searchTags, debouncedScan]);

  return items;
};

interface TOCRootProps {
  children: React.ReactNode;
  targetElement?: HTMLElement | null;
  searchTags?: string[];
  onActiveItemChange?: (item: TOCItem) => void;
}
const TOCRoot = ({ children, targetElement = null, searchTags = DEFAULT_SEARCH_TAGS, onActiveItemChange }: TOCRootProps) => {
  const [visibleItemId, setVisibleItemId] = useState<string | null>(null);
  const items = useHeadingsDiscovery(targetElement, searchTags);

  return (
    <TOCDispatchProvider setVisibleItemId={setVisibleItemId} onActiveItemChange={onActiveItemChange}>
      <TOCStateProvider visibleItemId={visibleItemId} items={items}>
        {children}
      </TOCStateProvider>
    </TOCDispatchProvider>
  );
};
TOCRoot.displayName = "TOC.Root";

interface TOCObserverProps extends IntersectionObserverInit {}
const TOCObserver = memo((props: TOCObserverProps) => {
  const { root, rootMargin = "-10% 0px -80% 0px", threshold = 0 } = props;
  const { items } = useTOCStateContext("TOCObserver");
  const { setVisibleItemId, onActiveItemChange } = useTOCDispatchContext("TOCObserver");

  const observerRef = useRef<IntersectionObserver | null>(null);

  const observerCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      // 가장 상단에 위치한 보이는 항목을 활성화
      if (visible.length > 0) {
        const sorted = visible.sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        setVisibleItemId(sorted[0].target.id);

        const activeItem = items.find((item) => item.id === sorted[0].target.id);
        if (activeItem) onActiveItemChange?.(activeItem);
      }
    },
    [setVisibleItemId, onActiveItemChange, items],
  );

  useEffect(() => {
    if (items.length === 0) return;

    observerRef.current = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold,
    });

    items.forEach((item) => {
      item.element && observerRef.current?.observe(item.element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [observerCallback, items, root, rootMargin, threshold]);

  return null;
});
TOCObserver.displayName = "TOC.Observer";

type TOCContentItemRenderFn = (item: TOCItem, activeId: string | null) => React.ReactNode;
interface TOCContentProps {
  children: TOCContentItemRenderFn;
}
const TOCContent = memo(({ children }: TOCContentProps) => {
  const { visibleItemId, items } = useTOCStateContext("TOCContent");

  return <>{items.map((item) => children(item, visibleItemId))}</>;
});
TOCContent.displayName = "TOC.Content";

const TOC = {
  Root: TOCRoot,
  Observer: TOCObserver,
  Content: TOCContent,
};

export { TOC };
export type { TOCContentItemRenderFn, TOCContentProps, TOCDispatchContextValue, TOCItem, TOCRootProps, TOCStateContextValue };
