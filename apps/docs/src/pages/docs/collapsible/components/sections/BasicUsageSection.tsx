import { Collapsible } from "@timeless-ui/react";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      <InlineCode>Collapsible</InlineCode>은 콘텐츠 영역을 확장하거나 축소하여 보이지 않게 감출 수 있는 인터랙티브 컴포넌트입니다.
      <InlineCode>Trigger</InlineCode>를 통해 <InlineCode>Content</InlineCode>의 표시 여부를 제어합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Basic Demo
   ────────────────────────────────────────────── */

const BasicDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 rounded-md border bg-white px-4 py-2 shadow-sm">
        <h4 className="text-sm font-semibold text-neutral-900">@timeless-ui</h4>
        <Collapsible.Trigger className="group rounded-md p-1 outline-none transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-400">
          <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
          <span className="sr-only">Toggle</span>
        </Collapsible.Trigger>
      </div>
      <div className="rounded-md border bg-white px-4 py-3 font-mono text-sm text-neutral-600 shadow-sm">@timeless-ui/react</div>
      <Collapsible.Content className="space-y-2">
        <div className="rounded-md border bg-white px-4 py-3 font-mono text-sm text-neutral-600 shadow-sm">@timeless-ui/react/components</div>
        <div className="rounded-md border bg-white px-4 py-3 font-mono text-sm text-neutral-600 shadow-sm">@timeless-ui/react/hooks</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

/* ──────────────────────────────────────────────
   Code Snippet
   ────────────────────────────────────────────── */

const basicCode = `import { Collapsible } from "@timeless-ui/react";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const BasicDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 py-2 border rounded-md shadow-sm bg-white">
        <h4 className="text-sm font-semibold text-neutral-900">
          @timeless-ui/primitives
        </h4>
        <Collapsible.Trigger className="group p-1 rounded-md hover:bg-neutral-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-400">
          <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
          <span className="sr-only">Toggle</span>
        </Collapsible.Trigger>
      </div>
      <div className="rounded-md border px-4 py-3 text-sm font-mono text-neutral-600 bg-white shadow-sm">
        @timeless-ui/colors
      </div>
      <Collapsible.Content className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm font-mono text-neutral-600 bg-white shadow-sm">
          @timeless-ui/react
        </div>
        <div className="rounded-md border px-4 py-3 text-sm font-mono text-neutral-600 bg-white shadow-sm">
          @timeless-ui/next
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};`;

export { BasicUsageSection };
