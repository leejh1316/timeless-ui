import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Popover } from "@timeless-ui/ui";

export default function PopoverPage() {
  const propsData = [
    {
      prop: "initialOpen",
      type: "boolean",
      defaultValue: "false",
      description: "초기 열림 상태를 설정합니다 (비제어).",
    },
    {
      prop: "open",
      type: "boolean",
      defaultValue: "-",
      description: "열림 상태를 직접 제어합니다 (제어).",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "열림 상태 변경 시 호출되는 콜백입니다.",
    },
    {
      prop: "placement",
      type: "Placement",
      defaultValue: "'bottom'",
      description: "팝오버가 표시될 위치를 결정합니다.",
    },
    {
      prop: "triggerMode",
      type: "'click' | 'hover' | 'focus'",
      defaultValue: "'click'",
      description: "팝오버를 여는 상호작용 방식을 설정합니다.",
    },
  ];

  const example1Code = `
import { Popover } from "@/components/ui/Popover";

export function Component() {
  return (
    <Popover.Root placement="bottom-start">
      <Popover.Trigger asChild>
        <button>Popover 열기</button>
      </Popover.Trigger>
      <Popover.Content>
        <h3>Popover Title</h3>
        <p>Popover Content</p>
      </Popover.Content>
    </Popover.Root>
  );
}
  `;

  const example2Code = `
import { Popover } from "@/components/ui/Popover";

export function Component() {
  return (
    <Popover.Root triggerMode="hover" placement="top">
      <Popover.Trigger asChild>
        <button>Hover me</button>
      </Popover.Trigger>
      <Popover.Content>
        Tooltip Content
      </Popover.Content>
    </Popover.Root>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Popover"
      description="콘텐츠를 다른 요소 위에 띄우는 팝업 컴포넌트입니다. 클릭, 호버 등 다양한 방식으로 트리거할 수 있습니다."
    >
      <ComponentPreview
        title="클릭 트리거 (기본값)"
        description="가장 일반적인 Popover 형태입니다. Trigger를 클릭하면 Content가 나타나고, 외부를 클릭하면 사라집니다."
        code={example1Code}
      >
        <Popover.Root placement="bottom-start">
          <Popover.Trigger>
            <button className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
              Popover 열기
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.View>
              <Popover.Content>
                <div className="z-10 w-64 rounded-lg border bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-2 font-bold">Popover Title</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    이것은 클릭 시 나타나는 Popover입니다.
                  </p>
                </div>
              </Popover.Content>
            </Popover.View>
          </Popover.Portal>
        </Popover.Root>
      </ComponentPreview>

      <ComponentPreview
        title="호버 트리거 (툴팁)"
        description="triggerMode를 'hover'로 설정하여 마우스를 올렸을 때 나타나는 툴팁을 쉽게 구현할 수 있습니다."
        code={example2Code}
      >
        <Popover.Root triggerMode="hover" placement="top">
          <Popover.Trigger>
            <button className="rounded-md border border-dashed border-gray-400 px-4 py-2 text-sm font-medium">
              여기에 마우스를 올리세요
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.View>
              <Popover.Content>
                <div className="z-10 rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg">
                  이것은 Hover 시 나타나는 툴팁입니다.
                </div>
              </Popover.Content>
            </Popover.View>
          </Popover.Portal>
        </Popover.Root>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
