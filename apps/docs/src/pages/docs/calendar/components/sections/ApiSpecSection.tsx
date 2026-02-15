import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { PropsTable, PropsTableRow } from "@src/components/common/PropsTable";
import { AttributeTable, AttributeTableRow } from "@src/components/common/AttributeTable";

/* ──────────────────────────────────────────────
   API Spec Section
   ────────────────────────────────────────────── */

const ApiSpecSection = () => (
  <section>
    <Document.Heading1>API 명세</Document.Heading1>
    <Document.Paragraph mb={8}>
      Calendar 컴포넌트의 전체 Props 및 타입 명세입니다. 각 하위 컴포넌트별로 사용 가능한 속성과 타입을 확인할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading2>Calendar.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      캘린더의 최상위 컨테이너 컴포넌트입니다. 표시할 날짜, 로케일, 포맷 문자열 및 월/년도 변경 콜백을 설정할 수 있습니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} />

    <Document.Heading2>Calendar.Header</Document.Heading2>
    <Document.Paragraph mb={4}>
      요일 헤더를 렌더링하는 컴포넌트입니다. render function을 children으로 받아 요일 데이터 배열을 제공합니다.
    </Document.Paragraph>
    <PropsTable rows={headerProps} />

    <Document.Heading2>Calendar.Day</Document.Heading2>
    <Document.Paragraph mb={4}>요일 헤더의 개별 요일 셀을 렌더링하는 컴포넌트입니다.</Document.Paragraph>
    <PropsTable rows={dayProps} />

    <Document.Heading2>Calendar.Content</Document.Heading2>
    <Document.Paragraph mb={4}>
      날짜 그리드를 렌더링하는 컴포넌트입니다. render function을 children으로 받아 캘린더 데이터 배열을 제공합니다.
    </Document.Paragraph>
    <PropsTable rows={contentProps} />

    <Document.Heading2>Calendar.Date</Document.Heading2>
    <Document.Paragraph mb={4}>
      날짜 그리드의 개별 날짜 셀을 렌더링하는 컴포넌트입니다. 다양한 상태 정보를 data attribute로 제공하여 조건부 스타일링을 쉽게 할 수
      있습니다.
    </Document.Paragraph>
    <PropsTable rows={dateProps} />

    <Document.Heading2>Calendar.Year / Calendar.Month</Document.Heading2>
    <Document.Paragraph mb={4}>
      현재 캘린더가 표시하는 연도와 월을 텍스트로 렌더링합니다. 별도의 추가 props는 없으며, 기본 HTML span 엘리먼트의 속성을 사용할 수
      있습니다.
    </Document.Paragraph>

    <Document.Heading2>Calendar.Prev / Calendar.Next</Document.Heading2>
    <Document.Paragraph mb={4}>
      이전 달 또는 다음 달로 이동하는 버튼 컴포넌트입니다. 기본 HTML button 엘리먼트의 속성을 사용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading2>커스텀 타입</Document.Heading2>
    <Document.Paragraph mb={6}>
      Calendar 컴포넌트에서 사용하는 커스텀 타입들입니다. 각 타입은 컴포넌트에서 export되어 있어 직접 사용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>CalendarDataType</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>Calendar.Content</InlineCode>의 render function이 제공하는 배열의 각 항목 타입입니다. 개별 날짜 셀에 대한 모든 정보를
      포함합니다.
    </Document.Paragraph>
    <PropsTable rows={calendarDataTypeProps} />

    <Document.Heading3>WeekdaysDataType</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>Calendar.Header</InlineCode>의 render function이 제공하는 배열의 각 항목 타입입니다. 요일 정보를 포함합니다.
    </Document.Paragraph>
    <PropsTable rows={weekdaysDataTypeProps} />

    <Document.Heading2>Data Attributes</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>Calendar.Date</InlineCode>와 <InlineCode>Calendar.Day</InlineCode> 컴포넌트는 다양한 상태 정보를 data attribute로
      제공합니다. CSS 선택자를 통해 조건부 스타일링을 간편하게 적용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Calendar.Date Attributes</Document.Heading3>
    <AttributeTable rows={dateAttributes} />

    <Document.Heading3>Calendar.Day Attributes</Document.Heading3>
    <AttributeTable rows={dayAttributes} />
  </section>
);

