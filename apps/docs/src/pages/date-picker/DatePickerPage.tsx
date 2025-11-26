import { ComponentPreview } from "@src/components/base/Preview";
import { PropsTable } from "@src/components/base/PropsTable";
import { ComponentPageLayout } from "@src/components/layout/ContentLayout";
import { Button, DatePicker, Popover } from "@timeless-ui/ui";
import { addDays, format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const rootPropsData = [
    {
      prop: "value",
      type: "Date",
      defaultValue: "-",
      description: "선택된 날짜입니다.",
    },
    {
      prop: "defaultValue",
      type: "Date",
      defaultValue: "-",
      description: "기본으로 선택된 날짜입니다.",
    },
    {
      prop: "onValueChange",
      type: "(date: Date) => void",
      defaultValue: "-",
      description: "날짜가 변경될 때 호출되는 콜백입니다.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "데이트 피커를 비활성화합니다.",
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
      defaultValue: "'eee'",
      description: "요일을 표시하는 포맷입니다.",
    },
    {
      prop: "minDate",
      type: "Date",
      defaultValue: "-",
      description: "선택할 수 있는 최소 날짜입니다.",
    },
    {
      prop: "maxDate",
      type: "Date",
      defaultValue: "-",
      description: "선택할 수 있는 최대 날짜입니다.",
    },
    {
      prop: "displayDate",
      type: "Date",
      defaultValue: "-",
      description: "달력에 표시되는 날짜입니다.",
    },
    {
      prop: "defaultDisplayDate",
      type: "Date",
      defaultValue: "new Date()",
      description: "달력에 기본으로 표시되는 날짜입니다.",
    },
    {
      prop: "onDisplayDateChange",
      type: "(date: Date) => void",
      defaultValue: "-",
      description: "달력 표시 날짜가 변경될 때 호출되는 콜백입니다.",
    },
    {
      prop: "onYearChange",
      type: "(date: Date) => void",
      defaultValue: "-",
      description: "연도가 변경될 때 호출되는 콜백입니다.",
    },
    {
      prop: "onMonthChange",
      type: "(date: Date) => void",
      defaultValue: "-",
      description: "월이 변경될 때 호출되는 콜백입니다.",
    },
  ];

  const exampleCode = `
import { DatePicker } from "@timeless-ui/ui";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Component() {
  return (
    <DatePicker.Root>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatePicker.Year />
          <DatePicker.Month />
        </div>
        <div className="flex items-center gap-2">
          <DatePicker.Prev>
            <ChevronLeft />
          </DatePicker.Prev>
          <DatePicker.Next>
            <ChevronRight />
          </DatePicker.Next>
        </div>
      </div>
      <DatePicker.Calendar>
        <DatePicker.Header>
          {(weekdays) => (
            <div className="grid grid-cols-7">
              {weekdays.map((day) => (
                <DatePicker.Day
                  key={day.dayIndex}
                  day={day}
                  className="flex h-8 w-8 items-center justify-center"
                />
              ))}
            </div>
          )}
        </DatePicker.Header>
        <DatePicker.Content>
          {(calendarData) => (
            <div className="grid grid-cols-7">
              {calendarData.map((data) => (
                <DatePicker.Date
                  key={data.dateObject.toISOString()}
                  data={data}
                  className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300 data-[active=true]:bg-blue-200"
                />
              ))}
            </div>
          )}
        </DatePicker.Content>
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
}
`;

  const example2Code = `
import { DatePicker } from "@timeless-ui/ui";
import { addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Component() {
  return (
    <DatePicker.Root
      minDate={subDays(new Date(), 5)}
      maxDate={addDays(new Date(), 5)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatePicker.Year />
          <DatePicker.Month />
        </div>
        <div className="flex items-center gap-2">
          <DatePicker.Prev>
            <ChevronLeft />
          </DatePicker.Prev>
          <DatePicker.Next>
            <ChevronRight />
          </DatePicker.Next>
        </div>
      </div>
      <DatePicker.Calendar>
        <DatePicker.Header>
          {(weekdays) => (
            <div className="grid grid-cols-7">
              {weekdays.map((day) => (
                <DatePicker.Day
                  key={day.dayIndex}
                  day={day}
                  className="flex h-8 w-8 items-center justify-center"
                />
              ))}
            </div>
          )}
        </DatePicker.Header>
        <DatePicker.Content>
          {(calendarData) => (
            <div className="grid grid-cols-7">
              {calendarData.map((data) => (
                <DatePicker.Date
                  key={data.dateObject.toISOString()}
                  data={data}
                  className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300 data-[active=true]:bg-blue-200 disabled:text-gray-300"
                />
              ))}
            </div>
          )}
        </DatePicker.Content>
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
}
`;

  const example3Code = `
import { Button, DatePicker, Popover, PopoverContent, PopoverTrigger } from "@timeless-ui/ui";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Component() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker.Root value={date} onValueChange={setDate}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DatePicker.Year />
              <DatePicker.Month />
            </div>
            <div className="flex items-center gap-2">
              <DatePicker.Prev>
                <ChevronLeft />
              </DatePicker.Prev>
              <DatePicker.Next>
                <ChevronRight />
              </DatePicker.Next>
            </div>
          </div>
          <DatePicker.Calendar>
            <DatePicker.Header>
              {(weekdays) => (
                <div className="grid grid-cols-7">
                  {weekdays.map((day) => (
                    <DatePicker.Day
                      key={day.dayIndex}
                      day={day}
                      className="flex h-8 w-8 items-center justify-center"
                    />
                  ))}
                </div>
              )}
            </DatePicker.Header>
            <DatePicker.Content>
              {(calendarData) => (
                <div className="grid grid-cols-7">
                  {calendarData.map((data) => (
                    <DatePicker.Date
                      key={data.dateObject.toISOString()}
                      data={data}
                      className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300 data-[active=true]:bg-blue-200"
                    />
                  ))}
                </div>
              )}
            </DatePicker.Content>
          </DatePicker.Calendar>
        </DatePicker.Root>
      </PopoverContent>
    </Popover>
  );
}
`;

  return (
    <ComponentPageLayout
      title="DatePicker"
      description="날짜를 선택하는 데이트 피커 컴포넌트입니다."
    >
      <ComponentPreview code={exampleCode} title="Example" description="">
        <div className="w-full max-w-sm rounded-lg border p-4">
          <DatePicker.Root>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DatePicker.Year />
                <DatePicker.Month />
              </div>
              <div className="flex items-center gap-2">
                <DatePicker.Prev>
                  <ChevronLeft />
                </DatePicker.Prev>
                <DatePicker.Next>
                  <ChevronRight />
                </DatePicker.Next>
              </div>
            </div>
            <DatePicker.Calendar>
              <DatePicker.Header>
                {(weekdays) => (
                  <div className="grid grid-cols-7">
                    {weekdays.map((day) => (
                      <DatePicker.Day
                        key={day.dayIndex}
                        day={day}
                        className="flex h-8 w-8 items-center justify-center"
                      />
                    ))}
                  </div>
                )}
              </DatePicker.Header>
              <DatePicker.Content>
                {(calendarData) => (
                  <div className="grid grid-cols-7 grid-rows-6">
                    {calendarData.map((data) => (
                      <DatePicker.DateTrigger
                        key={data.dateObject.toISOString()}
                        data={data}
                        className="data-[selected=true]:bg-blue-200 data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300"
                      >
                        <DatePicker.Date
                          data={data}
                          className="flex h-8 w-8 items-center justify-center rounded-full"
                        />
                      </DatePicker.DateTrigger>
                    ))}
                  </div>
                )}
              </DatePicker.Content>
            </DatePicker.Calendar>
          </DatePicker.Root>
        </div>
      </ComponentPreview>
      <ComponentPreview
        code={example3Code}
        title="With Popover"
        description="Popover와 함께 사용하여 DatePicker를 구현할 수 있습니다."
      >
        <div className="w-full max-w-sm rounded-lg border p-4">
          <Popover.Root placement="bottom-start">
            <Popover.Trigger>
              <Button>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.View>
                <Popover.Content className="w-auto p-0">
                  <div className="rounded-2xl bg-white p-2 shadow-2xl">
                    <DatePicker.Root value={date} onValueChange={setDate}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DatePicker.Year />
                          <DatePicker.Month />
                        </div>
                        <div className="flex items-center gap-2">
                          <DatePicker.Prev>
                            <ChevronLeft />
                          </DatePicker.Prev>
                          <DatePicker.Next>
                            <ChevronRight />
                          </DatePicker.Next>
                        </div>
                      </div>
                      <DatePicker.Calendar>
                        <DatePicker.Header>
                          {(weekdays) => (
                            <div className="grid grid-cols-7">
                              {weekdays.map((day) => (
                                <DatePicker.Day
                                  key={day.dayIndex}
                                  day={day}
                                  className="flex h-8 w-8 items-center justify-center"
                                />
                              ))}
                            </div>
                          )}
                        </DatePicker.Header>
                        <DatePicker.Content>
                          {(calendarData) => (
                            <div className="grid grid-cols-7 grid-rows-6">
                              {calendarData.map((data) => (
                                <DatePicker.DateTrigger
                                  key={data.dateObject.toISOString()}
                                  data={data}
                                  className="group"
                                >
                                  <DatePicker.Date
                                    data={data}
                                    className="flex h-8 w-8 items-center justify-center rounded-full data-[today=true]:bg-red-200 data-[current-month=false]:text-gray-300 group-data-[selected=true]:bg-blue-200"
                                  />
                                </DatePicker.DateTrigger>
                              ))}
                            </div>
                          )}
                        </DatePicker.Content>
                      </DatePicker.Calendar>
                    </DatePicker.Root>
                  </div>
                </Popover.Content>
              </Popover.View>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </ComponentPreview>
      <h2 className="mt-8 text-2xl font-bold">Props</h2>
      <PropsTable data={rootPropsData} />
    </ComponentPageLayout>
  );
}
