import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>Image 컴포넌트의 전체 속성 및 타입 명세입니다.</Document.Paragraph>

    {/* Image.Root */}
    <Document.Heading2>Image.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      이미지 로딩 상태를 관리하는 최상위 컨테이너입니다. HTML div 요소의 모든 속성을 상속받습니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    {/* Image.View */}
    <Document.Heading2>Image.View</Document.Heading2>
    <Document.Paragraph mb={4}>실제 이미지를 렌더링하는 컴포넌트입니다. HTML img 요소의 모든 속성을 상속받습니다.</Document.Paragraph>
    <PropsTable rows={viewProps} className="mb-10" />

    {/* ImageStatus Type */}
    <Document.Heading2>ImageStatus 타입</Document.Heading2>
    <Document.Paragraph mb={4}>
      이미지의 로딩 상태를 나타내는 타입입니다. <InlineCode>onStatusChange</InlineCode> 콜백과 <InlineCode>data-status</InlineCode> 속성에서
      사용됩니다.
    </Document.Paragraph>
    <CodeBlock code={imageStatusTypeCode} language="typescript" className="mb-10" />

    {/* Data Attributes */}
    <Document.Heading2>주요 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>Image 컴포넌트가 제공하는 data 속성을 통해 현재 상태를 CSS 선택자로 활용할 수 있습니다.</Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "src",
    type: "string",
    defaultValue: "—",
    description: "로드할 이미지의 URL",
  },
  {
    name: "alt",
    type: "string",
    defaultValue: "—",
    description: "이미지의 대체 텍스트",
  },
  {
    name: "fallbackSrc",
    type: "string",
    defaultValue: "—",
    description: "메인 이미지 로딩 실패 시 표시할 대체 이미지 URL",
  },
  {
    name: "startLoading",
    type: "boolean",
    defaultValue: "true",
    description: "컴포넌트 마운트 시 즉시 이미지 로딩을 시작할지 여부",
  },
  {
    name: "onStatusChange",
    type: "(status: ImageStatus) => void",
    defaultValue: "—",
    description: "이미지 로딩 상태가 변경될 때 호출되는 콜백 함수",
  },
];

const viewProps: PropsTableRow[] = [
  {
    name: "fit",
    type: "'fill' | 'contain' | 'cover' | 'none' | 'scale-down'",
    defaultValue: "'cover'",
    description: "이미지가 컨테이너에 맞춰지는 방식 (CSS object-fit)",
  },
  {
    name: "onLoad",
    type: "(event: React.SyntheticEvent<HTMLImageElement>) => void",
    defaultValue: "—",
    description: "이미지 로드 완료 시 호출되는 추가 콜백 (내부 처리 후 실행)",
  },
  {
    name: "onError",
    type: "(event: React.SyntheticEvent<HTMLImageElement>) => void",
    defaultValue: "—",
    description: "이미지 로드 실패 시 호출되는 추가 콜백 (내부 처리 후 실행)",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-status",
    value: "'idle' | 'loading' | 'loaded' | 'fallback-loading' | 'fallback-loaded' | 'error'",
    description: "Image.Root와 Image.View에 설정되는 현재 이미지 로딩 상태",
  },
];

const imageStatusTypeCode = `type ImageStatus =
  | 'idle'              // 초기 상태, 아직 로딩이 시작되지 않음
  | 'loading'           // 메인 이미지 로딩 중
  | 'loaded'            // 메인 이미지 로딩 완료
  | 'fallback-loading'  // 메인 이미지 실패 후 fallback 이미지 로딩 중
  | 'fallback-loaded'   // fallback 이미지 로딩 완료
  | 'error';            // 메인 이미지와 fallback 이미지 모두 로딩 실패`;

export { ApiSpecSection };
