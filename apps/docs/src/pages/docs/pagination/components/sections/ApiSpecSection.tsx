import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";
import { InlineCode } from "@src/components/ui/InlineCode";
import { CodeBlock } from "@src/components/common/CodeBlock";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

/* ─── Pagination.Root Props ─── */
const rootProps: PropsTableRow[] = [
  {
    name: "totalItems",
    type: "number",
    defaultValue: "—",
    description: "전체 데이터 아이템의 개수입니다.",
  },
  {
    name: "itemsPerPage",
    type: "number",
    defaultValue: "—",
    description: "페이지당 표시할 아이템의 개수입니다.",
  },
  {
    name: "siblings",
    type: "number",
    defaultValue: "1",
    description: "현재 페이지 양옆에 표시할 페이지 번호의 개수입니다.",
  },
  {
    name: "boundaries",
    type: "number",
    defaultValue: "1",
    description: "처음과 끝에 항상 표시할 페이지 번호의 개수입니다.",
  },
  {
    name: "defaultPage",
    type: "number",
    defaultValue: "1",
    description: "페이지네이션의 초기 페이지 번호입니다. (Uncontrolled)",
  },
  {
    name: "currentPage",
    type: "number",
    defaultValue: "—",
    description: "현재 페이지 번호를 제어합니다. (Controlled)",
  },
  {
    name: "onPageChange",
    type: "(page: number) => void",
    defaultValue: "—",
    description: "페이지가 변경될 때 호출되는 콜백 함수입니다.",
  },
];

/* ─── Pagination.Prev Props ─── */
const prevProps: PropsTableRow[] = [
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "버튼의 비활성화 상태를 제어합니다. 명시하지 않으면 첫 페이지일 때 자동으로 비활성화됩니다.",
  },
];

/* ─── Pagination.Next Props ─── */
const nextProps: PropsTableRow[] = [
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "버튼의 비활성화 상태를 제어합니다. 명시하지 않으면 마지막 페이지일 때 자동으로 비활성화됩니다.",
  },
];

/* ─── Pagination.SkipPrev Props ─── */
const skipPrevProps: PropsTableRow[] = [
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "버튼의 비활성화 상태를 제어합니다. 명시하지 않으면 첫 페이지일 때 자동으로 비활성화됩니다.",
  },
];

/* ─── Pagination.SkipNext Props ─── */
const skipNextProps: PropsTableRow[] = [
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "버튼의 비활성화 상태를 제어합니다. 명시하지 않으면 마지막 페이지일 때 자동으로 비활성화됩니다.",
  },
];

/* ─── Pagination.Pages Props ─── */
const pagesProps: PropsTableRow[] = [
  {
    name: "children",
    type: "(page: PaginationItem) => React.ReactNode",
    defaultValue: "—",
    description: "각 페이지 아이템을 렌더링하는 함수입니다. PaginationItem을 인자로 받아 페이지 버튼이나 ellipsis를 반환합니다.",
  },
];

/* ─── Pagination.Page Props ─── */
const pageProps: PropsTableRow[] = [
  {
    name: "page",
    type: "PaginationItem",
    defaultValue: "—",
    description: "렌더링할 페이지 아이템입니다. PageItem 또는 EllipsisItem 타입을 가집니다.",
  },
];

/* ─── Data Attributes ─── */
const pageAttributes: AttributeTableRow[] = [
  {
    name: "data-state",
    value: "'active' | 'inactive'",
    description: "페이지 버튼의 현재 활성 상태를 나타냅니다. 현재 페이지인 경우 'active'입니다.",
  },
  {
    name: "aria-current",
    value: "'page' | undefined",
    description: "현재 페이지인 경우 'page' 값을 가집니다. 접근성을 위해 자동으로 설정됩니다.",
  },
];

