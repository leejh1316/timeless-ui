import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { forwardRef, memo, useCallback, useId, useMemo } from "react";
import { useArrowNavigation } from "../../hooks/useArrowNavigation";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import { useControllableState } from "../../hooks/useControllableState";
import { Collapsible, CollapsibleContextValue, createCollapsibleScope } from "../collapsible/Collapsible";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
// CONST
const ACCORDION_PREFIX_ID = "accordion";

type ScopedProps<P> = P & { __scopeAccordion?: Scope };

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
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}
interface AccordionMultipleContextValue extends AccordionBaseContextValue {
  mode: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}
type AccordionContextValue = AccordionSingleContextValue | AccordionMultipleContextValue;

const ACCORDION_NAME = "Accordion";
const [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [createCollapsibleScope]);
const [AccordionProvider, useAccordionContext] = createAccordionContext<AccordionContextValue>(ACCORDION_NAME);
const useCollapsibleScope = createCollapsibleScope();
// const AccordionContext = createContext<AccordionContextValue | null>(null);
// const useAccordionContext = () => {
//   const context = useContext(AccordionContext);
//   if (!context) throw new Error("Accordion.* 컴포넌트는 Accordion.Root 안에서 사용해야 합니다.");
//   return context;
// };

// =========== Accordion.Root ===========
type AccordionRootBaseProps = Omit<PrimitivePropsWithRef<"div">, "defaultValue">;
interface AccordionSingleProps extends AccordionRootBaseProps, ScopedProps<Omit<AccordionSingleContextValue, "componentId" | "mode">> {
  mode: "single";
}
interface AccordionMultipleProps extends AccordionRootBaseProps, ScopedProps<Omit<AccordionMultipleContextValue, "componentId" | "mode">> {
  mode: "multiple";
}
type AccordionRootProps = AccordionSingleProps | AccordionMultipleProps;
const AccordionRoot = memo(
  forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<AccordionRootProps>>((props, forwardedRef) => {
    const {
      collapsible = true,
      disabled = false,
      orientation = "vertical",
      mode = "single",
      value,
      defaultValue,
      onValueChange,
      onKeyDown,
      __scopeAccordion,
      ...restProps
    } = props;

    const [accordionValue, setAccordionValue] = useControllableState<string | string[] | null>({
      value,
      defaultValue,
      onChange: onValueChange as ((value: string | string[] | null) => void) | undefined,
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
      //@ts-ignore
      <AccordionProvider
        scope={__scopeAccordion}
        mode={mode}
        collapsible={collapsible}
        disabled={disabled}
        orientation={orientation}
        value={accordionValue}
        onValueChange={setAccordionValue}
        defaultValue={defaultValue}
        componentId={`${ACCORDION_PREFIX_ID}-${componentId}`}
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
      </AccordionProvider>
    );
  }),
);
AccordionRoot.displayName = "Accordion.Root";

// =========== Accordion.Item ===========
const ACCORDION_ITEM_NAME = "AccordionItem";
interface AccordionItemProps extends PrimitivePropsWithRef<"div">, Pick<CollapsibleContextValue, "disabled"> {
  value: string;
}
const AccordionItem = ({ value: propValue, disabled: propDisabled, __scopeAccordion, ...props }: ScopedProps<AccordionItemProps>) => {
  const { disabled, value, onValueChange, mode, collapsible, orientation } = useAccordionContext(ACCORDION_ITEM_NAME, __scopeAccordion);
  const collapsibleScope = useCollapsibleScope(__scopeAccordion);
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
      const newValue = isOpen ? null : propValue;
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
      {...collapsibleScope}
    />
  );
};
AccordionItem.displayName = "Accordion.Item";

// =========== Accordion.Header ===========

const ACCORDION_HEADER_NAME = "AccordionHeader";
interface AccordionHeaderProps extends PrimitivePropsWithRef<"h3"> {}
const AccordionHeader = ({ __scopeAccordion, ...props }: ScopedProps<AccordionHeaderProps>) => {
  const { disabled, orientation } = useAccordionContext(ACCORDION_HEADER_NAME, __scopeAccordion);
  return <Primitive.h3 data-slot="accordion-header" data-orientation={orientation} data-disabled={disabled} {...props} />;
};
AccordionHeader.displayName = "Accordion.Header";

// =========== Accordion.Trigger ===========
const ACCORDION_TRIGGER_NAME = "AccordionTrigger";
interface AccordionTriggerProps extends PrimitivePropsWithRef<"button"> {}
const AccordionTrigger = forwardRef<React.ComponentRef<typeof Primitive.button>, ScopedProps<AccordionTriggerProps>>(
  ({ onClick, __scopeAccordion, ...props }, forwardedRef) => {
    const { orientation, componentId } = useAccordionContext(ACCORDION_TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return (
      <Collapsible.Trigger
        {...collapsibleScope}
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
const ACCORDION_CONTENT_NAME = "AccordionContent";
interface AccordionContentProps extends PrimitivePropsWithRef<"div"> {}
const AccordionContent = memo(
  forwardRef<React.ElementRef<typeof Primitive.div>, ScopedProps<AccordionContentProps>>(({ __scopeAccordion, ...props }, forwardedRef) => {
    const { componentId, orientation } = useAccordionContext(ACCORDION_CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const style = {
      "--accordion-content-width": `var(--collapsible-content-width)`,
      "--accordion-content-height": `var(--collapsible-content-height)`,
    } as React.CSSProperties;
    return (
      <Collapsible.Content
        {...collapsibleScope}
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
