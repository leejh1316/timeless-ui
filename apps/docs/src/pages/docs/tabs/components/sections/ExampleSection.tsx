import { useState } from "react";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { InlineCode } from "@src/components/ui/InlineCode";
import { Tabs } from "@timeless-ui/ui";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 활용 패턴을 확인하세요.</Document.Paragraph>

    <Document.Heading2>제어 컴포넌트 (Controlled)</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>value</InlineCode>와 <InlineCode>onValueChange</InlineCode> prop을 사용하여 외부에서 탭 상태를 제어할 수 있습니다. 이를
      통해 탭 전환 시 추가 로직을 실행하거나 다른 컴포넌트와 상태를 동기화할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />

    <Document.Heading2>인디케이터가 있는 탭</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>Tabs.Indicator</InlineCode>를 사용하여 활성 탭 아래에 시각적 강조 요소를 추가할 수 있습니다. 인디케이터는 활성 탭의 위치와
      너비에 맞춰 자동으로 조정되며, CSS transition을 통해 부드러운 애니메이션을 제공합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <WithIndicatorDemo />
    </PreviewContainer>
    <CodeBlock code={withIndicatorCode} className="mb-10" />

    <Document.Heading2>세로 방향 탭</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>orientation="vertical"</InlineCode>을 설정하여 세로 레이아웃의 탭을 구현할 수 있습니다. 키보드 네비게이션도 자동으로
      위/아래 화살표로 변경됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <VerticalDemo />
    </PreviewContainer>
    <CodeBlock code={verticalCode} className="mb-10" />

    <Document.Heading2>비활성화된 탭</Document.Heading2>
    <Document.Paragraph mb={6}>
      특정 탭을 <InlineCode>disabled</InlineCode> 속성으로 비활성화할 수 있습니다. 비활성화된 탭은 클릭이나 키보드 네비게이션으로 선택할 수
      없습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Controlled Demo
   ────────────────────────────────────────────── */

const ControlledDemo = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 text-sm text-neutral-600">
        현재 활성 탭: <span className="font-semibold">{activeTab}</span>
      </div>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-2 border-b border-neutral-200 pb-2">
          <Tabs.Trigger value="profile" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
            프로필
          </Tabs.Trigger>
          <Tabs.Trigger value="settings" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
            설정
          </Tabs.Trigger>
          <Tabs.Trigger
            value="notifications"
            className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900"
          >
            알림
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile" className="py-4">
          <p className="text-sm text-neutral-700">사용자 프로필 정보를 관리할 수 있습니다.</p>
        </Tabs.Content>
        <Tabs.Content value="settings" className="py-4">
          <p className="text-sm text-neutral-700">애플리케이션 설정을 변경할 수 있습니다.</p>
        </Tabs.Content>
        <Tabs.Content value="notifications" className="py-4">
          <p className="text-sm text-neutral-700">알림 설정을 관리할 수 있습니다.</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

const controlledCode = `import { useState } from "react";
import { Tabs } from "@timeless-ui/ui";

const ControlledDemo = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 text-sm text-neutral-600">
        현재 활성 탭: <span className="font-semibold">{activeTab}</span>
      </div>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-2 border-b border-neutral-200 pb-2">
          <Tabs.Trigger value="profile" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
            프로필
          </Tabs.Trigger>
          <Tabs.Trigger value="settings" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
            설정
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
            알림
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile" className="py-4">
          <p className="text-sm text-neutral-700">사용자 프로필 정보를 관리할 수 있습니다.</p>
        </Tabs.Content>
        <Tabs.Content value="settings" className="py-4">
          <p className="text-sm text-neutral-700">애플리케이션 설정을 변경할 수 있습니다.</p>
        </Tabs.Content>
        <Tabs.Content value="notifications" className="py-4">
          <p className="text-sm text-neutral-700">알림 설정을 관리할 수 있습니다.</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   With Indicator Demo
   ────────────────────────────────────────────── */

const WithIndicatorDemo = () => (
  <Tabs.Root defaultValue="overview" className="w-full max-w-md">
    <Tabs.List className="relative flex gap-2 border-b border-neutral-200">
      <Tabs.Trigger value="overview" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        개요
      </Tabs.Trigger>
      <Tabs.Trigger value="analytics" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        분석
      </Tabs.Trigger>
      <Tabs.Trigger value="reports" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        보고서
      </Tabs.Trigger>
      <Tabs.Indicator className="absolute bottom-0 left-0 h-0.5 bg-neutral-900 transition-all" />
    </Tabs.List>
    <Tabs.Content value="overview" className="py-4">
      <p className="text-sm text-neutral-700">프로젝트 개요를 확인할 수 있습니다.</p>
    </Tabs.Content>
    <Tabs.Content value="analytics" className="py-4">
      <p className="text-sm text-neutral-700">상세 분석 데이터를 확인할 수 있습니다.</p>
    </Tabs.Content>
    <Tabs.Content value="reports" className="py-4">
      <p className="text-sm text-neutral-700">생성된 보고서를 확인할 수 있습니다.</p>
    </Tabs.Content>
  </Tabs.Root>
);

const withIndicatorCode = `import { Tabs } from "@timeless-ui/ui";

