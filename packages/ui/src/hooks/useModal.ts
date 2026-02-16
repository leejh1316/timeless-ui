import { useControllableState } from "./useControllableState";
import { usePopover, UsePopoverProps } from "./usePopover";

export interface UseModalProps extends Pick<UsePopoverProps, "open" | "onOpenChange" | "initialOpen"> {
  isDismissable?: boolean;
}

export interface UseModalReturn extends ReturnType<typeof usePopover> {}
export const useModal = ({ open, initialOpen = false, isDismissable = true, onOpenChange }: UseModalProps): UseModalReturn => {
  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: initialOpen,
    value: open,
    onChange: onOpenChange,
  });

  const { ...popover } = usePopover({
    open: isOpen,
    onOpenChange: setIsOpen,
    middlewareOptions: {
      offset: { mainAxis: 0 },
      shift: { padding: 0 },
      flip: { crossAxis: false },
    },
    interactionOptions: {
      role: { role: "dialog" },
      dismiss: { enabled: isDismissable },
    },
    whileElementsMounted: undefined,
  });
  return { ...popover };
};
