import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { RadioGroup } from "@timeless-ui/ui";
import { useState } from "react";

// 아이콘 SVG (예제용)
const StandardIcon = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const ExpressIcon = (props: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m5 17 4-10 4 10m-8-4h8m6-3v10m-3-10v10" />
  </svg>
);

export default function RadioGroupPage() {
  const propsData = [
    {
      prop: "value",
      type: "string",
      defaultValue: "-",
      description: "제어 컴포넌트의 선택된 값입니다.",
    },
    {
      prop: "defaultValue",
      type: "string",
      defaultValue: "''",
      description: "비제어 컴포넌트의 기본 선택값입니다.",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "-",
      description: "선택값이 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "true로 설정하면 그룹 내 모든 라디오 버튼을 비활성화합니다.",
    },
    {
      prop: "name",
      type: "string",
      defaultValue: "-",
      description: "폼 제출 시 사용될 공통 name 속성입니다.",
    },
    {
      prop: "required",
      type: "boolean",
      defaultValue: "false",
      description: "폼 제출 시 필수 항목으로 지정합니다.",
    },
  ];

  const example1Code = `
import { RadioGroup } from "@/components/ui/RadioGroup";

export function Component() {
  return (
    <RadioGroup.Root defaultValue="standard" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="standard" id="opt-1" className="...">
          <RadioGroup.Indicator className="..." />
        </RadioGroup.Item>
        <label htmlFor="opt-1">스탠다드</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="express" id="opt-2" className="...">
          <RadioGroup.Indicator className="..." />
        </RadioGroup.Item>
        <label htmlFor="opt-2">익스프레스</label>
      </div>
    </RadioGroup.Root>
  );
}
  `;

  const example2Code = `
import { RadioGroup } from "@/components/ui/RadioGroup";
import { useState } from "react";

export function Component() {
  const [value, setValue] = useState("standard");
  return (
    <RadioGroup.Root value={value} onValueChange={setValue} className="space-y-4">
      <RadioGroup.Item value="standard" id="opt-std" className="group ...">
        {/* ... Card Content ... */}
        <div className="ml-auto ...">
          <RadioGroup.Indicator className="h-3 w-3 rounded-full bg-teal-600 ... data-[state=unchecked]:scale-0" />
        </div>
      </RadioGroup.Item>
      <RadioGroup.Item value="express" id="opt-exp" className="group ...">
        {/* ... Card Content ... */}
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}
  `;

  // Interactive Card Example Helper
  const CardRadioGroupExample = () => {
    const [selectedOption, setSelectedOption] = useState("standard");

    return (
      <div className="w-full max-w-lg">
        <RadioGroup.Root
          className="space-y-4"
          value={selectedOption}
          onValueChange={setSelectedOption}
          name="deliveryOption"
        >
          <RadioGroup.Item
            value="standard"
            id="opt-standard"
            className="group flex w-full cursor-pointer rounded-lg border-2 p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-50 data-[state=unchecked]:hover:border-teal-400 dark:border-gray-700 dark:data-[state=checked]:border-teal-500 dark:data-[state=checked]:bg-teal-900/20 dark:data-[state=unchecked]:hover:border-teal-600"
          >
            <StandardIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            <div className="ml-4">
              <p className="font-semibold text-gray-800 dark:text-gray-200">스탠다드 배송</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">4-5 영업일 소요</p>
            </div>
            <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 group-data-[state=checked]:border-teal-600 dark:border-gray-600 dark:group-data-[state=checked]:border-teal-500">
              <RadioGroup.Indicator className="h-3 w-3 rounded-full bg-teal-600 transition-all duration-200 data-[state=unchecked]:scale-0 dark:bg-teal-500" />
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item
            value="express"
            id="opt-express"
            className="group flex w-full cursor-pointer rounded-lg border-2 p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-50 data-[state=unchecked]:hover:border-teal-400 dark:border-gray-700 dark:data-[state=checked]:border-teal-500 dark:data-[state=checked]:bg-teal-900/20 dark:data-[state=unchecked]:hover:border-teal-600"
          >
            <ExpressIcon className="h-8 w-8 text-teal-600 dark:text-teal-500" />
            <div className="ml-4">
              <p className="font-semibold text-gray-800 dark:text-gray-200">익스프레스 배송</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">1-2 영업일 소요</p>
            </div>
            <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 group-data-[state=checked]:border-teal-600 dark:border-gray-600 dark:group-data-[state=checked]:border-teal-500">
              <RadioGroup.Indicator className="h-3 w-3 rounded-full bg-teal-600 transition-all duration-200 data-[state=unchecked]:scale-0 dark:bg-teal-500" />
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item
            value="sameday"
            id="opt-sameday"
            disabled
            className="group flex w-full rounded-lg border-2 p-4 text-left data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 dark:border-gray-700"
          >
            <ExpressIcon className="h-8 w-8 text-gray-400 dark:text-gray-600" />
            <div className="ml-4">
              <p className="font-semibold text-gray-500 dark:text-gray-500">당일 배송</p>
              <p className="text-sm text-gray-400 dark:text-gray-600">현재 지역에서는 사용 불가</p>
            </div>
            <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-700">
              <RadioGroup.Indicator className="h-3 w-3 scale-0 rounded-full bg-gray-400" />
            </div>
          </RadioGroup.Item>
        </RadioGroup.Root>
      </div>
    );
  };

  return (
    <ComponentPageLayout
      title="Radio Group"
      description="여러 옵션 중 하나만 선택할 수 있는 라디오 버튼 그룹입니다. 키보드 탐색을 완벽하게 지원하며 자유로운 스타일링이 가능합니다."
    >
      <ComponentPreview
        title="기본 라디오 그룹"
        description="가장 기본적인 형태의 라디오 버튼입니다. `Item`과 `Indicator`를 조합하여 구성합니다."
        code={example1Code}
      >
        <RadioGroup.Root defaultValue="standard" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroup.Item
              value="standard"
              id="r1"
              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=checked]:border-blue-600 dark:border-gray-600 dark:data-[state=checked]:border-blue-500"
            >
              <RadioGroup.Indicator className="h-2.5 w-2.5 rounded-full bg-blue-600 transition-all duration-200 data-[state=unchecked]:scale-0 dark:bg-blue-500" />
            </RadioGroup.Item>
            <label htmlFor="r1">스탠다드</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroup.Item
              value="express"
              id="r2"
              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=checked]:border-blue-600 dark:border-gray-600 dark:data-[state=checked]:border-blue-500"
            >
              <RadioGroup.Indicator className="h-2.5 w-2.5 rounded-full bg-blue-600 transition-all duration-200 data-[state=unchecked]:scale-0 dark:bg-blue-500" />
            </RadioGroup.Item>
            <label htmlFor="r2">익스프레스</label>
          </div>
        </RadioGroup.Root>
      </ComponentPreview>

      <ComponentPreview
        title="카드 형태 라디오 그룹"
        description="컴포넌트의 유연성을 활용하여 카드 전체를 선택 가능한 라디오 버튼으로 만들 수 있습니다."
        code={example2Code}
      >
        <CardRadioGroupExample />
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
