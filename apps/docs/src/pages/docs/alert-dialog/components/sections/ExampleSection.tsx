import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { AlertDialog } from "@timeless-ui/ui";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Demo: Controlled
   ────────────────────────────────────────────── */

const ControlledDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className="bg-primary hover:bg-primary-700 active:bg-primary-800 inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white shadow-sm transition-colors">
          구독 취소
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
          <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-title-3 font-semibold">구독을 취소하시겠습니까?</h3>
            <p className="text-body-2 text-ink-secondary mt-2">현재 구독 기간이 끝나면 프리미엄 기능을 이용할 수 없습니다.</p>
            <div className="mt-6 flex justify-end gap-1">
              <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
                유지하기
              </AlertDialog.Cancel>
              <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                구독 취소
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <span className="text-body-3 text-ink-tertiary">
        상태: <code className="font-code rounded bg-neutral-100 px-1.5 py-0.5 text-xs">{open ? "open" : "closed"}</code>
      </span>
    </div>
  );
};

const controlledCode = `const [open, setOpen] = useState(false);

<AlertDialog.Root open={open} onOpenChange={setOpen}>
  <AlertDialog.Trigger className="bg-primary hover:bg-primary-700 active:bg-primary-800 inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white shadow-sm transition-colors">
    구독 취소
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
    <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
      <h3 className="text-title-3 font-semibold">구독을 취소하시겠습니까?</h3>
      <p className="text-body-2 text-ink-secondary mt-2">현재 구독 기간이 끝나면 프리미엄 기능을 이용할 수 없습니다.</p>
      <div className="mt-6 flex justify-end gap-1">
        <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
          유지하기
        </AlertDialog.Cancel>
        <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700">
          구독 취소
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`;

/* ──────────────────────────────────────────────
   Demo: Async Action
   ────────────────────────────────────────────── */

const AsyncActionDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <AlertDialog.Root isDismissable={!loading}>
      <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg bg-amber-500 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 active:bg-amber-700">
        계정 비활성화
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
        <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-title-3 font-semibold">계정을 비활성화하시겠습니까?</h3>
          <p className="text-body-2 text-ink-secondary mt-2">비활성화 후 30일 이내에 다시 활성화할 수 있습니다.</p>
          <div className="mt-6 flex justify-end gap-1">
            <AlertDialog.Cancel
              disabled={loading}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
            >
              취소
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={handleAction}
              disabled={loading}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  처리 중...
                </span>
              ) : (
                "비활성화"
              )}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
const asyncCode = `const [loading, setLoading] = useState(false);

const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault(); // 자동 닫힘 방지
  setLoading(true);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  setLoading(false);
};

<AlertDialog.Root isDismissable={!loading}>
  <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg bg-amber-500 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 active:bg-amber-700">
    계정 비활성화
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
    <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
      <h3 className="text-title-3 font-semibold">계정을 비활성화하시겠습니까?</h3>
      <p className="text-body-2 text-ink-secondary mt-2">비활성화 후 30일 이내에 다시 활성화할 수 있습니다.</p>
      <div className="mt-6 flex justify-end gap-1">
        <AlertDialog.Cancel
          disabled={loading}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
        >
          취소
        </AlertDialog.Cancel>
        <AlertDialog.Action
          onClick={handleAction}
          disabled={loading}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              처리 중...
            </span>
          ) : (
            "비활성화"
          )}
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`;

/* ──────────────────────────────────────────────
   Demo: Non-dismissable
   ────────────────────────────────────────────── */

const NonDismissableDemo = () => (
  <AlertDialog.Root isDismissable={false}>
    <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100">
      약관 동의
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
      <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-title-3 font-semibold">서비스 이용약관에 동의해 주세요</h3>
        <p className="text-body-2 text-ink-secondary mt-2">서비스를 이용하려면 약관에 동의해야 합니다. 외부 클릭으로 닫을 수 없습니다.</p>
        <div className="mt-6 flex justify-end gap-1">
          <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
            거부
          </AlertDialog.Cancel>
          <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
            동의
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
const nonDismissableCode = `<AlertDialog.Root isDismissable={false}>
  <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100">
    약관 동의
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
    <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
      <h3 className="text-title-3 font-semibold">서비스 이용약관에 동의해 주세요</h3>
      <p className="text-body-2 text-ink-secondary mt-2">서비스를 이용하려면 약관에 동의해야 합니다. 외부 클릭으로 닫을 수 없습니다.</p>
      <div className="mt-6 flex justify-end gap-1">
        <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
          거부
        </AlertDialog.Cancel>
        <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
          동의
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`;

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>심화 활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      AlertDialog는 기본적인 확인/취소 외에도, 외부 상태 제어, 비동기 처리, 닫힘 방지 등 다양한 시나리오에 대응할 수 있습니다. 아래 예제를
      통해 실무에서 자주 사용되는 패턴을 확인해 보세요.
    </Document.Paragraph>

    {/* Controlled */}
    <Document.Heading2>Controlled (외부 상태 제어)</Document.Heading2>
    <Document.Paragraph mb={6}>
      open과 onOpenChange props를 사용하면 다이얼로그의 열림/닫힘 상태를 외부에서 직접 제어할 수 있습니다. 특정 조건에 따라 프로그래밍적으로
      다이얼로그를 열거나 닫아야 할 때 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />

    {/* Non-dismissable */}
    <Document.Heading2>닫힘 방지 (Non-dismissable)</Document.Heading2>
    <Document.Paragraph mb={6}>
      isDismissable을 false로 설정하면 오버레이 클릭으로 다이얼로그를 닫을 수 없습니다. 약관 동의처럼 사용자가 반드시 명시적으로 선택해야
      하는 상황에 적합합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <NonDismissableDemo />
    </PreviewContainer>
    <CodeBlock code={nonDismissableCode} />

    {/* Async Action */}
    <Document.Heading2>비동기 작업 처리 (Async Action)</Document.Heading2>
    <Document.Paragraph mb={6}>
      Action 버튼의 onClick에서 e.preventDefault()를 호출하면 자동 닫힘을 방지합니다. 이를 활용하여 API 호출 등의 비동기 작업을 수행하고,
      완료 후에 프로그래밍적으로 다이얼로그를 닫을 수 있습니다. 로딩 중에는 Cancel 버튼을 비활성화하여 사용자의 잘못된 조작을 방지합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <AsyncActionDemo />
    </PreviewContainer>
    <CodeBlock code={asyncCode} className="mb-10" />
  </section>
);

export { ExampleSection };
