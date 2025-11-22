import { FloatingPortal } from "@floating-ui/react";
import { usePopover, UsePopoverProps } from "../../hooks/usePopover";
import { merge } from "lodash-es";
import { cloneElement, createContext, useContext } from "react";

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
} & UsePopoverProps;
export const Popover = ({ children, ...options }: PopoverProps) => {
  const popover = usePopover(options);
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
};

type PopoverTriggerProps = {
  children: React.ReactNode;
  className?: string;
};
export const PopoverTrigger = ({ children, className }: PopoverTriggerProps) => {
  const { refs, getReferenceProps } = usePopoverContext();
  return (
    <div style={{ display: "inline-block" }} ref={refs.setReference} className={className} {...getReferenceProps()}>
      {children}
    </div>
  );
};

type PopoverContentProps = {
  children: React.ReactNode;
  className?: string;
};
export const PopoverContent = ({ children, className }: PopoverContentProps) => {
  const { isMounted, refs, getFloatingProps, floatingStyles, transitionStyle, placement, transitionStatus } =
    usePopoverContext();
  if (!isMounted) return null;
  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        className={className}
        style={floatingStyles}
        data-status={transitionStatus}
        data-placement={placement}
        {...getFloatingProps()}
      >
        <div style={transitionStyle}>{children}</div>
      </div>
    </FloatingPortal>
  );
};
