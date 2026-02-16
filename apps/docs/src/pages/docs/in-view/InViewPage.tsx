import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";
import { ExampleSection } from "./components/sections/ExampleSection";

/* ──────────────────────────────────────────────
   InView Documentation Page
   ────────────────────────────────────────────── */

const InViewPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>InView</Document.Title>
    <Document.Description mb={10}>
      요소가 뷰포트에 들어오거나 나갈 때를 감지하는 컴포넌트입니다. IntersectionObserver API를 기반으로 스크롤 애니메이션, 이미지 지연 로딩,
      무한 스크롤 등 다양한 기능을 구현할 수 있습니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default InViewPage;
