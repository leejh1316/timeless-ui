import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, forwardRef, useCallback } from "react";
import { FloatingFocusManager, FloatingPortal, autoUpdate, FloatingArrow, arrow, Placement, FloatingPortalProps } from "@floating-ui/react";
import { useControllableState } from "../../hooks/useControllableState";
import { usePopover } from "../../hooks/usePopover";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import clsx from "clsx";
import { BaseButton } from "./Button";
import { Primitive, PrimitivePropsWithRef } from "./Primitive";
import { Icon } from "./Icon";
import { VisuallyHidden } from "./VisuallyHidden";

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
  listRef: React.RefObject<Array<HTMLElement | null>>;
  labelsRef: React.RefObject<Array<string | null>>;
  floating: ReturnType<typeof usePopover>;
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, any>;
  registerItem: (value: string, text: string) => void;
  itemMap: React.RefObject<Map<string, string>>;
  multiple: boolean;
  disabled: boolean;
}

const [SelectProvider, useSelectContext] = createSelectContext<SelectContextValue>(SELECT_NAME);

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
  allowDeselect?: boolean;
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
  allowDeselect = true,
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
  const itemMap = useRef<Map<string, string>>(new Map());
  const arrowRef = useRef(null);

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
    itemMap.current.set(value, text);
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
          if (!allowDeselect && prev === newValue) return prev;
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

  useMemo(() => {
    const collect = (nodes: React.ReactNode) => {
      React.Children.forEach(nodes, (node) => {
        if (!React.isValidElement(node)) return;

        const type = node.type as any;
        if (type.displayName === "Select.Item") {
          const props = node.props as any;
          if (props.value) {
            let text = props.textValue;
            if (!text) {
              let extracted = "";
              React.Children.forEach(props.children, (child) => {
                if (typeof child === "string" || typeof child === "number") {
                  extracted += child;
                }
              });
              text = extracted;
            }
            itemMap.current.set(props.value, text || props.value);
          }
        }
        //@ts-ignore
        if (node.props.children) {
          //@ts-ignore
          collect(node.props.children);
        }
      });
    };
    collect(children);
  }, [children]);

  return (
    <SelectProvider scope={__scopeSelect} {...contextValue}>
      {children}
    </SelectProvider>
  );
};
SelectRoot.displayName = "Select.Root";
// =========== Select HiddenInput ============
const HIDDEN_INPUT_NAME = "Select.HiddenInput";
interface SelectHiddenInputProps extends PrimitivePropsWithRef<"input"> {}
const SelectHiddenInput = forwardRef<React.ComponentRef<"input">, ScopedProps<SelectHiddenInputProps>>(
  ({ __scopeSelect, ...props }, forwardedRef) => {
    const { disabled, selectedValue } = useSelectContext(HIDDEN_INPUT_NAME, __scopeSelect);
    return (
      <VisuallyHidden asChild>
        <input
          ref={forwardedRef}
          {...props}
          onChange={() => {}}
          value={Array.isArray(selectedValue) ? selectedValue.join(",") : selectedValue || ""}
          disabled={disabled}
          aria-hidden={true}
        />
      </VisuallyHidden>
    );
  },
);

// ============ Select.Trigger ============

