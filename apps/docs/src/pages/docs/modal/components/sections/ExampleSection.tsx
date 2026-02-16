import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { Modal } from "@timeless-ui/react";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      Modal 컴포넌트의 다양한 활용 패턴과 고급 기능을 확인하세요. 상태 제어, 폼 처리, 확인 다이얼로그 등 실무에서 자주 사용되는 패턴을
      제공합니다.
    </Document.Paragraph>

    {/* Controlled Modal */}
    <Document.Heading2>상태 제어 모달</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>open</InlineCode>과 <InlineCode>onOpenChange</InlineCode> 속성을 사용하여 모달의 열림/닫힘 상태를 외부에서 제어할 수
      있습니다. 이를 통해 프로그래밍 방식으로 모달을 열거나 닫을 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />

    {/* Confirmation Dialog */}
    <Document.Heading2>확인 다이얼로그</Document.Heading2>
    <Document.Paragraph mb={6}>
      사용자의 확인이 필요한 작업에 사용되는 확인/취소 형태의 다이얼로그입니다. 두 개의 액션 버튼을 제공하여 명확한 선택을 유도합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ConfirmationDemo />
    </PreviewContainer>
    <CodeBlock code={confirmationCode} className="mb-10" />

    {/* Form Modal */}
    <Document.Heading2>폼이 포함된 모달</Document.Heading2>
    <Document.Paragraph mb={6}>
      입력 폼을 포함한 모달입니다. <InlineCode>Modal.Close</InlineCode>의 <InlineCode>onClick</InlineCode> 이벤트에서 폼 검증과 같은 비동기
      작업을 수행한 후 모달을 닫을 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <FormDemo />
    </PreviewContainer>
    <CodeBlock code={formCode} className="mb-10" />

    {/* Non-dismissable Modal */}
    <Document.Heading2>닫기 제한 모달</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>isDismissable</InlineCode> 속성을 <InlineCode>false</InlineCode>로 설정하면 오버레이 클릭이나 ESC 키로 모달을 닫을 수
      없으며, 명시적인 닫기 버튼을 통해서만 닫을 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <NonDismissableDemo />
    </PreviewContainer>
    <CodeBlock code={nonDismissableCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Controlled Demo
   ────────────────────────────────────────────── */

const ControlledDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        모달 열기
      </button>
      <span className="text-sm text-neutral-600">상태: {isOpen ? "열림" : "닫힘"}</span>
      <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Portal>
          <Modal.Overlay className="inset-0 z-[1000] bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
          <Modal.Content className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
            <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">제어되는 모달</h2>
              <p className="mb-6 text-sm text-neutral-600">이 모달의 상태는 외부 state로 제어됩니다.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
                >
                  닫기
                </button>
              </div>
            </div>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    </div>
  );
};

const controlledCode = `import { Modal } from "@timeless-ui/react";
import { useState } from "react";

const ControlledDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        모달 열기
      </button>
      <span className="text-sm text-neutral-600">상태: {isOpen ? "열림" : "닫힘"}</span>
      <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Portal>
          <Modal.Overlay className="bg-black/50 inset-0 z-[1000] transition-opacity data-[status=open]:opacity-100 data-[status=close]:opacity-0"/>
          <Modal.Content className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2"> className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2"> className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">>
            
        <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
              <h2 className="mb-2 text-lg font-semibold text-neutral-900">제어되는 모달</h2>
              <p className="mb-6 text-sm text-neutral-600">이 모달의 상태는 외부 state로 제어됩니다.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
                >
                  닫기
                </button>
              </div>
            </div>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   Confirmation Demo
   ────────────────────────────────────────────── */

const ConfirmationDemo = () => {
  const handleConfirm = () => {
    alert("삭제가 확인되었습니다.");
  };

  return (
    <Modal.Root>
      <Modal.Trigger className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
        항목 삭제
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="inset-0 z-[1000] bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
        <Modal.Content className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">삭제 확인</h2>
            <p className="mb-6 text-sm text-neutral-600">정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex justify-end gap-2">
              <Modal.Close className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200">
                취소
              </Modal.Close>
              <Modal.Close
                onClick={handleConfirm}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                삭제
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};

const confirmationCode = `import { Modal } from "@timeless-ui/react";

