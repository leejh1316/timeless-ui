import { Document } from "@src/components/ui/Document";
import { PropsTable } from "@src/components/common/PropsTable";

/* ──────────────────────────────────────────────
   Props Data
   ────────────────────────────────────────────── */

const rootProps = [
  { name: "open", type: "boolean", defaultValue: "—", description: "다이얼로그의 열림 상태를 제어합니다." },
  { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "초기 열림 상태를 설정합니다." },
  { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "열림 상태가 변경될 때 호출됩니다." },
  { name: "isDismissable", type: "boolean", defaultValue: "true", description: "오버레이 클릭 시 닫힘 여부를 설정합니다." },
  { name: "lockScroll", type: "boolean", defaultValue: "—", description: "열린 상태에서 스크롤 잠금 여부를 설정합니다." },
  { name: "onCloseAfter", type: "() => void", defaultValue: "—", description: "닫힘 애니메이션이 완료된 후 호출됩니다." },
];

const triggerProps = [
  {
    name: "onClick",
    type: "(e: MouseEvent) => void | Promise<void>",
    defaultValue: "—",
    description: "클릭 시 호출됩니다. Promise를 반환하면 완료 후 다이얼로그가 열립니다.",
  },
];

const actionCancelProps = [
  {
    name: "onClick",
    type: "(e: MouseEvent) => void | Promise<void>",
    defaultValue: "—",
    description: "클릭 시 호출됩니다. preventDefault()를 호출하면 자동 닫힘을 방지할 수 있습니다.",
  },
];

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      AlertDialog를 구성하는 각 하위 컴포넌트가 받는 주요 Props입니다. 모든 컴포넌트는 기본 HTML 속성을 확장하며, 아래에 명시된 Props를
      추가로 지원합니다.
    </Document.Paragraph>

    {/* Root */}
    <Document.Heading2>Root</Document.Heading2>
    <Document.Paragraph>
      AlertDialog의 최상위 컨테이너로, 열림/닫힘 상태를 관리합니다. Controlled 모드와 Uncontrolled 모드를 모두 지원합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} />

    {/* Trigger */}
    <Document.Heading2 mt={10}>Trigger</Document.Heading2>
    <Document.Paragraph>다이얼로그를 여는 버튼입니다. Button 컴포넌트를 확장하며, 모든 버튼 속성을 지원합니다.</Document.Paragraph>
    <PropsTable rows={triggerProps} />

    {/* Portal */}
    <Document.Heading2 mt={10}>Portal</Document.Heading2>
    <Document.Paragraph mb={0}>
      다이얼로그를 DOM 트리 최상단에 렌더링하는 포털입니다. Floating UI의 FloatingPortalProps를 확장합니다.
    </Document.Paragraph>

    {/* Overlay */}
    <Document.Heading2 mt={10}>Overlay</Document.Heading2>
    <Document.Paragraph mb={0}>
      배경 오버레이 레이어입니다. div 엘리먼트의 모든 속성을 지원하며, data-status와 data-state 속성으로 열림/닫힘 애니메이션을 제어할 수
      있습니다.
    </Document.Paragraph>

    {/* Content */}
    <Document.Heading2 mt={10}>Content</Document.Heading2>
    <Document.Paragraph mb={0}>
      다이얼로그의 콘텐츠 영역입니다. role="alertdialog"와 aria-modal="true"가 자동으로 적용되어 접근성을 보장합니다.
    </Document.Paragraph>

    {/* Cancel / Action */}
    <Document.Heading2 mt={10}>Cancel / Action</Document.Heading2>
    <Document.Paragraph>
      취소 및 확인 버튼입니다. 클릭 시 기본적으로 다이얼로그가 닫히며, preventDefault()를 호출하여 자동 닫힘을 방지할 수 있습니다.
    </Document.Paragraph>
    <PropsTable rows={actionCancelProps} />
  </section>
);

export { ApiSpecSection };
