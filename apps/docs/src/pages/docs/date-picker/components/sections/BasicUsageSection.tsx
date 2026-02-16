import { useState } from "react";
import { DatePicker } from "@timeless-ui/react";
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
      DatePicker 컴포넌트는 사용자가 캘린더에서 날짜를 선택할 수 있는 인터페이스를 제공합니다. Calendar 컴포넌트를 기반으로 구축되어 있으며,
      날짜 선택, 최소/최대 날짜 제한 등의 추가 기능을 제공합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <BasicDemo />
    </PreviewContainer>
    <CodeBlock code={basicCode} className="mb-10" />
  </section>
);

const BasicDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="w-full max-w-md">
      <DatePicker.Root value={selectedDate} onValueChange={setSelectedDate}>
        <DatePicker.Calendar>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <DatePicker.Year />년 <DatePicker.Month />월
            </div>
            <div className="flex gap-1">
              <DatePicker.Prev className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
                이전
              </DatePicker.Prev>
              <DatePicker.Next className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
                다음
              </DatePicker.Next>
            </div>
          </div>

          <DatePicker.Header className="mb-2 grid grid-cols-7 gap-1">
            {(weekdays) =>
              weekdays.map((day) => (
                <DatePicker.Day key={day.dayIndex} day={day} className="py-2 text-center text-sm font-medium text-neutral-600">
                  {day.day}
                </DatePicker.Day>
              ))
            }
          </DatePicker.Header>

          <DatePicker.Content className="grid grid-cols-7 gap-1">
            {(calendarData) =>
              calendarData.map((date, index) => (
                <DatePicker.DateTrigger
                  key={index}
                  data={date}
                  className="flex h-10 items-center justify-center rounded-md text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent data-[current-month=false]:cursor-default data-[selected=true]:bg-neutral-800 data-[selected=true]:font-semibold data-[current-month=false]:text-neutral-400 data-[current-month=true]:text-neutral-800 data-[selected=true]:text-white data-[current-month=false]:hover:bg-transparent data-[current-month=true]:data-[selected=true]:hover:bg-neutral-900 data-[current-month=true]:hover:bg-neutral-100"
                >
                  {date.date}
                </DatePicker.DateTrigger>
              ))
            }
          </DatePicker.Content>
        </DatePicker.Calendar>
      </DatePicker.Root>

      <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-center text-sm text-neutral-700">
        선택된 날짜: {selectedDate.toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
};

const basicCode = `import { useState } from "react";
import { DatePicker } from "@timeless-ui/react";

const BasicDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="w-full max-w-md">
      <DatePicker.Root value={selectedDate} onValueChange={setSelectedDate}>
        <DatePicker.Calendar>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold text-neutral-800">
              <DatePicker.Year />년 <DatePicker.Month />월
            </div>
            <div className="flex gap-1">
              <DatePicker.Prev className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
                이전
              </DatePicker.Prev>
              <DatePicker.Next className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
                다음
              </DatePicker.Next>
            </div>
          </div>

          <DatePicker.Header className="mb-2 grid grid-cols-7 gap-1">
            {(weekdays) =>
              weekdays.map((day) => (
                <DatePicker.Day key={day.dayIndex} day={day} className="py-2 text-center text-sm font-medium text-neutral-600">
                  {day.day}
                </DatePicker.Day>
              ))
            }
          </DatePicker.Header>

          <DatePicker.Content className="grid grid-cols-7 gap-1">
            {(calendarData) =>
              calendarData.map((date, index) => (
                <DatePicker.DateTrigger
                  key={index}
                  data={date}
                  className="flex h-10 items-center justify-center rounded-md text-sm transition-colors data-[current-month=true]:text-neutral-800 data-[selected=true]:bg-neutral-800 data-[selected=true]:font-semibold data-[selected=true]:text-white data-[current-month=true]:data-[selected=true]:hover:bg-neutral-900 data-[current-month=true]:hover:bg-neutral-100 data-[current-month=false]:cursor-default data-[current-month=false]:text-neutral-400 data-[current-month=false]:hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  {date.date}
                </DatePicker.DateTrigger>
              ))
            }
          </DatePicker.Content>
        </DatePicker.Calendar>
      </DatePicker.Root>

      <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-center text-sm text-neutral-700">
        선택된 날짜: {selectedDate.toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
};`;

export { BasicUsageSection };
