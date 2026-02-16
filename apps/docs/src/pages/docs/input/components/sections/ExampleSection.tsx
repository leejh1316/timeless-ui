import { useState } from "react";
import { Document } from "@src/components/ui/Document";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Input } from "@timeless-ui/react";
import { InlineCode } from "@src/components/ui/InlineCode";

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>

    <Document.Heading2>Clear 버튼 활용</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Input.ClearButton</InlineCode>을 사용하여 입력 값을 쉽게 초기화할 수 있습니다. 값이 있을 때만 버튼을 표시하도록 조건부
      렌더링을 활용할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ClearButtonDemo />
    </PreviewContainer>
    <CodeBlock code={clearButtonCode} className="mb-10" />

    <Document.Heading2>Controlled 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>value</InlineCode>와 <InlineCode>onValueChange</InlineCode> prop을 사용하여 외부에서 입력 값을 완전히 제어할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />
  </section>
);

const ClearButtonDemo = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm">
      <Input.Root value={value} onValueChange={setValue}>
        <Input.Label className="text-body-3 text-ink-primary mb-2 block font-medium">검색어</Input.Label>
        <div className="relative">
          <Input.Field
            type="text"
            placeholder="검색어를 입력하세요"
            className="text-body-3 w-full rounded-lg border border-neutral-300 px-3 py-2 pr-10 outline-none transition-colors focus:border-neutral-500"
          />
          {value && (
            <Input.ClearButton className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Input.ClearButton>
          )}
        </div>
      </Input.Root>
    </div>
  );
};

const clearButtonCode = `import { useState } from "react";
import { Input } from "@timeless-ui/react";

const ClearButtonDemo = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm">
      <Input.Root value={value} onValueChange={setValue}>
        <Input.Label className="text-body-3 text-ink-primary mb-2 block font-medium">검색어</Input.Label>
        <div className="relative">
          <Input.Field
            type="text"
            placeholder="검색어를 입력하세요"
            className="text-body-3 w-full rounded-lg border border-neutral-300 px-3 py-2 pr-10 outline-none transition-colors focus:border-neutral-500"
          />
          {value && (
            <Input.ClearButton className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Input.ClearButton>
          )}
        </div>
      </Input.Root>
    </div>
  );
};`;

const ControlledDemo = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm space-y-4">
      <Input.Root value={value} onValueChange={setValue}>
        <Input.Label className="text-body-3 text-ink-primary mb-2 block font-medium">제어된 입력</Input.Label>
        <Input.Field
          type="text"
          placeholder="입력하세요"
          className="text-body-3 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition-colors focus:border-neutral-500"
        />
      </Input.Root>
      <div className="text-body-3 text-ink-secondary rounded-lg bg-neutral-50 p-3">
        현재 값: <span className="font-code font-medium">{value || "(비어있음)"}</span>
      </div>
    </div>
  );
};

const controlledCode = `import { useState } from "react";
import { Input } from "@timeless-ui/react";

const ControlledDemo = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm space-y-4">
      <Input.Root value={value} onValueChange={setValue}>
        <Input.Label className="text-body-3 text-ink-primary mb-2 block font-medium">제어된 입력</Input.Label>
        <Input.Field
          type="text"
          placeholder="입력하세요"
          className="text-body-3 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none transition-colors focus:border-neutral-500"
        />
      </Input.Root>
      <div className="text-body-3 text-ink-secondary rounded-lg bg-neutral-50 p-3">
        현재 값: <span className="font-code font-medium">{value || "(비어있음)"}</span>
      </div>
    </div>
  );
};`;

export { ExampleSection };
