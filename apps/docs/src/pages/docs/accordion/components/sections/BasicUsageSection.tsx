import { Accordion } from "@timeless-ui/ui";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { ChevronDownIcon } from "lucide-react";

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Accordion 컴포넌트의 가장 기본적인 사용 예시입니다. 여러 섹션 중 하나를 열어 내용을 확인할 수 있으며, `mode="single"` 설정을 통해 한
      번에 하나의 항목만 열리도록 구성할 수 있습니다.
    </Document.Paragraph>

    <PreviewContainer className="mb-4 min-h-[400px]">
      <BasicDemo />
    </PreviewContainer>

    <CodeBlock code={basicCode} />
  </section>
);

/* ──────────────────────────────────────────────
   Demo Component
   ────────────────────────────────────────────── */

const BasicDemo = () => (
  <Accordion.Root
    mode="single"
    collapsible
    className="w-full max-w-sm overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm"
  >
    <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          웹 접근성은 준수하나요?
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm text-neutral-600">
        <div className="px-4 pb-3">네. WAI-ARIA 디자인 패턴을 준수하여 접근성을 보장합니다.</div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-2" className="overflow-hidden border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          스타일이 적용되어 있나요?
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down text-sm text-neutral-600">
        <div className="px-4 pb-3">아니요 스타일이 적용되어 있지 않습니다. 필요에 따라 자유롭게 커스터마이징하여 사용하세요.</div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-3" className="last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          애니메이션이 적용되어 있나요?
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm text-neutral-600">
        <div className="px-4 pb-3">아니요 애니메이션이 적용되어 있지 않습니다. 필요에 따라 자유롭게 커스터마이징하여 사용하세요.</div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

/* ──────────────────────────────────────────────
   Code Snippet
   ────────────────────────────────────────────── */

const basicCode = `
import { Accordion } from "@timeless-ui/ui";
import { ChevronDownIcon } from "lucide-react";

export default () => (
    <Accordion.Root
    mode="single"
    collapsible
    className="w-full max-w-sm overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm"
  >
    <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          웹 접근성은 준수하나요?
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden text-sm text-neutral-600 data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
        <div className="px-4 pb-3">네. WAI-ARIA 디자인 패턴을 준수하여 접근성을 보장합니다.</div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-2" className="overflow-hidden border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          스타일이 적용되어 있나요?
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-sm text-neutral-600 data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
        <div className="px-4 pb-3">아니요 스타일이 적용되어 있지 않습니다. 필요에 따라 자유롭게 커스터마이징하여 사용하세요.</div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-3" className="last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-50 data-[open=true]:text-blue-600">
          애니메이션이 적용되어 있나요?
          <ChevronDownIcon className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden text-sm text-neutral-600 data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
        <div className="px-4 pb-3">아니요 애니메이션이 적용되어 있지 않습니다. 필요에 따라 자유롭게 커스터마이징하여 사용하세요.</div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);
`;

export { BasicUsageSection };
