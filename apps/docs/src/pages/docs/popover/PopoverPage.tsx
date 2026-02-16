import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   Popover Documentation Page
   ────────────────────────────────────────────── */

const PopoverPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Popover</Document.Title>
    <Document.Description mb={10}>
      트리거 요소와 연결된 부가 정보를 표시하는 팝업 컴포넌트입니다. 클릭, 호버, 포커스 등 다양한 트리거 방식을 지원하며, 자동 위치 조정 및
      접근성 기능을 내장하고 있습니다. Compound Component 패턴으로 유연하게 구성할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default PopoverPage;
