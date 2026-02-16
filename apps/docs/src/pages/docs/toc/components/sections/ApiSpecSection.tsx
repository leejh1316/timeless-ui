import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>

    <Document.Heading2 mb={3}>TOC.Root</Document.Heading2>
    <Document.Paragraph mb={4}>목차 시스템의 최상위 컨테이너입니다. heading 요소를 자동으로 스캔하고 상태를 관리합니다.</Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-10" />

    <Document.Heading2 mb={3}>TOC.Observer</Document.Heading2>
    <Document.Paragraph mb={4}>
      IntersectionObserver를 사용하여 현재 보이는 섹션을 추적합니다. <InlineCode>IntersectionObserverInit</InlineCode>의 모든 속성을
      지원합니다.
    </Document.Paragraph>
    <PropsTable rows={observerProps} className="mb-10" />

    <Document.Heading2 mb={3}>TOC.Content</Document.Heading2>
    <Document.Paragraph mb={4}>
      발견된 목차 항목들을 렌더링합니다. render function 패턴을 사용하여 각 항목의 표시 방식을 자유롭게 커스터마이징할 수 있습니다.
    </Document.Paragraph>
    <PropsTable rows={contentProps} className="mb-10" />

    <Document.Heading2 mb={3}>타입 정의</Document.Heading2>
    <Document.Paragraph mb={4}>TOC 컴포넌트에서 사용되는 주요 타입들입니다.</Document.Paragraph>

    <Document.Heading3 mb={3}>TOCItem</Document.Heading3>
    <Document.Paragraph mb={4}>
      목차의 각 항목을 나타내는 타입입니다. 페이지에서 발견된 각 heading 요소의 정보를 담고 있습니다.
    </Document.Paragraph>
    <CodeBlock code={tocItemType} className="mb-6" />

    <Document.Heading3 mb={3}>TOCContentItemRenderFn</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>TOC.Content</InlineCode>에서 사용하는 render function의 타입입니다. 각 목차 항목을 어떻게 렌더링할지 정의합니다.
    </Document.Paragraph>
    <CodeBlock code={tocContentRenderFnType} className="mb-6" />

    <Document.Heading3 mb={3}>TOCStateContextValue</Document.Heading3>
    <Document.Paragraph mb={4}>
      TOC 내부에서 사용하는 상태 컨텍스트 타입입니다. 현재 활성화된 항목과 전체 목차 항목 목록을 관리합니다.
    </Document.Paragraph>
    <CodeBlock code={tocStateContextType} className="mb-6" />

    <Document.Heading3 mb={3}>TOCDispatchContextValue</Document.Heading3>
    <Document.Paragraph mb={4}>
      TOC 내부에서 사용하는 디스패치 컨텍스트 타입입니다. 활성 항목을 변경하고 변경 이벤트를 처리합니다.
    </Document.Paragraph>
    <CodeBlock code={tocDispatchContextType} className="mb-6" />
  </section>
);

/* ──────────────────────────────────────────────
   Props Data
   ────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    defaultValue: "—",
    description: "자식 요소 (필수)",
  },
  {
    name: "targetElement",
    type: "HTMLElement | null",
    defaultValue: "null",
    description: "heading을 스캔할 대상 요소. null이면 document.body를 사용",
  },
  {
    name: "searchTags",
    type: "string[]",
    defaultValue: "['h2', 'h3', 'h4', 'h5', 'h6']",
    description: "스캔할 selector 목록",
  },
  {
    name: "onActiveItemChange",
    type: "(item: TOCItem) => void",
    defaultValue: "—",
    description: "활성 항목이 변경될 때 호출되는 콜백 함수",
  },
];

const observerProps: PropsTableRow[] = [
  {
    name: "root",
    type: "Element | Document | null",
    defaultValue: "—",
    description: "IntersectionObserver의 root 옵션, 관찰 대상(컨텐츠 컨테이너) 요소",
  },
  {
    name: "rootMargin",
    type: "string",
    defaultValue: "'-10% 0px -80% 0px'",
    description: "IntersectionObserver의 rootMargin 옵션",
  },
  {
    name: "threshold",
    type: "number | number[]",
    defaultValue: "0",
    description: "IntersectionObserver의 threshold 옵션",
  },
];

const contentProps: PropsTableRow[] = [
  {
    name: "children",
    type: "TOCContentItemRenderFn",
    defaultValue: "—",
    description: "각 목차 항목을 렌더링하는 함수 (필수)",
  },
];

/* ──────────────────────────────────────────────
   Type Definitions
   ────────────────────────────────────────────── */

const tocItemType = `type TOCItem = {
  // heading 요소의 고유 ID (자동 생성 또는 기존 ID 사용)
  id: string;
  // heading의 텍스트 내용
  text: string;
  // heading 레벨 (h1=1, h2=2, h3=3, ...)
  level: number;
  // 실제 DOM 요소 참조
  element: HTMLElement;
};`;

const tocContentRenderFnType = `type TOCContentItemRenderFn = (
  // 현재 목차 항목
  item: TOCItem,
  // 현재 활성화된 항목의 ID (없으면 null)
  activeId: string | null
) => React.ReactNode;`;

const tocStateContextType = `type TOCStateContextValue = {
  // 현재 뷰포트에 보이는 항목의 ID
  visibleItemId: string | null;
  // 발견된 모든 목차 항목 목록
  items: TOCItem[];
};`;

const tocDispatchContextType = `type TOCDispatchContextValue = {
  // 활성 항목 변경 시 호출되는 콜백
  onActiveItemChange?: (item: TOCItem) => void;
  // 활성 항목 ID를 설정하는 함수
  setVisibleItemId: (id: string | null) => void;
};`;

export { ApiSpecSection };
