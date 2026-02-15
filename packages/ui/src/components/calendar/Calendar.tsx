import { CalendarDataType, createCalendar } from "./createCalendar";
import { getWeekdays, WeekdaysDataType } from "./getWeekdays";
import { addMonths, getMonth, getYear, isSameYear, Locale, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import { forwardRef, memo } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { Button } from "../button/Button";
import { useControllableState } from "../../hooks";

type ScopedProps<P> = P & { __scopeCalendar?: Scope };
const CALENDAR_NAME = "Calendar";
const [createCalendarContext, createCalendarScope] = createContextScope(CALENDAR_NAME);

type CalendarContextType = {
  date: Date;
  locale: Locale;
  formatStr: string;
  calendarData: CalendarDataType[];
  weekdays: WeekdaysDataType[];
  onYearChange?: (date: Date) => void;
  onMonthChange: (date: Date) => void;
};
const [CalendarProvider, useCalendarContext] = createCalendarContext<CalendarContextType>(CALENDAR_NAME);

// ================ Calendar.Root ================
interface CalendarRootProps extends PrimitivePropsWithRef<"div"> {
  date?: Date;
  defaultDate?: Date;
  formatStr?: string;
  locale?: Locale;
  onYearChange?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}
const CalendarRoot = memo((props: ScopedProps<CalendarRootProps>) => {
  const {
    __scopeCalendar,
    children,
    date,
    defaultDate = new Date(),
    formatStr = "eeeee",
    locale = ko,
    onMonthChange,
    onYearChange,
    ...otherProps
  } = props;
  const [controllableDate, setControllableDate] = useControllableState({
    value: date,
    defaultValue: defaultDate,
    onChange: onMonthChange,
  });

  const calendarData = createCalendar(controllableDate, { locale, formatStr });
  const weekdays = getWeekdays({ locale, formatStr });
  return (
    <CalendarProvider
      scope={__scopeCalendar}
      date={controllableDate}
      calendarData={calendarData}
      weekdays={weekdays}
      formatStr={formatStr}
      locale={locale}
      onMonthChange={setControllableDate}
      onYearChange={onYearChange}
    >
      <Primitive.div {...otherProps}>{children}</Primitive.div>
    </CalendarProvider>
  );
});
CalendarRoot.displayName = "Calendar.Root";

// ================ Calendar.Header ================
interface CalendarHeaderProps extends Omit<PrimitivePropsWithRef<"div">, "children"> {
  children: (weekdays: WeekdaysDataType[]) => React.ReactNode;
}
const CalendarHeader = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<CalendarHeaderProps>>(
  ({ __scopeCalendar, children, ...props }, forwardedRef) => {
    const context = useCalendarContext("CalendarHeader", __scopeCalendar);
    return (
      <Primitive.div ref={forwardedRef} {...props}>
        {children(context.weekdays)}
      </Primitive.div>
    );
  },
);
CalendarHeader.displayName = "Calendar.Header";

// ================ Calendar.Day ================
interface CalendarDayProps extends PrimitivePropsWithRef<"div"> {
  day: WeekdaysDataType;
}
const CalendarDay = forwardRef<React.ComponentRef<typeof Primitive.div>, CalendarDayProps>((props, forwardedRef) => {
  const { day, children, ...rest } = props;
  return (
    <Primitive.div
      aria-label={day.day}
      data-day-index={day.dayIndex}
      data-weekend={day.isWeekend}
      data-weekday={day.isWeekday}
      ref={forwardedRef}
      {...rest}
    >
      {children || day.day}
    </Primitive.div>
  );
});
CalendarDay.displayName = "Calendar.Day";

// ================ Calendar.Content ================
interface CalendarContentProps extends Omit<PrimitivePropsWithRef<"div">, "children"> {
  children: (calendarData: CalendarDataType[]) => React.ReactNode;
}
const CalendarContent = forwardRef<React.ComponentRef<typeof Primitive.div>, ScopedProps<CalendarContentProps>>(
  ({ __scopeCalendar, children, ...props }, forwardedRef) => {
    const context = useCalendarContext("CalendarContent", __scopeCalendar);
    return (
      <Primitive.div ref={forwardedRef} {...props}>
        {children(context.calendarData)}
      </Primitive.div>
    );
  },
);
CalendarContent.displayName = "Calendar.Content";

// ================ Calendar.Date ================
interface CalendarDateProps extends PrimitivePropsWithRef<"div"> {
  data: CalendarDataType;
}
const CalendarDate = memo(
  forwardRef<React.ComponentRef<typeof Primitive.div>, CalendarDateProps>((props, forwardedRef) => {
    const { data, children, ...rest } = props;
    return (
      <Primitive.div
        aria-label={`${data.date} ${data.day}`}
        data-date={data.date}
        data-day-index={data.dayIndex}
        data-current-month={data.isCurrentMonth}
        data-today={data.isToday}
        data-weekend={data.isWeekend}
        data-weekday={data.isWeekday}
        data-prev-month-end={data.isPrevMonthEnd}
        data-next-month-start={data.isNextMonthStart}
        ref={forwardedRef}
        {...rest}
      >
        {children || data.date}
      </Primitive.div>
    );
  }),
);
CalendarDate.displayName = "Calendar.Date";

// ================ Calendar.Year ================
interface CalendarYearProps extends PrimitivePropsWithRef<"span"> {}
const CalendarYear = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<CalendarYearProps>>(
  ({ __scopeCalendar, children, ...props }, forwardedRef) => {
    const { date } = useCalendarContext("CalendarYear", __scopeCalendar);
    const year = getYear(date);
    return (
      <Primitive.span ref={forwardedRef} {...props}>
        {children || year}
      </Primitive.span>
    );
  },
);
CalendarYear.displayName = "Calendar.Year";

// ================ Calendar.Month ===============
interface CalendarMonthProps extends PrimitivePropsWithRef<"span"> {}
const CalendarMonth = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<CalendarMonthProps>>(
  ({ __scopeCalendar, children, ...props }, forwardedRef) => {
    const { date } = useCalendarContext("CalendarMonth", __scopeCalendar);
    const month = getMonth(date) + 1;
    return (
      <Primitive.span ref={forwardedRef} {...props}>
        {children || month}
      </Primitive.span>
    );
  },
);
CalendarMonth.displayName = "Calendar.Month";

// ================ Calendar.Prev ================
interface CalendarPrevProps extends PrimitivePropsWithRef<"button"> {}
const CalendarPrev = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<CalendarPrevProps>>((props, forwardedRef) => {
  const { disabled, __scopeCalendar, onClick, ...buttonProps } = props;
  const { date, onMonthChange, onYearChange } = useCalendarContext("CalendarPrev", __scopeCalendar);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const prevDate = subMonths(date, 1);
    if (!isSameYear(prevDate, date)) {
      onYearChange?.(prevDate);
    }
    onMonthChange(prevDate);
    onClick?.(e);
  };
  return <Button ref={forwardedRef} disabled={disabled} onClick={handleClick} {...buttonProps} />;
});
CalendarPrev.displayName = "Calendar.Prev";
// ================ Calendar.Next ================
interface CalendarNextProps extends PrimitivePropsWithRef<"button"> {}
const CalendarNext = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<CalendarNextProps>>((props, forwardedRef) => {
  const { disabled, __scopeCalendar, onClick, ...buttonProps } = props;
  const { date, onMonthChange, onYearChange } = useCalendarContext("CalendarNext", __scopeCalendar);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const nextDate = addMonths(date, 1);
    if (!isSameYear(nextDate, date)) {
      onYearChange?.(nextDate);
    }
    onMonthChange(nextDate);
    onClick?.(e);
  };
  return <Button ref={forwardedRef} disabled={disabled} onClick={handleClick} {...buttonProps} />;
});
CalendarNext.displayName = "Calendar.Next";

// ================ Export ================
export const Calendar = {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Day: CalendarDay,
  Content: CalendarContent,
  Date: CalendarDate,
  Year: CalendarYear,
  Month: CalendarMonth,
  Prev: CalendarPrev,
  Next: CalendarNext,
};

export { createCalendarScope };

export type {
  CalendarContextType,
  CalendarRootProps,
  CalendarDayProps,
  CalendarDateProps,
  CalendarHeaderProps,
  CalendarContentProps,
  CalendarYearProps,
  CalendarMonthProps,
};
