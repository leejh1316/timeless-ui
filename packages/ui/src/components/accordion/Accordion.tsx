import { useControllableState } from "../../hooks/useControllableState";
import { createContext, forwardRef, memo, useCallback, useContext, useId, useMemo } from "react";
import { Collapsible, CollapsibleContextValue, useCollapsibleContext } from "../collapsible/Collapsible";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { useArrowNavigation } from "../../hooks/useArrowNavigation";
import { useComposedRefs } from "../../hooks/useComposeRefs";
// CONST
const ACCORDION_PREFIX_ID = "accordion";

// =========== Accordion Context ===========
type OrientationType = "horizontal" | "vertical";
interface AccordionBaseContextValue {
  componentId: string;
  disabled?: boolean;
  orientation?: OrientationType;
  collapsible?: boolean;
}
interface AccordionSingleContextValue extends AccordionBaseContextValue {
  mode: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
}
interface AccordionMultipleContextValue extends AccordionBaseContextValue {
  mode: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}
type AccordionContextValue = AccordionSingleContextValue | AccordionMultipleContextValue;

const AccordionContext = createContext<AccordionContextValue | null>(null);
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Accordion.* 컴포넌트는 Accordion.Root 안에서 사용해야 합니다.");
  return context;
};

// =========== Accordion.Root ===========
type AccordionRootBaseProps = Omit<PrimitivePropsWithRef<"div">, "defaultValue">;
interface AccordionSingleProps
  extends AccordionRootBaseProps,
    Omit<AccordionSingleContextValue, "componentId" | "mode"> {
  mode: "single";
}
interface AccordionMultipleProps
  extends AccordionRootBaseProps,
    Omit<AccordionMultipleContextValue, "componentId" | "mode"> {
  mode: "multiple";
}
type AccordionRootProps = AccordionSingleProps | AccordionMultipleProps;
const AccordionRoot = memo(
  forwardRef<React.ComponentRef<typeof Primitive.div>, AccordionRootProps>(
    (props: AccordionRootProps, forwardedRef) => {
      const {
        collapsible = true,
        disabled = false,
        orientation = "vertical",
        mode = "single",
        value,
        defaultValue,
        onValueChange,
        onKeyDown,
        ...restProps
      } = props;

      const [accordionValue, setAccordionValue] = useControllableState<string | string[] | undefined>({
        value,
        defaultValue,
        onChange: onValueChange as ((value: string | string[] | undefined) => void) | undefined,
      });

      const { rootRef, handleKeyDown } = useArrowNavigation({
        selector: '[data-slot="accordion-trigger"]',
      });
      const composedRef = useComposedRefs(forwardedRef, rootRef);

      const componentId = useId();

      const onKeyDownHandler = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          handleKeyDown(event);
          if (onKeyDown) {
            onKeyDown(event);
          }
        },
        [handleKeyDown, onKeyDown],
      );

      return (
        <AccordionContext.Provider
          value={
            {
              mode,
              collapsible,
              disabled,
              orientation,
              value: accordionValue,
              onValueChange: setAccordionValue,
              defaultValue,
              componentId: `${ACCORDION_PREFIX_ID}-${componentId}`,
            } as any
          }
        >
          <Primitive.div
            ref={composedRef}
            onKeyDown={onKeyDownHandler}
            data-slot="accordion"
            data-orientation={orientation}
            data-disabled={disabled}
            data-mode={mode}
            {...restProps}
          />
        </AccordionContext.Provider>
      );
    },
  ),
);
AccordionRoot.displayName = "Accordion.Root";

// =========== Accordion.Item ===========
interface AccordionItemProps extends PrimitivePropsWithRef<"div">, Pick<CollapsibleContextValue, "disabled"> {
  value: string;
}
const AccordionItem = ({ value: propValue, disabled: propDisabled, ...props }: AccordionItemProps) => {
  const { disabled, value, onValueChange, mode, collapsible, orientation } = useAccordionContext();
  const isDisabled = propDisabled === undefined ? disabled : propDisabled;
  const isOpen = useMemo(() => {
    if (mode === "single") {
      return value === propValue;
    } else if (mode === "multiple") {
      return Array.isArray(value) && value.includes(propValue);
    }
  }, [value, mode]);

  const handleTriggerClick = useCallback(() => {
    if (mode === "single") {
      if (isOpen && !collapsible) {
        return;
      }
      const newValue = isOpen ? undefined : propValue;
      onValueChange?.(newValue);
    } else if (mode === "multiple") {
      const currentValue = Array.isArray(value) ? value : [];
      if (isOpen) {
        const newValue = currentValue.filter((val) => val !== propValue);
        onValueChange?.(newValue);
      } else {
        const newValue = [...currentValue, propValue];
        onValueChange?.(newValue);
      }
    }
  }, [mode, value, collapsible, onValueChange, propValue, isOpen]);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={handleTriggerClick}
      disabled={isDisabled}
      data-slot="accordion-item"
      data-orientation={orientation}
      data-disabled={isDisabled}
      {...props}
    />
  );
};
AccordionItem.displayName = "Accordion.Item";

// =========== Accordion.Header ===========

interface AccordionHeaderProps extends PrimitivePropsWithRef<"h3"> {}
const AccordionHeader = (props: AccordionHeaderProps) => {
  const { open } = useCollapsibleContext();
  const { disabled, orientation } = useAccordionContext();
  return (
    <Primitive.h3
      data-slot="accordion-header"
      data-orientation={orientation}
      data-disabled={disabled}
      data-open={open}
      {...props}
    />
  );
};
AccordionHeader.displayName = "Accordion.Header";

// =========== Accordion.Trigger ===========
interface AccordionTriggerProps extends PrimitivePropsWithRef<"button"> {}
const AccordionTrigger = forwardRef<React.ElementRef<typeof Primitive.button>, AccordionTriggerProps>(
  ({ onClick, ...props }: AccordionTriggerProps, forwardedRef) => {
    const { orientation, componentId } = useAccordionContext();
    return (
      <Collapsible.Trigger
        ref={forwardedRef}
        data-slot="accordion-trigger"
        data-orientation={orientation}
        aria-controls={componentId}
        {...props}
      />
    );
  },
);
AccordionTrigger.displayName = "Accordion.Trigger";

// =========== Accordion.Content ===========
interface AccordionContentProps extends PrimitivePropsWithRef<"div"> {}
const AccordionContent = memo(
  forwardRef<React.ElementRef<typeof Primitive.div>, AccordionContentProps>(({ ...props }, forwardedRef) => {
    const { componentId, orientation } = useAccordionContext();
    const style = {
      "--accordion-content-width": `var(--collapsible-content-width)`,
      "--accordion-content-height": `var(--collapsible-content-height)`,
    } as React.CSSProperties;
    return (
      <Collapsible.Content
        ref={forwardedRef}
        style={style}
        data-slot="accordion-content"
        data-orientation={orientation}
        aria-labelledby={componentId}
        role="region"
        {...props}
      />
    );
  }),
);
AccordionContent.displayName = "Accordion.Content";

// =========== Export ===========
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
