import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────────────────────
 * Compound Structure Section
 * ──────────────────────────────────────────────────────────────*/

const anatomyItems = [
  { name: "Funnel.Root", desc: "퍼널의 루트 컨테이너로, useFunnel 훅의 반환값을 전달받습니다." },
  { name: "Funnel.Step", desc: "각 단계를 나타내는 컴포넌트로, step 이름과 일치할 때만 렌더링됩니다." },
  { name: "Funnel.Next", desc: "다음 단계로 이동하는 버튼 컴포넌트입니다." },
  { name: "Funnel.Prev", desc: "이전 단계로 이동하는 버튼 컴포넌트입니다." },
  { name: "Funnel.Cancel", desc: "퍼널을 취소하는 버튼 컴포넌트입니다." },
  { name: "Funnel.Complete", desc: "퍼널을 완료하는 버튼 컴포넌트입니다." },
];

const anatomyCode = `const funnel = useFunnel({
  steps: ["step1", "step2", "step3"] as const,
});

<Funnel.Root funnel={funnel}>
  <Funnel.Step step="step1">
    {/* 첫 번째 단계 내용 */}
    <Funnel.Next>다음</Funnel.Next>
  </Funnel.Step>

  <Funnel.Step step="step2">
    {/* 두 번째 단계 내용 */}
    <Funnel.Prev>이전</Funnel.Prev>
    <Funnel.Next>다음</Funnel.Next>
    <Funnel.Cancel>취소</Funnel.Cancel>
  </Funnel.Step>

  <Funnel.Step step="step3">
    {/* 마지막 단계 내용 */}
    <Funnel.Prev>이전</Funnel.Prev>
    <Funnel.Complete>완료</Funnel.Complete>
  </Funnel.Step>
</Funnel.Root>`;

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Funnel 컴포넌트는 Compound Component 패턴을 사용하여 다단계 프로세스를 구성합니다. 각 하위 컴포넌트는 독립적으로 사용할 수 있으며,
      조합을 통해 복잡한 퍼널 플로우를 구현할 수 있습니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>useFunnel</InlineCode> 훅으로 퍼널 상태를 생성한 후, <InlineCode>Funnel.Root</InlineCode>에 전달합니다. 각{" "}
      <InlineCode>Funnel.Step</InlineCode>은 고유한 <InlineCode>step</InlineCode> 이름을 가지며, 현재 단계와 일치할 때만 렌더링됩니다.
    </Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>Funnel.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      퍼널의 루트 컨테이너입니다. <InlineCode>useFunnel</InlineCode> 훅의 반환값을 <InlineCode>funnel</InlineCode> prop으로 전달받아, 하위
      컴포넌트들이 퍼널 상태를 공유할 수 있도록 합니다.
    </Document.Paragraph>

    <Document.Heading3>Funnel.Step</Document.Heading3>
    <Document.Paragraph mb={4}>
      각 단계의 콘텐츠를 렌더링합니다. <InlineCode>step</InlineCode> prop으로 전달된 이름이 현재 단계와 일치할 때만 렌더링되며,{" "}
      <InlineCode>data-active</InlineCode> 속성을 통해 활성 상태를 확인할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Funnel.Next</Document.Heading3>
    <Document.Paragraph mb={4}>
      다음 단계로 이동하는 버튼입니다. <InlineCode>stepData</InlineCode> prop으로 현재 단계의 데이터를 전달할 수 있으며, 마지막 단계에서는
      자동으로 <InlineCode>onComplete</InlineCode> 콜백을 호출합니다.
    </Document.Paragraph>

    <Document.Heading3>Funnel.Prev</Document.Heading3>
    <Document.Paragraph mb={4}>
      이전 단계로 이동하는 버튼입니다. 첫 번째 단계에서는 자동으로 비활성화됩니다. <InlineCode>stepData</InlineCode> prop으로 현재 단계의
      데이터를 저장할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Funnel.Cancel</Document.Heading3>
    <Document.Paragraph mb={4}>
      퍼널을 취소하는 버튼입니다. <InlineCode>isResettable</InlineCode> prop이 <InlineCode>true</InlineCode>일 때 (기본값) 취소 시 퍼널을
      초기 상태로 리셋합니다.
    </Document.Paragraph>

    <Document.Heading3>Funnel.Complete</Document.Heading3>
    <Document.Paragraph mb={4}>
      퍼널을 완료하는 버튼입니다. 클릭 시 수집된 모든 데이터와 함께 <InlineCode>onComplete</InlineCode> 콜백을 호출합니다.
    </Document.Paragraph>
  </section>
);

export { CompoundStructureSection };
