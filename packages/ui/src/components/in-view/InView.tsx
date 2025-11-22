import { forwardRef, useCallback, useEffect } from "react";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { useIntersection, UseIntersectionProps } from "../../hooks/useIntersection";

type InViewChildren = (
  props: Pick<ReturnType<typeof useIntersection>, "isVisible" | "hasEntered" | "resetOnce">,
) => React.ReactNode;
interface InViewProps extends UseIntersectionProps {
  children: InViewChildren;
  onResetOnce?: (resetFn: (hardReset: boolean) => void) => void;
}
export const InView = forwardRef<Element, InViewProps>(({ children, onResetOnce, ...props }, ref) => {
  const { setTarget, isVisible, hasEntered, resetOnce } = useIntersection(props);
  const composeRefs = useComposedRefs<Element | null>(setTarget, ref);

  const getInViewProps = useCallback(() => {
    return {
      ref: composeRefs,
      "data-visible": isVisible,
      "data-entered": hasEntered,
    };
  }, [composeRefs, isVisible, hasEntered]);

  useEffect(() => {
    onResetOnce?.(resetOnce);
  }, [resetOnce]);

  return <div {...getInViewProps()}>{children({ hasEntered, isVisible, resetOnce })}</div>;
});
