import { useControllableState } from "../../hooks/useControllableState";
import { createContextScope, Scope } from "../../hooks/useCreateContext";
import { CalendarDataType } from "../calendar/createCalendar";
import {
  addMonths,
  endOfMonth,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameYear,
  Locale,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import { forwardRef, useCallback } from "react";
import { Button } from "../button/Button";
import {
  Calendar,
  CalendarContentProps,
  CalendarDateProps,
  CalendarDayProps,
  CalendarHeaderProps,
  createCalendarScope,
} from "../calendar/Calendar";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";

type ScopedProps<P> = P & { __scopeDatePicker?: Scope };

const DATE_PICKER_NAME = "DatePicker";
const [createDatePickerContext, createDatePickerScope] = createContextScope(DATE_PICKER_NAME, [createCalendarScope]);
const useCalendarScope = createCalendarScope();

type DatePickerContextType = {
  value: Date;
  disabled: boolean;
  locale: Locale;
  formatStr: string;
  minDate?: Date;
  maxDate?: Date;
  displayDate: Date;
  setDisplayDate: (date: Date) => void;
  setValue: (date: Date) => void;
  onYearChange?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
};

const [DatePickerProvider, useDatePickerContext] = createDatePickerContext<DatePickerContextType>(DATE_PICKER_NAME);

// ================ DatePicker.Root ================
interface DatePickerRootProps {
  children: React.ReactNode;
  disabled?: boolean;
  locale?: Locale;
  formatStr?: string;
  value?: Date;
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  displayDate?: Date;
  defaultDisplayDate?: Date;
  onDisplayDateChange?: (date: Date) => void;
  onValueChange?: (date: Date) => void;
  onYearChange?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}
const DatePickerRoot = (props: ScopedProps<DatePickerRootProps>) => {
  const {
    __scopeDatePicker,
    children,
    formatStr = "eee",
    defaultValue,
    disabled = false,
    displayDate,
    defaultDisplayDate = new Date(),
    onDisplayDateChange,
    locale = ko,
    maxDate,
    minDate,
    onMonthChange,
    onValueChange,
    onYearChange,
    value,
  } = props;
  const [dateValue, setDateValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  });
  const [display, setDisplay] = useControllableState({
    value: displayDate,
    defaultValue: defaultDisplayDate,
    onChange: onDisplayDateChange,
  });

  return (
    <DatePickerProvider
      scope={__scopeDatePicker}
      value={dateValue}
      disabled={disabled}
      locale={locale}
      minDate={minDate}
      maxDate={maxDate}
      formatStr={formatStr}
      displayDate={display}
      setDisplayDate={setDisplay}
      setValue={setDateValue}
      onYearChange={onYearChange}
      onMonthChange={onMonthChange}
    >
      {children}
    </DatePickerProvider>
  );
};
DatePickerRoot.displayName = "DatePicker.Root";

// ================ DatePicker.Calendar ================
interface DatePickerCalendarProps {
  children?: React.ReactNode;
}
const DatePickerCalendar = (props: ScopedProps<DatePickerCalendarProps>) => {
  const { __scopeDatePicker, children } = props;
  const { locale, formatStr, displayDate } = useDatePickerContext("DatePickerCalendar", __scopeDatePicker);
  const calendarScope = useCalendarScope(__scopeDatePicker);
  return (
    <Calendar.Root {...calendarScope} locale={locale} formatStr={formatStr} date={displayDate}>
      {children}
    </Calendar.Root>
  );
};
DatePickerCalendar.displayName = "DatePicker.Calendar";

// ================ DatePicker.Header ================
const DatePickerCalendarHeader = forwardRef<React.ComponentRef<typeof Calendar.Header>, ScopedProps<CalendarHeaderProps>>(
  ({ __scopeDatePicker, ...props }, forwardedRef) => {
    const calendarScope = useCalendarScope(__scopeDatePicker);
    return <Calendar.Header ref={forwardedRef} {...calendarScope} {...props} />;
  },
);
DatePickerCalendarHeader.displayName = "DatePicker.CalendarHeader";
// ================ DatePicker.Day ================
const DatePickerCalendarDay = forwardRef<React.ComponentRef<typeof Calendar.Day>, CalendarDayProps>((props, forwardedRef) => {
  return <Calendar.Day ref={forwardedRef} {...props} />;
});
DatePickerCalendarDay.displayName = "DatePicker.CalendarDay";
// ================ DatePicker.CalendarContent ================
const DatePickerCalendarContent = forwardRef<React.ComponentRef<typeof Calendar.Content>, ScopedProps<CalendarContentProps>>(
  ({ __scopeDatePicker, ...props }, forwardedRef) => {
    const calendarScope = useCalendarScope(__scopeDatePicker);
    return <Calendar.Content ref={forwardedRef} {...calendarScope} {...props} />;
  },
);
DatePickerCalendarContent.displayName = "DatePicker.CalendarContent";
// ================ DatePicker.Trigger ================
interface DatePickerCalendarDateTriggerProps extends PrimitivePropsWithRef<"button"> {
  data: CalendarDataType;
}
const DatePickerCalendarDateTrigger = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<DatePickerCalendarDateTriggerProps>>(
  (props, forwardedRef) => {
    const { disabled, data, onClick, __scopeDatePicker, ...dateProps } = props;
    const {
      minDate,
      maxDate,
      value,
      setValue,
      disabled: pickerDisabled,
    } = useDatePickerContext("DatePickerCalendarDateTrigger", __scopeDatePicker);
    const isDisabled =
      pickerDisabled ||
      disabled ||
      (minDate && isBefore(startOfDay(data.dateObject), startOfDay(minDate))) ||
      (maxDate && isBefore(startOfDay(maxDate), startOfDay(data.dateObject)));

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return;
        setValue(new Date(data.dateObject));
        onClick?.(e);
      },
      [isDisabled, setValue, onClick, data],
    );

    return (
      <Button
        disabled={isDisabled}
        data-selected={isSameDay(value, data.dateObject)}
        onClick={handleClick}
        ref={forwardedRef}
        aria-label={`${data.date} ${data.day} button`}
        data-date={data.date}
        data-day-index={data.dayIndex}
        data-current-month={data.isCurrentMonth}
        data-today={data.isToday}
        data-weekend={data.isWeekend}
        data-weekday={data.isWeekday}
        data-prev-month-end={data.isPrevMonthEnd}
        data-next-month-start={data.isNextMonthStart}
        {...dateProps}
      />
    );
  },
);
DatePickerCalendarDateTrigger.displayName = "DatePicker.CalendarDateTrigger";

