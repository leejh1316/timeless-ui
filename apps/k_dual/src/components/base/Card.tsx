import { Primitive, PrimitivePropsWithRef } from "@timeless-ui/ui";
import clsx from "clsx";
import { forwardRef } from "react";

interface CardProps extends PrimitivePropsWithRef<"div"> {
  pointed?: boolean;
}
const Card = forwardRef<React.ComponentRef<typeof Primitive.div>, CardProps>(
  (props, forwardedRef) => {
    const { className, pointed, ...otherProps } = props;
    return (
      <Primitive.div
        ref={forwardedRef}
        className={clsx(
          className,
          "relative inline-block rounded-xl bg-white shadow-sm transition-all",
          "hover:shadow-md",
          {
            "before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:bg-teal-600":
              pointed,
          },
        )}
        {...otherProps}
      />
    );
  },
);
Card.displayName = "Card";

export { Card };
