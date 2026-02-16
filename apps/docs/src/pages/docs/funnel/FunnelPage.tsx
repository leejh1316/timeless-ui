import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   Funnel Documentation Page
   ────────────────────────────────────────────── */

const FunnelPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Funnel</Document.Title>
    <Document.Description mb={10}>
      다단계 프로세스를 구현하기 위한 컴포넌트입니다. 회원가입, 설문조사, 결제 등 여러 단계로 나뉜 사용자 플로우를 관리하며, 각 단계에서
      데이터를 수집하고 전달할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default FunnelPage;
