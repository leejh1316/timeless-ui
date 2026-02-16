import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   FileUpload Documentation Page
   ────────────────────────────────────────────── */

const FileUploadPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>FileUpload</Document.Title>
    <Document.Description mb={10}>
      사용자가 파일을 선택하거나 드래그 앤 드롭으로 업로드할 수 있는 컴포넌트입니다. 파일 타입 제한, 크기 제한, 개수 제한 등 다양한 검증
      옵션을 제공하며, 업로드된 파일의 미리보기와 관리 기능을 지원합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default FileUploadPage;
