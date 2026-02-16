import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { ProgressBar } from "@timeless-ui/react";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useState, useEffect } from "react";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>

    {/* ─── Controlled Progress ─── */}
    <Document.Heading2>제어된 진행바</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>useState</InlineCode>를 사용하여 진행바의 값을 동적으로 제어할 수 있습니다. 버튼 클릭이나 외부 이벤트에 따라 진행 상태를
      업데이트하는 패턴입니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />

    {/* ─── Custom Range ─── */}
    <Document.Heading2>사용자 정의 범위</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>min</InlineCode>과 <InlineCode>max</InlineCode> props를 사용하여 0~100이 아닌 다른 범위의 진행바를 구현할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CustomRangeDemo />
    </PreviewContainer>
    <CodeBlock code={customRangeCode} className="mb-10" />

    {/* ─── Percent Callback ─── */}
    <Document.Heading2>백분율 콜백 활용</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>getPercentValue</InlineCode> 콜백을 사용하여 계산된 백분율 값을 실시간으로 받아올 수 있습니다. UI에 진행률을 표시하거나
      특정 임계값에 도달했을 때 동작을 트리거하는 데 활용할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <PercentCallbackDemo />
    </PreviewContainer>
    <CodeBlock code={percentCallbackCode} className="mb-10" />
  </section>
);

/* ─────────────────────────────────────────────────────
   Demo Components
   ───────────────────────────────────────────────────── */

const ControlledDemo = () => {
  const [progress, setProgress] = useState(30);

  return (
    <div className="w-full max-w-md space-y-4">
      <ProgressBar.Root>
        <ProgressBar.Track className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <ProgressBar.Value value={progress} className="rounded-full bg-neutral-800 transition-all duration-300" />
        </ProgressBar.Track>
      </ProgressBar.Root>
      <div className="flex gap-2">
        <button
          onClick={() => setProgress((prev) => Math.max(0, prev - 10))}
          className="rounded-md bg-neutral-700 px-4 py-2 text-white transition-colors hover:bg-neutral-800"
        >
          -10%
        </button>
        <button
          onClick={() => setProgress((prev) => Math.min(100, prev + 10))}
          className="rounded-md bg-neutral-700 px-4 py-2 text-white transition-colors hover:bg-neutral-800"
        >
          +10%
        </button>
        <button
          onClick={() => setProgress(0)}
          className="rounded-md bg-neutral-500 px-4 py-2 text-white transition-colors hover:bg-neutral-600"
        >
          초기화
        </button>
      </div>
    </div>
  );
};
const controlledCode = `const ControlledDemo = () => {
  const [progress, setProgress] = useState(30);

  return (
    <div className="w-full max-w-md space-y-4">
      <ProgressBar.Root>
        <ProgressBar.Track className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <ProgressBar.Value value={progress} className="rounded-full bg-neutral-800 transition-all duration-300" />
        </ProgressBar.Track>
      </ProgressBar.Root>
      <div className="flex gap-2">
        <button
          onClick={() => setProgress((prev) => Math.max(0, prev - 10))}
          className="rounded-md bg-neutral-700 px-4 py-2 text-white transition-colors hover:bg-neutral-800"
        >
          -10%
        </button>
        <button
          onClick={() => setProgress((prev) => Math.min(100, prev + 10))}
          className="rounded-md bg-neutral-700 px-4 py-2 text-white transition-colors hover:bg-neutral-800"
        >
          +10%
        </button>
        <button onClick={() => setProgress(0)} className="rounded-md bg-neutral-500 px-4 py-2 text-white transition-colors hover:bg-neutral-600">
          초기화
        </button>
      </div>
    </div>
  );
};`;

const CustomRangeDemo = () => {
  const [value, setValue] = useState(25);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-body-3 text-neutral-600">
        현재 값: <span className="font-semibold">{value}</span> / 50
      </div>
      <ProgressBar.Root min={0} max={50}>
        <ProgressBar.Track className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <ProgressBar.Value value={value} className="rounded-full bg-neutral-700 transition-all duration-300" />
        </ProgressBar.Track>
      </ProgressBar.Root>
      <input
        type="range"
        min="0"
        max="50"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-neutral-700"
      />
    </div>
  );
};

const customRangeCode = `const CustomRangeDemo = () => {
  const [value, setValue] = useState(25);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-body-3 text-neutral-600">
        현재 값: <span className="font-semibold">{value}</span> / 50
      </div>
      <ProgressBar.Root min={0} max={50}>
        <ProgressBar.Track className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <ProgressBar.Value value={value} className="rounded-full bg-neutral-700 transition-all duration-300" />
        </ProgressBar.Track>
      </ProgressBar.Root>
      <input
        type="range"
        min="0"
        max="50"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-neutral-700"
      />
    </div>
  );
};`;

const PercentCallbackDemo = () => {
  const [progress, setProgress] = useState(45);
  const [percent, setPercent] = useState(0);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-body-2 font-semibold text-neutral-800">진행률: {percent.toFixed(0)}%</div>
      <ProgressBar.Root>
        <ProgressBar.Track className="h-3 w-full overflow-hidden rounded-full bg-neutral-200">
          <ProgressBar.Value
            value={progress}
            getPercentValue={setPercent}
            className="rounded-full bg-neutral-700 transition-all duration-300"
          />
        </ProgressBar.Track>
      </ProgressBar.Root>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full accent-neutral-700"
      />
    </div>
  );
};

const percentCallbackCode = `const PercentCallbackDemo = () => {
  const [progress, setProgress] = useState(45);
  const [percent, setPercent] = useState(0);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-body-2 font-semibold text-neutral-800">진행률: {percent.toFixed(0)}%</div>
      <ProgressBar.Root>
        <ProgressBar.Track className="h-3 w-full overflow-hidden rounded-full bg-neutral-200">
          <ProgressBar.Value
            value={progress}
            getPercentValue={setPercent}
            className="rounded-full bg-neutral-700 transition-all duration-300"
          />
        </ProgressBar.Track>
      </ProgressBar.Root>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full accent-neutral-700"
      />
    </div>
  );
};`;

export { ExampleSection };
