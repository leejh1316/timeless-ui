import { forwardRef, useEffect, useState } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

interface ButtonProps extends PrimitivePropsWithRef<"button"> {
  loading?: boolean;
}

const Button = forwardRef<React.ComponentRef<typeof Primitive.button>, ButtonProps>((props, forwardedRef) => {
  const {
    disabled = false,
    loading = false,
    onTouchStart,
    onTouchEnd,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    type='button',
    ...buttonProps
  } = props;
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = (disabled || loading) ?? false;

  const createEventHandler = <E extends React.SyntheticEvent<HTMLButtonElement>>(
    handler?: (event: E) => void,
    action?: () => void,
  ) => {
    return (event: E) => {
      if (isDisabled) return;
      action?.();
      handler?.(event);
    };
  };

  const handleTouchStart = createEventHandler(onTouchStart, () => setIsPressed(true));
  const handleTouchEnd = createEventHandler(onTouchEnd, () => setIsPressed(false));
  const handleMouseDown = createEventHandler(onMouseDown, () => setIsPressed(true));
  const handleMouseUp = createEventHandler(onMouseUp, () => setIsPressed(false));
  const handleMouseEnter = createEventHandler(onMouseEnter, () => setIsHovered(true));
  const handleMouseLeave = createEventHandler(onMouseLeave, () => setIsHovered(false));

  useEffect(() => {
    if (!isPressed) return;
    const handleWindowMouseUp = () => {
      setIsPressed(false);
    };
    window.addEventListener("mouseup", handleWindowMouseUp);
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
      data-hovered={isHovered}
      data-pressed={isPressed}
      data-loading={loading}
      aria-pressed={isPressed}
      aria-disabled={isDisabled}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...buttonProps}
    />
  );
});

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
