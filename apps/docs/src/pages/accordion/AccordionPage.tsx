import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Accordion } from "@timeless-ui/ui";
import { ChevronDown } from "lucide-react";

export default function AccordionPage() {
  const rootPropsData = [
    {
      prop: "mode",
      type: "'single' | 'multiple'",
      defaultValue: "'single'",
      description: "아코디언의 동작 모드를 설정합니다.",
    },
    {
      prop: "value",
      type: "string | string[]",
      defaultValue: "-",
      description: "제어 컴포넌트에서 열려있는 아이템의 값입니다.",
    },
    {
      prop: "defaultValue",
      type: "string | string[]",
      defaultValue: "-",
      description: "비제어 컴포넌트에서 기본으로 열려있는 아이템의 값입니다.",
    },
    {
      prop: "onValueChange",
      type: "(value: string | string[]) => void",
      defaultValue: "-",
      description: "값이 변경될 때 호출되는 콜백입니다.",
    },
    {
      prop: "collapsible",
      type: "boolean",
      defaultValue: "true",
      description: "single 모드에서 모든 아이템을 닫을 수 있는지 여부입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "전체 아코디언을 비활성화합니다.",
    },
    {
      prop: "orientation",
      type: "'horizontal' | 'vertical'",
      defaultValue: "'vertical'",
      description: "아코디언의 방향과 키보드 탐색 방향을 설정합니다.",
    },
  ];

  const itemPropsData = [
    {
      prop: "value",
      type: "string",
      defaultValue: "필수",
      description: "아코디언 아이템의 고유한 값입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "해당 아이템만 비활성화합니다.",
    },
  ];

  const example1Code = `
import { Accordion } from "@timeless-ui/ui";
import { ChevronDown } from "lucide-react";

// tailwind.config.js에 다음 애니메이션 키프레임을 추가해야 합니다.
// keyframes: {
//   "accordion-down": {
//     from: { height: "0" },
//     to: { height: "var(--radix-accordion-content-height)" },
//   },
//   "accordion-up": {
//     from: { height: "var(--radix-accordion-content-height)" },
//     to: { height: "0" },
//   },
// },
// animation: {
//   "accordion-down": "accordion-down 0.2s ease-out",
//   "accordion-up": "accordion-up 0.2s ease-out",
// },

export function Component() {
  return (
    <Accordion.Root mode="single" collapsible className="w-full">
      <Accordion.Item value="item-1" className="border-b">
        <Accordion.Header>
          <Accordion.Trigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            접근성이 좋은가요?
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden text-sm transition-all data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down">
          <div className="pb-4 pt-0">
            네. WAI-ARIA 디자인 패턴을 준수합니다.
          </div>
        </Accordion.Content>
      </Accordion.Item>
      {/* ... more items */}
    </Accordion.Root>
  );
}
  `;

  const example2Code = `
import { Accordion } from "@timeless-ui/ui";
// ...

export function Component() {
  return (
    <Accordion.Root mode="multiple" className="w-full">
      {/* ... Accordion.Items ... */}
    </Accordion.Root>
  );
}
  `;

  const AccordionDemo = ({ mode, ...props }: React.ComponentProps<typeof Accordion.Root>) => (
    <Accordion.Root mode={mode} {...(props as any)} className="w-full max-w-md">
      <Accordion.Item
        value="item-1"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all data-[open=false]:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <Accordion.Header className="w-full">
          <Accordion.Trigger className="flex w-full flex-1 items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-50 data-[open=false]:bg-neutral-50 data-[open=false]:font-semibold dark:text-neutral-100 dark:hover:bg-neutral-800 dark:data-[open=false]:bg-neutral-800 [&[data-state=open]>svg]:rotate-180">
            <span>접근성이 좋은가요?</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm">
          <div className="px-4 pb-4 pt-2 text-neutral-700 dark:text-neutral-300">
            네. WAI-ARIA 디자인 패턴을 준수합니다.
          </div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item
        value="item-2"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all data-[open=false]:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <Accordion.Header className="w-full">
          <Accordion.Trigger className="flex w-full flex-1 items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-50 data-[open=false]:bg-neutral-50 data-[open=false]:font-semibold dark:text-neutral-100 dark:hover:bg-neutral-800 dark:data-[open=false]:bg-neutral-800 [&[data-state=open]>svg]:rotate-180">
            <span>스타일링이 되어 있나요?</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm">
          <div className="px-4 pb-4 pt-2 text-neutral-700 dark:text-neutral-300">
            아니요. 헤드리스 컴포넌트로, 원하는 스타일을 직접 적용할 수 있습니다.
          </div>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item
        value="item-3"
        className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all data-[open=false]:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <Accordion.Header className="w-full">
          <Accordion.Trigger className="flex w-full flex-1 items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-50 data-[open=false]:bg-neutral-50 data-[open=false]:font-semibold dark:text-neutral-100 dark:hover:bg-neutral-800 dark:data-[open=false]:bg-neutral-800 [&[data-state=open]>svg]:rotate-180">
            <span>애니메이션이 적용되어 있나요?</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[open=false]:animate-accordion-up data-[open=true]:animate-accordion-down overflow-hidden text-sm">
          <div className="px-4 pb-4 pt-2 text-neutral-700 dark:text-neutral-300">
            아니요, 애니메이션은 keyframes를 사용하여 구현됩니다.
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );

  return (
    <ComponentPageLayout
      title="Accordion"
      description="관련 정보 섹션을 그룹화하여 보여주는 아코디언 컴포넌트입니다. 사용자는 한 번에 하나 또는 여러 섹션을 확장하여 볼 수 있습니다."
    >
      <ComponentPreview
        title="기본 아코디언 (Single)"
        description="한 번에 하나의 아이템만 열 수 있습니다."
        code={example1Code}
      >
        <AccordionDemo mode="single" collapsible defaultValue="item-1" />
      </ComponentPreview>

      <ComponentPreview
        title="다중 선택 아코디언 (Multiple)"
        description="`mode='multiple'`로 설정하면 여러 아이템을 동시에 열 수 있습니다."
        code={example2Code}
      >
        <AccordionDemo mode="multiple" defaultValue={["item-1", "item-2"]} />
      </ComponentPreview>

      <PropsTable data={rootPropsData} />
      <PropsTable data={itemPropsData} />
    </ComponentPageLayout>
  );
}
