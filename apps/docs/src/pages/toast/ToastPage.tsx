import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Button, Toast } from "@timeless-ui/ui";
import * as React from "react";

function BasicToastDemo() {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);

  return (
    <Toast.Provider swipeDirection="right">
      <Button
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Toast 열기 (Swipe Right)
      </Button>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="data-[state=closed]:animate-toast-out data-[state=open]:animate-toast-in data-[swipe=end]:animate-swipe-out rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-transform"
        style={{ width: 320 }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <Toast.Title className="font-semibold text-gray-900">알림</Toast.Title>
            <Toast.Description className="text-sm text-gray-600">
              오른쪽으로 스와이프하여 닫을 수 있습니다.
            </Toast.Description>
          </div>
          <Toast.Close asChild>
            <button className="ml-4 shrink-0 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
              ✕
            </button>
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 z-[100] m-0 flex w-[320px] max-w-[100vw] list-none flex-col gap-2 outline-none" />
    </Toast.Provider>
  );
}

function StackingDemo() {
  const [toasts, setToasts] = React.useState<{ id: number; title: string }[]>([]);
  const [direction, setDirection] = React.useState<"up" | "down">("down");
  const idCounter = React.useRef(0);

  const addToast = () => {
    const id = ++idCounter.current;
    setToasts((prev) => [...prev, { id, title: `Toast 메시지 #${id}` }]);
  };

  return (
    <Toast.Provider>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="stacking"
              checked={direction === "down"}
              onChange={() => setDirection("down")}
              className="text-blue-600"
            />
            아래로 쌓기 (Down)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="stacking"
              checked={direction === "up"}
              onChange={() => setDirection("up")}
              className="text-blue-600"
            />
            위로 쌓기 (Up)
          </label>
        </div>
        <Button onClick={addToast}>Toast 추가</Button>
      </div>

      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          open={true}
          onOpenChange={(open) => {
            if (!open) setToasts((prev) => prev.filter((t) => t.id !== toast.id));
          }}
          className="data-[state=closed]:animate-toast-out data-[state=open]:animate-toast-in data-[swipe=end]:animate-swipe-out rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300"
          style={{ width: 320 }}
        >
          <div className="flex w-full items-center justify-between">
            <Toast.Title className="font-semibold text-gray-900">{toast.title}</Toast.Title>
            <Toast.Close asChild>
              <button className="text-gray-500 hover:text-gray-800">✕</button>
            </Toast.Close>
          </div>
        </Toast.Root>
      ))}

      <Toast.Viewport
        direction={direction}
        className={`fixed ${direction === "down" ? "top-4" : "bottom-20"} right-4 z-[100] m-0 flex w-[320px] max-w-[100vw] list-none gap-2 outline-none`}
      />
    </Toast.Provider>
  );
}

export default function ToastPage() {
  const providerProps = [
    {
      prop: "duration",
      type: "number",
      defaultValue: "5000",
      description: "Toast가 자동으로 닫히기 전까지의 시간(ms)입니다.",
    },
    {
      prop: "swipeDirection",
      type: '"up" | "down" | "left" | "right"',
      defaultValue: '"right"',
      description: "Toast를 닫기 위한 스와이프 방향입니다.",
    },
    {
      prop: "swipeThreshold",
      type: "number",
      defaultValue: "50",
      description: "Toast를 닫기 위해 스와이프해야 하는 최소 거리(px)입니다.",
    },
  ];

  const viewportProps = [
    {
      prop: "direction",
      type: '"up" | "down"',
      defaultValue: '"down"',
      description: "Toast가 쌓이는 방향을 설정합니다. 'down'은 아래로, 'up'은 위로 쌓입니다.",
    },
  ];

  const rootProps = [
    {
      prop: "open",
      type: "boolean",
      defaultValue: "-",
      description: "Toast의 표시 여부를 제어합니다.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultValue: "-",
      description: "Toast의 표시 상태가 변경될 때 호출됩니다.",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "Provider value",
      description: "해당 Toast의 지속 시간을 설정합니다. Provider의 설정을 덮어씁니다.",
    },
  ];

  const basicCode = `
import { Toast, Button } from "@timeless-ui/ui";

export function BasicToast() {
  const [open, setOpen] = React.useState(false);

  return (
    <Toast.Provider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Toast 열기</Button>
      
      <Toast.Root open={open} onOpenChange={setOpen} className="bg-white p-4 rounded shadow-lg">
        <Toast.Title className="font-bold">알림</Toast.Title>
        <Toast.Description>오른쪽으로 스와이프하여 닫으세요.</Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-80" />
    </Toast.Provider>
  );
}
`;

  const stackingCode = `
import { Toast, Button } from "@timeless-ui/ui";

export function StackingToast() {
  // ... state logic ...

  return (
    <Toast.Provider>
      <Button onClick={addToast}>Toast 추가</Button>
      
      {/* ... map toasts ... */}

      {/* direction="up"으로 설정하면 위로 쌓입니다 (flex-direction: column-reverse) */}
      <Toast.Viewport direction="up" className="fixed bottom-4 right-4 flex gap-2 w-80" />
    </Toast.Provider>
  );
}
`;

  return (
    <ComponentPageLayout title="Toast" description="사용자에게 피드백을 제공하거나 알림을 표시하는 컴포넌트입니다.">
      <ComponentPreview
        title="기본 사용법 & 스와이프"
        description="Toast를 표시하고 지정된 방향으로 스와이프하여 닫을 수 있습니다. 마우스를 올리면 타이머가 일시 정지됩니다."
        code={basicCode}
      >
        <BasicToastDemo />
      </ComponentPreview>

      <ComponentPreview
        title="스택 방향 설정"
        description="Toast.Viewport의 direction prop을 사용하여 Toast가 쌓이는 방향을 제어할 수 있습니다."
        code={stackingCode}
      >
        <StackingDemo />
      </ComponentPreview>

      <div className="mt-10 space-y-8">
        <h3 className="text-xl font-semibold">Provider Props</h3>
        <PropsTable data={providerProps} />

        <h3 className="text-xl font-semibold">Viewport Props</h3>
        <PropsTable data={viewportProps} />

        <h3 className="text-xl font-semibold">Root Props</h3>
        <PropsTable data={rootProps} />
      </div>
    </ComponentPageLayout>
  );
}
