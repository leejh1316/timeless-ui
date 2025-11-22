import {
  FloatingArrow,
  FloatingArrowProps,
  FloatingPortal,
  FloatingPortalProps,
  OffsetOptions,
  Placement,
  UseHoverProps,
} from "@floating-ui/react";
import { forwardRef, useRef } from "react";
import { useComposedRefs, useControllableState, usePopover } from "../../hooks";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { Button } from "../button/Button";

type ScopedProps<P> = P & { __scopeTooltip?: Scope };

const TOOLTIP_NAME = "Tooltip";
const [createTooltipContext, createTooltipScope] = createContextScope(TOOLTIP_NAME);

type TooltipContextValue = ReturnType<typeof usePopover> & {
  arrowRef: React.RefObject<SVGElement | null>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};
const [TooltipProvider, useTooltipContext] = createTooltipContext<TooltipContextValue>(TOOLTIP_NAME);

// ================ Tooltip.Root ================
interface TooltipRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  options?: UseHoverProps;
  offset?: OffsetOptions;
  placement?: Placement;
}
const TooltipRoot = (props: ScopedProps<TooltipRootProps>) => {
  const { __scopeTooltip, children, open, defaultOpen, onOpenChange, options, offset, placement } = props;
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });
  const arrowRef = useRef<SVGElement | null>(null);
  const popover = usePopover({
    placement,
    triggerMode: ["hover"],
    middlewareOptions: {
      arrow: {
        element: arrowRef,
      },
      offset: offset,
    },
    interactionOptions: {
      hover: {
        ...options,
        enabled: true,
        delay: {
          close: 100,
          open: 100,
        },
      },
    },
  });
  return (
    <TooltipProvider {...popover} arrowRef={arrowRef} isOpen={isOpen} setIsOpen={setIsOpen} scope={__scopeTooltip}>
      {children}
    </TooltipProvider>
  );
};
TooltipRoot.displayName = "Tooltip.Root";

// ================ Tooltip.Trigger ================
const TOOLTIP_TRIGGER_NAME = "TooltipTrigger";
interface TooltipTriggerProps extends PrimitivePropsWithRef<typeof Button> {}
const TooltipTrigger = (props: ScopedProps<TooltipTriggerProps>) => {
  const { __scopeTooltip, ...triggerProps } = props;
  const { refs, isOpen, getReferenceProps } = useTooltipContext(TOOLTIP_TRIGGER_NAME, __scopeTooltip);
  return (
    <Button ref={refs.setReference} data-state={isOpen ? "open" : "closed"} {...getReferenceProps(triggerProps)} />
  );
};
TooltipTrigger.displayName = "Tooltip.Trigger";

// ================ Tooltip.Arrow ================
const TooltipArrowName = "TooltipArrow";
interface TooltipArrowProps extends Omit<FloatingArrowProps, "context"> {}
const TooltipArrow = forwardRef<React.ComponentRef<"svg">, ScopedProps<TooltipArrowProps>>((props, forwardedRef) => {
  const { __scopeTooltip, ...arrowProps } = props;
  const { arrowRef, context } = useTooltipContext(TooltipArrowName, __scopeTooltip);
  const composedRefs = useComposedRefs(forwardedRef, arrowRef);
  return <FloatingArrow ref={composedRefs} context={context} {...arrowProps} />;
});
TooltipArrow.displayName = "Tooltip.Arrow";

// ================ Tooltip.Portal ================
const TOOLTIP_PORTAL_NAME = "TooltipPortal";
interface TooltipPortalProps extends FloatingPortalProps {}
const TooltipPortal = (props: ScopedProps<TooltipPortalProps>) => {
  const { __scopeTooltip, children, ...portalProps } = props;
  const { isMounted } = useTooltipContext(TOOLTIP_PORTAL_NAME, __scopeTooltip);
  return isMounted && <FloatingPortal {...portalProps}>{children}</FloatingPortal>;
};
TooltipPortal.displayName = "Tooltip.Portal";

// ================ Tooltip.Content ================
const TOOLTIP_CONTENT_NAME = "TooltipContent";
interface TooltipContentProps extends PrimitivePropsWithRef<"div"> {}
const TooltipContent = forwardRef<React.ComponentRef<"div">, ScopedProps<TooltipContentProps>>(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...contentProps } = props;
    const { refs, context, getFloatingProps, floatingStyles, transitionStyle, transitionStatus } = useTooltipContext(
      TOOLTIP_CONTENT_NAME,
      __scopeTooltip,
    );
    const composedRefs = useComposedRefs(forwardedRef, refs.setFloating);
    return (
      <Primitive.div
        ref={composedRefs}
        {...getFloatingProps()}
        style={floatingStyles}
        data-status={transitionStatus}
        data-state={context.open ? "open" : "closed"}
      >
        <Primitive.div
          style={transitionStyle}
          {...contentProps}
          data-status={transitionStatus}
          data-state={context.open ? "open" : "closed"}
        />
      </Primitive.div>
    );
  },
);
TooltipContent.displayName = "Tooltip.Content";

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Arrow: TooltipArrow,
  Portal: TooltipPortal,
  Content: TooltipContent,
};
