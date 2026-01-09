import React, { createContext, forwardRef, useContext, useEffect, useMemo } from "react";
import { useControllableState } from "../../hooks";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { Checkbox } from "./Checkbox";

interface CheckboxGroupContextType {
  values: string[];
  onValueChange: (value: string) => void;
  onValuesChange: (values: string[]) => void;
  disabledValues?: string[];
  disabled?: boolean;
}
const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);
const useCheckboxGroupContext = () => {
  const context = useContext(CheckboxGroupContext);
  if (!context) throw new Error("CheckboxGroup.* 컴포넌트는 CheckboxGroup.Root 안에서 사용해야 합니다.");
  return context;
};

interface CheckboxGroupProps extends PrimitivePropsWithRef<"div"> {
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (value: string[]) => void;
  disabled?: boolean;
}
const CheckboxGroupRoot = forwardRef<React.ComponentRef<typeof Primitive.div>, CheckboxGroupProps>(
  ({ values, defaultValues, onValuesChange, disabled, children, ...props }, ref) => {
    const [valuesState, setValuesState] = useControllableState({
      value: values,
      defaultValue: defaultValues ?? [],
      onChange: onValuesChange,
    });
    const handleValueChange = (itemValue: string) => {
      setValuesState(valuesState.includes(itemValue) ? valuesState.filter((v) => v !== itemValue) : [...valuesState, itemValue]);
    };

    const disabledValues = useMemo(() => {
      const values: string[] = [];
      // 재귀 함수 정의
      const loop = (nodes: React.ReactNode) => {
        React.Children.forEach(nodes, (node) => {
          if (!React.isValidElement(node)) return;

          const type = node.type as any;

          if (type.displayName === "CheckboxGroup.Item") {
            const props = node.props as CheckboxGroupItemProps;
            if (props.disabled) {
              values.push(props.value);
            }
            return;
          }

          const props = node.props as any;
          if (props.children) {
            loop(props.children);
          }
        });
      };
      loop(children);
      return values;
    }, [children]);

    return (
      <CheckboxGroupContext.Provider
        value={{ values: valuesState, disabledValues, onValueChange: handleValueChange, onValuesChange: setValuesState, disabled }}
      >
        <Primitive.div role="group" ref={ref} {...props}>
          {children}
        </Primitive.div>
      </CheckboxGroupContext.Provider>
    );
  },
);
CheckboxGroupRoot.displayName = "CheckboxGroup.Root";

interface CheckboxGroupItemProps extends Omit<React.ComponentProps<typeof Checkbox.Root>, "checked" | "onCheckedChange"> {
  value: string;
}
const CheckboxGroupItem = ({ value: itemValue, children, disabled: itemDisabled, ...props }: CheckboxGroupItemProps) => {
  const groupContext = useCheckboxGroupContext();
  const isChecked = groupContext.values.includes(itemValue);
  const isDisabled = groupContext.disabled || itemDisabled;
  return (
    <Checkbox.Root {...props} checked={isChecked} disabled={isDisabled} onCheckedChange={() => groupContext.onValueChange(itemValue)}>
      {children}
    </Checkbox.Root>
  );
};
CheckboxGroupItem.displayName = "CheckboxGroup.Item";

interface CheckboxGroupSelectAllProps extends Omit<React.ComponentProps<typeof Checkbox.Root>, "checked" | "onCheckedChange"> {
  allValues: string[];
}
const CheckboxGroupSelectAll = ({ allValues, children, ...props }: CheckboxGroupSelectAllProps) => {
  const { values, onValuesChange, disabledValues } = useCheckboxGroupContext();

  const isAllSelected = allValues.length > 0 && allValues.every((v) => values.includes(v));
  const isSomeSelected = allValues.some((v) => values.includes(v));
  const checked = isAllSelected ? true : isSomeSelected ? "mixed" : false;
  const handleCheckedChange = () => {
    if (checked === true) {
      onValuesChange([]);
    } else {
      const canCheckValues = allValues.filter((v) => !disabledValues?.includes(v));
      onValuesChange(Array.from(new Set([...values, ...canCheckValues])));
    }
  };

  return (
    <Checkbox.Root {...props} checked={checked} onCheckedChange={handleCheckedChange}>
      {children}
    </Checkbox.Root>
  );
};

interface CheckboxGroupStateProps {
  children?: (state: { values: string[] }) => React.ReactNode;
  onStatusChange?: (values: string[]) => void;
}
const CheckboxGroupState = ({ children, onStatusChange }: CheckboxGroupStateProps) => {
  const { values } = useCheckboxGroupContext();

  useEffect(() => {
    onStatusChange?.(values);
  }, [values, onStatusChange]);

  return <>{children?.({ values })}</>;
};

const CheckboxGroup = {
  Root: CheckboxGroupRoot,
  Item: CheckboxGroupItem,
  SelectAll: CheckboxGroupSelectAll,
  State: CheckboxGroupState,
};
export { CheckboxGroup };
export type { CheckboxGroupItemProps, CheckboxGroupProps, CheckboxGroupSelectAllProps, CheckboxGroupStateProps };
