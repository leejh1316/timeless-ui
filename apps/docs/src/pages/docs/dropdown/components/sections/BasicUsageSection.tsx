import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { Dropdown } from "@timeless-ui/ui";
import clsx from "clsx";

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      가장 기본적인 Dropdown 사용 예시입니다. <InlineCode>Trigger</InlineCode>를 클릭하여 메뉴를 열고, 각 <InlineCode>Item</InlineCode>을
      선택하여 동작을 수행합니다.
    </Document.Paragraph>

    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>

    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Demo: Basic Dropdown
   ────────────────────────────────────────────── */

const BasicDemo = () => (
  <Dropdown.Root>
    <Dropdown.Trigger className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 active:bg-neutral-950">
      옵션 선택
    </Dropdown.Trigger>
    <Dropdown.Portal>
      <Dropdown.View className="">
        <Dropdown.Content className="z-50 flex min-w-[200px] flex-col gap-0.5 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
          <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
            새 탭에서 열기
          </Dropdown.Item>
          <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
            링크 복사
          </Dropdown.Item>
          <div className="my-1 h-px bg-neutral-100" />
          <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-red-600 outline-none transition-colors data-[focus]:bg-red-50 data-[focus]:text-red-700">
            삭제
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.View>
    </Dropdown.Portal>
  </Dropdown.Root>
);

const basicCode = `
<Dropdown.Root>
  <Dropdown.Trigger className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 active:bg-neutral-950">
    옵션 선택
  </Dropdown.Trigger>
  <Dropdown.Portal>
    <Dropdown.View className="z-50 min-w-[200px] rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
      <Dropdown.Content className="flex flex-col gap-0.5">
        <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
          새 탭에서 열기
        </Dropdown.Item>
        <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
          링크 복사
        </Dropdown.Item>
        <div className="my-1 h-px bg-neutral-100" />
        <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-red-600 outline-none transition-colors data-[focus]:bg-red-50 data-[focus]:text-red-700">
          삭제
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.View>
  </Dropdown.Portal>
</Dropdown.Root>
`;

export { BasicUsageSection };
