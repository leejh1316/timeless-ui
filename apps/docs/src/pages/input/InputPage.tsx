import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Input } from "@timeless-ui/ui";
import { useState } from "react";

export default function InputPage() {
  const rootPropsData = [
    {
      prop: "value",
      type: "string",
      defaultValue: "-",
      description: "입력 필드의 현재 값입니다 (제어 컴포넌트).",
    },
    {
      prop: "defaultValue",
      type: "string",
      defaultValue: "-",
      description: "입력 필드의 초기 값입니다 (비제어 컴포넌트).",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultValue: "-",
      description: "값이 변경될 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "onClear",
      type: "() => void",
      defaultValue: "-",
      description: "지우기 버튼이 클릭되었을 때 호출되는 콜백 함수입니다.",
    },
    {
      prop: "name",
      type: "string",
      defaultValue: "-",
      description: "입력 필드의 고유 식별자입니다. Label과 연결에 사용됩니다.",
    },
  ];

  const example1Code = `
import { Input } from "@timeless-ui/ui";

export function Component() {
  return (
    <Input.Root className="flex flex-col gap-2 w-full max-w-sm">
      <Input.Label className="text-sm font-medium">이메일</Input.Label>
      <Input.Field 
        type="email" 
        placeholder="example@email.com" 
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </Input.Root>
  );
}
  `;

  const example2Code = `
import { Input } from "@timeless-ui/ui";

export function Component() {
  return (
    <Input.Root className="flex flex-col gap-2 w-full max-w-sm">
      <Input.Label className="text-sm font-medium">검색</Input.Label>
      <div className="relative">
        <Input.Field 
          placeholder="검색어를 입력하세요" 
          className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input.ClearButton className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
          ✕
        </Input.ClearButton>
      </div>
    </Input.Root>
  );
}
  `;

  const example3Code = `
import { Input } from "@timeless-ui/ui";

export function Component() {
  return (
    <Input.Root className="flex flex-col gap-2 w-full max-w-sm">
      <Input.Label className="text-sm font-medium">비밀번호</Input.Label>
      <Input.Field 
        type="password" 
        required
        minLength={8}
        placeholder="8자 이상 입력하세요" 
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 data-[error=true]:border-red-500"
      />
      <Input.ErrorMessage className="text-xs text-red-500" />
    </Input.Root>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Input"
      description="사용자로부터 텍스트 입력을 받기 위한 컴포넌트입니다. 레이블, 에러 메시지, 지우기 버튼 등을 조합하여 사용할 수 있습니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="Input.Root, Input.Label, Input.Field를 사용하여 기본적인 입력 필드를 구성합니다."
        code={example1Code}
      >
        <div className="w-full max-w-sm rounded-lg border p-4">
          <Input.Root className="flex flex-col gap-2">
            <Input.Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              이메일
            </Input.Label>
            <Input.Field
              type="email"
              placeholder="example@email.com"
              className="rounded-md border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
          </Input.Root>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="지우기 버튼"
        description="Input.ClearButton을 사용하여 입력된 내용을 한 번에 지울 수 있습니다."
        code={example2Code}
      >
        <div className="w-full max-w-sm rounded-lg border p-4">
          <Input.Root className="flex flex-col gap-2">
            <Input.Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              검색
            </Input.Label>
            <div className="relative">
              <Input.Field
                placeholder="검색어를 입력하세요"
                className="w-full rounded-md border bg-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
              />
              <Input.ClearButton className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Input.ClearButton>
            </div>
          </Input.Root>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="유효성 검사"
        description="HTML5 유효성 검사 속성(required, minLength 등)을 사용하고 Input.ErrorMessage로 에러를 표시할 수 있습니다."
        code={example3Code}
      >
        ``
        <div className="w-full max-w-sm rounded-lg border p-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <Input.Root className="flex flex-col gap-2">
              <Input.Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                이메일
              </Input.Label>
              <Input.Field
                type="password"
                required
                minLength={5}
                placeholder="비밀번호는 5자 이상 입력하세요"
                className="rounded-md border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 data-[error=true]:border-red-500 data-[error=true]:focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800"
              />
              <Input.ErrorMessage className="text-xs text-red-500" />
            </Input.Root>
            <button
              type="submit"
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              제출
            </button>
          </form>
        </div>
      </ComponentPreview>

      <PropsTable data={rootPropsData} />
    </ComponentPageLayout>
  );
}
