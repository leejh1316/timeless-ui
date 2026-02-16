import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { RadioGroup } from "@timeless-ui/react";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴과 실무 사용 사례를 확인하세요.</Document.Paragraph>

    {/* ─── Disabled State ─── */}
    <Document.Heading2>비활성화 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>disabled</InlineCode> prop을 사용하여 특정 항목이나 전체 그룹을 비활성화할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />

    {/* ─── Form Integration ─── */}
    <Document.Heading2>폼 통합</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>name</InlineCode> prop을 지정하면 내부의 숨겨진 네이티브 radio input을 통해 폼 제출이 정상적으로 동작합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <FormDemo />
    </PreviewContainer>
    <CodeBlock code={formCode} className="mb-10" />

    {/* ─── Custom Indicator ─── */}
    <Document.Heading2>커스텀 인디케이터</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Indicator</InlineCode>의 <InlineCode>children</InlineCode>을 함수로 전달하여 체크 상태에 따라 동적으로 렌더링할 수
      있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CustomIndicatorDemo />
    </PreviewContainer>
    <CodeBlock code={customIndicatorCode} className="mb-10" />
  </section>
);

/* ─────────────────────────────────────────────────────
   Demo Components
   ───────────────────────────────────────────────────── */

const UncontrolledDemo = () => {
  return (
    <RadioGroup.Root defaultValue="medium" className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="small"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">작은 크기</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="medium"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">중간 크기</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="large"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">큰 크기</span>
      </label>
    </RadioGroup.Root>
  );
};

const DisabledDemo = () => {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup.Root value={value} onValueChange={setValue} className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="option1"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">활성화된 옵션</span>
      </label>
      <label className="flex cursor-not-allowed items-center gap-3 opacity-50">
        <RadioGroup.Item
          disabled
          value="option2"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">비활성화된 옵션</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="option3"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
        >
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">활성화된 옵션</span>
      </label>
    </RadioGroup.Root>
  );
};
const disabledCode = `const DisabledDemo = () => {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup.Root value={value} onValueChange={setValue} className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item value="option1" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">활성화된 옵션</span>
      </label>
      <label className="flex cursor-not-allowed items-center gap-3 opacity-50">
        <RadioGroup.Item disabled value="option2" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">비활성화된 옵션</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item value="option3" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
          <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">활성화된 옵션</span>
      </label>
    </RadioGroup.Root>
  );
};`;

const FormDemo = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const plan = formData.get("plan");
    setSubmitted(plan as string);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup.Root name="plan" defaultValue="basic" className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-3">
            <RadioGroup.Item
              value="basic"
              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
            >
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
            </RadioGroup.Item>
            <span className="text-body-2 text-neutral-800">기본 플랜</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <RadioGroup.Item
              value="pro"
              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
            >
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
            </RadioGroup.Item>
            <span className="text-body-2 text-neutral-800">프로 플랜</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <RadioGroup.Item
              value="enterprise"
              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800"
            >
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
            </RadioGroup.Item>
            <span className="text-body-2 text-neutral-800">엔터프라이즈 플랜</span>
          </label>
        </RadioGroup.Root>
        <button type="submit" className="rounded-md bg-neutral-700 px-4 py-2 text-white transition-colors hover:bg-neutral-800">
          제출
        </button>
      </form>
      {submitted && (
        <div className="text-body-3 rounded-md bg-neutral-100 p-3 text-neutral-700">
          선택된 플랜: <span className="font-semibold">{submitted}</span>
        </div>
      )}
    </div>
  );
};
const formCode = `const FormDemo = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const plan = formData.get("plan");
    setSubmitted(plan as string);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup.Root name="plan" defaultValue="basic" className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-3">
            <RadioGroup.Item value="basic" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
            </RadioGroup.Item>
            <span className="text-body-2 text-neutral-800">기본 플랜</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <RadioGroup.Item value="pro" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
            </RadioGroup.Item>
            <span className="text-body-2 text-neutral-800">프로 플랜</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <RadioGroup.Item value="enterprise" className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800 data-[state=checked]:bg-neutral-800">
              <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-white" />
            </RadioGroup.Item>
            <span className="text-body-2 text-neutral-800">엔터프라이즈 플랜</span>
          </label>
        </RadioGroup.Root>
        <button type="submit" className="rounded-md bg-neutral-700 px-4 py-2 text-white transition-colors hover:bg-neutral-800">
          제출
        </button>
      </form>
      {submitted && (
        <div className="text-body-3 rounded-md bg-neutral-100 p-3 text-neutral-700">
          선택된 플랜: <span className="font-semibold">{submitted}</span>
        </div>
      )}
    </div>
  );
};`;

const CustomIndicatorDemo = () => {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup.Root value={value} onValueChange={setValue} className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="option1"
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800"
        >
          <RadioGroup.Indicator>
            {(isChecked) => <div className={`h-3 w-3 rounded-full transition-all ${isChecked ? "scale-100 bg-neutral-800" : "scale-0"}`} />}
          </RadioGroup.Indicator>
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">애니메이션 효과</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item
          value="option2"
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800"
        >
          <RadioGroup.Indicator>
            {(isChecked) => <div className={`h-3 w-3 rounded-full transition-all ${isChecked ? "scale-100 bg-neutral-800" : "scale-0"}`} />}
          </RadioGroup.Indicator>
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">스케일 전환</span>
      </label>
    </RadioGroup.Root>
  );
};

const customIndicatorCode = `const CustomIndicatorDemo = () => {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup.Root value={value} onValueChange={setValue} className="flex flex-col gap-3">
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item value="option1" className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800">
          <RadioGroup.Indicator>
            {(isChecked) => (
              <div className={\`h-3 w-3 rounded-full transition-all \${isChecked ? "bg-neutral-800 scale-100" : "scale-0"}\`} />
            )}
          </RadioGroup.Indicator>
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">애니메이션 효과</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <RadioGroup.Item value="option2" className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-400 transition-colors data-[state=checked]:border-neutral-800">
          <RadioGroup.Indicator>
            {(isChecked) => (
              <div className={\`h-3 w-3 rounded-full transition-all \${isChecked ? "bg-neutral-800 scale-100" : "scale-0"}\`} />
            )}
          </RadioGroup.Indicator>
        </RadioGroup.Item>
        <span className="text-body-2 text-neutral-800">스케일 전환</span>
      </label>
    </RadioGroup.Root>
  );
};`;

export { ExampleSection };
