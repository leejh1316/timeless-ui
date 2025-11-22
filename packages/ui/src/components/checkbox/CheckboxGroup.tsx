import { createContext, ElementRef, forwardRef, useContext } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { useArrowNavigation, useComposedRefs, useControllableState } from "../../hooks";
import { Checkbox } from "./Checkbox";

interface CheckboxGroupContextType {
  values: string[];
  onValueChange: (value: string) => void;
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
const CheckboxGroupRoot = forwardRef<ElementRef<typeof Primitive.div>, CheckboxGroupProps>(
  ({ values, defaultValues, onValuesChange, disabled, ...props }, forwardedRef) => {
    const [valuesState, setValuesState] = useControllableState({
      value: values,
      defaultValue: defaultValues ?? [],
      onChange: onValuesChange,
    });
    const handleValueChange = (itemValue: string) => {
      setValuesState(
        valuesState.includes(itemValue) ? valuesState.filter((v) => v !== itemValue) : [...valuesState, itemValue],
      );
    };
    const { rootRef, handleKeyDown } = useArrowNavigation({
      selector: '[data-slot="checkbox-trigger"]',
    });
    const composedRef = useComposedRefs(forwardedRef, rootRef);
    return (
      <CheckboxGroupContext.Provider value={{ values: valuesState, onValueChange: handleValueChange, disabled }}>
        <Primitive.div role="group" onKeyDown={handleKeyDown} ref={composedRef} {...props} />
      </CheckboxGroupContext.Provider>
    );
  },
);
CheckboxGroupRoot.displayName = "CheckboxGroup.Root";

interface CheckboxGroupItemProps
  extends Omit<React.ComponentProps<typeof Checkbox.Root>, "checked" | "onCheckedChange"> {
  value: string;
}
const CheckboxGroupItem = ({
  value: itemValue,
  children,
  disabled: itemDisabled,
  ...props
}: CheckboxGroupItemProps) => {
  const groupContext = useCheckboxGroupContext();
  const isChecked = groupContext.values.includes(itemValue);
  const isDisabled = groupContext.disabled || itemDisabled;
  return (
    <Checkbox.Root
      {...props}
      checked={isChecked}
      disabled={isDisabled}
      onCheckedChange={() => groupContext.onValueChange(itemValue)}
    >
      {children}
    </Checkbox.Root>
  );
};

const CheckboxGroup = {
  Root: CheckboxGroupRoot,
  Item: CheckboxGroupItem,
};
export { CheckboxGroup };
