import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { RadioGroup } from "@timeless-ui/react";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      RadioGroup은 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼 그룹 컴포넌트입니다. <InlineCode>Root</InlineCode>,{" "}
      <InlineCode>Item</InlineCode>, <InlineCode>Indicator</InlineCode>를 조합하여 사용하며, 각 항목은 고유한 <InlineCode>value</InlineCode>
      를 가집니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup.Root value={value} onValueChange={setValue} className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="option1"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">옵션 1</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="option2"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">옵션 2</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="option3"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">옵션 3</span>
      </label>
    </RadioGroup.Root>
  );
};

const basicCode = `const BasicDemo = () => {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup.Root value={value} onValueChange={setValue} className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item value="option1" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">옵션 1</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item value="option2" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">옵션 2</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item value="option3" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">옵션 3</span>
      </label>
    </RadioGroup.Root>
  );
};`;

export { BasicUsageSection };
