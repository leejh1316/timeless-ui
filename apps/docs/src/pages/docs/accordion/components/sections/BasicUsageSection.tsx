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

    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>

    <CodeBlock code={basicCode} />
  </section>
);

/* ──────────────────────────────────────────────
   Demo Component
   ────────────────────────────────────────────── */

const BasicDemo = () => (
  <Accordion.Root mode="single" collapsible className="w-full max-w-sm rounded-md border border-neutral-200 bg-white shadow-sm">
    <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="text-body-2 text-ink-primary data-[open=true]:text-primary-600 group flex flex-1 items-center justify-between px-4 py-3 font-medium transition-all hover:bg-neutral-50">
          Is it accessible?
          <ChevronDownIcon className="text-icon-tertiary h-4 w-4 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-body-3 text-ink-secondary data-[open=true]:animate-slideDown data-[open=false]:animate-slideUp overflow-hidden px-4 pb-3">
        Yes. It adheres to the WAI-ARIA design pattern.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-2" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="text-body-2 text-ink-primary data-[open=true]:text-primary-600 group flex flex-1 items-center justify-between px-4 py-3 font-medium transition-all hover:bg-neutral-50">
          Is it styled?
          <ChevronDownIcon className="text-icon-tertiary h-4 w-4 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-body-3 text-ink-secondary data-[open=true]:animate-slideDown data-[open=false]:animate-slideUp overflow-hidden px-4 pb-3">
        Yes. It comes with default styles that matches the other components&apos; aesthetic.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-3" className="last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="text-body-2 text-ink-primary data-[open=true]:text-primary-600 group flex flex-1 items-center justify-between px-4 py-3 font-medium transition-all hover:bg-neutral-50">
          Is it animated?
          <ChevronDownIcon className="text-icon-tertiary h-4 w-4 transition-transform duration-200 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-body-3 text-ink-secondary data-[open=true]:animate-slideDown data-[open=false]:animate-slideUp overflow-hidden px-4 pb-3">
        Yes. It&apos;s animated by default, but you can disable it if you prefer.
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
  <Accordion.Root mode="single" collapsible className="w-full max-w-sm rounded-md border border-neutral-200 bg-white shadow-sm">
    <Accordion.Item value="item-1" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="text-body-2 text-ink-primary hover:bg-neutral-50 data-[open=true]:text-primary-600 group flex flex-1 items-center justify-between px-4 py-3 font-medium transition-all">
          Is it accessible?
          <ChevronDownIcon className="text-icon-tertiary group-data-[open=true]:rotate-180 h-4 w-4 transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-body-3 text-ink-secondary data-[open=true]:animate-slideDown data-[open=false]:animate-slideUp overflow-hidden px-4 pb-3">
        Yes. It adheres to the WAI-ARIA design pattern.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-2" className="border-b border-neutral-200 last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="text-body-2 text-ink-primary hover:bg-neutral-50 data-[open=true]:text-primary-600 group flex flex-1 items-center justify-between px-4 py-3 font-medium transition-all">
          Is it styled?
          <ChevronDownIcon className="text-icon-tertiary group-data-[open=true]:rotate-180 h-4 w-4 transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-body-3 text-ink-secondary data-[open=true]:animate-slideDown data-[open=false]:animate-slideUp overflow-hidden px-4 pb-3">
        Yes. It comes with default styles that matches the other components' aesthetic.
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="item-3" className="last:border-0">
      <Accordion.Header className="flex">
        <Accordion.Trigger className="text-body-2 text-ink-primary hover:bg-neutral-50 data-[open=true]:text-primary-600 group flex flex-1 items-center justify-between px-4 py-3 font-medium transition-all">
          Is it animated?
          <ChevronDownIcon className="text-icon-tertiary group-data-[open=true]:rotate-180 h-4 w-4 transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-body-3 text-ink-secondary data-[open=true]:animate-slideDown data-[open=false]:animate-slideUp overflow-hidden px-4 pb-3">
        Yes. It's animated by default, but you can disable it if you prefer.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);
`;

export { BasicUsageSection };
