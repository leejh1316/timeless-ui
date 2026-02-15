import { Button } from "@timeless-ui/ui";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicDemo = () => {
  return (
    <Button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-lg px-6 py-2.5 font-semibold text-white transition-colors">
      버튼
    </Button>
  );
};

const basicCode = `import { Button } from "@timeless-ui/ui";

const BasicDemo = () => {
  return (
    <Button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-lg px-6 py-2.5 font-semibold text-white transition-colors">
      버튼
    </Button>
  );
};`;

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Button은 사용자의 클릭 인터랙션을 처리하는 기본 컴포넌트입니다. 접근성을 준수하며 loading, disabled, pressed 상태를 자동으로
      관리합니다. Primitive 컴포넌트를 기반으로 하여 모든 HTML button 속성을 지원합니다.
    </Document.Paragraph>

    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} />
  </section>
);

export { BasicUsageSection };
