import React, { createContext, useLayoutEffect, useMemo } from "react";
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import { SelectItemType, useSelect, UseSelectProps } from "../../hooks/useSelect";
import clsx from "clsx";

export interface SelectProps<T extends SelectItemType> extends UseSelectProps<T> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
export const Select = <T extends SelectItemType>({ children, className, ...props }: SelectProps<T>) => {
  const selectData = useSelect(props);
  return (
    <SelectContext.Provider value={selectData}>
      {children}
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  placeholder?: string;
  children?: (selectedValues: any[]) => React.ReactNode;
}
export const SelectTrigger = ({ children, placeholder, className, ...props }: SelectTriggerProps) => {
  const { refs, getReferenceProps, selectedValues, isOpen } = useSelectContext();
  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      className={className}
      data-open={isOpen}
      aria-expanded={isOpen}
      role="button"
      {...props}
    >
      {children?.(selectedValues) || (
        <button>{selectedValues?.length ? selectedValues.join(", ") : placeholder}</button>
      )}
    </div>
  );
};

interface SelectContentProps extends React.HTMLAttributes<HTMLUListElement> {}
export const SelectContent = ({ children, ...props }: SelectContentProps) => {
  const { isMounted, refs, getFloatingProps, floatingStyles, transitionStyle, context } = useSelectContext();
  return (
    <>
      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div ref={refs.setFloating} style={{ ...floatingStyles, outline: "none" }} {...getFloatingProps()}>
              <div style={transitionStyle}>
                <ul {...props}>
                  {children}
                </ul>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

interface SelectItemProps {
  item: SelectItemType;
  index?: number;
  children?: React.ReactNode;
  className?: string;
}
export const SelectItem = ({ children, className, item, index }: SelectItemProps) => {
  const { key, label, disabled } = item;
  const { itemListRef, getSelectItemProps, selectedValues } = useSelectContext();
  const isChecked = selectedValues.includes(key);
  useLayoutEffect(() => {
    if (!itemListRef.current.includes(key)) {
      itemListRef.current.push(key);
    }
  }, []);
  const itemIndex = useMemo(() => (index !== undefined ? index : itemListRef.current.indexOf(key)), [itemListRef.current, key, index]);
  return (
    <li {...getSelectItemProps(itemIndex, { key, label, disabled }, { className: clsx(className) })}>
      {children || label}
    </li>
  );
};
