import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { AlertDialog } from "@timeless-ui/ui";

export default function AlertDialogPage() {
  const propsData = [
    {
      prop: "open",
      type: "boolean",
      defaultValue: "-",
      description: "AlertDialog의 열림 상태를 제어합니다.",
    },
    {
      prop: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "AlertDialog가 처음 마운트될 때 열린 상태일지를 결정합니다.",
    },
    {
      prop: "isDismissable",
      type: "boolean",
      defaultValue: "true",
      description: "AlertDialog를 닫을 수 있는지 여부를 결정합니다.",
    },
    {
      prop: "lockScroll",
      type: "boolean",
      defaultValue: "true",
      description: "AlertDialog가 열렸을 때 배경 스크롤을 비활성화할지 결정합니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "AlertDialog의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.",
    },
  ];

  const exampleCode = `
export function Component() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="bg-red-600 text-white ...">
          계정 삭제
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in ..." />
        <AlertDialog.Content className="bg-white rounded-lg shadow-xl ...">
          <h2 className="text-lg font-bold">정말로 삭제하시겠습니까?</h2>
          <p className="mt-2 text-sm text-gray-600">
            이 작업은 되돌릴 수 없습니다. 계정과 관련된 모든 데이터가 영구적으로 삭제됩니다.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="bg-gray-200 text-gray-800 ...">
                취소
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="bg-red-600 text-white ...">
                삭제
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="AlertDialog"
      description="사용자에게 중요한 결정을 내리거나 확인을 요구할 때 사용하는 대화 상자입니다."
    >
      <ComponentPreview
        title="기본 사용법"
        description="AlertDialog는 파괴적인 작업이나 되돌릴 수 없는 작업에 대한 확인을 받는 데 사용됩니다."
        code={exampleCode}
      >
        <AlertDialog.Root lockScroll={true}>
          <AlertDialog.Trigger asChild>
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700">
              AlertDialog 열기
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/60" />
            <AlertDialog.Content className="data-[status=open]:animate-scale-in data-[status=closed]:animate-scale-out fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">정말로 삭제하시겠습니까?</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  이 작업은 되돌릴 수 없습니다. 계정과 관련된 모든 데이터가 영구적으로 삭제됩니다.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <AlertDialog.Cancel asChild>
                    <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                      취소
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                      삭제
                    </button>
                  </AlertDialog.Action>
                </div>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
