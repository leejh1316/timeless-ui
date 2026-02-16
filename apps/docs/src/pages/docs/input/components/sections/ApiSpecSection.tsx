import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>전체 속성 및 타입 명세입니다.</Document.Paragraph>

    <Document.Heading2>Input.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      Input 컴포넌트의 루트 컨테이너입니다. 모든 하위 컴포넌트가 공유하는 상태를 관리하며, HTML <InlineCode>div</InlineCode> 요소의 모든
      속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    <Document.Heading2>Input.Field</Document.Heading2>
    <Document.Paragraph mb={4}>
      실제 입력을 받는 필드 요소입니다. HTML <InlineCode>input</InlineCode> 요소의 모든 표준 속성을 지원하며, 자동 유효성 검사 기능이
      내장되어 있습니다.
    </Document.Paragraph>
    <PropsTable rows={fieldProps} className="mb-10" />

    <Document.Heading2>Input.Label</Document.Heading2>
    <Document.Paragraph mb={4}>
      입력 필드의 레이블을 표시합니다. HTML <InlineCode>label</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Input.ErrorMessage</Document.Heading2>
    <Document.Paragraph mb={4}>
      유효성 검사 실패 시 에러 메시지를 표시합니다. HTML <InlineCode>div</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Input.ClearButton</Document.Heading2>
    <Document.Paragraph mb={4}>
      입력 값을 초기화하는 버튼입니다. <InlineCode>Button</InlineCode> 컴포넌트의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>주요 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>스타일링 및 상태 기반 UI 구현을 위해 사용할 수 있는 data 속성들입니다.</Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />

    <Document.Heading2>커스텀 타입</Document.Heading2>
    <Document.Paragraph mb={4}>Input 컴포넌트에서 사용되는 커스텀 타입 정의입니다.</Document.Paragraph>

    <Document.Heading3 mt={6}>ErrorMessage</Document.Heading3>
    <Document.Paragraph mb={4}>에러 메시지의 타입을 정의합니다. 에러가 없을 때는 undefined 값을 가집니다.</Document.Paragraph>
    <CodeBlock code={errorMessageType} className="mb-8" />

    <Document.Heading3 mt={6}>ValidityMatcher</Document.Heading3>
    <Document.Paragraph mb={4}>
      HTML5 ValidityState의 속성들을 타입으로 정의합니다. 자동 유효성 검사 시 이 타입을 기반으로 에러를 판별합니다.
    </Document.Paragraph>
    <CodeBlock code={validityMatcherType} className="mb-8" />

    <Document.Heading3 mt={6}>내장 에러 메시지</Document.Heading3>
    <Document.Paragraph mb={4}>
      Input 컴포넌트는 다음과 같은 한국어 에러 메시지를 기본으로 제공합니다. 자동 유효성 검사 실패 시 해당하는 메시지가 표시됩니다.
    </Document.Paragraph>
    <CodeBlock code={builtInMessages} className="mb-10" />
  </section>
);

const rootProps: PropsTableRow[] = [
  {
    name: "name",
    type: "string",
    defaultValue: "자동 생성된 ID",
    description: "입력 필드의 name 속성. 폼 제출 시 사용되며, 지정하지 않으면 고유 ID가 자동 생성됩니다.",
  },
  {
    name: "value",
    type: "string",
    defaultValue: "—",
    description: "Controlled 모드에서 사용하는 입력 값. 이 값을 설정하면 외부에서 값을 완전히 제어합니다.",
  },
  {
    name: "defaultValue",
    type: "string",
    defaultValue: "''",
    description: "Uncontrolled 모드에서 사용하는 초기 값.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    defaultValue: "—",
    description: "입력 값이 변경될 때 호출되는 콜백 함수. 새로운 값을 인자로 받습니다.",
  },
  {
    name: "onClear",
    type: "() => void",
    defaultValue: "—",
    description: "ClearButton 클릭 시 호출되는 콜백 함수.",
  },
];

const fieldProps: PropsTableRow[] = [
  {
    name: "type",
    type: "string",
    defaultValue: "'text'",
    description: "입력 필드의 타입 (text, email, password, number 등).",
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "—",
    description: "필수 입력 여부. true일 때 값이 비어있으면 에러 메시지를 표시합니다.",
  },
  {
    name: "pattern",
    type: "string",
    defaultValue: "—",
    description: "정규식 패턴. 입력 값이 패턴과 일치하지 않으면 에러 메시지를 표시합니다.",
  },
  {
    name: "minLength",
    type: "number",
    defaultValue: "—",
    description: "최소 길이. 입력 값이 최소 길이보다 짧으면 에러 메시지를 표시합니다.",
  },
  {
    name: "maxLength",
    type: "number",
    defaultValue: "—",
    description: "최대 길이. 입력 값이 최대 길이를 초과하면 에러 메시지를 표시합니다.",
  },
  {
    name: "min",
    type: "number | string",
    defaultValue: "—",
    description: "최소 값 (number, date 타입에서 사용).",
  },
  {
    name: "max",
    type: "number | string",
    defaultValue: "—",
    description: "최대 값 (number, date 타입에서 사용).",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-focused",
    value: "'true' | 'false'",
    description: "입력 필드에 포커스가 있을 때 'true'. Input.Root와 Input.Field에 적용됩니다.",
  },
  {
    name: "data-error",
    value: "'true' | 'false'",
    description: "유효성 검사 실패로 에러가 있을 때 'true'. Input.Root와 Input.Field에 적용됩니다.",
  },
  {
    name: "aria-invalid",
    value: "'true' | 'false'",
    description: "유효성 검사 실패 시 'true'. 접근성을 위해 사용됩니다.",
  },
];

const errorMessageType = `// 에러 메시지 타입
// 에러가 없을 때는 undefined, 에러가 있을 때는 문자열 메시지
type ErrorMessage = string | undefined;`;

const validityMatcherType = `// HTML5 ValidityState 속성 타입
// 각 속성은 특정 유효성 검사 실패 유형을 나타냅니다
type ValidityMatcher =
  | "badInput"          // 잘못된 입력
  | "patternMismatch"   // 패턴 불일치
  | "rangeOverflow"     // 범위 초과
  | "rangeUnderflow"    // 범위 미달
  | "stepMismatch"      // 단계 불일치
  | "tooLong"           // 길이 초과
  | "tooShort"          // 길이 미달
  | "typeMismatch"      // 타입 불일치
  | "valid"             // 유효함
  | "valueMissing";     // 값 누락 (required 위반)`;

const builtInMessages = `// Input 컴포넌트가 제공하는 기본 에러 메시지
const DEFAULT_BUILT_IN_MESSAGES = {
  badInput: "유효하지 않은 값입니다.",
  patternMismatch: "요청된 형식과 일치하지 않습니다.",
  rangeOverflow: "값이 너무 큽니다.",
  rangeUnderflow: "값이 너무 작습니다.",
  stepMismatch: "요청된 단계와 일치하지 않습니다.",
  tooLong: "값이 너무 깁니다.",
  tooShort: "값이 너무 짧습니다.",
  typeMismatch: "요청된 형식과 일치하지 않습니다.",
  valid: undefined,
  valueMissing: "필수 입력 항목입니다.",
};`;

export { ApiSpecSection };
