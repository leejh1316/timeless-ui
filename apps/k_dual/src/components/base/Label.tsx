import { Primitive, PrimitivePropsWithRef } from "@timeless-ui/ui";
import clsx from "clsx";

interface LabelProps extends PrimitivePropsWithRef<"span"> {
  color: "primary" | "secondary" | "default";
}
const Label = ({ color = "primary", className, ...props }: LabelProps) => {
  return (
    <Primitive.span
      {...props}
      className={clsx(className, "whitespace-nowrap rounded-md px-2 py-[3px] text-xs font-medium", {
        "bg-primary-50 text-primary-600": color === "primary",
        "bg-secondary-50 text-secondary-700": color === "secondary",
        "bg-gray-50 text-gray-600": color === "default",
      })}
    />
  );
};

export { Label };
