import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Tooltip은 Compound Component 패턴으로 설계되어 있습니다. 각 하위 컴포넌트를 조합하여 유연하고 확장 가능한 툴팁을 구성할 수 있습니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2 mt={10}>기본적인 구조</Document.Heading2>
    <Document.Paragraph mb={4}>
      Tooltip의 기본 구조는 다음과 같습니다. 트리거 요소와 툴팁 콘텐츠로 구성되며, Portal을 통해 DOM 계층 구조 외부에 렌더링됩니다.
    </Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-10" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>Tooltip.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      툴팁의 최상위 컨텍스트를 제공하는 컴포넌트입니다. 내부적으로 <InlineCode>usePopover</InlineCode> 훅을 사용하여 위치 계산, 열림/닫힘
      상태, 인터랙션 모드 등을 관리합니다. 모든 하위 컴포넌트는 이 컨텍스트를 통해 상태와 메서드를 공유합니다.
    </Document.Paragraph>

    <Document.Heading3>Tooltip.Trigger</Document.Heading3>
    <Document.Paragraph mb={6}>
      툴팁을 트리거하는 요소입니다. 기본적으로 Button 컴포넌트를 확장하며, <InlineCode>asChild</InlineCode> prop을 사용하여 커스텀 요소로
      대체할 수 있습니다. 마우스 호버, 클릭, 포커스 등 다양한 인터랙션 모드를 지원합니다.
    </Document.Paragraph>

    <Document.Heading3>Tooltip.Portal</Document.Heading3>
    <Document.Paragraph mb={6}>
      툴팁 콘텐츠를 DOM 계층 구조 외부로 렌더링하는 포털입니다. <InlineCode>z-index</InlineCode> 스택 문제를 방지하고, 오버플로우가 숨겨진
      부모 요소 내에서도 툴팁이 올바르게 표시되도록 보장합니다.
    </Document.Paragraph>

    <Document.Heading3>Tooltip.View</Document.Heading3>
    <Document.Paragraph mb={6}>
      툴팁의 위치와 트랜지션을 관리하는 플로팅 컨테이너입니다. Floating UI의 위치 계산 결과를 받아 스타일을 적용하며,{" "}
      <InlineCode>data-status</InlineCode>와 <InlineCode>data-state</InlineCode> 속성을 통해 애니메이션을 제어할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Tooltip.Content</Document.Heading3>
    <Document.Paragraph mb={6}>
      실제 툴팁 메시지를 담는 콘텐츠 영역입니다. 트랜지션 스타일이 적용되며, 열림/닫힘 상태에 따른 애니메이션을 구현할 수 있습니다.
      텍스트뿐만 아니라 아이콘, 이미지 등 다양한 콘텐츠를 포함할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Tooltip.Arrow</Document.Heading3>
    <Document.Paragraph mb={6}>
      툴팁에 화살표를 추가하는 선택적 컴포넌트입니다. Floating UI의 Arrow 미들웨어를 사용하여 자동으로 위치가 계산되며, 툴팁이 어느 방향에서
      나타나는지 시각적으로 명확하게 표시합니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "Tooltip.Root", desc: "툴팁의 상태와 컨텍스트를 관리하는 최상위 래퍼" },
  { name: "Tooltip.Trigger", desc: "툴팁을 활성화하는 트리거 요소" },
  { name: "Tooltip.Portal", desc: "툴팁을 DOM 외부로 렌더링하는 포털" },
  { name: "Tooltip.View", desc: "플로팅 위치와 트랜지션을 관리하는 컨테이너" },
  { name: "Tooltip.Content", desc: "실제 툴팁 메시지를 표시하는 콘텐츠 영역" },
  { name: "Tooltip.Arrow", desc: "툴팁에 화살표를 추가하는 선택적 컴포넌트" },
];

const anatomyCode = `<Tooltip.Root>
  {/* 트리거 요소 */}
  <Tooltip.Trigger>
    버튼 또는 커스텀 요소
  </Tooltip.Trigger>
  
  {/* 툴팁 콘텐츠 (Portal을 통해 외부 렌더링) */}
  <Tooltip.Portal>
    <Tooltip.View>
      <Tooltip.Content>
        툴팁 메시지
        <Tooltip.Arrow /> {/* 선택적 화살표 */}
      </Tooltip.Content>
    </Tooltip.View>
  </Tooltip.Portal>
</Tooltip.Root>`;

export { CompoundStructureSection };
