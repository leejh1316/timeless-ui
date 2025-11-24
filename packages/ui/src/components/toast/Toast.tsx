import { useComposedRefs, useControllableState, useMeasureSize } from "../../hooks";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { forwardRef, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { composeEventHandlers } from "../../utils/composeEventHandlers";
import { Presence } from "../presence/Presence";

type ScopedProps<P> = P & { __scopeToast?: Scope };

const TOAST_NAME = "Toast";
const [createToastContext, createToastScope] = createContextScope(TOAST_NAME);

// ================ ToastProvider ================

type SwipeDirection = "up" | "down" | "left" | "right";

type ToastProviderContextValue = {
  duration: number;
  viewport: HTMLOListElement | null;
  onViewportChange: (viewport: HTMLOListElement | null) => void;
  swipeDirection: SwipeDirection;
  swipeThreshold: number;
};

const [ToastProviderProvider, useToastProviderContext] = createToastContext<ToastProviderContextValue>(TOAST_NAME);

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
  swipeDirection?: SwipeDirection;
  swipeThreshold?: number;
}

const ToastProvider = (props: ScopedProps<ToastProviderProps>) => {
  const {
    __scopeToast,
    children,
    duration = 5000,
    swipeDirection = "right",
    swipeThreshold = 50,
  } = props;
  const [viewport, setViewport] = useState<HTMLOListElement | null>(null);
  return (
    <ToastProviderProvider
      scope={__scopeToast}
      duration={duration}
      viewport={viewport}
      onViewportChange={setViewport}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
    >
      {children}
    </ToastProviderProvider>
  );
};

ToastProvider.displayName = "Toast.Provider";

// ================ ToastRoot ================

type ToastContextValue = {
  open: boolean;
  onClose(): void;
};

const [ToastContextProvider, useToastContext] = createToastContext<ToastContextValue>(TOAST_NAME);

interface ToastRootProps extends PrimitivePropsWithRef<"li"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  forceMount?: true;
}

const ToastRoot = forwardRef<HTMLLIElement, ScopedProps<ToastRootProps>>((props, forwardedRef) => {
  const {
    __scopeToast,
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    duration: durationProp,
    style,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    forceMount,
    ...rootProps
  } = props;
  const providerContext = useToastProviderContext(TOAST_NAME, __scopeToast);
  const duration = durationProp ?? providerContext.duration;
  const { swipeDirection, swipeThreshold } = providerContext;

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [measureRef, size] = useMeasureSize<HTMLLIElement>();
  const composedRef = useComposedRefs(forwardedRef, measureRef);

  const closeTimerRef = useRef(0);
  const startTimeRef = useRef(0);
  const remainingTimeRef = useRef(duration);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const startTimer = useCallback(
    (dur: number) => {
      if (!dur || dur === Infinity) return;
      window.clearTimeout(closeTimerRef.current);
      startTimeRef.current = new Date().getTime();
      closeTimerRef.current = window.setTimeout(handleClose, dur);
    },
    [handleClose],
  );

  const pauseTimer = useCallback(() => {
    const elapsed = new Date().getTime() - startTimeRef.current;
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    window.clearTimeout(closeTimerRef.current);
  }, []);

  const resumeTimer = useCallback(() => {
    if (remainingTimeRef.current > 0) {
      startTimer(remainingTimeRef.current);
    }
  }, [startTimer]);

  useEffect(() => {
    if (open && duration > 0) {
      startTimer(duration);
    }
    return () => window.clearTimeout(closeTimerRef.current);
  }, [open, duration, startTimer]);

  const [swipeDelta, setSwipeDelta] = useState<{ x: number; y: number } | null>(null);
  const [swipeState, setSwipeState] = useState<"start" | "move" | "cancel" | "end" | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    if (open) {
      setSwipeState(null);
      setSwipeDelta(null);
    }
  }, [open]);

  const handlePointerDown = (event: React.PointerEvent) => {
    if (event.button !== 0) return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    setSwipeState("start");
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const rawX = event.clientX - pointerStartRef.current.x;
    const rawY = event.clientY - pointerStartRef.current.y;

    let x = 0;
    let y = 0;

    if (swipeDirection === "left" || swipeDirection === "right") {
      if (swipeDirection === "left") x = Math.min(0, rawX);
      else x = Math.max(0, rawX);
    } else {
      if (swipeDirection === "up") y = Math.min(0, rawY);
      else y = Math.max(0, rawY);
    }

    setSwipeDelta({ x, y });
    setSwipeState("move");
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (swipeDelta) {
      const delta = swipeDelta;
      const deltaX = Math.abs(delta.x);
      const deltaY = Math.abs(delta.y);
      const isDeltaX = deltaX > deltaY;
      
      let isSwipe = false;
      if (swipeDirection === "left" || swipeDirection === "right") {
        isSwipe = isDeltaX && deltaX > swipeThreshold;
      } else {
        isSwipe = !isDeltaX && deltaY > swipeThreshold;
      }

      if (isSwipe) {
        setSwipeState("end");
        handleClose();
      } else {
        setSwipeState("cancel");
        setSwipeDelta(null);
      }
    } else {
      setSwipeState(null);
    }
    pointerStartRef.current = null;
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
  };

  return (
    <ToastContextProvider scope={__scopeToast} open={open} onClose={() => setOpen(false)}>
      {providerContext.viewport &&
        createPortal(
          <Presence present={forceMount || open}>
            <Primitive.li
              data-state={open ? "open" : "closed"}
              data-swipe-direction={swipeDirection}
              data-swipe={swipeState}
              {...rootProps}
              ref={composedRef}
              style={{
                ...style,
                "--toast-width": `${size.width}px`,
                "--toast-height": `${size.height}px`,
                "--toast-swipe-move-x": `${swipeDelta?.x ?? 0}px`,
                "--toast-swipe-move-y": `${swipeDelta?.y ?? 0}px`,
                "--toast-swipe-end-x": swipeDirection === "right" ? "100%" : swipeDirection === "left" ? "-100%" : "0",
                "--toast-swipe-end-y": swipeDirection === "down" ? "100%" : swipeDirection === "up" ? "-100%" : "0",
                userSelect: "none",
                transform: swipeState === "end" ? undefined : swipeDelta ? `translate(${swipeDelta.x}px, ${swipeDelta.y}px)` : undefined,
                transition: swipeDelta ? "none" : undefined,
                touchAction: "none",
              } as React.CSSProperties}
              onPointerEnter={composeEventHandlers(onPointerEnter, pauseTimer)}
              onPointerLeave={composeEventHandlers(onPointerLeave, resumeTimer)}
              onPointerDown={composeEventHandlers(onPointerDown, handlePointerDown)}
              onPointerMove={composeEventHandlers(onPointerMove, handlePointerMove)}
              onPointerUp={composeEventHandlers(onPointerUp, handlePointerUp)}
            />
          </Presence>,
          providerContext.viewport,
        )}
    </ToastContextProvider>
  );
});

