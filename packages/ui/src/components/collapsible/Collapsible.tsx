import { useComposedRefs } from "../../hooks/useComposeRefs";
import { useControllableState } from "../../hooks/useControllableState";
import React, {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Presence } from "../presence/Presence";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { createContextScope } from "../../hooks/useCreateContext";
import { Scope } from "../../hooks/useCreateContext";
import { Button } from "../button/Button";

// =========== Collapsible Context ===========

type ScopedProps<P> = P & { __scopeCollapsible?: Scope };
type CollapsibleContextValue = {
  open: boolean;
  defaultOpen: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
  componentId: string;
};
const COLLAPSIBLE_NAME = "Collapsible";
const [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);

const [CollapsibleProvider, useCollapsibleContext] =
  createCollapsibleContext<CollapsibleContextValue>(COLLAPSIBLE_NAME);

// =========== Collapsible.Root ===========
interface CollapsibleRootProps
  extends PrimitivePropsWithRef<"div">,
    Partial<Omit<CollapsibleContextValue, "componentId">> {}
const CollapsibleRoot = ({
  defaultOpen = false,
  onOpenChange,
  open,
  disabled,
  __scopeCollapsible,
  ...props
}: ScopedProps<CollapsibleRootProps>) => {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const componentId = useId();
  return (
    <CollapsibleProvider
      open={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={setIsOpen}
      disabled={disabled}
      componentId={`timeless-${componentId}`}
      scope={__scopeCollapsible}
    >
      <Primitive.div data-slot="collapsible" data-disabled={disabled} data-open={isOpen} {...props} />
    </CollapsibleProvider>
  );
};
CollapsibleRoot.displayName = "Collapsible.Root";

// =========== Collapsible.Trigger ===========
const COLLAPSIBLE_TRIGGER_NAME = "CollapsibleTrigger";
interface CollapsibleTriggerProps extends PrimitivePropsWithRef<"button"> {}
const CollapsibleTrigger = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<CollapsibleTriggerProps>>(
  ({ onClick, __scopeCollapsible, ...props }, forwardedRef) => {
    const {
      disabled,
      open: isOpen,
      componentId,
      onOpenChange,
    } = useCollapsibleContext(COLLAPSIBLE_TRIGGER_NAME, __scopeCollapsible);
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (disabled) return;
        onOpenChange?.(!isOpen);
        onClick?.(e);
      },
      [disabled, isOpen, onOpenChange],
    );
    return (
      <Button
        ref={forwardedRef}
        onClick={handleClick}
        data-slot="collapsible-trigger"
        disabled={disabled}
        data-disabled={disabled}
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-controls={componentId}
        {...props}
      />
    );
  },
);
CollapsibleTrigger.displayName = "Collapsible.Trigger";

// =========== Collapsible.Content ===========
const COLLAPSIBLE_CONTENT_NAME = "CollapsibleContent";
interface CollapsibleContentProps extends PrimitivePropsWithRef<"div"> {}
const CollapsibleContent = memo(
  forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<CollapsibleContentProps>>(
    ({ __scopeCollapsible, ...props }, forwardedRef) => {
      const { open: isOpen } = useCollapsibleContext(COLLAPSIBLE_CONTENT_NAME, __scopeCollapsible);
      return (
        <Presence present={isOpen}>
          {({ isPresent }) => (
            <CollapsibleContentImpl
              __scopeCollapsible={__scopeCollapsible}
              {...props}
              ref={forwardedRef}
              present={isPresent}
            />
          )}
        </Presence>
      );
    },
  ),
);
CollapsibleContent.displayName = "Collapsible.Content";

// =========== Collapsible.Content Impl ===========
const COLLAPSIBLE_CONTENT_IMPL_NAME = "CollapsibleContentImpl";
interface CollapsibleContentImplProps extends PrimitivePropsWithRef<"div"> {
  present: boolean;
}
const CollapsibleContentImpl = memo(
  forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<CollapsibleContentImplProps>>(
    ({ children, style, present, __scopeCollapsible, ...props }, forwardedRef) => {
      const { disabled, open: isOpenFromContext } = useCollapsibleContext(
        COLLAPSIBLE_CONTENT_IMPL_NAME,
        __scopeCollapsible,
      );

      const heightRef = useRef<number | undefined>(0);
      const widthRef = useRef<number | undefined>(0);

      const [isPresent, setIsPresent] = useState(present);

      const ref = useRef<HTMLDivElement>(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);

      const isOpen = isOpenFromContext || isPresent;

      const isMountAnimationPreventedRef = useRef(isOpen);
      const originalStylesRef = useRef<Record<string, string>>(undefined);

      React.useEffect(() => {
        const rAF = requestAnimationFrame(() => (isMountAnimationPreventedRef.current = false));
        return () => cancelAnimationFrame(rAF);
      }, []);

      useLayoutEffect(() => {
        const node = ref.current;
        if (node) {
          originalStylesRef.current = originalStylesRef.current || {
            transitionDuration: node.style.transitionDuration,
            animationName: node.style.animationName,
          };

          node.style.transitionDuration = "0s";
          node.style.animationName = "none";

          const rect = node.getBoundingClientRect();
          heightRef.current = rect.height;
          widthRef.current = rect.width;

          if (!isMountAnimationPreventedRef.current) {
            node.style.transitionDuration = originalStylesRef.current.transitionDuration;
            node.style.animationName = originalStylesRef.current.animationName;
          }

          setIsPresent(present);
        }
      }, [isOpenFromContext, present]);

      const _style = {
        "--collapsible-content-width": widthRef.current ? `${widthRef.current}px` : undefined,
        "--collapsible-content-height": heightRef.current ? `${heightRef.current}px` : undefined,
        ...style,
      } as React.CSSProperties;

      return (
        <Primitive.div
          hidden={!isOpen}
          data-slot="collapsible-content"
          data-disabled={disabled}
          data-open={isOpenFromContext}
          {...props}
          style={_style}
          ref={composedRefs}
        >
          {isOpen && children}
        </Primitive.div>
      );
    },
  ),
);
CollapsibleContentImpl.displayName = "Collapsible.ContentImpl";

// =========== Export ===========
export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
};

// =========== Export Context ===========
export { useCollapsibleContext };
export { createCollapsibleScope };
// =========== Export Type ===========
export type { CollapsibleContextValue, CollapsibleRootProps, CollapsibleTriggerProps, CollapsibleContentProps };
