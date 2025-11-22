import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import { useComposedRefs } from "@src/hooks/useComposeRefs";
import { SelectItemType, useSelect, UseSelectProps } from "@src/hooks/useSelect";
import clsx from "clsx";
import React, { createContext, forwardRef, useLayoutEffect, useMemo } from "react";
import { BaseButton } from "./Button";
import { CheckIcon, Icon } from "./Icon";
import { Primitive, PrimitivePropsWithRef } from "./Primitive";

interface SelectProps<T extends SelectItemType> extends UseSelectProps<T> {
  children?: React.ReactNode;
}
type SelectContextValue<T extends SelectItemType> = ReturnType<typeof useSelect<T>>;

const SelectContext = createContext<SelectContextValue<any> | null>({} as ReturnType<typeof useSelect>);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
};

const SelectRoot = <T extends SelectItemType>({ children, ...props }: SelectProps<T>) => {
  const selectData = useSelect(props);
  return <SelectContext.Provider value={selectData}>{children}</SelectContext.Provider>;
};
SelectRoot.displayName = "Select.Root";

interface SelectTriggerProps extends PrimitivePropsWithRef<"button"> {}
const SelectTrigger = forwardRef<React.ComponentRef<typeof Primitive.button>, SelectTriggerProps>(
  ({ className, ...props }, forwardedRef) => {
    const { refs, getReferenceProps, isOpen } = useSelectContext();
    const composedRef = useComposedRefs(refs.setReference, forwardedRef);
    const baseClasses = clsx(
      "inline-flex items-center justify-between gap-3 rounded-lg border bg-white p-[12px_12px_12px_16px]",
      "text-sm leading-[1.6em] font-medium md:text-base",
      "data-[disabled=true]:bg-gray-50 data-[disabled=true]:text-gray-600",
      isOpen ? "border-primary text-primary-900" : "border-gray-300 text-gray-900",
    );
    return (
      <BaseButton
        ref={composedRef}
        className={clsx(className, baseClasses)}
        {...props}
        {...getReferenceProps()}
        data-open={isOpen}
        aria-expanded={isOpen}
      />
    );
  },
);
SelectTrigger.displayName = "Select.Trigger";

interface SelectValueProps extends PrimitivePropsWithRef<"span"> {
  placeholder?: string;
}
const SelectValue = forwardRef<React.ComponentRef<typeof Primitive.span>, SelectValueProps>(
  ({ placeholder, children, ...props }, forwardedRef) => {
    const { selectedValues } = useSelectContext();
    return (
      <Primitive.span ref={forwardedRef} {...props}>
        {children || (selectedValues.length > 0 ? selectedValues.join(", ") : placeholder)}
      </Primitive.span>
    );
  },
);
SelectValue.displayName = "Select.Value";

const SelectIcon = forwardRef<React.ComponentRef<typeof Primitive.span>, PrimitivePropsWithRef<"span">>(
  ({ children, ...props }, forwardedRef) => {
    const { isOpen } = useSelectContext();
    return (
      <Primitive.span ref={forwardedRef} data-open={isOpen} aria-expanded={isOpen} {...props}>
        {children || (
          <Icon
            name="arrow-down"
            assetSize={24}
            className={clsx("text-gray-900 transition-all", isOpen && "rotate-180")}
          />
        )}
      </Primitive.span>
    );
  },
);
SelectIcon.displayName = "Select.Icon";

interface SelectContentProps extends React.HTMLAttributes<HTMLUListElement> {}
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const { isMounted, refs, getFloatingProps, floatingStyles, transitionStyle, context } = useSelectContext();
    const composedRefs = useComposedRefs(refs.setFloating, forwardedRef);
    const baseClasses = clsx(
      "max-h-[340px] min-w-[240px] overflow-auto rounded-lg bg-white py-2 shadow-[0_0_8px_0_#16254228]",
    );
    return (
      <>
        {isMounted && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div ref={composedRefs} style={{ ...floatingStyles, outline: "none" }} {...getFloatingProps()}>
                <div style={transitionStyle}>
                  <ul className={clsx(className, baseClasses)} {...props}>
                    {children}
                  </ul>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </>
    );
  },
);
SelectContent.displayName = "Select.Content";

interface SelectItemProps {
  item: SelectItemType;
  index?: number;
  children?: React.ReactNode;
  className?: string;
}
const SelectItem = ({ children, className, item, index }: SelectItemProps) => {
  const { key, label, disabled } = item;
  const { itemListRef, getSelectItemProps, selectedValues } = useSelectContext();
  const isChecked = selectedValues.includes(key);
  useLayoutEffect(() => {
    if (!itemListRef.current.includes(key)) {
      itemListRef.current.push(key);
    }
  }, []);
  const itemIndex = useMemo(
    () => (index !== undefined ? index : itemListRef.current.indexOf(key)),
    [itemListRef.current, key, index],
  );
  const baseClasses = clsx(
    "flex items-center justify-between bg-white p-4 text-sm leading-[1.6em] text-gray-900 transition-colors",
    "hover:bg-primary-50",
    "focus-visible:bg-gray-100",
    "data-[selected=true]:bg-gray-50",
  );
  return (
    <li {...getSelectItemProps(itemIndex, { key, label, disabled }, { className: clsx(className, baseClasses) })}>
      {children || label}
      <div>
        <CheckIcon isChecked={isChecked} size={20} />
      </div>
    </li>
  );
};
SelectItem.displayName = "Select.Item";

const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Item: SelectItem,
};
export { Select };
