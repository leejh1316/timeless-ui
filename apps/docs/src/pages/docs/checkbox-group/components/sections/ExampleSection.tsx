import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Checkbox, CheckboxGroup } from "@timeless-ui/ui";
import { CheckIcon, MinusIcon } from "lucide-react";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Example Components
   ────────────────────────────────────────────── */

const CheckboxItem = ({ value, label, disabled }: { value: string; label: string; disabled?: boolean }) => (
  <CheckboxGroup.Item value={value} disabled={disabled}>
    <Checkbox.Trigger className="group flex cursor-pointer items-center gap-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50">
      <div className="flex h-5 w-5 items-center justify-center rounded border border-neutral-300 bg-white transition-colors group-hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900">
        <Checkbox.Icon size={14} className="text-white" />
      </div>
      <span className="select-none text-sm text-neutral-700">{label}</span>
    </Checkbox.Trigger>
  </CheckboxGroup.Item>
);

const SelectAllTrigger = ({ allValues, label }: { allValues: string[]; label: string }) => (
  <CheckboxGroup.SelectAll allValues={allValues}>
    <Checkbox.Trigger className="group flex cursor-pointer items-center gap-2 font-medium">
      <div className="flex h-5 w-5 items-center justify-center rounded border border-neutral-300 bg-white transition-colors group-hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=indeterminate]:border-neutral-900 group-data-[state=checked]:bg-neutral-900 group-data-[state=indeterminate]:bg-neutral-900">
        <Checkbox.Icon size={14} className="text-white group-data-[state=checked]:block" />
      </div>
      <span className="select-none text-sm text-neutral-900">{label}</span>
    </Checkbox.Trigger>
  </CheckboxGroup.SelectAll>
);

/* ──────────────────────────────────────────────
   Demos
   ────────────────────────────────────────────── */

const SelectAllDemo = () => {
  const allValues = ["term1", "term2", "term3"];
  return (
    <CheckboxGroup.Root defaultValues={["term1"]}>
      <div className="flex w-64 flex-col gap-4">
        <SelectAllTrigger allValues={allValues} label="전체 동의하기" />
        <div className="h-px bg-neutral-200" />
        <div className="flex flex-col gap-3">
          <CheckboxItem value="term1" label="(필수) 서비스 이용약관" />
          <CheckboxItem value="term2" label="(필수) 개인정보 처리방침" />
          <CheckboxItem value="term3" label="(선택) 마케팅 수신 동의" />
        </div>
      </div>
    </CheckboxGroup.Root>
  );
};

const StateDemo = () => {
  return (
    <CheckboxGroup.Root defaultValues={["react"]}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <CheckboxItem value="react" label="React" />
          <CheckboxItem value="vue" label="Vue" />
          <CheckboxItem value="angular" label="Angular" />
        </div>

        <CheckboxGroup.State>
          {({ values }) => (
            <div className="rounded bg-neutral-100 p-3 text-sm text-neutral-600">
              선택된 프레임워크: <span className="font-semibold text-neutral-900">{values.length > 0 ? values.join(", ") : "없음"}</span>
            </div>
          )}
        </CheckboxGroup.State>
      </div>
    </CheckboxGroup.Root>
  );
};

/* ──────────────────────────────────────────────
   Codes
   ────────────────────────────────────────────── */

const selectAllCode = `const SelectAllDemo = () => {
  const allValues = ["term1", "term2", "term3"];
  
  return (
    <CheckboxGroup.Root defaultValues={["term1"]}>
      <div className="flex flex-col gap-4 w-64">
        <SelectAllTrigger allValues={allValues} label="전체 동의하기" />
        <div className="h-px bg-neutral-200" />
        <div className="flex flex-col gap-3">
          <CheckboxItem value="term1" label="(필수) 서비스 이용약관" />
          <CheckboxItem value="term2" label="(필수) 개인정보 처리방침" />
          <CheckboxItem value="term3" label="(선택) 마케팅 수신 동의" />
        </div>
      </div>
    </CheckboxGroup.Root>
  );
};

const SelectAllTrigger = ({ allValues, label }: { allValues: string[]; label: string }) => (
  <CheckboxGroup.SelectAll allValues={allValues}>
    <Checkbox.Trigger className="group flex items-center gap-2 cursor-pointer font-medium">
      <div className="flex h-5 w-5 items-center justify-center rounded border border-neutral-300 bg-white transition-colors group-hover:border-neutral-400 group-data-[state=checked]:border-neutral-900 group-data-[state=checked]:bg-neutral-900 group-data-[state=indeterminate]:border-neutral-900 group-data-[state=indeterminate]:bg-neutral-900">
        <Checkbox.Icon size={14} className="text-white hidden group-data-[state=checked]:block" />
        <MinusIcon size={14} className="text-white hidden group-data-[state=indeterminate]:block" />
      </div>
      <span className="text-sm text-neutral-900 select-none">{label}</span>
    </Checkbox.Trigger>
  </CheckboxGroup.SelectAll>
);`;

const stateCode = `const StateDemo = () => {
  return (
    <CheckboxGroup.Root defaultValues={["react"]}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <CheckboxItem value="react" label="React" />
          <CheckboxItem value="vue" label="Vue" />
          <CheckboxItem value="angular" label="Angular" />
        </div>
        
        <CheckboxGroup.State>
          {({ values }) => (
            <div className="p-3 bg-neutral-100 rounded text-sm text-neutral-600">
              선택된 프레임워크: <span className="font-semibold text-neutral-900">{values.length > 0 ? values.join(", ") : "없음"}</span>
            </div>
          )}
        </CheckboxGroup.State>
      </div>
    </CheckboxGroup.Root>
  );
};`;

/* ──────────────────────────────────────────────
   Main Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    <Document.Heading2>전체 선택/해제 (Select All)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>CheckboxGroup.SelectAll</InlineCode> 컴포넌트를 사용하여 그룹 내 모든 항목을 한 번에 제어할 수 있습니다. 일부만 선택된
      경우 <InlineCode>mixed</InlineCode> 상태를 가집니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <SelectAllDemo />
    </PreviewContainer>
    <CodeBlock code={selectAllCode} className="mb-10" />

    <Document.Heading2>상태 접근 (State Render Prop)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>CheckboxGroup.State</InlineCode>를 사용하여 현재 선택된 <InlineCode>values</InlineCode>에 접근하고 UI를 동적으로 렌더링할
      수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <StateDemo />
    </PreviewContainer>
    <CodeBlock code={stateCode} className="mb-10" />
  </section>
);

export { ExampleSection };
