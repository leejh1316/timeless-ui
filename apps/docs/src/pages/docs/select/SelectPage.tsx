import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   Select Documentation Page
   ────────────────────────────────────────────── */

const SelectPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Select</Document.Title>
    <Document.Description mb={10}>
      사용자가 여러 옵션 중 하나 또는 여러 개를 선택할 수 있는 드롭다운 선택 컴포넌트입니다. 키보드 탐색, 타입어헤드 검색, 자동 위치 조정
      등의 접근성 기능을 내장하고 있으며, 단일 선택과 다중 선택 모드를 모두 지원합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default SelectPage;
