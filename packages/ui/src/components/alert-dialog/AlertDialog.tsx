import { FloatingFocusManager, FloatingOverlay, FloatingPortal, FloatingPortalProps } from "@floating-ui/react";
import { forwardRef, useCallback, useEffect } from "react";
import { useComposedRefs, useModal } from "../../hooks";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { Button, ButtonProps } from "../button/Button";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

type ScopedProps<P> = P & { __scopeAlertDialog?: Scope };

const ALERT_DIALOG_NAME = "AlertDialog";
const [createAlertDialogContext, createAlertDialogScope] = createContextScope(ALERT_DIALOG_NAME);

type AlertDialogContextValue = {
  isOpen: boolean;
  lockScroll?: boolean;
  isDismissable?: boolean;
  onCloseAfter: () => void;
} & ReturnType<typeof useModal>;
const [AlertDialogProvider, useAlertDialogContext] = createAlertDialogContext<AlertDialogContextValue>(ALERT_DIALOG_NAME);

// ================ AlertDialog.Root ================
interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  isDismissable?: boolean;
  lockScroll?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCloseAfter?: () => void;
}
const AlertDialogRoot = (props: ScopedProps<AlertDialogProps>) => {
  const {
    children,
    __scopeAlertDialog,
    open,
    defaultOpen,
    onOpenChange,
    lockScroll,
    isDismissable = true,
    onCloseAfter = () => {},
  } = props;
  const modal = useModal({ open, initialOpen: defaultOpen, onOpenChange, isDismissable });

  return (
    <AlertDialogProvider scope={__scopeAlertDialog} {...modal} lockScroll={lockScroll} onCloseAfter={onCloseAfter}>
      {children}
    </AlertDialogProvider>
  );
};
AlertDialogRoot.displayName = "AlertDialog.Root";

// ================ AlertDialog.Trigger ================
const ALERT_DIALOG_TRIGGER_NAME = "AlertDialogTrigger";
interface AlertDialogTriggerProps extends ButtonProps {}
const AlertDialogTrigger = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<AlertDialogTriggerProps>>((props, forwardedRef) => {
  const { __scopeAlertDialog, onClick, ...triggerProps } = props;
  const { setIsOpen, refs, isOpen, getReferenceProps } = useAlertDialogContext(ALERT_DIALOG_TRIGGER_NAME, __scopeAlertDialog);
  const composedRefs = useComposedRefs(forwardedRef, refs.setReference);
  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const result = onClick?.(event);
      //@ts-ignore
      if (result instanceof Promise) {
        await result;
      }
      setIsOpen(true);
    },
    [onClick, setIsOpen],
  );
  return <Button {...getReferenceProps(triggerProps)} ref={composedRefs} data-state={isOpen ? "open" : "closed"} onClick={handleClick} />;
});
AlertDialogTrigger.displayName = "AlertDialog.Trigger";

// ================ AlertDialog.Portal ================
const ALERT_DIALOG_PORTAL_NAME = "AlertDialogPortal";
interface AlertDialogPortalProps extends FloatingPortalProps {}
const AlertDialogPortal = (props: ScopedProps<AlertDialogPortalProps>) => {
  const { __scopeAlertDialog, children, ...portalProps } = props;
  const { isMounted, onCloseAfter } = useAlertDialogContext(ALERT_DIALOG_PORTAL_NAME, __scopeAlertDialog);

  useEffect(() => {
    if (!isMounted) {
      onCloseAfter();
    }
  }, [isMounted, onCloseAfter]);

  return isMounted && <FloatingPortal {...portalProps}>{children}</FloatingPortal>;
};
AlertDialogPortal.displayName = "AlertDialog.Portal";

// ================ AlertDialog.Overlay ================
const ALERT_DIALOG_OVERLAY_NAME = "AlertDialogOverlay";
interface AlertDialogOverlayProps extends PrimitivePropsWithRef<"div"> {}
const AlertDialogOverlay = forwardRef<React.ComponentRef<"div">, ScopedProps<AlertDialogOverlayProps>>((props, forwardedRef) => {
  const { __scopeAlertDialog, className, ...overlayProps } = props;
  const { lockScroll, isOpen, transitionStatus } = useAlertDialogContext(ALERT_DIALOG_OVERLAY_NAME, __scopeAlertDialog);
  return (
    <FloatingOverlay
      data-status={transitionStatus}
      lockScroll={lockScroll}
      className={
        className ?? "inset-0 z-[1000] bg-gray-900/70 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100"
      }
      data-state={isOpen ? "open" : "closed"}
      ref={forwardedRef}
      {...overlayProps}
    />
  );
});
AlertDialogOverlay.displayName = "AlertDialog.Overlay";

// ================ AlertDialog.Content ================
const ALERT_DIALOG_CONTENT_NAME = "AlertDialogContent";
interface AlertDialogContentProps extends PrimitivePropsWithRef<"div"> {}
const AlertDialogContent = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<AlertDialogContentProps>>(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, className, ...contentProps } = props;
    const { refs, context, isOpen, getFloatingProps, transitionStyle } = useAlertDialogContext(
      ALERT_DIALOG_CONTENT_NAME,
      __scopeAlertDialog,
    );
    const composedRef = useComposedRefs(refs.setFloating, forwardedRef);
    return (
      <FloatingFocusManager context={context}>
        <Primitive.div
          ref={composedRef}
          role="alertdialog"
          aria-modal="true"
          data-state={isOpen ? "open" : "closed"}
          style={transitionStyle}
          className={className ?? "fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2"}
          {...getFloatingProps(contentProps)}
        />
      </FloatingFocusManager>
    );
  },
);
AlertDialogContent.displayName = "AlertDialog.Content";

// ================ AlertDialog.Button ================
const AlertDialogButton = (name: string) => {
  return forwardRef<React.ComponentRef<typeof Button>, ScopedProps<PrimitivePropsWithRef<typeof Button>>>((props, forwardedRef) => {
    const { __scopeAlertDialog, onClick, ...cancelProps } = props;
    const { setIsOpen } = useAlertDialogContext(name, __scopeAlertDialog);
    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          const result = onClick(event);
          //@ts-ignore
          if (result instanceof Promise) {
            await result;
          }
        }
        if (!event.defaultPrevented) {
          setIsOpen(false);
        }
      },
      [onClick, setIsOpen],
    );
    return <Button ref={forwardedRef} onClick={handleClick} {...cancelProps} />;
  });
};

// ================ AlertDialog.Cancel ================
const ALERT_DIALOG_CANCEL_NAME = "AlertDialogCancel";
const AlertDialogCancel = AlertDialogButton(ALERT_DIALOG_CANCEL_NAME);
AlertDialogCancel.displayName = "AlertDialog.Cancel";

// ================ AlertDialog.Action ================
const ALERT_DIALOG_ACTION_NAME = "AlertDialogAction";
const AlertDialogAction = AlertDialogButton(ALERT_DIALOG_ACTION_NAME);
AlertDialogAction.displayName = "AlertDialog.Action";

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
};

export type { AlertDialogContentProps, AlertDialogOverlayProps, AlertDialogProps, AlertDialogTriggerProps };
