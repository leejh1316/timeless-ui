import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   TOC Documentation Page
   ────────────────────────────────────────────── */

const TOCPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>TOC</Document.Title>
    <Document.Description mb={10}>
      페이지의 heading 요소를 자동으로 감지하여 목차를 생성하고, 현재 보이는 섹션을 추적하는 컴포넌트입니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default TOCPage;
