import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { forwardRef } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { useFunnel } from "./useFunnel";

type ScopedProps<P> = P & { __scopeFunnel?: Scope };
const FUNNEL_NAME = "Funnel";
const [createFunnelContext, createFunnelScope] = createContextScope(FUNNEL_NAME);

type FunnelContextType = ReturnType<typeof useFunnel> | null;
const [FunnelProvider, useFunnelContext] = createFunnelContext<FunnelContextType>(FUNNEL_NAME);

// =============== Funnel.Root ================
interface FunnelRootProps<UseFunnel extends ReturnType<typeof useFunnel<any, any>>> {
  children: React.ReactNode;
  funnel: UseFunnel;
}
const FunnelRoot = <UseFunnel extends ReturnType<typeof useFunnel<any, any>>>(props: ScopedProps<FunnelRootProps<UseFunnel>>) => {
  const { __scopeFunnel, children, funnel } = props;
  return (
    <FunnelProvider scope={__scopeFunnel} {...funnel}>
      {children}
    </FunnelProvider>
  );
};
FunnelRoot.displayName = "Funnel.Root";

// =============== Funnel.Step ===============
interface FunnelStepProps extends PrimitivePropsWithRef<"div"> {
  step: string;
}
const FunnelStep = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<FunnelStepProps>>((props, forwardedRef) => {
  const { __scopeFunnel, step, style, ...otherProps } = props;
  const context = useFunnelContext("FunnelStep", __scopeFunnel);
  const isActive = context?.currentStep === step;
  return isActive && <Primitive.div data-active={isActive} ref={forwardedRef} {...otherProps} />;
});
FunnelStep.displayName = "Funnel.Step";

// =============== Funnel.Next ================
interface FunnelNextProps extends PrimitivePropsWithRef<"button"> {
  stepData?: object | undefined;
}
const FunnelNext = forwardRef<React.ComponentRef<"button">, ScopedProps<FunnelNextProps>>((props, forwardedRef) => {
  const { __scopeFunnel, stepData, onClick, disabled, ...otherProps } = props;
  const context = useFunnelContext("FunnelNext", __scopeFunnel);
  return (
    <Primitive.button
      ref={forwardedRef}
      disabled={disabled}
      onClick={(e) => {
        context?.goNext(stepData);
        onClick?.(e);
      }}
      {...otherProps}
    />
  );
});
FunnelNext.displayName = "Funnel.Next";

// =============== Funnel.Prev ================
interface FunnelPrevProps extends PrimitivePropsWithRef<"button"> {
  stepData?: object | undefined;
}
const FunnelPrev = forwardRef<React.ComponentRef<"button">, ScopedProps<FunnelPrevProps>>((props, forwardedRef) => {
  const { __scopeFunnel, stepData, onClick, disabled, ...otherProps } = props;
  const context = useFunnelContext("FunnelPrev", __scopeFunnel);
  const isDisabled = disabled || !context?.hasPrev;
  return (
    <Primitive.button
      ref={forwardedRef}
      disabled={isDisabled}
      onClick={(e) => {
        context?.goPrev(stepData);
        onClick?.(e);
      }}
      {...otherProps}
    />
  );
});
FunnelPrev.displayName = "Funnel.Prev";

// =============== Funnel.Cancel ================
interface FunnelCancelProps extends PrimitivePropsWithRef<"button"> {
  isResettable?: boolean;
}
const FunnelCancel = forwardRef<React.ComponentRef<"button">, ScopedProps<FunnelCancelProps>>((props, forwardedRef) => {
  const { __scopeFunnel, isResettable = true, onClick, ...otherProps } = props;
  const context = useFunnelContext("FunnelPrev", __scopeFunnel);
  return (
    <Primitive.button
      ref={forwardedRef}
      onClick={(e) => {
        context?.cancel();
        if (isResettable) {
          context?.reset();
        }
        onClick?.(e);
      }}
      {...otherProps}
    />
  );
});
FunnelCancel.displayName = "Funnel.Cancel";

// =============== Funnel. ================
interface FunnelCompleteProps extends PrimitivePropsWithRef<"button"> {}
const FunnelComplete = forwardRef<React.ComponentRef<"button">, ScopedProps<FunnelCompleteProps>>((props, forwardedRef) => {
  const { __scopeFunnel, onClick, ...otherProps } = props;
  const context = useFunnelContext("FunnelConfirm", __scopeFunnel);
  return (
    <Primitive.button
      ref={forwardedRef}
      onClick={(e) => {
        context?.complete();
        onClick?.(e);
      }}
      {...otherProps}
    />
  );
});
FunnelComplete.displayName = "Funnel.Complete";

const Funnel = {
  Root: FunnelRoot,
  Step: FunnelStep,
  Next: FunnelNext,
  Prev: FunnelPrev,
  Cancel: FunnelCancel,
  Complete: FunnelComplete,
};
export { Funnel };
export type { FunnelRootProps, FunnelStepProps };
