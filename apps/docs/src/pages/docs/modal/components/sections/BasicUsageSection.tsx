import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Modal } from "@timeless-ui/ui";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Modal 컴포넌트는 사용자의 주의를 집중시키고 추가 작업을 수행하도록 하는 오버레이 창입니다. 트리거 버튼을 클릭하면 모달이 열리고, 닫기
      버튼이나 오버레이를 클릭하여 닫을 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => (
  <Modal.Root>
    <Modal.Trigger className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      모달 열기
    </Modal.Trigger>
    <Modal.Portal>
      <Modal.Overlay className="inset-0 z-[1000] bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
      <Modal.Content className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
        <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
          <h2 className="mb-2 text-lg font-semibold text-neutral-900">알림</h2>
          <p className="mb-6 text-sm text-neutral-600">
            이것은 기본적인 모달 예제입니다. 오버레이를 클릭하거나 닫기 버튼을 눌러 모달을 닫을 수 있습니다.
          </p>
          <div className="flex justify-end gap-2">
            <Modal.Close className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200">
              닫기
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal.Portal>
  </Modal.Root>
);

const basicCode = `import { Modal } from "@timeless-ui/ui";

const BasicDemo = () => (
  <Modal.Root>
    <Modal.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      모달 열기
    </Modal.Trigger>
    <Modal.Portal>
      <Modal.Overlay className="bg-black/50 inset-0 z-[1000] transition-opacity data-[status=open]:opacity-100 data-[status=close]:opacity-0"/>
      <Modal.Content className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
        <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
          <h2 className="mb-2 text-lg font-semibold text-neutral-900">알림</h2>
          <p className="mb-6 text-sm text-neutral-600">
            이것은 기본적인 모달 예제입니다. 오버레이를 클릭하거나 닫기 버튼을 눌러 모달을 닫을 수 있습니다.
          </p>
          <div className="flex justify-end gap-2">
            <Modal.Close className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200">
              닫기
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal.Portal>
  </Modal.Root>
);`;

export { BasicUsageSection };
