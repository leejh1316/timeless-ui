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
      DatePicker 컴포넌트의 전체 Props 및 타입 명세입니다. 각 하위 컴포넌트별로 사용 가능한 속성과 타입을 확인할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading2>DatePicker.Root</Document.Heading2>
    <Document.Paragraph mb={4}>
      DatePicker의 최상위 컨테이너 컴포넌트입니다. 선택된 날짜 값, 표시 월, 날짜 범위 제한 등 전체 DatePicker의 상태와 동작을 제어합니다.
    </Document.Paragraph>
    <PropsTable rows={rootProps} />

    <Document.Heading2>DatePicker.Calendar</Document.Heading2>
    <Document.Paragraph mb={4}>
      Calendar 컴포넌트를 감싸는 래퍼입니다. 별도의 추가 props는 없으며, children을 통해 캘린더 구성 요소를 배치합니다.
    </Document.Paragraph>
    <PropsTable rows={calendarProps} />

    <Document.Heading2>DatePicker.Header</Document.Heading2>
    <Document.Paragraph mb={4}>
      요일 헤더를 렌더링하는 컴포넌트입니다. <InlineCode>Calendar.Header</InlineCode>와 동일한 API를 제공합니다.
    </Document.Paragraph>
    <PropsTable rows={headerProps} />

    <Document.Heading2>DatePicker.Day</Document.Heading2>
    <Document.Paragraph mb={4}>
      요일 헤더의 개별 요일 셀을 렌더링하는 컴포넌트입니다. <InlineCode>Calendar.Day</InlineCode>와 동일한 API를 제공합니다.
    </Document.Paragraph>
    <PropsTable rows={dayProps} />

    <Document.Heading2>DatePicker.Content</Document.Heading2>
    <Document.Paragraph mb={4}>
      날짜 그리드를 렌더링하는 컴포넌트입니다. <InlineCode>Calendar.Content</InlineCode>와 동일한 API를 제공합니다.
    </Document.Paragraph>
    <PropsTable rows={contentProps} />

    <Document.Heading2>DatePicker.DateTrigger</Document.Heading2>
    <Document.Paragraph mb={4}>
      날짜를 선택할 수 있는 버튼 컴포넌트입니다. 날짜 정보를 받아 클릭 시 해당 날짜를 선택하며, 범위 제한에 따라 자동으로 비활성화됩니다.
    </Document.Paragraph>
    <PropsTable rows={dateTriggerProps} />

    <Document.Heading2>DatePicker.Date</Document.Heading2>
    <Document.Paragraph mb={4}>
      날짜 그리드의 개별 날짜 셀을 렌더링하되, 선택 기능이 없는 컴포넌트입니다. <InlineCode>Calendar.Date</InlineCode>와 동일한 API를
      제공합니다.
    </Document.Paragraph>
    <PropsTable rows={dateProps} />

    <Document.Heading2>DatePicker.Year / DatePicker.Month</Document.Heading2>
    <Document.Paragraph mb={4}>
      현재 DatePicker가 표시하는 연도와 월을 텍스트로 렌더링합니다. <InlineCode>displayDate</InlineCode>를 기준으로 하며, 기본 HTML span
      엘리먼트의 속성을 사용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading2>DatePicker.Prev / DatePicker.Next</Document.Heading2>
    <Document.Paragraph mb={4}>
      이전 달 또는 다음 달로 이동하는 버튼 컴포넌트입니다. 날짜 범위 제한에 따라 자동으로 비활성화되며, 기본 HTML button 엘리먼트의 속성을
      사용할 수 있습니다.
    </Document.Paragraph>
    <PropsTable rows={prevNextProps} />

    <Document.Heading2>Data Attributes</Document.Heading2>
    <Document.Paragraph mb={4}>
      <InlineCode>DatePicker.DateTrigger</InlineCode> 컴포넌트는 날짜 선택 상태를 나타내는 data attribute를 제공합니다. 또한
      <InlineCode>Calendar.Date</InlineCode>와 <InlineCode>Calendar.Day</InlineCode>의 모든 data attributes를 상속받아 사용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.DateTrigger Attributes</Document.Heading3>
    <AttributeTable rows={dateTriggerAttributes} />

    <Document.Heading3>상속된 Calendar Attributes</Document.Heading3>
    <Document.Paragraph mb={4}>
      <InlineCode>DatePicker.DateTrigger</InlineCode>는 내부적으로 <InlineCode>Calendar.Date</InlineCode>의 data를 사용하므로, Calendar 관련
      data attributes도 함께 사용할 수 있습니다. 자세한 내용은 Calendar 컴포넌트 문서를 참조하세요.
    </Document.Paragraph>
    <AttributeTable rows={inheritedAttributes} />
  </section>
);

