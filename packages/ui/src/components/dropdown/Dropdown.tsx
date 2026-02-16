import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { createContextScope } from "../../hooks/useCreateContext";
import { useControllableState } from "../../hooks/useControllableState";
import { usePopover, UsePopoverProps } from "../../hooks/usePopover";
import { merge } from "lodash-es";
import { forwardRef, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Primitive } from "../primitive/Primitive";

/* -------------------------------------------------------------------------------------------------
 * Dropdown
 * -----------------------------------------------------------------------------------------------*/
const DROPDOWN_NAME = "Dropdown";

type ScopedProps<P> = P & { __scopeDropdown?: Scope };
type Scope = { [scopeName: string]: React.Context<any>[] };

interface DropdownProps extends UsePopoverProps {
  children?: React.ReactNode;
  modal?: boolean;
}

const [createDropdownContext, createDropdownScope] = createContextScope(DROPDOWN_NAME);

type DropdownContextValue = {
  contentId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  modal: boolean;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  elementListRef: React.MutableRefObject<HTMLElement[]>;
  itemListRef: React.MutableRefObject<string[]>;
  getItemProps: (props?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  popover: ReturnType<typeof usePopover>;
};

const [DropdownProvider, useDropdownContext] = createDropdownContext<DropdownContextValue>(DROPDOWN_NAME);

const DropdownRoot: React.FC<DropdownProps> = (props: ScopedProps<DropdownProps>) => {
  const { __scopeDropdown, children, open: openProp, onOpenChange, modal = true, ...popoverProps } = props;
  const contentId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementListRef = useRef<HTMLElement[]>([]);
  const itemListRef = useRef<string[]>([]);
  const isTypingRef = useRef(false);

  const [open, setOpen] = useControllableState({
    value: openProp,
    onChange: onOpenChange,
    defaultValue: false,
  });

  const popover = usePopover({
    ...popoverProps,
    open: open,
    onOpenChange: (open) => {
      setOpen(open);
      if (!open) {
        setActiveIndex(null);
      }
    },
    interactionOptions: {
      listNavigation: {
        listRef: elementListRef,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
      },
      typeahead: {
        listRef: itemListRef,
        activeIndex,
        onMatch: setActiveIndex,
        onTypingChange: (isTyping) => {
          isTypingRef.current = isTyping;
        },
      },
    },
  });

  return (
    <DropdownProvider
      scope={__scopeDropdown}
      contentId={contentId}
      open={open}
      onOpenChange={setOpen}
      onOpenToggle={() => setOpen(!open)}
      modal={modal}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      elementListRef={elementListRef}
      itemListRef={itemListRef}
      getItemProps={popover.getItemProps}
      popover={popover}
    >
      {children}
    </DropdownProvider>
  );
};

DropdownRoot.displayName = DROPDOWN_NAME;

// =========== Dropdown.Trigger ===========

const TRIGGER_NAME = "DropdownTrigger";

type DropdownTriggerElement = React.ComponentRef<typeof Primitive.button>;
interface DropdownTriggerProps extends React.ComponentPropsWithoutRef<typeof Primitive.button> {}

const DropdownTrigger = forwardRef<DropdownTriggerElement, DropdownTriggerProps>(
  (props: ScopedProps<DropdownTriggerProps>, forwardedRef) => {
    const { __scopeDropdown, ...triggerProps } = props;
    const context = useDropdownContext(TRIGGER_NAME, __scopeDropdown);
    const {
      popover: { refs, getReferenceProps },
    } = context;
    const composedRef = useComposedRefs(refs.setReference, forwardedRef);

    return (
      <Primitive.button
        type="button"
        ref={composedRef}
        aria-haspopup="menu"
        aria-expanded={context.open}
        aria-controls={context.open ? context.contentId : undefined}
        data-state={context.open ? "open" : "closed"}
        {...triggerProps}
        {...getReferenceProps(props)}
      />
    );
  },
);

DropdownTrigger.displayName = TRIGGER_NAME;

// =========== Dropdown.Portal ===========

const PORTAL_NAME = "DropdownPortal";

interface DropdownPortalProps {
  children?: React.ReactNode;
  forceMount?: true;
}

const DropdownPortal: React.FC<DropdownPortalProps> = (props: ScopedProps<DropdownPortalProps>) => {
  const { children } = props;
  return <FloatingPortal>{children}</FloatingPortal>;
};

DropdownPortal.displayName = PORTAL_NAME;

// =========== Dropdown.View ===========
const VIEW_NAME = "DropdownContent";

type DropdownViewElement = React.ElementRef<typeof Primitive.div>;
interface DropdownContentProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {}

const DropdownView = forwardRef<DropdownViewElement, DropdownContentProps>((props: ScopedProps<DropdownContentProps>, forwardedRef) => {
  const { __scopeDropdown, ...contentProps } = props;
  const context = useDropdownContext(VIEW_NAME, __scopeDropdown);
  const {
    popover: { context: popoverContext, refs, getFloatingProps, floatingStyles, placement, isMounted },
    modal,
  } = context;
  const composedRefs = useComposedRefs(refs.setFloating, forwardedRef);

  if (!isMounted) return null;

  return (
    <FloatingFocusManager context={popoverContext} modal={modal}>
      <Primitive.div
        ref={composedRefs}
        id={context.contentId}
        data-state={isMounted ? "open" : "closed"}
        data-side={placement.split("-")[0]}
        data-align={placement.split("-")[1]}
        {...getFloatingProps(contentProps)}
        style={{ ...floatingStyles, ...contentProps.style }}
      />
    </FloatingFocusManager>
  );
});

DropdownView.displayName = VIEW_NAME;

// =========== Dropdown.Content ===========
const CONTENT_NAME = "DropdownContent";

type DropdownContentElement = React.ElementRef<typeof Primitive.div>;
interface DropdownContentProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {}

const DropdownContent = forwardRef<DropdownContentElement, DropdownContentProps>(
  (props: ScopedProps<DropdownContentProps>, forwardedRef) => {
    const { __scopeDropdown, ...contentProps } = props;
    const { popover } = useDropdownContext(CONTENT_NAME, __scopeDropdown);
    const { isMounted, transitionStatus, transitionStyle, placement } = popover;
    return (
      <Primitive.div
        ref={forwardedRef}
        style={{ ...transitionStyle, ...contentProps.style, ...(!isMounted ? { display: "none" } : {}) }}
        data-status={transitionStatus}
        data-state={isMounted ? "open" : "closed"}
        data-side={placement.split("-")[0]}
        data-align={placement.split("-")[1]}
        {...contentProps}
      />
    );
  },
);

DropdownContent.displayName = CONTENT_NAME;

// =========== Dropdown.Item ===========
const ITEM_NAME = "DropdownItem";
type DropdownItemElement = React.ElementRef<typeof Primitive.div>;
interface DropdownItemProps extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  disabled?: boolean;
  onSelect?: (event: React.SyntheticEvent) => void;
}

