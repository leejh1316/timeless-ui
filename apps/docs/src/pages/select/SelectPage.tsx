import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@timeless-ui/ui";

const FRAMEWORKS = [
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "svelte", label: "Svelte", disabled: true },
  { key: "angular", label: "Angular" },
  { key: "solid", label: "Solid" },
];

export default function SelectPage() {
  const propsData = [
    {
      prop: "items",
      type: "Array<{key, label, disabled?}>",
      defaultValue: "[]",
      description: "선택 목록에 표시될 아이템 배열입니다.",
    },
    {
      prop: "defaultValues",
      type: "string[]",
      defaultValue: "[]",
      description: "비제어 컴포넌트의 기본 선택값입니다.",
    },
    {
      prop: "values",
      type: "string[]",
      defaultValue: "-",
      description: "제어 컴포넌트의 선택값입니다. 이 값을 사용하면 상태를 직접 관리해야 합니다.",
    },
    {
      prop: "onChangeValues",
      type: "(values: string[]) => void",
      defaultValue: "-",
      description: "선택값이 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "multiple",
      type: "boolean",
      defaultValue: "false",
      description: "true로 설정하면 여러 항목을 선택할 수 있습니다.",
    },
    {
      prop: "closeOnSelect",
      type: "boolean",
      defaultValue: "true",
      description: "항목 선택 시 선택 목록을 닫을지 여부를 결정합니다.",
    },
    {
      prop: "placement",
      type: "string",
      defaultValue: "'bottom'",
      description: "선택 목록이 표시될 위치입니다. (e.g., 'top', 'bottom-start')",
    },
  ];

  const example1Code = `
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/Select";

const FRAMEWORKS = [
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  // ...
];

export function Component() {
  return (
    <Select items={FRAMEWORKS} defaultValues={["react"]}>
      <SelectTrigger placeholder="프레임워크 선택..." className="w-60 ...">
        {(selectedItems) => (
          <span>
            {selectedItems.length > 0
              ? FRAMEWORKS.find(f => f.key === selectedItems[0])?.label
              : "프레임워크 선택..."}
          </span>
        )}
      </SelectTrigger>
      <SelectContent className="w-60 ...">
        {FRAMEWORKS.map((item) => (
          <SelectItem key={item.key} item={item} className="...">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
  `;

  const example2Code = `
import { Select, ... } from "@timeless-ui/ui";

export function Component() {
  return (
    <Select items={FRAMEWORKS} multiple defaultValues={['react', 'vue']}>
      <SelectTrigger placeholder="프레임워크 선택..." className="w-60 ...">
        {(selectedItems) => (
          <span>
            {selectedItems.length > 0
              ? \`\${selectedItems.length}개 선택됨\`
              : "프레임워크 선택..."}
          </span>
        )}
      </SelectTrigger>
      <SelectContent className="w-60 ...">
        {FRAMEWORKS.map((item) => (
          <SelectItem key={item.key} item={item} className="...">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Select"
      description="드롭다운 목록에서 하나 또는 여러 개의 값을 선택할 수 있는 사용자 정의 가능한 선택 컴포넌트입니다."
    >
      <ComponentPreview
        title="단일 선택 (Single Select)"
        description="가장 기본적인 형태로, 목록에서 하나의 항목만 선택할 수 있습니다."
        code={example1Code}
      >
        <Select items={FRAMEWORKS} defaultValues={["react"]}>
          <SelectTrigger
            placeholder="프레임워크 선택..."
            className="flex h-10 w-60 items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:focus:ring-blue-400"
          >
            {(selectedItems) => (
              <span className="truncate">
                {selectedItems.length > 0
                  ? FRAMEWORKS.find((f) => f.key === selectedItems[0])?.label
                  : "프레임워크 선택..."}
              </span>
            )}
          </SelectTrigger>
          <SelectContent className="z-50 w-60 overflow-hidden rounded-md border bg-white text-gray-800 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            {FRAMEWORKS.map((item) => (
              <SelectItem
                key={item.key}
                item={item}
                className="relative flex cursor-default select-none items-center rounded-sm py-2 pl-3 pr-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[focus=true]:bg-gray-100 data-[selected=true]:font-bold data-[selected=true]:text-blue-400 data-[disabled=true]:opacity-50 dark:data-[focus=true]:bg-gray-700"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        title="다중 선택 (Multiple Select)"
        description="`multiple` 속성을 사용하여 여러 항목을 동시에 선택할 수 있습니다."
        code={example2Code}
      >
        <Select items={FRAMEWORKS} multiple defaultValues={["react", "vue"]}>
          <SelectTrigger
            placeholder="프레임워크 선택..."
            className="flex h-10 w-60 items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:focus:ring-blue-400"
          >
            {(selectedItems) => (
              <button className="truncate">
                {selectedItems.length > 0 ? `${selectedItems.length}개 선택됨` : "프레임워크 선택..."}
              </button>
            )}
          </SelectTrigger>
          <SelectContent className="z-50 w-60 overflow-hidden rounded-md border bg-white text-gray-800 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            {FRAMEWORKS.map((item) => (
              <SelectItem
                key={item.key}
                item={item}
                className="relative flex cursor-default select-none items-center rounded-sm py-2 pl-3 pr-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[focus=true]:bg-gray-100 data-[selected=true]:font-bold data-[selected=true]:text-blue-400 data-[disabled=true]:opacity-50 dark:data-[focus=true]:bg-gray-700"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
