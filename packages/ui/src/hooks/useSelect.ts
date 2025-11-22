import { useCallback, useEffect, useRef, useState } from "react";
import { useControllableState } from "./useControllableState";
import { usePopover, UsePopoverProps } from "./usePopover";
import { merge, set } from "lodash-es";

export interface SelectItemType {
  key: string;
  label: string;
  disabled?: boolean;
}
export interface UseSelectProps<T extends SelectItemType>
  extends Pick<UsePopoverProps, "open" | "onOpenChange" | "placement" | "initialOpen"> {
  items?: T[];
  defaultValues?: T["key"][];
  values?: T["key"][];
  multiple?: boolean;
  required?: boolean;
  closeOnSelect?: boolean;
  onChangeValues?: (value: T["key"][]) => void;
  onSelectedItemChange?: (item: T[] | undefined) => void;
}

export const useSelect = <T extends SelectItemType>({
  items = [],
  defaultValues = [],
  values,
  multiple = false,
  required = false,
  closeOnSelect = true,
  onChangeValues,
  onSelectedItemChange,

  // Popover 관련 props
  placement,
  initialOpen = false,
  open,
  onOpenChange,
}: UseSelectProps<T>) => {
  const isCloseOnSelect = closeOnSelect && !multiple; // 단일 선택일 때만 closeOnSelect 적용
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    onChange: onOpenChange,
    defaultValue: initialOpen,
  });
  const [selectedValues, setSelectedValues] = useControllableState({
    defaultValue: defaultValues,
    value: values,
    onChange: onChangeValues,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isTypingRef = useRef(false);
  const elementListRef = useRef<HTMLElement[]>([]);
  const itemListRef = useRef<T["key"][]>(items?.map((item) => item.key));

  const { getItemProps, ...popover } = usePopover({
    placement,
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      if (!open) {
        setActiveIndex(null);
      }
    },
    interactionOptions: {
      role: {
        role: "select",
      },
      typeahead: {
        listRef: itemListRef,
        activeIndex,
        onMatch: setActiveIndex,
        onTypingChange: (isTyping) => {
          isTypingRef.current = isTyping;
        },
      },
      listNavigation: {
        loop: true,
        listRef: elementListRef,
        activeIndex,
        onNavigate: setActiveIndex,
      },
    },
  });

  const handleSelect = useCallback(
    (selectItem: T) => {
      if (!selectItem || selectItem.disabled) return;
      // 단일 선택 처리
      if (!multiple) {
        // 최소 1개 이상 선택이 필요한 경우, 이미 선택된 항목을 다시 선택하는 경우 무시
        if (required && selectedValues?.includes(selectItem.key)) {
        } else if (selectedValues?.includes(selectItem.key)) {
          setSelectedValues([]);
        } else {
          setSelectedValues([selectItem.key]);
        }

        if (isCloseOnSelect) {
          setIsOpen(false);
          setActiveIndex(null);
        }
        return;
      }
      // 다중 선택 처리
      setSelectedValues(
        (() => {
          const isSelected = selectedValues?.includes(selectItem.key);
          let newValues: T["key"][] = [];
          if (isSelected) {
            newValues = selectedValues?.filter((val) => val !== selectItem.key) || [];
          } else {
            newValues = [...(selectedValues || []), selectItem.key];
          }
          if (required && newValues.length === 0) {
            return selectedValues;
          }
          if (isCloseOnSelect) {
            setIsOpen(false);
            setActiveIndex(null);
          }
          return newValues;
        })(),
      );
    },
    [multiple, isCloseOnSelect, setIsOpen, setActiveIndex, setSelectedValues, selectedValues, required],
  );

  const getSelectItemProps = useCallback(
    (index: number, item: T, props = {}) => {
      return merge(
        {
          role: "option",
          ref: (node: any) => {
            elementListRef.current[index] = node;
          },
          "aria-label": item.label,
          "aria-selected": selectedValues?.includes(item.key) || false,
          "aria-disabled": item.disabled ? true : undefined,
          "data-selected": selectedValues?.includes(item.key) || false,
          "data-focus": activeIndex === index ? true : undefined,
          "data-disabled": item.disabled ? true : undefined,
          tabIndex: activeIndex === index ? 0 : -1,
        },
        getItemProps({
          ...props,
          onClick: (e) => {
            (props as any)?.onClick?.(e);
            handleSelect(item);
          },
          onKeyDown: (e) => {
            if (e.key === "Enter" || (e.key === " " && !isTypingRef.current)) {
              (props as any)?.onKeyDown?.(e);
              e.preventDefault();
              handleSelect(item);
            }
          },
        }),
      );
    },
    [getItemProps, handleSelect, selectedValues, activeIndex],
  );

  useEffect(() => {
    if (onSelectedItemChange) {
      const selectedItems = items.filter((item) => selectedValues?.includes(item.key));
      onSelectedItemChange(selectedItems.length > 0 ? selectedItems : undefined);
    }
  }, [selectedValues]);

  return {
    ...popover,
    getSelectItemProps,
    selectedValues,
    setSelectedValues,
    activeIndex,
    setActiveIndex,
    isTypingRef,
    elementListRef,
    itemListRef,
  };
};
