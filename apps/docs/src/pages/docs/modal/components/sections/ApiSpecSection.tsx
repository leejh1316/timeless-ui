import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

/* ─── Modal.Root Props ─── */
const rootProps: PropsTableRow[] = [
  {
    name: "open",
    type: "boolean",
    defaultValue: "—",
    description: "모달의 열림 상태를 제어합니다. (Controlled)",
  },
  {
    name: "initialOpen",
    type: "boolean",
    defaultValue: "false",
    description: "모달의 초기 열림 상태를 설정합니다. (Uncontrolled)",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "—",
    description: "모달의 열림 상태가 변경될 때 호출되는 콜백 함수입니다.",
  },
  {
    name: "isDismissable",
    type: "boolean",
    defaultValue: "true",
    description: "오버레이 클릭이나 ESC 키로 모달을 닫을 수 있는지 여부를 설정합니다.",
  },
  {
    name: "lockScroll",
    type: "boolean",
    defaultValue: "true",
    description: "모달이 열렸을 때 배경 스크롤을 잠글지 여부를 설정합니다.",
  },
];

/* ─── Modal.Trigger Props ─── */
const triggerProps: PropsTableRow[] = [
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "자식 요소를 트리거로 사용할지 여부를 설정합니다.",
  },
];

/* ─── Modal.Portal Props ─── */
const portalProps: PropsTableRow[] = [
  {
    name: "container",
    type: "HTMLElement | null",
    defaultValue: "document.body",
    description: "모달을 렌더링할 컨테이너 엘리먼트를 지정합니다.",
  },
];

/* ─── Modal.Content Props ─── */
const contentProps: PropsTableRow[] = [
  {
    name: "initialFocus",
    type: "React.RefObject<HTMLElement> | number",
    defaultValue: "—",
    description: "모달이 열릴 때 포커스를 받을 요소를 지정합니다.",
  },
  {
    name: "className",
    type: "string",
    defaultValue: "'fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2'",
    description: "모달 컨텐츠에 적용할 CSS 클래스입니다.",
  },
];

/* ─── Modal.Close Props ─── */
const closeProps: PropsTableRow[] = [
  {
    name: "onClick",
    type: "(event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>",
    defaultValue: "—",
    description: "클릭 이벤트 핸들러입니다. 비동기 함수를 지원하며, Promise가 resolve된 후 모달이 닫힙니다.",
  },
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "자식 요소를 닫기 버튼으로 사용할지 여부를 설정합니다.",
  },
];

/* ─── Data Attributes ─── */
const overlayAttributes: AttributeTableRow[] = [
  {
    name: "data-status",
    value: "'open' | 'close'",
    description: "오버레이의 현재 전환 상태를 나타냅니다. CSS 애니메이션에 활용할 수 있습니다.",
  },
];

const contentAttributes: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'open' | 'closed'",
    description: "모달 컨텐츠의 현재 열림/닫힘 상태를 나타냅니다.",
  },
];

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Modal 컴포넌트의 모든 하위 컴포넌트와 속성에 대한 상세 명세입니다. 각 컴포넌트는 표준 HTML 엘리먼트의 속성을 모두 지원합니다.
    </Document.Paragraph>

    {/* Modal.Root */}
    <Document.Heading2>Modal.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      모달의 상태와 컨텍스트를 관리하는 최상위 컴포넌트입니다. <InlineCode>open</InlineCode>과 <InlineCode>onOpenChange</InlineCode>를 함께
      사용하면 Controlled 모드로, <InlineCode>initialOpen</InlineCode>만 사용하면 Uncontrolled 모드로 동작합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-12" />

    {/* Modal.Trigger */}
    <Document.Heading2>Modal.Trigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      모달을 여는 트리거 버튼입니다. 기본적으로 <InlineCode>button</InlineCode> 엘리먼트로 렌더링되며, 접근성을 위한 ARIA 속성이 자동으로
      설정됩니다.
    </Document.Paragraph>
    <PropsTable rows={triggerProps} className="mb-12" />

    {/* Modal.Portal */}
    <Document.Heading2>Modal.Portal</Document.Heading2>
    <Document.Paragraph mb={4}>
      모달을 지정된 컨테이너로 포탈링합니다. 기본적으로 <InlineCode>document.body</InlineCode>에 렌더링됩니다.
    </Document.Paragraph>
    <PropsTable rows={portalProps} className="mb-12" />

    {/* Modal.Overlay */}
    <Document.Heading2>Modal.Overlay</Document.Heading2>
    <Document.Paragraph mb={4}>
      모달 뒤에 표시되는 오버레이 배경입니다. <InlineCode>lockScroll</InlineCode>이 활성화된 경우 배경 스크롤을 비활성화합니다.
    </Document.Paragraph>
    <AttributeTable rows={overlayAttributes} className="mb-12" />

    {/* Modal.Content */}
    <Document.Heading2>Modal.Content</Document.Heading2>
    <Document.Paragraph mb={4}>
      실제 모달 컨텐츠를 담는 컨테이너입니다. 포커스 관리, 키보드 이벤트 처리, ARIA 속성이 자동으로 적용됩니다.
    </Document.Paragraph>
    <PropsTable rows={contentProps} className="mb-6" />
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={contentAttributes} className="mb-12" />

    {/* Modal.Close */}
    <Document.Heading2>Modal.Close</Document.Heading2>
    <Document.Paragraph mb={4}>
      모달을 닫는 버튼입니다. <InlineCode>onClick</InlineCode> 핸들러에서 비동기 작업을 수행할 수 있으며, Promise가 resolve된 후 모달이
      닫힙니다. <InlineCode>event.preventDefault()</InlineCode>를 호출하면 모달이 닫히지 않습니다.
    </Document.Paragraph>
    <PropsTable rows={closeProps} className="mb-10" />
  </section>
);

export { ApiSpecSection };
