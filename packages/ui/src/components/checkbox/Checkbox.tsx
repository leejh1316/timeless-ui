import { createContext, forwardRef, useCallback, useContext, useLayoutEffect, useRef, useState } from "react";
import { useControllableState } from "../../hooks";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

type CheckboxState = boolean | "true" | "false" | "mixed";
interface CheckboxContextType {
  defaultChecked?: boolean;
  checked?: CheckboxState;
  onCheckedChange?: (checked: CheckboxState) => void;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}
const CheckboxContext = createContext<CheckboxContextType | null>(null);
const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) throw new Error("Checkbox.* 컴포넌트는 Checkbox.Root 안에서 사용해야 합니다.");
  return context;
};

interface CheckboxProps extends CheckboxContextType {
  children?: React.ReactNode;
}
const CheckboxRoot = ({
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  value,
  name,
  readOnly,
  required,
  id,
}: CheckboxProps) => {
  const [checkedState, setCheckedState] = useControllableState({
    defaultValue: defaultChecked ?? false,
    value: checked,
    onChange: onCheckedChange,
  });

  const bindCheckedState = useCallback((checked: CheckboxState) => {
    if (checked === "true" || checked === true || checked === "mixed") {
      return true;
    }
    return false;
  }, []);

  return (
    <CheckboxContext.Provider
      value={{
        checked: checkedState,
        onCheckedChange: setCheckedState,
        disabled,
        readOnly,
        required,
        name,
        defaultChecked,
        id,
      }}
    >
      {children}
      <input
        type="checkbox"
        id={id}
        name={name}
        readOnly={readOnly}
        required={required}
        disabled={disabled}
        checked={bindCheckedState(checkedState)}
        onChange={(e) => {
          setCheckedState(e.target.checked);
        }}
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
    </CheckboxContext.Provider>
  );
};

interface CheckboxTriggerProps extends PrimitivePropsWithRef<"button"> {}
const CheckboxTrigger = forwardRef<React.ElementRef<typeof Primitive.button>, CheckboxTriggerProps>(
  ({ style, ...props }, ref) => {
    const { onCheckedChange, disabled, checked, readOnly, id } = useCheckboxContext();

    const handleCheckedChange = useCallback(
      (nextValue: boolean) => {
        if (!readOnly && !disabled) {
          onCheckedChange?.(nextValue);
        }
      },
      [onCheckedChange, disabled, readOnly],
    );

    const getAriaChecked = () => {
      if (checked === "mixed") return "mixed";
      return checked ? "true" : "false";
    };

    const getDataState = () => {
      if (checked === "mixed") return "indeterminate";
      return checked ? "checked" : "unchecked";
    };

    return (
      <Primitive.button
        {...props}
        ref={ref}
        role="checkbox"
        data-slot="checkbox-trigger"
        aria-checked={getAriaChecked()}
        data-state={getDataState()}
        data-disabled={disabled}
        disabled={disabled}
        aria-disabled={disabled}
        aria-labelledby={id}
        onClick={(e) => {
          handleCheckedChange(!checked);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
          if (e.key === " ") {
            e.preventDefault();
            handleCheckedChange(!checked);
          }
        }}
      />
    );
  },
);
CheckboxTrigger.displayName = "CheckboxTrigger";

interface CheckboxIconProps extends PrimitivePropsWithRef<"svg"> {
  size?: number;
}

const CheckboxIcon = forwardRef<React.ElementRef<typeof Primitive.svg>, CheckboxIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    const { checked } = useCheckboxContext();
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    useLayoutEffect(() => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    }, []);

    return (
      <Primitive.svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`transition-all duration-200 ease-in-out ${
          checked ? "scale-100 opacity-100" : "scale-75 opacity-0"
        } ${className}`}
        {...props}
      >
        <path
          ref={pathRef}
          d="M4 8.5L7 11.5L12 5"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: checked ? 0 : pathLength,
            transition: "stroke-dashoffset 0.2s ease-in-out",
          }}
        />
      </Primitive.svg>
    );
  },
);
CheckboxIcon.displayName = "Checkbox.Icon";

const Checkbox = {
  Root: CheckboxRoot,
  Trigger: CheckboxTrigger,
  Icon: CheckboxIcon,
};
export { Checkbox };
export type { CheckboxState };
