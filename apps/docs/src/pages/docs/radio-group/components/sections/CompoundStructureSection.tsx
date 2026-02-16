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
      RadioGroup은 Compound Component 패턴을 사용하여 하위 컴포넌트를 조합해 사용합니다. 각 컴포넌트는 명확한 역할을 가지며, 함께 사용하여
      완전한 라디오 버튼 그룹을 구성합니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>라디오 그룹을 구성하기 위한 기본 구조는 다음과 같습니다.</Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>RadioGroup.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      라디오 그룹의 최상위 컨테이너로, Context Provider 역할을 수행합니다. <InlineCode>value</InlineCode>와{" "}
      <InlineCode>onValueChange</InlineCode>를 통해 선택된 값을 관리하며, <InlineCode>name</InlineCode>, <InlineCode>disabled</InlineCode>,{" "}
      <InlineCode>readOnly</InlineCode>, <InlineCode>required</InlineCode> 등의 공통 속성을 하위 컴포넌트에 전달합니다. 키보드 네비게이션을
      위한 화살표 키 지원이 내장되어 있으며, 기본적으로 <InlineCode>role="radiogroup"</InlineCode> 속성이 자동으로 적용됩니다.
    </Document.Paragraph>

    <Document.Heading3>RadioGroup.Item</Document.Heading3>
    <Document.Paragraph mb={4}>
      개별 라디오 버튼을 나타내는 컴포넌트입니다. 각 항목은 고유한 <InlineCode>value</InlineCode>를 가지며, 클릭 시{" "}
      <InlineCode>Root</InlineCode>의 <InlineCode>onValueChange</InlineCode> 콜백을 호출하여 선택 상태를 변경합니다. 접근성을 위해{" "}
      <InlineCode>role="radio"</InlineCode> 속성과 함께 숨겨진 네이티브 radio input을 포함하고 있어 폼 제출 시 정상적으로 동작합니다.{" "}
      <InlineCode>data-state</InlineCode> 속성을 통해 현재 선택 상태를 스타일링할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>RadioGroup.Indicator</Document.Heading3>
    <Document.Paragraph mb={4}>
      라디오 버튼의 체크 상태를 시각적으로 표시하는 컴포넌트입니다. <InlineCode>Item</InlineCode> 내부에서 사용되며,{" "}
      <InlineCode>data-state</InlineCode> 속성을 통해 체크 여부에 따라 다른 스타일을 적용할 수 있습니다. 선택적으로{" "}
      <InlineCode>children</InlineCode>을 함수로 전달하여 체크 상태에 따라 동적으로 렌더링할 수도 있습니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  {
    name: "RadioGroup.Root",
    desc: "라디오 그룹의 최상위 컨테이너이자 Context Provider",
  },
  {
    name: "RadioGroup.Item",
    desc: "개별 라디오 버튼을 담당하는 요소",
  },
  {
    name: "RadioGroup.Indicator",
    desc: "체크 상태를 시각적으로 표시하는 요소",
  },
];

const anatomyCode = `<RadioGroup.Root value={selectedValue} onValueChange={setSelectedValue}>
  <RadioGroup.Item value="option1">
    <RadioGroup.Indicator />
  </RadioGroup.Item>
  <RadioGroup.Item value="option2">
    <RadioGroup.Indicator />
  </RadioGroup.Item>
</RadioGroup.Root>`;

export { CompoundStructureSection };
