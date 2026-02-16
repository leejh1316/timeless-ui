import { useState } from "react";
import { Document } from "@src/components/ui/Document";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Select } from "@timeless-ui/ui";
import { InlineCode } from "@src/components/ui/InlineCode";

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    <Document.Heading2>Controlled 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>value</InlineCode>와 <InlineCode>onValueChange</InlineCode> prop을 사용하여 외부에서 선택 값을 완전히 제어할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />

    <Document.Heading2>다중 선택</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>multiple</InlineCode> prop을 <InlineCode>true</InlineCode>로 설정하면 여러 옵션을 동시에 선택할 수 있습니다. 선택된 값은
      배열로 관리됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <MultipleDemo />
    </PreviewContainer>
    <CodeBlock code={multipleCode} className="mb-10" />

    <Document.Heading2>그룹화된 옵션</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Select.Group</InlineCode>과 <InlineCode>Select.Label</InlineCode>을 사용하여 옵션들을 카테고리별로 그룹화할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <GroupedDemo />
    </PreviewContainer>
    <CodeBlock code={groupedCode} className="mb-10" />

    <Document.Heading2>비활성화 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>disabled</InlineCode> prop을 사용하여 전체 Select를 비활성화하거나, 개별 <InlineCode>Select.Item</InlineCode>을 비활성화할
      수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />

    <Document.Heading2>커스텀 위치 설정</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>placement</InlineCode> prop을 사용하여 드롭다운 메뉴의 표시 위치를 설정할 수 있습니다. Floating UI의 placement 옵션을 모두
      지원합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <PlacementDemo />
    </PreviewContainer>
    <CodeBlock code={placementCode} className="mb-10" />
  </section>
);

const ControlledDemo = () => {
  const [value, setValue] = useState<string | string[] | null>(null);

  return (
    <div className="w-full max-w-sm space-y-4">
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
          <Select.Value placeholder="과일을 선택하세요" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.View className="z-50">
            <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              <Select.Item
                value="apple"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                사과
              </Select.Item>
              <Select.Item
                value="banana"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                바나나
              </Select.Item>
              <Select.Item
                value="orange"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                오렌지
              </Select.Item>
            </Select.Content>
          </Select.View>
        </Select.Portal>
      </Select.Root>
      <div className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600">
        선택된 값: <span className="font-code font-medium">{value || "(없음)"}</span>
      </div>
    </div>
  );
};

const controlledCode = `import { useState } from "react";
import { Select } from "@timeless-ui/ui";

const ControlledDemo = () => {
  const [value, setValue] = useState<string | string[] | null>(null);

  return (
    <div className="w-full max-w-sm space-y-4">
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
          <Select.Value placeholder="과일을 선택하세요" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.View className="z-50">
            <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              <Select.Item value="apple" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                사과
              </Select.Item>
              <Select.Item value="banana" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                바나나
              </Select.Item>
              <Select.Item value="orange" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                오렌지
              </Select.Item>
            </Select.Content>
          </Select.View>
        </Select.Portal>
      </Select.Root>
      <div className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600">
        선택된 값: <span className="font-code font-medium">{value || "(없음)"}</span>
      </div>
    </div>
  );
};`;

const MultipleDemo = () => {
  const [value, setValue] = useState<string | string[] | null>([]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <Select.Root multiple value={value} onValueChange={setValue}>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
          <Select.Value placeholder="여러 과일을 선택하세요" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.View className="z-50">
            <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              <Select.Item
                value="apple"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                사과
              </Select.Item>
              <Select.Item
                value="banana"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                바나나
              </Select.Item>
              <Select.Item
                value="orange"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                오렌지
              </Select.Item>
              <Select.Item
                value="grape"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                포도
              </Select.Item>
            </Select.Content>
          </Select.View>
        </Select.Portal>
      </Select.Root>
      <div className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600">
        선택된 값: <span className="font-code font-medium">{Array.isArray(value) && value.length > 0 ? value.join(", ") : "(없음)"}</span>
      </div>
    </div>
  );
};

const multipleCode = `import { useState } from "react";
import { Select } from "@timeless-ui/ui";

const MultipleDemo = () => {
  const [value, setValue] = useState<string | string[] | null>([]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <Select.Root multiple value={value} onValueChange={setValue}>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
          <Select.Value placeholder="여러 과일을 선택하세요" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.View className="z-50">
            <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              <Select.Item value="apple" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                사과
              </Select.Item>
              <Select.Item value="banana" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                바나나
              </Select.Item>
              <Select.Item value="orange" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                오렌지
              </Select.Item>
              <Select.Item value="grape" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                포도
              </Select.Item>
            </Select.Content>
          </Select.View>
        </Select.Portal>
      </Select.Root>
      <div className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600">
        선택된 값: <span className="font-code font-medium">{Array.isArray(value) && value.length > 0 ? value.join(", ") : "(없음)"}</span>
      </div>
    </div>
  );
};`;

