import { Image as BaseImage, ImageRootProps, ImageViewProps } from "@timeless-ui/ui";
import clsx from "clsx";
import { forwardRef } from "react";

const ImageRoot = forwardRef<React.ComponentRef<"div">, ImageRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseImage.Root
        ref={ref}
        {...props}
        className={clsx(
          className,
          "relative block h-full w-full overflow-hidden",
          "before:absolute before:inset-0 before:z-10 before:h-full before:w-full",
          "before:bg-black/10 before:backdrop-blur-lg before:content-['']",
          "before:duration-400 before:pointer-events-none before:opacity-0 before:transition-all before:ease-in-out",
          "data-[status=fallback-loading]:before:opacity-80 data-[status=loading]:before:opacity-80",
          "data-[status=fallback-loaded]:before:opacity-0 data-[status=loaded]:before:opacity-0 data-[status=fallback-loaded]:before:delay-100 data-[status=loaded]:before:delay-100",
          "data-[status=error]:before:opacity-0 data-[status=idle]:before:opacity-0 data-[status=error]:before:transition-none data-[status=idle]:before:transition-none",
        )}
      />
    );
  },
);

const ImageView = forwardRef<React.ComponentRef<typeof BaseImage.View>, ImageViewProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseImage.View
        ref={ref}
        {...props}
        className={clsx(
          className,
          "block h-full w-full",
          "transition-filter duration-400 delay-0 ease-in-out",
          "data-[status=fallback-loading]:blur data-[status=loading]:blur",
          "data-[status=fallback-loaded]:blur-0 data-[status=loaded]:blur-0 data-[status=fallback-loaded]:delay-100 data-[status=loaded]:delay-100",
          "data-[status=error]:blur-none",
        )}
      />
    );
  },
);

export const Image = {
  Root: ImageRoot,
  View: ImageView,
};
