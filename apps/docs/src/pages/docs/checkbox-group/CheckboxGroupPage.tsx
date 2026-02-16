import { Document } from "@src/components/ui/Document";
import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   CheckboxGroup Documentation Page
   ────────────────────────────────────────────── */

const CheckboxGroupPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>CheckboxGroup</Document.Title>
    <Document.Description mb={10}>
      여러 체크박스의 선택 상태를 그룹화하여 배열 형태로 관리하는 컴포넌트입니다. 전체 선택 및 개별 상태 관리를 유연하게 처리할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default CheckboxGroupPage;
