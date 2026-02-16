import { Document } from "@src/components/ui/Document";
import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Counter Documentation Page
   ────────────────────────────────────────────── */

const CounterPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Counter</Document.Title>
    <Document.Description mb={10}>
      숫자 값을 단계적으로 증가시키거나 감소시키는 입력 컨트롤 컴포넌트입니다. 수량 조절이나 범위 내 숫자 선택에 유용합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ExampleSection />
    <ApiSpecSection />
  </Document.Root>
);

export default CounterPage;
