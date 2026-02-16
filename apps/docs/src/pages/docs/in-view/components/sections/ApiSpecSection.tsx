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
    <Document.Paragraph mb={8}>InView 컴포넌트의 전체 속성 및 타입 명세입니다.</Document.Paragraph>

    {/* InView Props */}
    <Document.Heading2>InView</Document.Heading2>
    <Document.Paragraph mb={4}>
      IntersectionObserver API를 기반으로 요소의 가시성을 추적하는 컴포넌트입니다. HTML div 요소의 모든 속성을 상속받습니다.
    </Document.Paragraph>
    <PropsTable rows={inViewProps} className="mb-10" />

    {/* InViewChildren Type */}
    <Document.Heading2>InViewChildren 타입</Document.Heading2>
    <Document.Paragraph mb={4}>
      InView 컴포넌트의 <InlineCode>children</InlineCode>은 render prop 패턴을 사용하며, 가시성 상태를 파라미터로 받는 함수입니다.
    </Document.Paragraph>
    <CodeBlock code={inViewChildrenTypeCode} language="typescript" className="mb-10" />

    {/* Callback Props */}
    <Document.Heading2>콜백 함수 타입</Document.Heading2>
    <Document.Paragraph mb={4}>
      InView 컴포넌트의 이벤트 콜백 함수들은 IntersectionObserverEntry와 IntersectionObserver 인스턴스를 파라미터로 받습니다.
    </Document.Paragraph>
    <CodeBlock code={callbackTypeCode} language="typescript" className="mb-10" />

    {/* Data Attributes */}
    <Document.Heading2>주요 속성 (Data Attributes)</Document.Heading2>
    <Document.Paragraph mb={4}>InView 컴포넌트가 제공하는 data 속성을 통해 현재 상태를 CSS 선택자로 활용할 수 있습니다.</Document.Paragraph>
    <AttributeTable rows={attributeRows} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const inViewProps: PropsTableRow[] = [
  {
    name: "children",
    type: "InViewChildren",
    defaultValue: "—",
    description: "가시성 상태를 받아 React 노드를 반환하는 render prop 함수",
  },
  {
    name: "root",
    type: "Element | Document | null",
    defaultValue: "null",
    description: "IntersectionObserver의 루트 요소. null이면 뷰포트를 기준으로 함",
  },
  {
    name: "rootMargin",
    type: "string",
    defaultValue: "'0px'",
    description: "루트 요소의 마진. CSS margin 문법 사용 (예: '10px 20px')",
  },
  {
    name: "threshold",
    type: "number | number[]",
    defaultValue: "0",
    description: "요소가 얼마나 보일 때 감지할지 설정 (0~1 사이 값, 배열로 여러 값 지정 가능)",
  },
  {
    name: "once",
    type: "boolean",
    defaultValue: "false",
    description: "true면 요소가 처음 나타날 때만 감지하고 이후에는 감지하지 않음",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "true면 IntersectionObserver 동작을 비활성화",
  },
  {
    name: "onEnter",
    type: "(entry: IntersectionObserverEntry, observer: IntersectionObserver) => void",
    defaultValue: "—",
    description: "요소가 화면에 들어올 때 호출되는 콜백",
  },
  {
    name: "onLeave",
    type: "(entry: IntersectionObserverEntry, observer: IntersectionObserver) => void",
    defaultValue: "—",
    description: "요소가 화면에서 벗어날 때 호출되는 콜백",
  },
  {
    name: "onChange",
    type: "(entry: IntersectionObserverEntry, observer: IntersectionObserver) => void",
    defaultValue: "—",
    description: "가시성 상태가 변경될 때마다 호출되는 콜백",
  },
  {
    name: "onResetOnce",
    type: "(resetFn: (hardReset?: boolean) => void) => void",
    defaultValue: "—",
    description: "once 모드를 리셋할 수 있는 함수를 전달받는 콜백. hardReset이 true면 상태도 초기화",
  },
];

const attributeRows: AttributeTableRow[] = [
  {
    name: "data-visible",
    value: "true | false",
    description: "요소가 현재 화면에 보이는지 여부",
  },
  {
    name: "data-entered",
    value: "true | false",
    description: "요소가 한 번이라도 화면에 들어왔는지 여부",
  },
];

const inViewChildrenTypeCode = `type InViewChildren = (props: {
  isVisible: boolean;   // 현재 화면에 보이는지 여부
  hasEntered: boolean;  // 한 번이라도 화면에 들어왔는지 여부
  resetOnce: (hardReset?: boolean) => void;  // once 모드 리셋 함수
}) => React.ReactNode;`;

const callbackTypeCode = `type CallbackFunction = (
  entry: IntersectionObserverEntry,  // IntersectionObserver 엔트리
  observer: IntersectionObserver     // IntersectionObserver 인스턴스
) => void;

// onEnter, onLeave, onChange는 모두 이 타입을 사용합니다`;

export { ApiSpecSection };