ToastRoot.displayName = "Toast.Root";

// ================ ToastTitle ================

const TOAST_TITLE_NAME = "ToastTitle";
interface ToastTitleProps extends PrimitivePropsWithRef<"div"> {}

const ToastTitle = forwardRef<HTMLDivElement, ScopedProps<ToastTitleProps>>((props, ref) => {
  const { __scopeToast, ...titleProps } = props;
  return <Primitive.div {...titleProps} ref={ref} />;
});

ToastTitle.displayName = TOAST_TITLE_NAME;

// ================ ToastDescription ================

const TOAST_DESCRIPTION_NAME = "ToastDescription";
interface ToastDescriptionProps extends PrimitivePropsWithRef<"div"> {}

const ToastDescription = forwardRef<HTMLDivElement, ScopedProps<ToastDescriptionProps>>((props, ref) => {
  const { __scopeToast, ...descriptionProps } = props;
  return <Primitive.div {...descriptionProps} ref={ref} />;
});

ToastDescription.displayName = TOAST_DESCRIPTION_NAME;

// ================ ToastAction ================

const TOAST_ACTION_NAME = "ToastAction";
interface ToastActionProps extends PrimitivePropsWithRef<"button"> {}

const ToastAction = forwardRef<HTMLButtonElement, ScopedProps<ToastActionProps>>((props, ref) => {
  const { __scopeToast, ...actionProps } = props;
  return <Primitive.button {...actionProps} ref={ref} />;
});

ToastAction.displayName = TOAST_ACTION_NAME;

// ================ ToastClose ================

const TOAST_CLOSE_NAME = "ToastClose";
interface ToastCloseProps extends PrimitivePropsWithRef<"button"> {}

const ToastClose = forwardRef<HTMLButtonElement, ScopedProps<ToastCloseProps>>((props, ref) => {
  const { __scopeToast, onClick, ...closeProps } = props;
  const context = useToastContext(TOAST_CLOSE_NAME, __scopeToast);
  return (
    <Primitive.button
      type="button"
      {...closeProps}
      ref={ref}
      onClick={(event) => {
        onClick?.(event);
        context.onClose();
      }}
    />
  );
});

ToastClose.displayName = TOAST_CLOSE_NAME;

// ================ ToastViewport ================

const TOAST_VIEWPORT_NAME = "ToastViewport";
interface ToastViewportProps extends PrimitivePropsWithRef<"ol"> {
  direction?: "up" | "down";
}

const ToastViewport = forwardRef<HTMLOListElement, ScopedProps<ToastViewportProps>>((props, forwardedRef) => {
  const { __scopeToast, direction = "down", style, ...viewportProps } = props;
  const context = useToastProviderContext(TOAST_VIEWPORT_NAME, __scopeToast);
  const composedRefs = useComposedRefs(forwardedRef, context.onViewportChange);

  return (
    <Primitive.ol
      tabIndex={-1}
      {...viewportProps}
      ref={composedRefs}
      style={{
        display: "flex",
        flexDirection: direction === "down" ? "column" : "column-reverse",
        ...style,
      }}
    />
  );
});

ToastViewport.displayName = TOAST_VIEWPORT_NAME;

export const Toast = {
  Provider: ToastProvider,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
  Viewport: ToastViewport,
};

export {
  createToastScope,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
};
export type {
  ToastProviderProps,
  ToastRootProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
  ToastViewportProps,
};
