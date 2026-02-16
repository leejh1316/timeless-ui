import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Image Documentation Page
   ────────────────────────────────────────────── */

const ImagePage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Image</Document.Title>
    <Document.Description mb={10}>
      이미지 로딩 상태를 관리하고, fallback 이미지를 제공하는 컴포넌트입니다. 로딩 실패 시 대체 이미지를 자동으로 표시하며, 다양한 fit
      옵션과 지연 로딩 기능을 지원합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default ImagePage;
