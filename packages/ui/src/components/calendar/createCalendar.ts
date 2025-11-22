import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDay,
  isSameMonth,
  isToday,
  isWeekend,
  Locale,
  startOfMonth,
  startOfWeek,
} from "date-fns";

type CalendarDataType = {
  dateObject: Date;
  day: string;
  dayIndex: number;
  isWeekend: boolean;
  isWeekday: boolean;
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};
export function createCalendar(currentDate: Date, options: { locale?: Locale; formatStr?: string } = {}): CalendarDataType[] {
  const { locale, formatStr = "eee" } = options;

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const gridStart = startOfWeek(monthStart, { locale });
  const gridEnd = endOfWeek(monthEnd, { locale });

  const days = [];
  let day = gridStart;

  while (day <= gridEnd) {
    days.push({
      dateObject: day,
      dayIndex: getDay(day),
      day: format(day, formatStr, { locale }),
      date: getDate(day),
      isWeekend: isWeekend(day),
      isWeekday: !isWeekend(day),
      isCurrentMonth: isSameMonth(day, currentDate),
      isToday: isToday(day),
    });
    day = addDays(day, 1);
  }

  return days;
}

export type { CalendarDataType };