const ConfirmationDemo = () => {
  const handleConfirm = () => {
    alert("삭제가 확인되었습니다.");
  };

  return (
    <Modal.Root>
      <Modal.Trigger className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
        항목 삭제
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="bg-black/50 inset-0 z-[1000] transition-opacity data-[status=open]:opacity-100 data-[status=close]:opacity-0"/>
        <Modal.Content className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          
        <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">삭제 확인</h2>
            <p className="mb-6 text-sm text-neutral-600">정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex justify-end gap-2">
              <Modal.Close className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200">
                취소
              </Modal.Close>
              <Modal.Close
                onClick={handleConfirm}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                삭제
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};`;

/* ──────────────────────────────────────────────
   Form Demo
   ────────────────────────────────────────────── */

const FormDemo = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    if (!name.trim()) {
      e.preventDefault();
      alert("이름을 입력해주세요.");
    } else {
      alert(`환영합니다, ${name}님!`);
    }
  };

  return (
    <Modal.Root>
      <Modal.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
        프로필 수정
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="inset-0 z-[1000] bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
        <Modal.Content className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">프로필 수정</h2>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-neutral-700">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Modal.Close className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200">
                취소
              </Modal.Close>
              <Modal.Close
                onClick={handleSubmit}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                저장
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};

const formCode = `import { Modal } from "@timeless-ui/react";
import { useState } from "react";

const FormDemo = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    if (!name.trim()) {
      e.preventDefault();
      alert("이름을 입력해주세요.");
    } else {
      alert(\`환영합니다, \${name}님!\`);
    }
  };

  return (
    <Modal.Root>
      <Modal.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
        프로필 수정
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay className="bg-black/50 inset-0 z-[1000] transition-opacity data-[status=open]:opacity-100 data-[status=close]:opacity-0"/>
        <Modal.Content className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
          
        <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">프로필 수정</h2>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-neutral-700">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Modal.Close className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200">
                취소
              </Modal.Close>
              <Modal.Close
                onClick={handleSubmit}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                저장
              </Modal.Close>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};`;

/* ──────────────────────────────────────────────
   Non-dismissable Demo
   ────────────────────────────────────────────── */

const NonDismissableDemo = () => (
  <Modal.Root isDismissable={false}>
    <Modal.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      중요 알림 보기
    </Modal.Trigger>
    <Modal.Portal>
      <Modal.Overlay className="inset-0 z-[1000] bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
      <Modal.Content className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
        <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
          <h2 className="mb-2 text-lg font-semibold text-neutral-900">중요 알림</h2>
          <p className="mb-6 text-sm text-neutral-600">
            이 모달은 반드시 확인 버튼을 눌러야 닫힙니다. 오버레이 클릭이나 ESC 키로는 닫을 수 없습니다.
          </p>
          <div className="flex justify-end gap-2">
            <Modal.Close className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              확인했습니다
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal.Portal>
  </Modal.Root>
);

const nonDismissableCode = `import { Modal } from "@timeless-ui/react";

const NonDismissableDemo = () => (
  <Modal.Root isDismissable={false}>
    <Modal.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      중요 알림 보기
    </Modal.Trigger>
    <Modal.Portal>
      <Modal.Overlay className="bg-black/50 inset-0 z-[1000] transition-opacity data-[status=open]:opacity-100 data-[status=close]:opacity-0"/>
      <Modal.Content className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2"> className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">>
        
        <div className="w-[min(90vw,400px)] rounded-xl bg-white p-6 shadow-xl">
          <h2 className="mb-2 text-lg font-semibold text-neutral-900">중요 알림</h2>
          <p className="mb-6 text-sm text-neutral-600">
            이 모달은 반드시 확인 버튼을 눌러야 닫힙니다. 오버레이 클릭이나 ESC 키로는 닫을 수 없습니다.
          </p>
          <div className="flex justify-end gap-2">
            <Modal.Close className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              확인했습니다
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal.Portal>
  </Modal.Root>
);`;

export { ExampleSection };
