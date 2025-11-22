import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { useSnooze } from "@timeless-ui/ui";
import { useEffect, useState } from "react";

export default function UseSnoozePage() {
  const propsData = [
    {
      prop: "key",
      type: "string",
      defaultValue: "필수",
      description: "스토리지에 저장될 고유 키입니다.",
    },
    {
      prop: "duration",
      type: "'day' | number",
      defaultValue: "필수",
      description: "스누즈 기간입니다. 'day' 또는 밀리초 단위의 숫자를 사용합니다.",
    },
    {
      prop: "storageType",
      type: "'local' | 'session'",
      defaultValue: "'local'",
      description: "사용할 웹 스토리지 종류를 지정합니다.",
    },
    {
      prop: "autoReactivate",
      type: "boolean",
      defaultValue: "false",
      description: "스누즈 기간이 만료된 후 자동으로 다시 활성화할지 여부입니다.",
    },
  ];

  const example1Code = `
import { useSnooze } from "@timeless-ui/ui";

function DailyBanner() {
  const [showBanner, snoozeBanner] = useSnooze({
    key: 'daily-event-banner',
    duration: 'day', // 24시간
  });

  if (!showBanner) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-blue-100 p-4">
      <p>🎉 특별 할인 이벤트 진행 중!</p>
      <button onClick={snoozeBanner}>
        오늘 하루 보지 않기
      </button>
    </div>
  );
}
  `;

  const example2Code = `
import { useSnooze } from "@timeless-ui/ui";
import { useState, useEffect } from "react";

function LimitedTimePopup() {
  const [showPopup, snoozePopup] = useSnooze({
    key: 'limited-time-popup',
    duration: 10000, // 10초
    autoReactivate: true,
  });
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (showPopup) {
      setRemainingTime(0);
      return;
    }

    const storage = window.localStorage;
    const snoozedUntil = storage.getItem('limited-time-popup');
    if (!snoozedUntil) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.max(0, Math.ceil((parseInt(snoozedUntil) - now) / 1000));
      setRemainingTime(remaining);
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showPopup]);

  if (!showPopup) {
    return (
      <div className="text-center text-sm text-gray-500">
        팝업이 {remainingTime}초 후에 다시 나타납니다.
      </div>
    );
  }

  return (
    <div className="relative rounded-lg border bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-semibold">기간 한정 특별 제안!</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        지금 구매하시면 20% 추가 할인을 받을 수 있습니다.
      </p>
      <button
        onClick={snoozePopup}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>
    </div>
  );
}
  `;

  const DailyBanner = () => {
    const [showBanner, snoozeBanner] = useSnooze({
      key: "daily-event-banner",
      duration: "day",
    });

    if (!showBanner) {
      return <p className="text-sm text-gray-500">배너가 스누즈되었습니다. 내일 다시 표시됩니다.</p>;
    }

    return (
      <div className="flex items-center justify-between rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">🎉 특별 할인 이벤트 진행 중!</p>
        <button
          onClick={snoozeBanner}
          className="rounded bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-300 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
        >
          오늘 하루 보지 않기
        </button>
      </div>
    );
  };

  const LimitedTimePopup = () => {
    const [showPopup, snoozePopup] = useSnooze({
      key: "limited-time-popup",
      duration: 4000, // 4초
      autoReactivate: true,
    });
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
      if (showPopup) {
        setRemainingTime(0);
        return;
      }

      const storage = window.localStorage;
      const snoozedUntil = storage.getItem("limited-time-popup");
      if (!snoozedUntil) return;

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max(0, Math.ceil((parseInt(snoozedUntil) - now) / 1000));
        setRemainingTime(remaining);
        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [showPopup]);

    if (!showPopup) {
      return (
        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800">
          팝업이 {remainingTime}초 후에 다시 나타납니다.
        </div>
      );
    }

    return (
      <div className="relative flex h-40 flex-col justify-center rounded-lg border bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold">기간 한정 특별 제안!</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          지금 구매하시면 20% 추가 할인을 받을 수 있습니다.
        </p>
        <button
          onClick={snoozePopup}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
          aria-label="닫기"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    );
  };

  return (
    <ComponentPageLayout
      title="useSnooze"
      description="사용자가 특정 UI 요소(예: 배너, 팝업)를 일정 기간 동안 다시 보지 않도록 설정하는 기능을 쉽게 구현할 수 있는 훅입니다."
    >
      <ComponentPreview
        title="기본 사용법 (일일 배너)"
        description="'오늘 하루 보지 않기'와 같은 기능을 구현합니다. duration을 'day'로 설정하여 24시간 동안 배너를 숨깁니다."
        code={example1Code}
      >
        <DailyBanner />
      </ComponentPreview>

      <ComponentPreview
        title="심화 예제 (자동 재활성화 팝업)"
        description="autoReactivate 옵션을 사용하여 스누즈 기간이 만료되면 자동으로 UI가 다시 활성화되도록 합니다. 남은 시간을 표시하는 기능도 함께 구현한 예제입니다."
        code={example2Code}
      >
        <LimitedTimePopup />
      </ComponentPreview>

      <PropsTable data={propsData} />
    </ComponentPageLayout>
  );
}
