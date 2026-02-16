import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { Pagination } from "@timeless-ui/react";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      Pagination 컴포넌트의 다양한 활용 패턴과 고급 기능을 확인하세요. 페이지 범위 설정, Skip 버튼, 커스텀 스타일링 등 실무에서 자주
      사용되는 패턴을 제공합니다.
    </Document.Paragraph>

    {/* Complete Pagination with Skip Buttons */}
    <Document.Heading2>Skip 버튼이 포함된 완전한 페이지네이션</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Pagination.SkipPrev</InlineCode>와 <InlineCode>Pagination.SkipNext</InlineCode> 버튼을 추가하여 빠른 페이지 이동 기능을
      제공합니다. 대량의 페이지가 있을 때 유용합니다.
      <br />
      siblings * 2 + 1 만큼 페이지를 스킵합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CompleteDemo />
    </PreviewContainer>
    <CodeBlock code={completeCode} className="mb-10" />

    {/* Custom Siblings and Boundaries */}
    <Document.Heading2>페이지 범위 커스터마이징</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>siblings</InlineCode>와 <InlineCode>boundaries</InlineCode> 속성으로 표시되는 페이지 번호의 개수와 범위를 조정할 수
      있습니다. <InlineCode>siblings</InlineCode>는 현재 페이지 양옆에 표시할 페이지 수, <InlineCode>boundaries</InlineCode>는 처음과 끝에
      항상 표시할 페이지 수를 의미합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CustomRangeDemo />
    </PreviewContainer>
    <CodeBlock code={customRangeCode} className="mb-10" />

    {/* Uncontrolled Pagination */}
    <Document.Heading2>Uncontrolled 모드</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>defaultPage</InlineCode> 속성만 사용하면 페이지네이션이 내부적으로 상태를 관리합니다. 간단한 사용 사례에 적합합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <UncontrolledDemo />
    </PreviewContainer>
    <CodeBlock code={uncontrolledCode} className="mb-10" />

    {/* Compact Pagination */}
    <Document.Heading2>간단한 페이지네이션</Document.Heading2>
    <Document.Paragraph mb={6}>
      페이지 번호 없이 이전/다음 버튼만 사용하는 간단한 형태의 페이지네이션입니다. 모바일 환경이나 공간이 제한된 경우에 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CompactDemo />
    </PreviewContainer>
    <CodeBlock code={compactCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Complete Demo
   ────────────────────────────────────────────── */

const CompleteDemo = () => {
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">현재 페이지: {currentPage} / 20</p>
      <Pagination.Root
        totalItems={200}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        className="flex items-center gap-1"
      >
        <Pagination.SkipPrev className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          {"<<"}
        </Pagination.SkipPrev>
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
        <Pagination.SkipNext className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          {">>"}
        </Pagination.SkipNext>
      </Pagination.Root>
    </div>
  );
};

const completeCode = `import { Pagination } from "@timeless-ui/react";
import { useState } from "react";

const CompleteDemo = () => {
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">현재 페이지: {currentPage} / 20</p>
      <Pagination.Root
        totalItems={200}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        className="flex items-center gap-1"
      >
        <Pagination.SkipPrev className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          처음
        </Pagination.SkipPrev>
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
        <Pagination.SkipNext className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          마지막
        </Pagination.SkipNext>
      </Pagination.Root>
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   Custom Range Demo
   ────────────────────────────────────────────── */

const CustomRangeDemo = () => {
  const [currentPage, setCurrentPage] = useState(10);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">siblings=2, boundaries=2 설정</p>
      <Pagination.Root
        totalItems={300}
        itemsPerPage={10}
        siblings={2}
        boundaries={2}
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

const customRangeCode = `import { Pagination } from "@timeless-ui/react";
import { useState } from "react";

const CustomRangeDemo = () => {
  const [currentPage, setCurrentPage] = useState(10);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">siblings=2, boundaries=2 설정</p>
      <Pagination.Root
        totalItems={300}
        itemsPerPage={10}
        siblings={2}
        boundaries={2}
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

/* ──────────────────────────────────────────────
   Uncontrolled Demo
   ────────────────────────────────────────────── */

const UncontrolledDemo = () => (
  <Pagination.Root totalItems={50} itemsPerPage={5} defaultPage={3} className="flex items-center gap-1">
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
);

const uncontrolledCode = `import { Pagination } from "@timeless-ui/react";

const UncontrolledDemo = () => (
  <Pagination.Root totalItems={50} itemsPerPage={5} defaultPage={3} className="flex items-center gap-1">
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
);`;

/* ──────────────────────────────────────────────
   Compact Demo
   ────────────────────────────────────────────── */

const CompactDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">
        {currentPage} / {totalPages} 페이지
      </p>
      <Pagination.Root
        totalItems={100}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        className="flex items-center gap-2"
      >
        <Pagination.Prev className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          이전
        </Pagination.Prev>
        <Pagination.Next className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          다음
        </Pagination.Next>
      </Pagination.Root>
    </div>
  );
};

const compactCode = `import { Pagination } from "@timeless-ui/react";
import { useState } from "react";

const CompactDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-600">
        {currentPage} / {totalPages} 페이지
      </p>
      <Pagination.Root
        totalItems={100}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        className="flex items-center gap-2"
      >
        <Pagination.Prev className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          이전
        </Pagination.Prev>
        <Pagination.Next className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          다음
        </Pagination.Next>
      </Pagination.Root>
    </div>
  );
};`;

export { ExampleSection };
