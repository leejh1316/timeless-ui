import { createContext, forwardRef, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useControllableState } from "../../hooks";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { Button } from "../button/Button";

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
const CheckboxTrigger = forwardRef<React.ComponentRef<typeof Button>, CheckboxTriggerProps>(({ style, onClick, ...props }, ref) => {
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
    <Button
      {...props}
      ref={ref}
      disabled={disabled}
      role="checkbox"
      aria-checked={getAriaChecked()}
      data-state={getDataState()}
      aria-labelledby={id}
      onClick={(e) => {
        handleCheckedChange(!checked);
        onClick?.(e);
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
});
CheckboxTrigger.displayName = "CheckboxTrigger";

interface CheckboxIconProps extends PrimitivePropsWithRef<"svg"> {
  size?: number;
}

const CheckboxIcon = forwardRef<React.ElementRef<typeof Primitive.svg>, CheckboxIconProps>(({ className, size = 16, ...props }, ref) => {
  const { checked } = useCheckboxContext();

  const isChecked = checked === true || checked === "true";
  const isMixed = checked === "mixed";
  const isVisible = isChecked || isMixed;

  const checkPath = "M4 8.5 L7 11.5 L12 5";
  const mixedPath = "M4 8 L8 8 L12 8";
  const [currentPath, setCurrentPath] = useState(isChecked ? checkPath : mixedPath);

  useEffect(() => {
    if (isMixed) setCurrentPath(mixedPath);
    else if (isChecked) setCurrentPath(checkPath);
  }, [isChecked, isMixed]);

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
      className={`transition-all duration-200 ease-in-out ${isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"} ${className}`}
      {...props}
    >
      <path
        d={currentPath}
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: isVisible ? 0 : 1,
          transition: "stroke-dashoffset 0.2s ease-in-out, d 0.2s ease-in-out",
        }}
      />
    </Primitive.svg>
  );
});

CheckboxIcon.displayName = "Checkbox.Icon";

interface CheckboxStateProps {
  children?: (state?: CheckboxState) => React.ReactNode;
}
const CheckboxState = ({ children }: CheckboxStateProps) => {
  const { checked } = useCheckboxContext();
  return <>{children?.(checked)}</>;
};
CheckboxState.displayName = "Checkbox.State";

const Checkbox = {
  Root: CheckboxRoot,
  Trigger: CheckboxTrigger,
  Icon: CheckboxIcon,
  State: CheckboxState,
};
export { Checkbox };
export type { CheckboxState };
