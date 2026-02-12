import clsx from "clsx";
import { ComponentProps } from "react";
const InlineCode = ({ className, ...props }: ComponentProps<"code">) => {
  return <code className={clsx(className, "font-code rounded-md bg-neutral-100 px-1.5 py-0.5 text-rose-600")} {...props} />;
};
InlineCode.displayName = "Code";

export { InlineCode };
