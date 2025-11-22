import { cloneElement, forwardRef, isValidElement } from "react";
import { Primitive } from "../primitive/Primitive";
import type { PrimitivePropsWithRef } from "../primitive/Primitive";

interface RatioProps {
  ratio?: number;
  children?: React.ReactNode;
}
const Ratio = ({ children, ratio = 1 / 1 }: RatioProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: `${100 / ratio}%`,
      }}
    >
      {children}
    </div>
  );
};

interface AspectRatioProps extends PrimitivePropsWithRef<"div"> {
  ratio?: number;
}

const AspectRatio = forwardRef<React.ElementRef<typeof Primitive.div>, AspectRatioProps>(
  ({ asChild, ratio = 1 / 1, style, children, ...props }, forwardedRef) => {
    return (
      <Ratio ratio={ratio}>
        <Primitive.div
          {...props}
          ref={forwardedRef}
          asChild={asChild}
          style={{
            ...style,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {children}
        </Primitive.div>
      </Ratio>
    );
  },
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
export type { AspectRatioProps };
