import { InView } from "@timeless-ui/ui";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      InView 컴포넌트는 요소가 뷰포트에 들어오거나 나갈 때를 감지하여 동작을 수행할 수 있게 합니다. 스크롤을 통해 박스가 화면에 보이는지
      확인해보세요.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Demo Component & Code
   ────────────────────────────────────────────── */

const BasicDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
    <div className="h-100" />
    <InView>
      {({ isVisible }) => (
        <div
          className={`mx-auto w-64 rounded-lg p-6 text-center transition-all duration-500 ${
            isVisible ? "bg-neutral-800 text-white opacity-100" : "bg-neutral-200 text-neutral-500 opacity-50"
          }`}
        >
          {isVisible ? "화면에 보입니다!" : "스크롤해서 찾아보세요"}
        </div>
      )}
    </InView>
    <div className="h-100" />
  </div>
);

const basicCode = `import { InView } from "@timeless-ui/ui";

const BasicDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
    <div className="h-64" />
    <InView>
      {({ isVisible }) => (
        <div
          className={\`mx-auto w-64 rounded-lg p-6 text-center transition-all duration-500 \${
            isVisible ? "bg-neutral-800 text-white opacity-100" : "bg-neutral-200 text-neutral-500 opacity-50"
          }\`}
        >
          {isVisible ? "화면에 보입니다!" : "스크롤해서 찾아보세요"}
        </div>
      )}
    </InView>
    <div className="h-100" />
  </div>
);`;

export { BasicUsageSection };
