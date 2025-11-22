import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { usePagination } from "@timeless-ui/ui";

const PaginationExample = () => {
  const { page, totalPages, setPage, handleNext, handlePrevious, paginationRange, isFirstPage, isLastPage } =
    usePagination({
      totalItems: 100,
      itemsPerPage: 10,
      siblings: 1,
      boundaries: 1,
    });

  return (
    <nav className="flex items-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={isFirstPage}
        className="rounded-md border p-2 disabled:opacity-50 dark:border-gray-700"
      >
        Prev
      </button>
      {paginationRange.map((item) => {
        if (item.type === "ellipsis") {
          return (
            <span key={item.key} className="px-2">
              ...
            </span>
          );
        }
        return (
          <button
            key={item.key}
            onClick={() => setPage(item.page)}
            className={`h-9 w-9 rounded-md border ${item.page === page ? "border-blue-600 bg-blue-600 text-white" : "dark:border-gray-700"}`}
          >
            {item.page}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={isLastPage}
        className="rounded-md border p-2 disabled:opacity-50 dark:border-gray-700"
      >
        Next
      </button>
    </nav>
  );
};

export default function UsePaginationPage() {
  const propsData = [
    { prop: "totalItems", type: "number", defaultValue: "-", description: "페이지네이션할 전체 아이템의 수입니다." },
    { prop: "itemsPerPage", type: "number", defaultValue: "-", description: "한 페이지에 표시될 아이템의 수입니다." },
    {
      prop: "siblings",
      type: "number",
      defaultValue: "1",
      description: "현재 페이지 양옆에 표시될 페이지 번호의 수입니다.",
    },
    {
      prop: "boundaries",
      type: "number",
      defaultValue: "1",
      description: "페이지 목록의 시작과 끝에 항상 표시될 페이지 번호의 수입니다.",
    },
    { prop: "defaultPage", type: "number", defaultValue: "1", description: "초기 페이지 번호입니다 (비제어)." },
    {
      prop: "currentPage",
      type: "number",
      defaultValue: "-",
      description: "현재 페이지 번호를 직접 제어합니다 (제어).",
    },
    {
      prop: "onPageChange",
      type: "(page: number) => void",
      defaultValue: "-",
      description: "페이지 변경 시 호출되는 콜백입니다.",
    },
  ];

  const exampleCode = `
import { usePagination } from "@/hooks/usePagination";

function PaginationComponent() {
  const {
    page,
    setPage,
    handleNext,
    handlePrevious,
    paginationRange,
    isFirstPage,
    isLastPage,
  } = usePagination({
    totalItems: 100,
    itemsPerPage: 10,
  });

  return (
    <nav>
      <button onClick={handlePrevious} disabled={isFirstPage}>Prev</button>
      {paginationRange.map((item) =>
        item.type === 'ellipsis' ? (
          <span key={item.key}>...</span>
        ) : (
          <button key={item.key} onClick={() => setPage(item.page)}>
            {item.page}
          </button>
        )
      )}
      <button onClick={handleNext} disabled={isLastPage}>Next</button>
    </nav>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="usePagination"
      description="복잡한 페이지네이션 로직을 처리하고, 렌더링에 필요한 페이지 번호 배열과 제어 함수를 제공하는 Headless Hook입니다."
    >
      <ComponentPreview
        title="기본 페이지네이션"
        description="usePagination 훅은 페이지네이션 UI를 만들기 위한 모든 로직과 상태를 반환합니다."
        code={exampleCode}
      >
        <PaginationExample />
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
