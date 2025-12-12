import { forwardRef, useId, useRef, useState } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { useComposedRefs, useControllableState } from "../../hooks";
import { composeEventHandlers } from "../../utils/composeEventHandlers";
import { Button } from "../button/Button";

type ScopedProps<P> = P & { __scopeInput?: Scope };
type ErrorMessage = string | undefined;
type InputContextValue = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  name: string;
  value: string;
  setValue: (value: string) => void;
  errorMessage: ErrorMessage;
  setErrorMessage: (message: ErrorMessage) => void;
  inputFocused: boolean;
  setInputFocused: (focused: boolean) => void;
};

const [createInputContext, createInputScope] = createContextScope("Input");
const [InputProvider, useInputContext] = createInputContext<InputContextValue>("Input");

// -- Input Component -- //
// -- Root -- //
interface InputRootProps extends PrimitivePropsWithRef<"div"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}
const InputRoot = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<InputRootProps>>((props, forwardedRef) => {
  const { __scopeInput, name, value, defaultValue = "", onValueChange, ...rootProps } = props;
  const [controllValue, setControllValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(undefined);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputProvider
      scope={__scopeInput}
      name={name ?? useId()}
      value={controllValue}
      setValue={setControllValue}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
      inputRef={inputRef}
      inputFocused={inputFocused}
      setInputFocused={setInputFocused}
    >
      <Primitive.div
        ref={forwardedRef}
        {...rootProps}
        aria-invalid={errorMessage ? true : false}
        data-focused={inputFocused ? true : false}
        data-error={errorMessage ? true : false}
      />
    </InputProvider>
  );
});
InputRoot.displayName = "Input.Root";

// -- Field -- //
const _validityMatchers = [
  "badInput",
  "patternMismatch",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "tooLong",
  "tooShort",
  "typeMismatch",
  "valid",
  "valueMissing",
] as const;
type ValidityMatcher = (typeof _validityMatchers)[number];
const DEFAULT_INVALID_MESSAGE = "유효하지 않은 값입니다.";
const DEFAULT_BUILT_IN_MESSAGES: Record<ValidityMatcher, string | undefined> = {
  badInput: DEFAULT_INVALID_MESSAGE,
  patternMismatch: "요청된 형식과 일치하지 않습니다.",
  rangeOverflow: "값이 너무 큽니다.",
  rangeUnderflow: "값이 너무 작습니다.",
  stepMismatch: "요청된 단계와 일치하지 않습니다.",
  tooLong: "값이 너무 깁니다.",
  tooShort: "값이 너무 짧습니다.",
  typeMismatch: "요청된 형식과 일치하지 않습니다.",
  valid: undefined,
  valueMissing: "필수 입력 항목입니다.",
};
interface InputFieldProps extends PrimitivePropsWithRef<"input"> {}
const InputField = forwardRef<React.ComponentRef<typeof Primitive.input>, ScopedProps<InputFieldProps>>((props, forwardedRef) => {
  const { __scopeInput, onInvalid, onChange, ...fieldProps } = props;
  const { name, errorMessage, value, inputRef, setValue, setErrorMessage, setInputFocused } = useInputContext("Input.Field", __scopeInput);
  const composedRef = useComposedRefs(forwardedRef, inputRef);
  return (
    <Primitive.input
      ref={composedRef}
      name={name}
      {...fieldProps}
      aria-errormessage={errorMessage}
      aria-invalid={errorMessage ? true : false}
      data-error={errorMessage ? true : false}
      value={value}
      onChange={composeEventHandlers(onChange, (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errorMessage) {
          setErrorMessage(undefined);
          e.currentTarget.setCustomValidity("");
        }
        setValue(e.currentTarget.value);
      })}
      onInvalid={composeEventHandlers(onInvalid, (e: React.InvalidEvent<HTMLInputElement>) => {
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
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
    />
  );
});
InputField.displayName = "Input.Field";

// -- Label -- //
interface InputLabelProps extends PrimitivePropsWithRef<"label"> {}
const InputLabel = forwardRef<React.ComponentRef<typeof Primitive.label>, ScopedProps<InputLabelProps>>((props, forwardedRef) => {
  const { __scopeInput, ...labelProps } = props;
  const { name } = useInputContext("Input.Label", __scopeInput);
  return <Primitive.label ref={forwardedRef} htmlFor={name} {...labelProps} />;
});
InputLabel.displayName = "Input.Label";

// -- Error Message -- //
interface InputErrorMessageProps extends PrimitivePropsWithRef<"div"> {}
const InputErrorMessage = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<InputErrorMessageProps>>(
  (props, forwardedRef) => {
    const { __scopeInput, ...errorMessageProps } = props;
    const { errorMessage } = useInputContext("Input.ErrorMessage", __scopeInput);
    return (
      <Primitive.div ref={forwardedRef} role="alert" aria-label={errorMessage} hidden={!errorMessage} {...errorMessageProps}>
        {errorMessage}
      </Primitive.div>
    );
  },
);
InputErrorMessage.displayName = "Input.ErrorMessage";

// -- Clear Button -- //
interface InputClearButtonProps extends PrimitivePropsWithRef<typeof Button> {}
const InputClearButton = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<InputClearButtonProps>>((props, forwardedRef) => {
  const { __scopeInput, onClick, ...buttonProps } = props;
  const { name, inputRef, setValue, setErrorMessage } = useInputContext("Input.ClearButton", __scopeInput);
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
          if (inputRef.current) {
            inputRef.current.setCustomValidity("");
          }
        },
        { checkForDefaultPrevented: false },
      )}
      {...buttonProps}
    />
  );
});
InputClearButton.displayName = "Input.ClearButton";

export const Input = {
  Root: InputRoot,
  Field: InputField,
  Label: InputLabel,
  ErrorMessage: InputErrorMessage,
  ClearButton: InputClearButton,
};
export type { InputRootProps, InputFieldProps, InputLabelProps, InputErrorMessageProps, InputClearButtonProps };