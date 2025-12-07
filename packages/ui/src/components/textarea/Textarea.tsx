import { forwardRef, useId, useRef, useState } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { useComposedRefs, useControllableState } from "../../hooks";
import { composeEventHandlers } from "../../utils/composeEventHandlers";
import { Button } from "../button/Button";

type ScopedProps<P> = P & { __scopeTextarea?: Scope };
type ErrorMessage = string | undefined;
type TextareaContextValue = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  name: string;
  value: string;
  setValue: (value: string) => void;
  errorMessage: ErrorMessage;
  setErrorMessage: (message: ErrorMessage) => void;
  textareaFocused: boolean;
  setTextareaFocused: (focused: boolean) => void;
};

const [createTextareaContext, createTextareaScope] = createContextScope("Textarea");
const [TextareaProvider, useTextareaContext] = createTextareaContext<TextareaContextValue>("Textarea");

// -- Textarea Component -- //
// -- Root -- //
interface TextareaRootProps extends PrimitivePropsWithRef<"div"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}
const TextareaRoot = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<TextareaRootProps>>((props, forwardedRef) => {
  const { __scopeTextarea, name, value, defaultValue = "", onValueChange, ...rootProps } = props;
  const [controllValue, setControllValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(undefined);
  const [textareaFocused, setTextareaFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <TextareaProvider
      scope={__scopeTextarea}
      name={name ?? useId()}
      value={controllValue}
      setValue={setControllValue}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      textareaRef={textareaRef}
      textareaFocused={textareaFocused}
      setTextareaFocused={setTextareaFocused}
    >
      <Primitive.div
        ref={forwardedRef}
        {...rootProps}
        aria-invalid={errorMessage ? true : false}
        data-focused={textareaFocused ? true : false}
        data-error={errorMessage ? true : false}
      />
    </TextareaProvider>
  );
});
TextareaRoot.displayName = "Textarea.Root";

// -- Field -- //
const _validityMatchers = [
  "badInput",
  "tooLong",
  "tooShort",
  "valid",
  "valueMissing",
] as const;
type ValidityMatcher = (typeof _validityMatchers)[number];
const DEFAULT_INVALID_MESSAGE = "유효하지 않은 값입니다.";
const DEFAULT_BUILT_IN_MESSAGES: Record<ValidityMatcher, string | undefined> = {
  badInput: DEFAULT_INVALID_MESSAGE,
  tooLong: "값이 너무 깁니다.",
  tooShort: "값이 너무 짧습니다.",
  valid: undefined,
  valueMissing: "필수 입력 항목입니다.",
};
interface TextareaFieldProps extends PrimitivePropsWithRef<"textarea"> {}
const TextareaField = forwardRef<React.ComponentRef<typeof Primitive.textarea>, ScopedProps<TextareaFieldProps>>((props, forwardedRef) => {
  const { __scopeTextarea, onInvalid, onChange, ...fieldProps } = props;
  const { name, errorMessage, value, textareaRef, setValue, setErrorMessage, setTextareaFocused } = useTextareaContext("Textarea.Field", __scopeTextarea);
  const composedRef = useComposedRefs(forwardedRef, textareaRef);
  return (
    <Primitive.textarea
      ref={composedRef}
      name={name}
      {...fieldProps}
      aria-errormessage={errorMessage}
      aria-invalid={errorMessage ? true : false}
      data-error={errorMessage ? true : false}
      value={value}
      onChange={composeEventHandlers(onChange, (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (errorMessage) {
          setErrorMessage(undefined);
          e.currentTarget.setCustomValidity("");
        }
        setValue(e.currentTarget.value);
      })}
      onInvalid={composeEventHandlers(onInvalid, (e: React.InvalidEvent<HTMLTextAreaElement>) => {
        e.preventDefault(); // 브라우저 툴팁 숨기기

        const target = e.currentTarget;

        const firstErrorKey = _validityMatchers.find((key) => key !== "valid" && target.validity[key]);

        // 매칭되는 에러 키가 있고, 미리 정의된 메시지가 있다면
        if (firstErrorKey && DEFAULT_BUILT_IN_MESSAGES[firstErrorKey]) {
          const message = DEFAULT_BUILT_IN_MESSAGES[firstErrorKey]!;

          // 브라우저 내부 상태에 메시지 등록
          target.setCustomValidity(message);

          // 상태에도 메시지 등록
          setErrorMessage(message);
        }
      })}
      onFocus={() => setTextareaFocused(true)}
      onBlur={() => setTextareaFocused(false)}
    />
  );
});
TextareaField.displayName = "Textarea.Field";

// -- Label -- //
interface TextareaLabelProps extends PrimitivePropsWithRef<"label"> {}
const TextareaLabel = forwardRef<React.ComponentRef<typeof Primitive.label>, ScopedProps<TextareaLabelProps>>((props, forwardedRef) => {
  const { __scopeTextarea, ...labelProps } = props;
  const { name } = useTextareaContext("Textarea.Label", __scopeTextarea);
  return <Primitive.label ref={forwardedRef} htmlFor={name} {...labelProps} />;
});
TextareaLabel.displayName = "Textarea.Label";

// -- Error Message -- //
interface TextareaErrorMessageProps extends PrimitivePropsWithRef<"div"> {}
const TextareaErrorMessage = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<TextareaErrorMessageProps>>(
  (props, forwardedRef) => {
    const { __scopeTextarea, ...errorMessageProps } = props;
    const { errorMessage } = useTextareaContext("Textarea.ErrorMessage", __scopeTextarea);
    return (
      <Primitive.div ref={forwardedRef} role="alert" aria-label={errorMessage} hidden={!errorMessage} {...errorMessageProps}>
        {errorMessage}
      </Primitive.div>
    );
  },
);
TextareaErrorMessage.displayName = "Textarea.ErrorMessage";

// -- Clear Button -- //
interface TextareaClearButtonProps extends PrimitivePropsWithRef<typeof Button> {}
const TextareaClearButton = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<TextareaClearButtonProps>>((props, forwardedRef) => {
  const { __scopeTextarea, onClick, ...buttonProps } = props;
  const { name, textareaRef, setValue, setErrorMessage } = useTextareaContext("Textarea.ClearButton", __scopeTextarea);
  return (
    <Button
      ref={forwardedRef}
      type="button"
      aria-label={`Clear ${name}`}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={composeEventHandlers(
        onClick,
        () => {
          setValue("");
          setErrorMessage(undefined);
          if (textareaRef.current) {
            textareaRef.current.setCustomValidity("");
          }
        },
        { checkForDefaultPrevented: false },
      )}
      {...buttonProps}
    />
  );
});
TextareaClearButton.displayName = "Textarea.ClearButton";

// -- Count -- //
interface TextareaCountProps extends PrimitivePropsWithRef<"span"> {}
const TextareaCount = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<TextareaCountProps>>((props, forwardedRef) => {
  const { __scopeTextarea, ...countProps } = props;
  const { value } = useTextareaContext("Textarea.Count", __scopeTextarea);
  return (
    <Primitive.span ref={forwardedRef} {...countProps}>
      {value.length}
    </Primitive.span>
  );
});
TextareaCount.displayName = "Textarea.Count";

export const Textarea = {
  Root: TextareaRoot,
  Field: TextareaField,
  Label: TextareaLabel,
  ErrorMessage: TextareaErrorMessage,
  ClearButton: TextareaClearButton,
  Count: TextareaCount,
};
export type {
  TextareaRootProps,
  TextareaFieldProps,
  TextareaLabelProps,
  TextareaErrorMessageProps,
  TextareaClearButtonProps,
  TextareaCountProps,
};
