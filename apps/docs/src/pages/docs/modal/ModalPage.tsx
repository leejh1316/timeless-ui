import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   Modal Documentation Page
   ────────────────────────────────────────────── */

const ModalPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Modal</Document.Title>
    <Document.Description mb={10}>
      사용자의 주의를 집중시키고 추가 작업을 수행하도록 하는 오버레이 대화상자 컴포넌트입니다. 포커스 관리, 키보드 네비게이션, 외부 클릭
      처리 등 접근성 기능을 내장하고 있으며, Compound Component 패턴으로 유연하게 구성할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default ModalPage;
