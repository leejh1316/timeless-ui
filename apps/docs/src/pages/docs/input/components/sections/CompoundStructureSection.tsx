import { Document } from "@src/components/ui/Document";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { InlineCode } from "@src/components/ui/InlineCode";

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Input은 Compound Component 패턴을 사용하여 여러 하위 컴포넌트를 조합해 완전한 입력 필드를 구성합니다. 각 하위 컴포넌트는 독립적으로
      스타일링할 수 있으며, 내부적으로 Context를 통해 상태를 공유합니다.
    </Document.Paragraph>
    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>
    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />
    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3 mt={6}>Input.Root</Document.Heading3>
    <Document.Paragraph mb={4}>
      Input 컴포넌트의 최상위 컨테이너로, 모든 하위 컴포넌트가 공유하는 상태(value, errorMessage, focus 등)를 관리합니다. Controlled 또는
      Uncontrolled 방식으로 값을 제어할 수 있으며, <InlineCode>name</InlineCode> prop을 통해 폼 제출 시 사용될 이름을 지정할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Input.Field</Document.Heading3>
    <Document.Paragraph mb={4}>
      실제 입력을 받는 필드 요소입니다. 표준 HTML input 요소의 모든 속성을 지원하며, 자동 유효성 검사 기능을 내장하고 있습니다. 유효성 검사
      실패 시 자동으로 에러 메시지를 설정하고 브라우저 기본 툴팁을 숨깁니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Input.Label</Document.Heading3>
    <Document.Paragraph mb={4}>
      입력 필드의 레이블을 표시합니다. 자동으로 <InlineCode>Input.Field</InlineCode>와 연결되어 접근성을 보장하며, 레이블 클릭 시 입력
      필드에 포커스가 이동합니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Input.ErrorMessage</Document.Heading3>
    <Document.Paragraph mb={4}>
      유효성 검사 실패 시 에러 메시지를 표시하는 컴포넌트입니다. 에러가 없을 때는 자동으로 숨겨지며, <InlineCode>role="alert"</InlineCode>{" "}
      속성을 통해 스크린 리더에 에러를 알립니다.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Input.ClearButton</Document.Heading3>
    <Document.Paragraph mb={4}>
      입력 값을 지우는 버튼 컴포넌트입니다. 클릭 시 입력 값과 에러 메시지를 모두 초기화하며, 자동으로 입력 필드에 포커스를 유지합니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "Input.Root", desc: "입력 필드의 루트 컨테이너이자 상태 관리 제공자" },
  { name: "Input.Field", desc: "실제 텍스트 입력을 받는 필드 요소" },
  { name: "Input.Label", desc: "입력 필드의 레이블 텍스트" },
  { name: "Input.ErrorMessage", desc: "유효성 검사 실패 시 에러 메시지 표시" },
  { name: "Input.ClearButton", desc: "입력 값을 초기화하는 버튼" },
];

const anatomyCode = `import { Input } from "@timeless-ui/react";

function Example() {
  return (
    <Input.Root>
      <Input.Label>레이블</Input.Label>
      <Input.Field type="text" placeholder="입력하세요" />
      <Input.ErrorMessage />
      <Input.ClearButton />
    </Input.Root>
  );
}`;

export { CompoundStructureSection };
