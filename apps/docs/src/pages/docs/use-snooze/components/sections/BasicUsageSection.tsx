import { useSnooze } from "@timeless-ui/ui";
import { Modal } from "@timeless-ui/ui";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useEffect, useState } from "react";

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>useSnooze</InlineCode> Hook은 특정 기간 동안 UI 요소를 숨기는 기능을 제공합니다. 사용자가 스누즈를 활성화하면 지정된 기간
      동안 해당 UI가 표시되지 않으며, 스토리지에 상태가 저장됩니다. <InlineCode>isActive</InlineCode>가 <InlineCode>true</InlineCode>일 때
      UI를 표시하고, <InlineCode>snooze</InlineCode> 함수를 호출하여 UI를 숨길 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4 flex-col">
      <span className="mb-1">
        <button
          className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          onClick={() => {
            localStorage.removeItem("notice-modal");
            window.location.reload();
          }}
        >
          리셋
        </button>
      </span>
      <div className="mb-2 text-sm text-neutral-600">모달이 표시됩니다!</div>
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "notice-modal",
    duration: "day",
    storageType: "local",
  });
  const [open, setOpen] = useState(() => isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Portal>
        <Modal.Overlay className="data-[status='close']:animate-fade-out data-[status='open']:animate-fade-in fixed inset-0 z-50 bg-black/50" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Modal.Content className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-3 text-xl font-semibold text-neutral-900">useSnooze 데모</h3>
            <p className="mb-6 text-sm text-neutral-600">서비스 업데이트가 완료되었습니다. 새로운 기능을 확인해보세요!</p>
            <div className="flex gap-2">
              <Modal.Close
                onClick={snooze}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                오늘 하루 보지 않기
              </Modal.Close>
              <Modal.Close className="flex-1 rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                확인
              </Modal.Close>
            </div>
          </Modal.Content>
        </div>
      </Modal.Portal>
    </Modal.Root>
  );
};

const basicCode = `const BasicDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "notice-modal",
    duration: "day",
    storageType: "local",
  });
  const [open, setOpen] = useState(() => isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Portal>
        <Modal.Overlay className="fixed inset-0 z-50 bg-black/50 data-[status='close']:animate-fade-out data-[status='open']:animate-fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Modal.Content className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl data-[state='closed']:animate-scale-out data-[state='open']:animate-scale-in">
            <h3 className="mb-3 text-xl font-semibold text-neutral-900">useSnooze 데모</h3>
            <p className="mb-6 text-sm text-neutral-600">
              서비스 업데이트가 완료되었습니다. 새로운 기능을 확인해보세요!
            </p>
            <div className="flex gap-2">
              <Modal.Close
                onClick={snooze}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                오늘 하루 보지 않기
              </Modal.Close>
              <Modal.Close className="flex-1 rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700">
                확인
              </Modal.Close>
            </div>
          </Modal.Content>
        </div>
      </Modal.Portal>
    </Modal.Root>
  );
};`;

export { BasicUsageSection };
