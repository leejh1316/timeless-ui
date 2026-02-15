import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   Breakpoint Documentation Page
   ────────────────────────────────────────────── */

const BreakpointPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Breakpoint</Document.Title>
    <Document.Description mb={10}>화면 크기에 따라 조건부로 콘텐츠를 렌더링하는 반응형 컴포넌트입니다.</Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default BreakpointPage;
