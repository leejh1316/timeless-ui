import { Tooltip } from "@timeless-ui/react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { useState } from "react";

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      Tooltip의 다양한 활용 패턴을 확인하세요. 위치 변경, 화살표 추가, 상태 제어 등 실무에서 자주 사용되는 패턴을 제공합니다.
    </Document.Paragraph>

    <Document.Heading2>다양한 위치 (Placement)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>placement</InlineCode> prop을 사용하여 툴팁이 나타나는 위치를 지정할 수 있습니다. 12개의 기본 위치를 지원하며, 자동으로
      화면 경계를 감지하여 위치를 조정합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <PlacementDemo />
    </PreviewContainer>
    <CodeBlock code={placementCode} className="mb-10" />

    <Document.Heading2>화살표가 있는 툴팁</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Tooltip.Arrow</InlineCode> 컴포넌트를 추가하여 툴팁의 방향을 시각적으로 표시할 수 있습니다. 화살표는 자동으로 위치가
      계산되며, 색상과 크기를 커스터마이징할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ArrowDemo />
    </PreviewContainer>
    <CodeBlock code={arrowCode} className="mb-10" />

    <Document.Heading2>클릭 모드</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>triggerMode</InlineCode>를 <InlineCode>'click'</InlineCode>으로 설정하면 클릭 시 툴팁이 열립니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ClickModeDemo />
    </PreviewContainer>
    <CodeBlock code={clickModeCode} className="mb-10" />

    <Document.Heading2>지연 시간 설정</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>options</InlineCode> prop을 통해 툴팁이 나타나고 사라지는 지연 시간을 조정할 수 있습니다. 빠른 호버 움직임에서 불필요한
      툴팁 표시를 방지할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DelayDemo />
    </PreviewContainer>
    <CodeBlock code={delayCode} className="mb-10" />
  </section>
);

const PlacementDemo = () => (
  <div className="flex flex-wrap items-center justify-center gap-4">
    <Tooltip.Root placement="top">
      <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">Top</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.View className="z-50">
          <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">위쪽 툴팁</Tooltip.Content>
        </Tooltip.View>
      </Tooltip.Portal>
    </Tooltip.Root>

    <Tooltip.Root placement="right">
      <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">
        Right
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.View className="z-50">
          <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">오른쪽 툴팁</Tooltip.Content>
        </Tooltip.View>
      </Tooltip.Portal>
    </Tooltip.Root>

    <Tooltip.Root placement="bottom">
      <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">
        Bottom
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.View className="z-50">
          <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">아래쪽 툴팁</Tooltip.Content>
        </Tooltip.View>
      </Tooltip.Portal>
    </Tooltip.Root>

    <Tooltip.Root placement="left">
      <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">Left</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.View className="z-50">
          <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">왼쪽 툴팁</Tooltip.Content>
        </Tooltip.View>
      </Tooltip.Portal>
    </Tooltip.Root>
  </div>
);

const placementCode = `<div className="flex flex-wrap items-center justify-center gap-4">
  <Tooltip.Root placement="top">
    <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">
      Top
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          위쪽 툴팁
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>

  <Tooltip.Root placement="right">
    <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">
      Right
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          오른쪽 툴팁
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>

  <Tooltip.Root placement="bottom">
    <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">
      Bottom
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          아래쪽 툴팁
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>

  <Tooltip.Root placement="left">
    <Tooltip.Trigger className="rounded-lg bg-neutral-200 px-3 py-2 text-sm transition-colors hover:bg-neutral-300">
      Left
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          왼쪽 툴팁
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>
</div>`;

const ArrowDemo = () => (
  <Tooltip.Root placement="top">
    <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
      화살표가 있는 툴팁
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          화살표로 방향을 표시합니다
          <Tooltip.Arrow className="fill-neutral-900" />
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>
);

const arrowCode = `<Tooltip.Root placement="top">
  <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
    화살표가 있는 툴팁
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.View className="z-50">
      <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
        화살표로 방향을 표시합니다
      </Tooltip.Content>
      <Tooltip.Arrow className="fill-neutral-900" />
    </Tooltip.View>
  </Tooltip.Portal>
</Tooltip.Root>`;

const ClickModeDemo = () => (
  <Tooltip.Root triggerMode="click">
    <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
      클릭해보세요
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          클릭으로 활성화되는 툴팁입니다
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>
);

const clickModeCode = `<Tooltip.Root triggerMode="click">
  <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
    클릭해보세요
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.View className="z-50">
      <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
        클릭으로 활성화되는 툴팁입니다
      </Tooltip.Content>
    </Tooltip.View>
  </Tooltip.Portal>
</Tooltip.Root>`;

const DelayDemo = () => (
  <Tooltip.Root options={{ delay: { open: 500, close: 100 } }}>
    <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
      500ms 지연
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.View className="z-50">
        <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
          0.5초 후에 나타납니다
        </Tooltip.Content>
      </Tooltip.View>
    </Tooltip.Portal>
  </Tooltip.Root>
);

const delayCode = `<Tooltip.Root options={{ delay: { open: 500, close: 100 } }}>
  <Tooltip.Trigger className="rounded-lg bg-neutral-800 px-4 py-2 text-white transition-colors hover:bg-neutral-700">
    500ms 지연
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.View className="z-50">
      <Tooltip.Content className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white shadow-lg">
        0.5초 후에 나타납니다
      </Tooltip.Content>
    </Tooltip.View>
  </Tooltip.Portal>
</Tooltip.Root>`;

export { ExampleSection };
