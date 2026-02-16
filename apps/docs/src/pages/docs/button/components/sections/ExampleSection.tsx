import { useState } from "react";
import { Button } from "@timeless-ui/react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

// ─── Loading Demo ───
const LoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Button
      loading={isLoading}
      onClick={handleClick}
      className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>처리 중...</span>
        </div>
      ) : (
        "클릭하세요"
      )}
    </Button>
  );
};

const loadingCode = `import { useState } from "react";
import { Button } from "@timeless-ui/react";

const LoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Button
      loading={isLoading}
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 disabled:cursor-not-allowed rounded-lg px-6 py-2.5 font-semibold text-white transition-colors"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>처리 중...</span>
        </div>
      ) : (
        "클릭하세요"
      )}
    </Button>
  );
};`;

// ─── Disabled Demo ───
const DisabledDemo = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="bg-primary-500 hover:bg-primary-600 rounded-lg px-6 py-2.5 font-semibold text-white transition-colors">
        활성화된 버튼
      </Button>
      <Button
        disabled
        className="cursor-not-allowed rounded-lg bg-neutral-300 px-6 py-2.5 font-semibold text-neutral-500 transition-colors"
      >
        비활성화된 버튼
      </Button>
    </div>
  );
};

const disabledCode = `import { Button } from "@timeless-ui/react";

const DisabledDemo = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-2.5 font-semibold text-white transition-colors">
        활성화된 버튼
      </Button>
      <Button
        disabled
        className="bg-neutral-300 cursor-not-allowed rounded-lg px-6 py-2.5 font-semibold text-neutral-500 transition-colors"
      >
        비활성화된 버튼
      </Button>
    </div>
  );
};`;

// ─── Pressed State Demo ───
const PressedDemo = () => {
  return (
    <Button className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 data-[pressed=true]:scale-95">
      눌러보세요
    </Button>
  );
};

const pressedCode = `import { Button } from "@timeless-ui/react";

const PressedDemo = () => {
  return (
    <Button className="bg-blue-600 hover:bg-blue-700 data-[pressed=true]:scale-95 rounded-lg px-6 py-2.5 font-semibold text-white transition-all">
      눌러보세요
    </Button>
  );
};`;

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      Button 컴포넌트의 다양한 상태를 활용하는 방법을 소개합니다. loading, disabled, pressed 상태를 통해 사용자에게 명확한 피드백을 제공할
      수 있습니다.
    </Document.Paragraph>

    <Document.Heading2>Loading 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>loading</InlineCode> prop을 true로 설정하면 버튼이 자동으로 비활성화됩니다. 비동기 작업 처리 중임을 사용자에게 알리기 위해
      로딩 인디케이터와 함께 사용하세요. <InlineCode>data-loading</InlineCode> 속성으로 스타일을 제어할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <LoadingDemo />
    </PreviewContainer>
    <CodeBlock code={loadingCode} className="mb-10" />

    <Document.Heading2>Disabled 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>disabled</InlineCode> prop을 사용하여 버튼을 비활성화할 수 있습니다. 비활성화된 버튼은 클릭 이벤트가 발생하지 않으며,{" "}
      <InlineCode>data-disabled</InlineCode> 속성이 자동으로 추가됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />

    <Document.Heading2>Pressed 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      버튼을 누르고 있는 동안 <InlineCode>data-pressed</InlineCode> 속성이 자동으로 true가 됩니다. CSS 선택자로 pressed 상태의 스타일을
      지정하여 시각적 피드백을 제공할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <PressedDemo />
    </PreviewContainer>
    <CodeBlock code={pressedCode} />
  </section>
);

export { ExampleSection };
