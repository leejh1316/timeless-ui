import { useComposedRefs, useControllableState, useModal } from "../../hooks";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { Button } from "../button/Button";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { forwardRef, useCallback } from "react";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingOverlayProps,
  FloatingPortal,
  FloatingPortalProps,
} from "@floating-ui/react";

type ScopedProps<P> = P & { __scopeAlertDialog?: Scope };

const ALERT_DIALOG_NAME = "AlertDialog";
const [createAlertDialogContext, createAlertDialogScope] = createContextScope(ALERT_DIALOG_NAME);

type AlertDialogContextValue = {
  isOpen: boolean;
  lockScroll?: boolean;
  isDismissable?: boolean;
} & ReturnType<typeof useModal>;
const [AlertDialogProvider, useAlertDialogContext] =
  createAlertDialogContext<AlertDialogContextValue>(ALERT_DIALOG_NAME);

// ================ AlertDialog.Root ================
interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  isDismissable?: boolean;
  lockScroll?: boolean;
  onOpenChange?: (open: boolean) => void;
}
const AlertDialogRoot = (props: ScopedProps<AlertDialogProps>) => {
  const { children, __scopeAlertDialog, open, defaultOpen, onOpenChange, lockScroll, isDismissable = true } = props;
  const modal = useModal({ open, initialOpen: defaultOpen, onOpenChange });

  return (
    <AlertDialogProvider scope={__scopeAlertDialog} {...modal} isDismissable={isDismissable} lockScroll={lockScroll}>
      {children}
    </AlertDialogProvider>
  );
};
AlertDialogRoot.displayName = "AlertDialog.Root";

// ================ AlertDialog.Trigger ================
const ALERT_DIALOG_TRIGGER_NAME = "AlertDialogTrigger";
interface AlertDialogTriggerProps extends PrimitivePropsWithRef<typeof Button> {}
const AlertDialogTrigger = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<AlertDialogTriggerProps>>(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, onClick, ...triggerProps } = props;
    const { setIsOpen, refs, isOpen, getReferenceProps } = useAlertDialogContext(
      ALERT_DIALOG_TRIGGER_NAME,
      __scopeAlertDialog,
    );
    const composedRefs = useComposedRefs(forwardedRef, refs.setReference);
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(true);
        onClick?.(event);
      },
      [onClick, setIsOpen],
    );
    return (
      <Button
        ref={composedRefs}
        data-state={isOpen ? "open" : "closed"}
        onClick={handleClick}
        {...getReferenceProps(triggerProps)}
      />
    );
  },
);
AlertDialogTrigger.displayName = "AlertDialog.Trigger";

// ================ AlertDialog.Portal ================
const ALERT_DIALOG_PORTAL_NAME = "AlertDialogPortal";
interface AlertDialogPortalProps extends FloatingPortalProps {}
const AlertDialogPortal = (props: ScopedProps<AlertDialogPortalProps>) => {
  const { __scopeAlertDialog, children, ...portalProps } = props;
  const { isMounted } = useAlertDialogContext(ALERT_DIALOG_PORTAL_NAME, __scopeAlertDialog);
  return isMounted && <FloatingPortal {...portalProps}>{children}</FloatingPortal>;
};
AlertDialogPortal.displayName = "AlertDialog.Portal";

// ================ AlertDialog.Overlay ================
const ALERT_DIALOG_OVERLAY_NAME = "AlertDialogOverlay";
interface AlertDialogOverlayProps extends PrimitivePropsWithRef<"div"> {}
const AlertDialogOverlay = forwardRef<React.ComponentRef<"div">, ScopedProps<AlertDialogOverlayProps>>(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, className, ...overlayProps } = props;
    const { lockScroll, isOpen, transitionStatus } = useAlertDialogContext(
      ALERT_DIALOG_OVERLAY_NAME,
      __scopeAlertDialog,
    );
    return (
      <FloatingOverlay
        data-status={transitionStatus}
        lockScroll={lockScroll}
        className={className}
        data-state={isOpen ? "open" : "closed"}
        ref={forwardedRef}
        {...overlayProps}
      />
    );
  },
);
AlertDialogOverlay.displayName = "AlertDialog.Overlay";

// ================ AlertDialog.Content ================
const ALERT_DIALOG_CONTENT_NAME = "AlertDialogContent";
interface AlertDialogContentProps extends PrimitivePropsWithRef<"div"> {}
const AlertDialogContent = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<AlertDialogContentProps>>(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...contentProps } = props;
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
          {...getFloatingProps(contentProps)}
        />
      </FloatingFocusManager>
    );
  },
);
AlertDialogContent.displayName = "AlertDialog.Content";

// ================ AlertDialog.Button ================
const AlertDialogButton = (name: string) => {
  return forwardRef<React.ComponentRef<typeof Button>, ScopedProps<PrimitivePropsWithRef<typeof Button>>>(
    (props, forwardedRef) => {
      const { __scopeAlertDialog, onClick, ...cancelProps } = props;
      const { setIsOpen } = useAlertDialogContext(name, __scopeAlertDialog);
      const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          setIsOpen(false);
          onClick?.(event);
        },
        [onClick, setIsOpen],
      );
      return <Button ref={forwardedRef} onClick={handleClick} {...cancelProps} />;
    },
  );
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

export type { AlertDialogProps, AlertDialogTriggerProps, AlertDialogOverlayProps, AlertDialogContentProps };
