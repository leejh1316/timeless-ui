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
    <Document.Paragraph mb={8}>ProgressBar 컴포넌트의 전체 속성 및 타입 명세입니다.</Document.Paragraph>

    {/* ─── Root Props ─── */}
    <Document.Heading2>ProgressBar.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      진행바의 최상위 컨테이너로, <InlineCode>min</InlineCode>과 <InlineCode>max</InlineCode> 값을 설정하여 진행률 계산 범위를 정의합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    {/* ─── Track Props ─── */}
    <Document.Heading2>ProgressBar.Track</Document.Heading2>
    <Document.Paragraph mb={4}>
      진행바의 배경 트랙을 담당하며, 기본적으로 <InlineCode>relative</InlineCode> 포지셔닝이 적용됩니다.
    </Document.Paragraph>
    <PropsTable rows={trackProps} className="mb-10" />

    {/* ─── Value Props ─── */}
    <Document.Heading2>ProgressBar.Value</Document.Heading2>
    <Document.Paragraph mb={4}>
      실제 진행 상태를 표시하며, <InlineCode>value</InlineCode> prop을 통해 현재 값을 전달받습니다.
    </Document.Paragraph>
    <PropsTable rows={valueProps} className="mb-10" />

    {/* ─── Custom Types ─── */}
    <Document.Heading2>커스텀 타입 명세</Document.Heading2>
    <Document.Paragraph mb={4}>ProgressBar 컴포넌트에서 사용되는 커스텀 타입 정의입니다.</Document.Paragraph>
    <CodeBlock code={customTypesCode} className="mb-10" />

    {/* ─── Data Attributes ─── */}
    <Document.Heading2>주요 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>ProgressBar 컴포넌트에서 제공하는 HTML 속성으로, 접근성 및 스타일링을 위해 사용됩니다.</Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />
  </section>
);

/* ─────────────────────────────────────────────────────
   Props Data
   ───────────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "min",
    type: "number",
    defaultValue: "0",
    description: "진행바의 최소값입니다. 진행률 계산에 사용됩니다.",
  },
  {
    name: "max",
    type: "number",
    defaultValue: "100",
    description: "진행바의 최대값입니다. 진행률 계산에 사용됩니다.",
  },
];

const trackProps: PropsTableRow[] = [
  {
    name: "style",
    type: "React.CSSProperties",
    defaultValue: "{ position: 'relative' }",
    description: "인라인 스타일을 지정합니다. 기본적으로 'relative' 포지셔닝이 적용됩니다.",
  },
];

const valueProps: PropsTableRow[] = [
  {
    name: "value",
    type: "number",
    defaultValue: "—",
    description: "현재 진행 상태를 나타내는 값입니다. (필수)",
  },
  {
    name: "getPercentValue",
    type: "(percentValue: number) => void",
    defaultValue: "—",
    description: "계산된 백분율 값을 전달받는 콜백 함수입니다. value와 min, max 값을 기반으로 계산된 0~100 사이의 백분율이 전달됩니다.",
  },
  {
    name: "style",
    type: "React.CSSProperties",
    defaultValue: "{ position: 'absolute', top: 0, bottom: 0, left: 0, height: '100%' }",
    description: "인라인 스타일을 지정합니다. width 속성은 자동으로 계산되어 적용됩니다.",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "role",
    value: "'progressbar'",
    description: "ProgressBar.Root에 자동으로 적용되는 ARIA role 속성입니다. 스크린 리더의 접근성을 향상시킵니다.",
  },
];

/* ─────────────────────────────────────────────────────
   Custom Types Code
   ───────────────────────────────────────────────────── */

const customTypesCode = `// Context에서 사용되는 진행바 범위 값 타입
type ProgressBarContextValue = {
  min?: number;  // 진행바의 최소값 (기본값: 0)
  max?: number;  // 진행바의 최대값 (기본값: 100)
};
`;

export { ApiSpecSection };
