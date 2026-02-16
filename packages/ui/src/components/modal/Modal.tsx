import { FloatingFocusManager, FloatingOverlay, FloatingPortal, FloatingPortalProps } from "@floating-ui/react";
import { useModal, UseModalProps } from "../../hooks/useModal";
import { forwardRef, useCallback } from "react";
import { Primitive } from "../primitive/Primitive";
import type { PrimitivePropsWithRef } from "../primitive/Primitive";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import clsx from "clsx";

const MODAL_NAME = "Modal";
const [createModalContext, createModalScope] = createContextScope(MODAL_NAME);

type ModalContextValue = ReturnType<typeof useModal> & { lockScroll?: boolean };
const [ModalProvider, useModalContext] = createModalContext<ModalContextValue>(MODAL_NAME);

type ScopedProps<P> = P & { __scopeModal?: Scope };

// =============== Modal.Root ================
export interface ModalProps extends UseModalProps {
  lockScroll?: boolean;
  children?: React.ReactNode;
}
const ModalRoot = (props: ScopedProps<ModalProps>) => {
  const { children, __scopeModal, lockScroll = true, ...restProps } = props;
  const modalData = useModal(restProps);
  return (
    <ModalProvider scope={__scopeModal} {...modalData} lockScroll={lockScroll}>
      {children}
    </ModalProvider>
  );
};
ModalRoot.displayName = "Modal.Root";

// =============== Modal.Trigger ================
interface ModalTriggerProps extends PrimitivePropsWithRef<"button"> {}
const ModalTrigger = forwardRef<React.ComponentRef<typeof Primitive.button>, ScopedProps<ModalTriggerProps>>((props, forwardedRef) => {
  const { __scopeModal, ...triggerProps } = props;
  const { refs, getReferenceProps } = useModalContext(MODAL_NAME, __scopeModal);
  const composedRefs = useComposedRefs(refs.setReference, forwardedRef);
  return <Primitive.button ref={composedRefs} {...getReferenceProps(triggerProps)} />;
});
ModalTrigger.displayName = "Modal.Trigger";

// =============== Modal.Portal ================
interface ModalPortalProps extends FloatingPortalProps {}
const ModalPortal = (props: ScopedProps<ModalPortalProps>) => {
  const { __scopeModal, children, ...portalProps } = props;
  const { isMounted } = useModalContext(MODAL_NAME, __scopeModal);
  return isMounted && <FloatingPortal {...portalProps}>{children}</FloatingPortal>;
};
ModalPortal.displayName = "Modal.Portal";

// =============== Modal.Overlay ================
interface ModalOverlayProps extends PrimitivePropsWithRef<"div"> {}
const ModalOverlay = forwardRef<HTMLDivElement, ScopedProps<ModalOverlayProps>>((props, forwardedRef) => {
  const {
    __scopeModal,
    className = "bg-black/50 inset-0 z-[1000] transition-opacity data-[status=open]:opacity-100 data-[status=close]:opacity-0",
    ...overlayProps
  } = props;
  const { lockScroll, transitionStatus } = useModalContext(MODAL_NAME, __scopeModal);
  return (
    <FloatingOverlay data-status={transitionStatus} lockScroll={lockScroll} className={className} ref={forwardedRef} {...overlayProps} />
  );
});
ModalOverlay.displayName = "Modal.Overlay";

// =============== Modal.Content ================
interface ModalContentProps extends PrimitivePropsWithRef<"div"> {
  initialFocus?: any;
}
export const ModalContent = forwardRef<HTMLDivElement, ScopedProps<ModalContentProps>>((props, forwardedRef) => {
  const { __scopeModal, className, initialFocus, ...contentProps } = props;
  const { refs, getFloatingProps, transitionStyle, context, isOpen } = useModalContext(MODAL_NAME, __scopeModal);
  const composedRefs = useComposedRefs(refs.setFloating, forwardedRef);

  return (
    <FloatingFocusManager context={context} initialFocus={initialFocus}>
      <Primitive.div
        ref={composedRefs}
        aria-modal="true"
        data-state={isOpen ? "open" : "closed"}
        style={transitionStyle}
        className={className ?? "fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2"}
        {...getFloatingProps(contentProps)}
      />
    </FloatingFocusManager>
  );
});
ModalContent.displayName = "Modal.Content";

// =============== Modal.Close ================
interface ModalCloseProps extends PrimitivePropsWithRef<"button"> {}
const ModalClose = forwardRef<HTMLButtonElement, ScopedProps<ModalCloseProps>>((props, forwardedRef) => {
  const { __scopeModal, className, onClick, ...closeProps } = props;
  const { setIsOpen } = useModalContext(MODAL_NAME, __scopeModal);
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
  return <Primitive.button ref={forwardedRef} onClick={handleClick} className={clsx(className)} {...closeProps} />;
});
ModalClose.displayName = "Modal.Close";

const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Close: ModalClose,
};
export { Modal };
export type { ModalTriggerProps, ModalPortalProps, ModalOverlayProps, ModalContentProps, ModalCloseProps };
