import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const anatomyItems = [
  {
    name: "Counter.Root",
    desc: "값을 관리하고 컨텍스트를 제공하는 최상위 컴포넌트입니다.",
  },
  { name: "Counter.Value", desc: "현재 값을 표시하는 span 요소입니다." },
  { name: "Counter.Increment", desc: "값을 증가시키는 버튼입니다. maxValue에 도달하면 비활성화됩니다." },
  { name: "Counter.Decrement", desc: "값을 감소시키는 버튼입니다. minValue에 도달하면 비활성화됩니다." },
];

const anatomyCode = `<Counter.Root>
  <Counter.Decrement />
  <Counter.Value />
  <Counter.Increment />
</Counter.Root>`;

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>Counter</InlineCode>는 Compound Component 패턴을 따르며, 각 역할에 맞는 하위 컴포넌트로 구성됩니다.
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
