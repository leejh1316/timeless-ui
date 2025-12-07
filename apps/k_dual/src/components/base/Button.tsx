import { Button as BaseButton } from "@timeless-ui/ui";
import clsx from "clsx";
import { forwardRef } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  loading?: boolean;
  color?: "primary" | "secondary" | "danger" | "none";
  spinnerColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "default" | "none";
}
const Button = forwardRef<React.ComponentRef<typeof BaseButton>, ButtonProps>(
  (props, forwardedRef) => {
    const {
      loading,
      className,
      children,
      color = "none",
      spinnerColor = "primary",
      ...rest
    } = props;
    const colorClasses = {
      primary: "bg-primary-600 text-white hover:bg-primary-700",
      secondary: "bg-secondary-600 text-white hover:bg-secondary-700",
      danger: "bg-danger-600 text-white hover:bg-danger-700",
      none: "",
    };

    return (
      <BaseButton
        {...rest}
        ref={forwardedRef}
        loading={loading}
        className={clsx(
          className,
          colorClasses[color],
          "data-[pressed=true]:transform-[scale(0.97)] cursor-pointer transition-all duration-200",
          "data-[disabled=true]:cursor-auto",
        )}
      >
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="sm" color={spinnerColor} />
          </div>
        ) : (
          children
        )}
      </BaseButton>
    );
  },
);

export { Button };
