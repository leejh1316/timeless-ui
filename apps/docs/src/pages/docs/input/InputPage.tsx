import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   Input Documentation Page
   ────────────────────────────────────────────── */

const InputPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Input</Document.Title>
    <Document.Description mb={10}>
      사용자 입력을 받는 텍스트 필드 컴포넌트입니다. 자동 유효성 검사, 에러 메시지 표시, Clear 버튼 등의 기능을 제공하며, Controlled와
      Uncontrolled 방식을 모두 지원합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default InputPage;
