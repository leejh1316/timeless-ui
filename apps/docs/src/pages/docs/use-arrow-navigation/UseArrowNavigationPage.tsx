import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   useArrowNavigation Documentation Page
   ────────────────────────────────────────────── */

const UseArrowNavigationPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>useArrowNavigation</Document.Title>
    <Document.Description mb={10}>
      키보드 화살표 키를 사용하여 포커스 가능한 항목들 사이를 탐색할 수 있도록 하는 Hook입니다. 접근성을 향상시키고, 메뉴, 탭, 리스트 등
      다양한 UI 패턴에서 키보드 네비게이션을 쉽게 구현할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default UseArrowNavigationPage;
