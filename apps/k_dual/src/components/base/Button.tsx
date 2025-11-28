import { Button as BaseButton } from "@timeless-ui/ui";
import clsx from "clsx";
import { forwardRef } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  loading?: boolean;
}
const Button = forwardRef<React.ComponentRef<typeof BaseButton>, ButtonProps>(
  (props, forwardedRef) => {
    const { loading, className, children, ...rest } = props;
    return (
      <BaseButton
        {...rest}
        ref={forwardedRef}
        loading={loading}
        className={clsx(
          className,
          "data-[pressed=true]:transform-[scale(0.98)] cursor-pointer transition-all",
          "data-[disabled=true]:cursor-auto",
        )}
      >
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="sm" color="primary" />
          </div>
        ) : (
          children
        )}
      </BaseButton>
    );
  },
);

export { Button };
