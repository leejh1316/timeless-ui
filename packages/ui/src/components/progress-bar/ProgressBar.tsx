import { createContextScope, Scope } from "@src/hooks/useCreateContext";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

const getPercent = (value: number, options: { min?: number; max?: number } = {}) => {
  const { min = 0, max = 100 } = options;
  if (min === max) return 0;
  const clampedVal = Math.max(min, Math.min(value, max));
  return ((clampedVal - min) / (max - min)) * 100;
};

type ScopedProps<P> = P & { __scopeProgressBar?: Scope };
const [createProgressBarContext, createProgressBarScope] = createContextScope("ProgressBar");
type ProgressBarContextValue = {
  min?: number;
  max?: number;
};
const [ProgressBarProvider, useProgressBarContext] = createProgressBarContext<ProgressBarContextValue>("ProgressBar");

interface ProgressBarRootProps extends PrimitivePropsWithRef<"div">, Partial<ProgressBarContextValue> {}
const ProgressBarRoot = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<ProgressBarRootProps>>((props, forwardedRef) => {
  const { __scopeProgressBar, min, max, ...rootProps } = props;
  return (
    <ProgressBarProvider scope={__scopeProgressBar} min={min} max={max}>
      <Primitive.div ref={forwardedRef} {...rootProps} />
    </ProgressBarProvider>
  );
});
ProgressBarRoot.displayName = "ProgressBar.Root";

interface ProgressBarTrackProps extends PrimitivePropsWithRef<"div"> {}
const ProgressBarTrack = forwardRef<React.ComponentRef<"div">, ScopedProps<ProgressBarTrackProps>>((props, forwardedRef) => {
  const { className, ...otherProps } = props;
  return <Primitive.div className={clsx(className, "relative")} ref={forwardedRef} {...otherProps} />;
});
ProgressBarTrack.displayName = "ProgressBar.Track";

interface ProgressBarValueProps extends PrimitivePropsWithRef<"div"> {
  value: number;
  getPercentValue?: (percentValue: number) => void;
}
const ProgressBarValue = forwardRef<React.ComponentRef<"div">, ScopedProps<ProgressBarValueProps>>((props, forwardedRef) => {
  const { className, style, value, __scopeProgressBar, getPercentValue, ...otherProps } = props;
  const context = useProgressBarContext("ProgressBar.Value", __scopeProgressBar);
  const percent = getPercent(value, { min: context.min, max: context.max });

  const getPercentValueRef = useRef(getPercentValue);

  useEffect(() => {
    getPercentValueRef.current = getPercentValue;
  });

  useEffect(() => {
    getPercentValueRef.current?.(percent);
  }, [percent]);

  return (
    <Primitive.div
      ref={forwardedRef}
      className={clsx(className, "absolute inset-y-0 left-0 h-full")}
      style={{ width: `${percent}%`, ...style }}
      {...otherProps}
    />
  );
});
ProgressBarValue.displayName = "ProgressBar.Value";

export const ProgressBar = {
  Root: ProgressBarRoot,
  Track: ProgressBarTrack,
  Value: ProgressBarValue,
};
export type { ProgressBarRootProps, ProgressBarTrackProps, ProgressBarValueProps };
export { createProgressBarScope };
