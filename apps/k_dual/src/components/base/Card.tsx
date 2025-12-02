import { Primitive, PrimitivePropsWithRef } from "@timeless-ui/ui";
import clsx from "clsx";
import { forwardRef } from "react";

interface CardProps extends PrimitivePropsWithRef<"div"> {}
const Card = forwardRef<React.ComponentRef<typeof Primitive.div>, CardProps>(
  (props, forwardedRef) => {
    const { className } = props;
    return (
      <Primitive.div
        ref={forwardedRef}
        className={clsx(className, "rounded-xl bg-white shadow-md")}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export { Card };
