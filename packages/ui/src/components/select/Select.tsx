import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, forwardRef, useCallback } from "react";
import { FloatingFocusManager, FloatingPortal, autoUpdate, FloatingArrow, arrow, Placement, FloatingPortalProps } from "@floating-ui/react";
import { useControllableState } from "../../hooks/useControllableState";
import { usePopover } from "../../hooks/usePopover";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import clsx from "clsx";
import { Button } from "../button/Button";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

const SELECT_NAME = "Select";
type ScopedProps<P> = P & { __scopeSelect?: Scope };

const [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME);
export const useSelectScope = createSelectScope();

interface SelectContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string | string[] | null;
  onValueChange: (value: string) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  labelsRef: React.MutableRefObject<Array<string | null>>;
  floating: ReturnType<typeof usePopover>;
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, any>;
  registerItem: (value: string, text: string) => void;
  itemMap: Map<string, string>;
  multiple: boolean;
  disabled: boolean;
}

const [SelectProvider, useSelectContext] = createSelectContext<SelectContextValue>(SELECT_NAME);

const extractText = (node: React.ReactNode): string => {
  let text = "";
  React.Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      text += String(child);
    } else if (React.isValidElement(child)) {
      if (child.props.children) {
        text += extractText(child.props.children);
      }
    }
  });
  return text;
};

// ============ Select.Root ============

interface SelectRootProps {
  children: React.ReactNode;
  value?: string | string[] | null;
  defaultValue?: string | string[] | null;
  onValueChange?: (value: string | string[] | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  multiple?: boolean;
  placement?: Placement;
}
const SelectRoot = ({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  disabled = false,
  multiple = false,
  placement = "bottom-start",
  __scopeSelect,
}: ScopedProps<SelectRootProps>) => {
  const [isOpen, setIsOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen || false,
    onChange: onOpenChange,
  });

  const [selectedValue, setSelectedValue] = useControllableState<string | string[] | null>({
    value: valueProp,
    defaultValue: defaultValue !== undefined ? defaultValue : multiple ? [] : null,
    onChange: onValueChange as (value: string | string[] | null) => void,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const arrowRef = useRef(null);

  const [registeredItemsVersion, setRegisteredItemsVersion] = useState(0);
  const registeredItemMap = useRef<Map<string, string>>(new Map());

  const itemMap = useMemo(() => {
    return new Map(registeredItemMap.current);
  }, [registeredItemsVersion]);

  const floating = usePopover({
    open: isOpen,
    onOpenChange: (open) => {
      if (disabled && open) return;
      setIsOpen(open);
    },
    placement,
    middlewareOptions: {
      arrow: { element: arrowRef },
    },
    interactionOptions: {
      role: { role: "listbox" },
      listNavigation: {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
      },
      typeahead: {
        listRef: labelsRef,
        activeIndex,
        onMatch: setActiveIndex,
      },
      dismiss: {
        outsidePress: true,
      },
    },
  });

  const registerItem = useCallback((value: string, text: string) => {
    registeredItemMap.current.set(value, text);
    setRegisteredItemsVersion((v) => v + 1);
  }, []);

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (multiple) {
        setSelectedValue((prev: string | string[] | null) => {
          const current = Array.isArray(prev) ? prev : [];
          return current.includes(newValue) ? current.filter((v) => v !== newValue) : [...current, newValue];
        });
      } else {
        setIsOpen(false);
        setSelectedValue((prev) => {
          if (prev === newValue) return null;
          return newValue;
        });
      }
    },
    [multiple, setSelectedValue, setIsOpen],
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      selectedValue,
      onValueChange: handleValueChange,
      activeIndex,
      setActiveIndex,
      listRef,
      labelsRef,
      floating,
      getItemProps: floating.getItemProps,
      registerItem,
      itemMap,
      multiple,
      disabled,
    }),
    [isOpen, setIsOpen, selectedValue, handleValueChange, activeIndex, floating, registerItem, multiple, disabled],
  );

  return (
    <SelectProvider scope={__scopeSelect} {...contextValue}>
      {children}
    </SelectProvider>
  );
};
SelectRoot.displayName = "Select.Root";

// ============ Select.Trigger ============

