import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const anatomyItems = [
  { name: "CheckboxGroup.Root", desc: "선택된 값들의 상태를 관리하고 컨텍스트를 제공하는 최상위 컴포넌트입니다." },
  { name: "CheckboxGroup.Item", desc: "개별 선택 항목의 컨텍스트를 제공합니다. 내부에 Checkbox.Trigger를 배치해야 합니다." },
  { name: "CheckboxGroup.SelectAll", desc: "전체 선택/해제 기능을 제공하는 컨텍스트입니다. 내부에 Checkbox.Trigger를 배치해야 합니다." },
  { name: "CheckboxGroup.State", desc: "현재 선택된 값들에 접근할 수 있는 Render Prop 컴포넌트입니다." },
];

const anatomyCode = `<CheckboxGroup.Root>
  <CheckboxGroup.SelectAll>
    <Checkbox.Trigger>
      <Checkbox.Icon />
      전체 선택
    </Checkbox.Trigger>
  </CheckboxGroup.SelectAll>

  <CheckboxGroup.Item value="option-1">
    <Checkbox.Trigger>
      <Checkbox.Icon />
      옵션 1
    </Checkbox.Trigger>
  </CheckboxGroup.Item>
  
  <CheckboxGroup.State>
    {({ values }) => <div>선택된 값: {values.join(", ")}</div>}
  </CheckboxGroup.State>
</CheckboxGroup.Root>`;

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>CheckboxGroup</InlineCode>은 Compound Component 패턴을 사용하여 유연한 구조를 제공합니다.
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
