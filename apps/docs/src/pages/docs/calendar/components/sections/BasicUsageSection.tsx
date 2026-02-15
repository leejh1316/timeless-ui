import { useState } from "react";
import { Calendar } from "@timeless-ui/ui";
import { Document } from "@src/components/ui/Document";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";

/* ──────────────────────────────────────────────
   Basic Usage Section
   ────────────────────────────────────────────── */

const BasicUsageSection = () => (
  <section>
    <Document.Heading1>기본적인 사용법</Document.Heading1>
    <Document.Paragraph mb={6}>
      Calendar 컴포넌트는 년, 월을 기준으로 날짜를 표시하고 탐색할 수 있는 기본적인 캘린더 기능을 제공합니다. Compound Component 패턴을
      사용하여 헤더, 요일, 날짜 등을 자유롭게 구성할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Calendar.Root date={currentDate} onMonthChange={setCurrentDate} className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold text-neutral-800">
          <Calendar.Year />년 <Calendar.Month />월
        </div>
        <div className="flex gap-1">
          <Calendar.Prev className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
            이전
          </Calendar.Prev>
          <Calendar.Next className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
            다음
          </Calendar.Next>
        </div>
      </div>

      <Calendar.Header className="mb-2 grid grid-cols-7 gap-1">
        {(weekdays) =>
          weekdays.map((day) => (
            <Calendar.Day key={day.dayIndex} day={day} className="py-2 text-center text-sm font-medium text-neutral-600">
              {day.day}
            </Calendar.Day>
          ))
        }
      </Calendar.Header>

      <Calendar.Content className="grid grid-cols-7 gap-1">
        {(calendarData) =>
          calendarData.map((date, index) => (
            <Calendar.Date
              key={index}
              data={date}
              className="flex h-10 items-center justify-center rounded-md text-sm data-[today=true]:bg-neutral-800 data-[today=true]:font-semibold data-[current-month=false]:text-neutral-400 data-[current-month=true]:text-neutral-800 data-[today=true]:text-white data-[current-month=true]:hover:bg-neutral-100"
            >
              {date.date}
            </Calendar.Date>
          ))
        }
      </Calendar.Content>
    </Calendar.Root>
  );
};

const basicCode = `import { useState } from "react";
import { Calendar } from "@timeless-ui/ui";

const BasicDemo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Calendar.Root date={currentDate} onMonthChange={setCurrentDate} className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold text-neutral-800">
          <Calendar.Year />년 <Calendar.Month />월
        </div>
        <div className="flex gap-1">
          <Calendar.Prev className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
            이전
          </Calendar.Prev>
          <Calendar.Next className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50">
            다음
          </Calendar.Next>
        </div>
      </div>

      <Calendar.Header className="mb-2 grid grid-cols-7 gap-1">
        {(weekdays) =>
          weekdays.map((day) => (
            <Calendar.Day key={day.dayIndex} day={day} className="py-2 text-center text-sm font-medium text-neutral-600">
              {day.day}
            </Calendar.Day>
          ))
        }
      </Calendar.Header>

      <Calendar.Content className="grid grid-cols-7 gap-1">
        {(calendarData) =>
          calendarData.map((date, index) => (
            <Calendar.Date
              key={index}
              data={date}
              className="flex h-10 items-center justify-center rounded-md text-sm data-[current-month=true]:text-neutral-800 data-[today=true]:bg-neutral-800 data-[today=true]:font-semibold data-[today=true]:text-white data-[current-month=true]:hover:bg-neutral-100 data-[current-month=false]:text-neutral-400"
            >
              {date.date}
            </Calendar.Date>
          ))
        }
      </Calendar.Content>
    </Calendar.Root>
  );
};`;

export { BasicUsageSection };
