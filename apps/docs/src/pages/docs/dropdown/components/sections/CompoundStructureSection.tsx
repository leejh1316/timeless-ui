import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Dropdown은 Compound Component 패턴을 따르며, 각 역할이 명확히 분리된 하위 컴포넌트들로 구성됩니다. 이를 통해 유연하고 조립 가능한
      API를 제공합니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>Root</Document.Heading3>
    <Document.Paragraph>
      Dropdown의 최상위 컨테이너로, 열림 상태(<InlineCode>open</InlineCode>)와 팝오버 로직을 관리하는 Context를 제공합니다.
    </Document.Paragraph>

    <Document.Heading3>Trigger</Document.Heading3>
    <Document.Paragraph>
      Dropdown을 열고 닫는 버튼 역할을 합니다. 기본적으로 <InlineCode>type="button"</InlineCode>으로 렌더링되며, 현재 상태에 따라{" "}
      <InlineCode>aria-expanded</InlineCode>, <InlineCode>data-state</InlineCode> 속성이 자동으로 관리됩니다.
    </Document.Paragraph>

    <Document.Heading3>Portal</Document.Heading3>
    <Document.Paragraph>
      Dropdown 컨텐츠를 <InlineCode>body</InlineCode> 등 DOM의 다른 위치로 포탈(Portal)시켜 렌더링합니다.
      <InlineCode>overflow: hidden</InlineCode> 이슈를 해결하는 데 사용됩니다.
    </Document.Paragraph>

    <Document.Heading3>View</Document.Heading3>
    <Document.Paragraph>
      실제 팝오버가 위치하는 컨테이너입니다. <InlineCode>FloatingUI</InlineCode>를 통해 위치가 계산되며, 키보드 포커스 관리(Focus Trap 등)를
      담당합니다.
      <InlineCode>z-index</InlineCode>와 같은 속성을 이 컴포넌트에 적용하는 것을 권장드립니다.
    </Document.Paragraph>

    <Document.Heading3>Content</Document.Heading3>
    <Document.Paragraph>Dropdown Item 등의 실제 메뉴 요소를 감싸는 래퍼입니다.</Document.Paragraph>

    <Document.Heading3>Item</Document.Heading3>
    <Document.Paragraph>
      각 메뉴 항목을 나타냅니다. 키보드 탐색(화살표 키)을 지원하며, 선택 시 <InlineCode>onSelect</InlineCode> 핸들러를 호출합니다.{" "}
      <InlineCode>disabled</InlineCode> 속성으로 비활성화할 수 있습니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "Dropdown.Root", desc: "상태 관리를 위한 최상위 컨텍스트 제공자" },
  { name: "Dropdown.Trigger", desc: "메뉴를 열고 닫는 트리거 버튼" },
  { name: "Dropdown.Portal", desc: "메뉴를 DOM의 상위 레이어로 포탈 렌더링" },
  { name: "Dropdown.View", desc: "위치 계산 및 포커스 관리를 담당하는 뷰포트" },
  { name: "Dropdown.Content", desc: "애니메이션 및 스타일링을 위한 내부 컨텐츠 래퍼" },
  { name: "Dropdown.Item", desc: "선택 가능한 개별 메뉴 항목" },
];

const anatomyCode = `
<Dropdown.Root>
  <Dropdown.Trigger>Optios</Dropdown.Trigger>
  <Dropdown.Portal>
    <Dropdown.View>
      <Dropdown.Content>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.View>
  </Dropdown.Portal>
</Dropdown.Root>
`;

export { CompoundStructureSection };
