import { CodeBlock } from "@src/components/common/CodeBlock";
import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Checkbox는 Compound Component 패턴을 사용하여 설계되었습니다. 각 하위 컴포넌트는 명확한 역할을 가지며, 조합을 통해 유연한
      커스터마이징이 가능합니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>Checkbox의 기본 구조는 다음과 같습니다. 각 컴포넌트는 독립적으로 스타일링할 수 있습니다.</Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3 mt={6}>Checkbox.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      전체 체크박스의 상태를 관리하는 루트 컴포넌트입니다. <InlineCode>checked</InlineCode>와 <InlineCode>onCheckedChange</InlineCode>를
      통해 제어형(Controlled) 또는 비제어형(Uncontrolled) 방식으로 사용할 수 있으며, 내부적으로 숨겨진 네이티브 input 요소를 렌더링하여 폼
      제출 시 값을 전달합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Checkbox.Trigger</Document.Heading3>
    <Document.Paragraph mb={4}>
      사용자가 클릭하여 체크 상태를 토글하는 인터랙티브 버튼입니다. <InlineCode>data-state</InlineCode> 속성을 통해 현재 상태에 따른
      스타일링이 가능하며, 키보드 접근성(Space, Enter)을 자동으로 지원합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Checkbox.Icon</Document.Heading3>
    <Document.Paragraph mb={4}>
      체크 상태일 때 표시되는 체크마크 아이콘입니다. SVG path 애니메이션을 통해 부드러운 체크 효과를 제공하며, <InlineCode>size</InlineCode>{" "}
      prop으로 크기를 조절할 수 있습니다. 체크되지 않은 상태에서는 자동으로 숨겨집니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Checkbox.State</Document.Heading3>
    <Document.Paragraph mb={4}>
      렌더 프롭 패턴을 통해 현재 체크 상태에 따라 조건부 렌더링을 수행할 수 있는 컴포넌트입니다. 체크 상태에 따라 다른 UI를 표시해야 할 때
      유용합니다.
    </Document.Paragraph>
  </section>
);

/* ──────────────────────────────────────────────
   Anatomy Data
   ────────────────────────────────────────────── */

const anatomyItems = [
  {
    name: "Checkbox.Root",
    desc: "체크박스의 상태를 관리하고 Context를 제공하는 루트 컴포넌트",
  },
  {
    name: "Checkbox.Trigger",
    desc: "사용자 인터랙션을 처리하는 클릭 가능한 버튼 영역",
  },
  {
    name: "Checkbox.Icon",
    desc: "체크 상태를 시각적으로 표현하는 아이콘 컴포넌트",
  },
  {
    name: "Checkbox.State",
    desc: "체크 상태에 따른 조건부 렌더링을 위한 컴포넌트",
  },
];

/* ──────────────────────────────────────────────
   Anatomy Code
   ────────────────────────────────────────────── */

const anatomyCode = `<Checkbox.Root>
  <Checkbox.Trigger>
    <Checkbox.Icon />
  </Checkbox.Trigger>
  <Checkbox.State>
    {(state) => <span>{state ? '체크됨' : '체크 안됨'}</span>}
  </Checkbox.State>
</Checkbox.Root>`;

export { CompoundStructureSection };
