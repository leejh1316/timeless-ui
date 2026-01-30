import { Primitive, PrimitivePropsWithRef } from "@timeless-ui/ui";
import clsx from "clsx";

export type LabelColor = "primary" | "secondary" | "danger" | "warning" | "info" | "default" | "none";
interface LabelProps extends PrimitivePropsWithRef<"span"> {
  color: LabelColor;
}
const Label = ({ color = "primary", className, ...props }: LabelProps) => {
  return (
    <Primitive.span
      {...props}
      className={clsx(className, "rounded-md px-2 py-[3px] text-[11px] font-medium whitespace-nowrap md:text-xs", {
        "bg-primary-50 text-primary-600": color === "primary",
        "bg-secondary-50 text-secondary-700": color === "secondary",
        "bg-gray-100 text-gray-600": color === "default",
        "bg-danger-50 text-danger-600": color === "danger",
        "bg-warning-50 text-warning-600": color === "warning",
        "bg-info-50 text-info-600": color === "info",
        "": color === "none",
      })}
    />
  );
};

export { Label };
