import { Document } from "@src/components/ui/Document";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { InlineCode } from "@src/components/ui/InlineCode";

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Select는 Compound Component 패턴을 사용하여 여러 하위 컴포넌트를 조합해 완전한 선택 UI를 구성합니다. 각 하위 컴포넌트는 독립적으로
      스타일링할 수 있으며, 내부적으로 Context를 통해 상태를 공유합니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>
    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />
    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3 mt={6}>Select.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      Select 컴포넌트의 최상위 컨테이너로, 모든 하위 컴포넌트가 공유하는 상태(선택된 값, 열림/닫힘 상태 등)를 관리합니다. Controlled 또는
      Uncontrolled 방식을 모두 지원하며, 단일 선택과 다중 선택 모드를 제공합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Trigger</Document.Heading3>
    <Document.Paragraph mb={4}>
      드롭다운을 여는 트리거 버튼입니다. 클릭, 키보드 입력(Enter, Space, Arrow 키) 등을 통해 드롭다운을 열고 닫을 수 있습니다. 내부적으로
      Button 컴포넌트를 기반으로 하며, 접근성을 위한 ARIA 속성이 자동으로 설정됩니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Value</Document.Heading3>
    <Document.Paragraph mb={4}>
      현재 선택된 값을 표시하는 컴포넌트입니다. 선택된 값이 없을 때 표시할 <InlineCode>placeholder</InlineCode>를 설정할 수 있으며, 다중
      선택 모드에서는 선택된 값들을 쉼표로 구분하여 표시합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Icon</Document.Heading3>
    <Document.Paragraph mb={4}>
      드롭다운 상태를 나타내는 아이콘 컴포넌트입니다. 열림/닫힘 상태에 따라 <InlineCode>data-state</InlineCode> 속성이 변경되어 회전
      애니메이션 등을 적용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Portal</Document.Heading3>
    <Document.Paragraph mb={4}>
      드롭다운 메뉴를 Portal을 통해 document body에 렌더링하는 컴포넌트입니다. z-index 충돌을 방지하고, 부모 요소의 overflow 제약을 벗어나
      표시할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.View</Document.Heading3>
    <Document.Paragraph mb={4}>
      Floating UI를 통해 위치가 계산된 드롭다운 뷰 컨테이너입니다. 자동 위치 조정, 충돌 감지, 포커스 관리 등의 기능을 제공하며, 트리거
      요소에 상대적인 위치를 자동으로 계산합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Content</Document.Heading3>
    <Document.Paragraph mb={4}>
      드롭다운 메뉴의 실제 컨텐츠를 담는 컨테이너입니다. 트랜지션 애니메이션을 위한 스타일이 자동으로 적용되며, 열림/닫힘 상태에 따른
      애니메이션을 구현할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Group</Document.Heading3>
    <Document.Paragraph mb={4}>
      여러 옵션을 논리적으로 그룹화하는 컴포넌트입니다. <InlineCode>Select.Label</InlineCode>과 함께 사용하여 그룹에 제목을 부여할 수
      있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Label</Document.Heading3>
    <Document.Paragraph mb={4}>
      옵션 그룹의 레이블을 표시하는 컴포넌트입니다. <InlineCode>Select.Group</InlineCode> 내부에서 사용하여 옵션들을 구분할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Item</Document.Heading3>
    <Document.Paragraph mb={4}>
      선택 가능한 개별 옵션 아이템입니다. <InlineCode>value</InlineCode> prop을 통해 고유한 값을 지정하며, 클릭 또는 키보드 입력으로 선택할
      수 있습니다. 선택된 상태는 <InlineCode>data-state</InlineCode> 속성으로 표시됩니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Select.Arrow</Document.Heading3>
    <Document.Paragraph mb={4}>
      드롭다운 메뉴에 표시되는 화살표 요소입니다. 트리거 요소를 가리키도록 자동으로 위치가 조정됩니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "Select.Root", desc: "선택 컴포넌트의 루트 컨테이너이자 상태 관리 제공자" },
  { name: "Select.Trigger", desc: "드롭다운을 여는 트리거 버튼" },
  { name: "Select.Value", desc: "현재 선택된 값을 표시" },
  { name: "Select.Icon", desc: "드롭다운 상태를 나타내는 아이콘" },
  { name: "Select.Portal", desc: "드롭다운을 Portal로 렌더링" },
  { name: "Select.View", desc: "위치가 계산된 드롭다운 뷰 컨테이너" },
  { name: "Select.Content", desc: "드롭다운 메뉴의 실제 컨텐츠 컨테이너" },
  { name: "Select.Group", desc: "옵션들을 논리적으로 그룹화" },
  { name: "Select.Label", desc: "옵션 그룹의 레이블" },
  { name: "Select.Item", desc: "선택 가능한 개별 옵션" },
  { name: "Select.Arrow", desc: "드롭다운 메뉴의 화살표 요소" },
];

const anatomyCode = `import { Select } from "@timeless-ui/react";

function Example() {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="선택하세요" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.View>
          <Select.Content>
            <Select.Group>
              <Select.Label>그룹 제목</Select.Label>
              <Select.Item value="option1">옵션 1</Select.Item>
              <Select.Item value="option2">옵션 2</Select.Item>
            </Select.Group>
            <Select.Arrow />
          </Select.Content>
        </Select.View>
      </Select.Portal>
    </Select.Root>
  );
}`;

export { CompoundStructureSection };
