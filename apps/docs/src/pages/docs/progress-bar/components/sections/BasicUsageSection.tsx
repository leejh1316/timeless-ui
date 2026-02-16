import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { ProgressBar } from "@timeless-ui/ui";
import { InlineCode } from "@src/components/ui/InlineCode";
import React, { useEffect } from "react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      ProgressBar는 작업의 진행 상태를 시각적으로 표현하는 컴포넌트입니다. <InlineCode>Root</InlineCode>, <InlineCode>Track</InlineCode>,{" "}
      <InlineCode>Value</InlineCode>를 조합하여 사용하며, <InlineCode>value</InlineCode> prop으로 진행률을 제어합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        return next > 100 ? 0 : next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full max-w-md">
      <ProgressBar.Root className="mb-4">
        <ProgressBar.Track className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <ProgressBar.Value value={progress} className="rounded-full bg-blue-500 transition-all duration-300" />
        </ProgressBar.Track>
      </ProgressBar.Root>
    </div>
  );
};

const basicCode = `const BasicDemo = () => (
  <div className="w-full max-w-md">
    <ProgressBar.Root className="mb-4">
      <ProgressBar.Track className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <ProgressBar.Value value={65} className="rounded-full bg-neutral-700 transition-all duration-300" />
      </ProgressBar.Track>
    </ProgressBar.Root>
  </div>
);`;

export { BasicUsageSection };
