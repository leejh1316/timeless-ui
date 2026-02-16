import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Pagination } from "@timeless-ui/ui";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Pagination 컴포넌트는 대량의 데이터를 여러 페이지로 나누어 표시할 때 사용합니다. 이전/다음 버튼과 페이지 번호를 통해 사용자가 원하는
      페이지로 쉽게 이동할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">현재 페이지: {currentPage}</p>
      <Pagination.Root
        totalItems={100}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        className="flex items-center gap-1"
      >
        <Pagination.Prev className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          이전
        </Pagination.Prev>
        <Pagination.Pages className="flex items-center gap-1">
          {(page) =>
            page.type === "page" ? (
              <Pagination.Page
                key={page.key}
                page={page}
                className="min-w-[36px] rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 data-[state=active]:border-neutral-900 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              />
            ) : (
              <span key={page.key} className="px-2 text-neutral-400">
                ...
              </span>
            )
          }
        </Pagination.Pages>
        <Pagination.Next className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          다음
        </Pagination.Next>
      </Pagination.Root>
    </div>
  );
};

const basicCode = `import { Pagination } from "@timeless-ui/ui";
import { useState } from "react";

const BasicDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">현재 페이지: {currentPage}</p>
      <Pagination.Root
        totalItems={100}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        className="flex items-center gap-1"
      >
        <Pagination.Prev className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          이전
        </Pagination.Prev>
        <Pagination.Pages className="flex items-center gap-1">
          {(page) =>
            page.type === "page" ? (
              <Pagination.Page
                key={page.key}
                page={page}
                className="min-w-[36px] rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 data-[state=active]:border-neutral-900 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              />
            ) : (
              <span key={page.key} className="px-2 text-neutral-400">
                ...
              </span>
            )
          }
        </Pagination.Pages>
        <Pagination.Next className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          다음
        </Pagination.Next>
      </Pagination.Root>
    </div>
  );
};`;

export { BasicUsageSection };
