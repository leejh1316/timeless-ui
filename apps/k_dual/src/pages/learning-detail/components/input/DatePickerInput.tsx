import { Button } from "@src/components/base/Button";
import { Card } from "@src/components/base/Card";
import { DatePicker, DatePickerRootProps, Popover, useControllableState } from "@timeless-ui/ui";
import clsx from "clsx";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, CalendarClock, ChevronLeft, ChevronRight } from "lucide-react";
interface DatePickerInputProps extends Omit<DatePickerRootProps, "children"> {}
const DatePickerInput = (props: DatePickerInputProps) => {
  const { value, defaultValue, onValueChange, ...pickerProps } = props;
  const [date, setDate] = useControllableState({
    value,
    defaultValue: defaultValue ?? new Date(),
    onChange: onValueChange,
  });
  return (
    <Popover.Root>
      <Popover.Trigger className="focus:border-primary-600 max-w-[220px] justify-start rounded-xl border border-gray-200 bg-gray-50 p-3 text-left text-[15px] text-gray-900 outline-none hover:bg-gray-100">
        <div className="flex justify-between gap-x-1">
          {format(date, "yyyy-MM-dd")}
          <CalendarClock size={20} className="text-gray-700" />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.View>
          <Popover.Content>
            <Card.Root className="p-4">
              <DatePicker.Root
                {...pickerProps}
                value={date}
                onValueChange={(newDate) => {
                  setDate(newDate);
                }}
                locale={ko}
              >
                <div className="mb-4 flex items-center justify-between pl-2">
                  <div className="text-base font-bold">
                    <DatePicker.Year />.
                    <DatePicker.Month />
                  </div>
                  <div className="flex">
                    <Button
                      asChild
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
                    >
                      <DatePicker.Prev>
                        <ChevronLeft size={16} />
                      </DatePicker.Prev>
                    </Button>
                    <Button
                      asChild
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
                    >
                      <DatePicker.Next>
                        <ChevronRight size={16} />
                      </DatePicker.Next>
                    </Button>
                  </div>
                </div>
                <DatePicker.Calendar>
                  <DatePicker.Header className="mb-2 grid grid-cols-7 text-center text-xs text-gray-400">
                    {(weekdays) => weekdays.map((day) => <div key={day.day}>{day.day}</div>)}
                  </DatePicker.Header>
                  <DatePicker.Content className="grid grid-cols-7 gap-1 text-center text-sm">
                    {(data) =>
                      data.map((day) => (
                        <DatePicker.DateTrigger
                          key={`${day.dayIndex}-${day.date}`}
                          data={day}
                          className={clsx("group h-8 w-8 rounded-lg text-gray-800 transition-all", {
                            "data-[selected=true]:bg-primary-50 data-[selected=true]:text-primary-600 hover:bg-gray-100 data-[selected=true]:font-medium":
                              day.isCurrentMonth,
                          })}
                        >
                          <DatePicker.Date
                            data={day}
                            className={clsx("data-[current-month=false]:invisible")}
                          />
                        </DatePicker.DateTrigger>
                      ))
                    }
                  </DatePicker.Content>
                </DatePicker.Calendar>
              </DatePicker.Root>
            </Card.Root>
          </Popover.Content>
        </Popover.View>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DatePickerInput;
