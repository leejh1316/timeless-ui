import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Slider } from "@timeless-ui/ui";
import { useState } from "react";

export default function SliderPage() {
  const propsData = [
    {
      prop: "value",
      type: "number[]",
      defaultValue: "-",
      description: "슬라이더의 현재 값입니다. (제어 컴포넌트)",
    },
    {
      prop: "defaultValue",
      type: "number[]",
      defaultValue: "[min]",
      description: "슬라이더의 기본 값입니다. (비제어 컴포넌트)",
    },
    {
      prop: "onValueChange",
      type: "(value: number[]) => void",
      defaultValue: "-",
      description: "값이 변경될 때 호출되는 이벤트 핸들러입니다.",
    },
    {
      prop: "min",
      type: "number",
      defaultValue: "0",
      description: "슬라이더의 최소값입니다.",
    },
    {
      prop: "max",
      type: "number",
      defaultValue: "100",
      description: "슬라이더의 최대값입니다.",
    },
    {
      prop: "step",
      type: "number",
      defaultValue: "1",
      description: "값의 증가/감소 단위입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "슬라이더를 비활성화합니다.",
    },
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "슬라이더의 방향입니다.",
    },
    {
      prop: "minStepsBetweenThumbs",
      type: "number",
      defaultValue: "0",
      description: "썸(Thumb) 사이의 최소 간격(단계 수)입니다.",
    },
    {
      prop: "inverted",
      type: "boolean",
      defaultValue: "false",
      description: "슬라이더의 방향을 반전시킵니다.",
    },
  ];

  const example1Code = `
import { Slider } from "@timeless-ui/ui";

export function Component() {
  return (
    <Slider.Root defaultValue={[50]} max={100} step={1} className="relative flex w-full touch-none select-none items-center">
      <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <Slider.Range className="absolute h-full bg-blue-600 dark:bg-blue-500" />
      </Slider.Track>
      <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500" />
    </Slider.Root>
  );
}
`;

  const example2Code = `
import { Slider } from "@timeless-ui/ui";
import { useState } from "react";

export function Component() {
  const [values, setValues] = useState([25, 75]);

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Range: {values[0]} - {values[1]}
      </div>
      <Slider.Root
        value={values}
        onValueChange={setValues}
        min={0}
        max={100}
        step={1}
        minStepsBetweenThumbs={1}
        className="relative flex w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <Slider.Range className="absolute h-full bg-blue-600 dark:bg-blue-500" />
        </Slider.Track>
        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500" />
        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500" />
      </Slider.Root>
    </div>
  );
}
`;

  return (
    <ComponentPageLayout title="Slider" description="사용자가 범위 내에서 값을 선택할 수 있는 입력 컨트롤입니다.">
      <ComponentPreview
        title="기본 슬라이더"
        description="단일 값을 선택하는 기본적인 슬라이더입니다."
        code={example1Code}
      >
        <div className="w-full max-w-sm p-6">
          <Slider.Root
            defaultValue={[50]}
            max={100}
            step={1}
            className="relative flex w-full touch-none select-none items-center"
          >
            <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <Slider.Range className="absolute h-full bg-blue-600 dark:bg-blue-500" />
            </Slider.Track>
            <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500" />
          </Slider.Root>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="범위 슬라이더"
        description="두 개의 핸들을 사용하여 범위를 선택할 수 있습니다."
        code={example2Code}
      >
        <div className="w-full max-w-sm p-6">
          <RangeSliderExample />
        </div>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}

function RangeSliderExample() {
  const [values, setValues] = useState([25, 75]);

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Range: {values[0]} - {values[1]}
      </div>
      <Slider.Root
        value={values}
        onValueChange={setValues}
        min={0}
        max={100}
        step={1}
        minStepsBetweenThumbs={1}
        className="relative flex w-full touch-none select-none items-center"
      >
        <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <Slider.Range className="absolute h-full bg-blue-600 dark:bg-blue-500" />
        </Slider.Track>
        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500" />
        <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-950 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-500" />
      </Slider.Root>
    </div>
  );
}
