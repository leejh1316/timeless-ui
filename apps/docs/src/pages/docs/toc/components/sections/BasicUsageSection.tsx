import { useRef, useState } from "react";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { TOC } from "@timeless-ui/ui";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      TOC 컴포넌트는 페이지의 heading 요소를 자동으로 감지하여 목차를 생성하고, 현재 보이는 섹션을 추적합니다. 기본적으로 Root, Observer,
      Content로 구성됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex w-full max-w-4xl gap-8">
      <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="space-y-8 p-4">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">소개</h2>
            <p className="text-sm text-neutral-600">이것은 첫 번째 섹션입니다.</p>
            <p className="text-sm text-neutral-600">목차를 통해 이동할 수 있습니다.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">기능</h2>
            <p className="text-sm text-neutral-600">두 번째 섹션의 내용입니다.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">사용법</h2>
            <p className="text-sm text-neutral-600">세 번째 섹션의 내용입니다.</p>
          </section>
        </div>
      </div>
      {contentRef && (
        <TOC.Root targetElement={contentRef}>
          <nav className="w-48">
            <p className="mb-2 text-sm font-semibold text-neutral-900">목차</p>
            <TOC.Content>
              {(item, activeId) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block py-1 text-sm ${item.id === activeId ? "font-medium text-neutral-900" : "text-neutral-600"}`}
                >
                  {item.text}
                </a>
              )}
            </TOC.Content>
          </nav>
          <TOC.Observer />
        </TOC.Root>
      )}
    </div>
  );
};

const basicCode = `import { useRef } from "react";
import { TOC } from "@timeless-ui/ui";

const BasicDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex w-full max-w-4xl gap-8">
      <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="space-y-8 p-4">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">소개</h2>
            <p className="text-sm text-neutral-600">이것은 첫 번째 섹션입니다.</p>
            <p className="text-sm text-neutral-600">목차를 통해 이동할 수 있습니다.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">기능</h2>
            <p className="text-sm text-neutral-600">두 번째 섹션의 내용입니다.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">사용법</h2>
            <p className="text-sm text-neutral-600">세 번째 섹션의 내용입니다.</p>
          </section>
        </div>
      </div>
      <TOC.Root targetElement={contentRef}>
        <nav className="w-48">
          <p className="mb-2 text-sm font-semibold text-neutral-900">목차</p>
          <TOC.Content>
            {(item, activeId) => (
              <a
                key={item.id}
                href={\`#\${item.id}\`}
                className={\`block py-1 text-sm \${
                  item.id === activeId ? "font-medium text-neutral-900" : "text-neutral-600"
                }\`}
              >
                {item.text}
              </a>
            )}
          </TOC.Content>
        </nav>
        <TOC.Observer />
      </TOC.Root>
    </div>
  );
}`;

export { BasicUsageSection };