const TRIGGER_NAME = "Select.Trigger";
interface SelectTriggerProps extends PrimitivePropsWithRef<typeof BaseButton> {}
const BaseSelectTrigger = forwardRef<React.ComponentRef<typeof BaseButton>, ScopedProps<SelectTriggerProps>>(
  ({ children, className, __scopeSelect, ...props }, ref) => {
    const { floating, isOpen, disabled } = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const composedRef = useComposedRefs(floating.refs.setReference, ref);

    const triggerProps = disabled ? props : floating.getReferenceProps(props);

    return (
      <BaseButton
        ref={composedRef}
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        aria-disabled={disabled}
        className={className}
        {...triggerProps}
      >
        {children}
      </BaseButton>
    );
  },
);
BaseSelectTrigger.displayName = TRIGGER_NAME;

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
      const items = selectedValue.map((v) => itemMap.current.get(v) || v);
      if (items.length > 0) text = items.join(", ");
    } else if (!Array.isArray(selectedValue)) {
      text = itemMap.current.get(selectedValue) || selectedValue;
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
const BaseSelectIcon = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<SelectIconProps>>((props, forwardedRef) => {
  const { __scopeSelect, children, ...elementProps } = props;
  const { isOpen } = useSelectContext(ICON_NAME, __scopeSelect);
  return (
    <Primitive.span aria-hidden="true" data-state={isOpen ? "open" : "close"} {...elementProps} ref={forwardedRef}>
      {children || "▼"}
    </Primitive.span>
  );
});
BaseSelectIcon.displayName = ICON_NAME;
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

  if (!isMounted) return null;

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
const BaseSelectContent = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<PrimitivePropsWithRef<"div">>>(
  ({ style, __scopeSelect, ...props }, forwardedRef) => {
    const { floating } = useSelectContext(CONTENT_NAME, __scopeSelect);
    const { isMounted, transitionStatus, transitionStyle, placement } = floating;
    return (
      <Primitive.div
        ref={forwardedRef}
        style={{ ...transitionStyle, ...style }}
        data-status={transitionStatus}
        data-state={isMounted ? "open" : "closed"}
        data-side={placement.split("-")[0]}
        data-align={placement.split("-")[1]}
        {...props}
      />
    );
  },
);
BaseSelectContent.displayName = CONTENT_NAME;

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

const BaseSelectItem = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<SelectItemProps>>(
  ({ children, className, value, disabled = false, textValue: textValueProp, __scopeSelect, ...props }, ref) => {
    const { onValueChange, selectedValue, activeIndex, listRef, getItemProps, registerItem, multiple } = useSelectContext(
      ITEM_NAME,
      __scopeSelect,
    );

    const itemRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(itemRef, ref);

    const isSelected = multiple && Array.isArray(selectedValue) ? selectedValue.includes(value) : selectedValue === value;

    const textValue = useMemo(() => {
      if (textValueProp) return textValueProp;
      let text = "";
      React.Children.forEach(children, (child) => {
        if (typeof child === "string" || typeof child === "number") {
          text += child;
        }
      });
      return text || value;
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
        {children ?? textValue}
      </Primitive.div>
    );
  },
);
BaseSelectItem.displayName = ITEM_NAME;

// ============ Select.ItemSelected ============

const ITEM_SELECTED_NAME = "Select.ItemSelected";
interface SelectItemSelectedProps extends Omit<PrimitivePropsWithRef<"span">, "children"> {
  children?: (props: { isSelected: boolean }) => React.ReactNode;
  value: string;
}
const SelectItemSelected = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<SelectItemSelectedProps>>(
  (props, forwardedRef) => {
    const { __scopeSelect, children, value, ...elementProps } = props;
    const { selectedValue, multiple } = useSelectContext(ITEM_SELECTED_NAME, __scopeSelect);
    const isSelected = multiple && Array.isArray(selectedValue) ? selectedValue.includes(value) : selectedValue === value;
    return (
      <Primitive.span
        ref={forwardedRef}
        data-selected={isSelected}
        data-state={isSelected ? "checked" : "unchecked"}
        aria-hidden
        tabIndex={-1}
        {...elementProps}
      >
        {typeof children === "function" ? children({ isSelected }) : children}
      </Primitive.span>
    );
  },
);
SelectItemSelected.displayName = ITEM_SELECTED_NAME;

// ============ Select.Arrow ============

const ARROW_NAME = "Select.Arrow";

export const Arrow = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { __scopeSelect?: Scope }>((props, ref) => {
  const { __scopeSelect, ...restProps } = props;
  const { floating } = useSelectContext(ARROW_NAME, __scopeSelect);
  const { width, height, ...rest } = restProps;
  return <FloatingArrow ref={ref} context={floating.context} width={Number(width)} height={Number(height)} {...(rest as any)} />;
});
Arrow.displayName = ARROW_NAME;

const BaseSelect = {
  Root: SelectRoot,
  Trigger: BaseSelectTrigger,
  Value: SelectValue,
  Label: SelectLabel,
  Item: BaseSelectItem,
  Arrow: Arrow,
  View: SelectView,
  Content: BaseSelectContent,
  Group: SelectGroup,
  Portal: SelectPortal,
  Icon: BaseSelectIcon,
};
export { BaseSelect, useSelectContext };

// =================== SelectBox Style 적용 ==================
const SelectTriggerStyle = forwardRef<React.ComponentRef<typeof BaseSelectTrigger>, SelectTriggerProps>((props, forwardedRef) => {
  const { className, ...elementProps } = props;
  return (
    <BaseSelectTrigger
      className={clsx(
        className,
        "inline-flex items-center justify-between gap-3 rounded-lg border bg-white p-[12px_12px_12px_16px]",
        "text-sm leading-[1.6em] font-medium transition-all md:text-base",
        "data-[disabled=true]:bg-gray-50 data-[disabled=true]:text-gray-600",
        "data-[state=open]:border-primary data-[state=open]:text-primary-900",
        "focus-visible:border-primary! focus-visible:text-primary-900!",
        "data-[state=closed]:border-gray-300 data-[state=closed]:text-gray-900",
      )}
      {...elementProps}
    />
  );
});

const SelectContentStyle = forwardRef<React.ComponentRef<typeof BaseSelectContent>, PrimitivePropsWithRef<"div">>((props, forwardedRef) => {
  const { className, ...elementProps } = props;
  return (
    <BaseSelectContent
      className={clsx(className, "max-h-[280px] min-w-[260px] overflow-auto rounded-lg bg-white py-2 shadow-[0_0_8px_0_#16254228]")}
      {...elementProps}
      ref={forwardedRef}
    />
  );
});

const SelectItemStyle = forwardRef<React.ComponentRef<typeof BaseSelectItem>, SelectItemProps>((props, forwardedRef) => {
  const { className, ...elementProps } = props;
  return (
    <BaseSelectItem
      className={clsx(
        className,
        "flex items-center justify-between bg-white p-4 text-sm leading-[1.6em] text-gray-900 transition-colors",
        "focus-visible:bg-gray-100",
        "data-[selected=true]:bg-gray-50",
        "data-[disabled=false]:hover:bg-gray-50 data-[disabled=true]:opacity-50",
      )}
      {...elementProps}
      ref={forwardedRef}
    />
  );
});
SelectItemStyle.displayName = "Select.Item";

const SelectIconStyle = forwardRef<React.ComponentRef<typeof BaseSelectIcon>, SelectIconProps>((props, forwardedRef) => {
  const { className, ...elementProps } = props;
  return (
    <BaseSelectIcon className={clsx(className, "group text-gray-900")} {...elementProps} ref={forwardedRef}>
      <Icon name="arrow-down" assetSize={24} className={clsx("transition-all", "group-data-[state=open]:rotate-180")} />
    </BaseSelectIcon>
  );
});

const Select = {
  Root: SelectRoot,
  Trigger: SelectTriggerStyle,
  Value: SelectValue,
  Label: SelectLabel,
  Item: SelectItemStyle,
  Arrow: Arrow,
  View: SelectView,
  Content: SelectContentStyle,
  Group: SelectGroup,
  Portal: SelectPortal,
  Icon: SelectIconStyle,
  HiddenInput: SelectHiddenInput,
  ItemSelected: SelectItemSelected,
};

export { Select };
export type {
  SelectItemProps,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectViewProps,
  PrimitivePropsWithRef,
};
