import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Tabs } from "@timeless-ui/ui";

export default function TabsPage() {
  const rootProps = [
    {
      prop: "value",
      type: "string",
      description: "제어 컴포넌트의 활성화된 탭의 값입니다.",
    },
    {
      prop: "defaultValue",
      type: "string",
      description: "비제어 컴포넌트의 기본으로 활성화될 탭의 값입니다.",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      description: "탭 선택이 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "orientation",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: "탭의 방향을 설정합니다.",
    },
  ];

  const triggerProps = [
    {
      prop: "value",
      type: "string",
      description: "탭 트리거를 식별하는 고유한 값입니다. `Tabs.Content`의 `value`와 일치해야 합니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "탭을 비활성화합니다.",
    },
  ];

  const contentProps = [
    {
      prop: "value",
      type: "string",
      description: "탭 콘텐츠를 식별하는 고유한 값입니다. `Tabs.Trigger`의 `value`와 일치해야 합니다.",
    },
  ];

  const example1Code = `
import { Tabs } from "@timeless-ui/ui";

export function Component() {
  return (
    <Tabs.Root defaultValue="account" className="w-[400px]">
      <Tabs.List className="flex rounded-t-lg border-b bg-gray-100 dark:bg-gray-800">
        <Tabs.Trigger
          value="account"
          className="flex-1 cursor-pointer rounded-tl-lg px-4 py-2 text-center text-sm font-medium text-gray-500 transition-all data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
        >
          계정
        </Tabs.Trigger>
        <Tabs.Trigger
          value="password"
          className="flex-1 cursor-pointer rounded-tr-lg px-4 py-2 text-center text-sm font-medium text-gray-500 transition-all data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
        >
          비밀번호
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account" className="rounded-b-lg border border-t-0 p-4">
        <p>계정 정보를 수정하세요.</p>
      </Tabs.Content>
      <Tabs.Content value="password" className="rounded-b-lg border border-t-0 p-4">
        <p>비밀번호를 변경하세요.</p>
      </Tabs.Content>
    </Tabs.Root>
  );
}
  `;

  const example2Code = `
import { Tabs } from "@timeless-ui/ui";

export function Component() {
  return (
    <Tabs.Root defaultValue="profile" orientation="vertical" className="flex w-[500px]">
      <Tabs.List className="flex w-40 flex-col rounded-l-lg border-r bg-gray-100 p-2 dark:bg-gray-800">
        <Tabs.Trigger
          value="profile"
          className="cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 transition-all data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
        >
          프로필
        </Tabs.Trigger>
        <Tabs.Trigger
          value="notifications"
          className="cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 transition-all data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
        >
          알림
        </Tabs.Trigger>
        <Tabs.Trigger
          value="settings"
          disabled
          className="cursor-not-allowed rounded-md px-3 py-2 text-left text-sm font-medium text-gray-400 opacity-50 dark:text-gray-500"
        >
          설정 (비활성화)
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="profile" className="flex-1 rounded-r-lg border border-l-0 p-6">
        <h3 className="text-lg font-semibold">프로필 설정</h3>
        <p className="mt-2 text-sm">여기에 프로필 수정 폼이 표시됩니다.</p>
      </Tabs.Content>
      <Tabs.Content value="notifications" className="flex-1 rounded-r-lg border border-l-0 p-6">
        <h3 className="text-lg font-semibold">알림 설정</h3>
        <p className="mt-2 text-sm">여기에 알림 관련 설정이 표시됩니다.</p>
      </Tabs.Content>
    </Tabs.Root>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Tabs"
      description="콘텐츠 섹션을 여러 개로 나누어 보여줄 때 사용하는 탭 인터페이스입니다. 키보드 탐색을 지원하며 유연한 스타일링이 가능합니다."
    >
      <ComponentPreview
        title="기본 탭"
        description="가장 일반적인 수평 형태의 탭입니다. `Root`, `List`, `Trigger`, `Content`로 구성됩니다."
        code={example1Code}
      >
        <Tabs.Root defaultValue="account" className="w-[400px]">
          <Tabs.List className="flex rounded-t-lg border-b bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Tabs.Trigger
              value="account"
              className="flex-1 cursor-pointer rounded-tl-lg px-4 py-2 text-center text-sm font-medium text-gray-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
            >
              계정
            </Tabs.Trigger>
            <Tabs.Trigger
              value="password"
              className="flex-1 cursor-pointer rounded-tr-lg px-4 py-2 text-center text-sm font-medium text-gray-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
            >
              비밀번호
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="account" className="rounded-b-lg border border-t-0 p-6 dark:border-gray-700">
            <h3 className="text-lg font-semibold">계정 설정</h3>
            <p className="mt-2 text-sm">계정 정보를 수정하세요.</p>
          </Tabs.Content>
          <Tabs.Content value="password" className="rounded-b-lg border border-t-0 p-6 dark:border-gray-700">
            <h3 className="text-lg font-semibold">비밀번호 변경</h3>
            <p className="mt-2 text-sm">비밀번호를 변경하세요.</p>
          </Tabs.Content>
        </Tabs.Root>
      </ComponentPreview>

      <ComponentPreview
        title="세로 탭"
        description="`orientation='vertical'` 속성을 사용하여 탭을 세로 방향으로 표시할 수 있습니다."
        code={example2Code}
      >
        <Tabs.Root defaultValue="profile" orientation="vertical" className="flex w-[500px]">
          <Tabs.List className="flex w-40 flex-col rounded-l-lg border-r bg-gray-100 p-2 dark:border-gray-700 dark:bg-gray-800">
            <Tabs.Trigger
              value="profile"
              className="cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
            >
              프로필
            </Tabs.Trigger>
            <Tabs.Trigger
              value="notifications"
              className="cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-gray-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[active=true]:bg-white data-[active=true]:font-semibold data-[active=true]:text-gray-900 dark:text-gray-400 dark:data-[active=true]:bg-gray-900 dark:data-[active=true]:text-white"
            >
              알림
            </Tabs.Trigger>
            <Tabs.Trigger
              value="settings"
              disabled
              className="cursor-not-allowed rounded-md px-3 py-2 text-left text-sm font-medium text-gray-400 opacity-50 dark:text-gray-500"
            >
              설정 (비활성화)
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile" className="flex-1 rounded-r-lg border border-l-0 p-6 dark:border-gray-700">
            <h3 className="text-lg font-semibold">프로필 설정</h3>
            <p className="mt-2 text-sm">여기에 프로필 수정 폼이 표시됩니다.</p>
          </Tabs.Content>
          <Tabs.Content
            value="notifications"
            className="flex-1 rounded-r-lg border border-l-0 p-6 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold">알림 설정</h3>
            <p className="mt-2 text-sm">여기에 알림 관련 설정이 표시됩니다.</p>
          </Tabs.Content>
        </Tabs.Root>
      </ComponentPreview>

      <h2 className="mb-4 mt-12 text-2xl font-bold text-gray-800 dark:text-gray-200">Props</h2>
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">Tabs.Root</h3>
      <PropsTable data={rootProps} />
      <h3 className="mt-6 text-xl font-medium text-gray-700 dark:text-gray-300">Tabs.Trigger</h3>
      <PropsTable data={triggerProps} />
      <h3 className="mt-6 text-xl font-medium text-gray-700 dark:text-gray-300">Tabs.Content</h3>
      <PropsTable data={contentProps} />
    </ComponentPageLayout>
  );
}
