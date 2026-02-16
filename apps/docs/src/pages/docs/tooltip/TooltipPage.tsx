import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   Tooltip Documentation Page
   ────────────────────────────────────────────── */

const TooltipPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Tooltip</Document.Title>
    <Document.Description mb={10}>
      요소 위에 마우스를 올렸을 때 추가 정보나 설명을 표시하는 컴포넌트입니다. 다양한 위치, 트리거 모드, 애니메이션을 지원하며 접근성을
      고려하여 설계되었습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default TooltipPage;
