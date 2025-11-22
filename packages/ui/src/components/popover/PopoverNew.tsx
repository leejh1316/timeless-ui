import { FloatingPortal, FloatingPortalProps } from "@floating-ui/react";
import { useComposedRefs } from "@src/hooks/useComposeRefs";
import { usePopover, UsePopoverProps } from "@src/hooks/usePopover";
import { createContext, forwardRef, useContext } from "react";
import { Primitive, PrimitivePropsWithRef } from "./Primitive";

type PopoverContextType = ReturnType<typeof usePopover> | null;
const PopoverContext = createContext<PopoverContextType>(null);
export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

type PopoverProps = {
  children: React.ReactNode;
  popoverData?: ReturnType<typeof usePopover>;
} & UsePopoverProps;
export const Popover = ({ children, popoverData, ...options }: PopoverProps) => {
  const popover = popoverData || usePopover(options);
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
};

interface PopoverTriggerProps extends PrimitivePropsWithRef<"button"> {}
export const PopoverTrigger = forwardRef<React.ComponentRef<typeof Primitive.button>, PopoverTriggerProps>(
  ({ style, ...props }, forwardedRef) => {
    const { refs, getReferenceProps } = usePopoverContext();
    const composedRefs = useComposedRefs(forwardedRef, refs.setReference);
    return (
      <Primitive.button
        style={{ display: "inline-block", ...style }}
        ref={composedRefs}
        {...props}
        {...getReferenceProps()}
      />
    );
  },
);

export const PopoverOverlay = ({ children, ...props }: FloatingPortalProps) => {
  return <FloatingPortal {...props}>{children}</FloatingPortal>;
};

interface PopoverContentProps extends PrimitivePropsWithRef<"div"> {}
export const PopoverContent = forwardRef<React.ComponentRef<typeof Primitive.div>, PopoverContentProps>(
  ({ children, style, ...props }, forwardedRef) => {
    const { isMounted, refs, getFloatingProps, floatingStyles, transitionStyle, placement, transitionStatus } =
      usePopoverContext();
    const composedRefs = useComposedRefs(forwardedRef, refs.setFloating);
    if (!isMounted) return null;
    return (
      <Primitive.div
        ref={composedRefs}
        style={{ ...floatingStyles }}
        data-status={transitionStatus}
        data-placement={placement}
        {...props}
        {...getFloatingProps()}
      >
        <div style={{ ...style, ...transitionStyle }}>{children}</div>
      </Primitive.div>
    );
  },
);
