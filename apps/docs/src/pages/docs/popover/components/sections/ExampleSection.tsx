import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { Popover } from "@timeless-ui/ui";
import { useState } from "react";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      Popover 컴포넌트의 다양한 활용 패턴과 고급 기능을 확인하세요. 트리거 모드, 위치 설정, 상태 제어 등 실무에서 자주 사용되는 패턴을
      제공합니다.
    </Document.Paragraph>

    {/* Hover Trigger */}
    <Document.Heading2>호버 트리거</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>triggerMode='hover'</InlineCode>를 설정하면 마우스를 올렸을 때 팝오버가 나타납니다. 툴팁이나 추가 정보 표시에 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <HoverDemo />
    </PreviewContainer>
    <CodeBlock code={hoverCode} className="mb-10" />

    {/* Different Placements */}
    <Document.Heading2>다양한 위치 설정</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>placement</InlineCode> 속성으로 팝오버가 나타날 위치를 지정할 수 있습니다. 공간이 부족한 경우 자동으로 반대쪽으로
      조정됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <PlacementDemo />
    </PreviewContainer>
    <CodeBlock code={placementCode} className="mb-10" />

    {/* Multiple Triggers */}
    <Document.Heading2>복합 트리거</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>triggerMode</InlineCode>에 배열을 전달하여 여러 방식을 조합할 수 있습니다. 클릭과 포커스를 함께 사용하면 키보드와 마우스
      모두에서 접근 가능합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <MultiTriggerDemo />
    </PreviewContainer>
    <CodeBlock code={multiTriggerCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Hover Demo
   ────────────────────────────────────────────── */

const HoverDemo = () => (
  <Popover.Root triggerMode="hover">
    <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
      마우스를 올려보세요
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.View className="z-50">
        <Popover.Content className="w-56 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <p className="text-sm text-neutral-600">호버 시 나타나는 팝오버입니다. 마우스를 떼면 자동으로 사라집니다.</p>
        </Popover.Content>
      </Popover.View>
    </Popover.Portal>
  </Popover.Root>
);

const hoverCode = `import { Popover } from "@timeless-ui/ui";

const HoverDemo = () => (
  <Popover.Root triggerMode="hover">
    <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
      마우스를 올려보세요
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.View className="z-50">
        <Popover.Content className="w-56 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <p className="text-sm text-neutral-600">호버 시 나타나는 팝오버입니다. 마우스를 떼면 자동으로 사라집니다.</p>
        </Popover.Content>
      </Popover.View>
    </Popover.Portal>
  </Popover.Root>
);`;

/* ──────────────────────────────────────────────
   Placement Demo
   ────────────────────────────────────────────── */

const PlacementDemo = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Popover.Root placement="top">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        위
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">상단 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>

    <Popover.Root placement="bottom">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        아래
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">하단 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>

    <Popover.Root placement="left">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        왼쪽
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">좌측 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>

    <Popover.Root placement="right">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        오른쪽
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">우측 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>
  </div>
);

const placementCode = `import { Popover } from "@timeless-ui/ui";

const PlacementDemo = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Popover.Root placement="top">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        위
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">상단 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>

    <Popover.Root placement="bottom">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        아래
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">하단 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>

    <Popover.Root placement="left">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        왼쪽
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">좌측 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>

    <Popover.Root placement="right">
      <Popover.Trigger className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
        오른쪽
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View className="z-50">
          <Popover.Content className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-neutral-600">우측 팝오버</p>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>
  </div>
);`;

/* ──────────────────────────────────────────────
   Multi Trigger Demo
   ────────────────────────────────────────────── */

const MultiTriggerDemo = () => (
  <Popover.Root triggerMode={["click", "focus"]}>
    <Popover.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      클릭 또는 포커스
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.View className="z-50">
        <Popover.Content className="w-64 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-sm font-semibold text-neutral-900">복합 트리거</h3>
          <p className="text-sm text-neutral-600">마우스 클릭 또는 Tab 키로 포커스할 때 모두 팝오버가 열립니다. 접근성이 향상됩니다.</p>
        </Popover.Content>
      </Popover.View>
    </Popover.Portal>
  </Popover.Root>
);

const multiTriggerCode = `import { Popover } from "@timeless-ui/ui";

const MultiTriggerDemo = () => (
  <Popover.Root triggerMode={["click", "focus"]}>
    <Popover.Trigger className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
      클릭 또는 포커스
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.View className="z-50">
        <Popover.Content className="w-64 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-sm font-semibold text-neutral-900">복합 트리거</h3>
          <p className="text-sm text-neutral-600">
            마우스 클릭 또는 Tab 키로 포커스할 때 모두 팝오버가 열립니다. 접근성이 향상됩니다.
          </p>
        </Popover.Content>
      </Popover.View>
    </Popover.Portal>
  </Popover.Root>
);`;

export { ExampleSection };
