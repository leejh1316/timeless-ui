import { Primitive, PrimitivePropsWithRef } from "@timeless-ui/react";
import clsx from "clsx";
import { forwardRef } from "react";

interface CardProps extends PrimitivePropsWithRef<"div"> {
  pointed?: boolean;
}
const CardRoot = forwardRef<React.ComponentRef<typeof Primitive.div>, CardProps>(
  (props, forwardedRef) => {
    const { className, pointed, ...otherProps } = props;
    return (
      <Primitive.div
        ref={forwardedRef}
        className={clsx(
          className,
          "relative inline-block rounded-3xl bg-white shadow-sm transition-all",
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
CardRoot.displayName = "Card.Root";

const CardHeader = forwardRef<
  React.ComponentRef<typeof Primitive.div>,
  PrimitivePropsWithRef<"div">
>((props, forwardedRef) => {
  const { className, ...otherProps } = props;
  return <Primitive.div ref={forwardedRef} className={clsx(className, "mb-4")} {...otherProps} />;
});
CardHeader.displayName = "Card.Header";

const CardTitle = forwardRef<React.ComponentRef<typeof Primitive.h2>, PrimitivePropsWithRef<"h2">>(
  (props, forwardedRef) => {
    const { className, ...otherProps } = props;
    return (
      <Primitive.h2
        ref={forwardedRef}
        className={clsx(className, "text-lg font-bold text-gray-900")}
        {...otherProps}
      />
    );
  },
);
CardTitle.displayName = "Card.Title";

const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
};

export { Card };
export type { CardProps };
