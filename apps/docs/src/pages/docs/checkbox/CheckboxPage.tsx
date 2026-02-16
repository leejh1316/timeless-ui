import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Checkbox Documentation Page
   ────────────────────────────────────────────── */

const CheckboxPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Checkbox</Document.Title>
    <Document.Description mb={10}>
      사용자가 하나 이상의 옵션을 선택하거나 해제할 수 있는 인터랙티브 컴포넌트입니다. 폼 입력, 다중 선택, 설정 토글 등 다양한 상황에서
      활용됩니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default CheckboxPage;
