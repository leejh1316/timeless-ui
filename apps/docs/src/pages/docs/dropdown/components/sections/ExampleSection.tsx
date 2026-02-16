import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Dropdown } from "@timeless-ui/ui";
import { InlineCode } from "@src/components/ui/InlineCode";

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    <Document.Heading2>비활성화된 아이템 (Disabled)</Document.Heading2>
    <Document.Paragraph mb={6}>
      특정 조건에서 메뉴 항목을 비활성화해야 할 때 <InlineCode>disabled</InlineCode> prop을 사용합니다. 비활성화된 항목은 키보드 포커스를
      받지 않으며 클릭 이벤트가 발생하지 않습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />
  </section>
);

const DisabledDemo = () => (
  <Dropdown.Root>
    <Dropdown.Trigger className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100">
      편집 메뉴
    </Dropdown.Trigger>
    <Dropdown.Portal>
      <Dropdown.View className="z-50">
        <Dropdown.Content className="flex min-w-[200px] flex-col gap-0.5 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
          <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
            복사하기
          </Dropdown.Item>
          <Dropdown.Item
            disabled
            className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-400 outline-none data-[disabled]:cursor-not-allowed"
          >
            붙여넣기 (비활성화)
          </Dropdown.Item>
          <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
            잘라내기
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.View>
    </Dropdown.Portal>
  </Dropdown.Root>
);

const disabledCode = `
<Dropdown.Root>
  <Dropdown.Trigger className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100">
    편집 메뉴
  </Dropdown.Trigger>
  <Dropdown.Portal>
    <Dropdown.View className="z-50">
      <Dropdown.Content className="flex flex-col gap-0.5 min-w-[200px] rounded-xl border border-neutral-200 bg-white p-1 shadow-lg">
        <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
            복사하기
        </Dropdown.Item>
        <Dropdown.Item disabled className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-400 outline-none data-[disabled]:cursor-not-allowed">
            붙여넣기 (비활성화)
        </Dropdown.Item>
        <Dropdown.Item className="relative flex cursor-default select-none items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-neutral-700 outline-none transition-colors data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900">
            잘라내기
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.View>
  </Dropdown.Portal>
</Dropdown.Root>
`;

export { ExampleSection };
