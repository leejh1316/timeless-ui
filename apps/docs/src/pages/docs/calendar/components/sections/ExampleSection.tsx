import { useState } from "react";
import { Calendar } from "@timeless-ui/react";
import { isSameDay } from "date-fns";
import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { PreviewContainer } from "@src/components/common/PreviewContainer";
import { CodeBlock } from "@src/components/common/CodeBlock";

/* ──────────────────────────────────────────────
   Example Section
   ────────────────────────────────────────────── */

const ExampleSection = () => (
  <section>
    <Document.Heading1>활용 예제</Document.Heading1>
    <Document.Paragraph mb={8}>다양한 실무 시나리오에서 Calendar 컴포넌트를 활용하는 방법을 확인하세요.</Document.Paragraph>

    <Document.Heading2>주말 강조 표시</Document.Heading2>
    <Document.Paragraph mb={6}>
      주말 날짜를 시각적으로 구분하여 표시할 수 있습니다.
      <InlineCode>Calendar.Date</InlineCode>의 <InlineCode>data-weekend</InlineCode>, <InlineCode>data-day-index</InlineCode>(0=일, 6=토)
      attribute를 활용하여 토요일과 일요일에 다른 색상을 적용할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <WeekendHighlightDemo />
    </PreviewContainer>
    <CodeBlock code={weekendHighlightCode} className="mb-10" />

    <Document.Heading2>외부 제어 (Controlled)</Document.Heading2>
    <Document.Paragraph mb={6}>
      외부 버튼이나 입력을 통해 캘린더의 표시 월을 제어할 수 있습니다.
      <InlineCode>date</InlineCode> prop과 <InlineCode>onMonthChange</InlineCode> 콜백을 사용하여 완전히 제어되는 캘린더를 구현할 수
      있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Pattern 1: Weekend Highlight
   ────────────────────────────────────────────── */

const WeekendHighlightDemo = () => {
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
            <Calendar.Day
              key={day.dayIndex}
              day={day}
              className="py-2 text-center text-sm font-medium data-[day-index=0]:text-red-600 data-[day-index=6]:text-blue-600 data-[weekday=true]:text-neutral-600"
            >
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
              className="flex h-10 items-center justify-center rounded-md text-sm data-[today=true]:bg-neutral-800 data-[today=true]:font-semibold data-[current-month=false]:text-neutral-400 data-[current-month=true][data-weekday=true]:text-neutral-800 data-[current-month=true][data-weekend=true]:text-red-600 data-[today=true]:text-white data-[current-month=true]:hover:bg-neutral-100"
            >
              {date.date}
            </Calendar.Date>
          ))
        }
      </Calendar.Content>
    </Calendar.Root>
  );
};

const weekendHighlightCode = `import { useState } from "react";
import { Calendar } from "@timeless-ui/react";

const WeekendHighlightDemo = () => {
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
            <Calendar.Day
              key={day.dayIndex}
              day={day}
              className="py-2 text-center text-sm font-medium data-[weekend=true]:text-red-600 data-[weekday=true]:text-neutral-600"
            >
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
              className="flex h-10 items-center justify-center rounded-md text-sm data-[current-month=true]:hover:bg-neutral-100 data-[current-month=false]:text-neutral-400 data-[today=true]:bg-neutral-800 data-[today=true]:font-semibold data-[today=true]:text-white data-[current-month=true][data-is-weekend]:text-red-600 data-[current-month=true][data-is-weekday]:text-neutral-800"
            >
              {date.date}
            </Calendar.Date>
          ))
        }
      </Calendar.Content>
    </Calendar.Root>
  );
};`;

/* ──────────────────────────────────────────────
   Pattern 2: Controlled
   ────────────────────────────────────────────── */

const ControlledDemo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex gap-2">
        <button
          onClick={goToToday}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          오늘로 이동
        </button>
      </div>

      <Calendar.Root date={currentDate} onMonthChange={setCurrentDate}>
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
    </div>
  );
};

const controlledCode = `import { useState } from "react";
import { Calendar } from "@timeless-ui/react";

const ControlledDemo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex gap-2">
        <button
          onClick={goToToday}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          오늘로 이동
        </button>
      </div>

      <Calendar.Root date={currentDate} onMonthChange={setCurrentDate}>
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
    </div>
  );
};`;

export { ExampleSection };