const WithIndicatorDemo = () => (
  <Tabs.Root defaultValue="overview" className="w-full max-w-md">
    <Tabs.List className="relative flex gap-2 border-b border-neutral-200">
      <Tabs.Trigger value="overview" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        개요
      </Tabs.Trigger>
      <Tabs.Trigger value="analytics" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        분석
      </Tabs.Trigger>
      <Tabs.Trigger value="reports" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        보고서
      </Tabs.Trigger>
      <Tabs.Indicator className="absolute left-0 transition-all bottom-0 h-0.5 bg-neutral-900" />
    </Tabs.List>
    <Tabs.Content value="overview" className="py-4">
      <p className="text-sm text-neutral-700">프로젝트 개요를 확인할 수 있습니다.</p>
    </Tabs.Content>
    <Tabs.Content value="analytics" className="py-4">
      <p className="text-sm text-neutral-700">상세 분석 데이터를 확인할 수 있습니다.</p>
    </Tabs.Content>
    <Tabs.Content value="reports" className="py-4">
      <p className="text-sm text-neutral-700">생성된 보고서를 확인할 수 있습니다.</p>
    </Tabs.Content>
  </Tabs.Root>
);`;

/* ──────────────────────────────────────────────
   Vertical Demo
   ────────────────────────────────────────────── */

const VerticalDemo = () => (
  <Tabs.Root defaultValue="account" orientation="vertical" className="flex gap-4">
    <Tabs.List className="flex flex-col gap-1 border-r border-neutral-200 pr-4">
      <Tabs.Trigger
        value="account"
        className="px-4 py-2 text-left text-sm font-medium text-neutral-600 data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900"
      >
        계정
      </Tabs.Trigger>
      <Tabs.Trigger
        value="security"
        className="px-4 py-2 text-left text-sm font-medium text-neutral-600 data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900"
      >
        보안
      </Tabs.Trigger>
      <Tabs.Trigger
        value="privacy"
        className="px-4 py-2 text-left text-sm font-medium text-neutral-600 data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900"
      >
        개인정보
      </Tabs.Trigger>
    </Tabs.List>
    <div className="flex-1">
      <Tabs.Content value="account">
        <p className="text-sm text-neutral-700">계정 정보를 관리하세요.</p>
      </Tabs.Content>
      <Tabs.Content value="security">
        <p className="text-sm text-neutral-700">보안 설정을 관리하세요.</p>
      </Tabs.Content>
      <Tabs.Content value="privacy">
        <p className="text-sm text-neutral-700">개인정보 설정을 관리하세요.</p>
      </Tabs.Content>
    </div>
  </Tabs.Root>
);

const verticalCode = `import { Tabs } from "@timeless-ui/ui";

const VerticalDemo = () => (
  <Tabs.Root defaultValue="account" orientation="vertical" className="flex gap-4">
    <Tabs.List className="flex flex-col gap-1 border-r border-neutral-200 pr-4">
      <Tabs.Trigger value="account" className="px-4 py-2 text-left text-sm font-medium text-neutral-600 data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900">
        계정
      </Tabs.Trigger>
      <Tabs.Trigger value="security" className="px-4 py-2 text-left text-sm font-medium text-neutral-600 data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900">
        보안
      </Tabs.Trigger>
      <Tabs.Trigger value="privacy" className="px-4 py-2 text-left text-sm font-medium text-neutral-600 data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900">
        개인정보
      </Tabs.Trigger>
    </Tabs.List>
    <div className="flex-1">
      <Tabs.Content value="account">
        <p className="text-sm text-neutral-700">계정 정보를 관리하세요.</p>
      </Tabs.Content>
      <Tabs.Content value="security">
        <p className="text-sm text-neutral-700">보안 설정을 관리하세요.</p>
      </Tabs.Content>
      <Tabs.Content value="privacy">
        <p className="text-sm text-neutral-700">개인정보 설정을 관리하세요.</p>
      </Tabs.Content>
    </div>
  </Tabs.Root>
);`;

/* ──────────────────────────────────────────────
   Disabled Demo
   ────────────────────────────────────────────── */

const DisabledDemo = () => (
  <Tabs.Root defaultValue="active1" className="w-full max-w-md">
    <Tabs.List className="flex gap-2 border-b border-neutral-200 pb-2">
      <Tabs.Trigger value="active1" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        활성 탭 1
      </Tabs.Trigger>
      <Tabs.Trigger value="disabled" disabled className="px-4 py-2 text-sm font-medium text-neutral-400 opacity-50">
        비활성 탭
      </Tabs.Trigger>
      <Tabs.Trigger value="active2" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        활성 탭 2
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="active1" className="py-4">
      <p className="text-sm text-neutral-700">첫 번째 활성 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="disabled" className="py-4">
      <p className="text-sm text-neutral-700">비활성화된 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="active2" className="py-4">
      <p className="text-sm text-neutral-700">두 번째 활성 탭의 내용입니다.</p>
    </Tabs.Content>
  </Tabs.Root>
);

const disabledCode = `import { Tabs } from "@timeless-ui/ui";

const DisabledDemo = () => (
  <Tabs.Root defaultValue="active1" className="w-full max-w-md">
    <Tabs.List className="flex gap-2 border-b border-neutral-200 pb-2">
      <Tabs.Trigger value="active1" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        활성 탭 1
      </Tabs.Trigger>
      <Tabs.Trigger value="disabled" disabled className="px-4 py-2 text-sm font-medium text-neutral-400 opacity-50">
        비활성 탭
      </Tabs.Trigger>
      <Tabs.Trigger value="active2" className="px-4 py-2 text-sm font-medium text-neutral-600 data-[active=true]:text-neutral-900">
        활성 탭 2
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="active1" className="py-4">
      <p className="text-sm text-neutral-700">첫 번째 활성 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="disabled" className="py-4">
      <p className="text-sm text-neutral-700">비활성화된 탭의 내용입니다.</p>
    </Tabs.Content>
    <Tabs.Content value="active2" className="py-4">
      <p className="text-sm text-neutral-700">두 번째 활성 탭의 내용입니다.</p>
    </Tabs.Content>
  </Tabs.Root>
);`;

export { ExampleSection };
