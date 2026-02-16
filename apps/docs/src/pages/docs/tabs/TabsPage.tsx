import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Tabs Documentation Page
   ────────────────────────────────────────────── */

const TabsPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Tabs</Document.Title>
    <Document.Description mb={10}>
      여러 콘텐츠를 탭 형태로 전환하며 표시하는 컴포넌트입니다. 키보드 네비게이션과 접근성을 기본 지원하며, 가로 및 세로 레이아웃을 모두
      제공합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default TabsPage;
