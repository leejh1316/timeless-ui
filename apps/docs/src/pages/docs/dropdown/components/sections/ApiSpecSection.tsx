import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { InlineCode } from "@src/components/ui/InlineCode";
import { CodeBlock } from "@src/components/common";

const rootProps: PropsTableRow[] = [
  { name: "children", type: "React.ReactNode", defaultValue: "—", description: "컴포넌트의 자식 요소입니다." },
  { name: "open", type: "boolean", defaultValue: "—", description: "드롭다운의 열림 상태를 제어합니다. (Controlled)" },
  { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "상태 변경 요청 시 호출되는 콜백입니다." },
  {
    name: "modal",
    type: "boolean",
    defaultValue: "true",
    description: "모달 모드 실행 여부입니다. true일 경우 포커스를 가두고 바깥 클릭을 감지합니다.",
  },
  { name: "placement", type: "Placement", defaultValue: "'bottom'", description: "드롭다운이 나타날 위치를 지정합니다." },
];

const triggerProps: PropsTableRow[] = [
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "true일 경우 자식 컴포넌트를 그대로 렌더링하고 props를 전달합니다(Slot).",
  },
];

const triggerAttributes: AttributeTableRow[] = [
  { name: "data-state", value: "'open' | 'closed'", description: "현재 드롭다운의 열림/닫힘 상태" },
  { name: "aria-expanded", value: "true' | 'false", description: "드롭다운의 상태를 스크린 리더에 전달" },
];

const contentProps: PropsTableRow[] = [
  { name: "asChild", type: "boolean", defaultValue: "false", description: "true일 경우 자식 컴포넌트를 그대로 렌더링합니다." },
];

const contentAttributes: AttributeTableRow[] = [
  { name: "data-state", value: "'open' | 'closed'", description: "마운트 상태 (애니메이션에 활용)" },
  { name: "data-status", value: "'unmounted' | 'initial' | 'open' | 'close'", description: "트랜지션 단계 상태" },
];

const itemProps: PropsTableRow[] = [
  { name: "disabled", type: "boolean", defaultValue: "false", description: "아이템을 비활성화합니다. 선택 불가능 상태가 됩니다." },
  {
    name: "onSelect",
    type: "(event: React.SyntheticEvent) => void",
    defaultValue: "—",
    description: "아이템 선택 시 호출되는 콜백입니다.",
  },
];

const itemAttributes: AttributeTableRow[] = [
  { name: "data-disabled", value: "true | false", description: "비활성화 상태일 때 true로 설정됩니다." },
  { name: "data-focus", value: "—", description: "키보드 포커스(가상 커서)가 위치했을 때 설정됩니다." },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>Dropdown 컴포넌트의 각 하위 요소별 Props와 Data Attribute 명세입니다.</Document.Paragraph>

    <Document.Heading2>Dropdown.Root</Document.Heading2>
    <PropsTable rows={rootProps} />

    <Document.Heading2>Dropdown.Trigger</Document.Heading2>
    <PropsTable rows={triggerProps} />
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={triggerAttributes} />

    <Document.Heading2>Dropdown.Content</Document.Heading2>
    <PropsTable rows={contentProps} />
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={contentAttributes} />

    <Document.Heading2>Dropdown.Item</Document.Heading2>
    <PropsTable rows={itemProps} />
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={itemAttributes} />

    {/* ─── Custom Types ─── */}
    <Document.Heading2>커스텀 타입</Document.Heading2>
    <Document.Paragraph mb={4}>
      Dropdown 컴포넌트에서 사용되는 커스텀 타입 정의입니다. 정확한 타입을 이해하고 사용하세요.
    </Document.Paragraph>

    <Document.Heading3 mt={6}>Placement</Document.Heading3>
    <Document.Paragraph mb={4}>드롭다운의 배치 위치를 나타내는 타입입니다.</Document.Paragraph>
    <CodeBlock
      code={`type Placement = "top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end"`}
      language="typescript"
      className="mb-10"
    />
  </section>
);

export { ApiSpecSection };
