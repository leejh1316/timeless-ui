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
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3 mb={3}>Tabs.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      탭 컴포넌트의 최상위 컨테이너로, 전체 탭 그룹의 상태를 관리합니다. <InlineCode>value</InlineCode>와{" "}
      <InlineCode>defaultValue</InlineCode>를 통해 활성 탭을 제어하며, <InlineCode>orientation</InlineCode>으로 탭의 방향을 설정할 수
      있습니다.
    </Document.Paragraph>

    <Document.Heading3 mb={3}>Tabs.List</Document.Heading3>
    <Document.Paragraph mb={6}>
      탭 트리거들을 감싸는 컨테이너입니다. 키보드 화살표 네비게이션을 지원하며, <InlineCode>role="tablist"</InlineCode> 속성으로 접근성을
      제공합니다. List 내부에서 화살표 키를 사용하여 탭 간 이동이 가능합니다.
    </Document.Paragraph>

    <Document.Heading3 mb={3}>Tabs.Trigger</Document.Heading3>
    <Document.Paragraph mb={6}>
      개별 탭 버튼으로, 클릭 시 해당 <InlineCode>value</InlineCode>에 연결된 콘텐츠를 표시합니다. <InlineCode>data-active</InlineCode>{" "}
      속성을 통해 활성 상태를 스타일링할 수 있으며, <InlineCode>disabled</InlineCode> 속성으로 비활성화할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mb={3}>Tabs.Content</Document.Heading3>
    <Document.Paragraph mb={6}>
      각 탭에 대응하는 콘텐츠 영역입니다. <InlineCode>value</InlineCode> prop이 현재 활성 탭과 일치하면 표시되고, 그렇지 않으면 숨겨집니다.{" "}
      <InlineCode>hidden</InlineCode> 속성을 통해 DOM에는 유지되지만 화면에서는 숨겨집니다.
    </Document.Paragraph>

    <Document.Heading3 mb={3}>Tabs.Indicator</Document.Heading3>
    <Document.Paragraph mb={6}>
      활성 탭 아래에 표시되는 시각적 인디케이터입니다. 활성 탭이 변경되면 자동으로 위치와 너비가 조정되며, CSS transition을 통해 부드러운
      애니메이션을 구현할 수 있습니다. 선택적으로 사용 가능한 컴포넌트입니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "Tabs.Root", desc: "탭 그룹의 최상위 컨테이너, 상태 관리" },
  { name: "Tabs.List", desc: "탭 버튼들을 감싸는 컨테이너, 키보드 네비게이션 제공" },
  { name: "Tabs.Trigger", desc: "개별 탭 버튼, 클릭 시 콘텐츠 전환" },
  { name: "Tabs.Content", desc: "각 탭에 대응하는 콘텐츠 영역" },
  { name: "Tabs.Indicator", desc: "활성 탭을 강조하는 시각적 인디케이터 (선택사항)" },
];

const anatomyCode = `import { Tabs } from "@timeless-ui/react";

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">탭 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">탭 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  
  <Tabs.Content value="tab1">
    탭 1의 콘텐츠
  </Tabs.Content>
  
  <Tabs.Content value="tab2">
    탭 2의 콘텐츠
  </Tabs.Content>
</Tabs.Root>`;

export { CompoundStructureSection };
