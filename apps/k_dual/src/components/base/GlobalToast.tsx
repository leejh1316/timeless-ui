import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToastStore, ToastStatus } from "../../store/useToastStore";
import { Toast } from "./Toast";
import { Button } from "@timeless-ui/ui"; // Assuming Button is available or use HTML button

const StatusIcon = ({ status }: { status?: ToastStatus }) => {
  switch (status) {
    case "success":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <CheckCircle2 size={18} />
        </div>
      );
    case "error":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle size={18} />
        </div>
      );
    case "warning":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <AlertTriangle size={18} />
        </div>
      );
    case "info":
    default:
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <Info size={18} />
        </div>
      );
  }
};

import { useEffect } from "react";
import { ToastMessage } from "../../store/useToastStore";

const ToastItem = ({ toast }: { toast: ToastMessage }) => {
  const { dismissToast, removeToast } = useToastStore();

  useEffect(() => {
    if (!toast.open) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, 5000); // Wait for animation to finish
      return () => clearTimeout(timer);
    }
  }, [toast.open, toast.id, removeToast]);

  return (
    <Toast.Root
      open={toast.open}
      onOpenChange={(open) => {
        if (!open) {
          dismissToast(toast.id);
          if (toast.onClose) toast.onClose();
        }
      }}
      duration={toast.duration}
    >
      <StatusIcon status={toast.status} />
      <div className="flex-1">
        {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
        {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
        {toast.action && (
          <Toast.Action onClick={toast.action.onClick} asChild>
            <button className="mt-2 inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-3 text-xs font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
              {toast.action.label}
            </button>
          </Toast.Action>
        )}
      </div>
      <Toast.Close />
    </Toast.Root>
  );
};

export const GlobalToast = () => {
  const { toasts } = useToastStore();

  return (
    <>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
      <Toast.Viewport />
    </>
  );
};
