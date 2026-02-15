import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   AlertDialog Documentation Page
   ────────────────────────────────────────────── */

const AlertDialogPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>AlertDialog</Document.Title>
    <Document.Description mb={10}>
      사용자에게 중요한 정보를 전달하거나 확인을 요청하는 모달 대화상자입니다. 접근성을 준수하며, 사용자가 명시적으로 응답하기 전까지
      상호작용을 차단합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <ApiSpecSection />
    <CompoundStructureSection />
    <ExampleSection />
  </Document.Root>
);

export default AlertDialogPage;
