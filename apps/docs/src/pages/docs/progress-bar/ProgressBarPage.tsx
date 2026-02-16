import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   ProgressBar Documentation Page
   ────────────────────────────────────────────── */

const ProgressBarPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>ProgressBar</Document.Title>
    <Document.Description mb={10}>
      작업의 진행 상태를 시각적으로 표현하는 진행바 컴포넌트입니다. 파일 업로드, 데이터 로딩, 작업 완료율 등을 직관적으로 표시할 수
      있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default ProgressBarPage;
