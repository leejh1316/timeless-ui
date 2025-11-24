import { Button, useArrowNavigation, useComposedRefs, Primitive, PrimitivePropsWithRef } from "@timeless-ui/ui";
import clsx from "clsx";

import { createContext, forwardRef, RefObject, useContext, useEffect, useRef, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};
type NavigationContextType = {
  menus: MenuItem[] | null;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[] | null>>;
  itemRefs: RefObject<(HTMLLIElement | null)[]>;
  indicatorRef: RefObject<HTMLSpanElement | null>;
};
const NavigationContext = createContext<NavigationContextType | null>(null);
const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  return context;
};

// =========== Navigation.Root ===========
interface NavigationRootProps extends PrimitivePropsWithRef<"nav"> {}
const NavigationRoot = forwardRef<React.ComponentRef<typeof Primitive.nav>, NavigationRootProps>(
  ({ ...props }, forwardedRef) => {
    const [currentMenus, setCurrentMenus] = useState<MenuItem[] | null>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const indicatorRef = useRef<HTMLSpanElement | null>(null);
    return (
      <NavigationContext.Provider
        value={{
          menus: currentMenus,
          setMenus: setCurrentMenus,
          itemRefs,
          indicatorRef,
        }}
      >
        <Primitive.nav ref={forwardedRef} {...props} />
      </NavigationContext.Provider>
    );
  },
);
NavigationRoot.displayName = "Navigation.Root";
// =========== Navigation.List ===========
interface NavigationListProps extends PrimitivePropsWithRef<"ul"> {}
const NavigationList = forwardRef<React.ComponentRef<typeof Primitive.ul>, NavigationListProps>(
  ({ ...props }, forwardedRef) => {
    const { rootRef, handleKeyDown } = useArrowNavigation({
      selector: '[data-slot="navigation-trigger"]',
      orientation: "horizontal",
    });
    const composedRefs = useComposedRefs(forwardedRef, rootRef);
    return <Primitive.ul data-slot="navigation-list" ref={composedRefs} onKeyDown={handleKeyDown} {...props} />;
  },
);
NavigationList.displayName = "Navigation.List";

// =========== Navigation.Item ===========
interface NavigationItemProps extends PrimitivePropsWithRef<"li"> {}
const NavigationItem = forwardRef<React.ComponentRef<typeof Primitive.li>, NavigationItemProps>(
  ({ ...props }, forwardedRef) => {
    const { itemRefs } = useNavigationContext();
    const composedRefs = useComposedRefs(forwardedRef, (el) => {
      const index = itemRefs.current?.length;
      //@ts-ignore
      itemRefs.current[index] = el;
    });
    return <Primitive.li data-slot="navigation-item" ref={composedRefs} {...props} />;
  },
);
NavigationItem.displayName = "Navigation.Item";
// =========== Navigation.Trigger ===========
interface NavigationTriggerProps extends PrimitivePropsWithRef<"button"> {}
const NavigationTrigger = forwardRef<React.ComponentRef<typeof Button>, NavigationTriggerProps>(
  ({ ...props }, forwardedRef) => {
    return <Button data-slot="navigation-trigger" ref={forwardedRef} {...props} />;
  },
);
NavigationTrigger.displayName = "Navigation.Trigger";

// =========== Navigation.Indicator ===========
const NavigatorIndicator = forwardRef<
  React.ComponentRef<typeof Primitive.span>,
  PrimitivePropsWithRef<"span"> & { activeIndex: number }
>(({ activeIndex, className, ...props }, forwardedRef) => {
  const { indicatorRef, itemRefs } = useNavigationContext();
  const composedRefs = useComposedRefs(forwardedRef, indicatorRef);
  const onActiveIndexChange = (index: number) => {
    if (index === -1) return;
    //@ts-ignore
    if (!itemRefs.current[activeIndex] || !indicatorRef.current) return;
    //@ts-ignore
    const currentTrigger = itemRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    const triggerRect = currentTrigger.getBoundingClientRect();
    const parentRect = currentTrigger.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    indicator.style.width = `${triggerRect.width}px`;
    indicator.style.transform = `translateX(${triggerRect.left - parentRect.left}px)`;
  };
  useEffect(() => {
    onActiveIndexChange(activeIndex);
  }, [activeIndex]);

  onActiveIndexChange(activeIndex);
  return (
    <Primitive.span
      hidden={activeIndex === -1}
      data-slot="navigation-indicator"
      className={clsx(className, "absolute inline-block transition-all")}
      ref={composedRefs}
      {...props}
    />
  );
});
NavigatorIndicator.displayName = "Navigation.Indicator";

// =========== Navigation.Link ===========
interface NavigationLinkProps extends PrimitivePropsWithRef<typeof Button> {}
const NavigationLink = forwardRef<React.ComponentRef<typeof Button>, NavigationLinkProps>(
  ({ ...props }, forwardedRef) => {
    return <Button data-slot="navigation-link" ref={forwardedRef} {...props} />;
  },
);
NavigationLink.displayName = "Navigation.Link";

// ========== Export ===========
export const Navigation = {
  Root: NavigationRoot,
  List: NavigationList,
  Item: NavigationItem,
  Trigger: NavigationTrigger,
  Indicator: NavigatorIndicator,
  Link: NavigationLink,
};

export type { MenuItem };
