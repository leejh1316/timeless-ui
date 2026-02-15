import { useState } from "react";
import { Checkbox, CheckboxState } from "@timeless-ui/ui";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 상황에서 Checkbox를 활용하는 방법을 확인하세요.</Document.Paragraph>

    {/* ─── Indeterminate State ─── */}
    <Document.Heading2>중간 상태 (Indeterminate)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>checked</InlineCode> 속성에 <InlineCode>'mixed'</InlineCode> 값을 전달하여 일부만 선택된 상태를 표현할 수 있습니다. 전체
      선택 체크박스에서 자주 사용됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <IndeterminateDemo />
    </PreviewContainer>
    <CodeBlock code={indeterminateCode} className="mb-10" />

    {/* ─── Disabled State ─── */}
    <Document.Heading2>비활성화 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>disabled</InlineCode> 속성을 사용하여 사용자 인터랙션을 차단할 수 있습니다. 체크된 상태와 체크되지 않은 상태 모두
      비활성화할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />

    {/* ─── State Render ─── */}
    <Document.Heading2>상태 기반 렌더링</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Checkbox.State</InlineCode> 컴포넌트를 사용하여 현재 체크 상태에 따라 다른 UI를 렌더링할 수 있습니다. 렌더 프롭 패턴을
      통해 상태 값에 접근합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <StateRenderDemo />
    </PreviewContainer>
    <CodeBlock code={stateRenderCode} className="mb-10" />

    {/* ─── Form Integration ─── */}
    <Document.Heading2>폼 통합</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>name</InlineCode>과 <InlineCode>value</InlineCode> 속성을 사용하여 HTML 폼과 통합할 수 있습니다. 숨겨진 네이티브 input
      요소가 자동으로 렌더링되어 폼 제출 시 값이 전달됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <FormDemo />
    </PreviewContainer>
    <CodeBlock code={formCode} className="mb-10" />

    {/* ─── Read Only ─── */}
    <Document.Heading2>읽기 전용</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>readOnly</InlineCode> 속성을 사용하면 체크박스를 시각적으로 표시하되 사용자가 값을 변경할 수 없도록 설정할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ReadOnlyDemo />
    </PreviewContainer>
    <CodeBlock code={readOnlyCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Indeterminate Demo
   ────────────────────────────────────────────── */

const IndeterminateDemo = () => {
  const [items, setItems] = useState([
    { id: 1, label: "옵션 1", checked: true },
    { id: 2, label: "옵션 2", checked: false },
    { id: 3, label: "옵션 3", checked: false },
  ]);

  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked);
  const parentChecked: CheckboxState = allChecked ? true : someChecked ? "mixed" : false;

  const handleParentChange = () => {
    const newValue = !allChecked;
    setItems(items.map((item) => ({ ...item, checked: newValue })));
  };

  const handleChildChange = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={parentChecked} onCheckedChange={handleParentChange}>
          <Checkbox.Trigger className="group flex items-center gap-1">
            <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
              <Checkbox.Icon size={14} className="text-white" />
            </div>
            <label className="text-sm font-semibold text-neutral-800">전체 선택</label>
          </Checkbox.Trigger>
        </Checkbox.Root>
      </div>
      <div className="ml-6 flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox.Root checked={item.checked} onCheckedChange={() => handleChildChange(item.id)}>
              <Checkbox.Trigger className="group flex items-center gap-1">
                <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
                  <Checkbox.Icon size={14} className="text-white" />
                </div>
                <label className="text-sm text-neutral-700">{item.label}</label>
              </Checkbox.Trigger>
            </Checkbox.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

const indeterminateCode = `const IndeterminateDemo = () => {
  const [items, setItems] = useState([
    { id: 1, label: "옵션 1", checked: true },
    { id: 2, label: "옵션 2", checked: false },
    { id: 3, label: "옵션 3", checked: false },
  ]);

  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked);
  const parentChecked: CheckboxState = allChecked ? true : someChecked ? "mixed" : false;

  const handleParentChange = () => {
    const newValue = !allChecked;
    setItems(items.map((item) => ({ ...item, checked: newValue })));
  };

  const handleChildChange = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={parentChecked} onCheckedChange={handleParentChange}>
          <Checkbox.Trigger className="group flex items-center gap-1">
            <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
              <Checkbox.Icon size={14} className="text-white" />
            </div>
            <label className="text-sm font-semibold text-neutral-800">전체 선택</label>
          </Checkbox.Trigger>
        </Checkbox.Root>
      </div>
      <div className="ml-6 flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox.Root checked={item.checked} onCheckedChange={() => handleChildChange(item.id)}>
              <Checkbox.Trigger className="group flex items-center gap-1">
                <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
                  <Checkbox.Icon size={14} className="text-white" />
                </div>
                <label className="text-sm text-neutral-700">{item.label}</label>
              </Checkbox.Trigger>
            </Checkbox.Root>
          </div>
        ))}
      </div>
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   Disabled Demo
   ────────────────────────────────────────────── */

const DisabledDemo = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={false} disabled>
          <Checkbox.Trigger className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-200 bg-neutral-50 opacity-60">
            <Checkbox.Icon size={14} className="text-neutral-400" />
          </Checkbox.Trigger>
        </Checkbox.Root>
        <label className="text-sm text-neutral-400">비활성화된 체크박스</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={true} disabled>
          <Checkbox.Trigger className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-neutral-300 opacity-60">
            <Checkbox.Icon size={14} className="text-neutral-500" />
          </Checkbox.Trigger>
        </Checkbox.Root>
        <label className="text-sm text-neutral-400">비활성화된 체크박스 (체크됨)</label>
      </div>
    </div>
  );
};

const disabledCode = `const DisabledDemo = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={false} disabled>
          <Checkbox.Trigger className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-200 bg-neutral-50 opacity-60">
            <Checkbox.Icon size={14} className="text-neutral-400" />
          </Checkbox.Trigger>
        </Checkbox.Root>
        <label className="text-sm text-neutral-400">비활성화된 체크박스</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={true} disabled>
          <Checkbox.Trigger className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-neutral-300 opacity-60">
            <Checkbox.Icon size={14} className="text-neutral-500" />
          </Checkbox.Trigger>
        </Checkbox.Root>
        <label className="text-sm text-neutral-400">비활성화된 체크박스 (체크됨)</label>
      </div>
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   State Render Demo
   ────────────────────────────────────────────── */

const StateRenderDemo = () => {
  const [checked, setChecked] = useState<CheckboxState>(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
        <Checkbox.Trigger className="group flex items-center gap-1">
          <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
            <Checkbox.Icon size={14} className="text-white" />
          </div>
          <label className="text-sm text-neutral-700">알림 설정</label>
        </Checkbox.Trigger>
        <Checkbox.State>
          {(state) => (
            <span className="ml-2 text-sm font-medium text-neutral-700">{state ? "알림을 받습니다" : "알림을 받지 않습니다"}</span>
          )}
        </Checkbox.State>
      </Checkbox.Root>
    </div>
  );
};

const stateRenderCode = `const StateRenderDemo = () => {
  const [checked, setChecked] = useState<CheckboxState>(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
        <Checkbox.Trigger className="group flex items-center gap-1">
          <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
            <Checkbox.Icon size={14} className="text-white" />
          </div>
          <label className="text-sm text-neutral-700">알림 설정</label>
        </Checkbox.Trigger>
        <Checkbox.State>
          {(state) => (
            <span className="ml-2 text-sm font-medium text-neutral-700">{state ? "알림을 받습니다" : "알림을 받지 않습니다"}</span>
          )}
        </Checkbox.State>
      </Checkbox.Root>
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   Form Demo
   ────────────────────────────────────────────── */

const FormDemo = () => {
  const [agreed, setAgreed] = useState<CheckboxState>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    alert(`제출된 값: ${formData.get("terms")}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={agreed} onCheckedChange={setAgreed} name="terms" value="accepted">
          <Checkbox.Trigger className="group flex items-center gap-1">
            <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
              <Checkbox.Icon size={14} className="text-white" />
            </div>
            <label className="text-sm text-neutral-700">이용약관에 동의합니다</label>
          </Checkbox.Trigger>
        </Checkbox.Root>
      </div>
      <button
        type="submit"
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
        disabled={!agreed}
      >
        제출하기
      </button>
    </form>
  );
};

