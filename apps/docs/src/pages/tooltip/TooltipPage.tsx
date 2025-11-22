import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Tooltip } from "@timeless-ui/ui";

export default function TooltipPage() {
  const propsData = [
    {
      prop: "open",
      type: "boolean",
      defaultValue: "-",
      description: "툴팁의 열림 상태를 제어합니다.",
    },
    {
      prop: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "툴팁이 처음 마운트될 때 열린 상태일지를 결정합니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "툴팁의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "options",
      type: "UseHoverProps",
      defaultValue: "-",
      description: "Floating UI의 useHover 훅에 전달될 옵션입니다.",
    },
    {
      prop: "offset",
      type: "OffsetOptions",
      defaultValue: "-",
      description: "툴팁의 위치를 조정하기 위한 offset 옵션입니다.",
    },
  ];

  const exampleCode = `
import { Tooltip } from "@timeless-ui/ui";

export function Component() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className="border px-4 py-2 rounded-md">
          Hover me
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="bg-gray-800 text-white rounded-md px-3 py-1.5 text-sm shadow-lg">
          <Tooltip.Arrow className="fill-gray-800" />
          <span>Tooltip Content</span>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Tooltip"
      description="사용자가 요소 위로 마우스를 가져가면 추가 정보를 제공하는 작은 팝업입니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="버튼이나 아이콘과 같은 요소에 대한 설명이나 추가 정보를 제공할 때 사용합니다."
        code={exampleCode}
      >
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              Hover me
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="rounded-md bg-gray-800 px-3 py-1.5 text-sm text-white shadow-lg dark:bg-gray-700">
              <Tooltip.Arrow className="fill-gray-800 dark:fill-gray-700" />
              <span>Tooltip Content</span>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
