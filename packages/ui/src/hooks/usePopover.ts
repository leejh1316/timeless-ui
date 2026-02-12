import { merge } from "lodash-es";
import {
  arrow,
  ArrowOptions,
  autoUpdate,
  flip,
  FlipOptions,
  FloatingContext,
  Middleware,
  offset,
  OffsetOptions,
  shift,
  ShiftOptions,
  useClick,
  UseClickProps,
  useDismiss,
  UseDismissProps,
  useFloating,
  UseFloatingOptions,
  useFocus,
  UseFocusProps,
  useHover,
  UseHoverProps,
  useInteractions,
  useListNavigation,
  UseListNavigationProps,
  useRole,
  UseRoleProps,
  useTransitionStatus,
  useTransitionStyles,
  UseTransitionStylesProps,
  useTypeahead,
  UseTypeaheadProps,
} from "@floating-ui/react";
import { useState } from "react";
import { useControllableState } from "./useControllableState";

type MiddlewareOptions = {
  offset?: OffsetOptions;
  shift?: ShiftOptions;
  flip?: FlipOptions;
  arrow?: ArrowOptions;
};

type Trigger = "click" | "hover" | "focus";

type InteractionOptions = {
  click?: UseClickProps;
  hover?: UseHoverProps;
  focus?: UseFocusProps;
  role?: UseRoleProps;
  dismiss?: UseDismissProps;
  listNavigation?: UseListNavigationProps;
  typeahead?: UseTypeaheadProps;
};

const defaultMiddlewareOptions: MiddlewareOptions = {
  offset: { mainAxis: 8 },
  shift: { padding: 8 },
  flip: {
    crossAxis: true,
  },
};
const defaultInteractionOptions: InteractionOptions = {
  click: {
    keyboardHandlers: true,
  },
  dismiss: {
    outsidePress: true,
    escapeKey: true,
  },
};
const defaultTransitionStyle: UseTransitionStylesProps = {
  duration: 200,
  initial: {
    opacity: 0,
    transform: "scale(0.95)",
  },
  open: {
    opacity: 1,
    transform: "scale(1)",
  },
  close: {
    opacity: 0,
    transform: "scale(0.95)",
  },
};

export interface UsePopoverProps extends Omit<UseFloatingOptions, "middleware" | "open" | "onOpenChange"> {
  interactionOptions?: InteractionOptions;
  middlewareOptions?: MiddlewareOptions;
  triggerMode?: Trigger | Trigger[];
  transition?: UseTransitionStylesProps;
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export const usePopover = ({
  initialOpen = false,
  triggerMode = "click",
  interactionOptions,
  middlewareOptions,
  transition,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  whileElementsMounted = autoUpdate,
  ...props
}: UsePopoverProps) => {
  const [isOpen, setIsOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: initialOpen,
    onChange: setControlledOpen,
  });

  const trigger = Array.isArray(triggerMode) ? triggerMode : [triggerMode || "click"];
  const middlewares = getMiddleware(merge({}, defaultMiddlewareOptions, middlewareOptions));
  const { context, ...floating } = useFloating({
    ...props,
    middleware: middlewares,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted,
  });

  const { isMounted, status: transitionStatus } = useTransitionStatus(context, {
    duration: transition?.duration || defaultTransitionStyle.duration,
  });
  const { styles: transitionStyle } = useTransitionStyles(context, transition || defaultTransitionStyle);
  const interactions = useCreateInteractions(context, trigger, merge({}, defaultInteractionOptions, interactionOptions));

  return {
    ...floating,
    ...interactions,
    transitionStatus,
    transitionStyle,
    isMounted,
    setIsOpen,
    isOpen,
    context,
  };
};

function getMiddleware(options: MiddlewareOptions = {}): Middleware[] {
  const middlewareArray: Middleware[] = [];
  const { offset: offsetOpts, flip: flipOpts, shift: shiftOpts, arrow: arrowOpts } = options;

  if (offsetOpts) {
    middlewareArray.push(offset(offsetOpts));
  }
  if (flipOpts) {
    middlewareArray.push(flip(flipOpts));
  }
  if (shiftOpts) {
    middlewareArray.push(shift(shiftOpts));
  }
  if (arrowOpts) {
    const { element, ...restArrowOptions } = arrowOpts;
    if (element) {
      middlewareArray.push(arrow({ element, ...restArrowOptions }));
    }
  }

  return [...middlewareArray];
}

const interactionHooksMap = {
  hover: useHover,
  click: useClick,
  focus: useFocus,
  role: useRole,
  dismiss: useDismiss,
  listNavigation: useListNavigation,
  typeahead: useTypeahead,
};

function useCreateInteractions(context: FloatingContext, trigger: Trigger[], options: InteractionOptions = {}) {
  const { listNavigation, typeahead, ...restOptions } = options;
  const interactions = Object.entries(interactionHooksMap)
    .map(([key, useInteractionHook]) => {
      const optionKey = key as keyof typeof restOptions;

      // '트리거' 타입 훅인지 확인
      const isTriggerHook = ["click", "hover", "focus"].includes(key);

      if (isTriggerHook) {
        // triggerMode 배열에 포함된 경우에만 활성화
        if (trigger.includes(optionKey as Trigger)) {
          // @ts-ignore
          return useInteractionHook(context, restOptions[optionKey]);
        }
      } else {
        // 유틸리티 훅 (dismiss, role 등)은 옵션이 존재할 때만 활성화
        if (restOptions[optionKey]) {
          // @ts-ignore
          return useInteractionHook(context, restOptions[optionKey]);
        }
      }

      return null;
    })
    .filter(Boolean);

  // listNavigation과 typeahead는 별도로 처리
  if (listNavigation) {
    // @ts-ignore
    interactions.push(useListNavigation(context, listNavigation));
  }
  if (typeahead) {
    // @ts-ignore
    interactions.push(useTypeahead(context, typeahead));
  }

  return useInteractions(interactions as any);
}
