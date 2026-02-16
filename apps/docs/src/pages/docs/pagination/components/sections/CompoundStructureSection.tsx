import { Document } from "@src/components/ui/Document";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const anatomyItems = [
  { name: "Pagination.Root", desc: "페이지네이션의 상태와 컨텍스트를 관리하는 최상위 컴포넌트" },
  { name: "Pagination.Prev", desc: "이전 페이지로 이동하는 버튼 컴포넌트" },
  { name: "Pagination.SkipPrev", desc: "이전 그룹 페이지로 건너뛰는 버튼 컴포넌트" },
  { name: "Pagination.Next", desc: "다음 페이지로 이동하는 버튼 컴포넌트" },
  { name: "Pagination.SkipNext", desc: "다음 그룹 페이지로 건너뛰는 버튼 컴포넌트" },
  { name: "Pagination.Pages", desc: "페이지 번호 목록을 렌더링하는 컴포넌트" },
  { name: "Pagination.Page", desc: "개별 페이지 버튼 또는 ellipsis를 렌더링하는 컴포넌트" },
];

const anatomyCode = `import { Pagination } from "@timeless-ui/ui";

<Pagination.Root totalItems={100} itemsPerPage={10}>
  <Pagination.SkipPrev>처음</Pagination.SkipPrev>
  <Pagination.Prev>이전</Pagination.Prev>
  <Pagination.Pages>
    {(page) => <Pagination.Page page={page} />}
  </Pagination.Pages>
  <Pagination.Next>다음</Pagination.Next>
  <Pagination.SkipNext>마지막</Pagination.SkipNext>
</Pagination.Root>`;

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      Pagination은 Compound Component 패턴을 따르며, 여러 하위 컴포넌트를 조합하여 유연하게 구성할 수 있습니다. 각 하위 컴포넌트는 독립적인
      역할을 가지며, 필요에 따라 선택적으로 사용할 수 있습니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>Pagination.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      페이지네이션의 상태와 컨텍스트를 관리하는 최상위 래퍼입니다. 모든 하위 컴포넌트는 이 컴포넌트 내부에 위치해야 하며,{" "}
      <InlineCode>totalItems</InlineCode>, <InlineCode>itemsPerPage</InlineCode>, <InlineCode>currentPage</InlineCode> 등의 속성으로
      페이지네이션 동작을 제어할 수 있습니다. <InlineCode>siblings</InlineCode>와 <InlineCode>boundaries</InlineCode> 속성을 통해 표시되는
      페이지 번호의 개수와 범위를 조정할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Pagination.Prev</Document.Heading3>
    <Document.Paragraph mb={6}>
      이전 페이지로 이동하는 버튼입니다. 현재 페이지가 첫 페이지일 경우 자동으로 비활성화되며, 접근성을 위한 적절한 ARIA 속성이 자동으로
      설정됩니다. Button 컴포넌트를 기반으로 하여 모든 버튼 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading3>Pagination.SkipPrev</Document.Heading3>
    <Document.Paragraph mb={6}>
      이전 그룹의 페이지로 빠르게 이동하는 버튼입니다. <InlineCode>siblings</InlineCode> 값에 따라 계산된 점프 스텝만큼 이전으로 이동합니다.
      현재 페이지가 첫 페이지일 경우 자동으로 비활성화됩니다.
    </Document.Paragraph>

    <Document.Heading3>Pagination.Next</Document.Heading3>
    <Document.Paragraph mb={6}>
      다음 페이지로 이동하는 버튼입니다. 현재 페이지가 마지막 페이지일 경우 자동으로 비활성화되며, 접근성을 위한 적절한 ARIA 속성이 자동으로
      설정됩니다. Button 컴포넌트를 기반으로 하여 모든 버튼 속성을 지원합니다.
    </Document.Paragraph>

    <Document.Heading3>Pagination.SkipNext</Document.Heading3>
    <Document.Paragraph mb={6}>
      다음 그룹의 페이지로 빠르게 이동하는 버튼입니다. <InlineCode>siblings</InlineCode> 값에 따라 계산된 점프 스텝만큼 다음으로 이동합니다.
      현재 페이지가 마지막 페이지일 경우 자동으로 비활성화됩니다.
    </Document.Paragraph>

    <Document.Heading3>Pagination.Pages</Document.Heading3>
    <Document.Paragraph mb={6}>
      페이지 번호 목록을 렌더링하는 컨테이너입니다. render prop 패턴을 사용하여 각 페이지 아이템을 렌더링합니다.{" "}
      <InlineCode>children</InlineCode> 함수는 <InlineCode>PaginationItem</InlineCode> 타입을 인자로 받아, 페이지 번호 또는 ellipsis를
      렌더링합니다.
    </Document.Paragraph>

    <Document.Heading3>Pagination.Page</Document.Heading3>
    <Document.Paragraph mb={6}>
      개별 페이지 버튼을 렌더링합니다. <InlineCode>page</InlineCode> prop으로 전달된 <InlineCode>PaginationItem</InlineCode>에 따라 페이지
      번호를 표시하며, 현재 페이지인 경우 <InlineCode>data-state='active'</InlineCode> 속성이 자동으로 추가됩니다. Button 컴포넌트를
      기반으로 하여 모든 버튼 속성을 지원합니다.
    </Document.Paragraph>
  </section>
);

export { CompoundStructureSection };
