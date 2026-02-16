import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   API Specification Section
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>

    {/* ─── Root Props ─── */}
    <Document.Heading2>RadioGroup.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      라디오 그룹의 최상위 컨테이너로, 선택 상태 관리 및 공통 속성을 하위 컴포넌트에 전달합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    {/* ─── Item Props ─── */}
    <Document.Heading2>RadioGroup.Item</Document.Heading2>
    <Document.Paragraph mb={4}>
      개별 라디오 버튼을 나타내며, 각 항목은 고유한 <InlineCode>value</InlineCode>를 가져야 합니다.
    </Document.Paragraph>
    <PropsTable rows={itemProps} className="mb-10" />

    {/* ─── Indicator Props ─── */}
    <Document.Heading2>RadioGroup.Indicator</Document.Heading2>
    <Document.Paragraph mb={4}>
      체크 상태를 시각적으로 표시하는 요소로, <InlineCode>Item</InlineCode> 내부에서 사용됩니다.
    </Document.Paragraph>
    <PropsTable rows={indicatorProps} className="mb-10" />

    {/* ─── Data Attributes ─── */}
    <Document.Heading2>주요 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>RadioGroup 컴포넌트에서 제공하는 HTML 속성으로, 스타일링 및 접근성을 위해 사용됩니다.</Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />
  </section>
);

/* ─────────────────────────────────────────────────────
   Props Data
   ───────────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "value",
    type: "any",
    defaultValue: "—",
    description: "현재 선택된 라디오 버튼의 값입니다. Controlled 모드에서 사용됩니다.",
  },
  {
    name: "defaultValue",
    type: "any",
    defaultValue: "—",
    description: "초기 선택 값입니다. Uncontrolled 모드에서 사용됩니다.",
  },
  {
    name: "onValueChange",
    type: "(value: any) => void",
    defaultValue: "—",
    description: "선택 값이 변경될 때 호출되는 콜백 함수입니다.",
  },
  {
    name: "name",
    type: "string",
    defaultValue: "—",
    description: "폼 제출 시 사용될 필드 이름입니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "true일 경우 모든 라디오 버튼을 비활성화합니다.",
  },
  {
    name: "readOnly",
    type: "boolean",
    defaultValue: "—",
    description: "true일 경우 선택 변경을 방지합니다.",
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "—",
    description: "true일 경우 필수 입력 항목으로 설정됩니다.",
  },
];

const itemProps: PropsTableRow[] = [
  {
    name: "value",
    type: "string | number",
    defaultValue: "—",
    description: "라디오 버튼의 고유 값입니다. (필수)",
  },
  {
    name: "id",
    type: "string",
    defaultValue: "—",
    description: "라디오 버튼의 고유 식별자입니다. label 연결에 사용됩니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "true일 경우 해당 라디오 버튼을 비활성화합니다. Root의 설정을 오버라이드합니다.",
  },
  {
    name: "readOnly",
    type: "boolean",
    defaultValue: "—",
    description: "true일 경우 해당 라디오 버튼의 선택 변경을 방지합니다. Root의 설정을 오버라이드합니다.",
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "—",
    description: "true일 경우 필수 입력 항목으로 설정됩니다. Root의 설정을 오버라이드합니다.",
  },
];

const indicatorProps: PropsTableRow[] = [
  {
    name: "children",
    type: "(isChecked: boolean) => React.ReactNode",
    defaultValue: "—",
    description: "체크 상태에 따라 동적으로 렌더링할 함수형 children입니다. 체크 여부를 boolean 인자로 받습니다.",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "role",
    value: "'radiogroup'",
    description: "RadioGroup.Root에 자동으로 적용되는 ARIA role 속성입니다.",
  },
  {
    name: "role",
    value: "'radio'",
    description: "RadioGroup.Item에 자동으로 적용되는 ARIA role 속성입니다.",
  },
  {
    name: "data-state",
    value: "'checked' | 'unchecked'",
    description: "RadioGroup.Item과 Indicator에 적용되며, 현재 선택 상태를 나타냅니다.",
  },
  {
    name: "data-disabled",
    value: "boolean",
    description: "RadioGroup.Item과 Indicator에 적용되며, 비활성화 상태를 나타냅니다.",
  },
  {
    name: "data-readonly",
    value: "boolean",
    description: "RadioGroup.Item과 Indicator에 적용되며, 읽기 전용 상태를 나타냅니다.",
  },
  {
    name: "data-required",
    value: "boolean",
    description: "RadioGroup.Item과 Indicator에 적용되며, 필수 입력 여부를 나타냅니다.",
  },
  {
    name: "aria-checked",
    value: "boolean",
    description: "RadioGroup.Item에 적용되며, 스크린 리더에 체크 상태를 전달합니다.",
  },
  {
    name: "aria-disabled",
    value: "boolean",
    description: "RadioGroup.Item에 적용되며, 스크린 리더에 비활성화 상태를 전달합니다.",
  },
  {
    name: "aria-readonly",
    value: "boolean",
    description: "RadioGroup.Item에 적용되며, 스크린 리더에 읽기 전용 상태를 전달합니다.",
  },
  {
    name: "aria-required",
    value: "boolean",
    description: "RadioGroup.Item에 적용되며, 스크린 리더에 필수 입력 여부를 전달합니다.",
  },
];

export { ApiSpecSection };
