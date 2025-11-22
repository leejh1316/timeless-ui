import { useControllableState } from "../../hooks/useControllableState";
import clsx from "clsx";

export interface ToggleProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange" | "defaultValue" | "children" | "checked"> {
  name?: string;
  state?: boolean;
  defaultState?: boolean;
  disabled?: boolean;
  onChangeState?: (state: boolean) => void;
  children: (state: boolean) => React.ReactNode;
}
export const Toggle = ({
  name,
  state: controlledState,
  defaultState = false,
  onChangeState,
  children,
  className,
  disabled = false,
  ...props
}: ToggleProps) => {
  const [state, setOnState] = useControllableState({
    value: controlledState,
    defaultValue: defaultState,
    onChange: onChangeState,
  });

  const toggle = () => setOnState(!state);

  return (
    <label className={clsx("toggle", className)} data-disabled={disabled} {...props}>
      <input
        type="checkbox"
        disabled={disabled}
        onChange={toggle}
        name={name}
        checked={state}
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
      {children(state)}
    </label>
  );
};