const GroupedDemo = () => (
  <div className="w-64">
    <Select.Root>
      <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
        <Select.Value placeholder="음식을 선택하세요" />
        <Select.Icon className="transition-transform data-[state=open]:rotate-180">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.View className="z-50">
          <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
            <Select.Group className="mb-2">
              <Select.Label className="px-3 py-2 text-xs font-semibold text-neutral-500">과일</Select.Label>
              <Select.Item
                value="apple"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                사과
              </Select.Item>
              <Select.Item
                value="banana"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                바나나
              </Select.Item>
            </Select.Group>
            <Select.Group className="mb-2">
              <Select.Label className="px-3 py-2 text-xs font-semibold text-neutral-500">채소</Select.Label>
              <Select.Item
                value="carrot"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                당근
              </Select.Item>
              <Select.Item
                value="broccoli"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                브로콜리
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.View>
      </Select.Portal>
    </Select.Root>
  </div>
);

const groupedCode = `import { Select } from "@timeless-ui/ui";

const GroupedDemo = () => (
  <div className="w-64">
    <Select.Root>
      <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
        <Select.Value placeholder="음식을 선택하세요" />
        <Select.Icon className="transition-transform data-[state=open]:rotate-180">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.View className="z-50">
          <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
            <Select.Group className="mb-2">
              <Select.Label className="px-3 py-2 text-xs font-semibold text-neutral-500">과일</Select.Label>
              <Select.Item value="apple" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                사과
              </Select.Item>
              <Select.Item value="banana" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                바나나
              </Select.Item>
            </Select.Group>
            <Select.Group className="mb-2">
              <Select.Label className="px-3 py-2 text-xs font-semibold text-neutral-500">채소</Select.Label>
              <Select.Item value="carrot" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                당근
              </Select.Item>
              <Select.Item value="broccoli" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                브로콜리
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.View>
      </Select.Portal>
    </Select.Root>
  </div>
);`;

const DisabledDemo = () => (
  <div className="flex gap-4">
    <div className="w-64">
      <p className="mb-2 text-xs font-medium text-neutral-600">전체 비활성화</p>
      <Select.Root disabled>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-400 transition-colors">
          <Select.Value placeholder="선택 불가" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
      </Select.Root>
    </div>
    <div className="w-64">
      <p className="mb-2 text-xs font-medium text-neutral-600">일부 옵션 비활성화</p>
      <Select.Root>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
          <Select.Value placeholder="선택하세요" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.View className="z-50">
            <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              <Select.Item
                value="option1"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                옵션 1
              </Select.Item>
              <Select.Item value="option2" disabled className="cursor-not-allowed rounded-md px-3 py-2 text-sm text-neutral-400">
                옵션 2 (비활성화)
              </Select.Item>
              <Select.Item
                value="option3"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
              >
                옵션 3
              </Select.Item>
            </Select.Content>
          </Select.View>
        </Select.Portal>
      </Select.Root>
    </div>
  </div>
);

const disabledCode = `import { Select } from "@timeless-ui/ui";

const DisabledDemo = () => (
  <div className="flex gap-4">
    <div className="w-64">
      <p className="mb-2 text-xs font-medium text-neutral-600">전체 비활성화</p>
      <Select.Root disabled>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-400 transition-colors">
          <Select.Value placeholder="선택 불가" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
      </Select.Root>
    </div>
    <div className="w-64">
      <p className="mb-2 text-xs font-medium text-neutral-600">일부 옵션 비활성화</p>
      <Select.Root>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
          <Select.Value placeholder="선택하세요" />
          <Select.Icon className="transition-transform data-[state=open]:rotate-180">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.View className="z-50">
            <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
              <Select.Item value="option1" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                옵션 1
              </Select.Item>
              <Select.Item value="option2" disabled className="cursor-not-allowed rounded-md px-3 py-2 text-sm text-neutral-400">
                옵션 2 (비활성화)
              </Select.Item>
              <Select.Item value="option3" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
                옵션 3
              </Select.Item>
            </Select.Content>
          </Select.View>
        </Select.Portal>
      </Select.Root>
    </div>
  </div>
);`;

const PlacementDemo = () => (
  <div className="w-64">
    <Select.Root placement="top-start">
      <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
        <Select.Value placeholder="위쪽에 표시" />
        <Select.Icon className="transition-transform data-[state=open]:rotate-180">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.View className="z-50">
          <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
            <Select.Item
              value="option1"
              className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
            >
              옵션 1
            </Select.Item>
            <Select.Item
              value="option2"
              className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
            >
              옵션 2
            </Select.Item>
            <Select.Item
              value="option3"
              className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white"
            >
              옵션 3
            </Select.Item>
          </Select.Content>
        </Select.View>
      </Select.Portal>
    </Select.Root>
  </div>
);

const placementCode = `import { Select } from "@timeless-ui/ui";

const PlacementDemo = () => (
  <div className="w-64">
    <Select.Root placement="top-start">
      <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
        <Select.Value placeholder="위쪽에 표시" />
        <Select.Icon className="transition-transform data-[state=open]:rotate-180">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.View className="z-50">
          <Select.Content className="max-h-64 w-64 overflow-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
            <Select.Item value="option1" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
              옵션 1
            </Select.Item>
            <Select.Item value="option2" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
              옵션 2
            </Select.Item>
            <Select.Item value="option3" className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-neutral-100 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-white">
              옵션 3
            </Select.Item>
          </Select.Content>
        </Select.View>
      </Select.Portal>
    </Select.Root>
  </div>
);`;

export { ExampleSection };
