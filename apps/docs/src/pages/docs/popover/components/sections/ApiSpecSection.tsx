import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { InlineCode } from "@src/components/ui/InlineCode";
import { CodeBlock } from "@src/components/common/CodeBlock";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

/* ─── Popover.Root Props ─── */
const rootProps: PropsTableRow[] = [
  {
    name: "triggerMode",
    type: "Trigger | Trigger[]",
    defaultValue: "'click'",
    description: "팝오버를 트리거하는 방식입니다. 'click', 'hover', 'focus' 중 하나 또는 배열로 여러 방식을 조합할 수 있습니다.",
  },
  {
    name: "initialOpen",
    type: "boolean",
    defaultValue: "false",
    description: "팝오버의 초기 열림 상태입니다. (Uncontrolled)",
  },
  {
    name: "open",
    type: "boolean",
    defaultValue: "—",
    description: "팝오버의 열림 상태를 제어합니다. (Controlled)",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "—",
    description: "팝오버의 열림 상태가 변경될 때 호출되는 콜백 함수입니다.",
  },
  {
    name: "placement",
    type: "Placement",
    defaultValue: "'bottom'",
    description: "팝오버의 기본 위치입니다. 'top', 'bottom', 'left', 'right' 및 '-start', '-end' 조합을 사용할 수 있습니다.",
  },
  {
    name: "middlewareOptions",
    type: "MiddlewareOptions",
    defaultValue: "—",
    description: "Floating UI의 위치 조정 옵션입니다. offset, shift, flip, arrow 설정을 포함합니다.",
  },
  {
    name: "interactionOptions",
    type: "InteractionOptions",
    defaultValue: "—",
    description: "사용자 상호작용 옵션입니다. click, hover, focus, dismiss 등의 동작을 세밀하게 제어할 수 있습니다.",
  },
  {
    name: "transition",
    type: "UseTransitionStylesProps",
    defaultValue: "—",
    description: "팝오버의 트랜지션 효과를 커스터마이징합니다. duration, initial, open, close 상태의 스타일을 정의할 수 있습니다.",
  },
  {
    name: "whileElementsMounted",
    type: "WhileElementsMountedFn",
    defaultValue: "autoUpdate",
    description: "팝오버가 마운트된 동안 위치를 업데이트하는 함수입니다. Floating UI의 autoUpdate가 기본값입니다.",
  },
];

/* ─── Popover.Portal Props ─── */
const portalProps: PropsTableRow[] = [
  {
    name: "container",
    type: "HTMLElement | null",
    defaultValue: "document.body",
    description: "팝오버를 렌더링할 컨테이너 엘리먼트를 지정합니다.",
  },
];

/* ─── Data Attributes ─── */
const triggerAttributes: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'open' | 'closed'",
    description: "팝오버의 현재 열림/닫힘 상태를 나타냅니다.",
  },
];

const viewAttributes: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'open' | 'closed'",
    description: "팝오버의 현재 열림/닫힘 상태를 나타냅니다.",
  },
];

const contentAttributes: AttributeTableRow[] = [
  {
    name: "data-status",
    value: "'unmounted' | 'initial' | 'open' | 'close'",
    description: "팝오버의 현재 트랜지션 상태를 나타냅니다. CSS 애니메이션에 활용할 수 있습니다.",
  },
  {
    name: "data-state",
    value: "'open' | 'closed'",
    description: "팝오버의 현재 열림/닫힘 상태를 나타냅니다.",
  },
];

/* ─── Type Definitions ─── */
const triggerTypeCode = `// Trigger 타입 정의
// 팝오버를 활성화하는 방식을 정의합니다.
type Trigger = 'click' | 'hover' | 'focus';`;

