import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Counter } from "@timeless-ui/react";
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Demos
   ────────────────────────────────────────────── */

const ControlledDemo = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm font-medium text-neutral-600">
        현재 수량: <span className="font-bold text-neutral-900">{value}</span>
      </div>
      <Counter.Root value={value} onValueChange={setValue} minValue={0} maxValue={10}>
        <div className="flex items-center overflow-hidden rounded border border-neutral-300">
          <Counter.Decrement className="border-r border-neutral-300 p-2 transition-colors hover:bg-neutral-100 disabled:bg-neutral-50 disabled:opacity-50">
            <MinusIcon size={16} />
          </Counter.Decrement>
          <div className="flex w-12 justify-center bg-white">
            <Counter.Value className="my-auto font-medium tabular-nums leading-none text-neutral-900" />
          </div>
          <Counter.Increment className="border-l border-neutral-300 p-2 transition-colors hover:bg-neutral-100 disabled:bg-neutral-50 disabled:opacity-50">
            <PlusIcon size={16} />
          </Counter.Increment>
        </div>
      </Counter.Root>
    </div>
  );
};

const StepDemo = () => {
  return (
    <Counter.Root defaultValue={1000} step={500} minValue={0}>
      <div className="flex items-center gap-3">
        <span className="w-20 text-sm font-medium text-neutral-600">가격 설정</span>
        <div className="flex items-center gap-2 rounded-lg bg-neutral-100 p-1">
          <Counter.Decrement className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm transition-transform hover:translate-y-px disabled:opacity-50 disabled:shadow-none">
            <MinusIcon size={14} />
          </Counter.Decrement>
          <div className="flex min-w-[3rem] items-center justify-center px-2">
            <Counter.Value className="text-sm font-semibold tabular-nums text-neutral-800" />
            <span className="ml-0.5 text-xs text-neutral-500">원</span>
          </div>
          <Counter.Increment className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm transition-transform hover:translate-y-px disabled:opacity-50 disabled:shadow-none">
            <PlusIcon size={14} />
          </Counter.Increment>
        </div>
      </div>
    </Counter.Root>
  );
};

/* ──────────────────────────────────────────────
   Codes
   ────────────────────────────────────────────── */

const controlledCode = `const ControlledDemo = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-neutral-600 font-medium">
        현재 수량: <span className="text-neutral-900 font-bold">{value}</span>
      </div>
      <Counter.Root value={value} onValueChange={setValue} minValue={0} maxValue={10}>
        <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
          <Counter.Decrement className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:bg-neutral-50 transition-colors border-r border-neutral-300">
            <MinusIcon size={16} />
          </Counter.Decrement>
          <div className="w-12 flex justify-center bg-white">
            <Counter.Value className="text-neutral-900 font-medium tabular-nums leading-none my-auto" />
          </div>
          <Counter.Increment className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:bg-neutral-50 transition-colors border-l border-neutral-300">
            <PlusIcon size={16} />
          </Counter.Increment>
        </div>
      </Counter.Root>
    </div>
  );
};`;

const stepCode = `const StepDemo = () => {
  return (
    <Counter.Root defaultValue={1000} step={500} minValue={0}>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-neutral-600 w-20">가격 설정</span>
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
          <Counter.Decrement className="h-7 w-7 flex items-center justify-center bg-white rounded shadow-sm hover:translate-y-px transition-transform disabled:opacity-50 disabled:shadow-none">
            <MinusIcon size={14} />
          </Counter.Decrement>
          <div className="flex items-center justify-center px-2 min-w-[3rem]">
            <Counter.Value className="text-sm font-semibold text-neutral-800 tabular-nums" />
            <span className="text-xs text-neutral-500 ml-0.5">원</span>
          </div>
          <Counter.Increment className="h-7 w-7 flex items-center justify-center bg-white rounded shadow-sm hover:translate-y-px transition-transform disabled:opacity-50 disabled:shadow-none">
            <PlusIcon size={14} />
          </Counter.Increment>
        </div>
      </div>
    </Counter.Root>
  );
};`;

/* ──────────────────────────────────────────────
   Main Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    <Document.Heading2>제어 컴포넌트 (Controlled)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>value</InlineCode>와 <InlineCode>onValueChange</InlineCode>를 사용하여 상태를 직접 제어할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />

    <Document.Heading2>단계별 증감 (Step)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>step</InlineCode> prop을 사용하여 증감 단위를 설정할 수 있습니다. 가격 설정이나 배수 단위 입력에 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <StepDemo />
    </PreviewContainer>
    <CodeBlock code={stepCode} className="mb-10" />
  </section>
);

export { ExampleSection };
