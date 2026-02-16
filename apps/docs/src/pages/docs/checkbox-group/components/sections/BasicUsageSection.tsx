import { Checkbox, CheckboxGroup } from "@timeless-ui/ui";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { CheckIcon } from "lucide-react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>CheckboxGroup</InlineCode>은 여러 체크박스를 그룹화하여 선택 상태를 배열 형태로 관리합니다. 각 체크박스는{" "}
      <InlineCode>value</InlineCode> 속성을 통해 고유 식별값을 가집니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Basic Demo
   ────────────────────────────────────────────── */

const CheckboxItem = ({ value, label }: { value: string; label: string }) => (
  <CheckboxGroup.Item value={value}>
    <Checkbox.Trigger className="group flex cursor-pointer items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded border border-neutral-300 bg-white transition-colors group-hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
        <Checkbox.Icon size={14} className="text-white" />
      </div>
      <span className="select-none text-sm text-neutral-700">{label}</span>
    </Checkbox.Trigger>
  </CheckboxGroup.Item>
);

const BasicDemo = () => {
  return (
    <CheckboxGroup.Root defaultValues={["apple"]} onValuesChange={(values) => console.log(values)}>
      <div className="flex flex-col gap-3">
        <CheckboxItem value="apple" label="사과" />
        <CheckboxItem value="banana" label="바나나" />
        <CheckboxItem value="orange" label="오렌지" />
      </div>
    </CheckboxGroup.Root>
  );
};

/* ──────────────────────────────────────────────
   Code Snippet
   ────────────────────────────────────────────── */

const basicCode = `import { Checkbox, CheckboxGroup } from "@timeless-ui/ui";
import { CheckIcon } from "lucide-react";

const CheckboxItem = ({ value, label }: { value: string; label: string }) => (
  <CheckboxGroup.Item value={value}>
    <Checkbox.Trigger className="group flex items-center gap-2 cursor-pointer">
      <div className="flex h-5 w-5 items-center justify-center rounded border border-neutral-300 bg-white transition-colors group-hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
        <Checkbox.Icon size={14} className="text-white" />
      </div>
      <span className="text-sm text-neutral-700 select-none">{label}</span>
    </Checkbox.Trigger>
  </CheckboxGroup.Item>
);

const BasicDemo = () => {
  return (
    <CheckboxGroup.Root defaultValues={["apple"]} onValuesChange={(values) => console.log(values)}>
      <div className="flex flex-col gap-3">
        <CheckboxItem value="apple" label="사과" />
        <CheckboxItem value="banana" label="바나나" />
        <CheckboxItem value="orange" label="오렌지" />
      </div>
    </CheckboxGroup.Root>
  );
};`;

export { BasicUsageSection };
