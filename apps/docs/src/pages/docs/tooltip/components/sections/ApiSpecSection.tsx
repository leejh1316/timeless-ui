import { AttributeTable, type AttributeTableRow } from "@src/components/common/AttributeTable";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PropsTable, type PropsTableRow } from "@src/components/common/PropsTable";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>

    <Document.Heading2>Tooltip.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      툴팁의 최상위 컨텍스트를 제공하는 컴포넌트입니다. 상태 관리, 위치 계산, 인터랙션 모드 등을 설정합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    <Document.Heading2>Tooltip.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      툴팁을 트리거하는 버튼 요소입니다. <InlineCode>Button</InlineCode> 컴포넌트를 확장하며, <InlineCode>asChild</InlineCode> prop으로
      커스텀 요소를 사용할 수 있습니다.
    </Document.Paragraph>
    <PropsTable rows={triggerProps} className="mb-10" />

    <Document.Heading2>Tooltip.Portal</Document.Heading2>
    <Document.Paragraph mb={4}>
      툴팁 콘텐츠를 DOM 계층 외부로 렌더링하는 포털 컴포넌트입니다. Floating UI의 <InlineCode>FloatingPortal</InlineCode>을 래핑합니다.
    </Document.Paragraph>
    <PropsTable rows={portalProps} className="mb-10" />

    <Document.Heading2>Tooltip.View</Document.Heading2>
    <Document.Paragraph mb={4}>
      플로팅 위치와 스타일을 관리하는 컨테이너입니다. Floating UI가 계산한 위치 정보를 받아 적용합니다.
    </Document.Paragraph>

    <Document.Heading2>Tooltip.Content</Document.Heading2>
    <Document.Paragraph mb={4}>실제 툴팁 메시지를 담는 콘텐츠 영역입니다. 트랜지션 애니메이션이 적용됩니다.</Document.Paragraph>

    <Document.Heading2>Tooltip.Arrow</Document.Heading2>
    <Document.Paragraph mb={4}>
      툴팁에 화살표를 추가하는 선택적 컴포넌트입니다. Floating UI의 Arrow 미들웨어로 위치가 자동 계산됩니다.
    </Document.Paragraph>
    <PropsTable rows={arrowProps} className="mb-10" />

    <Document.Heading2 mt={12}>주요 타입 정의</Document.Heading2>
    <Document.Paragraph mb={4}>
      Tooltip 컴포넌트에서 사용되는 커스텀 타입들입니다. 각 타입의 역할과 허용되는 값을 확인하세요.
    </Document.Paragraph>

    <Document.Heading3>TriggerMode</Document.Heading3>
    <Document.Paragraph mb={4}>
      툴팁을 활성화하는 인터랙션 모드를 정의합니다. 단일 모드 또는 여러 모드를 조합하여 사용할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={triggerModeType} className="mb-8" />

    <Document.Heading3>UseHoverProps</Document.Heading3>
    <Document.Paragraph mb={4}>
      호버 인터랙션의 세부 동작을 설정하는 옵션입니다. 지연 시간, 이동 허용 여부 등을 제어할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={useHoverPropsType} className="mb-8" />

    <Document.Heading3>OffsetOptions</Document.Heading3>
    <Document.Paragraph mb={4}>
      툴팁과 트리거 요소 사이의 간격을 설정합니다. 숫자 또는 세부 옵션 객체로 지정할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={offsetOptionsType} className="mb-8" />

    <Document.Heading3>Placement</Document.Heading3>
    <Document.Paragraph mb={4}>
      툴팁이 나타나는 위치를 지정합니다. 12개의 기본 위치를 지원하며, 자동으로 화면 경계를 감지합니다.
    </Document.Paragraph>
    <CodeBlock code={placementType} className="mb-10" />

    <Document.Heading2 mt={12}>Data Attributes</Document.Heading2>
    <Document.Paragraph mb={4}>
      Tooltip 컴포넌트가 DOM에 적용하는 data attributes입니다. CSS 선택자나 애니메이션 제어에 활용할 수 있습니다.
    </Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />
  </section>
);

const rootProps: PropsTableRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    description: "Tooltip의 하위 컴포넌트들",
  },
  {
    name: "open",
    type: "boolean",
    defaultValue: "—",
    description: "툴팁의 열림/닫힘 상태 (Controlled)",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    defaultValue: "false",
    description: "초기 열림 상태 (Uncontrolled)",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "—",
    description: "상태 변경 시 호출되는 콜백 함수",
  },
  {
    name: "triggerMode",
    type: "'hover' | 'click' | 'focus' | Array<'hover' | 'click' | 'focus'>",
    defaultValue: "'hover'",
    description: "툴팁 활성화 모드",
  },
  {
    name: "options",
    type: "UseHoverProps",
    defaultValue: "—",
    description: "호버 인터랙션의 세부 옵션 (지연 시간 등)",
  },
  {
    name: "offset",
    type: "OffsetOptions",
    defaultValue: "—",
    description: "트리거와 툴팁 사이의 간격",
  },
  {
    name: "placement",
    type: "Placement",
    defaultValue: "'top'",
    description: "툴팁이 나타나는 위치",
  },
];

const triggerProps: PropsTableRow[] = [
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "true일 경우 자식 요소를 트리거로 사용",
  },
];

const portalProps: PropsTableRow[] = [
  {
    name: "root",
    type: "HTMLElement | null",
    defaultValue: "document.body",
    description: "포털이 렌더링될 DOM 노드",
  },
];

const arrowProps: PropsTableRow[] = [
  {
    name: "width",
    type: "number",
    defaultValue: "14",
    description: "화살표의 너비",
  },
  {
    name: "height",
    type: "number",
    defaultValue: "7",
    description: "화살표의 높이",
  },
  {
    name: "tipRadius",
    type: "number",
    defaultValue: "0",
    description: "화살표 끝부분의 둥근 정도",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'open' | 'closed'",
    description: "툴팁의 열림/닫힘 상태 (Trigger, View, Content에 적용)",
  },
  {
    name: "data-status",
    value: "'unmounted' | 'initial' | 'open' | 'close'",
    description: "트랜지션 상태 (View, Content에 적용)",
  },
];

const triggerModeType = `// 단일 모드 또는 여러 모드를 배열로 지정
type TriggerMode = 
  | 'hover'  // 마우스 호버 시 활성화
  | 'click'  // 클릭 시 활성화
  | 'focus'  // 포커스 시 활성화
  | Array<'hover' | 'click' | 'focus'>; // 여러 모드 조합`;

const useHoverPropsType = `// 호버 인터랙션 옵션
interface UseHoverProps {
  enabled?: boolean;  // 호버 활성화 여부
  delay?: number | { open?: number; close?: number };  // 지연 시간 (ms)
  restMs?: number;  // 커서가 정지한 후 활성화까지의 시간
  move?: boolean;  // 커서 이동 중에도 열림 유지 여부
  handleClose?: (context: FloatingContext) => void;  // 닫힘 이벤트 핸들러
}`;

const offsetOptionsType = `// 트리거와 툴팁 사이의 간격 설정
type OffsetOptions = 
  | number  // 단순 숫자로 지정 (픽셀 단위)
  | {
      mainAxis?: number;  // 주 축(배치 방향) 간격
      crossAxis?: number;  // 교차 축 간격
      alignmentAxis?: number | null;  // 정렬 축 간격
    };`;

const placementType = `// 툴팁 위치 (12개 방향 지원)
type Placement = 
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';`;

export { ApiSpecSection };
