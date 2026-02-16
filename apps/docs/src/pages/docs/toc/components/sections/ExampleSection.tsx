import { useRef, useState } from "react";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { TOC, TOCItem } from "@timeless-ui/react";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    <Document.Heading2>계층 구조가 있는 목차</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>level</InlineCode> 속성을 활용하여 h2, h3 등 다양한 heading 레벨을 시각적으로 구분할 수 있습니다. 들여쓰기를 통해 계층
      구조를 표현할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <HierarchicalDemo />
    </PreviewContainer>
    <CodeBlock code={hierarchicalCode} className="mb-10" />

    <Document.Heading2>커스텀 태그 스캔</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>searchTags</InlineCode> prop을 사용하여 특정 heading 태그만 스캔할 수 있습니다. h1 태그를 포함하거나 특정 레벨만 선택할 수
      있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CustomTagsDemo />
    </PreviewContainer>
    <CodeBlock code={customTagsCode} className="mb-10" />

    <Document.Heading2>활성 항목 변경 감지</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>onActiveItemChange</InlineCode> 콜백을 사용하여 사용자가 스크롤할 때 현재 보이는 섹션 정보를 추적할 수 있습니다. 분석이나
      추가 동작에 활용할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ActiveItemCallbackDemo />
    </PreviewContainer>
    <CodeBlock code={activeItemCallbackCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Hierarchical Demo
   ────────────────────────────────────────────── */

const HierarchicalDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex w-full max-w-4xl gap-8">
      <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="space-y-6 p-4">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">시작하기</h2>
            <h3 className="mb-2 text-base font-medium text-neutral-800">설치</h3>
            <p className="text-sm text-neutral-600">패키지를 설치하세요.</p>
            <h3 className="mb-2 text-base font-medium text-neutral-800">기본 설정</h3>
            <p className="text-sm text-neutral-600">기본 설정을 진행하세요.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">고급 기능</h2>
            <h3 className="mb-2 text-base font-medium text-neutral-800">커스터마이징</h3>
            <p className="text-sm text-neutral-600">고급 옵션을 활용하세요.</p>
          </section>
        </div>
      </div>
      {contentRef && (
        <TOC.Root targetElement={contentRef}>
          <nav className="w-56">
            <p className="mb-2 text-sm font-semibold text-neutral-900">목차</p>
            <TOC.Content>
              {(item, activeId) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
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

const hierarchicalCode = `import { useState } from "react";
import { TOC } from "@timeless-ui/react";

const HierarchicalDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex w-full max-w-4xl gap-8">
      <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="space-y-6 p-4">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">시작하기</h2>
            <h3 className="mb-2 text-base font-medium text-neutral-800">설치</h3>
            <p className="text-sm text-neutral-600">패키지를 설치하세요.</p>
            <h3 className="mb-2 text-base font-medium text-neutral-800">기본 설정</h3>
            <p className="text-sm text-neutral-600">기본 설정을 진행하세요.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">고급 기능</h2>
            <h3 className="mb-2 text-base font-medium text-neutral-800">커스터마이징</h3>
            <p className="text-sm text-neutral-600">고급 옵션을 활용하세요.</p>
          </section>
        </div>
      </div>
      <TOC.Root targetElement={contentRef}>
        <nav className="w-56">
          <p className="mb-2 text-sm font-semibold text-neutral-900">목차</p>
          <TOC.Content>
            {(item, activeId) => (
              <a
                key={item.id}
                href={\`#\${item.id}\`}
                style={{ paddingLeft: \`\${(item.level - 2) * 12}px\` }}
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

/* ──────────────────────────────────────────────
   Custom Tags Demo
   ────────────────────────────────────────────── */

const CustomTagsDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex w-full max-w-4xl gap-8">
      <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="space-y-8 p-4">
          <section>
            <h1 className="mb-2 text-xl font-bold text-neutral-900">문서 제목</h1>
            <p className="text-sm text-neutral-600">h1 태그도 스캔됩니다.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">개요</h2>
            <p className="text-sm text-neutral-600">h2 태그가 스캔됩니다.</p>
          </section>
          <section>
            <div data-title className="mb-2 text-base font-medium text-neutral-800">
              상세 내용
            </div>
            <p className="text-sm text-neutral-600">[data-title] 속성이 스캔됩니다. </p>
          </section>
        </div>
      </div>
      {contentRef && (
        <TOC.Root targetElement={contentRef} searchTags={["h1", "h2", "[data-title]"]}>
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

const customTagsCode = `import { useState } from "react";
import { TOC } from "@timeless-ui/react";

const CustomTagsDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  return (
    <div className="flex w-full max-w-4xl gap-8">
      <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="space-y-8 p-4">
          <section>
            <h1 className="mb-2 text-xl font-bold text-neutral-900">문서 제목</h1>
            <p className="text-sm text-neutral-600">h1 태그도 스캔됩니다.</p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">개요</h2>
            <p className="text-sm text-neutral-600">h2 태그가 스캔됩니다.</p>
          </section>
          <section>
            <div data-title className="mb-2 text-base font-medium text-neutral-800">상세 내용</div>
            <p className="text-sm text-neutral-600">[data-title] 속성이 스캔됩니다.</p>
          </section>
        </div>
      </div>
      <TOC.Root targetElement={contentRef} searchTags={["h1", "h2", "[data-title]"]}>
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

/* ──────────────────────────────────────────────
   Active Item Callback Demo
   ────────────────────────────────────────────── */

const ActiveItemCallbackDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<TOCItem | null>(null);

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-4 rounded-lg bg-neutral-100 p-3">
        <p className="text-sm text-neutral-700">
          현재 보고 있는 섹션: <span className="font-semibold">{activeSection?.text || "없음"}</span>
        </p>
      </div>
      <div className="flex gap-8">
        <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
          <div className="space-y-8 p-4">
            <section className="h-[500px]">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">첫 번째 섹션</h2>
              <p className="text-sm text-neutral-600">스크롤하면 활성 섹션이 변경됩니다.</p>
            </section>
            <section className="h-[500px]">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">두 번째 섹션</h2>
              <p className="text-sm text-neutral-600">콜백이 호출됩니다.</p>
            </section>
            <section className="h-[500px]">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">세 번째 섹션</h2>
              <p className="text-sm text-neutral-600">섹션 정보를 추적할 수 있습니다.</p>
            </section>
          </div>
        </div>
        {contentRef && (
          <TOC.Root
            targetElement={contentRef}
            onActiveItemChange={(item) => {
              console.log("활성 섹션 변경:", item);
              setActiveSection(item);
            }}
          >
            <nav className="w-48">
              <p className="mb-2 text-sm font-semibold text-neutral-900">목차</p>
              <TOC.Content>
                {(item, activeId) => (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.element && contentRef) {
                        const elementTop = item.element.getBoundingClientRect().top;
                        const containerTop = contentRef.getBoundingClientRect().top;
                        const scrollTop = elementTop - containerTop + contentRef.scrollTop;
                        contentRef.scrollTo({
                          top: scrollTop,
                          behavior: "smooth",
                        });
                      }
                    }}
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-1 text-sm ${item.id === activeId ? "font-medium text-neutral-900" : "text-neutral-600"}`}
                  >
                    {item.text}
                  </a>
                )}
              </TOC.Content>
            </nav>
            <TOC.Observer root={contentRef} />
          </TOC.Root>
        )}
      </div>
    </div>
  );
};

const activeItemCallbackCode = `import { useState } from "react";
import { TOC } from "@timeless-ui/react";

const ActiveItemCallbackDemo = () => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-4 rounded-lg bg-neutral-100 p-3">
        <p className="text-sm text-neutral-700">
          현재 보고 있는 섹션: <span className="font-semibold">{activeSection || "없음"}</span>
        </p>
      </div>
      <div className="flex gap-8">
        <div ref={setContentRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "400px" }}>
          <div className="space-y-8 p-4">
            <section className="h-[500px]">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">첫 번째 섹션</h2>
              <p className="text-sm text-neutral-600">스크롤하면 활성 섹션이 변경됩니다.</p>
            </section>
            <section className="h-[500px]">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">두 번째 섹션</h2>
              <p className="text-sm text-neutral-600">콜백이 호출됩니다.</p>
            </section>
            <section className="h-[500px]">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">세 번째 섹션</h2>
              <p className="text-sm text-neutral-600">섹션 정보를 추적할 수 있습니다.</p>
            </section>
          </div>
        </div>
        <TOC.Root
          targetElement={contentRef}
          onActiveItemChange={(item) => setActiveSection(item.text)}
        >
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
    </div>
  );
}`;

export { ExampleSection };
