import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { InlineCode } from "@src/components/ui/InlineCode";

const rootProps: PropsTableRow[] = [
  { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "컴포넌트의 초기 확장 상태입니다. (비제어)" },
  { name: "open", type: "boolean", defaultValue: "—", description: "컴포넌트의 현재 확장 상태입니다. (제어)" },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "—",
    description: "확장 상태가 변경될 때 호출되는 이벤트 핸들러입니다.",
  },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "컴포넌트의 상호작용을 비활성화합니다." },
];

const rootAttributes: AttributeTableRow[] = [
  { name: "data-open", value: "'true' | 'false'", description: "현재 확장 여부입니다." },
  { name: "data-disabled", value: "'true' | 'false' | undefined", description: "비활성화 여부입니다." },
];

const triggerAttributes: AttributeTableRow[] = [
  { name: "data-open", value: "'true' | 'false'", description: "현재 확장 여부입니다." },
  { name: "data-disabled", value: "'true' | 'false' | undefined", description: "비활성화 여부입니다." },
];

const cssVariables: AttributeTableRow[] = [
  { name: "--collapsible-content-width", value: "number (px)", description: "컨텐츠의 너비입니다." },
  { name: "--collapsible-content-height", value: "number (px)", description: "컨텐츠의 높이입니다." },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>전체 속성 및 타입 명세입니다.</Document.Paragraph>

    <Document.Heading2>Collapsible.Root</Document.Heading2>
    <PropsTable rows={rootProps} />
    <Document.Heading3 mt={6} mb={3}>
      Data Attributes
    </Document.Heading3>
    <AttributeTable rows={rootAttributes} />

    <Document.Heading2>Collapsible.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      HTML <InlineCode>button</InlineCode> 태그의 속성을 상속받습니다.
    </Document.Paragraph>
    <Document.Heading3 mt={6} mb={3}>
      Data Attributes
    </Document.Heading3>
    <AttributeTable rows={triggerAttributes} />

    <Document.Heading2>Collapsible.Content</Document.Heading2>
    <Document.Paragraph mb={4}>
      HTML <InlineCode>div</InlineCode> 태그의 속성을 상속받습니다.
    </Document.Paragraph>
    <Document.Heading3 mt={6} mb={3}>
      CSS Variables
    </Document.Heading3>
    <Document.Paragraph mb={4}>애니메이션을 위해 다음 CSS 변수를 내부적으로 사용합니다.</Document.Paragraph>
    <AttributeTable rows={cssVariables} />
  </section>
);

export { ApiSpecSection };