/* ──────────────────────────────────────────────
   Props Data
   ────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "date",
    type: "Date",
    defaultValue: "—",
    description: "현재 표시할 날짜입니다. Controlled 모드에서 사용합니다",
  },
  {
    name: "defaultDate",
    type: "Date",
    defaultValue: "new Date()",
    description: "초기값으로 표시할 날짜입니다. Uncontrolled 모드에서 사용합니다",
  },
  {
    name: "formatStr",
    type: "string",
    defaultValue: "'eeeee'",
    description: "요일 표시 형식 문자열입니다. date-fns의 format 함수 형식을 따릅니다",
  },
  {
    name: "locale",
    type: "Locale",
    defaultValue: "ko",
    description: "date-fns의 로케일 객체입니다. 요일 및 월 이름의 언어를 지정합니다",
  },
  {
    name: "onMonthChange",
    type: "(date: Date) => void",
    defaultValue: "—",
    description: "월이 변경될 때 호출되는 콜백 함수입니다",
  },
  {
    name: "onYearChange",
    type: "(date: Date) => void",
    defaultValue: "—",
    description: "년도가 변경될 때 호출되는 콜백 함수입니다",
  },
];

const headerProps: PropsTableRow[] = [
  {
    name: "children",
    type: "(weekdays: WeekdaysDataType[]) => React.ReactNode",
    defaultValue: "—",
    description: "요일 데이터 배열을 인자로 받는 render function입니다",
  },
];

const dayProps: PropsTableRow[] = [
  {
    name: "day",
    type: "WeekdaysDataType",
    defaultValue: "—",
    description: "요일 정보 객체입니다",
  },
];

const contentProps: PropsTableRow[] = [
  {
    name: "children",
    type: "(calendarData: CalendarDataType[]) => React.ReactNode",
    defaultValue: "—",
    description: "캘린더 날짜 데이터 배열을 인자로 받는 render function입니다",
  },
];

const dateProps: PropsTableRow[] = [
  {
    name: "data",
    type: "CalendarDataType",
    defaultValue: "—",
    description: "날짜 정보 객체입니다",
  },
];

/* ──────────────────────────────────────────────
   Custom Type Props
   ────────────────────────────────────────────── */

const calendarDataTypeProps: PropsTableRow[] = [
  {
    name: "dateObject",
    type: "Date",
    defaultValue: "—",
    description: "날짜 객체입니다",
  },
  {
    name: "day",
    type: "string",
    defaultValue: "—",
    description: "formatStr에 따라 포맷팅된 요일 문자열입니다",
  },
  {
    name: "dayIndex",
    type: "number",
    defaultValue: "—",
    description: "요일 인덱스입니다 (0: 일요일 ~ 6: 토요일)",
  },
  {
    name: "date",
    type: "number",
    defaultValue: "—",
    description: "날짜 숫자입니다 (1 ~ 31)",
  },
  {
    name: "isWeekend",
    type: "boolean",
    defaultValue: "—",
    description: "주말 여부입니다",
  },
  {
    name: "isWeekday",
    type: "boolean",
    defaultValue: "—",
    description: "평일 여부입니다",
  },
  {
    name: "isCurrentMonth",
    type: "boolean",
    defaultValue: "—",
    description: "현재 표시 중인 월에 속한 날짜인지 여부입니다",
  },
  {
    name: "isToday",
    type: "boolean",
    defaultValue: "—",
    description: "오늘 날짜 여부입니다",
  },
  {
    name: "isPrevMonthEnd",
    type: "boolean",
    defaultValue: "—",
    description: "이전 달의 마지막 날짜인지 여부입니다",
  },
  {
    name: "isNextMonthStart",
    type: "boolean",
    defaultValue: "—",
    description: "다음 달의 첫 날짜인지 여부입니다",
  },
];

const weekdaysDataTypeProps: PropsTableRow[] = [
  {
    name: "day",
    type: "string",
    defaultValue: "—",
    description: "formatStr에 따라 포맷팅된 요일 문자열입니다",
  },
  {
    name: "dayIndex",
    type: "number",
    defaultValue: "—",
    description: "요일 인덱스입니다 (0: 일요일 ~ 6: 토요일)",
  },
  {
    name: "isWeekend",
    type: "boolean",
    defaultValue: "—",
    description: "주말 여부입니다",
  },
  {
    name: "isWeekday",
    type: "boolean",
    defaultValue: "—",
    description: "평일 여부입니다",
  },
];

/* ──────────────────────────────────────────────
   Data Attributes
   ────────────────────────────────────────────── */

const dateAttributes: AttributeTableRow[] = [
  {
    name: "data-current-month",
    value: "true | false",
    description: "현재 표시 중인 월에 속한 날짜일 때 true로 설정됩니다",
  },
  {
    name: "data-today",
    value: "true | false",
    description: "오늘 날짜일 때 true로 설정됩니다",
  },
  {
    name: "data-weekend",
    value: "true | false",
    description: "주말(토요일 또는 일요일)일 때 true로 설정됩니다",
  },
  {
    name: "data-weekday",
    value: "true | false",
    description: "평일일 때 true로 설정됩니다",
  },
  {
    name: "data-prev-month-end",
    value: "true | false",
    description: "이전 달의 마지막 날짜일 때 true로 설정됩니다",
  },
  {
    name: "data-next-month-start",
    value: "true | false",
    description: "다음 달의 첫 날짜일 때 true로 설정됩니다",
  },
];

const dayAttributes: AttributeTableRow[] = [
  {
    name: "data-weekend",
    value: "true | false",
    description: "주말 요일(토요일 또는 일요일)일 때 true로 설정됩니다",
  },
  {
    name: "data-weekday",
    value: "true | false",
    description: "평일 요일일 때 true로 설정됩니다",
  },
];

export { ApiSpecSection };
