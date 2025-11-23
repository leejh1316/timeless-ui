import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Modal } from "@timeless-ui/ui";

export default function ModalPage() {
  const propsData = [
    {
      prop: "initialOpen",
      type: "boolean",
      defaultValue: "false",
      description: "모달이 처음 마운트될 때 열린 상태일지를 결정합니다.",
    },
    {
      prop: "lockScroll",
      type: "boolean",
      defaultValue: "true",
      description: "모달이 열렸을 때 배경 스크롤을 비활성화할지 결정합니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "모달의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.",
    },
  ];

  const exampleCode = `
import {
  Modal,
  ModalTrigger,
  ModalOverlay,
  ModalContent,
  ModalClose,
} from "@/components/ui/Modal";

export function Component() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <button className="bg-blue-600 text-white ...">
          모달 열기
        </button>
      </ModalTrigger>
      <ModalOverlay className="bg-black/50 fixed inset-0 animate-fade-in ...">
        <ModalContent className="bg-white rounded-lg shadow-xl ...">
          <h2 className="text-lg font-bold">모달 제목</h2>
          <p className="mt-2 text-sm text-gray-600">
            이것은 모달 대화 상자의 내용입니다. 'ESC' 키를 누르거나
            닫기 버튼을 클릭하여 닫을 수 있습니다.
          </p>
          <div className="mt-4 flex justify-end">
            <ModalClose asChild>
              <button className="bg-gray-200 text-gray-800 ...">
                닫기
              </button>
            </ModalClose>
          </div>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
  `;

  return (
    <ComponentPageLayout
      title="Modal"
      description="사용자의 상호작용이 필요한 콘텐츠를 페이지의 다른 부분과 분리하여 보여주는 대화 상자 컴포넌트입니다."
    >
      <ComponentPreview
        title="기본 모달"
        description="가장 기본적인 형태의 모달입니다. 오버레이, 콘텐츠 영역, 그리고 닫기 버튼으로 구성됩니다."
        code={exampleCode}
      >
        <Modal.Root>
          <Modal.Trigger asChild>
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700">
              모달 열기
            </button>
          </Modal.Trigger>
          <Modal.Overlay className="data-[status=open]:animate-fade-in data-[status=closed]:animate-fade-out fixed inset-0 bg-black/60">
            <Modal.Content>
              <div className=" rounded-xl bg-white p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">결제 확인</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  총 $49.99를 결제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <Modal.Close asChild>
                    <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                      취소
                    </button>
                  </Modal.Close>
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    결제하기
                  </button>
                </div>
              </div>
            </Modal.Content>
          </Modal.Overlay>
        </Modal.Root>
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
