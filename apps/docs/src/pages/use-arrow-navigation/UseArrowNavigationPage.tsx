import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { useArrowNavigation } from "@timeless-ui/ui";
import clsx from "clsx";
import { useState } from "react";

const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

export default function UseArrowNavigationPage() {
  const propsData = [
    {
      prop: "orientation",
      type: "'horizontal' | 'vertical' | 'both'",
      defaultValue: "'both'",
      description: "키보드 탐색 방향을 설정합니다.",
    },
    {
      prop: "loop",
      type: "boolean",
      defaultValue: "true",
      description: "탐색이 목록의 끝에 도달했을 때 처음으로 돌아갈지 여부를 결정합니다.",
    },
    {
      prop: "initialIndex",
      type: "number",
      defaultValue: "-1",
      description: "초기에 활성화될 아이템의 인덱스입니다.",
    },
    {
      prop: "onNavigate",
      type: "(details: object) => void",
      defaultValue: "-",
      description: "탐색이 발생할 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "clickOnNavigate",
      type: "boolean",
      defaultValue: "false",
      description: "탐색 시 아이템에 대한 클릭 이벤트를 트리거할지 여부입니다.",
    },
    {
      prop: "selector",
      type: "string",
      defaultValue: "-",
      description:
        "탐색할 아이템을 식별하는 CSS 셀렉터입니다. 이 옵션을 사용하면 이벤트 위임을 통해 동적으로 추가되는 아이템도 탐색할 수 있습니다.",
    },
    {
      prop: "itemCount",
      type: "number",
      defaultValue: "-",
      description:
        "탐색할 아이템의 총 개수입니다. `getItemProps` 함수와 함께 사용하여 각 아이템에 필요한 속성을 주입합니다.",
    },
  ];

  const example1Code = `
import { useArrowNavigation } from "@timeless-ui/ui";
import clsx from "clsx";

const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

function SelectorModeExample() {
  const { rootRef, handleKeyDown, activeIndex } = useArrowNavigation({
    selector: "[data-item]",
    orientation: "vertical",
  });

  return (
    <div
      ref={rootRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="w-48 rounded-md border p-2 focus:outline-none focus:ring-2"
    >
      {items.map((item, index) => (
        <div
          key={item}
          data-item
          className={clsx(
            "rounded-md px-3 py-1.5 text-sm",
            "data-[arrow-navigation-active-item=true]:bg-gray-100 dark:data-[arrow-navigation-active-item=true]:bg-gray-700"
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
  `;

  const example2Code = `
import { useArrowNavigation } from "@timeless-ui/ui";
import clsx from "clsx";

const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

function ItemCountModeExample() {
  const { getItemProps, handleKeyDown, activeIndex } = useArrowNavigation({
    itemCount: items.length,
    orientation: "horizontal",
  });

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="flex space-x-2 rounded-md border p-2 focus:outline-none focus:ring-2"
    >
      {items.map((item, index) => (
        <div
          key={item}
          {...getItemProps({
            index,
            className: clsx(
              "rounded-md px-3 py-1.5 text-sm cursor-pointer",
              "data-[arrow-navigation-active-item=true]:bg-gray-100 dark:data-[arrow-navigation-active-item=true]:bg-gray-700"
            ),
          })}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
  `;

  const SelectorModeExample = () => {
    const { rootRef, handleKeyDown, activeIndex } = useArrowNavigation({
      selector: "[data-item]",
      orientation: "vertical",
    });

    return (
      <div className="space-y-2">
        <div
          ref={rootRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="w-48 rounded-md border p-2 focus:outline-none focus:ring-2 dark:border-gray-700 dark:focus:ring-blue-500"
        >
          {items.map((item) => (
            <div
              key={item}
              data-item
              className="rounded-md px-3 py-1.5 text-sm data-[arrow-navigation-active-item=true]:bg-gray-100 dark:data-[arrow-navigation-active-item=true]:bg-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500">Active Index: {activeIndex}</p>
      </div>
    );
  };

  const ItemCountModeExample = () => {
    const { getItemProps, handleKeyDown, activeIndex } = useArrowNavigation({
      itemCount: items.length,
      orientation: "horizontal",
    });

    return (
      <div className="space-y-2">
        <div
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="flex space-x-2 rounded-md border p-2 focus:outline-none focus:ring-2 dark:border-gray-700 dark:focus:ring-blue-500"
        >
          {items.map((item, index) => (
            <div
              key={item}
              {...getItemProps({
                index,
                className:
                  "cursor-pointer rounded-md px-3 py-1.5 text-sm data-[arrow-navigation-active-item=true]:bg-gray-100 dark:data-[arrow-navigation-active-item=true]:bg-gray-700",
              })}
            >
              {item}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500">Active Index: {activeIndex}</p>
      </div>
    );
  };

  return (
    <ComponentPageLayout
      title="useArrowNavigation"
      description="키보드 화살표 키를 사용하여 UI 요소 그룹을 탐색하는 기능을 구현하는 훅입니다."
    >
      <ComponentPreview
        title="Selector 모드"
        description="CSS 셀렉터를 사용하여 탐색할 아이템을 지정합니다. 동적으로 아이템이 변경되는 경우에 유용합니다."
        code={example1Code}
      >
        <SelectorModeExample />
      </ComponentPreview>

      <ComponentPreview
        title="ItemCount 모드"
        description="아이템의 총 개수와 `getItemProps`를 사용하여 각 아이템에 필요한 속성을 직접 주입합니다. 렌더링 성능에 민감한 가상 목록과 같은 경우에 적합합니다."
        code={example2Code}
      >
        <ItemCountModeExample />
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
