import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { InView } from "@timeless-ui/ui";

export default function InViewPage() {
  const propsData = [
    {
      prop: "children",
      type: "(state: { isVisible, hasEntered, resetOnce }) => React.ReactNode",
      defaultValue: "-",
      description: "렌더링할 함수입니다. isVisible, hasEntered 등의 상태를 인자로 받습니다.",
    },
    {
      prop: "threshold",
      type: "number | number[]",
      defaultValue: "0",
      description: "요소가 얼마나 보여야 교차(intersection)로 간주할지 결정하는 값입니다. (0.0 ~ 1.0)",
    },
    {
      prop: "rootMargin",
      type: "string",
      defaultValue: "'0px'",
      description: "루트(root) 요소의 경계 상자를 확장하거나 축소하는 CSS margin 값입니다.",
    },
    {
      prop: "once",
      type: "boolean",
      defaultValue: "false",
      description: "true로 설정하면, 요소가 한 번이라도 뷰포트에 들어온 후에는 관찰을 중단합니다.",
    },
    {
      prop: "onEnter",
      type: "(entry) => void",
      defaultValue: "-",
      description: "요소가 뷰포트에 들어왔을 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "onLeave",
      type: "(entry) => void",
      defaultValue: "-",
      description: "요소가 뷰포트에서 나갔을 때 호출되는 콜백 함수입니다.",
    },
  ];

  const example1Code = `
import { InView } from "@/components/ui/InView";

export function Component() {
  return (
    <InView threshold={0.4}>
      {({ isVisible }) => (
        <div 
          className={\`
            transition-all duration-700
            \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          \`}
        >
          <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg">
            이 요소는 뷰포트에 들어오면 나타납니다.
          </div>
        </div>
      )}
    </InView>
  );
}
  `;

  const example2Code = `
import { InView } from "@/components/ui/InView";

export function Component() {
  return (
    <InView threshold={0.4} once={true}>
      {({ hasEntered }) => (
        <div 
          className={\`
            transition-all duration-700
            \${hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          \`}
        >
          <div className="bg-green-600 text-white p-8 rounded-lg shadow-lg">
            이 요소는 한 번만 나타납니다.
          </div>
        </div>
      )}
    </InView>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="InView"
      description="뷰포트 내 요소의 가시성을 감지하여 애니메이션, 지연 로딩 등 다양한 상호작용을 구현하는 컴포넌트입니다."
    >
      <ComponentPreview
        title="기본적인 페이드-인 애니메이션"
        description="스크롤하여 요소가 뷰포트의 40% 이상 보이면 부드럽게 나타나는 애니메이션을 적용합니다."
        code={example1Code}
      >
        <div className="h-72 w-full overflow-y-scroll rounded-lg border bg-gray-100 p-8 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">아래로 스크롤하세요 👇</p>
          <div className="h-80"></div>
          <InView threshold={0.4}>
            {({ isVisible }) => (
              <div
                style={{
                  transition: "opacity 0.7s, transform 0.7s",
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : "40px"})`,
                }}
              >
                <div className="w-full rounded-lg bg-blue-600 p-8 text-center text-lg font-bold text-white shadow-lg">
                  뷰포트에 들어왔습니다!
                </div>
              </div>
            )}
          </InView>
          <div className="h-80"></div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="한 번만 실행 (once prop)"
        description="once={true}를 설정하면, 애니메이션은 처음에 한 번만 실행되며 다시 뷰포트 밖으로 나갔다 들어와도 반복되지 않습니다."
        code={example2Code}
      >
        <div className="h-72 w-full overflow-y-scroll rounded-lg border bg-gray-100 p-8 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">아래로 스크롤하세요 👇</p>
          <div className="h-80"></div>
          <InView threshold={0.4} once={true}>
            {({ hasEntered }) => (
              <div
                style={{
                  transition: "opacity 0.7s, transform 0.7s",
                  opacity: hasEntered ? 1 : 0,
                  transform: `translateY(${hasEntered ? 0 : "40px"})`,
                }}
              >
                <div className="w-full rounded-lg bg-green-600 p-8 text-center text-lg font-bold text-white shadow-lg">
                  한 번만 실행됩니다!
                </div>
              </div>
            )}
          </InView>
          <div className="h-80"></div>
        </div>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
