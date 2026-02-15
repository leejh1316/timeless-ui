import { Document } from "@src/components/ui/Document";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { CodeBlock } from "@src/components/common/CodeBlock";

/* ──────────────────────────────────────────────
   Props Definitions
   ────────────────────────────────────────────── */

const breakpointProps: PropsTableRow[] = [
  {
    name: "children",
    type: "ReactNode",
    description: "조건이 충족될 때 렌더링할 콘텐츠입니다.",
  },
  {
    name: "up",
    type: "string",
    description: "지정한 브레이크포인트 이상일 때 children을 렌더링합니다. (예: 'md' → ≥768px)",
  },
  {
    name: "down",
    type: "string",
    description: "지정한 브레이크포인트 이하일 때 children을 렌더링합니다. (예: 'md' → ≤768px)",
  },
  {
    name: "only",
    type: "string",
    description: "지정한 브레이크포인트에서만 children을 렌더링합니다. (예: 'md' → 768px ~ 1023px)",
  },
  {
    name: "breakpoints",
    type: "Record<string, number>",
    defaultValue: "{ sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }",
    description: "커스텀 브레이크포인트 정의. 기본값은 Tailwind CSS 표준입니다.",
  },
  {
    name: "targetRef",
    type: "RefObject<HTMLElement | null> | null",
    description: "viewport 대신 특정 요소의 너비를 기준으로 동작합니다. Container Queries 패턴에 유용합니다.",
  },
];

const typeDefinitionsCode = `import { ReactNode, RefObject } from "react";

type BreakpointQuery = { 
  up?: string; 
  down?: string; 
  only?: string 
};

interface BreakpointProps extends BreakpointQuery {
  children: ReactNode;
  breakpoints?: Record<string, number>;
  targetRef?: RefObject<HTMLElement | null> | null;
}`;

const usageNotesCode = `// ❌ 잘못된 사용: 여러 쿼리 동시 사용
<Breakpoint up="md" down="lg">
  {/* 의도한 대로 동작하지 않습니다 */}
</Breakpoint>

// ✅ 올바른 사용: only로 단일 브레이크포인트 지정
<Breakpoint only="md">
  {/* md 범위에서만 렌더링 */}
</Breakpoint>

// ✅ 올바른 사용: up으로 이상 조건
<Breakpoint up="lg">
  {/* lg 이상에서 렌더링 */}
</Breakpoint>

// ✅ 올바른 사용: down으로 이하 조건
<Breakpoint down="md">
  {/* md 이하에서 렌더링 */}
</Breakpoint>`;

/* ──────────────────────────────────────────────
   Section Component
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>

    <Document.Heading2>Props</Document.Heading2>
    <PropsTable rows={breakpointProps} />

    <Document.Heading2>타입 정의</Document.Heading2>
    <Document.Paragraph mb={6}>TypeScript를 사용하는 경우 다음 타입 정보를 참고하세요.</Document.Paragraph>
    <CodeBlock code={typeDefinitionsCode} className="mb-10" />

    <Document.Heading2>사용 예시</Document.Heading2>
    <Document.Paragraph mb={6}>
      쿼리 prop은 한 번에 하나만 사용하는 것을 권장합니다.{" "}
      <code className="font-code text-primary-500 rounded-md bg-neutral-100 px-1.5 py-0.5">only</code>가 가장 높은 우선순위를 가지며, 그
      다음 <code className="font-code text-primary-500 rounded-md bg-neutral-100 px-1.5 py-0.5">up</code>,
      <code className="font-code text-primary-500 rounded-md bg-neutral-100 px-1.5 py-0.5">down</code> 순으로 처리됩니다.
    </Document.Paragraph>
    <CodeBlock code={usageNotesCode} />
  </section>
);

export { ApiSpecSection };
