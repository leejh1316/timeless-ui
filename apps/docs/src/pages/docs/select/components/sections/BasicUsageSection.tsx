import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Select } from "@timeless-ui/react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Select 컴포넌트는 사용자가 여러 옵션 중 하나 또는 여러 개를 선택할 수 있는 드롭다운 선택 컴포넌트입니다. 키보드 탐색, 자동 위치 조정,
      타입어헤드 검색 등의 기능을 내장하고 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => (
  <div className="w-64">
    <Select.Root>
      <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
        <Select.Value placeholder="옵션을 선택하세요" />
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
  </div>
);

const basicCode = `import { Select } from "@timeless-ui/react";

const BasicDemo = () => (
  <div className="w-64">
    <Select.Root>
      <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm transition-colors hover:border-neutral-400">
        <Select.Value placeholder="옵션을 선택하세요" />
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
          </Select.Content>
        </Select.View>
      </Select.Portal>
    </Select.Root>
  </div>
);`;

export { BasicUsageSection };
