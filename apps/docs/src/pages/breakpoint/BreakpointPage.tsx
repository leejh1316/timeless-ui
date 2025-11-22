import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Breakpoint } from "@timeless-ui/ui";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const BreakpointExample = () => {
  return (
    <div className="w-full rounded-lg bg-gray-100 p-6 text-center text-lg font-medium dark:bg-gray-800">
      <p>브라우저 창 크기를 조절하여 표시되는 텍스트를 확인하세요.</p>
      <div className="mt-4 space-y-2">
        <Breakpoint breakpoints={breakpoints} down="sm">
          <p className="text-red-500">sm 사이즈 이하입니다 (... ~ 639px)</p>
        </Breakpoint>
        <Breakpoint breakpoints={breakpoints} only="sm">
          <p className="text-orange-500">sm 사이즈입니다 (640px ~ 767px)</p>
        </Breakpoint>
        <Breakpoint breakpoints={breakpoints} only="md">
          <p className="text-yellow-500">md 사이즈입니다 (768px ~ 1023px)</p>
        </Breakpoint>
        <Breakpoint breakpoints={breakpoints} only="lg">
          <p className="text-green-500">lg 사이즈입니다 (1024px ~ 1279px)</p>
        </Breakpoint>
        <Breakpoint breakpoints={breakpoints} up="xl">
          <p className="text-blue-500">xl 사이즈 이상입니다 (1280px ~ ...)</p>
        </Breakpoint>
      </div>
    </div>
  );
};

export default function BreakpointPage() {
  const propsData = [
    {
      prop: "only",
      type: "string",
      description: "지정된 브레이크포인트에서만 자식 요소를 렌더링합니다.",
    },
    {
      prop: "up",
      type: "string",
      description: "지정된 브레이크포인트 이상일 때 자식 요소를 렌더링합니다.",
    },
    {
      prop: "down",
      type: "string",
      description: "지정된 브레이크포인트 이하일 때 자식 요소를 렌더링합니다.",
    },
    {
      prop: "breakpoints",
      type: "Record<string, number>",
      description: "사용자 정의 브레이크포인트 객체입니다. 기본값이 제공됩니다.",
    },
    {
      prop: "targetRef",
      type: "RefObject<HTMLElement | null>",
      description: "너비를 추적할 특정 요소의 ref입니다. 기본값은 윈도우입니다.",
    },
  ];

  const exampleCode = `
import { Breakpoint } from "@timeless-ui/ui";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function Component() {
  return (
    <div>
      <Breakpoint breakpoints={breakpoints} down="sm">
        <p>sm 사이즈 이하</p>
      </Breakpoint>
      <Breakpoint breakpoints={breakpoints} only="md">
        <p>md 사이즈</p>
      </Breakpoint>
      <Breakpoint breakpoints={breakpoints} up="lg">
        <p>lg 사이즈 이상</p>
      </Breakpoint>
    </div>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Breakpoint"
      description="화면 너비에 따라 조건부로 컴포넌트를 렌더링하는 유틸리티 컴포넌트입니다. 반응형 UI를 선언적으로 구현할 수 있습니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="`only`, `up`, `down` prop을 사용하여 특정 브레이크포인트 조건에 따라 컨텐츠를 표시하거나 숨길 수 있습니다."
        code={exampleCode}
      >
        <BreakpointExample />
      </ComponentPreview>

      <h2 className="mb-4 mt-12 text-2xl font-semibold text-gray-800 dark:text-gray-200">Props</h2>
      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