/* ──────────────────────────────────────────────
   Props Data
   ────────────────────────────────────────────── */

const rootProps: PropsTableRow[] = [
  {
    name: "value",
    type: "Date",
    defaultValue: "—",
    description: "현재 선택된 날짜입니다. Controlled 모드에서 사용합니다",
  },
  {
    name: "defaultValue",
    type: "Date",
    defaultValue: "—",
    description: "초기 선택 날짜입니다. Uncontrolled 모드에서 사용합니다",
  },
  {
    name: "displayDate",
    type: "Date",
    defaultValue: "—",
    description: "현재 표시할 월의 날짜입니다. Controlled 모드에서 사용합니다",
  },
  {
    name: "defaultDisplayDate",
    type: "Date",
    defaultValue: "new Date()",
    description: "초기 표시 월의 날짜입니다. Uncontrolled 모드에서 사용합니다",
  },
  {
    name: "minDate",
    type: "Date",
    defaultValue: "—",
    description: "선택 가능한 최소 날짜입니다. 이 날짜보다 이전 날짜는 비활성화됩니다",
  },
  {
    name: "maxDate",
    type: "Date",
    defaultValue: "—",
    description: "선택 가능한 최대 날짜입니다. 이 날짜보다 이후 날짜는 비활성화됩니다",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "DatePicker 전체를 비활성화합니다",
  },
  {
    name: "locale",
    type: "Locale",
    defaultValue: "ko",
    description: "date-fns의 로케일 객체입니다. 요일 및 월 이름의 언어를 지정합니다",
  },
  {
    name: "formatStr",
    type: "string",
    defaultValue: "'eee'",
    description: "요일 표시 형식 문자열입니다. date-fns의 format 함수 형식을 따릅니다",
  },
  {
    name: "onValueChange",
    type: "(date: Date) => void",
    defaultValue: "—",
    description: "날짜가 선택될 때 호출되는 콜백 함수입니다",
  },
  {
    name: "onDisplayDateChange",
    type: "(date: Date) => void",
    defaultValue: "—",
    description: "표시 월이 변경될 때 호출되는 콜백 함수입니다",
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

const calendarProps: PropsTableRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    defaultValue: "—",
    description: "DatePicker 내부에 렌더링할 요소들입니다",
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

const dateTriggerProps: PropsTableRow[] = [
  {
    name: "data",
    type: "CalendarDataType",
    defaultValue: "—",
    description: "날짜 정보 객체입니다. 이 날짜를 클릭 시 선택합니다",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "개별 날짜 버튼을 비활성화합니다. minDate/maxDate 범위 밖의 날짜는 자동으로 비활성화됩니다",
  },
  {
    name: "onClick",
    type: "(e: React.MouseEvent<HTMLButtonElement>) => void",
    defaultValue: "—",
    description: "날짜 클릭 시 호출되는 추가 핸들러입니다",
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

const prevNextProps: PropsTableRow[] = [
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "—",
    description: "버튼을 비활성화합니다. minDate/maxDate 범위에 따라 자동으로 비활성화될 수 있습니다",
  },
];

/* ──────────────────────────────────────────────
   Data Attributes
   ────────────────────────────────────────────── */

const dateTriggerAttributes: AttributeTableRow[] = [
  {
    name: "data-selected",
    value: "true | false",
    description: "현재 선택된 날짜일 때 true로 설정됩니다",
  },
];

const inheritedAttributes: AttributeTableRow[] = [
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
];

export { ApiSpecSection };
