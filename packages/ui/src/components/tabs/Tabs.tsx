import { createContext, forwardRef, useCallback, useContext, useEffect, useRef } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { useArrowNavigation, useComposedRefs, useControllableState } from "../../hooks";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orientation: "horizontal" | "vertical";
  triggerRefs: React.RefObject<(HTMLButtonElement | null)[]>;
};
const TabsContext = createContext<TabsContextType | null>(null);
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};

interface TabsRootProps extends PrimitivePropsWithRef<"div"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}
const TabsRoot = forwardRef<React.ComponentRef<typeof Primitive.div>, TabsRootProps>(
  ({ value, defaultValue, onValueChange, orientation = "horizontal", ...props }, forwardedRef) => {
    const [activeTab, setActiveTab] = useControllableState({
      value,
      defaultValue,
      onChange: onValueChange,
    });
    const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
    return (
      <TabsContext.Provider
        value={{
          activeTab,
          setActiveTab,
          orientation,
          triggerRefs,
        }}
      >
        <Primitive.div ref={forwardedRef} data-orientation={orientation} {...props} />
      </TabsContext.Provider>
    );
  },
);
TabsRoot.displayName = "Tabs.Root";

const TabsList = forwardRef<React.ComponentRef<typeof Primitive.div>, PrimitivePropsWithRef<"div">>((props, forwardedRef) => {
  const { orientation } = useTabsContext();
  const { rootRef, handleKeyDown } = useArrowNavigation({
    orientation,
    selector: '[data-slot="tabs-trigger"]',
    clickOnNavigate: true,
  });
  const composedRef = useComposedRefs(forwardedRef, rootRef);
  return <Primitive.div role="tablist" ref={composedRef} onKeyDown={handleKeyDown} data-orientation={orientation} {...props} />;
});
TabsList.displayName = "Tabs.List";

interface TabsTriggerProps extends PrimitivePropsWithRef<"button"> {
  value: string;
}
const TabsTrigger = forwardRef<React.ComponentRef<typeof Primitive.button>, TabsTriggerProps>(
  ({ value, disabled, onClick, ...props }, forwardedRef) => {
    const { activeTab, orientation, triggerRefs, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveTab(value);
        onClick?.(e);
      },
      [setActiveTab, onClick, value],
    );

    const composedRefs = useComposedRefs(forwardedRef, (el) => {
      const index = triggerRefs.current?.length;
      //@ts-ignore
      triggerRefs.current[index] = el;
    });

    return (
      <Primitive.button
        role="tab"
        ref={composedRefs}
        disabled={disabled}
        data-orientation={orientation}
        data-slot="tabs-trigger"
        data-active={isActive}
        aria-disabled={disabled}
        onClick={handleClick}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "Tabs.Trigger";

interface TabsContentProps extends PrimitivePropsWithRef<"div"> {
  value: string;
}
const TabsContent = forwardRef<React.ComponentRef<typeof Primitive.div>, TabsContentProps>(({ value, ...props }, forwardedRef) => {
  const { activeTab, orientation } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <Primitive.div
      ref={forwardedRef}
      role="tabpanel"
      hidden={!isActive}
      data-orientation={orientation}
      data-slot="tabs-content"
      {...props}
    />
  );
});
TabsContent.displayName = "Tabs.Content";

interface TabsIndicatorProps extends PrimitivePropsWithRef<"span"> {}
const TabsIndicator = forwardRef<React.ComponentRef<typeof Primitive.span>, TabsIndicatorProps>(({ ...props }, forwardedRef) => {
  const { triggerRefs, activeTab } = useTabsContext();
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const composedRefs = useComposedRefs(forwardedRef, indicatorRef);
  const onActiveTabChange = () => {
    const activeIndex = triggerRefs.current?.findIndex((trigger) => {
      return trigger?.getAttribute("data-active") === "true";
    });
    if (activeIndex === -1 || activeIndex === undefined) return;
    //@ts-ignore
    const currentTrigger = triggerRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    if (!indicator || !currentTrigger) return;

    const triggerRect = currentTrigger.getBoundingClientRect();
    const parentRect = currentTrigger.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    indicator.style.width = `${triggerRect.width}px`;
    indicator.style.left = `${triggerRect.left - parentRect.left}px`;
  };
  onActiveTabChange();

  useEffect(() => {
    onActiveTabChange();
  }, [activeTab, triggerRefs]);
  return <Primitive.span ref={composedRefs} data-slot="tabs-indicator" {...props} />;
});

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
};
export type { TabsRootProps, TabsTriggerProps, TabsContentProps, TabsIndicatorProps };
