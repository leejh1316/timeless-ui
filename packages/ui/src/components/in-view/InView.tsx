import { forwardRef, useCallback, useEffect } from "react";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { useIntersection, UseIntersectionProps } from "../../hooks/useIntersection";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

type InViewChildren = (props: Pick<ReturnType<typeof useIntersection>, "isVisible" | "hasEntered" | "resetOnce">) => React.ReactNode;
interface InViewProps extends Omit<PrimitivePropsWithRef<"div">, "children" | "onChange">, UseIntersectionProps {
  children: InViewChildren;
  onResetOnce?: (resetFn: (hardReset: boolean) => void) => void;
}
export const InView = forwardRef<React.ComponentRef<typeof Primitive.div>, InViewProps>(({ children, onResetOnce, ...props }, ref) => {
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

  return <Primitive.div {...getInViewProps()}>{children({ hasEntered, isVisible, resetOnce })}</Primitive.div>;
});
