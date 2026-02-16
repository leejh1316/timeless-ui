import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>전체 속성 및 타입 명세입니다.</Document.Paragraph>

    <Document.Heading2>Select.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      Select 컴포넌트의 루트 컨테이너입니다. 모든 하위 컴포넌트가 공유하는 상태를 관리하며, Controlled/Uncontrolled 모드와 단일/다중 선택
      모드를 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    <Document.Heading2>Select.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      드롭다운을 여는 트리거 버튼입니다. <InlineCode>Button</InlineCode> 컴포넌트의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Select.Value</Document.Heading2>
    <Document.Paragraph mb={4}>
      현재 선택된 값을 표시하는 컴포넌트입니다. HTML <InlineCode>span</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={valueProps} className="mb-10" />

    <Document.Heading2>Select.Icon</Document.Heading2>
    <Document.Paragraph mb={4}>
      드롭다운 상태를 나타내는 아이콘 컴포넌트입니다. HTML <InlineCode>span</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Select.Portal</Document.Heading2>
    <Document.Paragraph mb={4}>
      드롭다운 메뉴를 Portal로 렌더링하는 컴포넌트입니다. Floating UI의 <InlineCode>FloatingPortal</InlineCode> 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Select.View</Document.Heading2>
    <Document.Paragraph mb={4}>
      위치가 계산된 드롭다운 뷰 컨테이너입니다. HTML <InlineCode>div</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Select.Content</Document.Heading2>
    <Document.Paragraph mb={4}>
      드롭다운 메뉴의 실제 컨텐츠 컨테이너입니다. HTML <InlineCode>div</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Select.Group</Document.Heading2>
    <Document.Paragraph mb={4}>
      옵션들을 그룹화하는 컴포넌트입니다. HTML <InlineCode>div</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Select.Label</Document.Heading2>
    <Document.Paragraph mb={4}>
      옵션 그룹의 레이블을 표시하는 컴포넌트입니다. HTML <InlineCode>div</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2>Select.Item</Document.Heading2>
    <Document.Paragraph mb={4}>
      선택 가능한 개별 옵션 아이템입니다. HTML <InlineCode>div</InlineCode> 요소의 모든 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={itemProps} className="mb-10" />

    <Document.Heading2>Select.Arrow</Document.Heading2>
    <Document.Paragraph mb={4}>드롭다운 메뉴의 화살표 요소입니다. SVG 요소의 모든 속성을 지원합니다.</Document.Paragraph>
    <PropsTable rows={arrowProps} className="mb-10" />

    <Document.Heading2>주요 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>스타일링 및 상태 기반 UI 구현을 위해 사용할 수 있는 data 속성들입니다.</Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />

    <Document.Heading2>커스텀 타입</Document.Heading2>
    <Document.Paragraph mb={4}>Select 컴포넌트에서 사용되는 커스텀 타입 정의입니다.</Document.Paragraph>

    <Document.Heading3 mt={6}>Placement</Document.Heading3>
    <Document.Paragraph mb={4}>
      드롭다운 메뉴의 표시 위치를 정의하는 타입입니다. Floating UI의 placement 옵션을 사용합니다.
    </Document.Paragraph>
    <CodeBlock code={placementType} className="mb-8" />
  </section>
);

const rootProps: PropsTableRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    defaultValue: "—",
    description: "Select의 하위 컴포넌트들.",
  },
  {
    name: "value",
    type: "string | string[] | null",
    defaultValue: "—",
    description: "Controlled 모드에서 사용하는 선택된 값. multiple이 true일 때 배열을 사용합니다.",
  },
  {
    name: "defaultValue",
    type: "string | string[] | null",
    defaultValue: "multiple ? [] : null",
    description: "Uncontrolled 모드에서 사용하는 초기 선택 값.",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[] | null) => void",
    defaultValue: "—",
    description: "선택 값이 변경될 때 호출되는 콜백 함수.",
  },
  {
    name: "open",
    type: "boolean",
    defaultValue: "—",
    description: "Controlled 모드에서 사용하는 드롭다운 열림 상태.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    defaultValue: "false",
    description: "Uncontrolled 모드에서 사용하는 초기 열림 상태.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "—",
    description: "드롭다운 열림 상태가 변경될 때 호출되는 콜백 함수.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "전체 Select를 비활성화할지 여부.",
  },
  {
    name: "multiple",
    type: "boolean",
    defaultValue: "false",
    description: "다중 선택 모드 활성화 여부. true일 때 여러 옵션을 동시에 선택할 수 있습니다.",
  },
  {
    name: "placement",
    type: "Placement",
    defaultValue: "'bottom-start'",
    description: "드롭다운 메뉴의 표시 위치. Floating UI의 placement 옵션을 사용합니다.",
  },
];

const valueProps: PropsTableRow[] = [
  {
    name: "placeholder",
    type: "string",
    defaultValue: "—",
    description: "선택된 값이 없을 때 표시할 텍스트.",
  },
];

const itemProps: PropsTableRow[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "—",
    description: "옵션의 고유 값. 선택 시 이 값이 onValueChange로 전달됩니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "해당 옵션의 비활성화 여부.",
  },
  {
    name: "textValue",
    type: "string",
    defaultValue: "—",
    description:
      "Value 컴포넌트에 표시될 텍스트이며 타입어헤드 검색에 사용될 텍스트 입니다. 지정하지 않으면 children에서 자동 추출됩니다. ",
  },
];

const arrowProps: PropsTableRow[] = [
  {
    name: "width",
    type: "number",
    defaultValue: "—",
    description: "화살표의 너비.",
  },
  {
    name: "height",
    type: "number",
    defaultValue: "—",
    description: "화살표의 높이.",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'open' | 'closed'",
    description: "컴포넌트의 현재 상태를 나타냅니다.",
  },
  {
    name: "data-disabled",
    value: "—",
    description: "비활성화 상태일 설정됩니다. Trigger와 Item에서 사용됩니다.",
  },
  {
    name: "data-selected",
    value: "boolean",
    description: "Item이 선택되었는지 여부. Item에서 사용됩니다.",
  },
  {
    name: "data-select-item",
    value: "—",
    description: "해당 요소가 선택 가능한 아이템임을 표시합니다. Item에서 사용됩니다.",
  },
  {
    name: "aria-selected",
    value: "boolean",
    description: "접근성을 위한 선택 상태. Item에서 사용됩니다.",
  },
  {
    name: "aria-disabled",
    value: "boolean",
    description: "접근성을 위한 비활성화 상태. Trigger와 Item에서 사용됩니다.",
  },
];

const placementType = `// Floating UI의 Placement 타입
// 드롭다운 메뉴가 트리거 요소에 상대적으로 표시될 위치를 지정합니다
type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';`;

export { ApiSpecSection };
