import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const anatomyItems = [
  { name: "Collapsible.Root", desc: "확장 상태를 관리하고 하위 컴포넌트들에게 컨텍스트를 제공하는 최상위 컴포넌트입니다." },
  { name: "Collapsible.Trigger", desc: "컨텐츠의 확장 상태를 토글하는 버튼입니다." },
  { name: "Collapsible.Content", desc: "확장 상태에 따라 조건부로 렌더링되는 컨텐츠 영역입니다." },
];

const anatomyCode = `<Collapsible.Root>
  <div>
    <h4>헤더</h4>
    <Collapsible.Trigger>토글</Collapsible.Trigger>
  </div>
  <Collapsible.Content>
    컨텐츠 내용
  </Collapsible.Content>
</Collapsible.Root>`;

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>Collapsible</InlineCode>은 간단하고 유연한 구조로 구성된 Compound Component입니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>
    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />
  </section>
);

export { CompoundStructureSection };
