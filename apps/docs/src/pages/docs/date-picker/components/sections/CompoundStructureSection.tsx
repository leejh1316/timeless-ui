import { Document } from "@src/components/ui/Document";
import { InlineCode } from "@src/components/ui/InlineCode";
import { AnatomyCard, AnatomyCardGroup } from "@src/components/common/AnatomyCard";
import { CodeBlock } from "@src/components/common/CodeBlock";

/* ──────────────────────────────────────────────
   Compound Structure Section
   ────────────────────────────────────────────── */

const CompoundStructureSection = () => (
  <section>
    <Document.Heading1>컴포넌트 구조</Document.Heading1>
    <Document.Paragraph mb={6}>
      DatePicker는 Compound Component 패턴을 사용하여 설계되었습니다. Calendar 컴포넌트를 기반으로 하며, 날짜 선택 및 범위 제한 기능이
      추가되어 있습니다. 각 하위 컴포넌트를 조합하여 날짜 선택 UI를 유연하게 구성할 수 있습니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>
      다음은 DatePicker 컴포넌트의 일반적인 조립 구조입니다. Calendar 컴포넌트와 유사하지만, 날짜 선택 기능을 위해
      <InlineCode>DatePicker.DateTrigger</InlineCode>를 사용합니다.
    </Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>DatePicker.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      DatePicker의 최상위 컨테이너 역할을 하며, 선택된 날짜 값과 표시 월을 관리합니다. <InlineCode>value</InlineCode> 또는
      <InlineCode>defaultValue</InlineCode> prop으로 선택된 날짜를 제어하고, <InlineCode>displayDate</InlineCode> 또는
      <InlineCode>defaultDisplayDate</InlineCode>로 표시할 월을 제어합니다. <InlineCode>minDate</InlineCode>와
      <InlineCode>maxDate</InlineCode>로 선택 가능한 날짜 범위를 제한할 수 있으며, <InlineCode>disabled</InlineCode>로 전체 DatePicker를
      비활성화할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.Calendar</Document.Heading3>
    <Document.Paragraph mb={6}>
      내부적으로 <InlineCode>Calendar.Root</InlineCode>를 감싸는 래퍼 컴포넌트입니다. <InlineCode>DatePicker.Root</InlineCode>의
      설정(locale, formatStr, displayDate)을 Calendar에 전달하여 캘린더를 렌더링합니다. 모든 캘린더 관련 하위 컴포넌트는 이 컴포넌트 내부에
      배치해야 합니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.Header</Document.Heading3>
    <Document.Paragraph mb={6}>
      요일 헤더를 렌더링하는 컴포넌트입니다. <InlineCode>Calendar.Header</InlineCode>를 감싸며, children prop으로 render function을 받아
      요일 데이터 배열(<InlineCode>WeekdaysDataType[]</InlineCode>)을 제공합니다. 각 요일은 <InlineCode>DatePicker.Day</InlineCode>로
      렌더링할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.Day</Document.Heading3>
    <Document.Paragraph mb={6}>
      요일 헤더의 개별 요일 셀을 표시합니다. <InlineCode>Calendar.Day</InlineCode>를 감싸며, <InlineCode>day</InlineCode> prop으로 요일
      데이터를 받아 요일명, 주말 여부 등의 정보를 활용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.Content</Document.Heading3>
    <Document.Paragraph mb={6}>
      날짜 그리드를 렌더링하는 컴포넌트입니다. <InlineCode>Calendar.Content</InlineCode>를 감싸며, render function을 children으로 받아
      캘린더 날짜 데이터 배열(<InlineCode>CalendarDataType[]</InlineCode>)을 제공합니다. 일반적으로 7열 그리드 레이아웃으로 구성하여 각
      날짜를 <InlineCode>DatePicker.DateTrigger</InlineCode>로 렌더링합니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.DateTrigger</Document.Heading3>
    <Document.Paragraph mb={6}>
      날짜를 선택할 수 있는 버튼 컴포넌트입니다. <InlineCode>data</InlineCode> prop으로 날짜 정보를 받아 해당 날짜를 선택하는 기능을
      제공합니다. <InlineCode>minDate</InlineCode>와 <InlineCode>maxDate</InlineCode> 범위를 벗어난 날짜는 자동으로 비활성화되며,
      <InlineCode>data-selected</InlineCode> attribute를 통해 현재 선택된 날짜임을 표시합니다. 일반적으로 날짜 선택 기능이 필요한 경우
      <InlineCode>DatePicker.Date</InlineCode> 대신 이 컴포넌트를 사용합니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.Date</Document.Heading3>
    <Document.Paragraph mb={6}>
      날짜 그리드의 개별 날짜 셀을 표시하되, 선택 기능이 없는 컴포넌트입니다. <InlineCode>Calendar.Date</InlineCode>를 감싸며, 날짜를 표시만
      하고 선택 동작은 필요 없는 특수한 경우에 사용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.Year / DatePicker.Month</Document.Heading3>
    <Document.Paragraph mb={6}>
      현재 캘린더가 표시하고 있는 연도와 월을 텍스트로 렌더링합니다. <InlineCode>displayDate</InlineCode>를 기준으로 하며, 일반적으로 캘린더
      상단 헤더에 배치하여 현재 보고 있는 시점을 표시하는 데 사용됩니다.
    </Document.Paragraph>

    <Document.Heading3>DatePicker.Prev / DatePicker.Next</Document.Heading3>
    <Document.Paragraph mb={6}>
      이전 달 또는 다음 달로 이동하는 버튼 컴포넌트입니다. <InlineCode>minDate</InlineCode>와 <InlineCode>maxDate</InlineCode> 범위를
      고려하여, 범위를 벗어나는 달로는 이동할 수 없도록 자동으로 비활성화됩니다. 클릭 시 <InlineCode>displayDate</InlineCode>가 변경되고
      <InlineCode>onMonthChange</InlineCode> 및 <InlineCode>onYearChange</InlineCode> 콜백이 호출됩니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "DatePicker.Root", desc: "DatePicker의 최상위 컨테이너이며 날짜 선택 상태를 관리합니다" },
  { name: "DatePicker.Calendar", desc: "Calendar 컴포넌트를 감싸는 래퍼입니다" },
  { name: "DatePicker.Header", desc: "요일 헤더 영역을 렌더링합니다" },
  { name: "DatePicker.Day", desc: "요일 헤더의 개별 요일 셀입니다" },
  { name: "DatePicker.Content", desc: "날짜 그리드 영역을 렌더링합니다" },
  { name: "DatePicker.DateTrigger", desc: "날짜를 선택할 수 있는 버튼입니다" },
  { name: "DatePicker.Date", desc: "선택 기능이 없는 날짜 셀입니다" },
  { name: "DatePicker.Year", desc: "현재 표시 중인 연도를 표시합니다" },
  { name: "DatePicker.Month", desc: "현재 표시 중인 월을 표시합니다" },
  { name: "DatePicker.Prev", desc: "이전 달로 이동하는 버튼입니다" },
  { name: "DatePicker.Next", desc: "다음 달로 이동하는 버튼입니다" },
];

const anatomyCode = `import { DatePicker } from "@timeless-ui/ui";

<DatePicker.Root value={selectedDate} onValueChange={setSelectedDate}>
  <DatePicker.Calendar>
    {/* 헤더 영역: 년월 표시 및 이전/다음 버튼 */}
    <div>
      <DatePicker.Year />년 <DatePicker.Month />월
      <DatePicker.Prev>이전</DatePicker.Prev>
      <DatePicker.Next>다음</DatePicker.Next>
    </div>

    {/* 요일 헤더 */}
    <DatePicker.Header>
      {(weekdays) =>
        weekdays.map((day) => (
          <DatePicker.Day key={day.dayIndex} day={day}>
            {day.day}
          </DatePicker.Day>
        ))
      }
    </DatePicker.Header>

    {/* 날짜 그리드 */}
    <DatePicker.Content>
      {(calendarData) =>
        calendarData.map((date, index) => (
          <DatePicker.DateTrigger key={index} data={date}>
            {date.date}
          </DatePicker.DateTrigger>
        ))
      }
    </DatePicker.Content>
  </DatePicker.Calendar>
</DatePicker.Root>`;

export { CompoundStructureSection };
