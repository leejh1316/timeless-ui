import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const anatomyItems = [
  { name: "Popover.Root", desc: "팝오버의 상태와 컨텍스트를 관리하는 최상위 컴포넌트" },
  { name: "Popover.Trigger", desc: "팝오버를 트리거하는 버튼 컴포넌트" },
  { name: "Popover.Portal", desc: "팝오버 컨텐츠를 DOM 트리의 body로 포탈링하는 컴포넌트" },
  { name: "Popover.View", desc: "팝오버의 위치와 스타일을 관리하는 래퍼 컴포넌트" },
  { name: "Popover.Content", desc: "실제 팝오버 컨텐츠를 담는 컨테이너이며 트랜지션 효과를 적용하는 컴포넌트" },
];

const anatomyCode = `import { Popover } from "@timeless-ui/ui";

<Popover.Root>
  <Popover.Trigger>트리거 버튼</Popover.Trigger>
  <Popover.Portal>
    <Popover.View>
      <Popover.Content>
        {/* 팝오버 컨텐츠 */}
      </Popover.Content>
    </Popover.View>
  </Popover.Portal>
</Popover.Root>`;

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Popover는 Compound Component 패턴을 따르며, 여러 하위 컴포넌트를 조합하여 유연하게 구성할 수 있습니다. 각 하위 컴포넌트는 독립적인
      역할을 가지며, 필요에 따라 선택적으로 사용할 수 있습니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>Popover.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      팝오버의 상태와 컨텍스트를 관리하는 최상위 래퍼입니다. 모든 하위 컴포넌트는 이 컴포넌트 내부에 위치해야 하며,{" "}
      <InlineCode>triggerMode</InlineCode>, <InlineCode>placement</InlineCode>, <InlineCode>open</InlineCode> 등의 속성으로 팝오버의 동작을
      제어할 수 있습니다. <InlineCode>middlewareOptions</InlineCode>와 <InlineCode>interactionOptions</InlineCode>를 통해 위치 조정 및
      상호작용 방식을 세밀하게 설정할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Popover.Trigger</Document.Heading3>
    <Document.Paragraph mb={6}>
      팝오버를 활성화하는 트리거 역할을 하는 버튼입니다. <InlineCode>triggerMode</InlineCode>에 따라 클릭, 호버, 포커스 등 다양한 방식으로
      팝오버를 열 수 있습니다. Button 컴포넌트를 기반으로 하여 모든 버튼 속성을 지원하며, 접근성을 위한 적절한 ARIA 속성이 자동으로
      설정됩니다.
    </Document.Paragraph>

    <Document.Heading3>Popover.Portal</Document.Heading3>
    <Document.Paragraph mb={6}>
      팝오버 컨텐츠를 DOM 트리의 body로 포탈링합니다. 이를 통해 z-index 문제를 해결하고, 팝오버가 항상 최상위 레이어에 표시되도록
      보장합니다. <InlineCode>container</InlineCode> 속성으로 포탈 대상을 변경할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Popover.View</Document.Heading3>
    <Document.Paragraph mb={6}>
      팝오버의 위치를 관리하는 래퍼 컴포넌트입니다. Floating UI를 기반으로 자동 위치 조정, flip, shift 등의 기능을 제공합니다.{" "}
      <InlineCode>isMounted</InlineCode> 상태에 따라 조건부로 렌더링되며, 위치 계산을 위한 스타일이 자동으로 적용됩니다.
    </Document.Paragraph>

    <Document.Heading3>Popover.Content</Document.Heading3>
    <Document.Paragraph mb={6}>
      실제 팝오버의 컨텐츠를 담는 컨테이너입니다. 트랜지션 효과가 자동으로 적용되며, <InlineCode>data-status</InlineCode> 속성을 통해 현재
      트랜지션 상태를 CSS로 제어할 수 있습니다. 페이드 인/아웃 및 스케일 애니메이션이 기본적으로 적용됩니다.
    </Document.Paragraph>
  </section>
);

export { CompoundStructureSection };
