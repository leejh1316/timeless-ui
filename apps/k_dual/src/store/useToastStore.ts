import { create } from "zustand";

export type ToastStatus = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  status?: ToastStatus;
  duration?: number;
  open: boolean;
}

interface ToastStore {
  toasts: ToastMessage[];
  count: number;
  addToast: (toast: Omit<ToastMessage, "id" | "open">) => void;
  dismissToast: (id: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  count: 0,
  addToast: (toast) =>
    set((state) => {
      const newCount = state.count + 1;
      return {
        toasts: [...state.toasts, { ...toast, id: String(newCount), open: true }],
        count: newCount,
      };
    }),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, open: false } : t)),
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