const DropdownItem = forwardRef<DropdownItemElement, DropdownItemProps>((props: ScopedProps<DropdownItemProps>, forwardedRef) => {
  const { __scopeDropdown, disabled = false, onSelect, ...itemProps } = props;
  const context = useDropdownContext(ITEM_NAME, __scopeDropdown);
  const { activeIndex, elementListRef, itemListRef, setActiveIndex, getItemProps } = context;
  const itemRef = useRef<HTMLDivElement>(null);

  const composedRefs = useComposedRefs(forwardedRef, itemRef);

  const index = useMemo(() => {
    return itemRef.current ? elementListRef.current.indexOf(itemRef.current) : -1;
  }, [elementListRef.current, itemRef.current]);

  useLayoutEffect(() => {
    const node = itemRef.current;
    if (node) {
      const itemText = node.textContent || "";
      const currentIndex = elementListRef.current.length;
      elementListRef.current.push(node);
      itemListRef.current.push(itemText);
      return () => {
        elementListRef.current = elementListRef.current.filter((el) => el !== node);
        itemListRef.current.splice(currentIndex, 1);
      };
    }
  }, []);

  const handleSelect = (e: React.SyntheticEvent) => {
    if (disabled) return;
    onSelect?.(e);
    context.onOpenChange(false);
    setActiveIndex(null);
  };

  return (
    <Primitive.div
      {...merge(
        itemProps,
        getItemProps({
          onClick: (e) => {
            props.onClick?.(e as any);
            handleSelect(e);
          },
          onKeyDown: (e) => {
            props.onKeyDown?.(e as any);
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSelect(e);
            }
          },
        }),
      )}
      ref={composedRefs}
      role="menuitem"
      tabIndex={activeIndex === index ? 0 : -1}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? "" : undefined}
      data-focus={activeIndex === index ? "" : undefined}
    />
  );
});

DropdownItem.displayName = ITEM_NAME;

// =========== Export ===========

const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Portal: DropdownPortal,
  View: DropdownView,
  Content: DropdownContent,
  Item: DropdownItem,
};

export { Dropdown, createDropdownScope };
export type { DropdownProps, DropdownTriggerProps, DropdownPortalProps, DropdownContentProps, DropdownItemProps };
