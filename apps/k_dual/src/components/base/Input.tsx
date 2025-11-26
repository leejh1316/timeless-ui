import { Primitive, PrimitivePropsWithRef } from "@timeless-ui/ui";
import clsx from "clsx";
import { ComponentRef, forwardRef } from "react";

const InputRoot = (props: PrimitivePropsWithRef<"div">) => {
  const { className, ...otherProps } = props;
  return <Primitive.div className={clsx("relative", className)} {...otherProps} />;
};

const InputArea = forwardRef<ComponentRef<typeof Primitive.input>, PrimitivePropsWithRef<"input">>(
  (props, forwardedRef) => {
    const { className, ...otherProps } = props;
    return (
      <Primitive.input
        ref={forwardedRef}
        className={clsx(
          "peer w-full px-3 py-3.5",
          "rounded-xl border border-gray-200",
          "text-sm text-gray-900",
          "bg-gray-50 transition-colors duration-200",
          "focus:border-teal-600 focus:bg-white focus:outline-none",
          "placeholder:text-gray-600",
          className,
        )}
        {...otherProps}
      />
    );
  },
);

export const Input = {
  Root: InputRoot,
  Area: InputArea,
};
