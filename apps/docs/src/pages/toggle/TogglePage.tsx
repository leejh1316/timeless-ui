import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Toggle } from "@timeless-ui/ui";

export default function TogglePage() {
  const propsData = [
    {
      prop: "children",
      type: "(state: boolean) => React.ReactNode",
      defaultValue: "-",
      description: "토글의 UI를 렌더링하는 함수입니다. 현재 상태(on/off)를 인자로 받습니다.",
    },
    {
      prop: "defaultState",
      type: "boolean",
      defaultValue: "false",
      description: "비제어 컴포넌트의 기본 상태입니다.",
    },
    {
      prop: "state",
      type: "boolean",
      defaultValue: "-",
      description: "제어 컴포넌트의 상태값입니다. 이 값을 사용하면 상태를 직접 관리해야 합니다.",
    },
    {
      prop: "onChangeState",
      type: "(state: boolean) => void",
      defaultValue: "-",
      description: "토글 상태가 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "true로 설정하면 토글을 비활성화합니다.",
    },
  ];

  const example1Code = `
import { Toggle } from "@timeless-ui/ui";

export function Component() {
  return (
    <Toggle defaultState={true}>
      {(state) => (
        <div 
          className={\`
            w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300
            \${state ? 'bg-blue-500' : 'bg-gray-300'}
          \`}
        >
          <div 
            className={\`
              w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
              \${state ? 'translate-x-6' : 'translate-x-0'}
            \`}
          />
        </div>
      )}
    </Toggle>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Toggle"
      description="두 가지 상태(on/off)를 전환하는 스위치 컴포넌트입니다. Render Props 패턴을 사용하여 UI를 자유롭게 커스터마이징할 수 있습니다."
    >
      <ComponentPreview
        title="기본 토글 스위치"
        description="Render Props를 사용하여 클래식한 스위치 UI를 구현한 예제입니다. 내부 상태에 따라 배경색과 핸들 위치가 변경됩니다."
        code={example1Code}
      >
        <Toggle defaultState={true}>
          {(state) => (
            <div
              className={`flex h-6 w-12 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${
                state ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
                  state ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          )}
        </Toggle>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
