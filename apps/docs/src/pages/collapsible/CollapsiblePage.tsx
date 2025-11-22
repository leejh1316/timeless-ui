import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Collapsible } from "@timeless-ui/ui";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function CollapsiblePage() {
  const propsData = [
    {
      prop: "open",
      type: "boolean",
      defaultValue: "-",
      description: "제어 컴포넌트의 열림 상태입니다.",
    },
    {
      prop: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "비제어 컴포넌트의 기본 열림 상태입니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "열림 상태가 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "true로 설정하면 상호작용을 비활성화합니다.",
    },
  ];

  const example1Code = `
import { Collapsible } from "@timeless-ui/ui";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export function Component() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-sm">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@leejh1316 starred 3 repositories</h4>
        <Collapsible.Trigger asChild>
          <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </button>
        </Collapsible.Trigger>
      </div>
      <div className="mt-2 rounded-md border px-4 py-3 font-mono text-sm">
        @timeless-ui/ui
      </div>
      <Collapsible.Content className="space-y-2 px-4 py-3">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @emla-carousel/react
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
  `;

  return (
    <ComponentPageLayout title="Collapsible" description="콘텐츠 섹션을 확장하거나 축소하여 표시하는 컴포넌트입니다.">
      <ComponentPreview
        title="기본 사용법"
        description="Collapsible 컴포넌트는 Root, Trigger, Content로 구성됩니다."
        code={example1Code}
      >
        <div className="w-full max-w-sm">
          <Collapsible.Root className="w-full">
            <div className="flex items-center justify-between space-x-4">
              <h4 className="text-sm font-semibold">@leejh1316 starred 3 repositories</h4>
              <Collapsible.Trigger asChild>
                <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </button>
              </Collapsible.Trigger>
            </div>
            <div className="mt-2 rounded-md border px-4 py-3 font-mono text-sm">@timeless-ui/ui</div>
            <Collapsible.Content className="data-[open=true]:animate-collapsible-down data-[open=false]:animate-collapsible-up overflow-hidden">
              <div className="space-y-2 py-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm">@timeless-ui/primitives</div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">@timeless-ui/checkbox</div>
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
