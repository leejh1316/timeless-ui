import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>Accordion 컴포넌트의 Props와 속성에 대한 상세 명세입니다.</Document.Paragraph>

    <Document.Heading2>Accordion.Root</Document.Heading2>
    <Document.Paragraph>모든 Accordion 항목을 감싸는 최상위 컨테이너입니다.</Document.Paragraph>
    <PropsTable rows={rootProps} />

    <Document.Heading2>Accordion.Item</Document.Heading2>
    <Document.Paragraph>개별 접이식 항목을 정의합니다.</Document.Paragraph>
    <PropsTable rows={itemProps} />

    <Document.Heading2>Accordion.Header</Document.Heading2>
    <Document.Paragraph>Trigger를 감싸는 헤더 요소입니다.</Document.Paragraph>
    <PropsTable rows={headerProps} />

    <Document.Heading2>Accordion.Trigger</Document.Heading2>
    <Document.Paragraph>항목을 열고 닫는 버튼입니다.</Document.Paragraph>
    <PropsTable rows={triggerProps} />

    <Document.Heading2>Accordion.Content</Document.Heading2>
    <Document.Paragraph>표시될 내용을 담는 컨테이너입니다.</Document.Paragraph>
    <PropsTable rows={contentProps} />

    <Document.Heading2>주요 속성 (Attributes)</Document.Heading2>
    <Document.Paragraph>스타일링을 위해 자동 부여되는 data attributes입니다.</Document.Paragraph>
    <AttributeTable rows={attributeRows} />
  </section>
);

const rootProps: PropsTableRow[] = [
  {
    name: "mode",
    type: '"single" | "multiple"',
    defaultValue: '"single"',
    description: "한 번에 하나의 항목만 열릴지(single) 여러 항목이 열릴지(multiple) 결정합니다.",
  },
  {
    name: "collapsible",
    type: "boolean",
    defaultValue: "true (single mode)",
    description: "single 모드일 때, 열려있는 항목을 다시 클릭하여 닫을 수 있는지 여부입니다.",
  },
  {
    name: "value",
    type: "string | string[] | null",
    defaultValue: "undefined",
    description: "현재 열려있는 항목의 value입니다. (Controlled)",
  },
  {
    name: "defaultValue",
    type: "string | string[] | null",
    defaultValue: "undefined",
    description: "초기에 열려있을 항목의 value입니다. (Uncontrolled)",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[] | null) => void",
    defaultValue: "—",
    description: "열려있는 항목이 변경될 때 호출되는 콜백 함수입니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "모든 항목의 상호작용을 비활성화합니다.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    defaultValue: '"vertical"',
    description: "아코디언의 키보드 네비게이션 방향을 설정합니다.",
  },
];

const itemProps: PropsTableRow[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "—",
    description: "항목을 식별하는 고유 값입니다.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "해당 항목의 상호작용을 비활성화합니다.",
  },
];

const headerProps: PropsTableRow[] = [
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "기본값은 h3이며, true일 경우 자식 요소로 렌더링을 위임합니다.",
  },
];

const triggerProps: PropsTableRow[] = [
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "—",
    description: "트리거 버튼의 내용입니다.",
  },
];

const contentProps: PropsTableRow[] = [
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "—",
    description: "표시될 컨텐츠입니다.",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-open",
    value: "true | false",
    description: "항목의 열림/닫힘 상태를 나타냅니다.",
  },
  {
    name: "data-disabled",
    value: "—",
    description: "비활성화된 항목에 부여됩니다.",
  },
  {
    name: "data-orientation",
    value: '"vertical" | "horizontal"',
    description: "아코디언의 방향을 나타냅니다.",
  },
];

export { ApiSpecSection };
