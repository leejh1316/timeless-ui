import { Document } from "@src/components/ui/Document";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard.tsx";

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Accordion은 Compound Component 패턴을 사용하여 유연한 구조를 제공합니다. 각 하위 컴포넌트는 특정한 역할을 수행하며, 필요에 따라
      자유롭게 조합하여 사용할 수 있습니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>
    <div className="space-y-4">
      <div>
        <Document.Heading3>Accordion.Root</Document.Heading3>
        <Document.Paragraph>
          Accordion의 상태(열림/닫힘)를 관리하는 최상위 컨테이너입니다. `type`(single/multiple), `collapsible`, `disabled` 등의 속성을 통해
          전체적인 동작 방식을 제어합니다.
        </Document.Paragraph>
      </div>
      <div>
        <Document.Heading3>Accordion.Item</Document.Heading3>
        <Document.Paragraph>
          하나의 접이식 섹션을 감싸는 컨테이너입니다. `value` prop을 통해 각 항목을 고유하게 식별합니다.
        </Document.Paragraph>
      </div>
      <div>
        <Document.Heading3>Accordion.Header</Document.Heading3>
        <Document.Paragraph>
          Trigger 버튼을 감싸는 헤더 요소입니다. 접근성을 위해 적절한 heading level(h1~h6)을 사용하는 것이 좋으며, 기본값은 `h3`입니다.
        </Document.Paragraph>
      </div>
      <div>
        <Document.Heading3>Accordion.Trigger</Document.Heading3>
        <Document.Paragraph>
          접이식 섹션을 열거나 닫는 버튼입니다. `Accordion.Header` 내부에서 사용되며, 클릭 시 해당 Item의 상태를 토글합니다.
        </Document.Paragraph>
      </div>
      <div>
        <Document.Heading3>Accordion.Content</Document.Heading3>
        <Document.Paragraph>실제로 보여지거나 숨겨지는 내용이 담기는 영역입니다.</Document.Paragraph>
      </div>
    </div>
  </section>
);

const anatomyItems = [
  { name: "Accordion.Root", desc: "상태 관리를 담당하는 최상위 컨테이너" },
  { name: "Accordion.Item", desc: "개별 접이식 항목의 래퍼" },
  { name: "Accordion.Header", desc: "Trigger를 감싸는 헤더 (접근성)" },
  { name: "Accordion.Trigger", desc: "항목을 열고 닫는 버튼" },
  { name: "Accordion.Content", desc: "숨겨지거나 표시되는 내용" },
];

const anatomyCode = `import { Accordion } from "@timeless-ui/ui";

<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Item 1</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      Content 1
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
`;

export { CompoundStructureSection };
