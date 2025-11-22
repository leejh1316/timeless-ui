import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from "@floating-ui/react";
import { useModal, UseModalProps } from "../../hooks/useModal";
import { createContext, forwardRef, useContext } from "react";
import { Primitive } from "../primitive/Primitive";
import type { PrimitivePropsWithRef } from "../primitive/Primitive";
import { useComposedRefs } from "../../hooks/useComposeRefs";

// --- Context 및 기본 Modal 컴포넌트 (변경 없음) ---
type ModalContextValue = ReturnType<typeof useModal> & { lockScroll?: boolean };
const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
};

export interface ModalProps extends UseModalProps {
  lockScroll?: boolean;
  children?: React.ReactNode;
}
export const Modal = ({ children, lockScroll = true, ...props }: ModalProps) => {
  const modalData = useModal(props);
  return <ModalContext.Provider value={{ ...modalData, lockScroll }}>{children}</ModalContext.Provider>;
};

interface ModalTriggerProps extends PrimitivePropsWithRef<"button"> {}

export const ModalTrigger = forwardRef<React.ElementRef<typeof Primitive.button>, ModalTriggerProps>(
  ({ asChild, children, ...props }, forwardedRef) => {
    const { refs, getReferenceProps } = useModalContext();
    const composedRef = useComposedRefs(refs.setReference, forwardedRef);

    return (
      <Primitive.button asChild={asChild} {...getReferenceProps(props)} ref={composedRef}>
        {children}
      </Primitive.button>
    );
  },
);
ModalTrigger.displayName = "ModalTrigger";

interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ModalOverlay = ({ children, className, ...props }: ModalOverlayProps) => {
  const { context, lockScroll, isMounted, transitionStatus } = useModalContext();
  return (
    isMounted && (
      <FloatingPortal>
        <FloatingOverlay data-status={transitionStatus} lockScroll={lockScroll} className={className} {...props} />
        <FloatingFocusManager context={context}>
          <>{children}</>
        </FloatingFocusManager>
      </FloatingPortal>
    )
  );
};

interface ModalContentProps extends PrimitivePropsWithRef<"div"> {}

export const ModalContent = forwardRef<React.ElementRef<typeof Primitive.div>, ModalContentProps>(
  ({ asChild, children, className = "_base-modal-content", ...props }, forwardedRef) => {
    const { refs, getFloatingProps, transitionStyle } = useModalContext();
    return (
      <Primitive.div asChild={asChild} ref={forwardedRef} className={className} {...props}>
        <div ref={refs.setFloating} style={transitionStyle} {...getFloatingProps()}>
          {children}
        </div>
      </Primitive.div>
    );
  },
);
ModalContent.displayName = "ModalContent";

// --- ModalClose (Primitive 적용) ---
interface ModalCloseProps extends PrimitivePropsWithRef<"button"> {}

export const ModalClose = forwardRef<React.ElementRef<typeof Primitive.button>, ModalCloseProps>(
  ({ asChild, children, className = "_base-modal-close", ...props }, forwardedRef) => {
    const { setIsOpen } = useModalContext();

    return (
      <Primitive.button
        asChild={asChild}
        ref={forwardedRef}
        className={className}
        // 사용자가 onClick을 전달해도 내부의 닫기 기능과 병합되어 실행됩니다.
        onClick={() => setIsOpen(false)}
        {...props}
      >
        {children}
      </Primitive.button>
    );
  },
);
ModalClose.displayName = "ModalClose";
