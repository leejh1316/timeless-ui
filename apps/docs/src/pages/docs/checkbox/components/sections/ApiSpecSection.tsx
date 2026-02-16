import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { CodeBlock } from "@src/components/common";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Checkbox 컴포넌트의 모든 Props, 타입, 데이터 속성을 상세히 설명합니다. 각 컴포넌트가 제공하는 속성을 정확히 이해하고 활용하세요.
    </Document.Paragraph>

    {/* ─── Checkbox.Root ─── */}
    <Document.Heading2>Checkbox.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      체크박스의 상태를 관리하는 루트 컴포넌트입니다. Context Provider로 동작하며, 내부적으로 숨겨진 네이티브 input 요소를 렌더링합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} />

    {/* ─── Checkbox.Trigger ─── */}
    <Document.Heading2>Checkbox.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      사용자가 클릭하여 체크 상태를 토글하는 버튼 컴포넌트입니다. <InlineCode>PrimitivePropsWithRef&lt;"button"&gt;</InlineCode>을
      상속하므로 모든 표준 버튼 속성을 사용할 수 있습니다.
    </Document.Paragraph>

    {/* ─── Checkbox.Icon ─── */}
    <Document.Heading2>Checkbox.Icon</Document.Heading2>
    <Document.Paragraph mb={4}>
      체크 상태를 시각적으로 표현하는 아이콘 컴포넌트입니다. SVG path 애니메이션을 통해 부드러운 체크 효과를 제공합니다.{" "}
      <InlineCode>PrimitivePropsWithRef&lt;"svg"&gt;</InlineCode>을 상속하므로 모든 SVG 속성을 사용할 수 있습니다.
    </Document.Paragraph>
    <PropsTable rows={iconProps} />

    {/* ─── Checkbox.State ─── */}
    <Document.Heading2>Checkbox.State</Document.Heading2>
    <Document.Paragraph mb={4}>
      렌더 프롭 패턴을 통해 현재 체크 상태에 접근할 수 있는 컴포넌트입니다. 조건부 렌더링이 필요할 때 사용합니다.
    </Document.Paragraph>
    <PropsTable rows={stateProps} />

    {/* ─── Custom Types ─── */}
    <Document.Heading2>커스텀 타입</Document.Heading2>
    <Document.Paragraph mb={4}>
      Checkbox 컴포넌트에서 사용되는 커스텀 타입 정의입니다. 정확한 타입을 이해하고 사용하세요.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>CheckboxState</Document.Heading3>
    <Document.Paragraph mb={4}>
      체크박스의 상태를 나타내는 타입입니다. <InlineCode>boolean</InlineCode> 외에도 문자열 형태와 중간 상태를 지원합니다.
    </Document.Paragraph>
    <CodeBlock code={`type CheckboxState = boolean | 'true' | 'false' | 'mixed'`} language="typescript" className="mb-10" />

    {/* ─── Data Attributes ─── */}
    <Document.Heading2>데이터 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>Checkbox.Trigger</InlineCode>에 자동으로 적용되는 데이터 속성입니다. CSS 선택자로 활용하여 상태에 따른 스타일링을 할 수
      있습니다.
    </Document.Paragraph>
    <AttributeTable rows={attributeRows} />

    {/* ─── Accessibility ─── */}
    <Document.Heading2>접근성 (Accessibility)</Document.Heading2>
    <Document.Paragraph mb={4}>
      Checkbox는 WAI-ARIA 명세를 준수하여 설계되었습니다. 다음 ARIA 속성이 자동으로 적용됩니다.
    </Document.Paragraph>
    <AttributeTable rows={ariaAttributes} />
  </section>
);

/* ──────────────────────────────────────────────
   Props Data: Checkbox.Root
   ────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    defaultValue: "—",
    description: "체크박스 내부에 렌더링될 자식 요소",
  },
  {
    name: "checked",
    type: "CheckboxState",
    defaultValue: "—",
    description: "제어형 모드에서 사용하는 체크 상태 값. boolean, 'true', 'false', 'mixed' 중 하나",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    defaultValue: "false",
    description: "비제어형 모드에서 사용하는 초기 체크 상태",
  },
  {
    name: "onCheckedChange",
    type: "(checked: CheckboxState) => void",
    defaultValue: "—",
    description: "체크 상태가 변경될 때 호출되는 콜백 함수",
  },
  {
    name: "value",
    type: "string",
    defaultValue: "—",
    description: "폼 제출 시 전달될 값. HTML input의 value 속성에 해당",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "체크박스 비활성화 여부. true일 경우 사용자 인터랙션이 차단됨",
  },
  {
    name: "readOnly",
    type: "boolean",
    defaultValue: "—",
    description: "읽기 전용 모드. true일 경우 값을 변경할 수 없음",
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "—",
    description: "필수 입력 여부. 폼 validation에 사용됨",
  },
  {
    name: "name",
    type: "string",
    defaultValue: "—",
    description: "폼 제출 시 사용될 input name 속성",
  },
  {
    name: "id",
    type: "string",
    defaultValue: "—",
    description: "체크박스 식별자. label의 htmlFor나 aria-labelledby에 연결",
  },
];

/* ──────────────────────────────────────────────
   Props Data: Checkbox.Icon
   ────────────────────────────────────────────── */

const iconProps: PropsTableRow[] = [
  {
    name: "size",
    type: "number",
    defaultValue: "16",
    description: "아이콘의 너비와 높이 크기 (픽셀 단위)",
  },
];

/* ──────────────────────────────────────────────
   Props Data: Checkbox.State
   ────────────────────────────────────────────── */

const stateProps: PropsTableRow[] = [
  {
    name: "children",
    type: "(state?: CheckboxState) => React.ReactNode",
    defaultValue: "—",
    description: "현재 체크 상태를 인자로 받는 렌더 함수",
  },
];

/* ──────────────────────────────────────────────
   Data Attributes
   ────────────────────────────────────────────── */

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'checked' | 'unchecked' | 'indeterminate'",
    description: "체크박스의 현재 상태. checked가 'mixed'일 때는 'indeterminate', true일 때는 'checked', 그 외는 'unchecked'",
  },
];

/* ──────────────────────────────────────────────
   ARIA Attributes
   ────────────────────────────────────────────── */

const ariaAttributes: AttributeTableRow[] = [
  {
    name: "role",
    value: "'checkbox'",
    description: "체크박스 역할을 명시하는 ARIA role 속성",
  },
  {
    name: "aria-checked",
    value: "'true' | 'false' | 'mixed'",
    description: "현재 체크 상태를 나타내는 ARIA 속성. 스크린 리더에서 상태를 읽어줌",
  },
  {
    name: "aria-labelledby",
    value: "string",
    description: "Root의 id prop 값이 자동으로 연결됨. label 요소와 연결할 때 사용",
  },
];

export { ApiSpecSection };
