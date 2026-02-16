import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>

    <Document.Heading2 mb={3}>Tabs.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      탭 그룹의 최상위 컨테이너입니다. <InlineCode>div</InlineCode>를 확장하여 모든 HTML div 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    <Document.Heading2 mb={3}>Tabs.List</Document.Heading2>
    <Document.Paragraph mb={4}>
      탭 트리거들을 감싸는 컨테이너입니다. <InlineCode>div</InlineCode>를 확장하여 모든 HTML div 속성을 지원합니다. 키보드 화살표
      네비게이션이 자동으로 적용됩니다.
    </Document.Paragraph>

    <Document.Heading2 mb={3}>Tabs.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      개별 탭 버튼입니다. <InlineCode>button</InlineCode>를 확장하여 모든 HTML button 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={triggerProps} className="mb-10" />

    <Document.Heading2 mb={3}>Tabs.Content</Document.Heading2>
    <Document.Paragraph mb={4}>
      각 탭에 대응하는 콘텐츠 영역입니다. <InlineCode>div</InlineCode>를 확장하여 모든 HTML div 속성을 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={contentProps} className="mb-10" />

    <Document.Heading2 mb={3}>Tabs.Indicator</Document.Heading2>
    <Document.Paragraph mb={4}>
      활성 탭을 강조하는 시각적 인디케이터입니다. <InlineCode>span</InlineCode>를 확장하여 모든 HTML span 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading2 mb={3}>주요 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>
      스타일링과 상태 관리를 위해 자동으로 적용되는 data 속성들입니다. CSS 선택자로 활용할 수 있습니다.
    </Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Props Data
   ────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "—",
    description: "제어 모드에서 현재 활성화된 탭의 value",
  },
  {
    name: "defaultValue",
    type: "string",
    defaultValue: "—",
    description: "비제어 모드에서 초기 활성 탭의 value",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    defaultValue: "—",
    description: "활성 탭이 변경될 때 호출되는 콜백 함수",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: "탭의 방향 설정. 키보드 네비게이션 방향도 함께 변경됨",
  },
];

const triggerProps: PropsTableRow[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "—",
    description: "이 트리거와 연결된 고유 값. Content의 value와 매칭됨 (필수)",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "트리거 비활성화 여부",
  },
];

const contentProps: PropsTableRow[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "—",
    description: "이 콘텐츠와 연결된 고유 값. Trigger의 value와 매칭됨 (필수)",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-orientation",
    value: "'horizontal' | 'vertical'",
    description: "Root, List, Trigger, Content에 적용. 현재 탭의 방향",
  },
  {
    name: "data-active",
    value: "true | false",
    description: "Trigger에 적용. 현재 활성화된 탭인지 여부. CSS 선택자로 활용 가능",
  },
  {
    name: "aria-disabled",
    value: "true | false",
    description: "Trigger에 적용. 접근성을 위한 비활성화 상태 표시",
  },
];

export { ApiSpecSection };