/* ─── Type Definitions ─── */
const paginationItemTypeCode = `// PaginationItem 타입 정의
// 페이지 번호 또는 ellipsis(...)를 나타내는 타입입니다.
type PaginationItem = PageItem | EllipsisItem;

// 페이지 번호를 나타내는 아이템
interface PageItem {
  type: 'page';
  page: number;        // 페이지 번호 (1부터 시작)
  key: string;         // React 렌더링을 위한 고유 키
}

// Ellipsis(...)를 나타내는 아이템
interface EllipsisItem {
  type: 'ellipsis';
  key: string;         // React 렌더링을 위한 고유 키
}`;

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Pagination 컴포넌트의 모든 하위 컴포넌트와 속성에 대한 상세 명세입니다. 각 컴포넌트는 표준 HTML 엘리먼트의 속성을 모두 지원합니다.
    </Document.Paragraph>

    {/* Pagination.Root */}
    <Document.Heading2>Pagination.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      페이지네이션의 상태와 컨텍스트를 관리하는 최상위 컴포넌트입니다. <InlineCode>currentPage</InlineCode>와{" "}
      <InlineCode>onPageChange</InlineCode>를 함께 사용하면 Controlled 모드로, <InlineCode>defaultPage</InlineCode>만 사용하면 Uncontrolled
      모드로 동작합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} className="mb-12" />

    {/* Pagination.Prev */}
    <Document.Heading2>Pagination.Prev</Document.Heading2>
    <Document.Paragraph mb={4}>
      이전 페이지로 이동하는 버튼입니다. 현재 페이지가 첫 페이지일 경우 자동으로 비활성화됩니다.
    </Document.Paragraph>
    <PropsTable rows={prevProps} className="mb-12" />

    {/* Pagination.SkipPrev */}
    <Document.Heading2>Pagination.SkipPrev</Document.Heading2>
    <Document.Paragraph mb={4}>
      이전 그룹 페이지로 빠르게 이동하는 버튼입니다. <InlineCode>siblings</InlineCode> 값에 따라 점프 스텝이 결정됩니다.
    </Document.Paragraph>
    <PropsTable rows={skipPrevProps} className="mb-12" />

    {/* Pagination.Next */}
    <Document.Heading2>Pagination.Next</Document.Heading2>
    <Document.Paragraph mb={4}>
      다음 페이지로 이동하는 버튼입니다. 현재 페이지가 마지막 페이지일 경우 자동으로 비활성화됩니다.
    </Document.Paragraph>
    <PropsTable rows={nextProps} className="mb-12" />

    {/* Pagination.SkipNext */}
    <Document.Heading2>Pagination.SkipNext</Document.Heading2>
    <Document.Paragraph mb={4}>
      다음 그룹 페이지로 빠르게 이동하는 버튼입니다. <InlineCode>siblings</InlineCode> 값에 따라 점프 스텝이 결정됩니다.
    </Document.Paragraph>
    <PropsTable rows={skipNextProps} className="mb-12" />

    {/* Pagination.Pages */}
    <Document.Heading2>Pagination.Pages</Document.Heading2>
    <Document.Paragraph mb={4}>
      페이지 번호 목록을 렌더링하는 컨테이너입니다. render prop 패턴을 사용하여 각 페이지 아이템을 렌더링합니다.
    </Document.Paragraph>
    <PropsTable rows={pagesProps} className="mb-12" />

    {/* Pagination.Page */}
    <Document.Heading2>Pagination.Page</Document.Heading2>
    <Document.Paragraph mb={4}>
      개별 페이지 버튼을 렌더링합니다. <InlineCode>page</InlineCode> prop의 <InlineCode>type</InlineCode>이 <InlineCode>'page'</InlineCode>
      인 경우에만 페이지 번호가 표시됩니다.
    </Document.Paragraph>
    <PropsTable rows={pageProps} className="mb-6" />
    <Document.Heading3>Data Attributes</Document.Heading3>
    <AttributeTable rows={pageAttributes} className="mb-12" />

    {/* Type Definitions */}
    <Document.Heading2>타입 정의</Document.Heading2>
    <Document.Paragraph mb={4}>
      Pagination 컴포넌트에서 사용되는 커스텀 타입입니다. <InlineCode>Pagination.Pages</InlineCode>의 <InlineCode>children</InlineCode>{" "}
      함수와 <InlineCode>Pagination.Page</InlineCode>의 <InlineCode>page</InlineCode> prop에서 사용됩니다.
    </Document.Paragraph>
    <Document.Heading3>PaginationItem</Document.Heading3>
    <CodeBlock code={paginationItemTypeCode} language="typescript" className="mb-10" />
  </section>
);

export { ApiSpecSection };
