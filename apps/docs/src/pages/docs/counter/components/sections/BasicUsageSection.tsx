import { Counter } from "@timeless-ui/ui";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { MinusIcon, PlusIcon } from "lucide-react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>Counter</InlineCode>는 숫자를 증가시키거나 감소시키는 기능을 제공하는 컴포넌트입니다.
      <InlineCode>minValue</InlineCode>와 <InlineCode>maxValue</InlineCode>로 범위를 제한할 수 있으며, <InlineCode>step</InlineCode>으로
      증감 단위를 설정할 수 있습니다.
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
  return (
    <Counter.Root defaultValue={0} minValue={0} maxValue={10}>
      <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
        <Counter.Decrement className="flex h-8 w-8 items-center justify-center rounded text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50">
          <MinusIcon size={16} />
        </Counter.Decrement>
        <Counter.Value className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-neutral-900" />
        <Counter.Increment className="flex h-8 w-8 items-center justify-center rounded text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50">
          <PlusIcon size={16} />
        </Counter.Increment>
      </div>
    </Counter.Root>
  );
};

/* ──────────────────────────────────────────────
   Code Snippet
   ────────────────────────────────────────────── */

const basicCode = `import { Counter } from "@timeless-ui/ui";
import { MinusIcon, PlusIcon } from "lucide-react";

const BasicDemo = () => {
  return (
    <Counter.Root defaultValue={0} minValue={0} maxValue={10}>
      <div className="flex items-center gap-3 p-1 border border-neutral-200 rounded-lg bg-white shadow-sm">
        <Counter.Decrement className="flex h-8 w-8 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <MinusIcon size={16} />
        </Counter.Decrement>
        <Counter.Value className="min-w-[2rem] text-center text-sm font-medium text-neutral-900 tabular-nums" />
        <Counter.Increment className="flex h-8 w-8 items-center justify-center rounded hover:bg-neutral-100 text-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <PlusIcon size={16} />
        </Counter.Increment>
      </div>
    </Counter.Root>
  );
};`;

export { BasicUsageSection };
