import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Pagination } from "@timeless-ui/ui";

export default function PaginationPage() {
  const rootPropsData = [
    {
      prop: "totalItems",
      type: "number",
      defaultValue: "-",
      description: "전체 아이템의 개수입니다.",
    },
    {
      prop: "itemsPerPage",
      type: "number",
      defaultValue: "10",
      description: "한 페이지당 보여줄 아이템의 개수입니다.",
    },
    {
      prop: "siblings",
      type: "number",
      defaultValue: "1",
      description: "현재 페이지 양옆에 보여줄 페이지 번호의 개수입니다.",
    },
    {
      prop: "boundaries",
      type: "number",
      defaultValue: "1",
      description: "시작과 끝에 보여줄 페이지 번호의 개수입니다.",
    },
    {
      prop: "defaultPage",
      type: "number",
      defaultValue: "1",
      description: "초기 페이지 번호입니다 (비제어 컴포넌트).",
    },
    {
      prop: "currentPage",
      type: "number",
      defaultValue: "-",
      description: "현재 페이지 번호입니다 (제어 컴포넌트).",
    },
    {
      prop: "onPageChange",
      type: "(page: number) => void",
      defaultValue: "-",
      description: "페이지가 변경될 때 호출되는 콜백 함수입니다.",
    },
  ];

  const example1Code = `
import { Pagination } from "@timeless-ui/ui";

export function Component() {
  return (
    <Pagination.Root totalItems={100} itemsPerPage={10}>
      <div className="flex items-center gap-2">
        <Pagination.Prev className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
          이전
        </Pagination.Prev>
        <Pagination.Pages className="flex gap-1">
          {(page) => (
            <Pagination.Page
              key={page.type === "page" ? page.page : page.key}
              page={page}
              className="px-3 py-1 border rounded hover:bg-gray-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              {page.type === "page" ? page.page : "..."}
            </Pagination.Page>
          )}
        </Pagination.Pages>
        <Pagination.Next className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
          다음
        </Pagination.Next>
      </div>
    </Pagination.Root>
  );
}
  `;

  const example2Code = `
import { Pagination } from "@timeless-ui/ui";
import { useState } from "react";

export function Component() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm">현재 페이지: {page}</div>
      <Pagination.Root 
        totalItems={500} 
        itemsPerPage={10} 
        currentPage={page}
        onPageChange={setPage}
        siblings={2}
        boundaries={2}
      >
        <div className="flex items-center gap-2">
          <Pagination.SkipPrev className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
            &lt;&lt;
          </Pagination.SkipPrev>
          <Pagination.Prev className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
            이전
          </Pagination.Prev>
          <Pagination.Pages className="flex gap-1">
            {(pageItem) => (
              <Pagination.Page
                key={pageItem.type === "page" ? pageItem.page : pageItem.key}
                page={pageItem}
                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                {pageItem.type === "page" ? pageItem.page : "..."}
              </Pagination.Page>
            )}
          </Pagination.Pages>
          <Pagination.Next className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
            다음
          </Pagination.Next>
          <Pagination.SkipNext className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">
            &gt;&gt;
          </Pagination.SkipNext>
        </div>
      </Pagination.Root>
    </div>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Pagination"
      description="데이터의 페이지 이동을 관리하는 컴포넌트입니다. 페이지 번호, 이전/다음 버튼 등을 유연하게 구성할 수 있습니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="Pagination.Root, Pagination.Prev, Pagination.Next, Pagination.Pages, Pagination.Page를 조합하여 사용합니다."
        code={example1Code}
      >
        <Pagination.Root totalItems={100} itemsPerPage={10}>
          <div className="flex items-center gap-2">
            <Pagination.Prev className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800">
              이전
            </Pagination.Prev>
            <Pagination.Pages className="flex gap-1">
              {(page) =>
                page.type === "page" ? (
                  <Pagination.Page
                    key={page.key}
                    page={page}
                    className="rounded border px-3 py-1 hover:bg-gray-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    {page.page}
                  </Pagination.Page>
                ) : (
                  <span key={page.key} className="px-3 py-1">
                    ...
                  </span>
                )
              }
            </Pagination.Pages>
            <Pagination.Next className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800">
              다음
            </Pagination.Next>
          </div>
        </Pagination.Root>
      </ComponentPreview>

      <ComponentPreview
        title="제어 컴포넌트 및 추가 기능"
        description="currentPage와 onPageChange를 사용하여 상태를 제어하고, SkipPrev/SkipNext 버튼으로 그룹 이동 기능을 추가할 수 있습니다."
        code={example2Code}
      >
        <div className="flex w-full flex-col items-center gap-4">
          <Pagination.Root
            totalItems={500}
            itemsPerPage={10}
            defaultPage={1}
            siblings={2}
            boundaries={2}
          >
            <div className="flex items-center gap-2">
              <Pagination.SkipPrev className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800">
                &lt;&lt;
              </Pagination.SkipPrev>
              <Pagination.Prev className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800">
                이전
              </Pagination.Prev>
              <Pagination.Pages className="flex gap-1">
                {(page) =>
                  page.type === "page" ? (
                    <Pagination.Page
                      key={page.key}
                      page={page}
                      className="rounded border px-3 py-1 hover:bg-gray-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      {page.page}
                    </Pagination.Page>
                  ) : (
                    <span key={page.key} className="px-3 py-1">
                      ...
                    </span>
                  )
                }
              </Pagination.Pages>
              <Pagination.Next className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800">
                다음
              </Pagination.Next>
              <Pagination.SkipNext className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800">
                &gt;&gt;
              </Pagination.SkipNext>
            </div>
          </Pagination.Root>
        </div>
      </ComponentPreview>

      <PropsTable data={rootPropsData} />
    </ComponentPageLayout>
  );
}
