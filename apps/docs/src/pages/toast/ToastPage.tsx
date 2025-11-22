import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Button, Toast } from "@timeless-ui/ui";
import * as React from "react";

function ToastDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(false);
          setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Toast 표시
      </Button>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <Toast.Title className="font-semibold text-gray-900">이벤트 예약됨</Toast.Title>
            <Toast.Description className="text-sm text-gray-600">
              새로운 이벤트가 캘린더에 추가되었습니다.
            </Toast.Description>
          </div>
          <Toast.Close asChild>
            <button className="ml-4 shrink-0 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
              닫기
            </button>
          </Toast.Close>
        </div>
      </Toast.Root>
    </>
  );
}

export default function ToastPage() {
  const propsData = [
    {
      prop: "duration",
      type: "number",
      defaultValue: "5000",
      description: "Toast가 보이는 시간 (ms)을 설정합니다.",
    },
    {
      prop: "open",
      type: "boolean",
      defaultValue: "-",
      description: "Toast의 열림 상태를 제어합니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "Toast의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.",
    },
  ];

  const exampleCode = `
import { Toast, Button } from "@timeless-ui/ui";
import * as React from "react";

export function Component() {
  const [open, setOpen] = React.useState(false);

  return (
    <Toast.Provider>
      <Button
        onClick={() => {
          setOpen(false);
          setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Show Toast
      </Button>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="data-[state=open]:animate-slide-in data-[state=closed]:animate-hide data-[swipe=end]:animate-swipe-out data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <Toast.Title className="font-semibold">Event Scheduled</Toast.Title>
            <Toast.Description className="text-sm text-gray-600">
              A new event has been added to your calendar.
            </Toast.Description>
          </div>
          <Toast.Close>
            <button className="text-gray-500 hover:text-gray-800">
              Close
            </button>
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-4 w-80 m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
}
  `;

  return (
    <ComponentPageLayout title="Toast" description="사용자에게 간단한 알림을 표시하는 컴포넌트입니다.">
      <ComponentPreview
        title="기본 사용법"
        description="Toast는 사용자에게 작업의 결과를 알리거나 간단한 정보를 제공하는 데 사용됩니다."
        code={exampleCode}
      >
        <ToastDemo />
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
