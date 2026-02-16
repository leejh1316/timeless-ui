import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      TOC는 Compound Component 패턴을 사용하여 각 하위 컴포넌트가 명확한 역할을 가지며, 자유롭게 조합할 수 있습니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3 mb={3}>TOC.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      목차 시스템의 최상위 컨테이너로, heading 요소 탐색과 상태 관리를 담당합니다. <InlineCode>targetElement</InlineCode>를 통해 스캔할
      영역을 지정하고, <InlineCode>searchTags</InlineCode>로 탐색할 heading 태그를 설정할 수 있습니다. 기본적으로 h2부터 h6까지 자동으로
      스캔하며, MutationObserver를 사용하여 DOM 변경 시 자동으로 업데이트됩니다.
    </Document.Paragraph>

    <Document.Heading3 mb={3}>TOC.Observer</Document.Heading3>
    <Document.Paragraph mb={6}>
      IntersectionObserver를 사용하여 현재 뷰포트에 보이는 섹션을 추적합니다. <InlineCode>rootMargin</InlineCode>과{" "}
      <InlineCode>threshold</InlineCode> 등의 IntersectionObserver 옵션을 설정할 수 있으며, 가장 상단에 위치한 보이는 항목을 활성 항목으로
      설정합니다. 렌더링 결과물이 없는 컴포넌트입니다.
    </Document.Paragraph>

    <Document.Heading3 mb={3}>TOC.Content</Document.Heading3>
    <Document.Paragraph mb={6}>
      발견된 목차 항목들을 렌더링하는 컴포넌트입니다. render function을 children으로 받아 각 항목의 표시 방식을 자유롭게 커스터마이징할 수
      있습니다. render function은 <InlineCode>TOCItem</InlineCode> 객체와 현재 활성화된 항목의 ID를 인자로 받아 원하는 형태의 UI를 반환할 수
      있습니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "TOC.Root", desc: "최상위 컨테이너, heading 스캔 및 상태 관리" },
  { name: "TOC.Observer", desc: "현재 보이는 섹션 추적 (IntersectionObserver)" },
  { name: "TOC.Content", desc: "목차 항목 렌더링 (render function 패턴)" },
];

const anatomyCode = `import { TOC } from "@timeless-ui/ui";

<TOC.Root targetElement={contentRef.current}>
  <nav>
    <TOC.Content>
      {(item, activeId) => (
        <a
          key={item.id}
          href={\`#\${item.id}\`}
          className={item.id === activeId ? "active" : ""}
        >
          {item.text}
        </a>
      )}
    </TOC.Content>
  </nav>
  <TOC.Observer />
</TOC.Root>`;

export { CompoundStructureSection };
