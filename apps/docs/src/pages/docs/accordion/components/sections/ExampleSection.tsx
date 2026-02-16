import { useState } from "react";
import { Accordion } from "@timeless-ui/react";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { ChevronDownIcon } from "lucide-react";

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 시나리오에 맞는 Accordion 활용 방법을 소개합니다.</Document.Paragraph>

    <Document.Heading2>다중 선택 모드 (Multiple)</Document.Heading2>
    <Document.Paragraph mb={6}>`mode="multiple"` 속성을 사용하여 여러 항목을 동시에 열 수 있습니다.</Document.Paragraph>
    <PreviewContainer className="mb-4">
      <MultipleDemo />
    </PreviewContainer>
    <CodeBlock code={multipleCode} className="mb-10" />

    <Document.Heading2>Controlled 상태 관리</Document.Heading2>
    <Document.Paragraph mb={6}>`value`와 `onValueChange` prop을 사용하여 외부에서 상태를 제어할 수 있습니다.</Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Demos
   ────────────────────────────────────────────── */

const MultipleDemo = () => (
  <Accordion.Root mode="multiple" className="w-full max-w-sm rounded-md border border-neutral-200 bg-white shadow-sm">
    <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          Step 1: Sign up
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm text-neutral-600">
        <div className="px-4 pb-3">Create an account to get started.</div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-2" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          Step 2: Profile
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm text-neutral-600">
        <div className="px-4 pb-3">Complete your profile details.</div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const multipleCode = `
import { Accordion } from "@timeless-ui/react";
import { ChevronDownIcon } from "lucide-react";

export default () => (
  <Accordion.Root mode="multiple" className="w-full max-w-sm rounded-md border border-neutral-200 bg-white shadow-sm">
    <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          Step 1: Sign up
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden text-sm text-neutral-600 data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
        <div className="px-4 pb-3">Create an account to get started.</div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-2" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          Step 2: Profile
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden text-sm text-neutral-600 data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
        <div className="px-4 pb-3">Complete your profile details.</div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);
`;

const ControlledDemo = () => {
  const [value, setValue] = useState<string | null>("item-1");

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-sm text-neutral-600">
        Current value: <span className="font-mono font-semibold text-blue-600">{value || "null"}</span>
      </div>

      <Accordion.Root
        mode="single"
        collapsible
        value={value}
        onValueChange={setValue}
        className="rounded-md border border-neutral-200 bg-white shadow-sm"
      >
        <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
          <Accordion.Header className="flex">
            <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
              Controlled Item 1
              <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm text-neutral-600">
            <div className="px-4 pb-3">This accordion state is controlled by React state.</div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2" className="last:border-0">
          <Accordion.Header className="flex">
            <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
              Controlled Item 2
              <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm text-neutral-600">
            <div className="px-4 pb-3">Change the state externally if needed.</div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      <div className="flex gap-2">
        <button
          onClick={() => setValue("item-1")}
          className="rounded bg-neutral-100 px-3 py-1 text-sm font-medium transition-colors hover:bg-neutral-200"
        >
          Select Item 1
        </button>
        <button
          onClick={() => setValue("item-2")}
          className="rounded bg-neutral-100 px-3 py-1 text-sm font-medium transition-colors hover:bg-neutral-200"
        >
          Select Item 2
        </button>
      </div>
    </div>
  );
};

const controlledCode = `
import { useState } from "react";
import { Accordion } from "@timeless-ui/react";
import { ChevronDownIcon } from "lucide-react";

export default () => {
  const [value, setValue] = useState<string | null>("item-1");

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-sm text-neutral-600">
        Current value: <span className="font-mono text-blue-600 font-semibold">{value || "null"}</span>
      </div>
      
      <Accordion.Root 
        mode="single" 
        collapsible 
        value={value} 
        onValueChange={setValue}
        className="rounded-md border border-neutral-200 bg-white shadow-sm"
      >
        <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
          <Accordion.Header className="flex">
            <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
              Controlled Item 1
              <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm text-neutral-600 data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
            <div className="px-4 pb-3">This accordion state is controlled by React state.</div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2" className="last:border-0">
            <Accordion.Header className="flex">
            <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
              Controlled Item 2
              <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm text-neutral-600 data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
            <div className="px-4 pb-3">Change the state externally if needed.</div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};
`;

export { ExampleSection };
