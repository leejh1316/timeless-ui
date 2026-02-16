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
      ProgressBar는 Compound Component 패턴을 사용하여 하위 컴포넌트를 조합해 사용합니다. 각 컴포넌트는 명확한 역할을 가지며, 함께 사용하여
      완전한 진행바를 구성합니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>진행바를 구성하기 위한 기본 구조는 다음과 같습니다.</Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>ProgressBar.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      진행바의 최상위 컨테이너로, Context Provider 역할을 수행합니다. <InlineCode>min</InlineCode>과 <InlineCode>max</InlineCode> 값을
      설정하여 전체 범위를 정의할 수 있으며, 하위 컴포넌트에서 이 값을 참조하여 진행률을 계산합니다. 기본적으로 접근성을 위해{" "}
      <InlineCode>role="progressbar"</InlineCode> 속성이 자동으로 적용됩니다.
    </Document.Paragraph>

    <Document.Heading3>ProgressBar.Track</Document.Heading3>
    <Document.Paragraph mb={4}>
      진행바의 배경 트랙을 나타내는 컴포넌트입니다. <InlineCode>relative</InlineCode> 포지셔닝이 기본으로 적용되어{" "}
      <InlineCode>Value</InlineCode> 컴포넌트가 내부에서 절대 위치로 배치될 수 있도록 합니다. 일반적으로 배경색과 테두리 스타일을 정의하는
      데 사용됩니다.
    </Document.Paragraph>

    <Document.Heading3>ProgressBar.Value</Document.Heading3>
    <Document.Paragraph mb={4}>
      실제 진행 상태를 시각적으로 표시하는 컴포넌트입니다. <InlineCode>value</InlineCode> prop을 통해 현재 진행값을 전달받으며, 내부에서{" "}
      <InlineCode>Root</InlineCode>의 <InlineCode>min</InlineCode>과 <InlineCode>max</InlineCode> 값을 참조하여 백분율을 계산합니다. 계산된
      백분율은 <InlineCode>width</InlineCode> 스타일로 자동 적용되며, 선택적으로 <InlineCode>getPercentValue</InlineCode> 콜백을 통해 계산된
      백분율 값을 부모 컴포넌트로 전달할 수 있습니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  {
    name: "ProgressBar.Root",
    desc: "진행바의 최상위 컨테이너이자 Context Provider",
  },
  {
    name: "ProgressBar.Track",
    desc: "진행바의 배경 트랙을 담당하는 컨테이너",
  },
  {
    name: "ProgressBar.Value",
    desc: "실제 진행 상태를 시각적으로 표시하는 요소",
  },
];

const anatomyCode = `<ProgressBar.Root min={0} max={100}>
  <ProgressBar.Track>
    <ProgressBar.Value value={currentValue} />
  </ProgressBar.Track>
</ProgressBar.Root>`;

export { CompoundStructureSection };
