import { Button as ButtonPrimitive } from "@timeless-ui/ui";
import type { ButtonProps as ButtonPrimitiveProps } from "@timeless-ui/ui";
import { forwardRef } from "react";

export type IconButtonSize = "xl" | "lg" | "md" | "sm" | "xs" | "tiny";
interface IconButtonProps extends ButtonPrimitiveProps {
  size?: IconButtonSize;
}
const IconButton = forwardRef<React.ComponentRef<typeof ButtonPrimitive>, IconButtonProps>((props, forwardedRef) => {
  // return <ButtonPrimitive ref={forwardedRef} variant="ghost" {...props} />;
});
