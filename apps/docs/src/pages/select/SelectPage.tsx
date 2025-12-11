import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Select } from "@timeless-ui/ui";

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
  { value: "angular", label: "Angular" },
  { value: "solid", label: "Solid" },
];

export default function SelectPage() {
  const propsData = [
    {
      prop: "value",
      type: "string | string[]",
      defaultValue: "-",
      description: "Select의 제어된 값입니다.",
    },
    {
      prop: "defaultValue",
      type: "string | string[]",
      defaultValue: "-",
      description: "비제어 상태일 때 Select의 기본 값입니다.",
    },
    {
      prop: "onValueChange",
      type: "(value: string | string[]) => void",
      defaultValue: "-",
      description: "값이 변경될 때 호출되는 이벤트 핸들러입니다.",
    },
    {
      prop: "open",
      type: "boolean",
      defaultValue: "false",
      description: "Select의 열림 상태를 제어합니다.",
    },
    {
      prop: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "비제어 상태일 때 Select의 기본 열림 상태입니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "열림 상태가 변경될 때 호출되는 이벤트 핸들러입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "true일 경우, 사용자가 Select와 상호작용할 수 없습니다.",
    },
    {
      prop: "multiple",
      type: "boolean",
      defaultValue: "false",
      description: "true일 경우, 여러 항목을 선택할 수 있습니다.",
    },
    {
      prop: "placement",
      type: "Placement",
      defaultValue: "'bottom-start'",
      description: "Trigger를 기준으로 Content가 표시될 위치입니다.",
    },
  ];

  const example1Code = `
import { Select } from "@timeless-ui/ui";

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  // ...
];

export function Component() {
  return (
    <Select.Root defaultValue="react">
      <Select.Trigger className="flex h-10 w-[200px] items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300">
        <Select.Value placeholder="프레임워크 선택" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
          <Select.Group>
            <Select.Label className="py-1.5 pl-8 pr-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              프레임워크
            </Select.Label>
            {FRAMEWORKS.map((framework) => (
              <Select.Item
                key={framework.value}
                value={framework.value}
                disabled={framework.disabled}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50"
              >
                {framework.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
  `;

  const example2Code = `
import { Select } from "@timeless-ui/ui";

export function Component() {
  return (
    <Select.Root multiple defaultValue={["react", "vue"]}>
      <Select.Trigger className="flex h-10 w-[200px] items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300">
        <Select.Value placeholder="프레임워크 선택" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
          {FRAMEWORKS.map((framework) => (
            <Select.Item
              key={framework.value}
              value={framework.value}
              disabled={framework.disabled}
              className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[state=checked]:font-semibold data-[state=checked]:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:data-[state=checked]:text-zinc-50"
            >
              {framework.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Select"
      description="사용자가 목록에서 옵션을 선택할 수 있도록 하는 컴포넌트입니다."
    >
      <ComponentPreview
        title="단일 선택 (Single Select)"
        description="기본적으로 하나의 항목만 선택할 수 있습니다."
        code={example1Code}
      >
        <Select.Root defaultValue="react">
          <Select.Trigger className="flex h-10 w-[200px] items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300">
            <Select.Value placeholder="프레임워크 선택" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.View>
              <Select.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                <Select.Group>
                  <Select.Label className="py-1.5 pl-8 pr-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    프레임워크
                  </Select.Label>
                  {FRAMEWORKS.map((framework) => (
                    <Select.Item
                      key={framework.value}
                      value={framework.value}
                      disabled={framework.disabled}
                      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50"
                    >
                      {framework.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.View>
          </Select.Portal>
        </Select.Root>
      </ComponentPreview>

      <ComponentPreview
        title="다중 선택 (Multiple Select)"
        description="여러 항목을 동시에 선택할 수 있습니다."
        code={example2Code}
      >
        <Select.Root multiple defaultValue={["react", "vue"]}>
          <Select.Trigger className="flex h-10 w-[200px] items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300">
            <Select.Value placeholder="프레임워크 선택" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.View>
              <Select.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
                {FRAMEWORKS.map((framework) => (
                  <Select.Item
                    key={framework.value}
                    value={framework.value}
                    disabled={framework.disabled}
                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[state=checked]:font-semibold data-[state=checked]:text-zinc-900 data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:data-[state=checked]:text-zinc-50"
                  >
                    {framework.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.View>
          </Select.Portal>
        </Select.Root>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
