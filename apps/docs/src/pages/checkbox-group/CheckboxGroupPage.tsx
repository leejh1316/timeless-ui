import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Checkbox, CheckboxGroup } from "@timeless-ui/ui";
import { useState } from "react";

export default function CheckboxGroupPage() {
  const propsData = [
    {
      prop: "values",
      type: "string[]",
      defaultValue: "-",
      description: "제어 컴포넌트의 선택된 값들의 배열입니다.",
    },
    {
      prop: "defaultValues",
      type: "string[]",
      defaultValue: "[]",
      description: "비제어 컴포넌트의 기본 선택값 배열입니다.",
    },
    {
      prop: "onValuesChange",
      type: "(values: string[]) => void",
      defaultValue: "-",
      description: "선택된 값들의 배열이 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "true로 설정하면 그룹 내 모든 체크박스를 비활성화합니다.",
    },
  ];

  const example1Code = `
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { Checkbox } from "@/components/ui/Checkbox";

export function Component() {
  const notificationOptions = [
    { id: "comments", label: "댓글" },
    { id: "mentions", label: "맨션" },
    { id: "likes", label: "좋아요 (비활성화됨)" },
  ];

  return (
    <CheckboxGroup.Root 
      className="space-y-2"
      defaultValues={["comments", "mentions"]}
    >
      {notificationOptions.map((item) => (
        <CheckboxGroup.Item key={item.id} value={item.id} disabled={item.id === 'likes'}>
          <div className="flex items-center space-x-2">
            <Checkbox.Trigger className="w-5 h-5 border ...">
              <Checkbox.Icon />
            </Checkbox.Trigger>
            <label>{item.label}</label>
          </div>
        </CheckboxGroup.Item>
      ))}
    </CheckboxGroup.Root>
  );
}
  `;

  // Interactive Example Helper
  const InteractiveCheckboxGroup = () => {
    const [selectedValues, setSelectedValues] = useState(["comments"]);
    const notificationOptions = [
      { id: "comments", label: "댓글" },
      { id: "mentions", label: "맨션" },
      { id: "likes", label: "좋아요 (비활성화됨)" },
    ];
    return (
      <div className="w-full max-w-sm">
        <CheckboxGroup.Root
          className="space-y-3 rounded-lg border p-4 dark:border-gray-700"
          values={selectedValues}
          onValuesChange={setSelectedValues}
        >
          {notificationOptions.map((item) => (
            <CheckboxGroup.Item key={item.id} id={item.id} value={item.id} disabled={item.id === "likes"}>
              <div className="flex items-center gap-2">
                <Checkbox.Trigger className="group flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-400 bg-white data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[disabled=true]:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:data-[state=checked]:bg-blue-500">
                  <Checkbox.Icon className="h-4 w-4 text-white" />
                </Checkbox.Trigger>
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium data-[disabled=true]:opacity-50"
                  data-disabled={item.id === "likes"}
                >
                  {item.label}
                </label>
              </div>
            </CheckboxGroup.Item>
          ))}
        </CheckboxGroup.Root>
        <div className="mt-4 rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
          <pre>
            <strong>Selected Values:</strong> {JSON.stringify(selectedValues, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <ComponentPageLayout
      title="Checkbox Group"
      description="여러 개의 체크박스를 하나의 그룹으로 묶어 상태를 관리하는 컴포넌트입니다. 다중 선택 양식을 쉽게 구성할 수 있습니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="CheckboxGroup.Root가 하위 Item들의 상태를 관리합니다. 개별 아이템 또는 그룹 전체를 비활성화할 수 있습니다."
        code={example1Code}
      >
        <InteractiveCheckboxGroup />
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
