import { forwardRef, useEffect, useState } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

interface ButtonProps extends PrimitivePropsWithRef<"button"> {
  loading?: boolean;
}

const Button = forwardRef<React.ComponentRef<typeof Primitive.button>, ButtonProps>((props, forwardedRef) => {
  const { disabled = false, loading = false, onPointerDown, onPointerUp, type = "button", ...otherProps } = props;
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = (disabled || loading) ?? false;

  const createEventHandler = <E extends React.SyntheticEvent<HTMLButtonElement>>(handler?: (event: E) => void, action?: () => void) => {
    return (event: E) => {
      if (isDisabled) return;
      action?.();
      handler?.(event);
    };
  };

  const handlePointerDown = createEventHandler(onPointerDown, () => setIsPressed(true));
  const handlePointerUp = createEventHandler(onPointerUp, () => setIsPressed(false));

  useEffect(() => {
    if (!isPressed) return;
    const handleWindowMouseUp = () => {
      setIsPressed(false);
    };
    window.addEventListener("mouseup", handleWindowMouseUp, { once: true });
    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isPressed]);
  return (
    <Primitive.button
      ref={forwardedRef}
      type={type}
      disabled={isDisabled}
      data-disabled={isDisabled}
      data-pressed={isPressed}
      data-loading={loading}
      aria-disabled={isDisabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...otherProps}
    />
  );
});

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