const TRIGGER_NAME = "Select.Trigger";
interface SelectTriggerProps extends PrimitivePropsWithRef<typeof Button> {}
const SelectTrigger = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<SelectTriggerProps>>(
  ({ children, className, __scopeSelect, ...props }, ref) => {
    const { floating, isOpen, disabled } = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const composedRef = useComposedRefs(floating.refs.setReference, ref);

    const triggerProps = disabled ? props : floating.getReferenceProps(props);

    return (
      <Button
        ref={composedRef}
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        aria-disabled={disabled}
        className={className}
        {...triggerProps}
      >
        {children}
      </Button>
    );
  },
);
SelectTrigger.displayName = TRIGGER_NAME;

// ============ Select.Value ============

const VALUE_NAME = "Select.Value";
interface SelectValueProps extends PrimitivePropsWithRef<"span"> {
  placeholder?: string;
}
const SelectValue = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<SelectValueProps>>((props, forwardedRef) => {
  const { placeholder, __scopeSelect, children, ...elementProps } = props;
  const { selectedValue, itemMap, multiple } = useSelectContext(VALUE_NAME, __scopeSelect);

  let text = placeholder;
  if (selectedValue) {
    if (multiple && Array.isArray(selectedValue)) {
      const items = selectedValue.map((v) => itemMap.get(v) || v);
      if (items.length > 0) text = items.join(", ");
    } else if (!Array.isArray(selectedValue)) {
      text = itemMap.get(selectedValue) || selectedValue;
    }
  }

  return (
    <Primitive.span ref={forwardedRef} {...elementProps}>
      {children || text}
    </Primitive.span>
  );
});
SelectValue.displayName = VALUE_NAME;

// ============ Select.Icon ============

const ICON_NAME = "Select.Icon";

interface SelectIconProps extends PrimitivePropsWithRef<"span"> {}
const SelectIcon = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<SelectIconProps>>((props, forwardedRef) => {
  const { __scopeSelect, children, ...elementProps } = props;
  const { isOpen } = useSelectContext(ICON_NAME, __scopeSelect);
  return (
    <Primitive.span aria-hidden="true" data-state={isOpen ? "open" : "close"} {...elementProps} ref={forwardedRef}>
      {children || "▼"}
    </Primitive.span>
  );
});
SelectIcon.displayName = ICON_NAME;
// ============ Select.Portal ============

const PORTAL_NAME = "Select.Portal";
interface SelectPortalProps extends FloatingPortalProps {}
const SelectPortal = ({ children, ...props }: SelectPortalProps) => {
  return <FloatingPortal {...props}>{children}</FloatingPortal>;
};
SelectPortal.displayName = PORTAL_NAME;

// ============ Select.View ============
const VIEW_NAME = "Select.View";
interface SelectViewProps extends PrimitivePropsWithRef<"div"> {}
const SelectView = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<SelectViewProps>>((props, forwardedRef) => {
  const { __scopeSelect, children, style, ...elementProps } = props;
  const { floating, listRef, labelsRef } = useSelectContext(VIEW_NAME, __scopeSelect);
  const { context: floatingContext, refs, isMounted, floatingStyles, isOpen, getFloatingProps, placement } = floating;
  const composedRef = useComposedRefs(refs.setFloating, forwardedRef);

  useLayoutEffect(() => {
    if (refs.floating.current) {
      const items = refs.floating.current.querySelectorAll("[data-select-item]");
      listRef.current = Array.from(items) as HTMLElement[];
      labelsRef.current = listRef.current.map((item) => item?.textContent || "");
    }
  });

  if (!isMounted) return <>{children}</>;

  return (
    <FloatingFocusManager context={floatingContext} modal={false}>
      <Primitive.div
        ref={composedRef}
        style={{ ...floatingStyles, ...style }}
        data-state={isMounted ? "open" : "closed"}
        data-side={placement.split("-")[0]}
        data-align={placement.split("-")[1]}
        {...getFloatingProps(elementProps)}
      >
        {children}
      </Primitive.div>
    </FloatingFocusManager>
  );
});
SelectView.displayName = VIEW_NAME;

