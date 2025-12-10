import { useControllableState } from "@src/hooks/useControllableState";
import { createContextScope, Scope } from "@src/hooks/useCreateContext";
import { forwardRef, useCallback } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { Button } from "../button/Button";
import { VisuallyHidden } from "../visually-hidden/VisuallyHidden";

type ScopedProps<P> = P & { __scopeCounter?: Scope };
type CounterContextValueType = {
  value: number;
  minValue?: number;
  maxValue?: number;
  step: number;
  disabled: boolean;
};
type CounterContextActionType = {
  onValueChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
};
const COUNTER_NAME = "Counter";
const [createCounterValueContext, createCounterValueScope] = createContextScope(COUNTER_NAME);
const [createCounterActionContext, createCounterActionScope] = createContextScope(COUNTER_NAME);

const [CounterValueProvider, useCounterValueContext] = createCounterValueContext<CounterContextValueType>(COUNTER_NAME);
const [CounterActionProvider, useCounterActionContext] = createCounterActionContext<CounterContextActionType>(COUNTER_NAME);

interface CounterRootProps extends Partial<CounterContextValueType>, Partial<CounterContextActionType> {
  defaultValue?: number;
  children?: React.ReactNode;
  name?: string;
}
const CounterRoot = (props: ScopedProps<CounterRootProps>) => {
  const {
    value,
    minValue,
    defaultValue,
    maxValue,
    step = 1,
    disabled = false,
    onValueChange,
    __scopeCounter,
    onDecrement,
    onIncrement,
    children,
    name,
  } = props;
  const [controlledValue, setControlledValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? 0,
    onChange: onValueChange,
  });

  return (
    <CounterValueProvider
      value={controlledValue}
      minValue={minValue}
      maxValue={maxValue}
      disabled={disabled}
      step={step}
      scope={__scopeCounter}
    >
      <CounterActionProvider onValueChange={setControlledValue} onIncrement={onIncrement} onDecrement={onDecrement} scope={__scopeCounter}>
        {children}
        <VisuallyHidden>
          <input type="number" name={name} readOnly value={controlledValue} disabled={disabled} step={step} min={minValue} max={maxValue} />
        </VisuallyHidden>
      </CounterActionProvider>
    </CounterValueProvider>
  );
};
CounterRoot.displayName = "Counter.Root";

const COUNTER_VALUE_NAME = "CounterValue";
interface CounterValueProps extends PrimitivePropsWithRef<"span"> {}
const CounterValue = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<CounterValueProps>>((props, forwardedRef) => {
  const { __scopeCounter, ...otherProps } = props;
  const { value } = useCounterValueContext(COUNTER_VALUE_NAME, __scopeCounter);
  return (
    <Primitive.span ref={forwardedRef} {...otherProps}>
      {value}
    </Primitive.span>
  );
});
CounterValue.displayName = "Counter.Value";

const COUNTER_INCREMENT_NAME = "CounterIncrement";
interface CounterIncrementProps extends PrimitivePropsWithRef<typeof Button> {}
const CounterIncrement = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<CounterIncrementProps>>((props, forwardedRef) => {
  const { __scopeCounter, disabled: propsDisabled, onClick, ...otherProps } = props;
  const { disabled, value, maxValue, step } = useCounterValueContext(COUNTER_INCREMENT_NAME, __scopeCounter);
  const { onIncrement, onValueChange } = useCounterActionContext(COUNTER_INCREMENT_NAME, __scopeCounter);

  const handleIncrement = useCallback(() => {
    const nextValue = isNaN(Number(maxValue)) ? value + step : Math.min(value + step, maxValue!);
    onIncrement?.(nextValue);
    onValueChange?.(nextValue);
  }, [value, step, maxValue, onIncrement, onValueChange]);

  const isDisabled = propsDisabled || disabled || (!isNaN(Number(maxValue)) && value >= maxValue!);

  return <Button ref={forwardedRef} onClick={handleIncrement} disabled={isDisabled} {...otherProps} />;
});
CounterIncrement.displayName = "Counter.Increment";

const COUNTER_DECREMENT_NAME = "CounterDecrement";
interface CounterDecrementProps extends PrimitivePropsWithRef<typeof Button> {}
const CounterDecrement = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<CounterDecrementProps>>((props, forwardedRef) => {
  const { __scopeCounter, disabled: propsDisabled, onClick, ...otherProps } = props;
  const { disabled, value, minValue, step } = useCounterValueContext(COUNTER_DECREMENT_NAME, __scopeCounter);
  const { onDecrement, onValueChange } = useCounterActionContext(COUNTER_DECREMENT_NAME, __scopeCounter);
  const handleDecrement = useCallback(() => {
    const nextValue = isNaN(Number(minValue)) ? value - step : Math.max(value - step, minValue!);
    onDecrement?.(nextValue);
    onValueChange?.(nextValue);
  }, [value, step, minValue, onDecrement, onValueChange]);
  const isDisabled = propsDisabled || disabled || (!isNaN(Number(minValue)) && value <= minValue!);
  return <Button ref={forwardedRef} onClick={handleDecrement} disabled={isDisabled} {...otherProps} />;
});
CounterDecrement.displayName = "Counter.Decrement";

export const Counter = {
  Root: CounterRoot,
  Value: CounterValue,
  Increment: CounterIncrement,
  Decrement: CounterDecrement,
};
export type { CounterDecrementProps, CounterIncrementProps, CounterRootProps, CounterValueProps };


