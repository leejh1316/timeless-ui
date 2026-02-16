import { Document } from "@src/components/ui/Document";
import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Collapsible Documentation Page
   ────────────────────────────────────────────── */

const CollapsiblePage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Collapsible</Document.Title>
    <Document.Description mb={10}>
      Radix-ui의 Collapsible 컴포넌트를 참고하여 구현되었습니다.
      <br />
      제목을 클릭하여 관련된 내용을 펼치거나 접을 수 있는 인터랙티브 컴포넌트입니다. 공간을 효율적으로 사용하고 정보를 계층적으로 구성할 때
      유용합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default CollapsiblePage;
