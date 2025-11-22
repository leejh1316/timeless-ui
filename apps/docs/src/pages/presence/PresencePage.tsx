import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Presence } from "@timeless-ui/ui";
import { useState } from "react";

export default function PresencePage() {
  const propsData = [
    {
      prop: "present",
      type: "boolean",
      defaultValue: "false",
      description: "컴포넌트의 렌더링 여부를 결정합니다. false가 되면 언마운트 애니메이션이 실행됩니다.",
    },
    {
      prop: "children",
      type: "React.ReactElement | ((props: { isPresent: boolean }) => React.ReactElement)",
      defaultValue: "-",
      description: "Presence의 상태에 따라 렌더링될 자식 요소입니다.",
    },
  ];

  const example1Code = `
import { Presence } from "@timeless-ui/ui";
import { useState } from "react";

export function Component() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-[120px]">
      <button 
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800"
      >
        {isOpen ? "Hide" : "Show"}
      </button>
      <Presence present={isOpen}>
        <div 
          className="mt-2 h-20 w-20 rounded-md bg-blue-500 
                     data-[state=open]:animate-in data-[state=closed]:animate-out 
                     data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
                     data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        />
      </Presence>
    </div>
  );
}
  `;

  const PresenceExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex min-w-[100px] flex-col gap-6">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium dark:bg-gray-800"
        >
          {isOpen ? "Hide" : "Show"}
        </button>
        <div>
          <div className="flex h-[120px] gap-6">
            <Presence present={isOpen}>
              {({ isPresent }) => (
                <div
                  hidden={!isPresent}
                  className={`relative mt-2 h-20 w-20 rounded-md bg-blue-500 ${isOpen ? "animate-fade-in" : "animate-fade-out"}`}
                />
              )}
            </Presence>
            <div className="h-20 w-20">
              <div
                hidden={!isOpen}
                className={`relative mt-2 h-20 w-20 rounded-md bg-blue-500 text-white ${isOpen ? "animate-fade-in" : "animate-fade-out"}`}
              >
                Presence 미적용
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ComponentPageLayout
      title="Presence"
      description="컴포넌트가 DOM에서 마운트되거나 언마운트될 때 애니메이션을 적용할 수 있도록 지원하는 유틸리티 컴포넌트입니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="present prop을 사용하여 자식 요소의 표시 여부를 제어합니다"
        code={example1Code}
      >
        <PresenceExample />
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
