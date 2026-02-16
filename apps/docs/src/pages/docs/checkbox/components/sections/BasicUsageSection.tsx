import { useState } from "react";
import { Checkbox, CheckboxState } from "@timeless-ui/react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Checkbox는 사용자가 선택 사항을 체크하거나 해제할 수 있는 인터랙티브 컴포넌트입니다. 가장 기본적인 형태는 Root, Trigger, Icon으로
      구성됩니다.
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

const BasicDemo = () => {
  const [checked, setChecked] = useState<CheckboxState>(false);

  return (
    <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
      <Checkbox.Trigger className="group flex items-center gap-1">
        <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
          <Checkbox.Icon size={14} className="text-white" />
        </div>
        <label className="text-sm text-neutral-700">동의합니다</label>
      </Checkbox.Trigger>
    </Checkbox.Root>
  );
};

/* ──────────────────────────────────────────────
   Code Snippet
   ────────────────────────────────────────────── */

const basicCode = `const BasicDemo = () => {
  const [checked, setChecked] = useState<CheckboxState>(false);

  return (
    <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
      <Checkbox.Trigger className="group flex items-center gap-1">
        <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
          <Checkbox.Icon size={14} className="text-white" />
        </div>
        <label className="text-sm text-neutral-700">동의합니다</label>
      </Checkbox.Trigger>
    </Checkbox.Root>
  );
};`;

export { BasicUsageSection };
