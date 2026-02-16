import { Tooltip } from "@timeless-ui/react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Tooltip은 요소 위에 마우스를 올렸을 때 추가 정보를 표시하는 컴포넌트입니다. 기본적으로 hover 모드로 동작하며, 간단한 설명이나 힌트를
      제공할 때 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => (
  <Tooltip.Root>
    <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
      마우스를 올려보세요
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="max-w-xs rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          이것은 툴팁 메시지입니다
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>
);

const basicCode = `<Tooltip.Root>
  <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
    마우스를 올려보세요
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.View className="z-50">
      <Tooltip.Content className="max-w-xs rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
        이것은 툴팁 메시지입니다
      </Tooltip.Content>
    </Tooltip.View>
  </Tooltip.Portal>
</Tooltip.Root>`;

export { BasicUsageSection };
