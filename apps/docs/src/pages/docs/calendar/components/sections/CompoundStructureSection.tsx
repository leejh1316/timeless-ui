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
      Calendar는 Compound Component 패턴을 사용하여 설계되었습니다. 각 하위 컴포넌트들을 조합하여 유연하게 캘린더 UI를 구성할 수 있으며,
      필요에 따라 원하는 부분만 선택적으로 사용하거나 커스터마이징할 수 있습니다.
    </Document.Paragraph>

    <AnatomyCardGroup>
      {anatomyItems.map((item) => (
        <AnatomyCard key={item.name} title={item.name} description={item.desc} />
      ))}
    </AnatomyCardGroup>

    <Document.Heading2>기본적인 구조 사용법</Document.Heading2>
    <Document.Paragraph mb={4}>
      다음은 Calendar 컴포넌트의 일반적인 조립 구조입니다. 각 하위 컴포넌트는 독립적으로 스타일링하거나 배치를 변경할 수 있습니다.
    </Document.Paragraph>
    <CodeBlock code={anatomyCode} className="mb-8" />

    <Document.Heading2>각 하위 컴포넌트의 역할</Document.Heading2>

    <Document.Heading3>Calendar.Root</Document.Heading3>
    <Document.Paragraph mb={6}>
      캘린더의 최상위 컨테이너 역할을 하며, 현재 표시할 날짜와 로케일 설정 등 전체 캘린더의 상태를 관리합니다.
      <InlineCode>date</InlineCode> 또는 <InlineCode>defaultDate</InlineCode> prop으로 표시할 월을 제어하고,
      <InlineCode>onMonthChange</InlineCode>와 <InlineCode>onYearChange</InlineCode> 콜백으로 월/년도 변경 이벤트를 처리합니다.
      <InlineCode>locale</InlineCode>과 <InlineCode>formatStr</InlineCode>로 다국어 및 날짜 형식을 지정할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Calendar.Header</Document.Heading3>
    <Document.Paragraph mb={6}>
      요일 헤더를 렌더링하는 컴포넌트입니다. children prop으로 render function을 받으며, 이 함수는 요일 데이터 배열(
      <InlineCode>WeekdaysDataType[]</InlineCode>)을 인자로 받습니다. 각 요일 데이터는 <InlineCode>Calendar.Day</InlineCode> 컴포넌트로
      렌더링할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Calendar.Day</Document.Heading3>
    <Document.Paragraph mb={6}>
      요일 헤더의 개별 요일 셀을 표시합니다.
      <InlineCode>day</InlineCode> prop으로 요일 데이터를 받아 요일명, 주말 여부 등의 정보를 활용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Calendar.Content</Document.Heading3>
    <Document.Paragraph mb={6}>
      날짜 그리드를 렌더링하는 컴포넌트입니다.
      <InlineCode>Calendar.Header</InlineCode>와 마찬가지로 render function을 children으로 받으며, 캘린더 날짜 데이터 배열(
      <InlineCode>CalendarDataType[]</InlineCode>)을 인자로 제공합니다. 일반적으로 7열 그리드 레이아웃으로 구성하여 각 날짜를{" "}
      <InlineCode>Calendar.Date</InlineCode>로 렌더링합니다.
    </Document.Paragraph>

    <Document.Heading3>Calendar.Date</Document.Heading3>
    <Document.Paragraph mb={6}>
      날짜 그리드의 개별 날짜 셀을 표시합니다.
      <InlineCode>data</InlineCode> prop으로 날짜 정보를 받아 현재 월 여부, 오늘 날짜 여부, 주말 여부 등의 상태를 data attribute로
      제공합니다. 이를 활용하여 CSS에서 조건부 스타일링을 쉽게 적용할 수 있습니다.
    </Document.Paragraph>

    <Document.Heading3>Calendar.Year / Calendar.Month</Document.Heading3>
    <Document.Paragraph mb={6}>
      현재 캘린더가 표시하고 있는 연도와 월을 텍스트로 렌더링합니다. 일반적으로 캘린더 상단 헤더에 배치하여 현재 보고 있는 시점을 표시하는
      데 사용됩니다.
    </Document.Paragraph>

    <Document.Heading3>Calendar.Prev / Calendar.Next</Document.Heading3>
    <Document.Paragraph mb={6}>
      이전 달 또는 다음 달로 이동하는 버튼 컴포넌트입니다. 클릭 시 <InlineCode>Calendar.Root</InlineCode>의{" "}
      <InlineCode>onMonthChange</InlineCode> 콜백이 호출되어 월이 변경됩니다. button 엘리먼트로 렌더링되며, 자유롭게 스타일링할 수 있습니다.
    </Document.Paragraph>
  </section>
);

const anatomyItems = [
  { name: "Calendar.Root", desc: "캘린더의 최상위 컨테이너이며 전체 상태를 관리합니다" },
  { name: "Calendar.Header", desc: "요일 헤더 영역을 렌더링합니다" },
  { name: "Calendar.Day", desc: "요일 헤더의 개별 요일 셀입니다" },
  { name: "Calendar.Content", desc: "날짜 그리드 영역을 렌더링합니다" },
  { name: "Calendar.Date", desc: "날짜 그리드의 개별 날짜 셀입니다" },
  { name: "Calendar.Year", desc: "현재 연도를 표시합니다" },
  { name: "Calendar.Month", desc: "현재 월을 표시합니다" },
  { name: "Calendar.Prev", desc: "이전 달로 이동하는 버튼입니다" },
  { name: "Calendar.Next", desc: "다음 달로 이동하는 버튼입니다" },
];

const anatomyCode = `import { Calendar } from "@timeless-ui/react";

<Calendar.Root>
  {/* 헤더 영역: 년월 표시 및 이전/다음 버튼 */}
  <div>
    <Calendar.Year />년 <Calendar.Month />월
    <Calendar.Prev>이전</Calendar.Prev>
    <Calendar.Next>다음</Calendar.Next>
  </div>

  {/* 요일 헤더 */}
  <Calendar.Header>
    {(weekdays) =>
      weekdays.map((day) => (
        <Calendar.Day key={day.dayIndex} day={day}>
          {day.day}
        </Calendar.Day>
      ))
    }
  </Calendar.Header>

  {/* 날짜 그리드 */}
  <Calendar.Content>
    {(calendarData) =>
      calendarData.map((date, index) => (
        <Calendar.Date key={index} data={date}>
          {date.date}
        </Calendar.Date>
      ))
    }
  </Calendar.Content>
</Calendar.Root>`;

export { CompoundStructureSection };