const middlewareOptionsTypeCode = `// MiddlewareOptions 타입 정의
// Floating UI의 위치 조정 미들웨어 옵션을 정의합니다.
type MiddlewareOptions = {
  offset?: OffsetOptions;      // 팝오버와 트리거 사이의 간격
  shift?: ShiftOptions;         // 뷰포트 경계 내에서 팝오버 이동
  flip?: FlipOptions;           // 공간이 부족할 때 반대쪽으로 뒤집기
  arrow?: ArrowOptions;         // 화살표 요소 위치 계산
};`;

const interactionOptionsTypeCode = `// InteractionOptions 타입 정의
// 사용자 상호작용 방식을 세밀하게 제어하는 옵션입니다.
type InteractionOptions = {
  click?: UseClickProps;               // 클릭 동작 옵션
  hover?: UseHoverProps;               // 호버 동작 옵션
  focus?: UseFocusProps;               // 포커스 동작 옵션
  role?: UseRoleProps;                 // ARIA role 설정
  dismiss?: UseDismissProps;           // 닫기 동작 옵션 (ESC, 외부 클릭 등)
  listNavigation?: UseListNavigationProps;  // 리스트 키보드 네비게이션
  typeahead?: UseTypeaheadProps;       // 타이핑으로 검색
};`;

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Popover 컴포넌트의 모든 하위 컴포넌트와 속성에 대한 상세 명세입니다. 각 컴포넌트는 표준 HTML 엘리먼트의 속성을 모두 지원합니다.
    </Document.Paragraph>

    {/* Popover.Root */}
    <Document.Heading2>Popover.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      팝오버의 상태와 컨텍스트를 관리하는 최상위 컴포넌트입니다. <InlineCode>open</InlineCode>를 사용하면 Controlled 모드로,{" "}
      <InlineCode>initialOpen</InlineCode>만 사용하면 Uncontrolled 모드로 동작합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-12" />

    {/* Popover.Trigger */}
    <Document.Heading2>Popover.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      팝오버를 트리거하는 버튼입니다. Button 컴포넌트를 기반으로 하며, 접근성을 위한 ARIA 속성이 자동으로 설정됩니다.
    </Document.Paragraph>
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={triggerAttributes} className="mb-12" />

    {/* Popover.Portal */}
    <Document.Heading2>Popover.Portal</Document.Heading2>
    <Document.Paragraph mb={4}>
      팝오버를 지정된 컨테이너로 포탈링합니다. 기본적으로 <InlineCode>document.body</InlineCode>에 렌더링됩니다.
    </Document.Paragraph>
    <PropsTable rows={portalProps} className="mb-12" />

    {/* Popover.View */}
    <Document.Heading2>Popover.View</Document.Heading2>
    <Document.Paragraph mb={4}>
      팝오버의 위치를 관리하는 래퍼 컴포넌트입니다. Floating UI를 통해 자동으로 위치가 계산되고 조정됩니다.
    </Document.Paragraph>
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={viewAttributes} className="mb-12" />

    {/* Popover.Content */}
    <Document.Heading2>Popover.Content</Document.Heading2>
    <Document.Paragraph mb={4}>실제 팝오버 컨텐츠를 담는 컨테이너입니다. 트랜지션 효과가 자동으로 적용됩니다.</Document.Paragraph>
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={contentAttributes} className="mb-12" />

    {/* Type Definitions */}
    <Document.Heading2>타입 정의</Document.Heading2>
    <Document.Paragraph mb={6}>
      Popover 컴포넌트에서 사용되는 커스텀 타입입니다. <InlineCode>Popover.Root</InlineCode>의 다양한 옵션에서 사용됩니다.
    </Document.Paragraph>

    <Document.Heading3>Trigger</Document.Heading3>
    <CodeBlock code={triggerTypeCode} language="typescript" className="mb-8" />

    <Document.Heading3>MiddlewareOptions</Document.Heading3>
    <CodeBlock code={middlewareOptionsTypeCode} language="typescript" className="mb-8" />

    <Document.Heading3>InteractionOptions</Document.Heading3>
    <CodeBlock code={interactionOptionsTypeCode} language="typescript" className="mb-10" />
  </section>
);

export { ApiSpecSection };
