import { Button as ButtonPrimitive } from "@timeless-ui/ui";
import type { ButtonProps as ButtonPrimitiveProps } from "@timeless-ui/ui";
import { forwardRef } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

// TODO: lucide-react 아이콘의 DynamicIcon 적용 필요
export type IconButtonSize = "xl" | "lg" | "md" | "sm" | "xs" | "tiny";
interface IconButtonProps extends ButtonPrimitiveProps {
  size?: IconButtonSize;
}
const IconButton = forwardRef<React.ComponentRef<typeof ButtonPrimitive>, IconButtonProps>((props, forwardedRef) => {
  // return <ButtonPrimitive ref={forwardedRef} variant="ghost" {...props} />;
  return <DynamicIcon name="" />;
});
