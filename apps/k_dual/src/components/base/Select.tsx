import type {
  SelectContentProps,
  SelectIconProps,
  SelectItemProps,
  SelectTriggerProps,
} from "@timeless-ui/ui";
import { Select as BaseSelect } from "@timeless-ui/ui";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

const SelectTrigger = forwardRef<React.ComponentRef<typeof BaseSelect.Trigger>, SelectTriggerProps>(
  (props, forwardRef) => {
    const { className, ...rest } = props;
    return (
      <BaseSelect.Trigger
        ref={forwardRef}
        {...rest}
        className={clsx(
          className,
          "flex items-center justify-between gap-x-2 rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100",
        )}
      />
    );
  },
);

const SelectIcon = forwardRef<React.ComponentRef<typeof BaseSelect.Icon>, SelectIconProps>(
  (props, forwardRef) => {
    const { className, ...rest } = props;
    return (
      <BaseSelect.Icon ref={forwardRef} {...rest} className={clsx(className, "group")}>
        <ChevronDown className="text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
      </BaseSelect.Icon>
    );
  },
);

const SelectContent = forwardRef<React.ComponentRef<typeof BaseSelect.Content>, SelectContentProps>(
  (props, forwardRef) => {
    const { className, ...rest } = props;
    return (
      <BaseSelect.Content
        ref={forwardRef}
        {...rest}
        className={clsx(
          className,
          "max-h-[280px] overflow-auto rounded-xl border border-gray-200 bg-white p-2 shadow-sm",
        )}
      />
    );
  },
);

const SelectItem = forwardRef<React.ComponentRef<typeof BaseSelect.Item>, SelectItemProps>(
  (props, forwardRef) => {
    const { className, ...rest } = props;
    return (
      <BaseSelect.Item
        ref={forwardRef}
        {...rest}
        className={clsx(
          className,
          "select-none rounded-xl px-3 py-2 text-[15px] text-gray-600",
          "hover:bg-gray-50 focus-visible:bg-gray-50",
          "data-[state=checked]:bg-primary-50 data-[state=checked]:text-primary-600 data-[state=checked]:font-medium",
        )}
      />
    );
  },
);

const Select = {
  ...BaseSelect,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Icon: SelectIcon,
};

export { Select };
