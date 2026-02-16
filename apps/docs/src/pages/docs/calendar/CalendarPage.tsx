import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Calendar Documentation Page
   ────────────────────────────────────────────── */

const CalendarPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Calendar</Document.Title>
    <Document.Description mb={10}>
      월 단위로 날짜를 표시하고 탐색할 수 있는 캘린더 컴포넌트입니다. 요일 헤더, 날짜 그리드, 네비게이션 버튼 등을 자유롭게 구성하고
      스타일링할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default CalendarPage;