const formCode = `const FormDemo = () => {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    alert(\`제출된 값: \${formData.get("terms")}\`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox.Root checked={agreed} onCheckedChange={setAgreed} name="terms" value="accepted">
          <Checkbox.Trigger className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-white transition-colors hover:border-neutral-400 data-[state=checked]:border-neutral-900 data-[state=checked]:bg-neutral-900">
            <Checkbox.Icon size={14} className="text-white" />
          </Checkbox.Trigger>
        </Checkbox.Root>
        <label className="text-sm text-neutral-700">이용약관에 동의합니다</label>
      </div>
      <button
        type="submit"
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
        disabled={!agreed}
      >
        제출하기
      </button>
    </form>
  );
};`;

/* ──────────────────────────────────────────────
   Read Only Demo
   ────────────────────────────────────────────── */

const ReadOnlyDemo = () => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox.Root checked={true} readOnly>
        <Checkbox.Trigger className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-neutral-100 data-[state=checked]:border-neutral-700 data-[state=checked]:bg-neutral-700">
          <Checkbox.Icon size={14} className="text-white" />
        </Checkbox.Trigger>
      </Checkbox.Root>
      <label className="text-sm text-neutral-700">읽기 전용 체크박스 (변경 불가)</label>
    </div>
  );
};

const readOnlyCode = `const ReadOnlyDemo = () => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox.Root checked={true} readOnly>
        <Checkbox.Trigger className="flex h-5 w-5 items-center justify-center rounded border-2 border-neutral-300 bg-neutral-100 data-[state=checked]:border-neutral-700 data-[state=checked]:bg-neutral-700">
          <Checkbox.Icon size={14} className="text-white" />
        </Checkbox.Trigger>
      </Checkbox.Root>
      <label className="text-sm text-neutral-700">읽기 전용 체크박스 (변경 불가)</label>
    </div>
  );
};`;

export { ExampleSection };
