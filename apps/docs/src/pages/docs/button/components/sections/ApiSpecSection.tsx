import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

// ─── Props Definitions ───
const buttonProps: PropsTableRow[] = [
  {
    name: "loading",
    type: "boolean",
    defaultValue: "false",
    description: "로딩 상태를 설정합니다. true일 경우 버튼이 자동으로 비활성화됩니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "버튼의 비활성화 상태를 설정합니다.",
  },
  {
    name: "type",
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
    description: "HTML button 요소의 type 속성입니다.",
  },
  {
    name: "onPointerDown",
    type: "(event: React.PointerEvent<HTMLButtonElement>) => void",
    description: "포인터 다운 이벤트 핸들러입니다. 비활성화 상태에서는 호출되지 않습니다.",
  },
  {
    name: "onPointerUp",
    type: "(event: React.PointerEvent<HTMLButtonElement>) => void",
    description: "포인터 업 이벤트 핸들러입니다. 비활성화 상태에서는 호출되지 않습니다.",
  },
];

// ─── Data Attributes ───
const dataAttributes: AttributeTableRow[] = [
  {
    name: "data-disabled",
    value: "boolean",
    description: "버튼의 비활성화 상태를 나타냅니다. disabled 또는 loading이 true일 때 true가 됩니다.",
  },
  {
    name: "data-pressed",
    value: "boolean",
    description: "버튼이 눌린 상태를 나타냅니다. 포인터 다운 시 true, 포인터 업 시 false가 됩니다.",
  },
  {
    name: "data-loading",
    value: "boolean",
    description: "버튼의 로딩 상태를 나타냅니다. loading prop의 값과 동일합니다.",
  },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Button 컴포넌트의 모든 Props와 Data Attributes를 설명합니다. Primitive 컴포넌트를 기반으로 하므로 모든 HTML button 속성을 함께
      지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Props</Document.Heading2>
    <Document.Paragraph mb={4}>
      Button 컴포넌트는 기본 HTML button 요소의 모든 속성을 상속받으며, 추가적인 기능을 제공하는 custom props를 가지고 있습니다.
    </Document.Paragraph>
    <PropsTable rows={buttonProps} className="mb-8" />

    <Document.Heading2>Data Attributes</Document.Heading2>
    <Document.Paragraph mb={6}>
      버튼의 상태를 나타내는 Data Attributes입니다. CSS 선택자에서 <InlineCode>[data-pressed="true"]</InlineCode>와 같이 활용하여 상태별
      스타일을 적용할 수 있습니다.
    </Document.Paragraph>
    <AttributeTable rows={dataAttributes} className="mb-8" />

    <Document.Heading2>중요 동작</Document.Heading2>
    <div className="space-y-4">
      <div>
        <Document.Heading3>비활성화 조건</Document.Heading3>
        <Document.Paragraph>
          버튼은 <InlineCode>disabled</InlineCode> prop이 true이거나 <InlineCode>loading</InlineCode> prop이 true일 때 비활성화됩니다.
          비활성화된 버튼은 모든 이벤트 핸들러가 실행되지 않습니다.
        </Document.Paragraph>
      </div>

      <div>
        <Document.Heading3>Pressed 상태 관리</Document.Heading3>
        <Document.Paragraph>
          버튼을 클릭하면 포인터 다운 시 <InlineCode>data-pressed</InlineCode>가 true로 설정되고, 포인터 업 또는 윈도우에서 마우스 업 이벤트
          발생 시 false로 재설정됩니다. 이를 통해 버튼 밖에서 마우스를 놓아도 pressed 상태가 올바르게 해제됩니다.
        </Document.Paragraph>
      </div>

      <div>
        <Document.Heading3>접근성</Document.Heading3>
        <Document.Paragraph>
          비활성화된 버튼은 <InlineCode>aria-disabled</InlineCode> 속성이 자동으로 설정되어 스크린 리더가 상태를 올바르게 인식할 수
          있습니다. HTML disabled 속성도 함께 설정되어 포커스와 이벤트가 차단됩니다.
        </Document.Paragraph>
      </div>
    </div>
  </section>
);

export { ApiSpecSection };
