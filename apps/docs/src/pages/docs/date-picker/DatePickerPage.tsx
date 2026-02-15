import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   DatePicker Documentation Page
   ────────────────────────────────────────────── */

const DatePickerPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>DatePicker</Document.Title>
    <Document.Description mb={10}>
      사용자가 캘린더에서 날짜를 선택할 수 있는 컴포넌트입니다. Calendar 컴포넌트를 기반으로 구축되어 있으며, 날짜 선택 기능과 함께
      최소/최대 날짜 제한, 비활성화 상태 등의 추가 기능을 제공합니다. Compound Component 패턴으로 설계되어 있어 유연하게 커스터마이징할 수
      있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default DatePickerPage;
