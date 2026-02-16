import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   RadioGroup Documentation Page
   ────────────────────────────────────────────── */

const RadioGroupPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>RadioGroup</Document.Title>
    <Document.Description mb={10}>
      여러 옵션 중 하나를 선택할 수 있는 라디오 버튼 그룹 컴포넌트입니다. 설정 선택, 폼 입력, 필터링 등 단일 선택이 필요한 인터페이스를
      구현할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default RadioGroupPage;
