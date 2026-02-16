import { Document } from "@src/components/ui/Document";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";

const rootProps: PropsTableRow[] = [
  { name: "values", type: "string[]", defaultValue: "—", description: "선택된 값들의 배열입니다. (Controlled)" },
  { name: "defaultValues", type: "string[]", defaultValue: "[]", description: "초기 선택된 값들의 배열입니다. (Uncontrolled)" },
  {
    name: "onValuesChange",
    type: "(values: string[]) => void",
    defaultValue: "—",
    description: "선택된 값들이 변경될 때 호출되는 콜백입니다.",
  },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "그룹 내 모든 체크박스를 비활성화합니다." },
];

const itemProps: PropsTableRow[] = [
  { name: "value", type: "string", defaultValue: "—", description: "항목의 고유 식별 값입니다." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "해당 항목을 비활성화합니다." },
];

const selectAllProps: PropsTableRow[] = [
  { name: "allValues", type: "string[]", defaultValue: "—", description: "전체 선택 시 선택될 모든 값들의 배열입니다." },
];

const stateProps: PropsTableRow[] = [
  {
    name: "children",
    type: "(state: { values: string[] }) => ReactNode",
    defaultValue: "—",
    description: "현재 상태를 받아 렌더링하는 함수입니다.",
  },
  { name: "onStatusChange", type: "(values: string[]) => void", defaultValue: "—", description: "상태 변경 시 호출되는 콜백입니다." },
];

const itemAttributes: AttributeTableRow[] = [
  { name: "data-state", value: "'checked' | 'unchecked'", description: "항목의 현재 선택 상태입니다." },
  { name: "data-disabled", value: "true | undefined", description: "항목이 비활성화된 경우 존재합니다." },
];

const selectAllAttributes: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'checked' | 'unchecked' | 'indeterminate'",
    description: "전체 선택 상태입니다. 일부만 선택된 경우 'indeterminate'입니다.",
  },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>전체 속성 및 타입 명세입니다.</Document.Paragraph>

    <Document.Heading2>CheckboxGroup.Root</Document.Heading2>
    <PropsTable rows={rootProps} />

    <Document.Heading2>CheckboxGroup.Item</Document.Heading2>
    <PropsTable rows={itemProps} />
    <Document.Heading3 mt={6} mb={3}>
      Data Attributes
    </Document.Heading3>
    <AttributeTable rows={itemAttributes} />

    <Document.Heading2>CheckboxGroup.SelectAll</Document.Heading2>
    <PropsTable rows={selectAllProps} />
    <Document.Heading3 mt={6} mb={3}>
      Data Attributes
    </Document.Heading3>
    <AttributeTable rows={selectAllAttributes} />

    <Document.Heading2>CheckboxGroup.State</Document.Heading2>
    <PropsTable rows={stateProps} />
  </section>
);

export { ApiSpecSection };
