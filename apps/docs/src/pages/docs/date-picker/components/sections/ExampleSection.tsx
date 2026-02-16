import { useState } from "react";
import { DatePicker } from "@timeless-ui/ui";
import { addDays, subDays } from "date-fns";
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
    <Document.Paragraph mb={8}>다양한 실무 시나리오에서 DatePicker 컴포넌트를 활용하는 방법을 확인하세요.</Document.Paragraph>

    <Document.Heading2>날짜 범위 제한</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>minDate</InlineCode>와 <InlineCode>maxDate</InlineCode>를 사용하여 선택 가능한 날짜 범위를 제한할 수 있습니다. 범위를
      벗어난 날짜는 자동으로 비활성화되며, 해당 월로 이동하는 것도 제한됩니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DateRangeDemo />
    </PreviewContainer>
    <CodeBlock code={dateRangeCode} className="mb-10" />

    <Document.Heading2>비활성화 상태</Document.Heading2>
    <Document.Paragraph mb={6}>
      <InlineCode>disabled</InlineCode> prop을 사용하여 DatePicker 전체를 비활성화할 수 있습니다. 비활성화된 상태에서는 날짜 선택 및 월
      이동이 불가능합니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <DisabledDemo />
    </PreviewContainer>
    <CodeBlock code={disabledCode} className="mb-10" />

    <Document.Heading2>외부 제어 (Controlled)</Document.Heading2>
    <Document.Paragraph mb={6}>
      외부 버튼이나 입력을 통해 DatePicker의 선택 날짜를 제어할 수 있습니다. <InlineCode>value</InlineCode> prop과
      <InlineCode>onValueChange</InlineCode> 콜백을 사용하여 완전히 제어되는 DatePicker를 구현할 수 있습니다.
    </Document.Paragraph>
    <PreviewContainer className="mb-4">
      <ControlledDemo />
    </PreviewContainer>
    <CodeBlock code={controlledCode} className="mb-10" />
  </section>
);

/* ──────────────────────────────────────────────
   Pattern 1: Date Range
   ────────────────────────────────────────────── */

const DateRangeDemo = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const minDate = subDays(today, 7);
  const maxDate = addDays(today, 7);

  return (
    <div className="w-full max-w-md">
      <div className="mb-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
        선택 가능 범위: 오늘 기준 전후 7일
      </div>

      <DatePicker.Root value={selectedDate} onValueChange={setSelectedDate} minDate={minDate} maxDate={maxDate}>
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
    </div>
  );
};

const dateRangeCode = `import { useState } from "react";
import { DatePicker } from "@timeless-ui/ui";
import { addDays, subDays } from "date-fns";

const DateRangeDemo = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const minDate = subDays(today, 7);
  const maxDate = addDays(today, 7);

  return (
    <div className="w-full max-w-md">
      <div className="mb-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
        선택 가능 범위: 오늘 기준 전후 7일
      </div>

      <DatePicker.Root value={selectedDate} onValueChange={setSelectedDate} minDate={minDate} maxDate={maxDate}>
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
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   Pattern 2: Disabled
   ────────────────────────────────────────────── */

const DisabledDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="w-full max-w-md">
      <DatePicker.Root value={selectedDate} onValueChange={setSelectedDate} disabled>
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
    </div>
  );
};

const disabledCode = `import { useState } from "react";
import { DatePicker } from "@timeless-ui/ui";

const DisabledDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="w-full max-w-md">
      <DatePicker.Root value={selectedDate} onValueChange={setSelectedDate} disabled>
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
    </div>
  );
};`;

/* ──────────────────────────────────────────────
   Pattern 3: Controlled
   ────────────────────────────────────────────── */

const ControlledDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const goToToday = () => {
    setSelectedDate(new Date());
    setDisplayedDate(new Date());
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={goToToday}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          오늘로 이동
        </button>
      </div>

      <DatePicker.Root
        value={selectedDate}
        onValueChange={setSelectedDate}
        displayDate={displayedDate}
        onDisplayDateChange={setDisplayedDate}
      >
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
                  <DatePicker.Date data={date}>{date.date}</DatePicker.Date>
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

const controlledCode = `import { useState } from "react";
import { DatePicker } from "@timeless-ui/ui";

const ControlledDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const goToToday = () => {
    setSelectedDate(new Date());
    setDisplayedDate(new Date());
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={goToToday}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          오늘로 이동
        </button>
      </div>

      <DatePicker.Root value={selectedDate} onValueChange={setSelectedDate} displayDate={displayedDate} onDisplayDateChange={setDisplayedDate}>
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
};`;

export { ExampleSection };
