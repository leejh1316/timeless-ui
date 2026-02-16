import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const anatomyItems = [
  { name: "Modal.Root", desc: "모달의 상태와 컨텍스트를 관리하는 최상위 컴포넌트" },
  { name: "Modal.Trigger", desc: "모달을 여는 트리거 버튼 컴포넌트" },
  { name: "Modal.Portal", desc: "모달을 body에 포탈로 렌더링하는 컴포넌트" },
  { name: "Modal.Overlay", desc: "모달 뒤의 어두운 배경 오버레이" },
  { name: "Modal.Content", desc: "실제 모달 컨텐츠를 담는 컨테이너" },
  { name: "Modal.Close", desc: "모달을 닫는 버튼 컴포넌트" },
];

const anatomyCode = `import { Modal } from "@timeless-ui/react";

<Modal.Root>
  <Modal.Trigger>모달 열기</Modal.Trigger>
  <Modal.Portal>
    <Modal.Overlay />
    <Modal.Content>
      {/* 모달 컨텐츠 */}
      <Modal.Close>닫기</Modal.Close>
    </Modal.Content>
  </Modal.Portal>
</Modal.Root>`;

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Modal은 Compound Component 패턴을 따르며, 여러 하위 컴포넌트를 조합하여 유연하게 구성할 수 있습니다. 각 하위 컴포넌트는 독립적인
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

    <Document.Heading3>Modal.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      모달의 상태와 컨텍스트를 관리하는 최상위 래퍼입니다. 모든 하위 컴포넌트는 이 컴포넌트 내부에 위치해야 하며,{" "}
      <InlineCode>open</InlineCode>, <InlineCode>initialOpen</InlineCode>, <InlineCode>onOpenChange</InlineCode> 등의 속성으로 모달의
      열림/닫힘 상태를 제어할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Modal.Trigger</Document.Heading3>
    <Document.Paragraph mb={6}>
      모달을 여는 트리거 역할을 하는 버튼입니다. 클릭 시 자동으로 모달이 열리며, 접근성을 위한 적절한 ARIA 속성이 자동으로 설정됩니다.
      기본적으로 button 엘리먼트로 렌더링됩니다.
    </Document.Paragraph>

    <Document.Heading3>Modal.Portal</Document.Heading3>
    <Document.Paragraph mb={6}>
      모달 컨텐츠를 DOM 트리의 body로 포탈링합니다. 이를 통해 z-index 문제를 해결하고, 모달이 항상 최상위 레이어에 표시되도록 보장합니다.{" "}
      <InlineCode>container</InlineCode> 속성으로 포탈 대상을 변경할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Modal.Overlay</Document.Heading3>
    <Document.Paragraph mb={6}>
      모달 뒤에 표시되는 반투명 배경입니다. 클릭 시 모달이 닫히며, <InlineCode>lockScroll</InlineCode> 속성이 활성화된 경우 스크롤을
      비활성화합니다. 기본적으로 어두운 배경과 페이드 애니메이션이 적용되어 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Modal.Content</Document.Heading3>
    <Document.Paragraph mb={6}>
      실제 모달의 컨텐츠를 담는 컨테이너입니다. 화면 중앙에 배치되며, 포커스 관리와 키보드 이벤트 처리가 자동으로 이루어집니다.{" "}
      <InlineCode>initialFocus</InlineCode> 속성으로 모달이 열릴 때 포커스될 요소를 지정할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Modal.Close</Document.Heading3>
    <Document.Paragraph mb={6}>
      모달을 닫는 버튼입니다. 클릭 시 모달이 자동으로 닫히며, <InlineCode>onClick</InlineCode> 핸들러에서 비동기 작업을 수행할 수 있습니다.
      비동기 작업이 완료된 후에 모달이 닫힙니다.
    </Document.Paragraph>
  </section>
);

export { CompoundStructureSection };
