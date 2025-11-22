import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Calendar } from "@timeless-ui/ui";
import { ko, enUS } from "date-fns/locale";

export default function CalendarPage() {
  const rootPropsData = [
    {
      prop: "date",
      type: "Date",
      defaultValue: "new Date()",
      description: "캘린더의 기준이 되는 날짜입니다.",
    },
    {
      prop: "locale",
      type: "Locale",
      defaultValue: "ko",
      description: "date-fns의 Locale 객체입니다.",
    },
    {
      prop: "formatStr",
      type: "string",
      defaultValue: "'eeeee'",
      description: "요일을 표시하는 포맷입니다.",
    },
  ];

  const exampleCode = `
import { Calendar } from "@timeless-ui/ui";
import { ko } from "date-fns/locale";

export function Component() {
  return (
    <Calendar.Root date={new Date()} locale={ko}>
      <div className="flex items-center justify-center gap-4">
        <Calendar.Year />
        <Calendar.Month />
      </div>
      <Calendar.Header>
        {(weekdays) => (
          <div className="grid grid-cols-7">
            {weekdays.map((day) => (
              <Calendar.Day
                key={day.dayIndex}
                day={day}
                className="flex h-8 w-8 items-center justify-center"
              />
            ))}
          </div>
        )}
      </Calendar.Header>
      <Calendar.Content>
        {(calendarData) => (
          <div className="grid grid-cols-7">
            {calendarData.map((data) => (
              <Calendar.Date
                key={data.id}
                data={data}
                className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300"
              />
            ))}
          </div>
        )}
      </Calendar.Content>
    </Calendar.Root>
  );
}
`;
  const exampleLocaleCode = `
import { Calendar } from "@timeless-ui/ui";
import { enUS } from "date-fns/locale";

export function Component() {
  return (
    <Calendar.Root defaultDate={new Date()} locale={enUS}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <Calendar.Year />.
          <Calendar.Month />
        </div>
        <div>
          <Calendar.Prev className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">Prev</Calendar.Prev>
          <Calendar.Next className="ml-2 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">Next</Calendar.Next>
        </div>
      </div>
      <Calendar.Header>
        {(weekdays) => (
          <div className="grid grid-cols-7">
            {weekdays.map((day) => (
              <Calendar.Day key={day.dayIndex} day={day} className="flex h-8 w-8 items-center justify-center" />
            ))}
          </div>
        )}
      </Calendar.Header>
      <Calendar.Content>
        {(calendarData) => (
          <div className="grid grid-cols-7 grid-rows-6">
            {calendarData.map((data) => (
              <Calendar.Date
                key={data.dateObject.toISOString()}
                data={data}
                className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300"
              />
            ))}
          </div>
        )}
      </Calendar.Content>
    </Calendar.Root>
  );
}
`;

  return (
    <ComponentPageLayout title="Calendar" description="날짜를 표시하는 캘린더 컴포넌트입니다.">
      <ComponentPreview code={exampleCode} title="Example" description="">
        <div className="w-full max-w-sm rounded-lg border p-4">
          <Calendar.Root defaultDate={new Date()} locale={ko}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <Calendar.Year />.
                <Calendar.Month />
              </div>
              <div>
                <Calendar.Prev className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">Prev</Calendar.Prev>
                <Calendar.Next className="ml-2 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">Next</Calendar.Next>
              </div>
            </div>
            <Calendar.Header>
              {(weekdays) => (
                <div className="grid grid-cols-7">
                  {weekdays.map((day) => (
                    <Calendar.Day key={day.dayIndex} day={day} className="flex h-8 w-8 items-center justify-center" />
                  ))}
                </div>
              )}
            </Calendar.Header>
            <Calendar.Content>
              {(calendarData) => (
                <div className="grid grid-cols-7 grid-rows-6">
                  {calendarData.map((data) => (
                    <Calendar.Date
                      key={data.dateObject.toISOString()}
                      data={data}
                      className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300"
                    />
                  ))}
                </div>
              )}
            </Calendar.Content>
          </Calendar.Root>
        </div>
      </ComponentPreview>
      <ComponentPreview code={exampleCode} title="locale 설정" description="date-fns의 locale을 설정할 수 있습니다.">
        <div className="w-full max-w-sm rounded-lg border p-4">
          <Calendar.Root defaultDate={new Date()} locale={enUS} formatStr="eee">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Calendar.Year />.
                <Calendar.Month />
              </div>
              <div>
                <Calendar.Prev className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">Prev</Calendar.Prev>
                <Calendar.Next className="ml-2 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">Next</Calendar.Next>
              </div>
            </div>
            <Calendar.Header>
              {(weekdays) => (
                <div className="grid grid-cols-7">
                  {weekdays.map((day) => (
                    <Calendar.Day key={day.dayIndex} day={day} className="flex h-8 w-8 items-center justify-center" />
                  ))}
                </div>
              )}
            </Calendar.Header>
            <Calendar.Content>
              {(calendarData) => (
                <div className="grid grid-cols-7 grid-rows-6">
                  {calendarData.map((data) => (
                    <Calendar.Date
                      key={data.dateObject.toISOString()}
                      data={data}
                      className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300"
                    />
                  ))}
                </div>
              )}
            </Calendar.Content>
          </Calendar.Root>
        </div>
      </ComponentPreview>
      <h2 className="mt-8 text-2xl font-bold">Props</h2>
      <PropsTable data={rootPropsData} />
    </ComponentPageLayout>
  );
}
