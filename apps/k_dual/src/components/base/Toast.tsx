import { Toast as BaseToast, ToastRootProps } from "@timeless-ui/react";
import clsx from "clsx";
import { CheckCircle2, X } from "lucide-react";
import React, { forwardRef } from "react";

const ToastRoot = forwardRef<React.ComponentRef<typeof BaseToast.Root>, ToastRootProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <BaseToast.Root
        ref={forwardedRef}
        className={clsx(
          "flex w-full items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-lg transition-transform md:w-[350px]",
          "data-[state=closed]:animate-toast-out data-[state=open]:animate-toast-in data-[swipe=end]:animate-swipe-out",
          className,
        )}
        {...props}
      >
        {children}
      </BaseToast.Root>
    );
  },
);
ToastRoot.displayName = "Toast.Root";

const ToastTitle = forwardRef<
  React.ComponentRef<typeof BaseToast.Title>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Title>
>(({ className, ...props }, ref) => (
  <BaseToast.Title
    ref={ref}
    className={clsx("mb-1 text-sm font-bold text-gray-900", className)}
    {...props}
  />
));
ToastTitle.displayName = "Toast.Title";

const ToastDescription = forwardRef<
  React.ComponentRef<typeof BaseToast.Description>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Description>
>(({ className, ...props }, ref) => (
  <BaseToast.Description
    ref={ref}
    className={clsx("text-xs text-gray-600", className)}
    {...props}
  />
));
ToastDescription.displayName = "Toast.Description";

const ToastClose = forwardRef<
  React.ComponentRef<typeof BaseToast.Close>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Close>
>(({ className, children, ...props }, ref) => (
  <BaseToast.Close
    ref={ref}
    className={clsx("text-gray-500 hover:text-gray-600", className)}
    {...props}
  >
    {children || <X size={16} />}
  </BaseToast.Close>
));
ToastClose.displayName = "Toast.Close";

const ToastAction = forwardRef<
  React.ComponentRef<typeof BaseToast.Action>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Action>
>(({ className, ...props }, ref) => (
  <BaseToast.Action
    ref={ref}
    className={clsx(
      "group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-transparent bg-transparent px-3 text-xs font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = "Toast.Action";

const ToastViewport = forwardRef<
  React.ComponentRef<typeof BaseToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof BaseToast.Viewport>
>(({ className, ...props }, ref) => (
  <BaseToast.Viewport
    ref={ref}
    className={clsx(
      "fixed bottom-24 left-5 right-5 z-[9999] flex flex-col gap-2 outline-none md:bottom-5 md:left-auto md:right-5 md:w-auto",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = "Toast.Viewport";

export const Toast = {
  Provider: BaseToast.Provider,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
  Viewport: ToastViewport,
};
