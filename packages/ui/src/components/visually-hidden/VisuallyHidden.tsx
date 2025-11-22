import { cloneElement, forwardRef, isValidElement } from "react";

interface VisuallyHiddenProps {
  children: React.ReactNode;
  asChild?: boolean;
}
const VISUALLY_HIDDEN_STYLES = Object.freeze({
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal",
}) satisfies React.CSSProperties;
export const VisuallyHidden = forwardRef<Element, VisuallyHiddenProps>((props, forwardedRef) => {
  const { children, asChild = true, ...rest } = props;
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref: forwardedRef,
      style: { ...VISUALLY_HIDDEN_STYLES, ...(children.props as any)?.style },
      ...rest,
    } as any);
  }
  return (
    <span ref={forwardedRef as React.Ref<HTMLSpanElement>} style={VISUALLY_HIDDEN_STYLES} {...rest}>
      {children}
    </span>
  );
});
