import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Checkbox, CheckboxState } from "@timeless-ui/ui";
import React from "react";

export default function CheckboxPage() {
  const propsData = [
    {
      prop: "checked",
      type: `boolean | "mixed"`,
      defaultValue: "-",
      description: "제어 컴포넌트의 체크 상태입니다.",
    },
    {
      prop: "defaultChecked",
      type: "boolean",
      defaultValue: "false",
      description: "비제어 컴포넌트의 기본 체크 상태입니다.",
    },
    {
      prop: "onCheckedChange",
      type: `(checked: boolean | "mixed") => void`,
      defaultValue: "-",
      description: "체크 상태가 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "true로 설정하면 체크박스를 비활성화합니다.",
    },
    {
      prop: "required",
      type: "boolean",
      defaultValue: "false",
      description: "폼 제출 시 필수 항목으로 지정합니다.",
    },
  ];

  const example1Code = `
import { Checkbox } from "@/components/ui/Checkbox";

export function Component() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox.Root id="terms" defaultChecked={true}>
        <Checkbox.Trigger className="w-5 h-5 border ...">
          <Checkbox.Icon />
        </Checkbox.Trigger>
      </Checkbox.Root>
      <label htmlFor="terms">
        이용약관에 동의합니다.
      </label>
    </div>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Checkbox"
      description="사용자가 하나 이상의 옵션을 선택할 수 있는 체크박스 컴포넌트입니다. '체크됨', '미체크', '불확실' 세 가지 상태를 지원합니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="체크박스는 일반적으로 라벨과 함께 사용됩니다. 시각적인 부분과 기능적인 부분이 분리되어 있어 자유롭게 구성할 수 있습니다."
        code={example1Code}
      >
        <div className="flex items-center space-x-2">
          <Checkbox.Root id="terms1" defaultChecked={true}>
            <Checkbox.Trigger className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-400 bg-white data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:data-[state=checked]:bg-blue-500">
              <Checkbox.Icon className="h-4 w-4 text-white" />
            </Checkbox.Trigger>
          </Checkbox.Root>
          <label htmlFor="terms1" className="text-sm font-medium">
            이용약관에 동의합니다.
          </label>
        </div>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
