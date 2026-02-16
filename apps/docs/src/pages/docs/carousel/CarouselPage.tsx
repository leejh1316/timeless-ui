import { Document } from "@src/components/ui/Document";

import { BasicUsageSection } from "./components/sections/BasicUsageSection";
import { CompoundStructureSection } from "./components/sections/CompoundStructureSection";
import { ExampleSection } from "./components/sections/ExampleSection";
import { ApiSpecSection } from "./components/sections/ApiSpecSection";

/* ──────────────────────────────────────────────
   Carousel Documentation Page
   ────────────────────────────────────────────── */

const CarouselPage = () => (
  <Document.Root className="pb-20">
    {/* ─── Page Header ─── */}
    <Document.Title mb={3}>Carousel</Document.Title>
    <Document.Description mb={10}>
      <span className="font-semibold">Embla Carousel을 기반으로 만들어진 컴포넌트 입니다.</span>
      <br />
      여러 콘텐츠를 슬라이드 형태로 표시하고 탐색할 수 있는 캐러셀 컴포넌트입니다. 네비게이션 버튼, 인디케이터, 자동재생 등 다양한 기능을
      조합하여 사용할 수 있으며, 가로와 세로 방향을 모두 지원합니다.
    </Document.Description>
    <Document.Divider />

    {/* ─── Sections ─── */}
    <BasicUsageSection />
    <CompoundStructureSection />
    <ApiSpecSection />
    <ExampleSection />
  </Document.Root>
);

export default CarouselPage;
