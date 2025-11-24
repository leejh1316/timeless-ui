import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from "@floating-ui/react";
import { useModal, UseModalProps } from "@src/hooks/useModal";
import clsx from "clsx";
import { cloneElement, createContext, forwardRef, isValidElement, useContext } from "react";
import { Primitive, PrimitivePropsWithRef } from "./Primitive";
import { useComposedRefs } from "@src/hooks/useComposeRefs";

type ModalContextValue = ReturnType<typeof useModal> & { lockScroll?: boolean };
const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
};

// =============== Modal.Root ================
export interface ModalProps extends UseModalProps {
  lockScroll?: boolean;
  children?: React.ReactNode;
}
const ModalRoot = ({ children, lockScroll = true, ...props }: ModalProps) => {
  const modalData = useModal(props);
  return <ModalContext.Provider value={{ ...modalData, lockScroll }}>{children}</ModalContext.Provider>;
};
ModalRoot.displayName = "Modal.Root";

// =============== Modal.Trigger ================
interface ModalTriggerProps extends PrimitivePropsWithRef<"button"> {}
const ModalTrigger = forwardRef<React.ComponentRef<typeof Primitive.button>, ModalTriggerProps>(
  ({ ...props }, forwardedRef) => {
    const { refs, getReferenceProps } = useModalContext();
    const composedRefs = useComposedRefs(refs.setReference, forwardedRef);
    return <Primitive.button ref={composedRefs} {...getReferenceProps(props)} />;
  },
);
ModalTrigger.displayName = "Modal.Trigger";

// =============== Modal.Overlay ================
interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  initialFocus?: any;
}
const ModalOverlay = ({
  children,
  className = "bg-gray-900/70 inset-0 z-[1000] transition-opacity data-[status=open]:opacity-100 data-[status=close]:opacity-0",
  initialFocus,
  ...props
}: ModalOverlayProps) => {
  const { context, lockScroll, isMounted, transitionStatus } = useModalContext();
  return (
    isMounted && (
      <FloatingPortal>
        <FloatingOverlay data-status={transitionStatus} lockScroll={lockScroll} className={className} {...props} />
        <FloatingFocusManager context={context} initialFocus={initialFocus} order={["floating", "content"]}>
          <>{children}</>
        </FloatingFocusManager>
      </FloatingPortal>
    )
  );
};
ModalOverlay.displayName = "Modal.Overlay";

// =============== Modal.Content ================
interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const { refs, getFloatingProps, transitionStyle } = useModalContext();
    const composedRefs = useComposedRefs(refs.setFloating, forwardedRef);
    return (
      <div className={clsx("fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2", className)} {...props}>
        <div ref={composedRefs} style={transitionStyle} {...getFloatingProps()}>
          {children}
        </div>
      </div>
    );
  },
);
ModalContent.displayName = "ModalContent";

// =============== Modal.Close ================
interface ModalCloseProps extends PrimitivePropsWithRef<"button"> {}
const ModalClose = ({ className, onClick, ...props }: ModalCloseProps) => {
  const { setIsOpen } = useModalContext();
  return (
    <Primitive.button
      onClick={(e) => {
        onClick?.(e);
        setIsOpen(false);
      }}
      className={clsx(className)}
      {...props}
    />
  );
};
ModalClose.displayName = "ModalClose";

const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Close: ModalClose,
};
export { Modal };
