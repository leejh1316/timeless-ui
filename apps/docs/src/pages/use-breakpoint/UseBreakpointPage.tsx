import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { useBreakpoint } from "@timeless-ui/ui";
import { useRef } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// 예제 1: 윈도우 너비 추적
const WindowBreakpointExample = () => {
  const { activeBreakpoint } = useBreakpoint({ breakpoints });

  return (
    <div className="w-full text-center">
      <p className="text-lg">브라우저 창의 크기를 조절해보세요.</p>
      <p className="mt-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
        활성 브레이크포인트: <span className="uppercase">{activeBreakpoint || "N/A"}</span>
      </p>
    </div>
  );
};

// 예제 2: 특정 요소 너비 추적
const ElementBreakpointExample = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { activeBreakpoint } = useBreakpoint({ breakpoints, targetRef: ref });

  return (
    <div className="w-full text-center">
      <p className="text-lg">브라우저 창의 크기를 조절해보세요.</p>
      <div
        ref={ref}
        className="resize-horizontal mx-auto mt-4 min-h-[150px] w-full max-w-full overflow-auto rounded-lg border-2 border-dashed border-gray-400 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800"
        style={{ minWidth: "300px" }}
      >
        <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
          요소의 활성 브레이크포인트: <span className="uppercase">{activeBreakpoint || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default function UseBreakpointPage() {
  const hookParams = [
    {
      prop: "breakpoints",
      type: "Record<string, number>",
      description: "브레이크포인트 이름과 최소 너비(px)를 키-값으로 가지는 객체입니다.",
    },
    {
      prop: "targetRef",
      type: "RefObject<HTMLElement | null>",
      defaultValue: "null",
      description: "너비를 추적할 특정 요소의 ref입니다. 생략하거나 null로 두면 윈도우 너비를 추적합니다.",
    },
  ];

  const returnValue = [
    {
      prop: "activeBreakpoint",
      type: "string | undefined",
      description:
        "현재 너비에 해당하는 브레이크포인트의 키(이름)를 반환합니다. 일치하는 브레이크포인트가 없으면 undefined를 반환합니다.",
    },
  ];

  const example1Code = `
import { useBreakpoint } from "@timeless-ui/ui";

const breakpoints = { sm: 640, md: 768, lg: 1024 };

function Component() {
  const activeBreakpoint = useBreakpoint(breakpoints);

  return (
    <div>
      <p>활성 브레이크포인트: {activeBreakpoint || "N/A"}</p>
    </div>
  );
}
  `;

  const example2Code = `
import { useBreakpoint } from "@timeless-ui/ui";
import { useRef } from "react";

const breakpoints = { sm: 640, md: 768, lg: 1024 };

function Component() {
  const elementRef = useRef<HTMLDivElement>(null);
  const activeBreakpoint = useBreakpoint(breakpoints, elementRef);

  return (
    <div ref={elementRef} style={{ resize: 'horizontal', overflow: 'auto', border: '1px solid' }}>
      <p>요소의 활성 브레이크포인트: {activeBreakpoint || "N/A"}</p>
    </div>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="useBreakpoint"
      description="윈도우 또는 특정 요소의 너비에 따라 현재 활성화된 브레이크포인트를 반환하는 React 훅입니다. 반응형 UI를 동적으로 구현할 때 유용합니다."
    >
      <ComponentPreview
        title="윈도우 너비 추적"
        description="훅에 ref를 전달하지 않으면, 윈도우의 너비를 기준으로 브레이크포인트를 계산합니다."
        code={example1Code}
      >
        <WindowBreakpointExample />
      </ComponentPreview>

      <ComponentPreview
        title="특정 요소 너비 추적"
        description="특정 요소의 ref를 전달하면, 해당 요소의 너비를 기준으로 브레이크포인트를 계산합니다."
        code={example2Code}
      >
        <ElementBreakpointExample />
      </ComponentPreview>

      <h2 className="mb-4 mt-12 text-2xl font-semibold text-gray-800 dark:text-gray-200">매개변수 (Parameters)</h2>
      <PropsTable data={hookParams} />

      <h2 className="mb-4 mt-12 text-2xl font-semibold text-gray-800 dark:text-gray-200">반환 값 (Return Value)</h2>
      <PropsTable data={returnValue} />
    </ComponentPageLayout>
  );
}
