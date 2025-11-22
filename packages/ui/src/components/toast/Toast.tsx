import { useComposedRefs, useControllableState } from "../../hooks";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { forwardRef, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ScopedProps<P> = P & { __scopeToast?: Scope };

const TOAST_NAME = "Toast";
const [createToastContext, createToastScope] = createContextScope(TOAST_NAME);

// ================ ToastProvider ================

type ToastProviderContextValue = {
  duration: number;
  viewport: HTMLOListElement | null;
  onViewportChange: (viewport: HTMLOListElement | null) => void;
};

const [ToastProviderProvider, useToastProviderContext] = createToastContext<ToastProviderContextValue>(TOAST_NAME);

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}

const ToastProvider = (props: ScopedProps<ToastProviderProps>) => {
  const { __scopeToast, children, duration = 5000 } = props;
  const [viewport, setViewport] = useState<HTMLOListElement | null>(null);
  return (
    <ToastProviderProvider scope={__scopeToast} duration={duration} viewport={viewport} onViewportChange={setViewport}>
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
}

const ToastRoot = forwardRef<HTMLLIElement, ScopedProps<ToastRootProps>>((props, ref) => {
  const {
    __scopeToast,
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    duration: durationProp,
    ...rootProps
  } = props;
  const providerContext = useToastProviderContext(TOAST_NAME, __scopeToast);
  const duration = durationProp ?? providerContext.duration;

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, setOpen]);

  return (
    <ToastContextProvider scope={__scopeToast} open={open} onClose={() => setOpen(false)}>
      {open &&
        providerContext.viewport &&
        createPortal(
          <Primitive.li data-state={open ? "open" : "closed"} {...rootProps} ref={ref} />,
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
interface ToastViewportProps extends PrimitivePropsWithRef<"ol"> {}

const ToastViewport = forwardRef<HTMLOListElement, ScopedProps<ToastViewportProps>>((props, forwardedRef) => {
  const { __scopeToast, ...viewportProps } = props;
  const context = useToastProviderContext(TOAST_VIEWPORT_NAME, __scopeToast);
  const composedRefs = useComposedRefs(forwardedRef, context.onViewportChange);

  return <Primitive.ol tabIndex={-1} {...viewportProps} ref={composedRefs} />;
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