// ============ Select.Content ============
const CONTENT_NAME = "Select.Content";
interface SelectContentProps extends PrimitivePropsWithRef<"div"> {}
const SelectContent = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<PrimitivePropsWithRef<"div">>>(
  ({ style, __scopeSelect, ...props }, forwardedRef) => {
    const { floating } = useSelectContext(CONTENT_NAME, __scopeSelect);
    const { isMounted, transitionStatus, transitionStyle, placement } = floating;
    return (
      <Primitive.div
        ref={forwardedRef}
        style={{ ...transitionStyle, ...style, ...(!isMounted ? { display: "none" } : {}) }}
        data-status={transitionStatus}
        data-state={isMounted ? "open" : "closed"}
        data-side={placement.split("-")[0]}
        data-align={placement.split("-")[1]}
        {...props}
      />
    );
  },
);
SelectContent.displayName = CONTENT_NAME;

// ============ Select.Group ============

const GROUP_NAME = "Select.Group";
const SelectGroup = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<PrimitivePropsWithRef<"div">>>(
  ({ children, className, __scopeSelect, ...props }, ref) => {
    return (
      <Primitive.div ref={ref} role="group" className={className} {...props}>
        {children}
      </Primitive.div>
    );
  },
);
SelectGroup.displayName = GROUP_NAME;

// ============ Select.Label ============

const LABEL_NAME = "Select.Label";
const SelectLabel = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<PrimitivePropsWithRef<"div">>>(
  ({ children, className, __scopeSelect, ...props }, ref) => {
    return (
      <Primitive.div ref={ref} className={className} {...props}>
        {children}
      </Primitive.div>
    );
  },
);
SelectLabel.displayName = LABEL_NAME;

// ============ Select.Item ============

interface SelectItemProps extends PrimitivePropsWithRef<"div"> {
  value: string;
  disabled?: boolean;
  textValue?: string;
}

const ITEM_NAME = "Select.Item";

const SelectItem = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<SelectItemProps>>(
  ({ children, className, value, disabled, textValue: textValueProp, __scopeSelect, ...props }, ref) => {
    const { onValueChange, selectedValue, activeIndex, listRef, getItemProps, registerItem, multiple } = useSelectContext(
      ITEM_NAME,
      __scopeSelect,
    );

    const itemRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(itemRef, ref);

    const isSelected = multiple && Array.isArray(selectedValue) ? selectedValue.includes(value) : selectedValue === value;

    const textValue = useMemo(() => {
      if (textValueProp) return textValueProp;
      return extractText(children) || value;
    }, [children, value, textValueProp]);

    useLayoutEffect(() => {
      registerItem(value, textValue);
    }, [value, textValue, registerItem]);

    const index = listRef.current.indexOf(itemRef.current);
    const isActive = activeIndex === index;

    const handleSelect = () => {
      if (!disabled) {
        onValueChange(value);
      }
    };

    return (
      <Primitive.div
        ref={composedRef}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-select-item
        data-selected={isSelected}
        data-state={isSelected ? "checked" : "unchecked"}
        data-disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        className={clsx(className)}
        {...getItemProps({
          ...props,
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            props.onClick?.(e as any);
            handleSelect();
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
            props.onKeyDown?.(e as any);
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSelect();
            }
          },
        })}
      >
        {children}
      </Primitive.div>
    );
  },
);
SelectItem.displayName = ITEM_NAME;

// ============ Select.Arrow ============

const ARROW_NAME = "Select.Arrow";

export const Arrow = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { __scopeSelect?: Scope }>((props, ref) => {
  const { __scopeSelect, ...restProps } = props;
  const { floating } = useSelectContext(ARROW_NAME, __scopeSelect);
  const { width, height, ...rest } = restProps;
  return <FloatingArrow ref={ref} context={floating.context} width={Number(width)} height={Number(height)} {...(rest as any)} />;
});
Arrow.displayName = ARROW_NAME;

const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Label: SelectLabel,
  Item: SelectItem,
  Arrow: Arrow,
  View: SelectView,
  Content: SelectContent,
  Group: SelectGroup,
  Portal: SelectPortal,
  Icon: SelectIcon,
};
export { Select, useSelectContext };
export type { SelectItemProps };
export type {SelectTriggerProps, SelectValueProps, SelectViewProps, SelectContentProps, SelectIconProps,SelectPortalProps };