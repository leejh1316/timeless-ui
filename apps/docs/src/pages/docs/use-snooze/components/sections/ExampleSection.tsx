import { useSnooze } from "@timeless-ui/ui";
import { useEffect, useState } from "react";
import { CodeBlock } from "@src/components/common/CodeBlock";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>
      <InlineCode>useSnooze</InlineCode>의 다양한 활용 패턴을 확인하세요.
    </Document.Paragraph>

    <Document.Heading2>Session Storage 사용</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>storageType</InlineCode>을 <InlineCode>'session'</InlineCode>으로 설정하면 브라우저 탭을 닫을 때까지만 스누즈 상태가
      유지됩니다. 일회성 공지나 배너에 적합합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <SessionStorageDemo />
    </PreviewContainer>
    <CodeBlock code={sessionStorageCode} className="mb-10" />

    <Document.Heading2>커스텀 Duration</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>duration</InlineCode>에 밀리초 단위의 숫자를 전달하여 원하는 시간만큼 스누즈할 수 있습니다. 10초(10000ms)와 같이 짧은
      시간도 지정 가능합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <CustomDurationDemo />
    </PreviewContainer>
    <CodeBlock code={customDurationCode} className="mb-10" />

    <Document.Heading2>Auto Reactivate</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>autoReactivate</InlineCode>를 <InlineCode>true</InlineCode>로 설정하면 지정된 duration이 경과한 후 자동으로{" "}
      <InlineCode>isActive</InlineCode>가 <InlineCode>true</InlineCode>로 변경됩니다. 주기적으로 표시해야 하는 UI에 유용합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <AutoReactivateDemo />
    </PreviewContainer>
    <CodeBlock code={autoReactivateCode} className="mb-10" />
  </section>
);

// ─── Session Storage Demo ────────────────────────────────────
const SessionStorageDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "session-banner",
    duration: "day",
    storageType: "session",
  });

  if (!isActive) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-neutral-600">
        배너가 숨겨졌습니다. 다른 탭에서 이 페이지를 열어주세요.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 font-semibold text-neutral-900">세션 전용 안내</p>
          <p className="text-sm text-neutral-600">이 메시지는 탭을 닫을 때까지만 숨겨집니다.</p>
        </div>
        <button onClick={snooze} className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
          닫기
        </button>
      </div>
    </div>
  );
};

const sessionStorageCode = `const SessionStorageDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "session-banner",
    duration: "day",
    storageType: "session",
  });

  if (!isActive) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-neutral-600">
        배너가 숨겨졌습니다. 다른 탭에서 이 페이지를 열어주세요.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 font-semibold text-neutral-900">세션 전용 안내</p>
          <p className="text-sm text-neutral-600">이 메시지는 탭을 닫을 때까지만 숨겨집니다.</p>
        </div>
        <button
          onClick={snooze}
          className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          닫기
        </button>
      </div>
    </div>
  );
};`;

// ─── Custom Duration Demo ─────────────────────────────────────
const CustomDurationDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "custom-duration-banner",
    duration: 10000, // 10초
    storageType: "local",
  });

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!isActive) {
      const snoozedUntil = localStorage.getItem("custom-duration-banner");
      if (snoozedUntil) {
        const remaining = Math.max(0, parseInt(snoozedUntil) - Date.now());
        setCountdown(Math.ceil(remaining / 1000));

        const interval = setInterval(() => {
          const newRemaining = Math.max(0, parseInt(snoozedUntil) - Date.now());
          const seconds = Math.ceil(newRemaining / 1000);
          setCountdown(seconds);
          if (seconds <= 0) {
            clearInterval(interval);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [isActive]);

  if (!isActive) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-neutral-600">
        {countdown > 0 ? `${countdown}초 후 다시 표시됩니다.` : "마운트 후 다시 표시됩니다..."}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 font-semibold text-neutral-900">10초 스누즈</p>
          <p className="text-sm text-neutral-600">10초 동안 이 메시지를 숨길 수 있습니다.</p>
        </div>
        <button onClick={snooze} className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100">
          10초 후에 보기
        </button>
      </div>
    </div>
  );
};

const customDurationCode = `const CustomDurationDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "custom-duration-banner",
    duration: 10000, // 10초
    storageType: "local",
  });

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!isActive) {
      const snoozedUntil = localStorage.getItem("custom-duration-banner");
      if (snoozedUntil) {
        const remaining = Math.max(0, parseInt(snoozedUntil) - Date.now());
        setCountdown(Math.ceil(remaining / 1000));

        const interval = setInterval(() => {
          const newRemaining = Math.max(0, parseInt(snoozedUntil) - Date.now());
          const seconds = Math.ceil(newRemaining / 1000);
          setCountdown(seconds);
          if (seconds <= 0) {
            clearInterval(interval);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [isActive]);

  if (!isActive) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-neutral-600">
        {countdown > 0 ? \`\${countdown}초 후 다시 표시됩니다.\` : "배너가 곧 다시 표시됩니다..."}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 font-semibold text-neutral-900">10초 스누즈</p>
          <p className="text-sm text-neutral-600">10초 동안 이 메시지를 숨길 수 있습니다.</p>
        </div>
        <button
          onClick={snooze}
          className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          10초 후에 보기
        </button>
      </div>
    </div>
  );
};`;

// ─── Auto Reactivate Demo ─────────────────────────────────────
const AutoReactivateDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "auto-reactivate-banner",
    duration: 15000, // 15초
    storageType: "local",
    autoReactivate: true,
  });

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isActive && showMessage) {
      setShowMessage(false);
    }
  }, [isActive, showMessage]);

  const handleSnooze = () => {
    snooze();
    setShowMessage(true);
  };

  if (!isActive) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-neutral-600">
        {showMessage ? "15초 후 자동으로 다시 활성화됩니다." : "배너가 숨겨져 있습니다."}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 font-semibold text-neutral-900">자동 재활성화</p>
          <p className="text-sm text-neutral-600">15초 후 자동으로 다시 표시되는 배너입니다.</p>
        </div>
        <button
          onClick={handleSnooze}
          className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          15초간 숨기기
        </button>
      </div>
    </div>
  );
};

const autoReactivateCode = `const AutoReactivateDemo = () => {
  const [isActive, snooze] = useSnooze({
    key: "auto-reactivate-banner",
    duration: 15000, // 15초
    storageType: "local",
    autoReactivate: true,
  });

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isActive && showMessage) {
      setShowMessage(false);
    }
  }, [isActive, showMessage]);

  const handleSnooze = () => {
    snooze();
    setShowMessage(true);
  };

  if (!isActive) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-neutral-600">
        {showMessage ? "15초 후 자동으로 다시 활성화됩니다." : "배너가 숨겨져 있습니다."}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="mb-1 font-semibold text-neutral-900">자동 재활성화</p>
          <p className="text-sm text-neutral-600">15초 후 자동으로 다시 표시되는 배너입니다.</p>
        </div>
        <button
          onClick={handleSnooze}
          className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          15초간 숨기기
        </button>
      </div>
    </div>
  );
};`;

export { ExampleSection };
