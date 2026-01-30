import { useControllableState } from "../../hooks";
import { createContext, ElementRef, forwardRef, useContext, useRef } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { useArrowNavigation } from "../../hooks/useArrowNavigation";

interface RadioGroupContextType {
  value?: any;
  onValueChange?: (value: any) => void;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}
const RadioGroupContext = createContext<RadioGroupContextType | null>(null);
const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error("RadioGroup.* 컴포넌트는 RadioGroup.Root 안에서 사용해야 합니다.");
  return context;
};

interface RadioGroupProps extends PrimitivePropsWithRef<"div">, RadioGroupContextType {
  defaultValue?: any;
}
const RadioGroupRoot = forwardRef<React.ComponentRef<typeof Primitive.div>, RadioGroupProps>(
  ({ value, defaultValue, onValueChange, name, disabled, readOnly, required, ...props }, ref) => {
    const [valueState, setValueState] = useControllableState({
      value,
      defaultValue: defaultValue ?? "",
      onChange: onValueChange,
    });
    const { rootRef, handleKeyDown } = useArrowNavigation({
      selector: '[role="radio"]:not([aria-disabled="true"])',
      clickOnNavigate: true,
    });
    const composedRef = useComposedRefs(ref, rootRef);

    return (
      <RadioGroupContext.Provider value={{ value: valueState, onValueChange: setValueState, name, disabled, readOnly, required }}>
        <Primitive.div role="radiogroup" ref={composedRef} onKeyDown={handleKeyDown} {...props} />
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroupRoot.displayName = "RadioGroup.Root";

interface RadioGroupItemContextType {
  isSelected: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  value: string | number;
  id?: string;
}
const RadioGroupItemContext = createContext<RadioGroupItemContextType | null>(null);
const useRadioGroupItemContext = () => {
  const context = useContext(RadioGroupItemContext);
  if (!context) throw new Error("RadioGroup.Indicator 컴포넌트는 RadioGroup.Item 안에서 사용해야 합니다.");
  return context;
};
interface RadioGroupItemProps extends PrimitivePropsWithRef<"button"> {
  id?: string;
  value: string | number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}
const RadioGroupItem = forwardRef<ElementRef<typeof Primitive.button>, RadioGroupItemProps>(
  ({ id, value, disabled, readOnly, required, ...props }, ref) => {
    const groupContext = useRadioGroupContext();
    const isSelected = groupContext?.value === value;
    const isDisabled = (groupContext?.disabled || disabled) ?? false;
    const isReadOnly = (groupContext?.readOnly || readOnly) ?? false;
    const isRequired = (groupContext?.required || required) ?? false;

    return (
      <RadioGroupItemContext.Provider
        value={{
          value,
          isSelected,
          isDisabled,
          isReadOnly,
          isRequired,
          id,
        }}
      >
        <Primitive.button
          type="button"
          role="radio"
          ref={ref}
          id={id}
          aria-labelledby={id}
          data-state={isSelected ? "checked" : "unchecked"}
          data-readonly={isReadOnly}
          data-required={isRequired}
          aria-disabled={isDisabled}
          data-disabled={isDisabled}
          aria-checked={isSelected}
          aria-required={isRequired}
          aria-readonly={isReadOnly}
          disabled={isDisabled}
          tabIndex={isSelected ? 0 : -1}
          onClick={() => {
            if (isDisabled || isReadOnly) return;
            groupContext.onValueChange?.(value);
          }}
          {...props}
        />

        <input
          type="radio"
          id={id}
          name={groupContext?.name}
          checked={isSelected}
          onChange={() => {
            if (isDisabled || isReadOnly) return;
            groupContext.onValueChange?.(value);
          }}
          readOnly={isReadOnly}
          required={isRequired}
          disabled={isDisabled}
          value={value}
          tabIndex={-1}
          style={{
            border: 0,
            clip: "rect(0 0 0 0)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            width: "1px",
            whiteSpace: "nowrap",
          }}
        />
      </RadioGroupItemContext.Provider>
    );
  },
);
RadioGroupItem.displayName = "RadioGroup.Item";

interface RadioGroupIndicatorProps extends Omit<PrimitivePropsWithRef<"div">, "children"> {
  children?: (isChecked: boolean) => React.ReactNode;
}
const RadioGroupIndicator = forwardRef<React.ComponentRef<typeof Primitive.div>, RadioGroupIndicatorProps>(
  ({ className, ...props }, ref) => {
    const itemContext = useRadioGroupItemContext();
    return (
      <Primitive.div
        {...props}
        ref={ref}
        data-state={itemContext.isSelected ? "checked" : "unchecked"}
        data-disabled={itemContext.isDisabled}
        data-readonly={itemContext.isReadOnly}
        data-required={itemContext.isRequired}
        aria-hidden
      >
        {props?.children ? props?.children(itemContext.isSelected) : null}
      </Primitive.div>
    );
  },
);
RadioGroupIndicator.displayName = "RadioGroup.Indicator";

const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  Indicator: RadioGroupIndicator,
};

export { RadioGroup };
export type { RadioGroupProps, RadioGroupItemProps, RadioGroupIndicatorProps };
