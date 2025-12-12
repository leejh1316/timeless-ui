import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Textarea } from "@timeless-ui/ui";

export default function TextareaPage() {
  const rootPropsData = [
    {
      prop: "value",
      type: "string",
      defaultValue: "-",
      description: "텍스트 영역의 현재 값입니다 (제어 컴포넌트).",
    },
    {
      prop: "defaultValue",
      type: "string",
      defaultValue: "-",
      description: "텍스트 영역의 초기 값입니다 (비제어 컴포넌트).",
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
      description: "텍스트 영역의 고유 식별자입니다. Label과 연결에 사용됩니다.",
    },
  ];

  const example1Code = `
import { Textarea } from "@timeless-ui/ui";

export function Component() {
  return (
    <Textarea.Root className="flex flex-col gap-2 w-full max-w-sm">
      <Textarea.Label className="text-sm font-medium">자기소개</Textarea.Label>
      <Textarea.Field 
        placeholder="자기소개를 입력하세요" 
        className="min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      />
    </Textarea.Root>
  );
}
  `;

  const example2Code = `
import { Textarea } from "@timeless-ui/ui";

export function Component() {
  return (
    <Textarea.Root className="flex flex-col gap-2 w-full max-w-sm">
      <Textarea.Label className="text-sm font-medium">리뷰 작성</Textarea.Label>
      <Textarea.Field 
        placeholder="리뷰를 작성해주세요 (최대 200자)" 
        maxLength={200}
        className="min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <div className="text-right text-sm text-gray-500">
        <Textarea.Count /> / 200
      </div>
    </Textarea.Root>
  );
}
  `;

  const example3Code = `
import { Textarea } from "@timeless-ui/ui";

export function Component() {
  return (
    <Textarea.Root className="flex flex-col gap-2 w-full max-w-sm">
      <Textarea.Label className="text-sm font-medium">문의 내용</Textarea.Label>
      <div className="relative">
        <Textarea.Field 
          required
          minLength={10}
          placeholder="문의 내용을 상세히 적어주세요 (최소 10자)" 
          className="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 data-[error=true]:border-red-500"
        />
        <Textarea.ClearButton className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
          지우기
        </Textarea.ClearButton>
      </div>
      <Textarea.ErrorMessage className="text-xs text-red-500" />
    </Textarea.Root>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Textarea"
      description="여러 줄의 텍스트를 입력받을 수 있는 컴포넌트입니다. 글자 수 카운트, 유효성 검사 등의 기능을 제공합니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="Textarea.Root, Textarea.Label, Textarea.Field를 사용하여 기본적인 텍스트 영역을 구성합니다."
        code={example1Code}
      >
        <div className="w-full max-w-sm rounded-lg border p-4">
          <Textarea.Root className="flex flex-col gap-2">
            <Textarea.Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              자기소개
            </Textarea.Label>
            <Textarea.Field
              placeholder="자기소개를 입력하세요"
              className="min-h-[100px] resize-y rounded-md border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
          </Textarea.Root>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="글자 수 카운트"
        description="Textarea.Count 컴포넌트를 사용하여 현재 입력된 글자 수를 표시할 수 있습니다."
        code={example2Code}
      >
        <div className="w-full max-w-sm rounded-lg border p-4">
          <Textarea.Root className="flex flex-col gap-2">
            <Textarea.Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              리뷰 작성
            </Textarea.Label>
            <Textarea.Field
              placeholder="리뷰를 작성해주세요 (최대 200자)"
              maxLength={200}
              className="min-h-[100px] resize-none rounded-md border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              <Textarea.Count /> / 200
            </div>
          </Textarea.Root>
        </div>
      </ComponentPreview>

      <PropsTable data={rootPropsData} />
    </ComponentPageLayout>
  );
}
