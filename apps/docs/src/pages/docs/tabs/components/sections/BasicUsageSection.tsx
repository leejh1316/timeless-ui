import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Tabs } from "@timeless-ui/react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Tabs 컴포넌트는 여러 콘텐츠를 탭 형태로 전환하며 표시할 수 있게 해줍니다. 가장 기본적인 탭은 Root, List, Trigger, Content로
      구성됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => (
  <Tabs.Root defaultValue="tab1" className="w-full max-w-md">
    <Tabs.List className="flex gap-2 border-b border-neutral-200 pb-2">
      <Tabs.Trigger
        value="tab1"
        className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 data-[active=true]:text-neutral-900"
      >
        첫 번째 탭
      </Tabs.Trigger>
      <Tabs.Trigger
        value="tab2"
        className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 data-[active=true]:text-neutral-900"
      >
        두 번째 탭
      </Tabs.Trigger>
      <Tabs.Trigger
        value="tab3"
        className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 data-[active=true]:text-neutral-900"
      >
        세 번째 탭
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab1" className="py-4">
      <p className="text-sm text-neutral-700">첫 번째 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="tab2" className="py-4">
      <p className="text-sm text-neutral-700">두 번째 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="tab3" className="py-4">
      <p className="text-sm text-neutral-700">세 번째 탭의 내용입니다.</p>
    </Tabs.Content>
  </Tabs.Root>
);

const basicCode = `import { Tabs } from "@timeless-ui/react";

const BasicDemo = () => (
  <Tabs.Root defaultValue="tab1" className="w-full max-w-md">
    <Tabs.List className="flex gap-2 border-b border-neutral-200 pb-2">
      <Tabs.Trigger value="tab1" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900 hover:bg-neutral-100">
        첫 번째 탭
      </Tabs.Trigger>
      <Tabs.Trigger value="tab2" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900 hover:bg-neutral-100">
        두 번째 탭
      </Tabs.Trigger>
      <Tabs.Trigger value="tab3" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900 hover:bg-neutral-100">
        세 번째 탭
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab1" className="py-4">
      <p className="text-sm text-neutral-700">첫 번째 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="tab2" className="py-4">
      <p className="text-sm text-neutral-700">두 번째 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="tab3" className="py-4">
      <p className="text-sm text-neutral-700">세 번째 탭의 내용입니다.</p>
    </Tabs.Content>
  </Tabs.Root>
);`;

export { BasicUsageSection };
