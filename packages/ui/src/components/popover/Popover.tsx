import { FloatingPortal, FloatingPortalProps } from "@floating-ui/react";
import { forwardRef } from "react";
import { useComposedRefs } from "../../hooks";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { usePopover, UsePopoverProps } from "../../hooks/usePopover";
import { Button } from "../button/Button";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

type PopoverContextType = ReturnType<typeof usePopover>;

type ScopedProps<P> = P & { __scopePopover?: Scope };

const POPOVER_NAME = "Popover";
const [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME);
const [PopoverContextProvider, usePopoverContext] = createPopoverContext<PopoverContextType>(POPOVER_NAME);

type PopoverProps = {
  children: React.ReactNode;
} & UsePopoverProps;
const PopoverRoot = ({ children, __scopePopover, ...options }: ScopedProps<PopoverProps>) => {
  const popover = usePopover(options);
  return (
    <PopoverContextProvider scope={__scopePopover} {...popover}>
      {children}
    </PopoverContextProvider>
  );
};
PopoverRoot.displayName = "Popover.Root";

const POPOVER_TRIGGER_NAME = "PopoverTrigger";
interface PopoverTriggerProps extends PrimitivePropsWithRef<typeof Button> {}
const PopoverTrigger = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<PopoverTriggerProps>>((props, forwardedRef) => {
  const { __scopePopover, ...otherProps } = props;
  const { refs, getReferenceProps, isMounted } = usePopoverContext(POPOVER_TRIGGER_NAME, __scopePopover);
  const composedRef = useComposedRefs(forwardedRef, refs.setReference);
  return <Button ref={composedRef} data-state={isMounted ? "open" : "closed"} {...otherProps} {...getReferenceProps()} />;
});
PopoverTrigger.displayName = "Popover.Trigger";

const PopoverPortal = ({ children, ...props }: FloatingPortalProps) => {
  return <FloatingPortal {...props}>{children}</FloatingPortal>;
};
PopoverPortal.displayName = "Popover.Portal";

const POPOVER_VIEW_NAME = "PopoverView";
const PopoverView = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<PrimitivePropsWithRef<"div">>>(
  (props, forwardedRef) => {
    const { __scopePopover, ...otherProps } = props;
    const { refs, getFloatingProps, floatingStyles, isMounted } = usePopoverContext(POPOVER_VIEW_NAME, __scopePopover);
    const composedRef = useComposedRefs(forwardedRef, refs.setFloating);
    if (!isMounted) return null;
    return (
      <Primitive.div
        ref={composedRef}
        style={floatingStyles}
        data-state={isMounted ? "open" : "closed"}
        {...otherProps}
        {...getFloatingProps()}
      />
    );
  },
);
PopoverView.displayName = "Popover.View";

const POPOVER_CONTENT_NAME = "PopoverContent";
const PopoverContent = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<PrimitivePropsWithRef<"div">>>(
  (props, forwardedRef) => {
    const { __scopePopover, ...otherProps } = props;
    const { transitionStatus, isMounted, transitionStyle } = usePopoverContext(POPOVER_CONTENT_NAME, __scopePopover);
    return (
      <Primitive.div
        ref={forwardedRef}
        style={{ ...transitionStyle }}
        data-status={transitionStatus}
        data-state={isMounted ? "open" : "closed"}
        {...otherProps}
      />
    );
  },
);
PopoverContent.displayName = "Popover.Content";

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  View: PopoverView,
  Content: PopoverContent,
};
