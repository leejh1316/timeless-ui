import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Collapsible } from "@timeless-ui/react";
import { ChevronsUpDown } from "lucide-react";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Demos
   ────────────────────────────────────────────── */

const UncontrolledDemo = () => {
  return (
    <Collapsible.Root defaultOpen className="w-[300px] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-4 py-3">
        <h4 className="text-sm font-semibold text-neutral-900">알림 설정</h4>
        <Collapsible.Trigger className="rounded p-1 text-neutral-500 transition-colors hover:bg-neutral-200">
          <ChevronsUpDown size={16} />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="space-y-3 p-4">
        <div className="text-sm text-neutral-600">이메일 알림 받기</div>
        <div className="text-sm text-neutral-600">SMS 알림 받기</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

const DisabledDemo = () => {
  return (
    <Collapsible.Root disabled className="w-[300px] rounded-lg border border-neutral-200 bg-neutral-50/50 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
        <h4 className="text-sm font-semibold text-neutral-400">계정 설정 (비활성화)</h4>
        <Collapsible.Trigger className="cursor-not-allowed rounded p-1 text-neutral-300">
          <ChevronsUpDown size={16} />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="p-4">
        <div className="text-sm text-neutral-400">이 내용은 보이지 않습니다.</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

/* ──────────────────────────────────────────────
   Codes
   ────────────────────────────────────────────── */

const uncontrolledCode = `const UncontrolledDemo = () => {
  return (
    <Collapsible.Root defaultOpen className="w-[300px] border border-neutral-200 rounded-lg shadow-sm bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50">
        <h4 className="text-sm font-semibold text-neutral-900">
          알림 설정
        </h4>
        <Collapsible.Trigger className="p-1 rounded hover:bg-neutral-200 transition-colors text-neutral-500">
          <ChevronsUpDown size={16} />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="p-4 space-y-3">
        <div className="text-sm text-neutral-600">이메일 알림 받기</div>
        <div className="text-sm text-neutral-600">SMS 알림 받기</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};`;

const disabledCode = `const DisabledDemo = () => {
  return (
    <Collapsible.Root disabled className="w-[300px] border border-neutral-200 rounded-lg shadow-sm bg-neutral-50/50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
        <h4 className="text-sm font-semibold text-neutral-400">
          계정 설정 (비활성화)
        </h4>
        <Collapsible.Trigger 
          className="p-1 rounded text-neutral-300 cursor-not-allowed"
        >
          <ChevronsUpDown size={16} />
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content className="p-4">
        <div className="text-sm text-neutral-400">이 내용은 보이지 않습니다.</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};`;

/* ──────────────────────────────────────────────
   Main Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    <Document.Heading2>초기 상태 설정 (Uncontrolled)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>defaultOpen</InlineCode> prop을 사용하여 초기 확장 상태를 설정할 수 있습니다. 별도의 상태 관리 없이 간단하게 사용할 때
      유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <UncontrolledDemo />
    </PreviewContainer>
    <CodeBlock code={uncontrolledCode} className="mb-10" />

    <Document.Heading2>비활성화 상태 (Disabled)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>disabled</InlineCode> prop을 사용하여 컴포넌트의 상호소작용을 막을 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />
  </section>
);

export { ExampleSection };
