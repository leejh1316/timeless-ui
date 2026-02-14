import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { AlertDialog } from "@timeless-ui/ui";

/* ──────────────────────────────────────────────
   Demo: Basic AlertDialog
   ────────────────────────────────────────────── */

const BasicDemo = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger className="inline-flex h-10 items-center justify-center rounded-lg bg-neutral-900 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 active:bg-neutral-950">
      삭제하기
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="z-1000 fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity data-[status=close]:opacity-0 data-[status=open]:opacity-100" />
      <AlertDialog.Content className="z-1000 fixed left-1/2 top-1/2 w-[min(90vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-title-3 font-semibold">정말 삭제하시겠습니까?</h3>
        <p className="text-body-2 text-ink-secondary mt-2">이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.</p>
        <div className="mt-6 flex justify-end gap-1">
          <AlertDialog.Cancel className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
            취소
          </AlertDialog.Cancel>
          <AlertDialog.Action className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700">
            삭제
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

/* ──────────────────────────────────────────────
   Code Snippets
   ────────────────────────────────────────────── */

const basicCode = `<AlertDialog.Root>
  <AlertDialog.Trigger>삭제하기</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <h3>정말 삭제하시겠습니까?</h3>
      <p>이 작업은 되돌릴 수 없습니다.</p>
      <AlertDialog.Cancel>취소</AlertDialog.Cancel>
      <AlertDialog.Action>삭제</AlertDialog.Action>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`;

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      가장 기본적인 AlertDialog 사용 예시입니다. Trigger 버튼을 클릭하면 다이얼로그가 열리고, Cancel 또는 Action 버튼으로 닫을 수 있습니다.
      AlertDialog는 사용자의 명시적인 응답을 요구하기 때문에, 되돌릴 수 없는 작업(삭제, 초기화 등)에 적합합니다.
    </Document.Paragraph>

    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>

    <CodeBlock code={basicCode} />
  </section>
);

export { BasicUsageSection };
