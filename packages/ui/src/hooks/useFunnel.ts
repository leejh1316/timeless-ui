import { useState, useMemo } from "react";
import { useControllableState } from "./useControllableState";

interface UseFunnelParams<TStep extends string, TData extends object> {
  steps: readonly TStep[];
  step?: TStep;
  defaultStep?: TStep;
  defaultData?: TData;
  onStepChange?: (step: TStep) => void;
  onComplete?: (finalData: TData) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onCancel?: () => void;
}

const useFunnel = <TStep extends string, TData extends object>({
  steps,
  step,
  defaultStep,
  defaultData = {} as TData,
  onStepChange,
  onComplete,
  onNext,
  onPrev,
  onCancel,
}: UseFunnelParams<TStep, TData>) => {
  const [currentStep, setCurrentStep] = useControllableState({
    value: step,
    defaultValue: defaultStep ?? steps[0],
    onChange: onStepChange,
  });
  const [data, setData] = useState<TData>(defaultData);

  const currentStepIndex = useMemo(() => steps.indexOf(currentStep), [steps, currentStep]);

  const hasPrev = currentStepIndex > 0;
  const hasNext = currentStepIndex < steps.length - 1;
  const isLastStep = !hasNext;

  const updateData = (newData: Partial<TData>) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    return updatedData;
  };

  const goTo = (step: TStep) => {
    if (steps.includes(step)) {
      setCurrentStep(step);
    } else {
      console.warn(`[useFunnel] 존재하지 않는 스텝입니다: ${step}`);
    }
  };

  const goNext = (stepData?: Partial<TData>) => {
    let nextData = data;
    if (stepData) {
      nextData = updateData(stepData);
    }

    if (hasNext) {
      setCurrentStep(steps[currentStepIndex + 1]);
      onNext?.();
    } else {
      onComplete?.(nextData);
    }
  };

  const goPrev = (stepData?: Partial<TData>) => {
    if (stepData) {
      updateData(stepData);
    }
    if (hasPrev) {
      setCurrentStep(steps[currentStepIndex - 1]);
      onPrev?.();
    }
  };

  const cancel = () => {
    onCancel?.();
  };
  const complete = () => {
    onComplete?.(data);
  };

  const reset = () => {
    setCurrentStep(defaultStep ?? steps[0]);
    setData(defaultData);
  };

  return {
    currentStep,
    data,
    steps,

    goNext,
    goPrev,
    goTo,
    cancel,
    reset,
    complete,
    updateData,

    hasPrev,
    hasNext,
    isLastStep,
    currentStepIndex,
  };
};

export { useFunnel };
export type { UseFunnelParams };