// ================ DatePicker.Date ================
const DatePickerCalendarDate = forwardRef<React.ComponentRef<typeof Calendar.Date>, CalendarDateProps>((props, forwardedRef) => {
  return <Calendar.Date ref={forwardedRef} {...props} />;
});

// ================ DatePicker.Prev ================
interface DatePickerPrevProps extends PrimitivePropsWithRef<"button"> {}
const DatePickerPrev = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<DatePickerPrevProps>>((props, forwardedRef) => {
  const { disabled, __scopeDatePicker, ...buttonProps } = props;
  const {
    displayDate,
    setDisplayDate,
    onMonthChange,
    onYearChange,
    minDate,
    disabled: pickerDisabled,
  } = useDatePickerContext("DatePickerPrev", __scopeDatePicker);
  const isDisabled = pickerDisabled || disabled || (minDate && isBefore(endOfMonth(subMonths(displayDate, 1)), minDate));
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    const prevDate = subMonths(displayDate, 1);
    setDisplayDate(prevDate);
    onMonthChange?.(prevDate);
    if (!isSameYear(prevDate, displayDate)) {
      onYearChange?.(prevDate);
    }
  };
  return <Button ref={forwardedRef} disabled={isDisabled} onClick={handleClick} {...buttonProps} />;
});
DatePickerPrev.displayName = "DatePicker.Prev";
// ================ DatePicker.Next ================
interface DatePickerNextProps extends PrimitivePropsWithRef<"button"> {}
const DatePickerNext = forwardRef<React.ComponentRef<typeof Button>, ScopedProps<DatePickerNextProps>>((props, forwardedRef) => {
  const { disabled, __scopeDatePicker, onClick, ...buttonProps } = props;
  const {
    displayDate,
    setDisplayDate,
    onMonthChange,
    onYearChange,
    maxDate,
    disabled: pickerDisabled,
  } = useDatePickerContext("DatePickerNext", __scopeDatePicker);
  const isDisabled = pickerDisabled || disabled || (maxDate && isAfter(startOfMonth(addMonths(displayDate, 1)), maxDate));
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    const nextDate = addMonths(displayDate, 1);
    setDisplayDate(nextDate);
    onMonthChange?.(nextDate);
    if (!isSameYear(nextDate, displayDate)) {
      onYearChange?.(nextDate);
    }
    onClick?.(e);
  };
  return <Button ref={forwardedRef} disabled={isDisabled} onClick={handleClick} {...buttonProps} />;
});
DatePickerNext.displayName = "DatePicker.Next";
// ================ DatePicker.Year ================
interface DatePickerYearProps extends PrimitivePropsWithRef<"span"> {}
const DatePickerYear = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<DatePickerYearProps>>(
  ({ __scopeDatePicker, children, ...props }, forwardedRef) => {
    const { displayDate } = useDatePickerContext("DatePickerYear", __scopeDatePicker);
    const year = getYear(displayDate);
    return (
      <Primitive.span ref={forwardedRef} {...props}>
        {children || year}
      </Primitive.span>
    );
  },
);
DatePickerYear.displayName = "DatePicker.Year";

// ================ DatePicker.Month ===============
interface DatePickerMonthProps extends PrimitivePropsWithRef<"span"> {}
const DatePickerMonth = forwardRef<React.ComponentRef<typeof Primitive.span>, ScopedProps<DatePickerMonthProps>>(
  ({ __scopeDatePicker, children, ...props }, forwardedRef) => {
    const { displayDate } = useDatePickerContext("DatePickerMonth", __scopeDatePicker);
    const month = getMonth(displayDate) + 1;
    return (
      <Primitive.span ref={forwardedRef} {...props}>
        {children || month}
      </Primitive.span>
    );
  },
);
DatePickerMonth.displayName = "DatePicker.Month";

export const DatePicker = {
  Root: DatePickerRoot,
  Calendar: DatePickerCalendar,
  Header: DatePickerCalendarHeader,
  Day: DatePickerCalendarDay,
  Content: DatePickerCalendarContent,
  DateTrigger: DatePickerCalendarDateTrigger,
  Date: DatePickerCalendarDate,
  Prev: DatePickerPrev,
  Next: DatePickerNext,
  Year: DatePickerYear,
  Month: DatePickerMonth,
};

export type { DatePickerContextType, DatePickerRootProps };
