import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Dropdown } from "@timeless-ui/ui";
import { ChevronDown } from "lucide-react";

export default function DropdownPage() {
  const propsData = [
    {
      prop: "open",
      type: "boolean",
      defaultValue: "-",
      description: "드롭다운의 열림 상태를 제어합니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "열림 상태가 변경될 때 호출되는 콜백입니다.",
    },
    {
      prop: "modal",
      type: "boolean",
      defaultValue: "true",
      description: "모달로 동작할지 여부를 설정합니다.",
    },
  ];

  const exampleCode = `
import { Dropdown } from "@timeless-ui/ui";
import { ChevronDown } from "lucide-react";

export function Component() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white">
        <span>Dropdown</span>
        <ChevronDown />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content className="mt-2 rounded-md bg-white p-2 shadow-md">
          <Dropdown.Item
            onSelect={() => alert("Item 1 selected")}
            className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
          >
            Item 1
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={() => alert("Item 2 selected")}
            className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
          >
            Item 2
          </Dropdown.Item>
          <Dropdown.Item
            disabled
            className="cursor-not-allowed rounded-md p-2 text-gray-400"
          >
            Item 3 (Disabled)
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
`;

  return (
    <ComponentPageLayout title="Dropdown" description="다양한 옵션을 선택할 수 있는 드롭다운 메뉴입니다.">
      <ComponentPreview title="Default" code={exampleCode}>
        <Dropdown.Root>
          <Dropdown.Trigger className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white data-[state=open]:bg-blue-600">
            <span>Dropdown</span>
            <ChevronDown />
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content>
              <div className="mt-2 min-w-[220px] rounded-md bg-white p-2 shadow-lg">
                <Dropdown.Item
                  onSelect={() => alert("Item 1 selected")}
                  className="data-focus:bg-gray-100 cursor-pointer rounded-md p-2"
                >
                  Item 1
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => alert("Item 2 selected")}
                  className="data-focus:bg-gray-100 cursor-pointer rounded-md p-2"
                >
                  Item 2
                </Dropdown.Item>
                <Dropdown.Item disabled className="cursor-not-allowed rounded-md p-2 text-gray-400">
                  Item 3 (Disabled)
                </Dropdown.Item>
              </div>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
      </ComponentPreview>
      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
