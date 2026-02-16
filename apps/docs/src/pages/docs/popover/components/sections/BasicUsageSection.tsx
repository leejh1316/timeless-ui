import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Popover } from "@timeless-ui/ui";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Popover 컴포넌트는 트리거 요소와 연결된 부가 정보를 표시하는 팝업 컨테이너입니다. 클릭, 호버, 포커스 등 다양한 방식으로 활성화할 수
      있으며, 자동 위치 조정 기능을 제공합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => (
  <Popover.Root>
    <Popover.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      팝오버 열기
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.View className="z-50">
        <Popover.Content className="w-64 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-sm font-semibold text-neutral-900">팝오버 제목</h3>
          <p className="text-sm text-neutral-600">팝오버 컨텐츠입니다. 추가 정보나 액션을 여기에 배치할 수 있습니다.</p>
        </Popover.Content>
      </Popover.View>
    </Popover.Portal>
  </Popover.Root>
);

const basicCode = `import { Popover } from "@timeless-ui/ui";

const BasicDemo = () => (
  <Popover.Root>
    <Popover.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      팝오버 열기
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.View className="z-50">
        <Popover.Content className="w-64 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-sm font-semibold text-neutral-900">팝오버 제목</h3>
          <p className="text-sm text-neutral-600">
            팝오버 컨텐츠입니다. 추가 정보나 액션을 여기에 배치할 수 있습니다.
          </p>
        </Popover.Content>
      </Popover.View>
    </Popover.Portal>
  </Popover.Root>
);`;

export { BasicUsageSection };
