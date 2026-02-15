import { useRef } from "react";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { Breakpoint, useComposedRefs, useMeasureSize } from "@timeless-ui/ui";
/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      Breakpoint 컴포넌트는 커스텀 브레이크포인트와 특정 요소 기준 반응형 등 다양한 고급 기능을 제공합니다.
    </Document.Paragraph>

    <Document.Heading2>커스텀 브레이크포인트</Document.Heading2>
    <Document.Paragraph mb={6}>
      프로젝트의 디자인 시스템에 맞는 고유한 브레이크포인트를 정의할 수 있습니다.{" "}
      <code className="font-code text-primary-500 rounded-md bg-neutral-100 px-1.5 py-0.5">breakpoints</code> prop에 객체를 전달하여 커스텀
      값을 사용하세요.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CustomBreakpointsDemo />
    </PreviewContainer>
    <CodeBlock code={customBreakpointsCode} className="mb-10" />

    <Document.Heading2>특정 요소 기준 반응형 (Container Queries)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <code className="font-code text-primary-500 rounded-md bg-neutral-100 px-1.5 py-0.5">targetRef</code>를 사용하면 viewport가 아닌 특정
      컨테이너의 너비를 기준으로 반응형 디자인을 구현할 수 있습니다. 이는 재사용 가능한 컴포넌트를 만들 때 특히 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <TargetRefDemo />
    </PreviewContainer>
    <CodeBlock code={targetRefCode} />
  </section>
);

/* ──────────────────────────────────────────────
   Demo: Custom Breakpoints
   ────────────────────────────────────────────── */

const CustomBreakpointsDemo = () => {
  const customBreakpoints = {
    mobile: 599,
    tablet: 600,
    desktop: 1200,
  };

  return (
    <div className="w-full space-y-3">
      <Breakpoint breakpoints={customBreakpoints} down="mobile">
        <div className="rounded-lg bg-neutral-100 p-4">
          <p className="text-body-3 font-medium">📱 Mobile (0px ~ 599px)</p>
        </div>
      </Breakpoint>

      <Breakpoint breakpoints={customBreakpoints} only="tablet">
        <div className="rounded-lg bg-neutral-100 p-4">
          <p className="text-body-3 font-medium">💻 Tablet (600px ~ 1199px)</p>
        </div>
      </Breakpoint>

      <Breakpoint breakpoints={customBreakpoints} up="desktop">
        <div className="rounded-lg bg-neutral-100 p-4">
          <p className="text-body-3 font-medium">🖥️ Desktop (≥1200px)</p>
        </div>
      </Breakpoint>
    </div>
  );
};

const customBreakpointsCode = `const customBreakpoints = {
  mobile: 599,
  tablet: 600,
  desktop: 1200,
};

<Breakpoint breakpoints={customBreakpoints} down="mobile">
  <div className="rounded-lg bg-neutral-100 p-4">
    <p className="text-body-3 font-medium">📱 Mobile (0px ~ 599px)</p>
  </div>
</Breakpoint>

<Breakpoint breakpoints={customBreakpoints} only="tablet">
  <div className="rounded-lg bg-neutral-100 p-4">
    <p className="text-body-3 font-medium">💻 Tablet (600px ~ 1199px)</p>
  </div>
</Breakpoint>

<Breakpoint breakpoints={customBreakpoints} up="desktop">
  <div className="rounded-lg bg-neutral-100 p-4">
    <p className="text-body-3 font-medium">🖥️ Desktop (≥1200px)</p>
  </div>
</Breakpoint>`;

const TargetRefDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, size] = useMeasureSize();
  const composedRef = useComposedRefs(containerRef, ref);
  const customBreakpoints = {
    xs: 0,
    sm: 200,
    md: 400,
    lg: 600,
  };

  return (
    <div className="w-full space-y-4">
      <div
        ref={composedRef}
        className="resize overflow-auto rounded-lg border border-neutral-300 bg-neutral-50 p-6"
        style={{ minWidth: "200px", maxWidth: "100%", minHeight: "100px" }}
      >
        <p className="text-body-3 text-ink-secondary mb-3">
          우측 하단을 드래그하여 크기를 조절하세요 <br />
          <span>사이즈: {size.width}px</span>
        </p>

        <div className="space-y-2">
          <Breakpoint targetRef={containerRef} breakpoints={customBreakpoints} up="md">
            <div className="rounded-lg bg-neutral-100 p-3">
              <p className="text-body-3 font-medium">컨테이너 너비 ≥400px (md 이상)</p>
            </div>
          </Breakpoint>

          <Breakpoint targetRef={containerRef} breakpoints={customBreakpoints} down="md">
            <div className="rounded-lg bg-neutral-100 p-3">
              <p className="text-body-3 font-medium">컨테이너 너비 {"<"}400px (md 미만)</p>
            </div>
          </Breakpoint>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Code Snippets
   ────────────────────────────────────────────── */

const targetRefCode = `import { useRef } from "react";
import { Breakpoint } from "@timeless-ui/ui";

const containerRef = useRef<HTMLDivElement>(null);

<div 
  ref={containerRef} 
  className="resize overflow-auto rounded-lg border border-neutral-300 bg-neutral-50 p-6"
  style={{ minWidth: "200px", minHeight: "100px" }}
>
  <p className="text-body-3 text-ink-secondary mb-3">우측 하단을 드래그하여 크기를 조절하세요</p>
  
  <div className="space-y-2">
    <Breakpoint targetRef={containerRef} up="md">
      <div className="rounded-lg bg-neutral-100 p-3">
        <p className="text-body-3 font-medium">컨테이너 너비 ≥768px</p>
      </div>
    </Breakpoint>

    <Breakpoint targetRef={containerRef} down="sm">
      <div className="rounded-lg bg-neutral-100 p-3">
        <p className="text-body-3 font-medium">컨테이너 너비 ≤640px</p>
      </div>
    </Breakpoint>
  </div>
</div>`;

export { ExampleSection };
