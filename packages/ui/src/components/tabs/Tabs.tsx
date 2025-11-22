import { createContext, forwardRef, useCallback, useContext } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { useArrowNavigation, useComposedRefs, useControllableState } from "../../hooks";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orientation: "horizontal" | "vertical";
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
    return (
      <TabsContext.Provider
        value={{
          activeTab,
          setActiveTab,
          orientation,
        }}
      >
        <Primitive.div ref={forwardedRef} data-orientation={orientation} {...props} />
      </TabsContext.Provider>
    );
  },
);
TabsRoot.displayName = "Tabs.Root";

const TabsList = forwardRef<React.ComponentRef<typeof Primitive.div>, PrimitivePropsWithRef<"div">>(
  (props, forwardedRef) => {
    const { orientation } = useTabsContext();
    const { rootRef, handleKeyDown } = useArrowNavigation({
      orientation,
      selector: '[data-slot="tabs-trigger"]',
      clickOnNavigate: true,
    });
    const composedRef = useComposedRefs(forwardedRef, rootRef);
    return (
      <Primitive.div
        role="tablist"
        ref={composedRef}
        onKeyDown={handleKeyDown}
        data-orientation={orientation}
        {...props}
      />
    );
  },
);
TabsList.displayName = "Tabs.List";

interface TabsTriggerProps extends PrimitivePropsWithRef<"button"> {
  value: string;
}
const TabsTrigger = forwardRef<React.ComponentRef<typeof Primitive.button>, TabsTriggerProps>(
  ({ value, disabled, onClick, ...props }, forwardedRef) => {
    const { activeTab, orientation, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveTab(value);
        onClick?.(e);
      },
      [setActiveTab, onClick, value],
    );

    return (
      <Primitive.button
        role="tab"
        ref={forwardedRef}
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
const TabsContent = forwardRef<React.ComponentRef<typeof Primitive.div>, TabsContentProps>(
  ({ value, ...props }, forwardedRef) => {
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
  },
);
TabsContent.displayName = "Tabs.Content";

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
export type { TabsRootProps, TabsTriggerProps, TabsContentProps };
