import { addDays, format, isWeekend, Locale, startOfWeek } from "date-fns";

type WeekdaysDataType = {
  day: string;
  isWeekend: boolean;
  isWeekday: boolean;
  dayIndex: number;
};
export function getWeekdays(options: { locale?: Locale; formatStr?: string } = {}): WeekdaysDataType[] {
  const { locale, formatStr = "eee" } = options;

  const weekStart = startOfWeek(new Date(), { locale });
  const weekdays = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    weekdays.push({
      day: format(day, formatStr, { locale }),
      isWeekend: isWeekend(day),
      isWeekday: !isWeekend(day),
      dayIndex: i,
    });
  }

  return weekdays;
}

export type { WeekdaysDataType };
