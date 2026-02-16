import { useState } from "react";
import { InView, Image } from "@timeless-ui/react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>InView 컴포넌트의 다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    {/* Once 옵션 */}
    <Document.Heading2>한 번만 실행 (once)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>once</InlineCode> 속성을 <InlineCode>true</InlineCode>로 설정하면 요소가 처음 화면에 나타날 때만 감지하고 이후에는
      감지하지 않습니다. 애니메이션을 한 번만 실행하고 싶을 때 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <OnceDemo />
    </PreviewContainer>
    <CodeBlock code={onceCode} className="mb-10" />

    {/* Threshold 설정 */}
    <Document.Heading2>감지 임계값 (threshold)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>threshold</InlineCode> 속성으로 요소가 얼마나 보일 때 감지할지 설정할 수 있습니다. <InlineCode>0</InlineCode>은
      1픽셀이라도 보이면 감지하고, <InlineCode>1</InlineCode>은 요소가 완전히 보일 때 감지합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ThresholdDemo />
    </PreviewContainer>
    <CodeBlock code={thresholdCode} className="mb-10" />

    {/* Image Lazy Loading */}
    <Document.Heading2>이미지 지연 로딩</Document.Heading2>
    <Document.Paragraph mb={6}>
      Image 컴포넌트의 <InlineCode>startLoading</InlineCode> 속성과 결합하여 이미지가 화면에 보일 때만 로드할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ImageLazyLoadingDemo />
    </PreviewContainer>
    <CodeBlock code={imageLazyLoadingCode} className="mb-10" />

    {/* Animation with hasEntered */}
    <Document.Heading2>진입 애니메이션</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>hasEntered</InlineCode> 속성을 사용하여 요소가 한 번이라도 화면에 들어왔는지 확인할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <AnimationDemo />
    </PreviewContainer>
    <CodeBlock code={animationCode} className="mb-10" />

    {/* ResetOnce */}
    <Document.Heading2>리셋 가능한 once 모드</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>onResetOnce</InlineCode> 콜백으로 리셋 함수를 받아, <InlineCode>once</InlineCode> 모드를 수동으로 재시작할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ResetOnceDemo />
    </PreviewContainer>
    <CodeBlock code={resetOnceCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Demo Components & Code
   ────────────────────────────────────────────── */

// Once Demo
const OnceDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
    <div className="h-100" />
    <InView once>
      {({ hasEntered }) => (
        <div
          className={`mx-auto w-64 rounded-lg bg-neutral-800 p-6 text-center text-white transition-all duration-700 ${
            hasEntered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          한 번만 나타납니다
        </div>
      )}
    </InView>
    <div className="h-100" />
  </div>
);

const onceCode = `import { InView } from "@timeless-ui/react";

const OnceDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
    <div className="h-100" />
    <InView once>
      {({ hasEntered }) => (
        <div
          className={\`mx-auto w-64 rounded-lg bg-neutral-800 p-6 text-center text-white transition-all duration-700 \${
            hasEntered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }\`}
        >
          한 번만 나타납니다
        </div>
      )}
    </InView>
    <div className="h-100" />
  </div>
);`;

// Threshold Demo
const ThresholdDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
    <div className="h-100" />
    <div className="space-y-4 px-4">
      <InView threshold={0}>
        {({ isVisible }) => (
          <div
            className={`rounded-lg p-4 transition-colors ${isVisible ? "bg-neutral-800 text-white" : "bg-neutral-200 text-neutral-600"}`}
          >
            threshold: 0 (1픽셀이라도 보이면 감지)
          </div>
        )}
      </InView>
      <InView threshold={0.5}>
        {({ isVisible }) => (
          <div
            className={`rounded-lg p-4 transition-colors ${isVisible ? "bg-neutral-800 text-white" : "bg-neutral-200 text-neutral-600"}`}
          >
            threshold: 0.5 (50% 이상 보일 때 감지)
          </div>
        )}
      </InView>
      <InView threshold={1}>
        {({ isVisible }) => (
          <div
            className={`rounded-lg p-4 transition-colors ${isVisible ? "bg-neutral-800 text-white" : "bg-neutral-200 text-neutral-600"}`}
          >
            threshold: 1 (완전히 보일 때 감지)
          </div>
        )}
      </InView>
    </div>
    <div className="h-100" />
  </div>
);

const thresholdCode = `import { InView } from "@timeless-ui/react";

const ThresholdDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
    <div className="h-100" />
    <div className="space-y-4 px-4">
      <InView threshold={0}>
        {({ isVisible }) => (
          <div className={\`rounded-lg p-4 transition-colors \${isVisible ? "bg-neutral-800 text-white" : "bg-neutral-200 text-neutral-600"}\`}>
            threshold: 0 (1픽셀이라도 보이면 감지)
          </div>
        )}
      </InView>
      <InView threshold={0.5}>
        {({ isVisible }) => (
          <div className={\`rounded-lg p-4 transition-colors \${isVisible ? "bg-neutral-800 text-white" : "bg-neutral-200 text-neutral-600"}\`}>
            threshold: 0.5 (50% 이상 보일 때 감지)
          </div>
        )}
      </InView>
      <InView threshold={1}>
        {({ isVisible }) => (
          <div className={\`rounded-lg p-4 transition-colors \${isVisible ? "bg-neutral-800 text-white" : "bg-neutral-200 text-neutral-600"}\`}>
            threshold: 1 (완전히 보일 때 감지)
          </div>
        )}
      </InView>
    </div>
    <div className="h-100" />
  </div>
);`;

// Image Lazy Loading Demo
const ImageLazyLoadingDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4">
    <div className="h-100" />
    <div className="space-y-6">
      {[
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
      ].map((src, index) => (
        <InView key={index} once>
          {({ hasEntered }) => (
            <Image.Root src={src} alt={`풍경 ${index + 1}`} startLoading={hasEntered} className="overflow-hidden rounded-lg bg-neutral-100">
              <Image.View className="h-100 w-full transition-all duration-500 data-[status=idle]:scale-105 data-[status=loaded]:scale-100 data-[status=loading]:scale-105 data-[status=idle]:blur-lg data-[status=loaded]:blur-0 data-[status=loading]:blur-lg" />
            </Image.Root>
          )}
        </InView>
      ))}
    </div>
    <div className="h-100" />
  </div>
);

const imageLazyLoadingCode = `import { InView, Image } from "@timeless-ui/react";

const ImageLazyLoadingDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4">
    <div className="h-100" />
    <div className="space-y-6">
      {[
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
      ].map((src, index) => (
        <InView key={index} once>
          {({ hasEntered }) => (
            <Image.Root src={src} alt={\`풍경 \${index + 1}\`} startLoading={hasEntered} className="overflow-hidden rounded-lg bg-neutral-100">
              <Image.View
                className="h-100 w-full transition-all duration-500 data-[status=idle]:blur-lg data-[status=loading]:blur-lg data-[status=loaded]:blur-0 data-[status=idle]:scale-105 data-[status=loading]:scale-105 data-[status=loaded]:scale-100"
              />
            </Image.Root>
          )}
        </InView>
      ))}
    </div>
    <div className="h-100" />
  </div>
);`;

// Animation Demo
const AnimationDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4">
    <div className="h-100" />
    <div className="space-y-8">
      {["첫 번째 항목", "두 번째 항목", "세 번째 항목"].map((text, index) => (
        <InView key={index} once threshold={0.3}>
          {({ hasEntered }) => (
            <div
              className={`rounded-lg bg-neutral-800 p-6 text-white transition-all duration-700`}
              style={{
                transform: hasEntered ? "translateX(0)" : "translateX(-50px)",
                opacity: hasEntered ? 1 : 0,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {text}
            </div>
          )}
        </InView>
      ))}
    </div>
    <div className="h-100" />
  </div>
);

const animationCode = `import { InView } from "@timeless-ui/react";

const AnimationDemo = () => (
  <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4">
    <div className="h-100" />
    <div className="space-y-8">
      {["첫 번째 항목", "두 번째 항목", "세 번째 항목"].map((text, index) => (
        <InView key={index} once threshold={0.3}>
          {({ hasEntered }) => (
            <div
              className={\`rounded-lg bg-neutral-800 p-6 text-white transition-all duration-700\`}
              style={{
                transform: hasEntered ? "translateX(0)" : "translateX(-50px)",
                opacity: hasEntered ? 1 : 0,
                transitionDelay: \`\${index * 100}ms\`,
              }}
            >
              {text}
            </div>
          )}
        </InView>
      ))}
    </div>
    <div className="h-100" />
  </div>
);`;

// ResetOnce Demo
const ResetOnceDemo = () => {
  const [resetFn, setResetFn] = useState<((hardReset?: boolean) => void) | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => resetFn?.(true)}
        disabled={!resetFn}
        className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        애니메이션 리셋
      </button>
      <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
        <div className="h-100" />
        <InView once onResetOnce={(reset) => setResetFn(() => reset)}>
          {({ hasEntered }) => (
            <div
              className={`mx-auto w-64 rounded-lg bg-neutral-800 p-6 text-center text-white transition-all duration-700 ${
                hasEntered ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              리셋 버튼을 눌러보세요
            </div>
          )}
        </InView>
        <div className="h-100" />
      </div>
    </div>
  );
};

const resetOnceCode = `import { useState } from "react";
import { InView } from "@timeless-ui/react";

const ResetOnceDemo = () => {
  const [resetFn, setResetFn] = useState<((hardReset?: boolean) => void) | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => resetFn?.(true)}
        disabled={!resetFn}
        className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        애니메이션 리셋
      </button>
      <div className="h-96 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50">
        <div className="h-100" />
        <InView once onResetOnce={(reset) => setResetFn(() => reset)}>
          {({ hasEntered }) => (
            <div
              className={\`mx-auto w-64 rounded-lg bg-neutral-800 p-6 text-center text-white transition-all duration-700 \${
                hasEntered ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }\`}
            >
              리셋 버튼을 눌러보세요
            </div>
          )}
        </InView>
        <div className="h-100" />
      </div>
    </div>
  );
};`;

export { ExampleSection };
