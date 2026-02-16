import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Breakpoint } from "@timeless-ui/react";

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      가장 기본적인 Breakpoint 사용 예시입니다. 화면 크기에 따라 조건부로 콘텐츠를 렌더링합니다. 브라우저 창 크기를 조절하면 각 조건에 맞는
      요소만 표시됩니다. <code className="font-code rounded-md bg-neutral-100 px-1.5 py-0.5 text-blue-600">up</code>은 지정한 브레이크포인트
      이상, <code className="font-code rounded-md bg-neutral-100 px-1.5 py-0.5 text-blue-600">down</code>은 미만,
      <code className="font-code rounded-md bg-neutral-100 px-1.5 py-0.5 text-blue-600">only</code>는 해당 범위에서만 렌더링됩니다.
    </Document.Paragraph>

    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>

    <CodeBlock code={basicCode} />
  </section>
);

/* ──────────────────────────────────────────────
   Demo: Basic Breakpoint
   ────────────────────────────────────────────── */

const BasicDemo = () => (
  <div className="w-full space-y-3">
    <Breakpoint up="md">
      <div className="rounded-lg bg-neutral-100 p-4">
        <p className="text-sm font-medium">✓ md 이상 (≥768px)</p>
      </div>
    </Breakpoint>

    <Breakpoint down="md">
      <div className="rounded-lg bg-neutral-100 p-4">
        <p className="text-sm font-medium">✓ md 미만 ({"<"}768px)</p>
      </div>
    </Breakpoint>

    <Breakpoint only="lg">
      <div className="rounded-lg bg-neutral-100 p-4">
        <p className="text-sm font-medium">✓ lg만 (1024px ~ 1279px)</p>
      </div>
    </Breakpoint>
  </div>
);

/* ──────────────────────────────────────────────
   Code Snippets
   ────────────────────────────────────────────── */

const basicCode = `<Breakpoint up="md">
  <div className="rounded-lg bg-neutral-100 p-4">
    <p className="text-sm font-medium">✓ md 이상 (≥768px)</p>
  </div>
</Breakpoint>

<Breakpoint down="md">
  <div className="rounded-lg bg-neutral-100 p-4">
    <p className="text-sm font-medium">✓ md 미만 ({"<"}768px)</p>
  </div>
</Breakpoint>

<Breakpoint only="lg">
  <div className="rounded-lg bg-neutral-100 p-4">
    <p className="text-sm font-medium">✓ lg만 (1024px ~ 1279px)</p>
  </div>
</Breakpoint>`;

export { BasicUsageSection };
